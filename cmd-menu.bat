@echo off
REM Menu d'accès rapide - Commandes pnpm en CMD

setlocal enabledelayedexpansion
chcp 65001 >nul 2>&1

set "root_path=%~dp0"

:menu
cls
echo.
echo ============================================
echo   O'Rubri - Menu Commandes (CMD)
echo ============================================
echo.
echo Frontend Commands:
echo   1 - pnpm dev        (Lancer en développement)
echo   2 - pnpm build      (Construire pour production)
echo   3 - pnpm preview    (Prévisualiser build)
echo.
echo Backend Commands:
echo   4 - Backend dev     (Lancer backend seul)
echo   5 - Backend start   (Lancer backend)
echo.
echo Commandes combinées:
echo   6 - Frontend + Backend
echo   7 - Installer dépendances
echo.
echo Autres:
echo   8 - Vérifier pnpm
echo   9 - Ouvrir documentation
echo   0 - Quitter
echo.
set /p choice="Choix (0-9): "

if "%choice%"=="1" (
    echo.
    echo Lancement du frontend en mode développement...
    echo.
    cd /d "%root_path%"
    call pnpm dev
) else if "%choice%"=="2" (
    echo.
    echo Construction du frontend pour production...
    echo.
    cd /d "%root_path%"
    call pnpm build
    echo.
    echo Build terminé. Les fichiers sont dans ./dist/
    pause
    goto menu
) else if "%choice%"=="3" (
    echo.
    echo Prévisualisation du build...
    echo.
    cd /d "%root_path%"
    call pnpm preview
) else if "%choice%"=="4" (
    echo.
    echo Lancement du backend en mode développement...
    echo.
    cd /d "%root_path%backend"
    call pnpm dev
) else if "%choice%"=="5" (
    echo.
    echo Démarrage du backend (mode production)...
    echo.
    cd /d "%root_path%backend"
    call pnpm start
) else if "%choice%"=="6" (
    echo.
    echo Lancement du Frontend ET Backend...
    echo Deux fenêtres CMD vont s'ouvrir
    echo.
    timeout /t 1 /nobreak
    
    start cmd /k "cd /d "%root_path%" && title Frontend ^& pnpm dev"
    timeout /t 2 /nobreak
    start cmd /k "cd /d "%root_path%backend" && title Backend ^& pnpm dev"
    
    echo.
    echo Serveurs lancés:
    echo   Frontend: http://localhost:5173
    echo   Backend:  http://localhost:3001/api
    echo.
    timeout /t 3 /nobreak
    goto menu
) else if "%choice%"=="7" (
    echo.
    echo Installation des dépendances...
    echo.
    
    cd /d "%root_path%"
    echo [1/2] Installation frontend...
    call pnpm install
    
    cd /d "%root_path%backend"
    echo [2/2] Installation backend...
    call pnpm install
    
    echo.
    echo Installation terminée!
    pause
    goto menu
) else if "%choice%"=="8" (
    echo.
    call pnpm --version
    echo.
    call pnpm list -g | findstr pnpm
    echo.
    pause
    goto menu
) else if "%choice%"=="9" (
    echo.
    echo Ouverture de la documentation...
    echo.
    
    if exist "%root_path%QUICK_START.md" (
        start "" "%root_path%QUICK_START.md"
    ) else (
        echo Documentation introuvable
    )
    
    pause
    goto menu
) else if "%choice%"=="0" (
    echo.
    echo À bientôt!
    echo.
    exit /b 0
) else (
    echo.
    echo Option invalide
    timeout /t 2 /nobreak
    goto menu
)
