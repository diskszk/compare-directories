# 同一ファイル取得アプリケーション

## コードの概要

- 2 つのディレクトリのパスを引数に取り、両ディレクトリ内に同一ファイルが存在したらファイルパスを出力する CLI アプリケーション
  - ここでの同一ファイルは、ファイル名が同じかつファイルサイズが同じファイルと定義する

## 環境構築方法

- 言語のバージョン
  - node: 15.X
- 主要ライブラリのバージョン

  - TypeScript: 4.1.X
  - ts-node: 9.1.X

- インストール方法

  - `$ git clone https://github.com/diskszk/compare-directories.git`
  - `$ cd compare-directories`
  - `$ yarn install`

- 実行方法
  - `$ npx ts-node app/app.ts 探索対象ディレクトリA 探索対象ディレクトリB`
