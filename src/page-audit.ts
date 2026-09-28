import type { Locale } from './i18n';
import { withPageEffectsSuspended } from './page-effects';

export type AuditStatus = 'pass' | 'warning' | 'manual';

/**
 * Mirrors the guidebook's own priority split: section 3.1 (非干渉) first,
 * then section 3.2 (必須).
 */
export type AuditSeverity = 'severe' | 'required';

export type AuditItemId =
  | 'autoplay'
  | 'keyboardTrap'
  | 'flashing'
  | 'autoAdvance'
  | 'altText'
  | 'keyboard'
  | 'timeLimits'
  | 'colorOnly'
  | 'readingOrder'
  | 'headings'
  | 'contrast'
  | 'textResize'
  | 'charsetFont'
  | 'pageTitle'
  | 'links'
  | 'consistency';

export interface AuditItem {
  id: AuditItemId;
  severity: AuditSeverity;
  status: AuditStatus;
  count: number;
  label: string;
  detail: string;
  /** The manual-review caveat, carried on every result that is not already manual. */
  note?: string;
}

export interface PageAuditResult {
  checkedAt: number;
  items: AuditItem[];
  warningCount: number;
  manualCount: number;
}

/**
 * How a count turns into a status.
 *
 * - `auto`: nothing found means the automatic part found nothing.
 * - `manualWhenClean`: the automatic part cannot cover the criterion, so a
 *   clean run still asks for a human check.
 * - `alwaysManual`: not decidable from the DOM at all.
 */
type AuditMode = 'auto' | 'manualWhenClean' | 'alwaysManual';

type LocalizedCopy = Record<Locale, { label: string; pass: string; warning: string; manual: string }>;

