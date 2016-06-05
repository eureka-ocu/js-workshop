# 第1回JavaScript勉強会@OCU

## 本日の内容

- セットアップ
- JSの文法基礎

## セットアップ

### NodeJS

まずは、[ndenv](https://github.com/riywo/ndenv)をインストールするところから。

```
$ git clone https://github.com/riywo/ndenv ~/.ndenv
$ echo 'export PATH="$HOME/.ndenv/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(ndenv init -)"' >> ~/.bash_profile
$ exec $SHELL -l
$ git clone https://github.com/riywo/node-build.git $(ndenv root)/plugins/node-build
```

次に[NodeJS](http://nodejs.jp/)本体をインストール。

```
$ ndenv install v6.2.0
$ ndenv global v6.2.0
```

### Atom

特にこだわりがなければ、機能を足すのが簡単やから[Atom](https://atom.io)をオススメする。

[ここから](https://atom.io)インストール可。

一応参考までに僕の使ってるパッケージたち。(atomは長らく使ってないから今はもういらないパッケージもあるかも)

- atom-beautify
- autocomplete-paths
- color-picker
- file-icons
- foldingtext-for-atom
- highlight-selected
- indent-guide-improved
- language-babel
- linter
- linter-eslint
- maximize-panes
- minimap
- minimap-git-diff
- minimap-highlight-selected
- monokai
- pigments
- react
- turbo-javascript
- vim-mode

## JSの文法基礎

[babel](https://babeljs.io)を使いながら、[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)を読んでいきやしょう。

では、babelをさっそく起動して、ガシガシ読んでいこう。

```
$ npm i
$ $(npm bin)/babel-node
```

## 作者

[nishitaniyuki](https://github.com/nishitaniyuki)
