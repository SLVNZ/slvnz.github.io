@echo off
chcp 65001 >nul
title SLVNZ - Sunucu
cd /d "%~dp0"
set "KOK=%~dp0"

echo.
echo   SLVNZ
echo   =====
echo.

rem --- PHP var mi? ---------------------------------------------------------
where php >nul 2>nul
if errorlevel 1 (
  echo   [HATA] PHP bulunamadi.
  echo.
  echo   Kur ve PATH'e ekle:  winget install PHP.PHP.8.4
  echo.
  pause
  exit /b 1
)

rem --- Siteyi tazele -------------------------------------------------------
echo   docs/ yeniden uretiliyor...
php "%KOK%build.php"
if errorlevel 1 (
  echo.
  echo   [HATA] Uretim basarisiz - yukaridaki mesaji oku.
  echo.
  pause
  exit /b 1
)

rem --- Varsa eski sunuculari kapat -----------------------------------------
taskkill /FI "WINDOWTITLE eq SLVNZ site*"  /F >nul 2>nul
taskkill /FI "WINDOWTITLE eq SLVNZ panel*" /F >nul 2>nul

rem --- Sunuculari baslat (tam yol: CWD'ye bagimli degil) -------------------
start "SLVNZ site"  /min php -S 127.0.0.1:8080 -t "%KOK%docs"
start "SLVNZ panel" /min php -S 127.0.0.1:8000 -t "%KOK%admin"

rem --- Ayaga kalkmalarini bekle (timeout yerine ping: her ortamda calisir) --
ping -n 3 127.0.0.1 >nul

rem --- Tarayiciyi ac -------------------------------------------------------
start "" "http://localhost:8080/"

echo.
echo   Site   : http://localhost:8080     ^<- tarayicida acildi
echo   Panel  : http://localhost:8000
echo.
echo   Panelde kaydettigin her sey docs/ klasorune yazilir.
echo   Yayinlamak icin:  git add -A ^&^& git commit -m "..." ^&^& git push
echo.
echo   ------------------------------------------------------------
echo    Sunuculari kapatmak icin bu pencerede bir tusa bas.
echo   ------------------------------------------------------------
echo.
pause >nul

rem --- Kapat ---------------------------------------------------------------
taskkill /FI "WINDOWTITLE eq SLVNZ site*"  /F >nul 2>nul
taskkill /FI "WINDOWTITLE eq SLVNZ panel*" /F >nul 2>nul
echo   Sunucular kapatildi.
ping -n 2 127.0.0.1 >nul
