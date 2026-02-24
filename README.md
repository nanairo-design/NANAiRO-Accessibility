# NANAiR-Web-SDK
アクセシビリティツール
🧩 0. プロダクト再定義
プロダクト名（仮）

Accessibility UX Layer SDK

本質

外部サイトに後付けで挿入される「UX介入レイヤー」

単なるアクセシビリティツールではなく、

DOM制御エンジン

UX変更レイヤー

SaaS制御型ウィジェット

という構造を持つ。

📘 1. 要件定義（Requirements Definition）
1.1 ビジネス要件
要件	内容
収益化	SaaS月額モデル
マルチテナント	ドメイン単位管理
自動アップデート	埋め込み後に機能更新可能
規格対応	WCAG 2.1支援
導入容易性	1行スクリプト
1.2 ユーザー要件
導入企業

既存サイトを改修せず導入可能

UIカスタマイズ可能

利用状況可視化

エンドユーザー

ワンクリックで支援機能

操作が直感的

キーボード対応

1.3 技術要件
項目	要件
配信	CDN必須
UI隔離	Shadow DOM
設定取得	Remote Config
フェイルセーフ	API障害時も最低動作
パフォーマンス	初期JS < 30KB (loader)
📐 2. アーキテクチャ設計
2.1 全体構成
Client Website
   ↓
loader.js（固定）
   ↓
Config API取得
   ↓
CDNからwidget-core.js動的import
   ↓
Shadow DOM内UI描画
2.2 システム構成
/apps
  /dashboard   → SaaS管理画面（Next.js）
  /api         → 設定API
/packages
  /loader      → 軽量ローダー
  /widget      → UI + DOMエンジン
  /core        → 共有ロジック
📦 3. 機能仕様
3.1 Widget UI機能
基本

フローティングボタン

サイドパネル

テーマ変更

位置変更

3.2 アクセシビリティ機能
視覚支援

文字サイズ変更

コントラスト強化

グレースケール

フォーカス強調

リンク強調

音声

テキスト読み上げ

速度調整

停止

言語

翻訳切替（オプション）

3.3 自動アップデート仕様
Loader設計
fetch(config)
  → import(widget-core-${version}.js)
バージョニング

SemVer管理

破壊的変更はMajor更新

3.4 Remote Config仕様

APIレスポンス例：

{
  "version": "1.4.2",
  "theme": "dark",
  "position": "left",
  "features": {
    "tts": true,
    "contrast": true,
    "translate": false
  }
}
🔒 4. セキュリティ設計

CSP対応

XSS回避（innerHTML禁止）

外部DOM直接破壊禁止

Sandbox Shadow DOM

API認証キー制御

📊 5. SaaS仕様
5.1 管理機能

ドメイン登録

UIテーマ編集

機能ON/OFF

利用統計

APIキー発行

5.2 DB設計（簡易）
tenants

| id | name | plan |

domains

| id | tenant_id | domain |

settings

| domain_id | config_json |

usage_logs

| domain_id | event | timestamp |

⚙️ 6. 非機能設計
項目	要件
初期ロード	< 100ms
JSサイズ	loader 30KB以下
可用性	99.9%
ブラウザ	Chrome/Safari/Edge
🚀 7. フェーズ分割
Phase 1（MVP）

Loader

文字拡大

コントラスト

TTS

SaaS管理画面（最低限）

Phase 2

翻訳

使用分析

Feature Flag

Phase 3

AI自動監査

自動UX最適化

ページ解析エンジン

🧠 8. 設計の重要ポイント

Loaderは極小

本体は常にCDN

UIはShadow DOM隔離

Remote Configで制御

マルチテナント前提
