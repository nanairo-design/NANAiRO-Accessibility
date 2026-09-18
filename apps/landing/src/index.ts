import './accessibility-widget';
import type { Locale } from './i18n';
import type { NanairoAccessibility } from './accessibility-widget';

export interface NanairoOptions {
  locale?: Locale;
  position?: 'left' | 'right';
}

export function init(options: NanairoOptions = {}): NanairoAccessibility {
  const existing = document.querySelector<NanairoAccessibility>('nanairo-accessibility');
  if (existing) return existing;

  const widget = document.createElement('nanairo-accessibility');
  widget.setAttribute('locale', options.locale ?? 'ja');
  widget.setAttribute('position', options.position ?? 'right');
  document.body.append(widget);
  return widget;
}

export { NanairoAccessibility } from './accessibility-widget';
export type { Locale } from './i18n';
export type { Preferences } from './state';

const autoScript = document.querySelector<HTMLScriptElement>('script[data-nanairo-auto]');
if (autoScript) {
  const locale = autoScript.dataset.locale === 'en' ? 'en' : 'ja';
  const position = autoScript.dataset.position === 'left' ? 'left' : 'right';
  const start = () => init({ locale, position });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}
