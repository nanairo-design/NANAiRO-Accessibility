# NANAiRO Accessibility

日本語・英語対応の、Webサイト埋め込み型表示支援ツールです。UIはLitのCustom ElementとしてShadow DOM内に描画され、ページへの効果は`data-nanairo-*`属性と専用スタイルで適用します。

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run typecheck
npm test
npm run build
```

`dist/nanairo-accessibility.es.js`と`dist/nanairo-accessibility.iife.js`が生成されます。

## 埋め込み

### HTML要素

```html
<nanairo-accessibility locale="ja" position="right"></nanairo-accessibility>
<script type="module" src="/assets/nanairo-accessibility.es.js"></script>
```

### JavaScript API

```js
import { init } from '/assets/nanairo-accessibility.es.js';

const widget = init({ locale: 'ja', position: 'right' });
widget.addEventListener('nanairo-change', (event) => {
  console.log(event.detail);
});
```

## 提供機能

- 文字サイズ（5段階）
- 行間・文字間隔
- リンク強調
- 高コントラストテーマ
- 読みやすいフォント
- 動きの軽減
- リーディングガイド
- リーディングマスク
- ブラウザ音声合成による本文読み上げ
- ページ内メディアの一括停止・ミュート
- 日本語／英語
- 設定のローカル保存
- `prefers-reduced-motion`、`prefers-contrast`、`prefers-reduced-transparency`への対応

このツールは利用者による表示のパーソナライズを支援します。Webサイト本体のWCAG適合性を自動的に保証するものではありません。
