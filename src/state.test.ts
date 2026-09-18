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
