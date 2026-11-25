# マイアミフェスタ2026 展示用ランチャー 仕様書

## 1. 概要

| 項目 | 内容 |
|---|---|
| イベント | マイアミフェスタ2026（鹿児島市 マイアミ通り） |
| 日時 | 2026年11月21日（土）・22日（日） 11:00〜16:00 |
| 主催 | NPO法人マイアミ通りまちづくりコネクト（鹿児島市・UR都市機構が支援） |
| 想定来場者 | 親子連れ、小学生 |
| 展示形態 | PC 3台。サーバーを起動したまま、スタッフがほぼ付かない状態で自由に遊んでもらう |
| 目的 | 生徒作品（Unity / Scratch / Web）を、1枚の `index.html` から選んで遊べるようにする |

**結論: 実装できる。** 全作品がローカルの静的サーバー（`http://127.0.0.1`）から起動すること、`index.html` 内の iframe に読み込んでも動くことを実機で確認した（§3）。
ただし、次の2点は対応が必要。
1. **サーバーは `python -m http.server` ではなく、同梱の `server.py` を使う**（標準サーバーは同時アクセス時に大きいファイルが途中で切れる問題を確認した）。展示PCには Node.js がないため、Python 標準ライブラリだけで作る
2. **Tuna_Web はそのままだとローカルで一部が動かなかった**（パスとオフラインの問題）→ 解決済み（§3）

### 動作の前提（プロジェクトをコピーするだけで動かすために）
- サーバーは **1台につき1つ** で全作品を配信する（作品ごとにサーバーを立てる必要はない）。Unity WebGL と推し発掘は `file://` では動かないので、サーバーは必須
- 展示PCに必要なもの: **Python 3.8 以上**（`python` か `py` で起動できること）と **Microsoft Edge**（Windows 標準。Chrome があればそちらでもよい）
- インターネット接続は不要（全作品）
- 展示PCへコピーするのは `index.html`・`launcher/`・`works/`・`server.py`・`start.bat` だけでよい（約420MB。`.git` と `sources/` は不要）。手順は README.md
- Unity 6作品・推し発掘・TUNA-CHANNEL は、生徒のリポジトリを git サブモジュールとして `works/` に取り込んでいる（§2.2）。準備用PCでは `git clone --recurse-submodules` で取得する
- 一覧画面のカードは **スクリーンショット画像** にする。作品を同時に読み込むとメモリと CPU を大きく使うため、遊ぶ作品1つだけを読み込む

## 2. 作品一覧

