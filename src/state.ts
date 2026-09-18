import type { Locale } from './i18n';

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

const isLocale = (value: unknown): value is Locale => value === 'ja' || value === 'en';
const isColorMode = (value: unknown): value is ColorMode => (
  value === 'default'
  || value === 'dark'
  || value === 'light'
  || value === 'high-contrast'
  || value === 'monochrome'
  || value === 'saturated'
);

export function loadPreferences(fallbackLocale: Locale): Preferences {
  const fallback = defaultPreferences(fallbackLocale);

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return fallback;

    const value = JSON.parse(stored) as Partial<Preferences>;
    if (value.schemaVersion !== 1) return fallback;

    const colorMode = isColorMode(value.colorMode)
      ? value.colorMode
      : value.highContrast
        ? 'high-contrast'
        : 'default';

    return {
      ...fallback,
      ...value,
      locale: isLocale(value.locale) ? value.locale : fallbackLocale,
      textScale: Math.max(0, Math.min(5, Number(value.textScale) || 0)),
      colorMode,
      highContrast: colorMode === 'high-contrast',
    };
  } catch {
    return fallback;
  }
}

export function savePreferences(preferences: Preferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
  }
}
