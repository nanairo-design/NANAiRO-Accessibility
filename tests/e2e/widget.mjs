/**
 * Browser regression checks for the behaviour that unit tests cannot reach:
 * the page-level stylesheet, keyboard interaction, speech wiring and media
 * restore.
 *
 *   npm run build && npm run test:e2e
 *
 * Requires a Chromium for Playwright (`npx playwright install chromium`).
 * Set NANAIRO_E2E_CHROMIUM to use an existing binary instead.
 */
import { chromium } from 'playwright';
import { cpSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const BUNDLE = 'nanairo-accessibility.iife.js';
const WCAG_AA_NORMAL_TEXT = 4.5;

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

/** A short silent WAV so Chromium has real, playable media. */
function silentWavDataUri(seconds = 1, rate = 8000) {
  const samples = seconds * rate;
  const buffer = Buffer.alloc(44 + samples, 128);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + samples, 4);
  buffer.write('WAVEfmt ', 8);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(rate, 24);
  buffer.writeUInt32LE(rate, 28);
  buffer.writeUInt16LE(1, 32);
  buffer.writeUInt16LE(8, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(samples, 40);
  return `data:audio/wav;base64,${buffer.toString('base64')}`;
}

/**
 * The host page deliberately styles elements the stylesheet used to miss
 * (summary, caption, legend, time, em, code) with mid-grey text.
 */
const fixture = (audioSrc) => `<!doctype html>
<html lang="ja">
<head><meta charset="utf-8"><title>Fixture</title>
<style>
  body { background: #fff; color: #333; }
  summary, caption, legend, time, em, dfn { color: #444; }
  code, pre { color: #444; background: #f5f5f5; }
  .site-box { background: #fff; color: #555; }
</style>
</head>
<body>
<main>
  <h1>見出しです。</h1>
  <p>最初の段落です。二つ目の文がここに続きます。</p>
  <p id="long">${'長文テストの文章です。読み上げの区切りが文の境界に来ることを確認します。'.repeat(8)}</p>
  <h4>小見出しです。</h4>
  <ul><li>リスト項目のテキストです。</li></ul>
  <dl><dt>用語</dt><dd>用語の説明です。</dd></dl>
  <table><caption>表のキャプション</caption><tbody><tr><td>セルのテキストです。</td></tr></tbody></table>
  <details open><summary>要約のテキスト</summary><p>詳細の中身です。</p></details>
  <fieldset><legend>凡例のテキスト</legend><input id="field" type="text" value="入力"></fieldset>
  <p>インライン: <code>const x = 1;</code> <em>強調</em> <mark>マーク</mark> <time>2026-01-01</time></p>
  <pre>preformatted</pre>
  <div class="site-box">サイト独自のボックスです。</div>
  <audio id="clip" src="${audioSrc}"></audio>
</main>
<script src="./${BUNDLE}" data-nanairo-auto data-locale="ja" data-position="right" defer></script>
</body>
</html>
`;

/** Contrast ratio of each selector's text against its effective background. */
const CONTRAST_PROBE = `(selectors) => {
  const parse = (value) => {
    const parts = value.match(/[\\d.]+/g).map(Number);
    return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
  };
  const luminance = ({ r, g, b }) => {
    const channel = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  };
  const effectiveBackground = (element) => {
    let node = element;
    while (node && node !== document.documentElement) {
      const background = parse(getComputedStyle(node).backgroundColor);
      if (background.a > 0) return background;
      node = node.parentElement;
    }
    return parse(getComputedStyle(document.documentElement).backgroundColor || 'rgb(255,255,255)');
  };
  const ratio = (a, b) => {
    const [high, low] = luminance(a) > luminance(b) ? [luminance(a), luminance(b)] : [luminance(b), luminance(a)];
    return (high + 0.05) / (low + 0.05);
  };
  const result = {};
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (!element) continue;
    result[selector] = Math.round(ratio(parse(getComputedStyle(element).color), effectiveBackground(element)) * 100) / 100;
  }
  return result;
}`;

const shadow = (page) => page.locator('nanairo-accessibility');
const openPanel = async (page) => {
  await shadow(page).locator('.launcher').click();
  await page.waitForTimeout(320);
};

async function main() {
  const workdir = mkdtempSync(join(tmpdir(), 'nanairo-e2e-'));
  cpSync(join(root, 'dist', BUNDLE), join(workdir, BUNDLE));
  writeFileSync(join(workdir, 'index.html'), fixture(silentWavDataUri()));
  const url = `file://${join(workdir, 'index.html')}`;

  const browser = await chromium.launch({
    executablePath: process.env.NANAIRO_E2E_CHROMIUM || undefined,
    args: ['--autoplay-policy=no-user-gesture-required'],
  });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    // The duplicate-instance warning is asserted for on purpose.
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });

  // Record spoken text instead of using the real speech engine.
  await page.addInitScript(() => {
    const spoken = [];
    Object.defineProperty(window, '__spoken', { value: spoken, configurable: true });
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        cancel() {},
        speak(utterance) {
          spoken.push(utterance.text);
          setTimeout(() => utterance.onend && utterance.onend(), 0);
        },
      },
    });
    window.SpeechSynthesisUtterance = class {
      constructor(text) {
        this.text = text;
        this.lang = '';
        this.rate = 1;
        this.onend = null;
        this.onerror = null;
      }
    };
  });

  await page.goto(url);
  await page.waitForSelector('nanairo-accessibility', { state: 'attached' });
  await page.waitForTimeout(250);

  console.log('\nmount');
  check('widget mounts once', (await shadow(page).count()) === 1);
  check('launcher is visible', await shadow(page).locator('.launcher').isVisible());

  await openPanel(page);

  // ---- colour modes -------------------------------------------------------
  const probed = ['p', 'h1', 'summary', 'caption', 'legend', 'time', 'em', 'code', 'pre', 'td', 'dd', 'li', 'mark', '.site-box', '#field'];
  for (const [label, mode] of [['ダーク', 'dark'], ['ライト', 'light'], ['高コントラスト', 'high-contrast']]) {
    await shadow(page).locator('.color-mode', { hasText: label }).click();
    await page.waitForTimeout(220);
    console.log(`\ncolour mode: ${mode}`);
    check('root attribute set', (await page.getAttribute('html', 'data-nanairo-color')) === mode);

    const ratios = await page.evaluate(`(${CONTRAST_PROBE})(${JSON.stringify(probed)})`);
    const failing = Object.entries(ratios).filter(([, ratio]) => ratio < WCAG_AA_NORMAL_TEXT);
    check(
      `every probed element meets ${WCAG_AA_NORMAL_TEXT}:1`,
      failing.length === 0,
      failing.length ? `below AA: ${failing.map(([selector, ratio]) => `${selector}=${ratio}`).join(', ')}`
        : `min ${Math.min(...Object.values(ratios))}:1`,
    );
  }

  await shadow(page).locator('.color-mode', { hasText: '標準' }).click();
  await page.waitForTimeout(200);

  // ---- radiogroup keyboard interaction ------------------------------------
  console.log('\ncolour mode radiogroup');
  const tabStops = await page.evaluate(() => {
    const grid = document.querySelector('nanairo-accessibility').shadowRoot.querySelector('.color-mode-grid');
    return [...grid.querySelectorAll('[role="radio"]')].filter((radio) => radio.tabIndex >= 0).length;
  });
  check('is a single tab stop', tabStops === 1, `${tabStops} tabbable radio(s)`);

  await shadow(page).locator('.color-mode', { hasText: '標準' }).focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(220);
  const afterRight = await page.evaluate(() => ({
    mode: document.documentElement.dataset.nanairoColor,
    focused: document.querySelector('nanairo-accessibility').shadowRoot.activeElement?.textContent?.trim(),
  }));
  check('ArrowRight selects the next mode', afterRight.mode === 'dark', `mode=${afterRight.mode}`);
  check('ArrowRight moves focus with the selection', afterRight.focused === 'ダーク', `focus=${afterRight.focused}`);

  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(220);
  check('ArrowLeft goes back', (await page.getAttribute('html', 'data-nanairo-color')) === 'default');

  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(220);
  check('ArrowLeft wraps to the last mode', (await page.getAttribute('html', 'data-nanairo-color')) === 'saturated');

  await page.keyboard.press('Home');
  await page.waitForTimeout(220);
  check('Home selects the first mode', (await page.getAttribute('html', 'data-nanairo-color')) === 'default');

  await page.keyboard.press('End');
  await page.waitForTimeout(220);
  check('End selects the last mode', (await page.getAttribute('html', 'data-nanairo-color')) === 'saturated');

  await page.keyboard.press('Home');
  await page.waitForTimeout(220);

  // ---- speech -------------------------------------------------------------
  console.log('\nread aloud');
  await shadow(page).locator('.preference-row', { hasText: '音声読み上げ' }).click();
  await page.waitForTimeout(400);
  const spoken = await page.evaluate(() => window.__spoken.slice());
  const joined = spoken.join('\n');
  check('speaks the page', spoken.length > 0, `${spoken.length} utterance(s)`);
  check('reads list items', joined.includes('リスト項目'));
  check('reads table cells', joined.includes('セルのテキスト'));
  check('reads h4 headings', joined.includes('小見出し'));
  check('reads definition descriptions', joined.includes('用語の説明'));
  check('does not repeat a wrapper block', spoken.filter((text) => text.includes('詳細の中身')).length === 1);
  check('keeps utterances within the limit', spoken.every((text) => text.length <= 220));
  check('utterances are trimmed and non-empty', spoken.every((text) => text.length > 0 && text === text.trim()));
  const longParts = spoken.filter((text) => text.includes('長文テスト'));
  check('splits a long paragraph into several utterances', longParts.length > 1, `${longParts.length} part(s)`);
  check('splits it at sentence boundaries', longParts.every((text) => text.endsWith('。')));

  // ---- media --------------------------------------------------------------
  console.log('\nmedia stop & mute');
  await page.evaluate(async () => {
    const clip = document.getElementById('clip');
    clip.muted = false;
    clip.loop = true;
    await clip.play();
  });
  await page.waitForTimeout(200);
  check('clip is playing before the toggle', await page.evaluate(() => !document.getElementById('clip').paused));

  await shadow(page).locator('.preference-row', { hasText: 'メディアを停止' }).click();
  await page.waitForTimeout(250);
  check('toggle pauses and mutes', await page.evaluate(() => {
    const clip = document.getElementById('clip');
    return clip.paused && clip.muted;
  }));

  await shadow(page).locator('.preference-row', { hasText: 'メディアを停止' }).click();
  await page.waitForTimeout(400);
  const restored = await page.evaluate(() => {
    const clip = document.getElementById('clip');
    return { muted: clip.muted, paused: clip.paused };
  });
  check('releasing restores the mute state', restored.muted === false);
  check('releasing resumes playback', restored.paused === false);

  // ---- unsupported locale -------------------------------------------------
  console.log('\nunsupported locale');
  const before = errors.length;
  await page.evaluate(() => document.querySelector('nanairo-accessibility').setAttribute('locale', 'fr'));
  await page.waitForTimeout(300);
  check('does not raise an error', errors.length === before, errors.slice(before).join(' | '));
  check('falls back to Japanese', (await shadow(page).locator('#nanairo-panel-title').textContent()) === '表示サポート');
  check('normalizes the attribute', (await shadow(page).getAttribute('locale')) === 'ja');

  // ---- stored preferences -------------------------------------------------
  console.log('\nstored preferences');
  await page.evaluate(() => localStorage.setItem('nanairo:a11y:preferences:v1', JSON.stringify({
    schemaVersion: 1,
    locale: 'ja',
    textScale: 2.7,
    comfortableSpacing: '<img src=x onerror=alert(1)>',
    unknownKey: 'junk',
  })));
  await page.reload();
  await page.waitForSelector('nanairo-accessibility', { state: 'attached' });
  await openPanel(page);
  check('rounds a fractional text scale', (await page.getAttribute('html', 'data-nanairo-text-scale')) === '3');
  // Scaling is per element rather than on the root, so px-sized content grows too.
  check(
    'applies the rounded scale',
    (await page.evaluate(() => getComputedStyle(document.querySelector('main p')).fontSize)) === '24px',
    await page.evaluate(() => getComputedStyle(document.querySelector('main p')).fontSize),
  );
  check('shows a real percentage', (await shadow(page).locator('output').textContent())?.trim() === '150%');
  check('ignores a non-boolean toggle', (await page.getAttribute('html', 'data-nanairo-spacing')) === 'default');
  await shadow(page).locator('.preference-row', { hasText: 'ゆったり表示' }).click();
  await page.waitForTimeout(220);
  const persisted = await page.evaluate(() => localStorage.getItem('nanairo:a11y:preferences:v1') ?? '');
  check('drops unknown keys on the next save', !persisted.includes('unknownKey'));
  check('drops non-boolean toggle values on the next save', !persisted.includes('onerror'));

  // ---- duplicate instance -------------------------------------------------
  console.log('\nduplicate instance');
  const instances = await page.evaluate(async () => {
    document.body.append(document.createElement('nanairo-accessibility'));
    await new Promise((done) => setTimeout(done, 100));
    return document.querySelectorAll('nanairo-accessibility').length;
  });
  check('a second element removes itself', instances === 1, `${instances} instance(s)`);

  // ---- WordPress style start-up ------------------------------------------
  console.log('\nsettings-object start-up (WordPress path)');
  const wordpressPage = await context.newPage();
  const wordpressErrors = [];
  wordpressPage.on('pageerror', (error) => wordpressErrors.push(error.message));
  await wordpressPage.route('**/wp-fixture.html', (route) => route.fulfill({
    contentType: 'text/html',
    body: `<!doctype html><html lang="ja"><head><meta charset="utf-8"></head><body><main><p>本文</p></main>
      <script>window.nanairoAccessibilitySettings = { locale: 'en', position: 'left', showBranding: false };</script>
      <script src="./${BUNDLE}" defer></script></body></html>`,
  }));
  await wordpressPage.route(`**/${BUNDLE}`, (route) => route.fulfill({
    contentType: 'text/javascript',
    path: join(root, 'dist', BUNDLE),
  }));
  await wordpressPage.goto('https://nanairo.test/wp-fixture.html');
  await wordpressPage.waitForSelector('nanairo-accessibility', { state: 'attached' });
  await wordpressPage.waitForTimeout(300);
  check('starts from the settings object', (await wordpressPage.locator('nanairo-accessibility').count()) === 1);
  check('honours the locale', (await wordpressPage.getAttribute('nanairo-accessibility', 'locale')) === 'en');
  check('honours the position', (await wordpressPage.getAttribute('nanairo-accessibility', 'position')) === 'left');
  check('honours the branding opt-out', await wordpressPage.evaluate(
    () => document.querySelector('nanairo-accessibility').shadowRoot.querySelector('.footer-brand') === null,
  ));
  check('raises no error', wordpressErrors.length === 0, wordpressErrors.join(' | '));

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