| # | 表示名 | 作者 | 種別 | 起動パス | 読み込み量 | 公開URL |
|---|---|---|---|---|---|---|
| 1 | SPACE AVOID | 上坪 朔人 | Unity WebGL（brotli） | `works/unity/spaceavoid/index.html` | 約3MB | https://nostra3910.github.io/avoidgame/ |
| 2 | MEMOPATH | 平屋 史陽 | Unity WebGL（gzip） | `works/unity/memopath/index.html` | 約14MB | https://fumiharuhiraya.github.io/MEMOPATH/ |
| 3 | ChainMaster | 新西 遼太 | Unity WebGL（無圧縮） | `works/unity/chainmaster/index.html` | 約69MB | https://adven-students.github.io/next_contest_ChainMaster/ |
| 4 | かごしま災害シミュレーター | 江藤 空 | Unity WebGL（gzip） | `works/unity/kagoshimasaigai/index.html` | 約43MB | https://eto-sora.github.io/KagoshimaSaigai/ |
| 5 | RUSH 90 | 岩元 康太 | Unity WebGL（gzip） | `works/unity/rush90/index.html` | 約16MB | https://adven-students.github.io/Rush60/ |
| 6 | Satsuma British War | 平原 大耀 | Unity WebGL（gzip） | `works/unity/satsumabritishwar/index.html` | 約61MB | https://adven-students.github.io/Satsuma-BritishWar/ |
| 7 | ボスラッシュ | 窪田 泰基 | Scratch（TurboWarp） | `works/scratch/bossrush.html` | 約23MB | （なし） |
| 8 | UFOキャッチャーで鹿児島県の特産品をゲットしよう | 冨永 心凰 | Scratch（TurboWarp で HTML 化） | `works/scratch/ufocatcher.html` | 約31MB | （なし） |
| 9 | 漢字バラバラ地名クイズ〜鹿児島ver.〜 | 冷水 悠那 | Scratch（TurboWarp） | `works/scratch/kanjiquiz.html` | 約2.5MB | （なし） |
| 10 | 新大戦争 | 北野 孔心 | Scratch（TurboWarp） | `works/scratch/shindaisensou.html` | 約55MB | （なし） |
| 11 | オリンピックに挑戦！ | 上籠 健人 | Scratch（TurboWarp） | `works/scratch/olympic.html` | 約7MB | （なし） |
| 12 | Witch Forest | 神宮寺 まゆり | Scratch（TurboWarp） | `works/scratch/witchforest.html` | 約42MB | （なし） |
| 13 | 推し発掘 | 平尾 ひかる | HTML/JS（複数ページ） | `works/web/oshihakkutsu/index.html` | 小 | https://adven-students.github.io/OshiHakkutsu/ |
| 14 | TUNA-CHANNEL（Live2D） | 平尾 ひかる | Vite ビルド成果物 | `works/web/tunachannel/index.html` | 約22MB | https://8n09nozn.github.io/Tuna_Web/ |

- 作者名は 2026-11-22 に全作品確認した。説明文と操作方法は、各作品を起動して確認したうえで書く。
- Unity 上の productName と表示名が違う作品: ChainMaster（"Toon Blast Unity version"）、SPACE AVOID（"Avoid Game"）。ランチャーでは表の表示名を使う。
- 表示名はゲーム内のタイトル表記に合わせた（2026-11-22）: かごしま災害シミュレーター（旧表記「桜島噴火シミュレーター」）、RUSH 90（旧表記「Rush 60」）、Satsuma British War（旧表記「Satsuma-British War」）。
- ランチャーの表示順はこの表の順（# の順）にする。works.js の並びで決まる。
- フォルダ名・ファイル名は works.js の id にそろえた（2026-11-22）。元の名前との対応: avoidgame→spaceavoid、Rush60→rush90、Satsuma-BritishWar→satsumabritishwar、OshiHakkutsu→oshihakkutsu、Scratch の HTML は日本語名→id（例: `ボスラッシュ.html`→`bossrush.html`）、TUNA は `Tuna_Web/Samples/TypeScript/Demo/dist/` の中身→`works/web/tunachannel/`（2026-11-25 からは元のリポジトリの `build` ブランチをサブモジュールで取り込む。§2.2）。作品の中身は変更していない。
- `sources/scratch/*.sb3`（新大戦争のみ .sb2）は元データなので、展示には使わない（HTML 化したものを使う）。
- 公開URL は各生徒が GitHub Pages で公開しているもの（2026-11-22 時点。公開の許可あり）。ランチャーを Web で開いたときはこちらを読み込む（§5.5）。Scratch 6作品は公開URL がないので、Web でも `works/scratch/` のファイルを使う

### 2.1 操作方法（2026-11-22 調査）
Scratch は元データ（`sources/scratch/`）のプログラムから、Unity はゲーム内の説明画面と実際の操作で確認した。

