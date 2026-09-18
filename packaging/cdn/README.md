# NANAiRO Accessibility — CDN / self-hosted edition

`nanairo-accessibility.iife.js`をWebサーバーまたはCDNへ配置し、`</body>`の直前に以下を貼り付けます。

```html
<script
  src="/assets/nanairo-accessibility.iife.js"
  data-nanairo-auto
  data-locale="ja"
  data-position="right"
  defer
></script>
```

- `data-locale`: `ja`または`en`
- `data-position`: `right`または`left`
- ファイル名にバージョンを含め、長期キャッシュする運用を推奨します。
- Content Security Policyを使用しているサイトでは、スクリプトの配信元を`script-src`へ追加してください。
- 音声読み上げはブラウザ標準の音声合成機能を使用します。利用できる声はOSとブラウザにより異なります。
- メディア停止を有効にすると、ページ内および後から追加された`audio`・`video`を停止してミュートします。

`example.html`はローカルで配置方法を確認するための最小サンプルです。
