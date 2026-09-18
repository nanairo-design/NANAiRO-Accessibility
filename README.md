# NANAiRO Accessibility

Webサイトを見やすくし、より多くの人へ情報を届けるための表示サポートツールです。

画面右端の「表示サポート」から、閲覧者自身が文字・色・動き・読み上げなどを調整できます。日本語と英語に対応し、React・VueなどのWebアプリにも、通常のHTMLやWordPressにも導入できます。

## デモサイト

LPの配色・余白・文字組み・コンポーネントのルールは [DESIGN.md](DESIGN.md) にまとめています。LPのスタイルは `src/landing.css` で管理します。

```bash
npm install
npm run dev
```

起動後、`http://127.0.0.1:5173/`を開いてください。

## 主な機能

- 文字サイズの変更
- 行間・文字間隔の調整
- リンクの強調
- ダーク／ライト／高コントラスト／モノクロ／彩度強調のカラーモード
- 読みやすいフォント
- 動きの軽減
- リーディングガイド／マスク
- ブラウザ音声合成による読み上げ
- ページ内メディアの一括停止・ミュート
- 日本語／英語切り替え
- 表示設定のブラウザ内保存

## 導入方法

### npm版

React、Vue、Next.jsなど、npmを利用するサイト向けです。

```bash
npm install ./nanairo-accessibility-0.1.0.tgz
```

```ts
import { init } from '@nanairo/accessibility';

init({
  locale: 'ja',
  position: 'right',
});
```

### CDN／セルフホスト版

`public/downloads/nanairo-accessibility-cdn-0.1.0.zip`を展開し、JavaScriptファイルをWebサーバーへ配置します。その後、全ページで共通するHTMLの`</body>`直前へ以下を追加します。

```html
<script
  src="/assets/nanairo-accessibility.iife.js"
  data-nanairo-auto
  data-locale="ja"
  data-position="right"
  defer
></script>
```

### WordPress版

`public/downloads/nanairo-accessibility-wordpress-0.1.0.zip`を解凍せず、WordPress管理画面の「プラグイン → 新規プラグインを追加 → プラグインのアップロード」からインストールします。

有効化後は「設定 → NANAiRO Accessibility」で、表示の有効／無効、初期言語、ボタン位置を変更できます。HTMLやテーマファイルの編集は不要です。

## JavaScript API

```ts
import { init } from '@nanairo/accessibility';

const widget = init({ locale: 'ja', position: 'right' });

// 外部のデモボタンなどからパネルを開く
widget.showPanel();

widget.addEventListener('nanairo-change', (event) => {
  console.log(event.detail);
});
```

## 開発・検証

```bash
npm run typecheck
npm test
npm run build
```

ビルド成果物は`dist/`へ生成されます。

## 配布ファイル

- npm版：`public/downloads/nanairo-accessibility-0.1.0.tgz`
- CDN／セルフホスト版：`public/downloads/nanairo-accessibility-cdn-0.1.0.zip`
- WordPress版：`public/downloads/nanairo-accessibility-wordpress-0.1.0.zip`

## 注意事項

このツールは利用者による表示のパーソナライズを支援するものです。導入するだけでWebサイト本体のWCAG適合性を保証するものではありません。コンテンツ、HTML構造、キーボード操作、代替テキストなど、サイト本体の継続的な改善と組み合わせてご利用ください。
