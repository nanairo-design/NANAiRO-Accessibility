import { LitElement, css, html, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { messages, type Locale, type MessageKey } from './i18n';
import { applyPageEffects, destroyPageEffects } from './page-effects';
import { defaultPreferences, loadPreferences, savePreferences, type ColorMode, type Preferences } from './state';
import logoMarkUrl from './assets/nanairo-logo-mark.png?inline';
import logoHorizontalUrl from './assets/nanairo-logo-horizontal.png?inline';

let instanceCount = 0;

const icon = (name: 'spark' | 'accessibility' | 'close' | 'minus' | 'plus' | 'type' | 'spacing' | 'link' | 'contrast' | 'font' | 'motion' | 'guide' | 'mask' | 'speech' | 'media' | 'reset') => {
  const paths = {
    spark: svg`<path d="M12 2.75c.62 3.67 2.58 5.63 6.25 6.25-3.67.62-5.63 2.58-6.25 6.25C11.38 11.58 9.42 9.62 5.75 9 9.42 8.38 11.38 6.42 12 2.75Z"></path><path d="M18.4 14.3c.28 1.66 1.17 2.55 2.83 2.83-1.66.28-2.55 1.17-2.83 2.83-.28-1.66-1.17-2.55-2.83-2.83 1.66-.28 2.55-1.17 2.83-2.83Z"></path>`,
    accessibility: svg`<circle cx="12" cy="12" r="9.25"></circle><circle cx="12" cy="7" r="1.35" fill="currentColor" stroke="none"></circle><path d="M6.8 10.2c3.5 1.15 6.9 1.15 10.4 0M12 10.7v4M12 14.7 8.8 19M12 14.7l3.2 4.3"></path>`,
    close: svg`<path d="m7 7 10 10M17 7 7 17"></path>`,
    minus: svg`<path d="M6 12h12"></path>`,
    plus: svg`<path d="M12 6v12M6 12h12"></path>`,
    type: svg`<path d="M5 6h10M10 6v12M7 18h6M16.5 11h3M18 11v7m-2 0h4"></path>`,
    spacing: svg`<path d="M7 4v16M4.5 6.5 7 4l2.5 2.5M4.5 17.5 7 20l2.5-2.5M12 7h8M12 12h8M12 17h8"></path>`,
    link: svg`<path d="m9.5 14.5 5-5M7.8 16.2l-1.2 1.2a3.4 3.4 0 0 1-4.8-4.8l3.1-3.1a3.4 3.4 0 0 1 4.8 0M16.2 7.8l1.2-1.2a3.4 3.4 0 1 1 4.8 4.8l-3.1 3.1a3.4 3.4 0 0 1-4.8 0"></path>`,
    contrast: svg`<circle cx="12" cy="12" r="8.5"></circle><path d="M12 3.5v17a8.5 8.5 0 0 0 0-17Z" fill="currentColor" stroke="none"></path>`,
    font: svg`<path d="M4 18 9 5l5 13M6 13h6M14.5 10h5M17 10v8m-2.5 0h5"></path>`,
    motion: svg`<path d="M5 8.5c2.2-4.4 9-5.1 12.3-1.4 3.2 3.5 1.2 9.3-3.3 10.4-3.7.9-7.5-1.6-7.8-5.4M2.8 5.4 5 8.5l3.6-1"></path>`,
    guide: svg`<path d="M3 7h18M3 17h18M6 12h12"></path>`,
    mask: svg`<path d="M4 4h16v16H4zM4 9h16M4 15h16"></path>`,
    speech: svg`<path d="M5 10v4h3l4 3V7L8 10H5ZM15 9.2a4 4 0 0 1 0 5.6M17.5 6.8a7.3 7.3 0 0 1 0 10.4"></path>`,
    media: svg`<rect x="3.5" y="5" width="17" height="14" rx="2.5"></rect><path d="m9 9.2 5 2.8-5 2.8V9.2ZM4 4l16 16"></path>`,
    reset: svg`<path d="M4.5 8A8 8 0 1 1 4 14M4.5 8V3.5M4.5 8H9"></path>`,
  };

  return html`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
};

@customElement('nanairo-accessibility')
export class NanairoAccessibility extends LitElement {
  @property({ type: String, reflect: true }) locale: Locale = 'ja';
  @property({ type: String, reflect: true }) position: 'left' | 'right' = 'right';

  @state() private open = false;
  @state() private preferences: Preferences = defaultPreferences();
  @state() private announcement = '';
  @state() private speaking = false;

  private readonly panelId = `nanairo-a11y-panel-${++instanceCount}`;
  private initialized = false;
  private speechQueue: string[] = [];
  private speechSession = 0;

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.initialized) {
      const requestedLocale = this.getAttribute('locale');
      this.locale = requestedLocale === 'en' ? 'en' : 'ja';
      this.preferences = loadPreferences(this.locale);
      this.locale = this.preferences.locale;
      applyPageEffects(this.preferences);
      this.initialized = true;
    }
    document.addEventListener('pointerdown', this.handleDocumentPointerDown);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback(): void {
    document.removeEventListener('pointerdown', this.handleDocumentPointerDown);
    window.removeEventListener('keydown', this.handleKeyDown);
    this.stopSpeech(false);
    super.disconnectedCallback();
  }

  private t(key: MessageKey): string {
    return messages[this.locale][key];
  }

  private commit(next: Preferences): void {
    this.preferences = next;
    this.locale = next.locale;
    savePreferences(next);
    applyPageEffects(next);
    this.dispatchEvent(new CustomEvent('nanairo-change', {
      detail: next,
      bubbles: true,
      composed: true,
    }));
  }

  private handleDocumentPointerDown = (event: PointerEvent): void => {
    if (this.open && !event.composedPath().includes(this)) this.closePanel(false);
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.open) {
      event.preventDefault();
      this.closePanel(true);
    }
  };

  private async openPanel(): Promise<void> {
    this.open = true;
    await this.updateComplete;
    this.renderRoot.querySelector<HTMLButtonElement>('.close-button')?.focus();
  }

  public async showPanel(): Promise<void> {
    await this.openPanel();
  }

  private async closePanel(restoreFocus: boolean): Promise<void> {
    this.open = false;
    await this.updateComplete;
    if (restoreFocus) this.renderRoot.querySelector<HTMLButtonElement>('.launcher')?.focus();
  }

  private selectLocale(locale: Locale): void {
    this.stopSpeech(false);
    this.commit({ ...this.preferences, locale });
  }

  private setScale(delta: number): void {
    const textScale = Math.max(0, Math.min(4, this.preferences.textScale + delta));
    this.commit({ ...this.preferences, textScale });
  }

  private toggle(key: keyof Pick<Preferences, 'comfortableSpacing' | 'highlightLinks' | 'readableFont' | 'reduceMotion' | 'readingGuide' | 'readingMask' | 'mediaPaused'>): void {
    this.commit({ ...this.preferences, [key]: !this.preferences[key] });
  }

  private setColorMode(colorMode: ColorMode): void {
    this.commit({
      ...this.preferences,
      colorMode,
      highContrast: colorMode === 'high-contrast',
    });
  }

  private pageSpeechSegments(): string[] {
    const root = document.querySelector('main') ?? document.body;
    const elements = root.querySelectorAll<HTMLElement>('h1, h2, h3, p, blockquote, figcaption');
    const segments: string[] = [];

    elements.forEach((element) => {
      if (element.closest('[aria-hidden="true"], nanairo-accessibility') || element.hidden) return;
      const text = element.textContent?.replace(/\s+/g, ' ').trim();
      if (!text) return;
      for (let start = 0; start < text.length; start += 220) segments.push(text.slice(start, start + 220));
    });

    return segments;
  }

  private speakNext(session: number): void {
    if (session !== this.speechSession) return;
    const text = this.speechQueue.shift();
    if (!text) {
      this.speaking = false;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.locale === 'ja' ? 'ja-JP' : 'en-US';
    utterance.rate = 0.92;
    utterance.onend = () => this.speakNext(session);
    utterance.onerror = () => {
      if (session === this.speechSession) this.speaking = false;
    };
    window.speechSynthesis.speak(utterance);
  }

  private toggleSpeech(): void {
    if (this.speaking) {
      this.stopSpeech(true);
      return;
    }
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      this.announcement = this.t('speechUnavailable');
      return;
    }

    this.speechQueue = this.pageSpeechSegments();
    if (!this.speechQueue.length) return;
    const session = ++this.speechSession;
    this.speaking = true;
    this.announcement = this.t('speechStarted');
    window.speechSynthesis.cancel();
    this.speakNext(session);
  }

  private stopSpeech(announce: boolean): void {
    if (!this.speaking && !this.speechQueue.length) return;
    this.speechSession += 1;
    this.speechQueue = [];
    this.speaking = false;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (announce) this.announcement = this.t('speechStopped');
  }

  private reset(): void {
    this.stopSpeech(false);
    this.commit(defaultPreferences(this.locale));
    this.announcement = this.t('resetDone');
    window.setTimeout(() => { this.announcement = ''; }, 1800);
  }

  public resetPreferences(): void {
    this.reset();
  }

  public destroy(): void {
    destroyPageEffects();
    this.remove();
  }

  private renderToggle(
    key: 'comfortableSpacing' | 'highlightLinks' | 'readableFont' | 'reduceMotion' | 'readingGuide' | 'readingMask' | 'mediaPaused',
    iconName: 'spacing' | 'link' | 'contrast' | 'font' | 'motion' | 'guide' | 'mask' | 'media',
    labelKey: MessageKey,
    hintKey: MessageKey,
  ) {
    const active = this.preferences[key];
    return html`
      <button
        class="preference-row ${active ? 'active' : ''}"
        type="button"
        aria-pressed=${active}
        @click=${() => this.toggle(key)}
      >
        <span class="feature-icon">${icon(iconName)}</span>
        <span class="preference-copy">
          <span class="preference-title">${this.t(labelKey)}</span>
          <span class="preference-hint">${this.t(hintKey)}</span>
        </span>
        <span class="switch" aria-hidden="true"><span></span></span>
      </button>
    `;
  }

  render() {
    const scalePercent = [100, 112, 125, 150, 175][this.preferences.textScale];
    const colorModes = [
      { value: 'default', label: 'colorDefault' },
      { value: 'dark', label: 'colorDark' },
      { value: 'light', label: 'colorLight' },
      { value: 'high-contrast', label: 'colorHighContrast' },
      { value: 'monochrome', label: 'colorMonochrome' },
      { value: 'saturated', label: 'colorSaturated' },
    ] as const;

    return html`
      <button
        class="launcher"
        type="button"
        aria-label=${this.open ? this.t('close') : this.t('open')}
        title=${this.open ? this.t('close') : this.t('open')}
        aria-expanded=${this.open}
        aria-controls=${this.panelId}
        @click=${() => this.open ? this.closePanel(false) : this.openPanel()}
      >
        <span class="launcher-mark" aria-hidden="true">${icon('accessibility')}</span>
        <span class="launcher-label" aria-hidden="true"><span>表示</span><span>サポート</span></span>
        <span class="launcher-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M5 12h14M14 7l5 5-5 5"></path></svg>
        </span>
      </button>

      <section
        id=${this.panelId}
        class=${this.open ? 'panel is-open' : 'panel'}
        role="dialog"
        aria-modal="false"
        aria-labelledby="nanairo-panel-title"
        aria-hidden=${this.open ? 'false' : 'true'}
        ?inert=${!this.open}
      >

          <header class="panel-header">
            <div class="brand">
              <span class="brand-mark" aria-hidden="true"><img src=${logoMarkUrl} alt="" /></span>
              <span>
                <strong id="nanairo-panel-title">${this.t('title')}</strong>
                <small>${this.t('subtitle')}</small>
              </span>
            </div>
            <button class="icon-button close-button" type="button" aria-label=${this.t('close')} @click=${() => this.closePanel(true)}>
              ${icon('close')}
            </button>
          </header>

          <div class="panel-scroll">
            <div class="section-heading">${this.t('appearance')}</div>

            <div class="scale-card">
              <div class="scale-heading">
                <span class="feature-icon">${icon('type')}</span>
                <span class="preference-copy">
                  <span class="preference-title">${this.t('textSize')}</span>
                  <span class="preference-hint">${this.t('textSizeHint')}</span>
                </span>
                <output aria-live="polite">${scalePercent}%</output>
              </div>
              <div class="stepper">
                <button type="button" aria-label=${this.t('decrease')} ?disabled=${this.preferences.textScale === 0} @click=${() => this.setScale(-1)}>
                  ${icon('minus')}
                </button>
                <div class="steps" aria-hidden="true">
                  ${[0, 1, 2, 3, 4].map((step) => html`<span class=${step <= this.preferences.textScale ? 'filled' : ''}></span>`)}
                </div>
                <button type="button" aria-label=${this.t('increase')} ?disabled=${this.preferences.textScale === 4} @click=${() => this.setScale(1)}>
                  ${icon('plus')}
                </button>
              </div>
            </div>

            <div class="preference-group">
              ${this.renderToggle('comfortableSpacing', 'spacing', 'spacing', 'spacingHint')}
              ${this.renderToggle('highlightLinks', 'link', 'highlightLinks', 'highlightLinksHint')}
              ${this.renderToggle('readableFont', 'font', 'readableFont', 'readableFontHint')}
              ${this.renderToggle('reduceMotion', 'motion', 'reduceMotion', 'reduceMotionHint')}
            </div>

            <div class="color-heading">
              <span>${this.t('colorModes')}</span>
              <small>${this.t('colorModeHint')}</small>
            </div>
            <div class="color-mode-grid" role="radiogroup" aria-label=${this.t('colorModes')}>
              ${colorModes.map(({ value, label }) => html`
                <button
                  class="color-mode ${this.preferences.colorMode === value ? 'active' : ''}"
                  type="button"
                  role="radio"
                  aria-checked=${this.preferences.colorMode === value}
                  @click=${() => this.setColorMode(value)}
                >
                  <span class="color-swatch swatch-${value}" aria-hidden="true"><span></span></span>
                  <span>${this.t(label)}</span>
                </button>
              `)}
            </div>

            <div class="section-heading">${this.t('focus')}</div>
            <div class="preference-group">
              ${this.renderToggle('readingGuide', 'guide', 'readingGuide', 'readingGuideHint')}
              ${this.renderToggle('readingMask', 'mask', 'readingMask', 'readingMaskHint')}
            </div>

            <div class="section-heading">${this.t('audioMedia')}</div>
            <div class="preference-group">
              <button
                class="preference-row ${this.speaking ? 'active' : ''}"
                type="button"
                aria-pressed=${this.speaking}
                @click=${this.toggleSpeech}
              >
                <span class="feature-icon">${icon('speech')}</span>
                <span class="preference-copy">
                  <span class="preference-title">${this.t('speech')}</span>
                  <span class="preference-hint">${this.t(this.speaking ? 'speechStopHint' : 'speechHint')}</span>
                </span>
                <span class="switch" aria-hidden="true"><span></span></span>
              </button>
              ${this.renderToggle('mediaPaused', 'media', 'mediaPaused', 'mediaPausedHint')}
            </div>

            <p class="note">${this.t('note')}</p>

            <div class="language-field">
              <label for="${this.panelId}-language">${this.t('language')}</label>
              <select
                id="${this.panelId}-language"
                .value=${this.locale}
                @change=${(event: Event) => this.selectLocale((event.target as HTMLSelectElement).value as Locale)}
              >
                <option value="ja">日本語</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <footer class="panel-footer">
            <button class="reset-button" type="button" @click=${this.reset}>${icon('reset')}<span>${this.t('reset')}</span></button>
            <span class="footer-brand">
              <span class="powered-by">Powered by</span>
              <img src=${logoHorizontalUrl} alt="NANAiRO" />
            </span>
          </footer>
          <span class="sr-only" aria-live="polite">${this.announcement || nothing}</span>
      </section>
    `;
  }

  static styles = css`
    :host {
      --accent: #397579;
      --accent-hover: #285c60;
      --ink: #222936;
      --muted: #606975;
      --line: #e8ebeb;
      --soft: #f5f7f7;
      --radius: 24px;
      --drawer-width: min(420px, calc(100vw - 46px));
      position: fixed;
      z-index: 2147483646;
      right: 0;
      top: 0;
      color: var(--ink);
      font-family: -apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Yu Gothic", "Segoe UI", sans-serif;
      font-size: 16px;
      line-height: 1.4;
      letter-spacing: 0;
      color-scheme: light;
      -webkit-font-smoothing: antialiased;
    }

    :host([position="left"]) { right: auto; left: 0; }
    *, *::before, *::after { box-sizing: border-box; }
    button { font: inherit; }
    svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }

    .launcher {
      position: fixed;
      z-index: 2;
      right: 0;
      top: 50%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 122px;
      min-height: 58px;
      padding: 9px 12px 9px 10px;
      overflow: hidden;
      cursor: pointer;
      color: white;
      border: 1px solid var(--accent);
      border-right: 0;
      border-radius: 13px 0 0 13px;
      background: var(--accent);
      box-shadow: 0 4px 16px rgba(34,41,54,.12);
      transform: translateY(-50%);
      transition: right .48s cubic-bezier(.22,.8,.2,1), left .48s cubic-bezier(.22,.8,.2,1), width .42s cubic-bezier(.22,.8,.2,1), min-height .42s cubic-bezier(.22,.8,.2,1), padding .42s ease, border-radius .42s ease, box-shadow .42s ease, filter .28s ease;
      animation: launcher-invite 1.8s ease-out 1s 2;
    }

    :host([position="left"]) .launcher { right: auto; left: 0; border-right: 1px solid var(--accent); border-left: 0; border-radius: 0 13px 13px 0; }
    :host([position="left"]) .launcher { animation-name: launcher-invite-left; }
    .launcher:hover { width: 130px; background: var(--accent-hover); }
    .launcher:active { transform: translateY(-50%) scale(.97); }
    .launcher:focus-visible, button:focus-visible, select:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
    .launcher:focus-visible { outline-offset: -4px; outline-color: #fff; }
    .preference-row:focus-visible { outline-offset: -4px; }
    .launcher-mark { position: relative; width: 36px; height: 36px; display: grid; place-items: center; flex: none; color: var(--accent); border-radius: 50%; background: #fff; transition: opacity .18s ease, transform .28s ease; }
    .launcher-mark svg { width: 23px; height: 23px; stroke-width: 1.8; }
    .launcher-label { display: grid; justify-items: start; gap: 1px; font-size: 10px; font-weight: 800; letter-spacing: .05em; line-height: 1.08; text-align: left; writing-mode: horizontal-tb; transition: opacity .18s ease, transform .28s ease; }
    .launcher-arrow { position: absolute; inset: 0; display: grid; place-items: center; opacity: 0; transform: translateX(8px); transition: opacity .22s ease .12s, transform .36s cubic-bezier(.22,.8,.2,1) .08s; }
    .launcher-arrow svg { width: 24px; height: 24px; stroke-width: 1.7; }
    .launcher[aria-expanded="true"] { right: var(--drawer-width); width: 46px; min-height: 62px; padding: 0; border-radius: 12px 0 0 12px; animation: none; }
    .launcher[aria-expanded="true"]:hover { width: 46px; }
    .launcher[aria-expanded="true"]:active { transform: translateY(-50%) scale(.97); }
    .launcher[aria-expanded="true"] .launcher-mark,
    .launcher[aria-expanded="true"] .launcher-label { opacity: 0; transform: scale(.84); }
    .launcher[aria-expanded="true"] .launcher-arrow { opacity: 1; transform: translateX(0); }
    :host([position="left"]) .launcher[aria-expanded="true"] { right: auto; left: var(--drawer-width); border-radius: 0 14px 14px 0; }
    :host([position="left"]) .launcher[aria-expanded="true"] .launcher-arrow { transform: scaleX(-1); }

    .panel {
      position: fixed;
      right: 0;
      top: 0;
      bottom: 0;
      width: var(--drawer-width);
      height: 100dvh;
      max-height: none;
      display: grid;
      grid-template-rows: auto minmax(0, 1fr) auto;
      overflow: hidden;
      isolation: isolate;
      border: 1px solid var(--line);
      border-radius: var(--radius) 0 0 var(--radius);
      background: #fff;
      box-shadow: -12px 0 40px rgba(34,41,54,.1);
      transform-origin: center right;
      pointer-events: none;
      opacity: 0;
      transform: translateX(100%);
      transition: transform .48s cubic-bezier(.22,.8,.2,1), opacity .34s ease;
    }

    .panel.is-open { pointer-events: auto; opacity: 1; transform: translateX(0); }
    :host([position="left"]) .panel { right: auto; left: 0; border-radius: 0 var(--radius) var(--radius) 0; transform: translateX(-100%); }
    :host([position="left"]) .panel.is-open { transform: translateX(0); }

    .panel-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 24px 20px; border-bottom: 1px solid var(--line); }
    .brand { min-width: 0; display: flex; align-items: center; gap: 12px; }
    .brand-mark, .feature-icon { display: grid; place-items: center; flex: none; }
    .brand-mark { width: 44px; height: 44px; padding: 5px; }
    .brand-mark img { display: block; width: 100%; height: 100%; object-fit: contain; }
    .brand strong, .brand small { display: block; }
    .brand strong { font-size: 18px; line-height: 1.25; letter-spacing: -.02em; }
    .brand small { margin-top: 2px; color: var(--muted); font-size: 12px; line-height: 1.4; white-space: nowrap; }

    .icon-button { display: grid; place-items: center; width: 44px; height: 44px; padding: 0; flex: none; cursor: pointer; color: var(--ink); border: 1px solid var(--line); border-radius: 50%; background: #fff; }
    .icon-button:hover { background: var(--soft); border-color: var(--accent); }
    .icon-button svg { width: 20px; height: 20px; }

    .panel-scroll { min-height: 0; overflow-y: auto; padding: 16px 16px 12px; scrollbar-width: thin; scrollbar-color: rgba(90,107,137,.25) transparent; }
    .language-field { display: grid; grid-template-columns: 1fr minmax(132px, auto); align-items: center; gap: 14px; margin: 20px 0 4px; padding: 14px; border: 1px solid var(--line); border-radius: var(--radius); background: #fff; }
    .language-field label { color: var(--ink); font-size: 12px; font-weight: 700; }
    .language-field select { min-height: 44px; max-width: 100%; padding: 7px 28px 7px 12px; cursor: pointer; color: var(--ink); border: 1px solid var(--line); border-radius: 9999px; background: var(--soft); font: inherit; font-size: 13px; font-weight: 700; }

    .section-heading { margin: 0 4px 10px; color: var(--muted); font-size: 12px; font-weight: 700; letter-spacing: .06em; }
    .scale-card, .preference-group { border: 1px solid var(--line); border-radius: var(--radius); background: #fff; }
    .scale-card { padding: 15px; margin-bottom: 10px; }
    .scale-heading { display: flex; align-items: center; gap: 11px; }
    .feature-icon { width: 38px; height: 38px; color: var(--accent); border-radius: 50%; background: var(--soft); }
    .feature-icon svg { width: 21px; height: 21px; }
    .preference-copy { min-width: 0; display: block; flex: 1; text-align: left; }
    .preference-title, .preference-hint { display: block; }
    .preference-title { color: var(--ink); font-size: 14px; font-weight: 700; letter-spacing: -.01em; }
    .preference-hint { margin-top: 4px; color: var(--muted); font-size: 12px; line-height: 1.6; overflow-wrap: anywhere; }
    output { color: var(--accent); font-size: 13px; font-weight: 750; font-variant-numeric: tabular-nums; }

    .stepper { display: grid; grid-template-columns: 44px 1fr 44px; align-items: center; gap: 12px; margin-top: 14px; }
    .stepper button { display: grid; place-items: center; width: 44px; height: 44px; padding: 0; cursor: pointer; color: var(--accent); border: 1px solid var(--line); border-radius: 50%; background: var(--soft); }
    .stepper button:hover:not(:disabled) { background: white; transform: translateY(-1px); }
    .stepper button:disabled { cursor: not-allowed; opacity: .34; }
    .stepper button svg { width: 18px; height: 18px; }
    .steps { display: flex; align-items: center; gap: 5px; }
    .steps span { height: 6px; flex: 1; border-radius: 99px; background: rgba(92,111,146,.14); transition: background .22s ease, transform .22s ease; }
    .steps span.filled { background: var(--accent); transform: scaleY(1.15); }

    .preference-group { overflow: hidden; margin-bottom: 18px; }
    .preference-row { width: 100%; min-height: 76px; display: flex; align-items: center; gap: 11px; padding: 14px; cursor: pointer; color: inherit; border: 0; border-bottom: 1px solid var(--line); background: transparent; }
    .preference-row:last-child { border-bottom: 0; }
    .preference-row:hover { background: var(--soft); }
    .preference-row.active .feature-icon { color: white; background: var(--accent); }
    .switch { width: 43px; height: 25px; padding: 3px; flex: none; border-radius: 99px; background: rgba(100,113,139,.2); box-shadow: inset 0 1px 2px rgba(43,57,82,.1); transition: background .24s ease; }
    .switch span { display: block; width: 19px; height: 19px; border-radius: 50%; background: white; box-shadow: 0 2px 5px rgba(31,43,69,.22); transition: transform .28s cubic-bezier(.2,.8,.2,1); }
    .preference-row.active .switch { background: var(--accent); }
    .preference-row.active .switch span { transform: translateX(18px); }

    .color-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin: 0 4px 10px; color: var(--muted); font-size: 12px; font-weight: 700; letter-spacing: .06em; }
    .color-heading small { font-size: 11px; font-weight: 550; letter-spacing: 0; }
    .color-mode-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; margin-bottom: 18px; }
    .color-mode { min-width: 0; min-height: 64px; display: grid; grid-template-columns: 22px minmax(0, 1fr); align-items: center; gap: 7px; padding: 8px; cursor: pointer; color: var(--ink); border: 1px solid var(--line); border-radius: 16px; background: #fff; font-size: 11px; font-weight: 700; line-height: 1.5; text-align: left; transition: border-color .2s ease, background .2s ease; }
    .color-mode:hover { border-color: var(--accent); background: var(--soft); }
    .color-mode.active { color: var(--accent-hover); border-color: var(--accent); background: #edf4f3; box-shadow: inset 0 0 0 1px var(--accent); }
    .color-swatch { width: 22px; height: 22px; display: block; padding: 3px; border: 1px solid rgba(38,53,51,.17); border-radius: 50%; background: #fff; box-shadow: 0 2px 5px rgba(31,43,69,.1); }
    .color-swatch span { display: block; width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, #9dcc47, #21aaa0); }
    .swatch-dark { background: #181b1a; border-color: #181b1a; }
    .swatch-dark span { background: #a2e6cc; }
    .swatch-light span { background: #fff; border: 1px solid #737a78; }
    .swatch-high-contrast { background: #000; border-color: #000; }
    .swatch-high-contrast span { background: linear-gradient(90deg, #fff 50%, #000 50%); border: 1px solid #fff; }
    .swatch-monochrome span { background: linear-gradient(135deg, #111, #b7b7b7); }
    .swatch-saturated span { background: conic-gradient(#ff365f, #ffd600, #13bd68, #1c91ff, #9f45ff, #ff365f); }

    .note { margin: 2px 6px 6px; color: var(--muted); font-size: 12px; line-height: 1.7; }
    .panel-footer { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; padding: 16px; border-top: 1px solid var(--line); background: #fff; }
    .reset-button { display: inline-flex; align-items: center; gap: 7px; min-height: 44px; padding: 9px 14px; cursor: pointer; color: var(--ink); border: 1px solid var(--line); border-radius: 9999px; background: #fff; font-size: 12px; font-weight: 650; }
    .reset-button:hover { color: var(--accent-hover); border-color: var(--accent); background: var(--soft); }
    .reset-button svg { width: 17px; height: 17px; }
    .footer-brand { display: inline-flex; align-items: center; gap: 7px; color: var(--muted); white-space: nowrap; }
    .powered-by { font-size: 10px; font-weight: 650; letter-spacing: .04em; }
    .footer-brand img { width: 72px; height: auto; object-fit: contain; }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

    @keyframes launcher-invite {
      0%, 100% { transform: translate(0, -50%); }
      45% { transform: translate(-4px, -50%); }
    }

    @keyframes launcher-invite-left {
      0%, 100% { transform: translate(0, -50%); }
      45% { transform: translate(4px, -50%); }
    }

    @media (max-width: 520px) {
      :host { --drawer-width: calc(100vw - 42px); }
      .launcher { width: 108px; min-height: 51px; gap: 8px; padding: 7px 10px 7px 8px; border-radius: 10px 0 0 10px; }
      :host([position="left"]) .launcher { border-radius: 0 11px 11px 0; }
      .launcher:hover { width: 114px; }
      .launcher-mark { width: 32px; height: 32px; }
      .launcher-mark svg { width: 20px; height: 20px; }
      .launcher-label { font-size: 9px; }
      .launcher[aria-expanded="true"] { right: var(--drawer-width); width: 42px; min-height: 58px; border-radius: 11px 0 0 11px; }
      .launcher[aria-expanded="true"]:hover { width: 42px; }
      :host([position="left"]) .launcher[aria-expanded="true"] { right: auto; left: var(--drawer-width); border-radius: 0 12px 12px 0; }
      .panel { border-radius: 24px 0 0 24px; }
      :host([position="left"]) .panel { border-radius: 0 24px 24px 0; }
      .brand small { max-width: 220px; overflow: hidden; text-overflow: ellipsis; }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .001ms !important; transition-duration: .001ms !important; }
    }

    @media (prefers-contrast: more) {
      .panel { border: 2px solid #182233; background: #fff; box-shadow: 0 14px 40px rgba(0,0,0,.25); backdrop-filter: none; }
      .scale-card, .preference-group { border-color: #677386; background: #fff; }
      .preference-hint, .note, .brand small { color: #4b5565; }
    }

    @media (prefers-reduced-transparency: reduce) {
      .panel, .launcher { backdrop-filter: none; -webkit-backdrop-filter: none; }
      .panel { background: #fff; }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'nanairo-accessibility': NanairoAccessibility;
  }
}