| # | 作品 | 操作方法 | 調べ方 |
|---|---|---|---|
| 1 | SPACE AVOID | スペースでスタート → Enter でレベル開始（Q でもどる）。W・A・S・D で移動して敵をよける。スペースで BLAST（敵を吹き飛ばす） | 実際に操作（矢印キーでは動かない） |
| 2 | MEMOPATH | マウスでモードを選ぶ。矢印キーで移動。R で床が少し見える（リトライ回数が1増える） | ゲーム内の操作説明 |
| 3 | ChainMaster | マウスで「GameStart」。同じ色がつながったブロックをクリックして消す | 実際に操作 |
| 4 | かごしま災害シミュレーター | マウスだけ。災害と条件を選んで「実行」 | ゲーム内の「使い方」 |
| 5 | RUSH 90 | W でジャンプ、A・D で左右移動、右クリックで通常攻撃、左クリックでスキル。60秒たつとクリア | ゲーム内の「操作方法など」 |
| 6 | Satsuma British War | マウスで「START」。←→で大砲を動かし、スペースで発射 | 実際に操作 |
| 7 | ボスラッシュ | ↑↓で飛空艇を動かす。マウスでねらってクリックで攻撃 | プログラム |
| 8 | UFOキャッチャー | マウスでボタンをクリック。ミニゲームは風船をクリック／スペースキー連打。シューティングは←→で移動、スペースで発射 | プログラム・タイトル画面 |
| 9 | 漢字バラバラ地名クイズ | マウスでスタート。答えをキーボードで入力して Enter（漢字でもひらがなでも正解。例: 知覧／ちらん） | プログラム |
| 10 | 新大戦争 | **2人対戦**。左の人は W・A・S・D で移動、スペースで攻撃。右の人は矢印キーで移動、M で攻撃 | プログラム・ゲーム内の「遊び方」 |
| 11 | オリンピックに挑戦！ | マウスでボタンを選ぶ。↑↓で移動、→で加速、←で減速、スペースでジャンプ（障害物をよける）・給水 | ゲーム内の説明 |
| 12 | Witch Forest | マウスでスタート。←→で移動、↑でジャンプ。スライムとの「音感勝負」は、鳴った音を数字（ド=1〜シ=7）で入力して Enter | プログラム |
| 13 | 推し発掘 | マウスだけ。質問のチェックボックスを選んで「NEXT」「RESULT」 | ページの内容 |
| 14 | TUNA-CHANNEL | マウスだけ。ページをスクロールし、Live2D はドラッグで動く | 実際に操作 |

- 漢字クイズでひらがな・漢字を入力するには、日本語入力（IME）をオンにする必要がある（キーボードの「半角/全角」キー）。展示PCで確認しておく
- RUSH 90 の右クリックは攻撃に使う。ランチャーの右クリック禁止（ローカル時）はメニューを出さないだけで、ゲームの右クリックは効く

### 2.2 サブモジュール（2026-11-25）
Unity 6作品・推し発掘・TUNA-CHANNEL は、生徒が公開しているリポジトリを git サブモジュールとして取り込む。このリポジトリには「どのコミットを使うか」だけが記録される。Scratch 6作品とサムネは、このリポジトリに直接入れている。

| パス | リポジトリ | ブランチ |
|---|---|---|
| `works/unity/spaceavoid` | https://github.com/nostra3910/avoidgame | main |
| `works/unity/memopath` | https://github.com/fumiharuhiraya/MEMOPATH | main |
| `works/unity/chainmaster` | https://github.com/adven-students/next_contest_ChainMaster | main |
| `works/unity/kagoshimasaigai` | https://github.com/eto-sora/KagoshimaSaigai | main |
| `works/unity/rush90` | https://github.com/adven-students/Rush60 | main |
| `works/unity/satsumabritishwar` | https://github.com/adven-students/Satsuma-BritishWar | main |
| `works/web/oshihakkutsu` | https://github.com/adven-students/OshiHakkutsu | main |
| `works/web/tunachannel` | https://github.com/8n09nozn/Tuna_Web | **build**（ビルド結果だけのブランチ） |

