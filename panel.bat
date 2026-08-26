@echo off
setlocal EnableExtensions
chcp 65001 >nul
title SLVNZ - Yonetim Paneli

rem =========================================================================
rem  SLVNZ yonetim paneli baslaticisi
rem
rem  Kullanim:
rem    panel.bat            gereksinimleri denetle, sonra paneli baslat
rem    panel.bat /kur       eksik paketi SORMADAN kur, sonra baslat
rem    panel.bat /atla      denetimi gec, dogrudan baslat
rem    panel.bat /denetle   yalnizca denetle, paneli baslatma
rem
rem  Denetimi admin\gerekli.py yapar: Python surumu, pip, MySQL surucusu ve
rem  MySQL sunucusu. Hicbiri zorunlu degil - eksikse panel SQLite'a duser ve
rem  tam calisir - o yuzden denetim paneli DURDURMAZ, yalnizca soyler ve
rem  kurulabilir olani sorar.
rem =========================================================================

rem Bu dosya nerede duruyorsa depo kokunu oradan al.
cd /d "%~dp0"

set "PORT=8090"
set "URL=http://127.0.0.1:%PORT%/"

rem --- Bayraklar ---
set "DENETIM="
set "ATLA="
set "YALNIZDENETLE="
if /i "%~1"=="/kur"     set "DENETIM=--kur"
if /i "%~1"=="/atla"    set "ATLA=1"
if /i "%~1"=="/denetle" set "YALNIZDENETLE=1"

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

rem --- /denetle: yalnizca rapor, sunucuya dokunma ---
rem Bu dal port denetiminden ONCE: panel ayaktayken de gereksinimlere
rem bakabilmek gerekiyor.
if defined YALNIZDENETLE (
  %PY% "admin\gerekli.py"
  echo.
  pause
  exit /b 0
)

rem --- Panel zaten ayakta mi? Oyleyse yeni sunucu acma, sadece tarayiciyi ac. ---
netstat -ano | findstr /r /c:":%PORT% .*LISTENING" >nul 2>nul
if not errorlevel 1 (
  echo Panel zaten calisiyor -^> %URL%
  start "" "%URL%"
  exit /b 0
)

rem --- Gereksinim denetimi ---
rem Sunucu HENUZ baslamadi: konsol bos, gerekli.py soru sorabiliyor. Sunucudan
rem sonra calistirilsaydi istem, sunucunun kendi ciktisinin altinda kaybolurdu.
rem Sifirdan farkli cikis yalnizca Python'un kendisi yetersizse gelir.
rem `if errorlevel` bir ONCEKI komuttan kalan degeri okur ve cmd bunu her
rem komutta guncellemez (ornegin `echo` dokunmaz). Cagriyi bloga gomup
rem errorlevel'i orada denetlemek, yukaridaki netstat/findstr'dan kalan 1'i
rem okuyup paneli bosuna durduruyordu. Cagri bu yuzden duz bir satir, denetim
rem hemen ardindan: okunan deger kesinlikle gerekli.py'nin cikis kodu.
if defined ATLA goto :denetim_bitti
%PY% "admin\gerekli.py" %DENETIM%
if errorlevel 1 (
  echo.
  echo Panel baslatilamiyor.
  echo.
  pause
  exit /b 1
)
:denetim_bitti

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
