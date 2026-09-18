import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defaultPreferences, loadPreferences, savePreferences } from './state';

const store = new Map<string, string>();

beforeEach(() => {
  store.clear();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
  });
});

describe('preference storage', () => {
  it('returns localized defaults when nothing is stored', () => {
    expect(loadPreferences('en')).toEqual(defaultPreferences('en'));
  });

  it('persists and restores preferences', () => {
    const preferences = { ...defaultPreferences('ja'), textScale: 3, reduceMotion: true };
    savePreferences(preferences);
    expect(loadPreferences('ja')).toEqual(preferences);
  });

  it('clamps invalid text scale values', () => {
    savePreferences({ ...defaultPreferences('ja'), textScale: 99 });
    expect(loadPreferences('ja').textScale).toBe(5);
  });

  it('fills newly added preferences when loading older stored settings', () => {
    store.set('nanairo:a11y:preferences:v1', JSON.stringify({
      schemaVersion: 1,
      locale: 'ja',
      textScale: 2,
      highlightLinks: true,
    }));

    expect(loadPreferences('ja')).toMatchObject({
      textScale: 2,
      highlightLinks: true,
      highContrast: false,
      colorMode: 'default',
      readableFont: false,
      mediaPaused: false,
    });
  });

  it('rounds a fractional text scale to a step that the stylesheet supports', () => {
    store.set('nanairo:a11y:preferences:v1', JSON.stringify({
      schemaVersion: 1,
      locale: 'ja',
      textScale: 2.7,
    }));

    expect(loadPreferences('ja').textScale).toBe(3);
  });

  it('ignores a text scale that is not a number', () => {
    store.set('nanairo:a11y:preferences:v1', JSON.stringify({
      schemaVersion: 1,
      locale: 'ja',
      textScale: 'large',
    }));

    expect(loadPreferences('ja').textScale).toBe(0);
  });

  it('only accepts real booleans for the toggles', () => {
    store.set('nanairo:a11y:preferences:v1', JSON.stringify({
      schemaVersion: 1,
      locale: 'ja',
      comfortableSpacing: 'yes',
      highlightLinks: 1,
      readableFont: {},
      reduceMotion: true,
    }));

    expect(loadPreferences('ja')).toMatchObject({
      comfortableSpacing: false,
      highlightLinks: false,
      readableFont: false,
      reduceMotion: true,
    });
  });

  it('drops unknown keys instead of persisting them again', () => {
    store.set('nanairo:a11y:preferences:v1', JSON.stringify({
      schemaVersion: 1,
      locale: 'ja',
      injected: '<img src=x onerror=alert(1)>',
    }));

    expect(loadPreferences('ja')).not.toHaveProperty('injected');
  });

  it('falls back when the stored value is not an object', () => {
    for (const raw of ['"a string"', '42', 'null', '[1,2,3]', '{oops']) {
      store.set('nanairo:a11y:preferences:v1', raw);
      expect(loadPreferences('ja')).toEqual(defaultPreferences('ja'));
    }
  });

  it('falls back when the stored locale is unsupported', () => {
    store.set('nanairo:a11y:preferences:v1', JSON.stringify({
      schemaVersion: 1,
      locale: 'fr',
    }));

    expect(loadPreferences('en').locale).toBe('en');
  });

  it('migrates an existing high contrast preference to the color mode selector', () => {
    store.set('nanairo:a11y:preferences:v1', JSON.stringify({
      schemaVersion: 1,
      locale: 'ja',
      highContrast: true,
    }));

    expect(loadPreferences('ja')).toMatchObject({
      highContrast: true,
      colorMode: 'high-contrast',
    });
  });
});
