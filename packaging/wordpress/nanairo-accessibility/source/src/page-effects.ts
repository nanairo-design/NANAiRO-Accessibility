import type { Preferences } from './state';

const STYLE_ID = 'nanairo-a11y-page-styles';
const GUIDE_ID = 'nanairo-a11y-reading-guide';
const MASK_ID = 'nanairo-a11y-reading-mask';

const PAGE_STYLES = `
html[data-nanairo-text-scale="1"] { font-size: 112.5%; }
html[data-nanairo-text-scale="2"] { font-size: 125%; }
html[data-nanairo-text-scale="3"] { font-size: 150%; }
html[data-nanairo-text-scale="4"] { font-size: 175%; }

html[data-nanairo-spacing="comfortable"] body :where(p, li, dd, dt, blockquote, figcaption, label, input, textarea, button) {
  line-height: 1.8 !important;
  letter-spacing: 0.055em !important;
  word-spacing: 0.12em !important;
}

html[data-nanairo-links="highlight"] body a:not([data-nanairo-ignore]) {
  color: #064e96 !important;
  background: color-mix(in srgb, #7ac8ff 24%, transparent) !important;
  text-decoration: underline 0.16em !important;
  text-underline-offset: 0.2em !important;
  outline-offset: 3px !important;
  border-radius: 0.18em;
}

html[data-nanairo-color="dark"] body {
  color: #f7fbf9 !important;
  background: #181b1a !important;
  color-scheme: dark;
}

html[data-nanairo-color="dark"] body :where(main, section, article, aside, header, footer, nav, div, ul, ol, li, table, thead, tbody, tr, td, th, form) {
  color: #f7fbf9 !important;
  background-color: #181b1a !important;
  background-image: none !important;
  border-color: #59645f !important;
  box-shadow: none !important;
  text-shadow: none !important;
}

html[data-nanairo-color="dark"] body :where(h1, h2, h3, h4, h5, h6, p, li, dt, dd, blockquote, figcaption, label, span, strong, small) {
  color: #f7fbf9 !important;
  background-color: transparent !important;
  text-shadow: none !important;
}

html[data-nanairo-color="dark"] body :where(input, select, textarea, button) {
  color: #fff !important;
  background-color: #252a28 !important;
  border-color: #76827d !important;
}

html[data-nanairo-color="dark"] body a:not([data-nanairo-ignore]) {
  color: #a2e6cc !important;
  background-color: #252a28 !important;
  border-color: #76827d !important;
  text-decoration-color: currentColor !important;
}

html[data-nanairo-color="light"] body,
html[data-nanairo-color="light"] body :where(main, section, article, aside, header, footer, nav, div, ul, ol, li, table, thead, tbody, tr, td, th, form) {
  color: #27272d !important;
  background-color: #fff !important;
  background-image: none !important;
  border-color: #b7bfbc !important;
  box-shadow: none !important;
  text-shadow: none !important;
  color-scheme: light;
}

html[data-nanairo-color="light"] body :where(h1, h2, h3, h4, h5, h6, p, li, dt, dd, blockquote, figcaption, label, span, strong, small, a) {
  color: #27272d !important;
  background-color: transparent !important;
  text-shadow: none !important;
}

html[data-nanairo-color="monochrome"] body > :not(nanairo-accessibility) {
  filter: grayscale(100%) !important;
}

html[data-nanairo-color="saturated"] body > :not(nanairo-accessibility) {
  filter: saturate(180%) contrast(105%) !important;
}

html[data-nanairo-contrast="high"] body,
html[data-nanairo-contrast="high"] body :where(main, section, article, aside, header, footer, nav) {
  color: #000 !important;
  background-color: #fff !important;
  background-image: none !important;
  box-shadow: none !important;
  text-shadow: none !important;
}

html[data-nanairo-contrast="high"] body :where(h1, h2, h3, h4, h5, h6, p, li, dt, dd, blockquote, figcaption, label, span, strong, small) {
  color: #000 !important;
  text-shadow: none !important;
}

html[data-nanairo-contrast="high"] body :where(div, ul, ol, li) {
  background-color: #fff !important;
  background-image: none !important;
  box-shadow: none !important;
}

html[data-nanairo-contrast="high"] body *::before,
html[data-nanairo-contrast="high"] body *::after {
  background-image: none !important;
  box-shadow: none !important;
}

html[data-nanairo-contrast="high"] body :where(a, button, input, select, textarea, [role="button"]) {
  color: #000 !important;
  background: #fff !important;
  border-color: #000 !important;
  box-shadow: none !important;
}

html[data-nanairo-contrast="high"] body a:not([data-nanairo-ignore]) {
  color: #000 !important;
  text-decoration: underline 0.16em !important;
  text-underline-offset: 0.2em !important;
}

html[data-nanairo-contrast="high"] body :focus-visible {
  outline: 3px solid #000 !important;
  outline-offset: 4px !important;
}

html[data-nanairo-font="readable"] body {
  font-family: "BIZ UDPGothic", "Yu Gothic", "Hiragino Kaku Gothic ProN", Arial, sans-serif !important;
  font-variant-ligatures: none !important;
}

html[data-nanairo-font="readable"] body :where(button, input, select, textarea) {
  font-family: inherit !important;
}

html[data-nanairo-motion="reduce"] *,
html[data-nanairo-motion="reduce"] *::before,
html[data-nanairo-motion="reduce"] *::after {
  scroll-behavior: auto !important;
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.001ms !important;
}

#${GUIDE_ID} {
  position: fixed;
  z-index: 2147483645;
  inset-inline: 0;
  top: var(--nanairo-guide-y, 50%);
  height: 3px;
  pointer-events: none;
  background: #1677ff;
  box-shadow: 0 0 0 1px rgba(255,255,255,.88), 0 3px 18px rgba(0,83,196,.42);
  transform: translateY(-50%);
}

#${MASK_ID} {
  position: fixed;
  z-index: 2147483644;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(7, 13, 24, .58) 0,
    rgba(7, 13, 24, .58) calc(var(--nanairo-mask-y, 50%) - 42px),
    transparent calc(var(--nanairo-mask-y, 50%) - 42px),
    transparent calc(var(--nanairo-mask-y, 50%) + 42px),
    rgba(7, 13, 24, .58) calc(var(--nanairo-mask-y, 50%) + 42px),
    rgba(7, 13, 24, .58) 100%
  );
}
`;

