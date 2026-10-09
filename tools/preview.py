#!/usr/bin/env python3
"""Local ECHYOX preview, including byte ranges for Safari audio seeking."""
import argparse
import ipaddress
import re
import subprocess
import sys
import webbrowser
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

SITE_ROOT = Path(__file__).resolve().parent.parent


class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def send_head(self):
        self.remaining = None
        path = Path(self.translate_path(self.path))
        match = re.fullmatch(r'bytes=(\d*)-(\d*)', self.headers.get('Range', ''))
        if not match or not path.is_file():
            return super().send_head()
        size = path.stat().st_size
        first, last = match.groups()
        if first:
            start = int(first)
            end = min(int(last), size - 1) if last else size - 1
        else:
            suffix = int(last) if last else 0
            start, end = max(0, size - suffix), size - 1
            if suffix == 0:
                start = size
        if start >= size or start > end:
            self.send_response(416)
            self.send_header('Content-Range', 'bytes */' + str(size))
            self.send_header('Content-Length', '0')
            self.end_headers()
            return None
        stream = path.open('rb')
        stream.seek(start)
        self.remaining = end - start + 1
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(str(path)))
        self.send_header('Content-Range', 'bytes %s-%s/%s' % (start, end, size))
        self.send_header('Content-Length', str(self.remaining))
        self.end_headers()
        return stream

    def copyfile(self, source, outputfile):
        if self.remaining is None:
            return super().copyfile(source, outputfile)
        while self.remaining:
            block = source.read(min(65536, self.remaining))
            if not block:
                break
            outputfile.write(block)
            self.remaining -= len(block)


def local_addresses():
    # Inspect local interfaces; never contact an outside site to discover an IP.
    commands = [['ipconfig', 'getifaddr', 'en0'], ['ipconfig', 'getifaddr', 'en1']] if sys.platform == 'darwin' else [['ipconfig']] if sys.platform == 'win32' else [['hostname', '-I']]
    found = set()
    for command in commands:
        try:
            result = subprocess.run(command, capture_output=True, text=True, timeout=3)
        except (OSError, subprocess.TimeoutExpired):
            continue
        for value in re.findall(r'\b(?:\d{1,3}\.){3}\d{1,3}\b', result.stdout):
            try:
                ip = ipaddress.ip_address(value)
            except ValueError:
                continue
            if ip.is_private and not ip.is_loopback and not ip.is_unspecified:
                found.add(value)
    return sorted(found)


def main():
    parser = argparse.ArgumentParser(description='ECHYOX 本地预览，不上传文件。')
    parser.add_argument('--port', type=int, default=8765)
    parser.add_argument('--no-open', action='store_true')
    args = parser.parse_args()
    handler = partial(PreviewHandler, directory=str(SITE_ROOT))
    try:
        server = ThreadingHTTPServer(('0.0.0.0', args.port), handler)
    except OSError as error:
        print('预览未启动：%s\n可关闭此前的预览窗口后重试。' % error, flush=True)
        return 1
    port = server.server_address[1]
    desktop = 'http://127.0.0.1:%s/' % port
    print('电脑预览：' + desktop, flush=True)
    print('手机与电脑连接同一 Wi-Fi，用 Safari 打开以下地址：', flush=True)
    for address in local_addresses():
        print('http://%s:%s/' % (address, port), flush=True)
    print('重点检查：主页四个入口、/theatre.html、/poetry.html、/music.html、/becoming.html 及本次修改的页面', flush=True)
    print('这是本地预览，不上传作品。按 Ctrl+C 或关闭此窗口停止。', flush=True)
    if not args.no_open:
        webbrowser.open(desktop)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