- 取り込む前に、手元に置いていたファイルと生徒のリポジトリをハッシュで比べ、全ファイルが一致することを確認した（TUNA は `build` ブランチ 429ファイル中426が一致。違いは改行コードと Tailwind の警告文言だけ）
- `.gitmodules` で `shallow = true`（最新のコミットだけを取る）。かごしま災害はリポジトリの履歴が 268MB あるため
- 生徒がリポジトリを更新しても、展示の作品は自動では変わらない。取り込むときは `git submodule update --remote`（→ 動作確認 → コミット）
- 生徒のリポジトリには `* text=auto` の `.gitattributes` があるため、Windows では HTML・JS・CSV が CRLF で取り出される。動作には影響しない（推し発掘の CSV も各値を `trim()` しているので正しく読める。2026-11-25 確認）
- このPCの git は OpenSSL の証明書の設定で GitHub に接続できなかった。`git -c http.sslBackend=schannel ...` で接続できる（README の「こまったとき」）

## 3. 検証結果（2026-11-21 実施）

環境: Windows 11 / Chrome / Python 3.15。リポジトリのルートを静的サーバーで配信して確認した。

| 対象 | 結果 | 備考 |
|---|---|---|
| Unity 6作品 | ✅ 起動 | 単独ページでも iframe 内でも起動する。ロードバーが消えるまで2〜8秒（最大の薩英戦争で約8秒）。`.unityweb` の gzip / brotli は loader.js 内で展開されるので、サーバーに Content-Encoding の設定は要らない |
| Scratch 6作品 | ✅ 起動 | すべて緑の旗の画面まで表示された。外部 URL への依存はなく、オフラインで動く |
| 推し発掘 | ✅ 起動 | `fetch("推し活素材/holoform.csv")` を使うため、`file://` では動かずサーバーが必須 |
| TUNA-CHANNEL | ✅ 起動（修正後） | 下記の修正でオフラインでも動く |
| `python -m http.server` | ❌ 不可 | 1本ずつなら問題ないが、4本同時にダウンロードすると2本が途中で切断された（curl exit 56）。ブラウザでも `ERR_CONNECTION_RESET` が出て Unity が起動しなかった |
| `server.py`（HTTP/1.1 keep-alive 版） | ✅ | 19〜55MB のファイル6本の同時ダウンロードを3回繰り返し、全18本が欠けずに届いた。49MB を0.26秒で配信 |

### TUNA-CHANNEL の問題（2026-11-22 解決済み）
1. **絶対パス** → ✅ 解決: GitHub Pages 用に `base: '/Tuna_Web/'` でビルドされていたため、`/Tuna_Web/LIVE2D.html` と `/Tuna_Web/assets/*.js` が 404 になり、Live2D が表示されなかった。
   `vite.config.mts` の build 時の base を `'./'`（相対パス）に変えて、`npm run build:prod` でビルドし直した。GitHub Pages でもローカルでも動く。
2. **外部 CDN への依存** → ✅ 解決: Tailwind（`cdn.tailwindcss.com`）と Google Fonts を読み込んでいたため、ネットがないとレイアウトが崩れた。
   - Tailwind Play CDN 3.4.17（forms / container-queries 入り）を `public/vendor/tailwind.js` に保存した
   - Google Fonts（Epilogue、Plus Jakarta Sans、Space Grotesk、Zen Maru Gothic、Material Symbols Outlined）の CSS と woff2 380ファイル（7.5MB）を `public/vendor/fonts.css` と `public/vendor/fonts/` に保存した
   - `index.html` の参照先をこれらに差し替えた
   - 検証: ページと Live2D の iframe のどちらも、外部への通信が0件。フォント、Tailwind、Live2D モデルが表示されることを確認した
   - 元のビルドは scratchpad の `tuna_dist_backup` に退避してある
3. 既知の軽微な問題（元からある）: `LAppDefine.BackImageName` などが未定義のため、`Resources/undefined` へのリクエストが1件 404 になる。表示には影響しない。
4. 中身は「公式サイト」風のページで、遊ぶ要素は Live2D（ドラッグで動く）。展示することに決定した（2026-11-22）。
5. 上記の修正（`vite.config.mts`・`index.html`・`public/vendor/`）は、元のリポジトリ（https://github.com/8n09nozn/Tuna_Web ）の main に反映済み（2026-11-25、コミット `ac7d6a8`）。生徒のワークフローが、ビルド結果を Pages に公開すると同時に `build` ブランチにも保存する。展示用はその `build` ブランチをサブモジュールとして取り込む（§2.2）。ビルドし直す必要はない

