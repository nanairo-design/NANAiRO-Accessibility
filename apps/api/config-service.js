const tenantSettings = new Map([
  ['demo-site-key', {
    version: '1.4.2',
    theme: 'dark',
    position: 'left',
    features: {
      tts: true,
      contrast: true,
      translate: false,
      textSize: true
    }
  }]
]);

export function getWidgetConfigBySiteKey(siteKey) {
  const config = tenantSettings.get(siteKey);

  if (!config) {
    return {
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
  }

  return config;
}
