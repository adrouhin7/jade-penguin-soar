@echo off
REM Script de développement rapide - Utilise CMD

setlocal enabledelayedexpansion
chcp 65001 >nul 2>&1

REM Arguments: dev.cmd [frontend|backend|all]

set "cmd=%1"
set "root_path=%~dp0"

if "%cmd%"=="" set "cmd=all"

echo.
echo ============================================
echo   O'Rubri - Mode Développement (CMD)
echo ============================================
echo.

if /i "%cmd%"=="frontend" (
    echo Lancement du Frontend (Ctrl+C pour arrêter)...
    echo.
    cd /d "%root_path%"
    call pnpm dev
) else if /i "%cmd%"=="backend" (
    echo Lancement du Backend (Ctrl+C pour arrêter)...
    echo.
    cd /d "%root_path%backend"
    call pnpm dev
) else if /i "%cmd%"=="all" (
    echo Lancement de Frontend ET Backend...
    echo Deux fenêtres CMD vont s'ouvrir
    echo.
    timeout /t 1 /nobreak
    
    start cmd /k "cd /d "%root_path%" && title Frontend & pnpm dev"
    
    timeout /t 2 /nobreak
    
    start cmd /k "cd /d "%root_path%backend" && title Backend & pnpm dev"
    
    echo.
    echo ============================================
    echo   Frontend: http://localhost:5173
    echo   Backend:  http://localhost:3001
    echo ============================================
    echo.
) else (
    echo Usage: dev.cmd [frontend^|backend^|all]
    echo.
    echo Exemples:
    echo   dev.cmd frontend    - Lancer seulement le frontend
    echo   dev.cmd backend     - Lancer seulement le backend
    echo   dev.cmd all         - Lancer frontend ET backend ^(par défaut^)
    echo   dev.cmd             - Lancer frontend ET backend
    echo.
    pause
    exit /b 1
)
