# マイアミフェスタ2026 生徒作品展示ランチャー

IT Adventure の生徒作品（Unity・Scratch・Web の14作品）を、1つの画面から選んで遊べるようにしたものです。
インターネットは不要です。くわしい仕様は [AGENTS.md](AGENTS.md) にあります。

## ファイルの取得（準備用のPC）

Unity 6作品・推し発掘・TUNA-CHANNEL は、生徒が公開しているリポジトリを **git サブモジュール** として取り込んでいます。
ダウンロードするときは、サブモジュールも一緒に取得します（ZIP でダウンロードすると、この8作品のフォルダが空になります）。

```
git clone --recurse-submodules https://github.com/adven-kagoshima/event_student-projects.git
```

すでに clone してある場合は、`git submodule update --init` で8作品のファイルがそろいます。

## 展示PCへのコピー

準備用のPCで取得したフォルダから、次の5つを、展示PCの好きな場所（例: デスクトップ）に同じフォルダのままコピーします。合計約420MB です。

```
index.html
launcher/
works/
server.py
start.bat
```

`sources/`（元データ、約120MB）・`.git/`・`AGENTS.md`・`README.md` はコピーしなくてかまいません。

## 必要なもの

- **Python 3.8 以上**: コマンドプロンプトで `python --version` か `py --version` を実行して、バージョンが表示されれば OK
- **Microsoft Edge**（Windows に最初から入っています）。Chrome があれば Chrome を使います

## 起動・終了

- **起動**: `start.bat` をダブルクリックします。サーバーが最小化して起動し、ブラウザが全画面（キオスク）で開きます
- **終了**: `Alt + F4` でブラウザを閉じ、タスクバーの「server」ウィンドウも閉じます

## 前日の準備

- [ ] 3台すべてで `start.bat` から起動し、全14作品を一通り開いて確認する（初回の読み込みが遅い分は、ここでキャッシュされます）
- [ ] Windows の設定: スリープとディスプレイの電源オフを「なし」、Windows Update の再起動を停止、通知をオフ
- [ ] マウス・ヘッドホン（またはスピーカー）・電源タップを用意する

## 動き方

- 作品を選ぶと全画面で開き、左上の「🏠 もどる」で一覧に戻ります
- 3分間なにも操作がないと「まだあそぶ？」を出し、10秒たつと一覧に戻ります
- 一覧画面のまま30分たつと、ページを自動で読み込み直します（メモリの整理）
- 動作確認のときは `http://127.0.0.1:8080/?idle=10` のように開くと、無操作の時間を10秒に短くできます

## GitHub Pages で公開するとき

ランチャーを Web（GitHub Pages など）で開くと、すでに公開している作品（Unity 6作品・推し発掘・TUNA-CHANNEL）は公開中の URL から読み込みます。
展示PC（`http://127.0.0.1:8080/`）では、これまでどおり手元のファイルから読み込みます。
Web では、無操作で一覧に戻る機能や右クリックの制限などはオフになります。公開 URL は [launcher/works.js](launcher/works.js) の `web` に書いてあります。

## こまったとき

| 症状 | 対処 |
|---|---|
| `Python 3.8+ was not found` と出る | Python をインストールする。インストール時に「Add python.exe to PATH」にチェックを入れる |
| 画面が真っ白・作品が開かない | `Alt + F4` で閉じ、「server」ウィンドウも閉じてから、`start.bat` をもう一度実行する |
| 作品が固まった | 左上の「🏠 もどる」を押す。全画面ボタンを押してしまった場合は `Esc` |
| `works/unity/` などのフォルダが空 | サブモジュールを取得していない。`git submodule update --init` を実行する |
| git で `SSL certificate ... unable to get local issuer certificate` と出る | `git -c http.sslBackend=schannel submodule update --init` のように、Windows の証明書を使う指定を付けて実行する |

## 作品の追加・変更

作品の一覧・表示順・作品名は [launcher/works.js](launcher/works.js) で管理しています。
作品は `works/<種類>/<id>`、サムネイルは `launcher/thumbs/<id>.jpg` に置きます。

生徒が自分のリポジトリで作品を更新しても、展示の作品は自動では変わりません。新しい版を取り込むときは次を実行し、ランチャーで動作を確認してからコミットします。

```
git submodule update --remote
```
