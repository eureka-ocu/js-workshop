# 第3回JavaScript勉強会@OCU

## 本日の内容

[express](http://expressjs.com/)と[socket.io](http://socket.io/)を用いて簡易チャットアプリを作成する

## ねらい

- [第2回](https://github.com/eureka-ocu/js-workshop/tree/master/02)で作ったサーバーに関する理解を深める
- それっぽいアプリがどんな風に動作しているのかを知る

## では、いつも通りやっていきまっしょい

- Terminalを開く
- 以下をコピペ(`$ `以降)
- 必要なパッケージのインストールまでいけたら、[ここに最終版があるから](https://github.com/eureka-ocu/js-workshop/tree/03-answer/03)、必要なファイルとかディレクトリ作って、全く同じにしてほしい。(ファイル内のコメントは書かなくていいよ。)
  - ファイルの作成: `touch filename`
  - ディレクトリの作成: `mkdir dirname`
- `npm run start`してhttp://localhost:3000にアクセスして動けば完成!メッセージ待ってるぜい。

```
// js-workshopディレクトリまで移動(<somewhere>は自分の環境に合わせて書き換えてね)
$ cd ~/<somewhere>/js-workshop
// js-workshopに変更があるので、それを取ってくる
$ git pull origin master
// 03(本日の分)ディレクトリまで移動
$ cd 03
// 必要なパッケージのインストール
$ npm i
```

## 作者

[nishitaniyuki](https://github.com/nishitaniyuki)
