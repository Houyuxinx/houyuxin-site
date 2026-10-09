@echo off
chcp 65001 >nul
cd /d "%~dp0"
py -3 --version >nul 2>&1
if not errorlevel 1 (
  py -3 tools\preview.py
) else (
  python --version >nul 2>&1
  if not errorlevel 1 (
    python tools\preview.py
  ) else (
    echo 未找到 Python 3。电脑仍可直接打开 index.html；手机局域网预览需要 Python 3。
  )
)
pause
