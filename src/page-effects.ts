import type { Preferences } from './state';

const STYLE_ID = 'nanairo-a11y-page-styles';
const GUIDE_ID = 'nanairo-a11y-reading-guide';
const MASK_ID = 'nanairo-a11y-reading-mask';

const PAGE_STYLES = `
html[data-nanairo-text-scale="1"] { font-size: 112.5%; }
html[data-nanairo-text-scale="2"] { font-size: 125%; }
html[data-nanairo-text-scale="3"] { font-size: 150%; }
html[data-nanairo-text-scale="4"] { font-size: 175%; }
html[data-nanairo-text-scale="5"] { font-size: 200%; }

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

/*
 * Every element gets readable text on a dark surface. Listing element names
 * instead left anything unlisted (summary, caption, legend, time, em, code...)
 * with the site's own dark text on the new dark background. Kept at :where()
 * specificity so the targeted rules below still win on source order.
 */
html[data-nanairo-color="dark"] body :not(:where(nanairo-accessibility, nanairo-accessibility *)) {
  color: #f7fbf9 !important;
  background-color: transparent !important;
  text-shadow: none !important;
}

html[data-nanairo-color="dark"] body :where(main, section, article, aside, header, footer, nav, div, ul, ol, li, table, thead, tbody, tr, td, th, form) {
  background-color: #181b1a !important;
  background-image: none !important;
  border-color: #59645f !important;
  box-shadow: none !important;
}

html[data-nanairo-color="dark"] body :where(input, select, textarea, button) {
  color: #fff !important;
  background-color: #252a28 !important;
  border-color: #76827d !important;
}

html[data-nanairo-color="dark"] body :where(mark) {
  color: #181b1a !important;
  background-color: #f2cf6b !important;
}

html[data-nanairo-color="dark"] body a:not([data-nanairo-ignore]) {
  color: #a2e6cc !important;
  background-color: #252a28 !important;
  border-color: #76827d !important;
  text-decoration-color: currentColor !important;
}

html[data-nanairo-color="light"] body {
  color: #27272d !important;
  background-color: #fff !important;
  color-scheme: light;
}

html[data-nanairo-color="light"] body :not(:where(nanairo-accessibility, nanairo-accessibility *)) {
  color: #27272d !important;
  background-color: transparent !important;
  text-shadow: none !important;
}

html[data-nanairo-color="light"] body :where(main, section, article, aside, header, footer, nav, div, ul, ol, li, table, thead, tbody, tr, td, th, form) {
  background-color: #fff !important;
  background-image: none !important;
  border-color: #b7bfbc !important;
  box-shadow: none !important;
}

html[data-nanairo-color="light"] body :where(mark) {
  color: #27272d !important;
  background-color: #ffe9a3 !important;
}

html[data-nanairo-color="monochrome"] body > :not(nanairo-accessibility) {
  filter: grayscale(100%) !important;
}

html[data-nanairo-color="saturated"] body > :not(nanairo-accessibility) {
  filter: saturate(180%) contrast(105%) !important;
}

html[data-nanairo-contrast="high"] body {
  color: #000 !important;
  background-color: #fff !important;
}

/* Same reasoning as the dark mode sweep above: cover every element, not a list. */
html[data-nanairo-contrast="high"] body :not(:where(nanairo-accessibility, nanairo-accessibility *)) {
  color: #000 !important;
  background-color: transparent !important;
  text-shadow: none !important;
}

html[data-nanairo-contrast="high"] body :where(main, section, article, aside, header, footer, nav, div, ul, ol, li, table, thead, tbody, tr, td, th, form) {
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

html[data-nanairo-contrast="high"] body :where(mark) {
  color: #000 !important;
  background-color: #ffe9a3 !important;
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

interface MediaState {
  muted: boolean;
  paused: boolean;
}

let pointerListenerAttached = false;
let mediaObserver: MutationObserver | undefined;
const mediaStates = new Map<HTMLMediaElement, MediaState>();

function ensureStyles(): void {
  if (!document.head || document.getElementById(STYLE_ID)) return;
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
  // Record the state once, before the first pause, so it survives re-entry.
  if (!mediaStates.has(media)) mediaStates.set(media, { muted: media.muted, paused: media.paused });
  media.pause();
  media.muted = true;
}

function eachMedia(node: Node, visit: (media: HTMLMediaElement) => void): void {
  if (node instanceof HTMLMediaElement) visit(node);
  if (node instanceof Element) node.querySelectorAll<HTMLMediaElement>('audio, video').forEach(visit);
}

function inspectAddedMedia(node: Node): void {
  eachMedia(node, stopAndMuteMedia);
}

/**
 * Mutation records are delivered in a microtask, so an element that was only
 * moved is connected again by now. Anything still detached is really gone and
 * must not be retained by the state map.
 */
function forgetDetachedMedia(node: Node): void {
  eachMedia(node, (media) => {
    if (!media.isConnected) mediaStates.delete(media);
  });
}

function setMediaControl(active: boolean): void {
  if (active) {
    document.querySelectorAll<HTMLMediaElement>('audio, video').forEach(stopAndMuteMedia);
    if (!mediaObserver && document.body) {
      mediaObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach(inspectAddedMedia);
          mutation.removedNodes.forEach(forgetDetachedMedia);
        });
      });
      mediaObserver.observe(document.body, { childList: true, subtree: true });
    }
    return;
  }

  mediaObserver?.disconnect();
  mediaObserver = undefined;
  mediaStates.forEach((state, media) => {
    if (!media.isConnected) return;
    media.muted = state.muted;
    // Restore playback too; muting alone left the page permanently paused.
    if (!state.paused) void media.play().catch(() => undefined);
  });
  mediaStates.clear();
}

/** The `data-nanairo-*` attributes on `<html>` that drive every page override. */
const EFFECT_DATA_KEYS = [
  'nanairoTextScale',
  'nanairoSpacing',
  'nanairoLinks',
  'nanairoColor',
  'nanairoContrast',
  'nanairoFont',
  'nanairoMotion',
] as const;

/**
 * Runs `measure` with this widget's own page overrides switched off.
 *
 * Anything that inspects the page — the audit in particular — has to see the
 * site's real colours and sizes. Measuring while a colour mode is active
 * reports the values this widget just forced, so a high-contrast run would
 * find no contrast problem on any page at all.
 */
export function withPageEffectsSuspended<T>(measure: () => T): T {
  const root = document.documentElement;
  const saved = EFFECT_DATA_KEYS.map((key) => [key, root.dataset[key]] as const);

  for (const [key] of saved) delete root.dataset[key];
  try {
    // Style resolution is synchronous on query, so getComputedStyle inside
    // `measure` already reflects the suspension.
    return measure();
  } finally {
    for (const [key, value] of saved) {
      if (value === undefined) delete root.dataset[key];
      else root.dataset[key] = value;
    }
  }
}

export function applyPageEffects(preferences: Preferences): void {
  if (!document.body) return;
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
