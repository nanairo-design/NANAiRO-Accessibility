# NANAiRO Web SDK

NANAiRO Web SDK は、既存Webサイトに後付けで挿入できる **UX介入レイヤー** です。
単なるアクセシビリティツールではなく、以下の三層を提供します。

- DOM制御エンジン
- UX変更レイヤー
- SaaS制御型ウィジェット

## アーキテクチャ

```txt
Client Website
   ↓
loader.js（固定）
   ↓
Config API 取得
   ↓
CDNから widget-core-${version}.js を動的 import
   ↓
Shadow DOM 内で UI 描画
```

## 実装済み（Phase 1 / MVP）

- Loader
  - siteKeyでRemote Config取得
  - API失敗時はデフォルト設定へフォールバック
  - CDN上のバージョン付きwidgetを動的ロード
- Widget
  - フローティングボタン
  - サイドパネル
  - 文字サイズ変更
  - コントラスト切替
  - テキスト読み上げ（1x/1.5x/停止）
- API（サンプル）
  - ドメイン（siteKey）ごとの設定返却

## 画面の見方（ローカルデモ）

```bash
npm run dev
```

起動後、ブラウザで `http://localhost:4173` を開いてください。

- ページ右下（設定次第で左下）の丸ボタンでパネルを開閉
- 「文字 + / 文字 -」で文字サイズ変更
- 「コントラスト切替」で高コントラスト表示
- 「読み上げ 1x / 1.5x / 停止」でTTS

> 組み込み例は `docs/demo/index.html` の `<script type="module">` で確認できます。

## セキュリティ方針（実装反映）

- UIはShadow DOMで隔離
- `innerHTML` は使わず DOM API でUI構築
- Config取得失敗時も最低動作を継続

## 開発

```bash
npm test
npm run lint
npm run dev
```
