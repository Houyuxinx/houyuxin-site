#!/bin/bash
cd "$(dirname "$0")" || exit 1
if command -v python3 >/dev/null 2>&1; then
  python3 tools/preview.py
else
  echo '未找到 Python 3。电脑仍可直接打开 index.html 预览；手机局域网预览需要 Python 3。'
fi
read -r -p '按回车关闭此窗口。'
