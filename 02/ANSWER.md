# 第2回JavaScript勉強会@OCU: 解説編

みんなに書いてもらったindex.jsの解説が足りてなかったと思うので補足するね。(`/users/:from-:to`関連のところは少しややこしくて今回は分からなくてもええかなと思ったから飛ばすね。)

## [Line: 2](https://github.com/eureka-ocu/js-workshop/blob/02-answer/02/index.js#L2)

```js
import express from 'express';
```

まずは、冒頭の`import`文。これを書くことで、package.jsonに依存関係として書いてある[express](http://expressjs.com/ja)というライブラリを読み込んでる。これで`express`っていう関数が使えるようになった。

**今回は読み込んだ`express`が関数やったけど、それはexpressの作者が関数を`export`してるからであって、必ずしもいつでも関数とは限らないということは注意。例えば、それが`Object`の場合もあるし、`Array`(配列)の場合もある。**

webサーバーは、Requestをもらって、特定の処理をして、それに応じたResponseを返すって処理を実装しないといけないんやけど、それを一から自分で作るってなったらかなりの手間になる。でも処理自体は、Requestをもらって、特定の処理をして、それに応じたResponseを返す、というシンプルで汎用的なものやから、みんながバラバラに実装するよりも、誰かがその処理を作ってそれを使い回すほうが便利でいいよね。そういう汎用的な処理をまとめてくれてるものをライブラリっていう。

今回は簡単なwebサーバーを作ろうと思ったからこのexpressを使ったわけ。

## [Line: 5](https://github.com/eureka-ocu/js-workshop/blob/02-answer/02/index.js#L5)

```js
const app = express();
```

ここではさっき読み込んだ`express`ていう関数を実行して、その返値を`app`ていう変数に代入してる。返値のイメージとしては以下の感じで、こいつがアプリの本体になる。

```js
{
  ...
  get: () => { ... },
  route: () => { ... },
  params: () => { ... },
  path: () => { ... },
  post: () => { ... },
  ...
}
```

## [Line: 8-14](https://github.com/eureka-ocu/js-workshop/blob/02-answer/02/index.js#L8-L14)

```js
const users = [
  { name: 'tsuyoshi' },
  { name: 'takahiro' },
  { name: 'kentaro' },
  { name: 'yuki' },
  { name: 'daiki' },
];
```

これは`users`っていう変数に`Object`の`Array`(配列)を代入してる。で`Array`(配列)の要素はどれも`name`っていうプロパティをもった`Object`になってる。

例えば、この配列で`'tsuyoshi'`って値にアクセスしようと思ったら以下のようになる。

```js
users[0].name; // 値の取得
users[0].name = 'tsuyoshi2'; // 再代入
```

## [Line: 17-21](https://github.com/eureka-ocu/js-workshop/blob/02-answer/02/index.js#L17-L20)

```js
function createError(status, message) {
  const err = new Error(message);
  err.satus = status;
  return err;
}
```

これは`status`と`message`ていう引数をとって`err`を返す、`createError`ていていう関数の定義やね。

```js
const err = new Error(message);
```

関数の中身やけど、ここで`err`ていう変数に`Error`クラスのインスタンスを代入してる。クラスの説明が少し難しいんやけど、JavaScriptにおいては、特定のプロパティを持った`Object`を返してくれる関数やと思ってもらって大丈夫やと思う。
```js
err.status = status;
```

これは`err`の`status`ていうプロパティに関数の引数としてもらった`status`を代入してる。

```js
return err;
```

ほんで最後に`err`を返値として返してる。`err`のイメージとしては以下の感じ。

```js
{
  ...
  status: ...,
  message: ...,
  ...
}
```

## [Line: 34-40](https://github.com/eureka-ocu/js-workshop/blob/02-answer/02/index.js#L34-L40)

```js
app.param('user', (req, res, next, id) => {
  if (req.user = users[id]) {
    next();
  } else {
    next(createError(404, 'failed to find user'));
  }
});
```

これは、`app`のparamプロパティに関数が入っているのでそれを実行している。実行するときに引数を2つ渡してるねんけど、1つめは`'user'`て`String`で、2つめは`(req, res, next, id) => { ... }`て関数。

ほんでこの`app.param`て関数で何がしたいかのかについて。もうちょっと下で`app.get('/user/:user', ...)`て関数の実行で`localhost:3000/user/:user`にアクセスがあった時の処理を定義してるんやけど、その`:user`てのがパラメータで、つまり可変の値をとれるようになってるわけ。要するに、`localhost:3000/user/1`ってアクセスしても、`localhost:3000/user/2`てアクセスしてもいいようになってる。

で、ここで使った`app.param`て関数は1つめの引数に渡した`user`がRequestとして送られたら(`localhost:3000/user/:user`みたいに`:user`を含むアクセスがあったら)、2つめの引数の関数を実行するようになってる。2つめの引数の関数の説明については下に書くね。

```js
(req, res, next, id) => {
  if (req.user = users[id]) {
    next();
  } else {
    next(createError(404, 'failed to find user'));
  }
}
```

この関数の処理は、RequestとResponseと次にする処理とid(`:user`パラメーターの値)を引数にとって、もし`users`配列の中に`users[id]`にヒットするものがあって、`req.user`にそれを代入することができれば次の処理を実行して、そうでなければエラーを次の処理に渡すってフローになる。

## [Line: 43-45](https://github.com/eureka-ocu/js-workshop/blob/02-answer/02/index.js#L43-L45)

```js
app.get('/', (req, res) => {
  res.send('Visit /user/ or /user/0-2');
});
```

これは、`app`の`get`てプロパティに関数が入っているのでそれを実行してる。引数のひとつめは`'/'`て`String`で、ふたつめは`(req, res) => { ... }`て関数。
これはどういう関数なのかと言うと、ひとつめの引数に渡したルート(この場合`localhost:3000/`になるね)にGETでRequestがきた時にどういう処理をするかを定義する関数。(GETってなんやって気になる人おるやろうけど、今回は飛ばすね。)

ここでしたい処理としては`localhost:3000/`にGETでRequestがあった場合に、Responseとして`'Visit /user or /user/0-2'`って文字列を返すこと。アプリのルートにアクセスがあった場合に、特定のユーザにアクセスするにはどういうルートにアクセスしたらいいかって指示を与えたいわけやね。

## [Line: 48-50](https://github.com/eureka-ocu/js-workshop/blob/02-answer/02/index.js#L48-L50)

```js
app.get('/user/:user', (req, res, next) => {
  res.send(`user ${req.user.name}`);
});
```

これもやりたい処理は上と一緒やね。`localhost:3000/users/:user`にGETでRequestがあった場合に、Responseとして`'user <見つかったユーザの名前>'`を文字列として返したいって処理。

ひとつ注目してほしいのが、上の方の説明で`app.param(...)`て部分があったと思うんやど、あそこで`req.user`に`users[id]`を代入したよね。そのことによって、ここで`req.user.name`て形で`:user`パラメータで指定したid(配列のindex)にマッチしたユーザを参照することができてる。

## [Line: 61-62](https://github.com/eureka-ocu/js-workshop/blob/02-answer/02/index.js#L48-L50)

```js
app.listen(3000);
console.log('App started on port 3000');
```

ここは`app`の`listen`プロパティに入ってる関数を実行してる。ポートとかの話は少しややこしいので今回は省くけど、ここでアプリを起動してると思ってくれたらいい。ほんでその下の`console.log`って関数はターミナルの画面に(正確に言うと外部出力)に`String`を表示する関数。`npm run start`ってしたら、`'App started on port 3000'`て文字が表示されたよね。

## おしまい

解説は以上。結構丁寧に書いたつもりなんやけど、分かりにくいところがあると思う。その場合は遠慮なくLineでもissueでもいいので聞いてね。

## 作者

[nishitaniyuki](https://github.com/nishitaniyuki)
