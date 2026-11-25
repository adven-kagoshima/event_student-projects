"""GitHub Pages に公開するファイルを _site/ に集める（GitHub Actions から実行する）。

公開するもの:
  - index.html と launcher/（ランチャー本体・サムネ・フォント・背景画像）
  - works.js で公開 URL（web）を持たない作品だけ（今は Scratch 6作品）
公開 URL のある作品は Web ではその URL から読み込むので、手元のファイルは公開しない。
sources/・server.py・start.bat も公開しない。

使い方: python .github/scripts/build_pages.py [出力先]   （既定は _site）
"""
import os
import re
import shutil
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, '_site'))


def load_works():
    """works.js から作品の path と web を読む（コメント行は除く）。"""
    text = open(os.path.join(ROOT, 'launcher', 'works.js'), encoding='utf-8').read()
    text = '\n'.join(line for line in text.splitlines() if not line.lstrip().startswith('//'))
    works = []
    for body in re.findall(r'\{\s*id:(.*?)\}', text, re.S):
        path = re.search(r"path:\s*'([^']+)'", body)
        web = re.search(r"web:\s*'([^']+)'", body)
        if path:
            works.append((path.group(1), web.group(1) if web else None))
    return works


def copy(rel):
    src = os.path.join(ROOT, rel)
    dst = os.path.join(OUT, rel)
    if os.path.isdir(src):
        shutil.copytree(src, dst)
    else:
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy2(src, dst)
    print('  +', rel)


def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT)
    print('公開するファイル:')
    copy('index.html')
    copy('launcher')
    works = load_works()
    if not works:
        sys.exit('works.js から作品を読めませんでした')
    for path, web in works:
        if web:
            continue
        # works/unity/<id>/index.html のような作品はフォルダごと、works/scratch/<id>.html はファイルだけ
        rel = os.path.dirname(path) if os.path.basename(path) == 'index.html' else path
        if not os.path.exists(os.path.join(ROOT, rel)):
            sys.exit(f'作品が見つかりません: {rel}')
        copy(rel)
    size = sum(os.path.getsize(os.path.join(d, f)) for d, _, fs in os.walk(OUT) for f in fs)
    print(f'作品 {len(works)} 件中 {sum(1 for _, w in works if not w)} 件を同梱（ほかは公開 URL から読み込む）。合計 {size / 1e6:.0f}MB')


if __name__ == '__main__':
    main()
