// 展示作品のデータ。type は 'unity' / 'scratch' / 'web'（一覧のグループ分けに使う）
// id は作品のフォルダ名（Scratch はファイル名）とサムネ名にそろえる: works/<type>/<id>、launcher/thumbs/<id>.jpg
// path は index.html からの相対パス
// thumbPos はサムネの切り取り位置（省略時は中央。例: 'top'）
// web は公開中の URL。ランチャーを GitHub Pages などの Web で開いたときはこちらを読み込む
//   （展示PCのローカル http://127.0.0.1 では path の手元のファイルを読み込む）
// 一覧の表示順はこの配列の順（AGENTS.md §2 の表の順）
// controls はカードに出す操作方法 [キー, せつめい]。キーは空白で区切ると別々のキーになる（例: 'A D'）。
//   「クリック」「ドラッグ」などマウスの操作はマウスの形で表示する（AGENTS.md §2.1 の調査結果から作成）
window.WORKS = [
  { id: 'spaceavoid', title: 'SPACE AVOID', author: '上坪 朔人', type: 'unity',
    path: 'works/unity/spaceavoid/index.html', thumb: 'launcher/thumbs/spaceavoid.jpg',
    web: 'https://nostra3910.github.io/avoidgame/',
    controls: [['WASD', 'いどう'], ['スペース', 'てきを ふきとばす']] },
  { id: 'memopath', title: 'MEMOPATH', author: '平屋 史陽', type: 'unity',
    path: 'works/unity/memopath/index.html', thumb: 'launcher/thumbs/memopath.jpg',
    web: 'https://fumiharuhiraya.github.io/MEMOPATH/',
    controls: [['↑↓←→', 'いどう'], ['R', 'ゆかを 見る']] },
  { id: 'chainmaster', title: 'ChainMaster', author: '新西 遼太', type: 'unity',
    path: 'works/unity/chainmaster/index.html', thumb: 'launcher/thumbs/chainmaster.jpg',
    web: 'https://adven-students.github.io/next_contest_ChainMaster/',
    controls: [['クリック', 'おなじ色の ブロックを けす']] },
  { id: 'kagoshimasaigai', title: 'かごしま災害シミュレーター', author: '江藤 空', type: 'unity',
    path: 'works/unity/kagoshimasaigai/index.html', thumb: 'launcher/thumbs/kagoshimasaigai.jpg',
    web: 'https://eto-sora.github.io/KagoshimaSaigai/',
    controls: [['クリック', 'さいがいを えらんで 「実行」']] },
  { id: 'rush90', title: 'RUSH 90', author: '岩元 康太', type: 'unity',
    path: 'works/unity/rush90/index.html', thumb: 'launcher/thumbs/rush90.jpg',
    web: 'https://adven-students.github.io/Rush60/',
    controls: [['W', 'ジャンプ'], ['A D', 'いどう'], ['右クリック', 'こうげき'], ['左クリック', 'スキル']] },
  { id: 'satsumabritishwar', title: 'Satsuma British War', author: '平原 大耀', type: 'unity',
    path: 'works/unity/satsumabritishwar/index.html', thumb: 'launcher/thumbs/satsumabritishwar.jpg',
    web: 'https://adven-students.github.io/Satsuma-BritishWar/',
    controls: [['←→', 'たいほうを うごかす'], ['スペース', 'うつ']] },

  { id: 'bossrush', title: 'ボスラッシュ', author: '窪田 泰基', type: 'scratch',
    path: 'works/scratch/bossrush.html', thumb: 'launcher/thumbs/bossrush.jpg',
    controls: [['↑↓', 'いどう'], ['クリック', 'ねらって こうげき']] },
  { id: 'ufocatcher', title: 'UFOキャッチャーで鹿児島県の特産品をゲットしよう', author: '冨永 心凰', type: 'scratch',
    path: 'works/scratch/ufocatcher.html', thumb: 'launcher/thumbs/ufocatcher.jpg', thumbPos: 'top',
    controls: [['クリック', 'ボタンを おす'], ['←→ スペース', 'ミニゲーム']] },
  { id: 'kanjiquiz', title: '漢字バラバラ地名クイズ〜鹿児島ver.〜', author: '冷水 悠那', type: 'scratch',
    path: 'works/scratch/kanjiquiz.html', thumb: 'launcher/thumbs/kanjiquiz.jpg',
    controls: [['キーボード', 'こたえを 入力'], ['Enter', 'けってい']] },
  { id: 'shindaisensou', title: '新大戦争', author: '北野 孔心', type: 'scratch',
    path: 'works/scratch/shindaisensou.html', thumb: 'launcher/thumbs/shindaisensou.jpg',
    controls: [['WASD スペース', 'ひだりの人'], ['↑↓←→ M', 'みぎの人']] },
  { id: 'olympic', title: 'オリンピックに挑戦！', author: '上籠 健人', type: 'scratch',
    path: 'works/scratch/olympic.html', thumb: 'launcher/thumbs/olympic.jpg',
    controls: [['↑↓', 'いどう'], ['→ ←', 'はやく・おそく'], ['スペース', 'ジャンプ']] },
  { id: 'witchforest', title: 'Witch Forest', author: '神宮寺 まゆり', type: 'scratch',
    path: 'works/scratch/witchforest.html', thumb: 'launcher/thumbs/witchforest.jpg',
    controls: [['←→', 'いどう'], ['↑', 'ジャンプ'], ['1〜7', 'おとあて']] },

  { id: 'oshihakkutsu', title: '推し発掘', author: '平尾 ひかる', type: 'web',
    path: 'works/web/oshihakkutsu/index.html', thumb: 'launcher/thumbs/oshihakkutsu.jpg',
    web: 'https://adven-students.github.io/OshiHakkutsu/',
    controls: [['クリック', 'しつもんに こたえる']] },
  { id: 'tunachannel', title: 'TUNA-CHANNEL（Live2D）', author: '平尾 ひかる', type: 'web',
    path: 'works/web/tunachannel/index.html', thumb: 'launcher/thumbs/tunachannel.jpg',
    web: 'https://8n09nozn.github.io/Tuna_Web/',
    controls: [['ドラッグ', 'キャラクターを うごかす']] },
];

// ランチャーの設定
window.LAUNCHER_CONFIG = {
  idleTimeoutSec: 180,   // 無操作でこの秒数たったら「まだあそぶ？」を出す
  confirmSec: 10,        // 「まだあそぶ？」を出してから一覧に戻るまでの秒数
  reloadAfterMin: 30,    // 一覧画面にこの分数いたらページをリロードする
};