const copy: Record<AuditItemId, LocalizedCopy> = {
  autoplay: {
    ja: { label: '自動再生させない', pass: '自動再生の指定は見つかりませんでした', warning: 'ミュートされていない自動再生メディア', manual: '動画内の音声と3秒以内かの判定は目視確認が必要' },
    en: { label: 'No autoplay', pass: 'No autoplay attributes found', warning: 'Unmuted autoplaying media', manual: 'In-video audio and the 3-second limit need manual review' },
  },
  keyboardTrap: {
    ja: { label: 'キーボードの袋小路を作らない', pass: '自動判定対象外', warning: 'フォーカスが抜けられない可能性のある要素', manual: 'モーダルやプレイヤーからフォーカスが抜けるかは実際の操作で確認が必要' },
    en: { label: 'No keyboard trap', pass: 'Not automatically testable', warning: 'Elements that may trap focus', manual: 'Escaping modals and players must be tested by hand' },
  },
  flashing: {
    ja: { label: '光の点滅は危険', pass: '高速で繰り返すアニメーションは見つかりませんでした', warning: '1秒に3回を超える点滅の候補', manual: '動画・Canvas・GIFの点滅は自動判定できず目視確認が必要' },
    en: { label: 'No rapid flashing', pass: 'No rapidly repeating animation found', warning: 'Candidates flashing more than three times per second', manual: 'Flashing in video, canvas or GIF needs manual review' },
  },
  autoAdvance: {
    ja: { label: '自動でコンテンツを切り替えない', pass: '自動で動き続ける要素は見つかりませんでした', warning: '一時停止手段が必要な自動切り替えの候補', manual: '一時停止・停止・非表示の操作が備わっているかは目視確認が必要' },
    en: { label: 'No automatic content changes', pass: 'No continuously moving content found', warning: 'Auto-advancing content that needs a pause control', manual: 'Pause, stop and hide controls need manual review' },
  },
  altText: {
    ja: { label: '画像の代替テキスト', pass: 'alt属性の欠落は見つかりませんでした', warning: 'alt属性がない画像', manual: 'alt属性があっても内容が適切かは自動判定できず目視確認が必要' },
    en: { label: 'Image alternative text', pass: 'No missing alt attributes found', warning: 'Images without an alt attribute', manual: 'A present alt says nothing about its quality; review it by hand' },
  },
  keyboard: {
    ja: { label: 'キーボード操作', pass: '自動検出範囲では問題なし', warning: 'キーボード操作できない可能性のある要素', manual: 'すべての機能が操作でき、フォーカスが見えるかは実際の操作で確認が必要' },
    en: { label: 'Keyboard access', pass: 'No automatic issues found', warning: 'Potentially inaccessible interactive elements', manual: 'Full operability and a visible focus indicator must be tested by hand' },
  },
  timeLimits: {
    ja: { label: '制限時間への対応', pass: '自動更新・カウントダウン候補なし', warning: '制限時間または自動更新の候補', manual: 'セッションやスクリプト内の制限時間は目視確認が必要' },
    en: { label: 'Time limits', pass: 'No refresh or countdown candidates found', warning: 'Possible time limit or automatic refresh', manual: 'Session and script-based limits need manual review' },
  },
  colorOnly: {
    ja: { label: '色・形だけに依存した情報', pass: '自動判定対象外', warning: '色だけで示している可能性のある要素', manual: '色・太字・位置・形だけで意味を伝えていないかは自動判定できず目視確認が必要' },
    en: { label: 'Information conveyed by color or shape', pass: 'Not automatically testable', warning: 'Elements may rely on color alone', manual: 'Whether meaning rests on color, weight, position or shape alone needs manual review' },
  },
  readingOrder: {
    ja: { label: '読み上げ・フォーカス順序', pass: '正のtabindexやCSS orderは見つかりませんでした', warning: '順序を変えている可能性のある要素', manual: '読み上げ順序で意味が通じるかはスクリーンリーダーでの確認が必要' },
    en: { label: 'Reading and focus order', pass: 'No positive tabindex or CSS order found', warning: 'Elements may override the expected order', manual: 'Whether the spoken order makes sense needs a screen-reader check' },
  },
  headings: {
    ja: { label: '見出し構造', pass: '見出し階層の自動検出範囲では問題なし', warning: '空見出し、H1不足・重複、階層飛び', manual: '見出し文が内容を表しているかは自動判定できず目視確認が必要' },
    en: { label: 'Heading structure', pass: 'No automatic heading-structure issues found', warning: 'Empty headings, H1 issues, or skipped levels', manual: 'Whether the wording describes the section needs manual review' },
  },
  contrast: {
    ja: { label: 'コントラスト', pass: '測定可能な文字は基準値以上', warning: '基準値未満の可能性がある文字', manual: '画像・グラデーション上の文字は測定できず目視確認が必要' },
    en: { label: 'Contrast', pass: 'Measurable text meets the threshold', warning: 'Text may be below the contrast threshold', manual: 'Text over images or gradients cannot be measured; review it by hand' },
  },
  textResize: {
    ja: { label: '200%拡大', pass: 'ズームを制限する指定は見つかりませんでした', warning: 'ズームを制限するviewport設定', manual: '200%で文字が重なったり見切れないかは実ページでの確認が必要' },
    en: { label: '200% text resize', pass: 'No zoom-restricting settings found', warning: 'Viewport settings restrict zoom', manual: 'Overlap and clipping at 200% need checking on the real page' },
  },
  charsetFont: {
    ja: { label: '文字コードとフォント', pass: 'UTF-8で、極端に小さい文字もありません', warning: 'UTF-8以外の文字コード、または極端に小さい文字', manual: 'アイコンフォント、誤った文字、記号の読み上げは目視確認が必要' },
    en: { label: 'Character encoding and fonts', pass: 'UTF-8, and no extremely small text', warning: 'Encoding other than UTF-8, or extremely small text', manual: 'Icon fonts, look-alike characters and symbol pronunciation need manual review' },
  },
  pageTitle: {
    ja: { label: 'ページタイトル', pass: 'ページタイトルが設定されています', warning: 'ページタイトルが未設定または曖昧', manual: 'H1との整合性とページ間の重複はサイト全体での確認が必要' },
    en: { label: 'Page title', pass: 'A page title is present', warning: 'Missing or ambiguous page title', manual: 'H1 alignment and cross-page duplication need a site-wide review' },
  },
  links: {
    ja: { label: 'リンクの強調・表現', pass: 'リンク名の自動検出範囲では問題なし', warning: '名前がない、または目的が曖昧なリンク', manual: 'リンク先形式（PDF等）と別画面表示の予告は目視確認が必要' },
    en: { label: 'Link visibility and purpose', pass: 'No automatic link-name issues found', warning: 'Unnamed or ambiguous links', manual: 'File types and new-window warnings need manual review' },
  },
  consistency: {
    ja: { label: 'ナビゲーション・ラベルの一貫性', pass: '名前のない操作要素は見つかりませんでした', warning: '名前のないボタン・フォーム・ナビゲーション', manual: 'ページ間の順序・表記・アイコンの一貫性は複数ページの比較が必要' },
    en: { label: 'Consistent navigation and labels', pass: 'No unnamed controls found', warning: 'Unnamed buttons, fields, or navigation', manual: 'Cross-page order, wording and icons need comparing across pages' },
  },
};

