import type { Locale } from './i18n';

export type AuditStatus = 'pass' | 'warning' | 'manual';

export type AuditItemId =
  | 'keyboard'
  | 'contrast'
  | 'font'
  | 'links'
  | 'altText'
  | 'timeLimits'
  | 'colorOnly'
  | 'readingOrder'
  | 'headings'
  | 'textResize'
  | 'pageTitle'
  | 'consistency';

export interface AuditItem {
  id: AuditItemId;
  status: AuditStatus;
  count: number;
  label: string;
  detail: string;
}

export interface PageAuditResult {
  checkedAt: number;
  items: AuditItem[];
  warningCount: number;
  manualCount: number;
}

type LocalizedCopy = Record<Locale, { label: string; pass: string; warning: string; manual: string }>;

const copy: Record<AuditItemId, LocalizedCopy> = {
  keyboard: {
    ja: { label: 'キーボード操作', pass: '自動検出範囲では問題なし', warning: 'キーボード操作できない可能性のある要素', manual: 'すべての操作は目視確認が必要' },
    en: { label: 'Keyboard access', pass: 'No automatic issues found', warning: 'Potentially inaccessible interactive elements', manual: 'Manual keyboard testing is required' },
  },
  contrast: {
    ja: { label: 'コントラスト', pass: '測定可能な文字は基準値以上', warning: '基準値未満の可能性がある文字', manual: '画像・グラデーション上の文字は目視確認が必要' },
    en: { label: 'Contrast', pass: 'Measurable text meets the threshold', warning: 'Text may be below the contrast threshold', manual: 'Text over images or gradients needs manual review' },
  },
  font: {
    ja: { label: 'フォント', pass: '読みやすいフォントへ切り替え可能', warning: '極端に小さい文字', manual: '文字の判別しやすさは利用者による確認が必要' },
    en: { label: 'Font', pass: 'Readable-font mode is available', warning: 'Very small text', manual: 'Legibility still needs user review' },
  },
  links: {
    ja: { label: 'リンクの強調・表現', pass: 'リンク名の自動検出範囲では問題なし', warning: '名前がない、または目的が曖昧なリンク', manual: 'リンク先形式と別画面表示は目視確認が必要' },
    en: { label: 'Link visibility and purpose', pass: 'No automatic link-name issues found', warning: 'Unnamed or ambiguous links', manual: 'File types and new-window behavior need manual review' },
  },
  altText: {
    ja: { label: '画像の代替テキスト', pass: 'alt属性の欠落は見つかりませんでした', warning: 'alt属性がない画像', manual: '代替テキストの内容は目視確認が必要' },
    en: { label: 'Image alternative text', pass: 'No missing alt attributes found', warning: 'Images without an alt attribute', manual: 'Alt-text quality needs manual review' },
  },
  timeLimits: {
    ja: { label: '制限時間への対応', pass: '自動更新・カウントダウン候補なし', warning: '制限時間または自動更新の候補', manual: 'スクリプト内の制限時間は目視確認が必要' },
    en: { label: 'Time limits', pass: 'No refresh or countdown candidates found', warning: 'Possible time limit or automatic refresh', manual: 'Script-based limits need manual review' },
  },
  colorOnly: {
    ja: { label: '色・形だけに依存した情報', pass: '自動判定対象外', warning: '色だけで示している可能性のある要素', manual: '意味の伝え方は目視確認が必要' },
    en: { label: 'Information conveyed by color or shape', pass: 'Not automatically testable', warning: 'Elements may rely on color alone', manual: 'Meaning and visual cues need manual review' },
  },
  readingOrder: {
    ja: { label: '読み上げ・フォーカス順序', pass: '正のtabindexやCSS orderは見つかりませんでした', warning: '順序を変えている可能性のある要素', manual: '実際の読み上げ順序は確認が必要' },
    en: { label: 'Reading and focus order', pass: 'No positive tabindex or CSS order found', warning: 'Elements may override the expected order', manual: 'Actual reading order needs manual review' },
  },
  headings: {
    ja: { label: '見出し構造', pass: '見出し階層の自動検出範囲では問題なし', warning: '空見出し、H1不足・重複、階層飛び', manual: '見出し文の適切さは目視確認が必要' },
    en: { label: 'Heading structure', pass: 'No automatic heading-structure issues found', warning: 'Empty headings, H1 issues, or skipped levels', manual: 'Heading wording needs manual review' },
  },
  textResize: {
    ja: { label: '200%拡大', pass: '200%表示を選択できます', warning: 'ズームを制限するviewport設定', manual: '重なりや見切れは200%で確認が必要' },
    en: { label: '200% text resize', pass: 'A 200% text option is available', warning: 'Viewport settings may restrict zoom', manual: 'Clipping and overlap need review at 200%' },
  },
  pageTitle: {
    ja: { label: 'ページタイトル', pass: 'ページタイトルが設定されています', warning: 'ページタイトルが未設定または曖昧', manual: 'H1との整合性とページ間の重複は確認が必要' },
    en: { label: 'Page title', pass: 'A page title is present', warning: 'Missing or ambiguous page title', manual: 'H1 alignment and cross-page duplication need review' },
  },
  consistency: {
    ja: { label: 'ナビゲーション・ラベルの一貫性', pass: '名前のない操作要素は見つかりませんでした', warning: '名前のないボタン・フォーム・ナビゲーション', manual: 'ページ間の順序と表記は確認が必要' },
    en: { label: 'Consistent navigation and labels', pass: 'No unnamed controls found', warning: 'Unnamed buttons, fields, or navigation', manual: 'Cross-page order and wording need review' },
  },
};

