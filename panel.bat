@echo off
setlocal EnableExtensions
chcp 65001 >nul
title SLVNZ - Yonetim Paneli

rem Bu dosya nerede duruyorsa depo kokunu oradan al.
cd /d "%~dp0"

set "PORT=8090"
set "URL=http://127.0.0.1:%PORT%/"

rem --- Python bul: once py baslaticisi, sonra python ---
set "PY="
where py >nul 2>nul && set "PY=py -3"
if not defined PY where python >nul 2>nul && set "PY=python"
if not defined PY (
  echo.
  echo [HATA] Python bulunamadi.
  echo        https://www.python.org/downloads/ adresinden kur ve kurulumda
  echo        "Add python.exe to PATH" secenegini isaretle.
  echo.
  pause
  exit /b 1
)

if not exist "admin\server.py" (
  echo.
  echo [HATA] admin\server.py bulunamadi. panel.bat depo kokunde durmali.
  echo.
  pause
  exit /b 1
)

rem --- Panel zaten ayakta mi? Oyleyse yeni sunucu acma, sadece tarayiciyi ac. ---
netstat -ano | findstr /r /c:":%PORT% .*LISTENING" >nul 2>nul
if not errorlevel 1 (
  echo Panel zaten calisiyor -^> %URL%
  start "" "%URL%"
  exit /b 0
)

rem --- Arka planda portu bekle, acilinca tarayiciyi ac (en fazla ~20 sn) ---
start "" /min powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -Command ^
  "for($i=0;$i -lt 40;$i++){try{$c=New-Object Net.Sockets.TcpClient;$c.Connect('127.0.0.1',%PORT%);$c.Close();Start-Process '%URL%';break}catch{Start-Sleep -Milliseconds 500}}"

echo.
echo SLVNZ yonetim paneli baslatiliyor... (%URL%)
echo Durdurmak icin bu pencerede Ctrl+C.
echo.

%PY% "admin\server.py"

echo.
echo Sunucu durdu.
pause
