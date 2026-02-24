const HOST_ID = 'nanairo-widget-host';

function createButton(label, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  button.addEventListener('click', onClick);
  return button;
}

function applyTextScale(scale) {
  document.documentElement.style.fontSize = `${scale}%`;
}

function applyContrast(enabled) {
  document.documentElement.style.filter = enabled ? 'contrast(1.25)' : '';
}

function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function speakPageText(rate = 1) {
  if (!('speechSynthesis' in window)) {
    return;
  }

  stopSpeech();
  const utterance = new SpeechSynthesisUtterance(document.body?.innerText ?? '');
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}

function buildWidgetUI(shadowRoot, config) {
  const wrapper = document.createElement('section');
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', 'NANAiRO accessibility widget');

  const style = document.createElement('style');
  style.textContent = `
    :host { all: initial; }
    .container { position: fixed; ${config.position}: 20px; bottom: 20px; z-index: 2147483000; font-family: sans-serif; }
    .panel { display: none; width: 260px; border-radius: 12px; padding: 12px; margin-top: 8px; background: ${config.theme === 'dark' ? '#1f2937' : '#ffffff'}; color: ${config.theme === 'dark' ? '#f9fafb' : '#111827'}; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); }
    .panel.open { display: block; }
    button { cursor: pointer; margin: 4px 4px 0 0; border: 1px solid #9ca3af; border-radius: 8px; padding: 6px 10px; background: transparent; color: inherit; }
    .fab { border-radius: 9999px; font-size: 18px; width: 52px; height: 52px; background: #2563eb; color: #fff; border: none; }
  `;

  const container = document.createElement('div');
  container.className = 'container';
  const floatingButton = createButton('◎', () => {
    panel.classList.toggle('open');
  });
  floatingButton.className = 'fab';
  floatingButton.setAttribute('aria-expanded', 'false');

  const panel = document.createElement('div');
  panel.className = 'panel';

  let textScale = 100;
  let highContrast = false;

  panel.append(
    createButton('文字 +', () => {
      textScale = Math.min(textScale + 10, 160);
      applyTextScale(textScale);
    }),
    createButton('文字 -', () => {
      textScale = Math.max(textScale - 10, 80);
      applyTextScale(textScale);
    })
  );

  if (config.features.contrast) {
    panel.append(
      createButton('コントラスト切替', () => {
        highContrast = !highContrast;
        applyContrast(highContrast);
      })
    );
  }

  if (config.features.tts) {
    panel.append(
      createButton('読み上げ 1x', () => speakPageText(1)),
      createButton('読み上げ 1.5x', () => speakPageText(1.5)),
      createButton('停止', stopSpeech)
    );
  }

  container.append(floatingButton, panel);
  wrapper.append(container);
  shadowRoot.append(style, wrapper);
}

export function mountNanairoWidget({ config }) {
  if (document.getElementById(HOST_ID)) {
    return;
  }

  const host = document.createElement('div');
  host.id = HOST_ID;
  const shadowRoot = host.attachShadow({ mode: 'open' });
  buildWidgetUI(shadowRoot, config);
  document.body.append(host);
}
