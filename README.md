# inTodo (Web Version)

inTodoは、「Reactの学習」を目的として個人開発したタスク管理（ToDo）アプリケーションです。
よくあるToDoアプリの基本機能に加え、「複数の趣味を並行して楽しむ人」のためのアイデアを取り入れています。

## アプリのコンセプトと作成の背景

私自身が複数の趣味を持っており、「タスクが混ざって管理しづらい」という課題を感じていたことから、以下の目的を持って作成しました。

* **趣味ごとの完全分離**: 
  タスクをカテゴリ（趣味）別に管理することで、異なるジャンルのToDoがごちゃ混ぜになるのを防ぎます。
* **再開時の「備忘録」として**: 
  趣味からしばらく離れてしまっても、inTodoを見返せば「前回はどこまでやっていたか」「次は何をするつもりだったか」をすぐに思い出し、スムーズに再開できる状態を目指しています。
* **技術学習のサンドボックス**:
  React（SPA）の基礎から、Reduxを用いた状態管理、ルーティング、モダンなUI実装（グラスモーフィズム）まで、フロントエンド技術を実践的に学ぶための遊び場（Playground）として構築しました。

## 主な機能と特徴

* **セキュアなSPA認証 (Laravel Sanctum)**
  * トークンベースの認証によるログイン・新規登録・ログアウト機能。
* **フロントエンドのルートガード (React Router v6)**
  * 未ログインユーザーのアクセス制限と、ログイン済みユーザーの適切な画面遷移を制御。
* **モダンなUIデザイン (Glassmorphism)**
  * Tailwind CSS と Mantine を組み合わせ、背景グラデーションと半透明パネルを用いたデザインを採用してみました。
* **堅牢な状態管理 (Redux Toolkit)**
  * `re-ducks` パターンを採用し、関心の分離と高いメンテナンス性を意識した設計。

## 技術スタック

* **Frontend:** React (Vite) / React Router v6 / Redux Toolkit / Tailwind CSS / Mantine / Axios
* **Backend:** Laravel / Laravel Sanctum / MySQL (※環境に合わせて調整してください)

## 環境構築 (Getting Started)

本プロジェクトは Laravel Sail (Docker) を使用しています。
事前に Docker Desktop の起動をご確認ください。

### 1. リポジトリのクローンと環境変数の準備
```bash
git clone 
cd intodo

cp .env.example .env
```

### 2. バックエンドコンテナの起動
ローカルに PHP / Composer 環境がない場合でも、以下のコマンドでセットアップ可能です。
```bash
# Composer パッケージのインストール（ローカルにPHPがない場合）
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php82-composer:latest \
    composer install

# Sailコンテナの起動
./vendor/bin/sail up -d

# アプリケーションキーの生成とマイグレーション
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
```

### 3. フロントエンドの起動
Sailコンテナ内の Node.js 環境を利用して起動します。
```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

起動後、ブラウザで http://localhost にアクセスしてください。


## スクリーンショット
### ログイン画面
<img width="594" height="762" alt="image" src="https://github.com/user-attachments/assets/76c557f7-9ead-4670-9fc9-b904589c0667" />

### 新規登録画面
<img width="594" height="762" alt="image" src="https://github.com/user-attachments/assets/2eeb0188-c9d3-4ea0-9bf3-dc89184ac7cf" />

### カテゴリー 一覧画面
<img width="594" height="762" alt="image" src="https://github.com/user-attachments/assets/96515f06-874a-4d22-8f8a-9a92a3ca3295" />

### カテゴリー追加モーダル
<img width="594" height="762" alt="image" src="https://github.com/user-attachments/assets/ee67cb0c-b8c0-451f-ab07-8a4240ab3094" />

### タスク一覧画面
<img width="594" height="762" alt="image" src="https://github.com/user-attachments/assets/783e82ce-dc65-4b06-8752-b7029b3c6fee" />

### タスク追加モーダル
<img width="594" height="762" alt="image" src="https://github.com/user-attachments/assets/c3a6f622-dd3a-415a-a144-abbf980f7609" />