const ignored = (element: Element): boolean => Boolean(element.closest('nanairo-accessibility, [aria-hidden="true"], [hidden]'));

function visible(element: Element): boolean {
  if (ignored(element)) return false;
  const style = getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0;
}

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
    if (element instanceof HTMLInputElement && (element.type === 'submit' || element.type === 'button')) return element.value.trim();
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

function opaqueBackground(element: Element): [number, number, number] | null {
  let current: Element | null = element;
  while (current) {
    const parsed = parseRgb(getComputedStyle(current).backgroundColor);
    if (parsed && parsed[3] >= 0.95) return [parsed[0], parsed[1], parsed[2]];
    current = current.parentElement;
  }
  const root = parseRgb(getComputedStyle(document.documentElement).backgroundColor);
  return root && root[3] >= 0.95 ? [root[0], root[1], root[2]] : [255, 255, 255];
}

function countContrastIssues(): number {
  const selector = 'h1, h2, h3, h4, h5, h6, p, li, dt, dd, figcaption, label, a, button, td, th, small, strong';
  let issues = 0;
  document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    if (!visible(element) || !element.textContent?.trim()) return;
    const style = getComputedStyle(element);
    if (style.backgroundImage !== 'none') return;
    const foreground = parseRgb(style.color);
    const background = opaqueBackground(element);
    if (!foreground || foreground[3] < 0.95 || !background) return;
    const fontSize = Number.parseFloat(style.fontSize);
    const fontWeight = Number.parseInt(style.fontWeight, 10) || (style.fontWeight === 'bold' ? 700 : 400);
    const large = fontSize >= 24 || (fontWeight >= 700 && fontSize >= 18.66);
    if (contrastRatio([foreground[0], foreground[1], foreground[2]], background) < (large ? 3 : 4.5)) issues += 1;
  });
  return issues;
}

