@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo Stopping old Node processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo Clearing cache...
if exist ".next" rmdir /s /q ".next"

echo.
echo  CARAVON.NL - starting dev server
echo  http://localhost:3000
echo.

set NODE_NO_WARNINGS=1
start "" "http://localhost:3000"
npm run dev
pause
