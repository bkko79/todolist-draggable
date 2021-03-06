# TODOLIST　仕様書（補足説明資料付き）

## 紹介

このモバイルアプリケーションはReactで作られたウェブ環境であり、仕事を簡単に片付ける為に必要なUI/UXが実装されています。

iOS及びAndroidの各ブラウザーの互換性テストには問題がありませんでしたが、どこまでもテスト用環境ですので、各ブラウザーのバージョンが古い場合は動作やアニメーション、CSSスタイルに問題がある可能性がありますので、最新版のブラウザーでテストをお願い致します。

DEMO用のURLは下記になります:

[https://bkko-todolist.surge.sh/](https://bkko-todolist.surge.sh/)

## 環境デプロイーマニュアル

この環境はreactのcreate-react-appとyarnを使って構築しました。(npmも使えます。)

下記のコマンドの中で一つ選んで必要なnode_modulesを該当ディレクトリーに設置させてください。

```shell
yarn install
or
npm install
```

設置が終わったらすぐ開発環境の実行ができます：

```shell
yarn start
or
npm start
```

後、画面に出力されるURLで接続できます。

```shell
Compiled successfully!

You can now view todo-list in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.11.10:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

## ファイルツリー

このアプリケーションはクラスで構築されています。

```shell
.
├── .env
├── README.md
├── docs
│   └── manual-jp.md
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── column.jsx
│   ├── datepick.jsx
│   ├── form.jsx
│   ├── index.css
│   ├── index.js
│   ├── initial-data.js
│   └── task.jsx
└── yarn.lock
```

### 重要ファイル

#### 1. index.js

最初にreactDOMをRenderするファイルで、stateを管理する関数を持つ上位コンポネントです。

#### 2. column.jsx

アプリケーションのコンテイナーとして、react-beautiful-dndの上位コンポネント、CSSTransitionの上位コンポネントを持って、mapされたtaskを庇うWrapperです。

#### 3. form.jsx

上位コンポネントに保存されているstateに新しいTODOを追加するInput用フォームを管理するコンポネントです。

#### 4. task.jsx

各TODOオブジェクトを管理するコンポネントで、dragイベントに必要なDraggableコンポネントと日付情報を記入するDatepickコンポネントを出力します。

#### 5. datepick.jsx

各TODOオブジェクトに日付を登録するカレンダーコンポネントです。選択された日付情報をcallback関数で上位コンポネントへ伝えます。

## 重要モジュール

### 1. create-react-app

nodeでテスト環境構築に必要なモジュールを管理するパッケージです。デフォルトのファイルを削除してもっと簡単な構造に改造しました。

### 2. react-beautiful-dnd

ほとんどのモバイルデバイスは、DOMにバインドされたドラッグイベントが効かないので、draggableなどのマウスのイベントとは違う別のスクリプトを作る工数が掛かります。

react環境からモバイルdrag-and-dropを早めに導入するにはreact-nativeで構築する方法やreact-dnd等でモバイルブラウザー用イベントを強制に追加する方法があります。

今回はclassコンポネントと良く合うreact-beautiful-dndを使って構築しました。TrelloのAttlasianが制作した該当モジュールはモバイルのタッチを使ったdragイベントを支援して、プロダクションレベルにも利用されるモジュールです。

重要なコンポネントはindex.jsのDragDropContext、column.jsxのDroppableとtask.jsxのDraggableです。各コンポネントはref関数をあり、各アニメーションとイベントの結果を管理します。

### 3. react-transition-group

イベント発生の該当DOMに自動でクラスを導入したり、timeoutに合わせて例外処理するモジュールです。TODOデータの削除及び追加する時、アニメーション用CSSが入っているクラス名を入れます。各イベント別にDOMを探したりする不便なプロセスがテンプレート化されています。

重要なコンポネントはColumn.jsxのRenderにあるTransitionGroupとCSSTransitionです。

### 4. @material-ui/pickers

reactフレームワークMaterial-UIの時間選択関連モジュールpickersを使いました。モバイルで時間を分単位まで選べるUIを支援し、自由自在でスタイルの変化ができる強いツールです。カレンダーの日付計算に依存性は@date-io/date-fns@1.xを使って解決しました。

重要なコンポネントはdatepick.jsxのRenderにあるMuiPickersUtilsProviderとDateTimePickerです。

### 5. styled-components

ES6でCSSを作成するモジュールで、簡単にスタイル付きのコンポネントが制作できます。SASSなどのスタイル管理ツールの機能が含まれて、React上のコンポネントに直接styleを宣言したり、条件式等を追加する事が出来ます。

重要なモジュールはtask.jsxにあるContainerとHandle変数です。ほとんどの場合スタイルシートは別のファイルに分ける方が読み易いので、できる限り必要な部分だけコンポネントに追加しています。
