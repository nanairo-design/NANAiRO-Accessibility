const DEFAULT_CONFIG = {
  version: 'latest',
  theme: 'light',
  position: 'right',
  features: {
    tts: true,
    contrast: true,
    translate: false,
    textSize: true
  }
};

function asBool(value, fallback) {
  return typeof value === 'boolean' ? value : fallback;
}

function normalizeFeatures(rawFeatures = {}) {
  return {
    tts: asBool(rawFeatures.tts, DEFAULT_CONFIG.features.tts),
    contrast: asBool(rawFeatures.contrast, DEFAULT_CONFIG.features.contrast),
    translate: asBool(rawFeatures.translate, DEFAULT_CONFIG.features.translate),
    textSize: asBool(rawFeatures.textSize, DEFAULT_CONFIG.features.textSize)
  };
}

export function normalizeConfig(rawConfig = {}) {
  return {
    version: typeof rawConfig.version === 'string' && rawConfig.version ? rawConfig.version : DEFAULT_CONFIG.version,
    theme: rawConfig.theme === 'dark' ? 'dark' : DEFAULT_CONFIG.theme,
    position: rawConfig.position === 'left' ? 'left' : DEFAULT_CONFIG.position,
    features: normalizeFeatures(rawConfig.features)
  };
}

export { DEFAULT_CONFIG };