## 4. 構成

```
event_student-projects/
├─ index.html          ← 作成済み: ランチャー（作品一覧＋プレイヤー）。動作確認用に ?idle=秒 で無操作タイムアウトを短縮できる
├─ launcher/
│   ├─ assets/         ← IT Adventure のロゴ（logo.svg）・favicon.png、site/（サイトの背景画像）、fonts/（同梱フォント）
│   ├─ works.js        ← 作成済み: 作品データ（表示名・作者・種別・パス・サムネ）とタイムアウト等の設定
│   └─ thumbs/*.jpg    ← 作成済み: サムネイル（展示する14作品のスクリーンショット）
├─ server.py           ← 作成済み: Python 標準ライブラリだけの静的サーバー
├─ start.bat           ← 作成済み: サーバー起動＋Edge／Chrome のキオスク起動（専用プロファイル %LOCALAPPDATA%\MiamiFestaKiosk を使う）
├─ .github/           ← GitHub Pages への公開（workflows/pages.yml と scripts/build_pages.py）
├─ works/              ← 展示する作品だけを置く。名前は works.js の id にそろえる（作品の中身は変更しない）
│   ├─ unity/<id>/index.html     （6作品）
│   ├─ scratch/<id>.html         （6作品。TurboWarp で HTML 化したもの）
│   └─ web/<id>/index.html       （推し発掘、TUNA-CHANNEL のビルド成果物）
│      ※ unity/ の6作品と web/ の2作品は git サブモジュール（§2.2）。scratch/ はこのリポジトリに直接入っている
├─ .gitmodules         ← サブモジュールの一覧（URL・ブランチ・shallow）
└─ sources/            ← 展示には使わない元データ（展示PCへのコピーは不要）
    └─ scratch/        ← Scratch の .sb3 / .sb2
```

## 5. index.html の仕様

### 5.1 画面
- **ヘッダー**: IT Adventure のロゴ（`launcher/assets/logo.svg`）、見出し「みんなのゲームであそぼう！」、サブ見出し「IT Adventure 生徒作品展示 ／ マイアミフェスタ2026」。favicon は `launcher/assets/favicon.png`
  - 出典: https://it-adventure.net/ （小学生向けプログラミングスクール IT Adventure、鹿児島中央・谷山）。サイトのファイルの使用は許可済み
- **デザイン**: IT Adventure のサイトに合わせる（3案を比較して案A に決定、2026-11-22）
  - ヘッダーはサイトのトップと同じ空と丘の画像（`launcher/assets/site/back_top.png`）。ロゴは白い角丸の台に載せ、見出しはオレンジ `#F39800` の帯に白い太字で1行
  - 一覧の背景は緑の四角模様（`launcher/assets/site/back_green.png`）。白い四角がゆっくり浮かぶ
  - グループ見出しはサイトのメニュー風タブ（Unity 青 `#0F6FB7`、Scratch オレンジ `#F39800`、Web ピンク `#E6337A`）
  - カードは濃緑 `#004132` の枠と、ぼかさない影でドット風。「▶ あそぶ」「もどる」もオレンジの四角
  - 「よみこみ中…」はヘッダーと同じ空と丘の画面。「まだあそぶ？」はオレンジの帯と緑のボタン
  - フォントは M PLUS 1p（本文）と DotGothic16（ドット文字）。`launcher/assets/fonts/` に TTF とライセンス（OFL）を同梱
  - サイトのキャラクター画像（`launcher/assets/site/character.png`、元は `character_1@2x.png`）を一覧のヘッダー右下と「よみこみ中…」画面に置く
