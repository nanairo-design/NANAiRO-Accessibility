import test from 'node:test';
import assert from 'node:assert/strict';

import { DEFAULT_CONFIG, normalizeConfig } from '../src/config.js';

test('normalizeConfig returns defaults on empty input', () => {
  assert.deepEqual(normalizeConfig(), DEFAULT_CONFIG);
});

test('normalizeConfig accepts supported overrides', () => {
  const config = normalizeConfig({
    version: '1.4.2',
    theme: 'dark',
    position: 'left',
    features: {
      tts: false,
      contrast: false,
      translate: true,
      textSize: false
    }
  });

  assert.equal(config.version, '1.4.2');
  assert.equal(config.theme, 'dark');
  assert.equal(config.position, 'left');
  assert.equal(config.features.tts, false);
  assert.equal(config.features.contrast, false);
  assert.equal(config.features.translate, true);
});
