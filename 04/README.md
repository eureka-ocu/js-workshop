# 第4回JavaScript勉強会@OCU

## 本日の内容

- [git](https://git-scm.com/)を使って作業履歴の管理を行う
- gitを使って複数人での作業を行う
- [GitHub](https://github.com)を用いて簡単なプロジェクト運用を行う

## ねらい

- gitの基礎的な使い方をマスターする

## What is git?

*from [wikipedia](https://ja.wikipedia.org/wiki/Git)*

> git（ギット）は、プログラムのソースコードなどの変更履歴を記録・追跡するための分散型バージョン管理システムである。Linuxカーネルのソースコード管理に用いるためにリーナス・トーバルズによって開発され、それ以降ほかの多くのプロジェクトで採用されている。

### 要するに…

ひとつのものをばらばらで開発することを簡単にするツール。

## 作業履歴の管理ツールとしてのgit

gitの特徴のひとつに変更履歴を記録・追跡するという機能がある。

例えば、sample.jsというファイルを作って、以下の内容を保存したとする。

```
// sample.js v0.0.1
const sampleFunc = () => console.log('Hello.');
```

で、その後に以下の変更を行う。

```
// sample.js v0.0.2
const sampleFunc = () => console.log('Hello World.');
```

ここでv0.0.2からv0.0.1に戻したいと思ったらどうする?

この例の場合は変更が少ないから、たとえば` World`を削除するとかで対処えきるけど、これが100行の変更の後やったらそれってめっちゃめんどうくさくない?

100行の変更でもひとつのファイルなら、事前にコピーしてってできるよね。でもこれが10ファイルに渡る変更やったら毎回コピーでバックアップをとってってめんどうくさくない?

そこで、gitです。実際に手を動かしながら学んでいきまっしょう。

### リポジトリの作成

まずは、リポジトリの作成から。

```
// git-testディレクトリを作成したいディレクトリへ移動 
$ cd <anywhere you want>
// git-testディレクトリの作成
$ mkdir git-test
// git-testディレクトリへ移動
$ cd git-test
// リポジトリの作成
$ git init
```

リポジトリってのは履歴を管理するための場所で、それを特定のディレクトリに作ることで、そのディレクトリの履歴を管理することができる。

### コミットをする

コミットというのは、いつ・誰が・何を編集したのかの履歴のことで、一定の作業をまとめてコミットしておくことで、後でやっぱり前のバージョンに戻したいとかが容易にできるようになる。

まず`git add <some file>`することで、特定のファイルをステージングにあげる。ステージングってのは、コミットするファイルを選択していると理解してもらったらいいと思う。`git add file1 file2`てすると、今回のひとつの作業の履歴としてこのfile1とこのfile2の変更を選択しますって感じ。

で、自分がコミットに含めたいファイルを全部ステージングさせたら、`git commit -m 'commit message'`とすることで、メッセージとともにひとつのコミットができあがる。

```
// sample.jsの作成
$ touch sample.js
// ---
// 好きなエディターでsample.jsを開いて編集
// atom使ってるならatom sample.jsでいける
// ---
// ステージングにあげる
$ git add sample.js
// コミットする
$ git commit -m 'initial commit'
// ---
// もう一度編集
// ---
$ git add sample.js
$ git commit -m 'update sample.js'
// ---
// さらにもう一度編集
// ---
$ git add sample.js
$ git commit -m 'update sample.js'
```

好きなエディターでsample.jsに以下を打ち込む。

```js
// 1回目のコミット用
// sample.js
const greet = () => console.log('Hi, I\'m morito!!');
greet();

// 2回目のコミット用
// sample.js
const greet = name => console.log(`Hi, I'm ${name}!!`);
const arg = process.argv[2];
greet(arg);

// 3回目のコミット用
// sample.js
const greet = (name, country) => console.log(`Hi, I'm ${name} from ${country}!!`);
const argName = process.argv[2];
const argCountry = process.argv[3];
greet(argName, argCountry);
```

### 履歴をさかのぼる

さっき2回コミットしたと思うんやけど、やっぱり2回目の変更なしで、1回目の状態に戻したい!ってなった時にgitならうまいことしてくれる。

まず、履歴をさかのぼるには今までの履歴を見る必要があるんやけど、それは`git log`でできる。

そしたらこんな感じのものがでてくると思う。

```
commit 1c0b4e1c3459252e9566914721fdd9322fe3fe60
Author: nishitani yuki <yuki.nishitani85@gmail.com>
Date:   Thu Nov 10 16:25:10 2016 +0900

    update sample.js

commit 9001a89ac32ef96be7fce1ffd4cbfded74b069e5
Author: nishitani yuki <yuki.nishitani85@gmail.com>
Date:   Thu Nov 10 16:23:41 2016 +0900

    update sample.js

commit 86c834e7ac7d2d8b60149274a5f8897f7e598641
Author: nishitani yuki <yuki.nishitani85@gmail.com>
Date:   Thu Nov 10 16:05:39 2016 +0900

    initial commit
```

履歴をさかのぼるにはこのcommitの横にある、数字とアルファベットの羅列を使う。これはcommit IDっていうんやけど、これによってコミットは一意に定まる。

`9001a89ac32ef96be7fce1ffd4cbfded74b069e5`のコミットに戻りたいってなったときには、`git reset 9001a89ac32ef96be7fce1ffd4cbfded74b069e5`てすればよい。ちなみに`--hard`、`--soft`ってオプションがあって、そこらへんの違いはここに詳しく書いてあるから読んでみて。

### まとめ

```
// ステージング
$ git add <some file>
// コミット
$ git commit -m 'message'
// 履歴を見る
$ git log
// 特定の履歴まで戻る
$ git reset <commit ID> (--hard || --soft)
```

## 複数人での作業統合ツールとしてのgit

gitのもうひとつの機能に複数人の作業を統合するという機能があるのやけど、~~ちょっと解説書くの疲れたから~~ここら辺はひとりで利用する分にはあまり関係ないと思うから、今日は口頭でささっとやっちゃいます。

## 参考

- [git](https://git-scm.com/)
- [wikipedia: git](https://ja.wikipedia.org/wiki/Git)
- [サルでもわかるGit入門](http://www.backlog.jp/git-guide/)

## 作者

[nishitaniyuki](https://github.com/nishitaniyuki)
