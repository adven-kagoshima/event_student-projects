@echo off
rem Miami Festa 2026 exhibition launcher: start local server + browser in kiosk mode
rem Exit kiosk: Alt+F4 (staff only)
cd /d "%~dp0"

set PY=
python --version >nul 2>nul && set PY=python
if not defined PY py --version >nul 2>nul && set PY=py
if not defined PY (
  echo Python 3.8+ was not found. Please install Python.
  pause
  exit /b 1
)

start "server" /min %PY% server.py 8080
timeout /t 2 >nul

set URL=http://127.0.0.1:8080/
set PROFILE=%LOCALAPPDATA%\MiamiFestaKiosk
set ARGS=--kiosk --autoplay-policy=no-user-gesture-required --disable-pinch --overscroll-history-navigation=0 --no-first-run --no-default-browser-check --disable-session-crashed-bubble --disable-features=Translate "--user-data-dir=%PROFILE%"

set CHROME=
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined CHROME if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not defined CHROME if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" set "CHROME=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"

if defined CHROME (
  start "" "%CHROME%" %ARGS% %URL%
) else (
  start "" msedge %ARGS% --edge-kiosk-type=fullscreen %URL%
)