- **一覧**: カードを3列で大きめに並べる（1920×1080 でカード幅 約550px）。端数の行は中央にそろえる。カードに載せるのは **サムネ・作品名・作者名・操作方法**（説明文・対象年齢は載せない）。操作方法は作者名の下に、キーの形（キーキャップ）＋ひと言で並べる。データは works.js の `controls`（中身は §2.1 の調査結果から作成）。サムネは静止画のスクリーンショットで、一覧では作品を一切読み込まない
- 「Unity」「Scratch」「Web」の3グループに分けて並べる
- 子ども向けに文字は大きく（作品名 24px 以上）、タップしやすい大きさにする

### 5.2 プレイヤー（iframe 方式）
- カードをクリックしたら、画面全体を覆う `<iframe>` で作品を開く。ブラウザ UI がない状態（キオスク）でも戻れるように、**左上に常に「🏠 もどる」ボタンを出す**（作品の上に重ねる）。
- もどるときは `iframe.src = 'about:blank'` にしてから iframe を消す。WebGL と WASM のメモリを確実に解放するため。
- iframe には `allow="fullscreen; autoplay; gamepad"` を付け、読み込み後に `contentWindow.focus()` を呼ぶ（キーボード操作の作品向け）。
- 読み込み中はランチャー側でも「よみこみ中…」を表示する。

### 5.3 放置対策（無人運用）
- **無操作タイムアウト**: 3分（設定可能）操作がなければ一覧に戻す。iframe は同一オリジンなので、`contentWindow` に `pointerdown` / `keydown` / `touchstart` のリスナーを付けて操作を検知できる。
- 戻る前に「まだあそぶ？」を10秒表示し、タッチされたら延長する。
- 一覧画面に戻って30分たったら `location.reload()` して、メモリリークをリセットする。
- 右クリック、テキスト選択、ブラウザのショートカット（F5 など）はできるだけ無効にする。

### 5.4 データ（works.js）
```js
window.WORKS = [
  { id: 'rush90', title: 'RUSH 90', author: '岩元 康太', type: 'unity',
    path: 'works/unity/rush90/index.html', thumb: 'launcher/thumbs/rush90.jpg' },
  // ...
];
```
- id はフォルダ名（Scratch はファイル名）・サムネ名と同じにする: `works/<type>/<id>`、`launcher/thumbs/<id>.jpg`。
- パスは ASCII だけになったが、念のため `encodeURI()` してから `src` に渡している。

### 5.5 ローカルと Web の切り替え（2026-11-22）
- ランチャーをどこで開いたかで、作品の読み込み先と無人運用の機能を切り替える（index.html の `LOCAL`）
  - **ローカル**（`127.0.0.1` / `localhost` / `file:`。展示PC）: 作品は手元のファイル（works.js の `path`）から読み込む。無操作タイムアウト・30分ごとの再読み込み・右クリックやショートカットの制限を使う
  - **Web**（GitHub Pages など）: 公開中の URL（works.js の `web`）があればそちらから読み込み、なければ `path`。無人運用の機能は使わない
- Web で無人運用の機能を使わない理由: 公開中の URL は別オリジン（github.io のサブドメインはそれぞれ別サイト扱い）なので、iframe の中の操作をランチャーから検知できず、遊んでいる途中でもタイムアウトしてしまうため
- 動作確認は `?mode=local` / `?mode=web` を付けて開くと切り替えられる（例: `http://127.0.0.1:8080/?mode=web`）
- 確認済み（2026-11-22）: 公開 URL 8件はすべて 200 で、iframe への埋め込み制限（X-Frame-Options / CSP）なし。Web モードで8作品が公開 URL から、Scratch 6作品が手元から読み込まれ、Unity（ChainMaster）が iframe 内で起動することを確認した

