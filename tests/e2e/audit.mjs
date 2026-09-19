/**
 * Browser regression checks for the page audit.
 *
 *   npm run build && npm run test:e2e
 *
 * Requires a Chromium for Playwright (`npx playwright install chromium`).
 * Set NANAIRO_E2E_CHROMIUM to use an existing binary instead.
 */
import { chromium } from 'playwright';
import { cpSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const BUNDLE = 'nanairo-accessibility.iife.js';
const SEVERE_CHECKS = 4;
const REQUIRED_CHECKS = 12;

let failures = 0;
let checks = 0;

function check(name, condition, detail = '') {
  checks += 1;
  if (condition) {
    console.log(`  ok   ${name}${detail ? ` — ${detail}` : ''}`);
    return;
  }
  failures += 1;
  console.log(`  FAIL ${name}${detail ? ` — ${detail}` : ''}`);
}

/** A page whose only real problem is low-contrast body text. */
const DEFECTS_PAGE = `<!doctype html>
<html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>製品情報 | 検証サイト</title>
<style>
  body { background: #fff; color: #222; }
  .low { color: #aaa; background: #fff; }
</style>
</head><body>
<main>
  <h1>製品情報</h1>
  <p class="low">コントラストが低い段落です。</p>
  <p><img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" width="10" height="10" alt="外観"></p>
  <form><input type="image" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="検索"></form>
  <marquee>自動で流れるお知らせ</marquee>
  <audio autoplay src="data:audio/wav;base64,UklGRg=="></audio>
</main>
<script src="./${BUNDLE}" data-nanairo-auto data-locale="ja" defer></script>
</body></html>
`;

/** A conforming page: white text over a dark gradient must not be a failure. */
const CLEAN_PAGE = `<!doctype html>
<html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>会社概要 | 検証サイト</title>
<style>
  body { background: #fff; color: #222; }
  .hero { background-image: linear-gradient(#123, #456); color: #fff; padding: 20px; }
</style>
</head><body>
<main>
  <h1>会社概要</h1>
  <div class="hero"><p>暗いグラデーションの上に置いた白い文字です。</p></div>
  <h2>沿革</h2><p>十分なコントラストの本文です。</p>
  <p><a href="#detail">沿革の詳細を見る</a></p>
  <p><button>問い合わせる</button></p>
</main>
<script src="./${BUNDLE}" data-nanairo-auto data-locale="ja" defer></script>
</body></html>
`;

/** Zoom capped below 200%, which 1.4.4 does not allow. */
const ZOOM_PAGE = `<!doctype html>
<html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.5">
<title>拡大制限 | 検証サイト</title>
</head><body><main><h1>拡大制限のページ</h1><p>本文です。</p></main>
<script src="./${BUNDLE}" data-nanairo-auto data-locale="ja" defer></script>
</body></html>
`;

const widget = (page) => page.locator('nanairo-accessibility');

const openPanel = async (page) => {
  await widget(page).locator('.launcher').click();
  await page.waitForTimeout(400);
};

const runAudit = async (page) => {
  await widget(page).locator('.audit-button').click();
  await page.waitForSelector('nanairo-accessibility >> .audit-results');
  await page.waitForTimeout(250);
};

const readAudit = (page) => page.evaluate(() => {
  const root = document.querySelector('nanairo-accessibility').shadowRoot;
  return {
    groups: [...root.querySelectorAll('.audit-group')].map((node) => node.textContent),
    items: [...root.querySelectorAll('.audit-results li')].map((item) => {
      const notes = [...item.querySelectorAll('small')].map((node) => node.textContent);
      const counted = (notes[0] ?? '').match(/\((\d+)\)\s*$/);
      return {
        label: item.querySelector('strong').textContent,
        status: (item.className.match(/status-(\w+)/) || [])[1],
        count: counted ? Number(counted[1]) : 0,
        hasNote: notes.length > 1,
      };
    }),
  };
});

const byLabel = (items, fragment) => items.find((item) => item.label.includes(fragment));

async function main() {
  const workdir = mkdtempSync(join(tmpdir(), 'nanairo-audit-'));
  cpSync(join(root, 'dist', BUNDLE), join(workdir, BUNDLE));
  writeFileSync(join(workdir, 'defects.html'), DEFECTS_PAGE);
  writeFileSync(join(workdir, 'clean.html'), CLEAN_PAGE);
  writeFileSync(join(workdir, 'zoom.html'), ZOOM_PAGE);
  // Same markup as clean.html, served and labelled as Shift_JIS.
  writeFileSync(join(workdir, 'sjis.html'), CLEAN_PAGE.replace('<meta charset="utf-8">', '<meta charset="Shift_JIS">'));
  const url = (file) => `file://${join(workdir, file)}`;

  console.log('\nbundle encoding');
  const bundleBytes = readFileSync(join(root, 'dist', BUNDLE));
  const nonAscii = bundleBytes.filter((byte) => byte > 127).length;
  // A classic script with non-ASCII bytes is decoded with the host document's
  // encoding, so the Japanese UI turns into mojibake on a Shift_JIS page.
  check('the IIFE bundle is pure ASCII', nonAscii === 0, `${nonAscii} non-ASCII byte(s)`);

  const browser = await chromium.launch({
    executablePath: process.env.NANAIRO_E2E_CHROMIUM || undefined,
    args: ['--autoplay-policy=no-user-gesture-required'],
  });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const errors = [];

  const load = async (file) => {
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(`${file} pageerror: ${error.message}`));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(`${file} console: ${message.text()}`);
    });
    await page.goto(url(file));
    await page.waitForSelector('nanairo-accessibility', { state: 'attached' });
    await page.waitForTimeout(250);
    return page;
  };

  // ---- structure -----------------------------------------------------------
  const defects = await load('defects.html');
  await openPanel(defects);
  await runAudit(defects);
  const first = await readAudit(defects);

  console.log('\nstructure');
  check(
    'reports both guidebook sections',
    first.items.length === SEVERE_CHECKS + REQUIRED_CHECKS,
    `${first.items.length} item(s)`,
  );
  check('groups them under two headings', first.groups.length === 2, first.groups.join(' | '));
  check(
    'every automatic result carries the manual-review caveat',
    first.items.every((item) => item.status === 'manual' || item.hasNote),
  );
  check(
    'an item that cannot be decided automatically is never a warning',
    byLabel(first.items, '色・形')?.status === 'manual' && byLabel(first.items, '色・形')?.count === 0,
    JSON.stringify(byLabel(first.items, '色・形')),
  );

  // ---- the widget's own overrides must not skew the measurement ------------
  console.log('\ncontrast is measured on the site, not on the widget overrides');
  check('detected with no colour mode', byLabel(first.items, 'コントラスト')?.count === 1);
  for (const [label, mode] of [['高コントラスト', 'high-contrast'], ['ダーク', 'dark'], ['ライト', 'light']]) {
    await widget(defects).locator('.color-mode', { hasText: label }).click();
    await defects.waitForTimeout(280);
    await runAudit(defects);
    const contrast = byLabel((await readAudit(defects)).items, 'コントラスト');
    check(`still detected with ${mode} active`, contrast?.status === 'warning' && contrast?.count === 1, JSON.stringify(contrast));
  }
  await widget(defects).locator('.color-mode', { hasText: '標準' }).click();
  await defects.waitForTimeout(280);
  check(
    'the colour mode is restored after the audit',
    (await defects.getAttribute('html', 'data-nanairo-color')) === 'default',
  );

  // ---- severe section ------------------------------------------------------
  console.log('\nsevere (section 3.1) checks');
  check('unmuted autoplay is reported', byLabel(first.items, '自動再生')?.status === 'warning');
  check('a marquee is reported as auto-advancing', (byLabel(first.items, '自動でコンテンツ')?.count ?? 0) > 0);
  check('the keyboard trap check asks for manual testing', byLabel(first.items, '袋小路')?.status === 'manual');

  // ---- named controls ------------------------------------------------------
  console.log('\naccessible names');
  check(
    'an image button named by alt is not counted as unnamed',
    byLabel(first.items, '一貫性')?.count === 0,
    JSON.stringify(byLabel(first.items, '一貫性')),
  );

  // ---- repeated runs -------------------------------------------------------
  console.log('\nrepeated runs');
  await defects.evaluate(() => {
    const region = document.querySelector('nanairo-accessibility').shadowRoot.querySelector('.sr-only[aria-live]');
    window.__liveUpdates = [];
    new MutationObserver(() => window.__liveUpdates.push(region.textContent.trim()))
      .observe(region, { childList: true, characterData: true, subtree: true });
  });
  await runAudit(defects);
  await defects.waitForTimeout(200);
  const updates = await defects.evaluate(() => window.__liveUpdates.slice());
  // Assigning the same string twice leaves the DOM untouched, so the result of
  // a second identical run would never be announced.
  check('the live region changes on a repeat run', updates.length > 0, JSON.stringify(updates));

  // ---- a conforming page ---------------------------------------------------
  console.log('\nconforming page');
  const clean = await load('clean.html');
  await openPanel(clean);
  await runAudit(clean);
  const cleanItems = (await readAudit(clean)).items;
  const cleanWarnings = cleanItems.filter((item) => item.status === 'warning');
  check('reports no warning', cleanWarnings.length === 0, cleanWarnings.map((item) => item.label).join(', '));
  check(
    'white text on a gradient is unmeasurable, not a failure',
    byLabel(cleanItems, 'コントラスト')?.status === 'manual',
    JSON.stringify(byLabel(cleanItems, 'コントラスト')),
  );
  check('UTF-8 raises no encoding warning', byLabel(cleanItems, '文字コード')?.status === 'pass');

  // ---- encoding ------------------------------------------------------------
  console.log('\nShift_JIS page');
  const sjis = await load('sjis.html');
  const launcherText = await sjis.evaluate(
    () => [...document.querySelector('nanairo-accessibility').shadowRoot.querySelectorAll('.launcher-label span')].map((node) => node.textContent).join('/'),
  );
  check('the widget UI is not mojibake', launcherText === '表示/サポート', JSON.stringify(launcherText));
  await openPanel(sjis);
  await runAudit(sjis);
  check(
    'an encoding other than UTF-8 is reported',
    byLabel((await readAudit(sjis)).items, '文字コード')?.status === 'warning',
  );

  // ---- zoom ----------------------------------------------------------------
  console.log('\nzoom restrictions');
  const zoom = await load('zoom.html');
  await openPanel(zoom);
  await runAudit(zoom);
  check(
    'maximum-scale below 2 is reported',
    byLabel((await readAudit(zoom)).items, '200%')?.status === 'warning',
    JSON.stringify(byLabel((await readAudit(zoom)).items, '200%')),
  );

  console.log('\nconsole');
  check('no unexpected page or console errors', errors.length === 0, errors.join(' | '));

  await browser.close();

  console.log(`\n${checks - failures}/${checks} checks passed`);
  if (failures > 0) {
    console.error(`${failures} check(s) failed`);
    process.exitCode = 1;
  }
}

await main();
