import { describe, expect, it } from 'vitest';
import { messages, normalizeLocale, translate } from './i18n';

describe('locale handling', () => {
  it('keeps the supported locales', () => {
    expect(normalizeLocale('ja')).toBe('ja');
    expect(normalizeLocale('en')).toBe('en');
  });

  it('falls back for unsupported or malformed values', () => {
    expect(normalizeLocale('fr')).toBe('ja');
    expect(normalizeLocale(null)).toBe('ja');
    expect(normalizeLocale(undefined)).toBe('ja');
    expect(normalizeLocale(7)).toBe('ja');
    expect(normalizeLocale('en', 'en')).toBe('en');
    expect(normalizeLocale('fr', 'en')).toBe('en');
  });

  it('translates without throwing when the locale is unsupported', () => {
    // A reflected attribute can be set to anything after the element exists;
    // this used to throw and stop the widget from rendering at all.
    expect(translate('fr', 'close')).toBe(messages.ja.close);
    expect(translate(undefined, 'title')).toBe(messages.ja.title);
    expect(translate('en', 'title')).toBe(messages.en.title);
  });

  it('defines every message in both locales', () => {
    expect(Object.keys(messages.en).sort()).toEqual(Object.keys(messages.ja).sort());
  });
});