const ignored = (element: Element): boolean => Boolean(element.closest('nanairo-accessibility, [aria-hidden="true"], [hidden]'));

function visibleStyle(element: Element): CSSStyleDeclaration | null {
  if (ignored(element)) return null;
  const style = getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return null;
  return style;
}

const visible = (element: Element): boolean => visibleStyle(element) !== null;

function accessibleName(element: Element): string {
  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) {
    const label = labelledBy.split(/\s+/).map((id) => document.getElementById(id)?.textContent ?? '').join(' ').trim();
    if (label) return label;
  }
  const ariaLabel = element.getAttribute('aria-label')?.trim();
  if (ariaLabel) return ariaLabel;
  if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
    const label = Array.from(element.labels ?? []).map((item) => item.textContent?.trim() ?? '').filter(Boolean).join(' ');
    if (label) return label;
    if (element instanceof HTMLInputElement) {
      // An image button is named by its alt text, not by its (absent) content.
      if (element.type === 'image') return element.alt.trim();
      if (element.type === 'submit' || element.type === 'button') return element.value.trim();
    }
  }
  const imageAlt = element.querySelector('img[alt]')?.getAttribute('alt')?.trim();
  return element.textContent?.replace(/\s+/g, ' ').trim() || imageAlt || element.getAttribute('title')?.trim() || '';
}

function parseRgb(value: string): [number, number, number, number] | null {
  const match = value.match(/rgba?\((\d+(?:\.\d+)?)[, ]+(\d+(?:\.\d+)?)[, ]+(\d+(?:\.\d+)?)(?:[, /]+(\d+(?:\.\d+)?))?\)/);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3]), match[4] === undefined ? 1 : Number(match[4])];
}

export function relativeLuminance([red, green, blue]: [number, number, number]): number {
  const channel = (value: number) => {
    const normalized = value / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue);
}