## 6. サーバー（server.py、作成済み）
- Python 標準ライブラリだけで作る（pip install は不要、Python 3.8 以上）。`python server.py [port]` で起動し、既定では `127.0.0.1:8080` で待ち受ける。`server.py` のあるフォルダを配信する。
- `python -m http.server` との違い:
  - `protocol_version = "HTTP/1.1"`（keep-alive）にして、接続をブラウザ側から閉じさせる。標準サーバーは1回ごとにサーバー側から切断するため、Windows で同時に配信すると接続がリセットされて途中で切れていた
  - `ThreadingHTTPServer`、`request_queue_size = 64`、1MB ずつ書き出す
  - MIME の対応を追加（`.wasm → application/wasm`、`.unityweb` など）。`Cache-Control: no-cache` を付け、アクセスログは出さない
- `127.0.0.1` だけで待ち受けるので、Windows ファイアウォールの許可ダイアログは出ない想定。

## 7. 起動手順（start.bat）
```bat
@echo off
cd /d "%~dp0"
where python >nul 2>nul && (set PY=python) || (set PY=py)
start "server" /min %PY% server.py 8080
timeout /t 2 >nul
set ARGS=--kiosk --autoplay-policy=no-user-gesture-required --disable-pinch --overscroll-history-navigation=0 --no-first-run
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" %ARGS% http://127.0.0.1:8080/
) else (
  start "" msedge %ARGS% --edge-kiosk-type=fullscreen http://127.0.0.1:8080/
)
```
- `python` が Microsoft Store のエイリアス（実体がない）になっている PC があるので、事前に `python --version` で確認する。
- 3台とも同じ構成で、**各PCで個別にサーバーを動かす**（LAN は不要で、1台が落ちてもほかに影響しない）。
- Windows の設定: スリープとディスプレイ OFF を「なし」にする。Windows Update の再起動を止める。通知を OFF にする。
- キオスクの終了は Alt+F4（スタッフ用）。

## 8. 当日の運用チェックリスト
- [ ] 各PCで `python --version` が 3.8 以上であることを確認する
- [ ] 前日までに3台すべてで全14作品を一通り起動して確認する（初回ロードでブラウザキャッシュも温まる）
- [ ] 会場のネット環境は不要（全作品オフラインで動作確認済み）
- [ ] 電源の確保（屋外のため延長コード・電源タップ）。画面の直射日光対策
- [ ] マウスを用意する（キーボード操作の作品があるなら、キーの説明シールを貼る）
- [ ] ヘッドホンかスピーカーの音量（屋外ステージの音に負けない／大きすぎない）
- [ ] 昼休みなどに定期的に一覧画面へ戻ってリロードする

## 9. 確認事項

### 決定済み（2026-11-22）
- カードには説明文・対象年齢を載せない。操作方法は載せる（2026-11-24 変更。最初は作品名と作者名だけの予定だった）
- ヘッダーは IT Adventure（https://it-adventure.net/）のロゴと名前を使う
- 推し発掘（ホロライブ）: 展示して問題ない
- 3台すべてに同じ全作品を入れる
- 展示用PCの性能は十分
- TUNA-CHANNEL は展示する
- Unity の全画面ボタン、かごしま災害シミュレーターの「おわる」ボタンは対応しない（気にしない）
- 公開は adven-kagoshima（https://github.com/adven-kagoshima/event_student-projects）。GitHub Actions（`.github/workflows/pages.yml`）で、Web に必要なファイルだけを Pages に公開する（`.github/scripts/build_pages.py` が works.js から判断して集める）。Pages の設定で「Source: GitHub Actions」を選ぶ
- ローカル／Web のモード切り替えを採用（§5.5）
- サムネは今のまま（RUSH 90 だけプレイ画面、ほかはタイトル画面）
- 操作方法の案内は一覧のカードに表示する（調査結果は §2.1）
- 生徒が公開している作品（Unity 6作品・推し発掘・TUNA-CHANNEL）は、このリポジトリにコピーせず git サブモジュールで取り込む（2026-11-25、§2.2）。TUNA-CHANNEL はオフライン用の修正を元のリポジトリに反映し、`build` ブランチを取り込む

### 未決定
- スマホへの対応（今後の検討課題）
