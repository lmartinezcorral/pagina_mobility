@echo off
REM Servidor desarrollo Somos Mobility - http://localhost:8000
cd /d "%~dp0html"
echo Servidor PHP: http://localhost:8000
echo Document root: %CD%
echo Detener: Ctrl+C
php -S localhost:8000 router.php
pause