function headingIssues(): number {
  const headings = Array.from(document.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6')).filter(visible);
  let issues = headings.filter((heading) => !heading.textContent?.trim()).length;
  const h1Count = headings.filter((heading) => heading.tagName === 'H1').length;
  if (h1Count !== 1) issues += Math.abs(1 - h1Count) || 1;
  let previous = 0;
  headings.forEach((heading) => {
    const level = Number(heading.tagName.slice(1));
    if (previous && level > previous + 1) issues += 1;
    previous = level;
  });
  return issues;
}

function makeItem(id: AuditItemId, locale: Locale, count: number, forceManual = false): AuditItem {
  const localized = copy[id][locale];
  const status: AuditStatus = count > 0 ? 'warning' : forceManual ? 'manual' : 'pass';
  return {
    id,
    status,
    count,
    label: localized.label,
    detail: status === 'warning' ? localized.warning : status === 'manual' ? localized.manual : localized.pass,
  };
}

export function auditPage(locale: Locale = 'ja'): PageAuditResult {
  const interactiveSelector = 'a[href], button, input, select, textarea, [role="button"], [role="link"], [tabindex], [onclick]';
  const interactives = Array.from(document.querySelectorAll<HTMLElement>(interactiveSelector)).filter(visible);
  const nonSemanticInteractive = interactives.filter((element) => (
    element.hasAttribute('onclick')
    && !element.matches('a[href], button, input, select, textarea, [role="button"], [role="link"]')
    && !element.hasAttribute('tabindex')
  )).length;
  const positiveTabindex = interactives.filter((element) => Number(element.getAttribute('tabindex')) > 0).length;
  const cssOrder = Array.from(document.querySelectorAll<HTMLElement>('body *')).filter((element) => visible(element) && Number(getComputedStyle(element).order) !== 0).length;

  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]')).filter(visible);
  const vagueLinkPattern = /^(こちら|ここ|詳しくはこちら|詳細|more|click here|read more)$/i;
  const linkIssues = links.filter((link) => {
    const name = accessibleName(link);
    return !name || vagueLinkPattern.test(name);
  }).length;

  const altIssues = Array.from(document.querySelectorAll<HTMLImageElement>('img')).filter((image) => visible(image) && !image.hasAttribute('alt')).length
    + document.querySelectorAll('input[type="image"]:not([alt]), area:not([alt])').length;

  const timerCandidates = document.querySelectorAll('meta[http-equiv="refresh" i], [data-timeout], [data-countdown], [class*="countdown" i], [id*="countdown" i], [class*="timer" i], [id*="timer" i]').length;
  const coloredCandidates = Array.from(document.querySelectorAll<HTMLElement>('[style*="color" i], .required, .error, .warning')).filter(visible).length;

  const verySmallText = Array.from(document.querySelectorAll<HTMLElement>('body *')).filter((element) => {
    if (!visible(element) || !element.textContent?.trim() || element.children.length > 0) return false;
    return Number.parseFloat(getComputedStyle(element).fontSize) < 10;
  }).length;

  const viewport = document.querySelector<HTMLMetaElement>('meta[name="viewport"]')?.content.toLowerCase() ?? '';
  const zoomRestricted = viewport.includes('user-scalable=no') || /maximum-scale\s*=\s*(?:0|1(?:\.0+)?)(?:,|$)/.test(viewport);

  const title = document.title.replace(/\s+/g, ' ').trim();
  const genericTitlePattern = /^(home|ホーム|untitled|無題|new page)$/i;
  const titleIssues = !title || genericTitlePattern.test(title) ? 1 : 0;

  const controls = Array.from(document.querySelectorAll<HTMLElement>('button, input:not([type="hidden"]), select, textarea, [role="button"]')).filter(visible);
  const unnamedControls = controls.filter((element) => !accessibleName(element)).length;
  const navigations = Array.from(document.querySelectorAll<HTMLElement>('nav, [role="navigation"]')).filter(visible);
  const unnamedNavigations = navigations.length > 1 ? navigations.filter((element) => !accessibleName(element)).length : 0;

  const items = [
    makeItem('keyboard', locale, nonSemanticInteractive + positiveTabindex),
    makeItem('contrast', locale, countContrastIssues()),
    makeItem('font', locale, verySmallText),
    makeItem('links', locale, linkIssues),
    makeItem('altText', locale, altIssues),
    makeItem('timeLimits', locale, timerCandidates, timerCandidates === 0),
    makeItem('colorOnly', locale, coloredCandidates, true),
    makeItem('readingOrder', locale, positiveTabindex + cssOrder, positiveTabindex + cssOrder === 0),
    makeItem('headings', locale, headingIssues()),
    makeItem('textResize', locale, zoomRestricted ? 1 : 0, !zoomRestricted),
    makeItem('pageTitle', locale, titleIssues),
    makeItem('consistency', locale, unnamedControls + unnamedNavigations, unnamedControls + unnamedNavigations === 0),
  ];

  return {
    checkedAt: Date.now(),
    items,
    warningCount: items.filter((item) => item.status === 'warning').length,
    manualCount: items.filter((item) => item.status === 'manual').length,
  };
}
