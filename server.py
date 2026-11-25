"""展示用の静的サーバー（Python 標準ライブラリのみ）。

使い方: python server.py [port]   （既定 8080、このファイルのあるフォルダを配信）

python -m http.server は Windows で大きいファイルを同時に配信すると
接続がリセットされて途中で切れることがあるため、HTTP/1.1 の keep-alive で
接続をクライアント側から閉じさせ、ファイルを確実に最後まで送る。
"""
import functools
import http.server
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
CHUNK = 1024 * 1024


class Handler(http.server.SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".wasm": "application/wasm",
        ".unityweb": "application/octet-stream",
        ".data": "application/octet-stream",
        ".js": "text/javascript",
        ".mjs": "text/javascript",
        ".css": "text/css",
        ".html": "text/html; charset=utf-8",
        ".csv": "text/csv; charset=utf-8",
        ".json": "application/json",
        ".mp3": "audio/mpeg",
        ".mp4": "video/mp4",
        ".webm": "video/webm",
        ".ttf": "font/ttf",
        ".otf": "font/otf",
        ".woff2": "font/woff2",
    }

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def copyfile(self, source, outputfile):
        while chunk := source.read(CHUNK):
            outputfile.write(chunk)
        outputfile.flush()

    def log_message(self, fmt, *args):
        pass  # 長時間放置するのでログは出さない


class Server(http.server.ThreadingHTTPServer):
    daemon_threads = True
    request_queue_size = 64


if __name__ == "__main__":
    handler = functools.partial(Handler, directory=ROOT)
    with Server(("127.0.0.1", PORT), handler) as httpd:
        print(f"serving {ROOT} on http://127.0.0.1:{PORT}/  (Ctrl+C で終了)")
        httpd.serve_forever()
