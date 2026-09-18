import { normalizeLocale, type Locale } from './i18n';

export type ColorMode = 'default' | 'dark' | 'light' | 'high-contrast' | 'monochrome' | 'saturated';

export interface Preferences {
  schemaVersion: 1;
  locale: Locale;
  textScale: number;
  comfortableSpacing: boolean;
  highlightLinks: boolean;
  highContrast: boolean;
  colorMode: ColorMode;
  readableFont: boolean;
  reduceMotion: boolean;
  readingGuide: boolean;
  readingMask: boolean;
  mediaPaused: boolean;
}

const STORAGE_KEY = 'nanairo:a11y:preferences:v1';

/** Highest text-scale step; 5 renders the page at 200%, which WCAG 1.4.4 asks for. */
export const MAX_TEXT_SCALE = 5;

export const defaultPreferences = (locale: Locale = 'ja'): Preferences => ({
  schemaVersion: 1,
  locale,
  textScale: 0,
  comfortableSpacing: false,
  highlightLinks: false,
  highContrast: false,
  colorMode: 'default',
  readableFont: false,
  reduceMotion: false,
  readingGuide: false,
  readingMask: false,
  mediaPaused: false,
});

const isColorMode = (value: unknown): value is ColorMode => (
  value === 'default'
  || value === 'dark'
  || value === 'light'
  || value === 'high-contrast'
  || value === 'monochrome'
  || value === 'saturated'
);

/**
 * Stored preferences are untrusted input: only real booleans count, so a value
 * such as a string can never switch a feature on by being merely truthy.
 */
const toFlag = (value: unknown): boolean => value === true;

const toTextScale = (value: unknown): number => {
  const scale = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(scale)) return 0;
  // Only whole steps have a matching stylesheet rule and readout.
  return Math.min(MAX_TEXT_SCALE, Math.max(0, Math.round(scale)));
};

export function loadPreferences(fallbackLocale: Locale): Preferences {
  const fallback = defaultPreferences(fallbackLocale);
  let stored: Record<string, unknown>;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return fallback;
    stored = parsed as Record<string, unknown>;
  } catch {
    return fallback;
  }

  if (stored.schemaVersion !== 1) return fallback;

  const colorMode = isColorMode(stored.colorMode)
    ? stored.colorMode
    : toFlag(stored.highContrast)
      ? 'high-contrast'
      : 'default';

  // Rebuilt field by field so unknown keys are dropped instead of persisted again.
  return {
    schemaVersion: 1,
    locale: normalizeLocale(stored.locale, fallbackLocale),
    textScale: toTextScale(stored.textScale),
    comfortableSpacing: toFlag(stored.comfortableSpacing),
    highlightLinks: toFlag(stored.highlightLinks),
    highContrast: colorMode === 'high-contrast',
    colorMode,
    readableFont: toFlag(stored.readableFont),
    reduceMotion: toFlag(stored.reduceMotion),
    readingGuide: toFlag(stored.readingGuide),
    readingMask: toFlag(stored.readingMask),
    mediaPaused: toFlag(stored.mediaPaused),
  };
}

export function savePreferences(preferences: Preferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
  }
}
