import { DEFAULT_CONFIG, normalizeConfig } from '../../core/src/config.js';

const DEFAULT_OPTIONS = {
  apiBaseUrl: 'https://api.nanairo-sdk.example.com',
  cdnBaseUrl: 'https://cdn.nanairo-sdk.example.com',
  timeoutMs: 2000
};

async function fetchWithTimeout(url, timeoutMs) {
  const abortController = new AbortController();
  const timer = setTimeout(() => abortController.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: abortController.signal });

    if (!response.ok) {
      throw new Error(`Config API request failed: ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function loadConfig(siteKey, options) {
  try {
    const url = new URL('/v1/widget-config', options.apiBaseUrl);
    url.searchParams.set('siteKey', siteKey);

    const config = await fetchWithTimeout(url.toString(), options.timeoutMs);
    return normalizeConfig(config);
  } catch {
    return DEFAULT_CONFIG;
  }
}

export async function initNanairoLoader({ siteKey, ...partialOptions }) {
  if (!siteKey) {
    throw new Error('siteKey is required');
  }

  const options = { ...DEFAULT_OPTIONS, ...partialOptions };
  const config = await loadConfig(siteKey, options);
  const widgetModuleUrl = `${options.cdnBaseUrl}/widget-core-${config.version}.js`;

  const widgetModule = await import(widgetModuleUrl);
  widgetModule.mountNanairoWidget({ config, siteKey });

  return config;
}