let pointerListenerAttached = false;
let mediaObserver: MutationObserver | undefined;
const mediaStates = new Map<HTMLMediaElement, { muted: boolean }>();

function ensureStyles(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = PAGE_STYLES;
  document.head.append(style);
}

function ensureOverlay(id: string): HTMLElement {
  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement('div');
    element.id = id;
    element.setAttribute('aria-hidden', 'true');
    document.body.append(element);
  }
  return element;
}

function updatePointerPosition(event: PointerEvent): void {
  const y = `${event.clientY}px`;
  document.documentElement.style.setProperty('--nanairo-guide-y', y);
  document.documentElement.style.setProperty('--nanairo-mask-y', y);
}

function stopAndMuteMedia(media: HTMLMediaElement): void {
  if (!mediaStates.has(media)) mediaStates.set(media, { muted: media.muted });
  media.pause();
  media.muted = true;
}

function inspectAddedMedia(node: Node): void {
  if (node instanceof HTMLMediaElement) stopAndMuteMedia(node);
  if (node instanceof Element) node.querySelectorAll<HTMLMediaElement>('audio, video').forEach(stopAndMuteMedia);
}

function setMediaControl(active: boolean): void {
  if (active) {
    document.querySelectorAll<HTMLMediaElement>('audio, video').forEach(stopAndMuteMedia);
    if (!mediaObserver) {
      mediaObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => mutation.addedNodes.forEach(inspectAddedMedia));
      });
      mediaObserver.observe(document.body, { childList: true, subtree: true });
    }
    return;
  }

  mediaObserver?.disconnect();
  mediaObserver = undefined;
  mediaStates.forEach((state, media) => {
    if (media.isConnected) media.muted = state.muted;
  });
  mediaStates.clear();
}

export function applyPageEffects(preferences: Preferences): void {
  ensureStyles();
  const root = document.documentElement;

  root.dataset.nanairoTextScale = String(preferences.textScale);
  root.dataset.nanairoSpacing = preferences.comfortableSpacing ? 'comfortable' : 'default';
  root.dataset.nanairoLinks = preferences.highlightLinks ? 'highlight' : 'default';
  const colorMode = preferences.colorMode === 'default' && preferences.highContrast
    ? 'high-contrast'
    : preferences.colorMode;
  root.dataset.nanairoColor = colorMode;
  root.dataset.nanairoContrast = colorMode === 'high-contrast' ? 'high' : 'default';
  root.dataset.nanairoFont = preferences.readableFont ? 'readable' : 'default';
  root.dataset.nanairoMotion = preferences.reduceMotion ? 'reduce' : 'default';
  setMediaControl(preferences.mediaPaused);

  const guide = preferences.readingGuide ? ensureOverlay(GUIDE_ID) : document.getElementById(GUIDE_ID);
  const mask = preferences.readingMask ? ensureOverlay(MASK_ID) : document.getElementById(MASK_ID);
  if (guide) guide.hidden = !preferences.readingGuide;
  if (mask) mask.hidden = !preferences.readingMask;

  const needsPointer = preferences.readingGuide || preferences.readingMask;
  if (needsPointer && !pointerListenerAttached) {
    document.addEventListener('pointermove', updatePointerPosition, { passive: true });
    pointerListenerAttached = true;
  } else if (!needsPointer && pointerListenerAttached) {
    document.removeEventListener('pointermove', updatePointerPosition);
    pointerListenerAttached = false;
  }
}

export function destroyPageEffects(): void {
  const root = document.documentElement;
  delete root.dataset.nanairoTextScale;
  delete root.dataset.nanairoSpacing;
  delete root.dataset.nanairoLinks;
  delete root.dataset.nanairoColor;
  delete root.dataset.nanairoContrast;
  delete root.dataset.nanairoFont;
  delete root.dataset.nanairoMotion;
  setMediaControl(false);
  root.style.removeProperty('--nanairo-guide-y');
  root.style.removeProperty('--nanairo-mask-y');
  document.getElementById(GUIDE_ID)?.remove();
  document.getElementById(MASK_ID)?.remove();
  if (pointerListenerAttached) {
    document.removeEventListener('pointermove', updatePointerPosition);
    pointerListenerAttached = false;
  }
}
