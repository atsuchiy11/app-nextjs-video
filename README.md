# 社内動画共有サイト Prime Studio

<br>

## 目的・背景

<br>

### 目的

- 社内の動画コンテンツの検索性の向上
- 社内の動画コンテンツのセキュリティ性の向上

### 背景

<br>

社内外にて動画コンテンツを作成に対するニーズが高まっており、<br>
実際に動画コンテンツも多く作成されている。<br>
一方で、作成した動画の管理、共有に関するルールが定まっておらず、<br>
Youtube なので個人的に限定公開している事例も散見される。

### 課題

- Youtube に限定公開でアップロードしたものをメールで共有しているため動画の検索性が低い。
- Youtube の限定公開の場合、URL が流出してしまうと社外秘であっても閲覧可能になってしまう。

<br><br>

## ワークフロー

- 動画コンテンツの制作に関しては既存のまま、制作者側に一任する
- 各部門から選任された管理者が、動画コンテンツの運用・管理業務を行う
- 利用者-管理者間の運用ルールについは各部門に一任する
- 利用者には閲覧機能に加え、検索機能及び評価機能を提供する

![ワークフロー](https://px-ad-img.s3.ap-northeast-1.amazonaws.com/sys-workflow.png)

<br><br>

## システム構成

本システムの構成要素は以下となる。

- 動画コンテンツホスティングサービス（[Vimeo](https://vimeo.com/)）
- アプリケーションサーバ（[Vercel](https://vercel.com/)）
- API サーバ（[Amazon AWS](https://aws.amazon.com/jp/))
- データベース（[Amazon AWS](https://aws.amazon.com/jp/))
- GoogleAPI サーバ（[Google Cloud Platform](https://console.cloud.google.com/)）
- 開発プラットフォーム（[GitHub](https://github.com/)）

![システム構成](https://px-ad-img.s3.ap-northeast-1.amazonaws.com/sys-configuration.png)

<br>

各構成要素の機能は以下となる。

| 構成要素    | 機能概要                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------- |
| Vimeo       | 動画コンテンツのホスティング及び再生機能を提供する。また動画コンテンツ単位でのドメイン制御を行う。 |
| Vercel      | CDN によるコンテンツ配信を行う。App フレームワークとして Next.js を採用しているため親和性も高い。  |
| API Gateway | API ルーティング及びアクセス制御を行う。                                                           |
| Lambda      | データベース及び Vimeo との通信処理を行う。                                                        |
| DynamoDB    | 動画コンテンツの関連情報及びユーザ情報を永続化する                                                 |
| Google      | 社内ドメインの Google アカウントによる認証機能を提供する。                                         |
| GitHub      | ソースコード管理及び GitHub Actions による CI/CD を形成する。                                      |

<br><br>

## ソフトウェア構成

| 構成要素                     | 概要                                                                                                                             |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| データベース                 | AWS DynamoDB                                                                                                                     |
| Web サーバ                   | Vercel                                                                                                                           |
| Web API                      | AWS API Gateway, AWS Lambda                                                                                                      |
| フロントエンド               | HTML, CSS, JavaScript, TypeScript, Node.js                                                                                       |
| フロントエンドフレームワーク | React.js, [Next.js](https://nextjs.org/), [Matrial-UI](https://material-ui.com/ja/)                                              |
| バックエンド                 | Python3.x                                                                                                                        |
| バックエンドフレームワーク   | [FastAPI](https://fastapi.tiangolo.com/ja/), [serverless](https://www.serverless.com/), [OpenAPI (Swagger)](https://swagger.io/) |
| CI/CD                        | GitHub Actions                                                                                                                   |
| ストレージ                   | AWS S3                                                                                                                           |
| クライアント監視             | [Sentry](https://sentry.io/)                                                                                                     |
| テスター・タスクランナー     | Jest, React-testing-library, Husky                                                                                               |
| リンター・フォーマッター     | esLint, Prettier                                                                                                                 |

<br><br>

## セキュリティ

本システムのセキュリティ構成は以下となる。

![セキュリティ](https://px-ad-img.s3.ap-northeast-1.amazonaws.com/sys-security.jpg)

| 送信元           | 送信先           | 認証・制御       | 概要                                                    |
| ---------------- | ---------------- | ---------------- | ------------------------------------------------------- |
| ユーザ           | アプリケーション | ドメイン制御     | 社内システムアカウントからのみアクセス可                |
| アプリケーション | API サーバ       | アクセスキー認証 | API キーを持つアプリケーションからのみアクセス可        |
| API サーバ       | データベース     | パスワード認証   | 認証情報を持つサーバからのみアクセス可                  |
| API サーバ       | Vimeo            | トークン認証     | OAuth2.0 アクセストークンを持つサーバからのみアクセス可 |
| ユーザ           | Vimeo            | ドメイン制御     | アプリケーションのドメイン経由でのみアクセス可          |
