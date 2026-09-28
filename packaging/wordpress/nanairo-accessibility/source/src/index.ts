import './accessibility-widget';
import type { Locale } from './i18n';
import type { NanairoAccessibility } from './accessibility-widget';

export interface NanairoOptions {
  locale?: Locale;
  position?: 'left' | 'right';
  showBranding?: boolean;
}

/** Settings a host page may expose for the bundle to start itself. */
interface NanairoAutoSettings {
  locale?: unknown;
  position?: unknown;
  showBranding?: unknown;
}

const resolveOptions = (settings: NanairoAutoSettings): NanairoOptions => ({
  locale: settings.locale === 'en' ? 'en' : 'ja',
  position: settings.position === 'left' ? 'left' : 'right',
  showBranding: settings.showBranding !== false && settings.showBranding !== 'false',
});

export function init(options: NanairoOptions = {}): NanairoAccessibility {
  const existing = document.querySelector<NanairoAccessibility>('nanairo-accessibility');
  if (existing) return existing;

  const widget = document.createElement('nanairo-accessibility');
  widget.setAttribute('locale', options.locale === 'en' ? 'en' : 'ja');
  widget.setAttribute('position', options.position === 'left' ? 'left' : 'right');
  widget.showBranding = options.showBranding ?? true;

  // The bundle may be loaded from the document head, where there is no body to
  // append to yet.
  const append = (): void => {
    document.body.append(widget);
  };
  if (document.body) append();
  else document.addEventListener('DOMContentLoaded', append, { once: true });

  return widget;
}

export { NanairoAccessibility } from './accessibility-widget';
export type { Locale } from './i18n';
export type { Preferences } from './state';

const autoScript = document.querySelector<HTMLScriptElement>('script[data-nanairo-auto]');
if (autoScript) {
  init(resolveOptions(autoScript.dataset));
} else {
  // Used by the WordPress plugin: settings are published before this script so
  // that the script itself can stay deferred.
  const settings = (window as { nanairoAccessibilitySettings?: NanairoAutoSettings }).nanairoAccessibilitySettings;
  if (settings && typeof settings === 'object') init(resolveOptions(settings));
}