export function contrastRatio(foreground: [number, number, number], background: [number, number, number]): number {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * The colour actually behind `element`, or null when CSS cannot tell.
 *
 * A background image anywhere up the chain, or a colour in a syntax this
 * parser does not read, makes the result unknowable. Returning null keeps
 * those elements out of the pass/fail counts instead of comparing them
 * against an assumed white page, which reported white-on-dark text as a
 * contrast failure.
 */
function opaqueBackground(element: Element): [number, number, number] | null {
  let current: Element | null = element;
  while (current) {
    const style = getComputedStyle(current);
    if (style.backgroundImage !== 'none') return null;

    const parsed = parseRgb(style.backgroundColor);
    if (!parsed) return null;
    if (parsed[3] >= 0.95) return [parsed[0], parsed[1], parsed[2]];
    current = current.parentElement;
  }
  return [255, 255, 255];
}

/** Link text that says nothing about the destination. */
const VAGUE_LINK_NAMES = ['\u3053\u3061\u3089', '\u3053\u3053', '\u8a73\u3057\u304f\u306f\u3053\u3061\u3089', '\u8a73\u7d30', 'more', 'click here', 'read more'];
const GENERIC_TITLES = ['home', '\u30db\u30fc\u30e0', 'untitled', '\u7121\u984c', 'new page'];

const TEXT_SELECTOR = 'h1, h2, h3, h4, h5, h6, p, li, dt, dd, figcaption, label, a, button, td, th, small, strong';

function measureContrast(): { failures: number; unmeasurable: number } {
  let failures = 0;
  let unmeasurable = 0;

  document.querySelectorAll<HTMLElement>(TEXT_SELECTOR).forEach((element) => {
    const style = visibleStyle(element);
    if (!style || !element.textContent?.trim()) return;

    const foreground = parseRgb(style.color);
    const background = opaqueBackground(element);
    if (!foreground || foreground[3] < 0.95 || !background) {
      unmeasurable += 1;
      return;
    }

    const fontSize = Number.parseFloat(style.fontSize);
    const fontWeight = Number.parseInt(style.fontWeight, 10) || (style.fontWeight === 'bold' ? 700 : 400);
    const large = fontSize >= 24 || (fontWeight >= 700 && fontSize >= 18.66);
    if (contrastRatio([foreground[0], foreground[1], foreground[2]], background) < (large ? 3 : 4.5)) failures += 1;
  });

  return { failures, unmeasurable };
}

function headingIssues(): number {
  const headings = Array.from(document.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6')).filter(visible);
  let issues = headings.filter((heading) => !heading.textContent?.trim()).length;

  const h1Count = headings.filter((heading) => heading.tagName === 'H1').length;
  if (h1Count !== 1) issues += Math.abs(1 - h1Count);

  let previous = 0;
  headings.forEach((heading) => {
    const level = Number(heading.tagName.slice(1));
    if (previous && level > previous + 1) issues += 1;
    previous = level;
  });
  return issues;
}

interface BodyWalkCounts {
  cssOrder: number;
  verySmallText: number;
  /** Infinite animation with a cycle under a third of a second: over 3 flashes per second. */
  rapidFlash: number;
  /** Anything animating forever, which needs a pause control. */
  endlessMotion: number;
}

/**
 * One pass over the body. Each element costs a style resolution, so the
 * counts that need `getComputedStyle` are gathered together rather than in a
 * walk per check.
 */
function walkBody(): BodyWalkCounts {
  const counts: BodyWalkCounts = { cssOrder: 0, verySmallText: 0, rapidFlash: 0, endlessMotion: 0 };

  document.querySelectorAll<HTMLElement>('body *').forEach((element) => {
    const style = visibleStyle(element);
    if (!style) return;

    if (Number(style.order) !== 0) counts.cssOrder += 1;
    if (element.children.length === 0 && element.textContent?.trim() && Number.parseFloat(style.fontSize) < 10) {
      counts.verySmallText += 1;
    }
    const iterations = style.animationIterationCount.split(',').map((value) => value.trim());
    const durations = style.animationDuration.split(',').map((value) => Number.parseFloat(value));
    iterations.forEach((iteration, index) => {
      if (iteration !== 'infinite') return;
      counts.endlessMotion += 1;
      const seconds = durations[index] ?? durations[0] ?? 0;
      if (seconds > 0 && seconds < 1 / 3) counts.rapidFlash += 1;
    });
  });

  return counts;
}

function makeItem(
  id: AuditItemId,
  severity: AuditSeverity,
  locale: Locale,
  count: number,
  mode: AuditMode = 'auto',
): AuditItem {
  const localized = copy[id][locale];
  const status: AuditStatus = mode === 'alwaysManual'
    ? 'manual'
    : count > 0
      ? 'warning'
      : mode === 'manualWhenClean'
        ? 'manual'
        : 'pass';

  return {
    id,
    severity,
    status,
    count,
    label: localized.label,
    detail: status === 'warning' ? localized.warning : status === 'manual' ? localized.manual : localized.pass,
    // An automated result is never conformance, so the caveat rides along on
    // every item that is not already asking for a human check.
    note: status === 'manual' ? undefined : localized.manual,
  };
}

function collect(locale: Locale): AuditItem[] {
  const walk = walkBody();

  const interactiveSelector = 'a[href], button, input, select, textarea, [role="button"], [role="link"], [tabindex], [onclick]';
  const interactives = Array.from(document.querySelectorAll<HTMLElement>(interactiveSelector)).filter(visible);
  const nonSemanticInteractive = interactives.filter((element) => (
    element.hasAttribute('onclick')
    && !element.matches('a[href], button, input, select, textarea, [role="button"], [role="link"]')
    && !element.hasAttribute('tabindex')
  )).length;
  const positiveTabindex = interactives.filter((element) => Number(element.getAttribute('tabindex')) > 0).length;

  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]')).filter(visible);
  // Built from string literals so the bundler can escape them; a regex
  // literal keeps its raw bytes and breaks when the page encoding differs.
  const vagueLinkPattern = new RegExp(`^(${VAGUE_LINK_NAMES.join('|')})$`, 'i');
  const linkIssues = links.filter((link) => {
    const name = accessibleName(link);
    return !name || vagueLinkPattern.test(name);
  }).length;

  const altIssues = Array.from(document.querySelectorAll<HTMLImageElement>('img')).filter((image) => visible(image) && !image.hasAttribute('alt')).length
    + document.querySelectorAll('input[type="image"]:not([alt]), area:not([alt])').length;

  const timerCandidates = document.querySelectorAll('meta[http-equiv="refresh" i], [data-timeout], [data-countdown], [class*="countdown" i], [id*="countdown" i], [class*="timer" i], [id*="timer" i]').length;

  const autoplayMedia = Array.from(document.querySelectorAll<HTMLMediaElement>('video[autoplay], audio[autoplay]'))
    .filter((media) => !media.muted && !ignored(media)).length;
  const legacyMotion = document.querySelectorAll('marquee, blink').length;

  const viewport = document.querySelector<HTMLMetaElement>('meta[name="viewport"]')?.content.toLowerCase() ?? '';
  const maximumScale = /maximum-scale\s*=\s*([\d.]+)/.exec(viewport);
  const zoomRestricted = /user-scalable\s*=\s*(no|0)/.test(viewport)
    || (maximumScale !== null && Number(maximumScale[1]) < 2);

  const title = document.title.replace(/\s+/g, ' ').trim();
  const genericTitlePattern = new RegExp(`^(${GENERIC_TITLES.join('|')})$`, 'i');
  const titleIssues = !title || genericTitlePattern.test(title) ? 1 : 0;

  // 必須「現在の HTML では、文字コードとして UTF-8 を使うべき」
  const encodingIssues = document.characterSet.toUpperCase() === 'UTF-8' ? 0 : 1;

  const controls = Array.from(document.querySelectorAll<HTMLElement>('button, input:not([type="hidden"]), select, textarea, [role="button"]')).filter(visible);
  const unnamedControls = controls.filter((element) => !accessibleName(element)).length;
  const navigations = Array.from(document.querySelectorAll<HTMLElement>('nav, [role="navigation"]')).filter(visible);
  const unnamedNavigations = navigations.length > 1 ? navigations.filter((element) => !accessibleName(element)).length : 0;

  const contrast = measureContrast();

  return [
    // 3.1 達成しないと利用者に重大な悪影響を及ぼすもの
    makeItem('autoplay', 'severe', locale, autoplayMedia, 'manualWhenClean'),
    makeItem('keyboardTrap', 'severe', locale, 0, 'alwaysManual'),
    makeItem('flashing', 'severe', locale, walk.rapidFlash + legacyMotion, 'manualWhenClean'),
    makeItem('autoAdvance', 'severe', locale, walk.endlessMotion + legacyMotion, 'manualWhenClean'),

    // 3.2 必ず達成しなければならないもの
    makeItem('altText', 'required', locale, altIssues),
    makeItem('keyboard', 'required', locale, nonSemanticInteractive + positiveTabindex, 'manualWhenClean'),
    makeItem('timeLimits', 'required', locale, timerCandidates, 'manualWhenClean'),
    makeItem('colorOnly', 'required', locale, 0, 'alwaysManual'),
    makeItem('readingOrder', 'required', locale, positiveTabindex + walk.cssOrder, 'manualWhenClean'),
    makeItem('headings', 'required', locale, headingIssues()),
    makeItem('contrast', 'required', locale, contrast.failures, contrast.unmeasurable > 0 ? 'manualWhenClean' : 'auto'),
    makeItem('textResize', 'required', locale, zoomRestricted ? 1 : 0, 'manualWhenClean'),
    makeItem('charsetFont', 'required', locale, encodingIssues + walk.verySmallText),
    makeItem('pageTitle', 'required', locale, titleIssues),
    makeItem('links', 'required', locale, linkIssues),
    makeItem('consistency', 'required', locale, unnamedControls + unnamedNavigations, 'manualWhenClean'),
  ];
}

export function auditPage(locale: Locale = 'ja'): PageAuditResult {
  // Measured with this widget's own overrides off; see withPageEffectsSuspended.
  const items = withPageEffectsSuspended(() => collect(locale));

  return {
    checkedAt: Date.now(),
    items,
    warningCount: items.filter((item) => item.status === 'warning').length,
    manualCount: items.filter((item) => item.status === 'manual').length,
  };
}
