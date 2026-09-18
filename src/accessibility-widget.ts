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
          <div class="glass-light glass-light-one" aria-hidden="true"></div>
          <div class="glass-light glass-light-two" aria-hidden="true"></div>

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
      --accent: #1b8f8c;
      --accent-soft: #49ad70;
      --ink: #183f3d;
      --muted: #5d706b;
      --drawer-width: min(420px, calc(100vw - 46px));
      position: fixed;
      z-index: 2147483646;
      right: 0;
      top: 0;
      color: var(--ink);
      font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
      border: 1px solid rgba(255,255,255,.64);
      border-right: 0;
      border-radius: 13px 0 0 13px;
      background: linear-gradient(135deg, #62b66b, #24a47d 52%, #218e90);
      box-shadow:
        inset 0 1px 1px rgba(255,255,255,.56),
        inset 0 -10px 22px rgba(20,97,96,.12),
        -10px 14px 36px rgba(27,107,106,.2),
        -2px 2px 8px rgba(27,107,106,.12);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      transform: translateY(-50%);
      transition: right .48s cubic-bezier(.22,.8,.2,1), left .48s cubic-bezier(.22,.8,.2,1), width .42s cubic-bezier(.22,.8,.2,1), min-height .42s cubic-bezier(.22,.8,.2,1), padding .42s ease, border-radius .42s ease, box-shadow .42s ease, filter .28s ease;
      animation: launcher-invite 1.8s ease-out 1s 2;
    }

    :host([position="left"]) .launcher { right: auto; left: 0; border-right: 1px solid rgba(255,255,255,.64); border-left: 0; border-radius: 0 13px 13px 0; box-shadow: inset 0 1px 1px rgba(255,255,255,.56), inset 0 -10px 22px rgba(20,97,96,.12), 10px 14px 36px rgba(27,107,106,.2), 2px 2px 8px rgba(27,107,106,.12); }
    :host([position="left"]) .launcher { animation-name: launcher-invite-left; }
    .launcher:hover { width: 130px; filter: brightness(1.05); box-shadow: inset 0 1px 1px rgba(255,255,255,.7), inset 0 -10px 22px rgba(20,97,96,.1), -15px 18px 42px rgba(27,107,106,.28), -3px 3px 10px rgba(27,107,106,.16); }
    .launcher:active { transform: translateY(-50%) scale(.97); }
    .launcher:focus-visible, button:focus-visible, select:focus-visible { outline: 3px solid #237f82; outline-offset: 3px; }
    .launcher-mark { position: relative; width: 36px; height: 36px; display: grid; place-items: center; flex: none; color: #23977f; border-radius: 50%; background: #fff; box-shadow: 0 5px 12px rgba(16,91,87,.2), inset 0 0 0 1px rgba(255,255,255,.8); transition: opacity .18s ease, transform .28s ease; }
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
      border: 1px solid rgba(255,255,255,.78);
      border-radius: 32px 0 0 32px;
      background: linear-gradient(145deg, rgba(255,255,255,.88), rgba(235,248,243,.76));
      box-shadow:
        inset 0 1px 1px rgba(255,255,255,.96),
        inset 0 -1px 1px rgba(46,143,134,.13),
        0 32px 80px rgba(25,83,82,.22),
        0 7px 20px rgba(25,83,82,.11);
      backdrop-filter: blur(38px) saturate(175%);
      -webkit-backdrop-filter: blur(38px) saturate(175%);
      transform-origin: center right;
      pointer-events: none;
      opacity: 0;
      transform: translateX(100%);
      transition: transform .48s cubic-bezier(.22,.8,.2,1), opacity .34s ease;
    }

    .panel.is-open { pointer-events: auto; opacity: 1; transform: translateX(0); }
    :host([position="left"]) .panel { right: auto; left: 0; border-radius: 0 32px 32px 0; transform: translateX(-100%); }
    :host([position="left"]) .panel.is-open { transform: translateX(0); }
    .panel::before { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none; border-radius: inherit; background: linear-gradient(120deg, rgba(255,255,255,.55), transparent 28%, transparent 68%, rgba(34,170,158,.13)); }
    .glass-light { position: absolute; z-index: -1; pointer-events: none; border-radius: 50%; filter: blur(30px); opacity: .42; }
    .glass-light-one { width: 190px; height: 130px; top: -70px; left: -30px; background: #9dcc47; }
    .glass-light-two { width: 160px; height: 120px; bottom: 70px; right: -70px; background: #20aaa0; }

    .panel-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 20px 17px; border-bottom: 1px solid rgba(99,116,148,.13); }
    .brand { min-width: 0; display: flex; align-items: center; gap: 12px; }
    .brand-mark, .feature-icon { display: grid; place-items: center; flex: none; }
    .brand-mark { width: 46px; height: 44px; padding: 5px; border: 1px solid rgba(52,56,55,.12); border-radius: 15px; background: rgba(255,255,255,.72); box-shadow: inset 0 1px 1px rgba(255,255,255,.9), 0 8px 18px rgba(42,48,46,.12); }
    .brand-mark img { display: block; width: 100%; height: 100%; object-fit: contain; }
    .brand strong, .brand small { display: block; }
    .brand strong { font-size: 18px; line-height: 1.25; letter-spacing: -.02em; }
    .brand small { margin-top: 2px; color: var(--muted); font-size: 12px; line-height: 1.4; white-space: nowrap; }

    .icon-button { display: grid; place-items: center; width: 38px; height: 38px; padding: 0; flex: none; cursor: pointer; color: #354052; border: 1px solid rgba(255,255,255,.82); border-radius: 50%; background: rgba(255,255,255,.5); box-shadow: 0 4px 12px rgba(49,65,96,.08), inset 0 1px rgba(255,255,255,.8); }
    .icon-button:hover { background: rgba(255,255,255,.86); }
    .icon-button svg { width: 20px; height: 20px; }

    .panel-scroll { min-height: 0; overflow-y: auto; padding: 16px 16px 12px; scrollbar-width: thin; scrollbar-color: rgba(90,107,137,.25) transparent; }
    .language-field { display: grid; grid-template-columns: 1fr minmax(132px, auto); align-items: center; gap: 14px; margin: 16px 0 4px; padding: 13px 14px; border: 1px solid rgba(34,137,137,.14); border-radius: 17px; background: rgba(255,255,255,.5); box-shadow: inset 0 1px rgba(255,255,255,.8); }
    .language-field label { color: #445451; font-size: 12px; font-weight: 700; }
    .language-field select { min-height: 40px; padding: 7px 34px 7px 12px; cursor: pointer; color: #173f3f; border: 1px solid rgba(34,137,137,.22); border-radius: 11px; background: rgba(255,255,255,.82); font: inherit; font-size: 13px; font-weight: 700; }

    .section-heading { margin: 0 4px 8px; color: #727d90; font-size: 11px; font-weight: 750; letter-spacing: .09em; text-transform: uppercase; }
    .scale-card, .preference-group { border: 1px solid rgba(255,255,255,.75); border-radius: 21px; background: rgba(255,255,255,.5); box-shadow: 0 8px 26px rgba(39,63,109,.075), inset 0 1px rgba(255,255,255,.78); }
    .scale-card { padding: 15px; margin-bottom: 10px; }
    .scale-heading { display: flex; align-items: center; gap: 11px; }
    .feature-icon { width: 38px; height: 38px; color: #237f82; border-radius: 13px; background: linear-gradient(145deg, rgba(232,249,238,.96), rgba(210,239,229,.8)); box-shadow: inset 0 1px rgba(255,255,255,.9); }
    .feature-icon svg { width: 21px; height: 21px; }
    .preference-copy { min-width: 0; display: block; flex: 1; text-align: left; }
    .preference-title, .preference-hint { display: block; }
    .preference-title { color: #172033; font-size: 14px; font-weight: 700; letter-spacing: -.01em; }
    .preference-hint { margin-top: 2px; overflow: hidden; color: #737e91; font-size: 11px; line-height: 1.35; text-overflow: ellipsis; }
    output { color: #197f7e; font-size: 13px; font-weight: 750; font-variant-numeric: tabular-nums; }

    .stepper { display: grid; grid-template-columns: 40px 1fr 40px; align-items: center; gap: 12px; margin-top: 14px; }
    .stepper button { display: grid; place-items: center; width: 40px; height: 36px; padding: 0; cursor: pointer; color: #197f7e; border: 1px solid rgba(31,145,137,.16); border-radius: 12px; background: rgba(226,246,238,.88); }
    .stepper button:hover:not(:disabled) { background: white; transform: translateY(-1px); }
    .stepper button:disabled { cursor: not-allowed; opacity: .34; }
    .stepper button svg { width: 18px; height: 18px; }
    .steps { display: flex; align-items: center; gap: 5px; }
    .steps span { height: 6px; flex: 1; border-radius: 99px; background: rgba(92,111,146,.14); transition: background .22s ease, transform .22s ease; }
    .steps span.filled { background: linear-gradient(90deg, #97c944, #3aae70 48%, #238d91); transform: scaleY(1.15); }

    .preference-group { overflow: hidden; margin-bottom: 18px; }
    .preference-row { width: 100%; min-height: 70px; display: flex; align-items: center; gap: 11px; padding: 12px 14px; cursor: pointer; color: inherit; border: 0; border-bottom: 1px solid rgba(91,110,145,.11); background: transparent; }
    .preference-row:last-child { border-bottom: 0; }
    .preference-row:hover { background: rgba(255,255,255,.48); }
    .preference-row.active .feature-icon { color: white; background: linear-gradient(145deg, #78bb67, #24aa9d 58%, #2f8b91); box-shadow: inset 0 1px rgba(255,255,255,.35), 0 6px 14px rgba(31,133,128,.2); }
    .switch { width: 43px; height: 25px; padding: 3px; flex: none; border-radius: 99px; background: rgba(100,113,139,.2); box-shadow: inset 0 1px 2px rgba(43,57,82,.1); transition: background .24s ease; }
    .switch span { display: block; width: 19px; height: 19px; border-radius: 50%; background: white; box-shadow: 0 2px 5px rgba(31,43,69,.22); transition: transform .28s cubic-bezier(.2,.8,.2,1); }
    .preference-row.active .switch { background: linear-gradient(90deg, #84c252, #39ae75 48%, #248d91); }
    .preference-row.active .switch span { transform: translateX(18px); }

    .color-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin: 0 4px 8px; color: #727d90; font-size: 11px; font-weight: 750; letter-spacing: .09em; text-transform: uppercase; }
    .color-heading small { font-size: 9px; font-weight: 550; letter-spacing: 0; text-transform: none; }
    .color-mode-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; margin-bottom: 18px; }
    .color-mode { min-width: 0; min-height: 58px; display: grid; grid-template-columns: 22px minmax(0, 1fr); align-items: center; gap: 7px; padding: 8px; cursor: pointer; color: #485468; border: 1px solid rgba(69,104,100,.13); border-radius: 15px; background: rgba(255,255,255,.52); font-size: 10px; font-weight: 700; line-height: 1.2; text-align: left; transition: border-color .2s ease, background .2s ease, transform .2s ease, box-shadow .2s ease; }
    .color-mode:hover { transform: translateY(-1px); border-color: rgba(31,145,137,.3); background: rgba(255,255,255,.8); }
    .color-mode.active { color: #155f5e; border-color: rgba(31,145,137,.48); background: rgba(224,246,237,.92); box-shadow: inset 0 0 0 1px rgba(35,143,137,.12), 0 6px 16px rgba(32,117,108,.1); }
    .color-swatch { width: 22px; height: 22px; display: block; padding: 3px; border: 1px solid rgba(38,53,51,.17); border-radius: 50%; background: #fff; box-shadow: 0 2px 5px rgba(31,43,69,.1); }
    .color-swatch span { display: block; width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, #9dcc47, #21aaa0); }
    .swatch-dark { background: #181b1a; border-color: #181b1a; }
    .swatch-dark span { background: #a2e6cc; }
    .swatch-light span { background: #fff; border: 1px solid #737a78; }
    .swatch-high-contrast { background: #000; border-color: #000; }
    .swatch-high-contrast span { background: linear-gradient(90deg, #fff 50%, #000 50%); border: 1px solid #fff; }
    .swatch-monochrome span { background: linear-gradient(135deg, #111, #b7b7b7); }
    .swatch-saturated span { background: conic-gradient(#ff365f, #ffd600, #13bd68, #1c91ff, #9f45ff, #ff365f); }

    .note { margin: 2px 6px 6px; color: #7b8596; font-size: 10px; line-height: 1.55; }
    .panel-footer { display: flex; align-items: center; justify-content: space-between; padding: 13px 17px 15px; border-top: 1px solid rgba(99,116,148,.13); background: rgba(249,251,255,.32); }
    .reset-button { display: inline-flex; align-items: center; gap: 7px; min-height: 36px; padding: 7px 11px; cursor: pointer; color: #566175; border: 1px solid transparent; border-radius: 11px; background: transparent; font-size: 12px; font-weight: 650; }
    .reset-button:hover { color: #176f70; border-color: rgba(31,145,137,.14); background: rgba(255,255,255,.5); }
    .reset-button svg { width: 17px; height: 17px; }
    .footer-brand { display: inline-flex; align-items: center; gap: 7px; color: #7b8596; white-space: nowrap; }
    .powered-by { font-size: 9px; font-weight: 650; letter-spacing: .04em; }
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
      .panel { background: #f0f8f5; }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'nanairo-accessibility': NanairoAccessibility;
  }
}
