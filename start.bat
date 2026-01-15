@echo off
REM Script de lancement de l'application O'Rubri complète
REM Utilise CMD au lieu de PowerShell

setlocal enabledelayedexpansion
chcp 65001 >nul 2>&1

echo.
echo ============================================
echo.   O'Rubri - Restaurant Reservation System
echo.   CMD Mode
echo ============================================
echo.

REM Vérifier si pnpm est installé
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERREUR] pnpm n'est pas installé
    echo Installez pnpm avec: npm install -g pnpm
    echo.
    pause
    exit /b 1
)

echo [1/3] Vérification des dépendances...
echo.

REM Installation du frontend
set "root_path=%~dp0"
cd /d "%root_path%"

if exist node_modules (
    echo [OK] Frontend déjà installé
) else (
    echo Installation du frontend...
    call pnpm install
    if !errorlevel! neq 0 (
        echo.
        echo [ERREUR] Installation frontend échouée
        echo.
        pause
        exit /b 1
    )
    echo [OK] Frontend installé
)

echo.

REM Installation du backend
cd /d "%root_path%backend"

if exist node_modules (
    echo [OK] Backend déjà installé
) else (
    echo Installation du backend...
    call pnpm install
    if !errorlevel! neq 0 (
        echo.
        echo [ERREUR] Installation backend échouée
        echo.
        pause
        exit /b 1
    )
    echo [OK] Backend installé
)

echo.
echo [2/3] Vérification des répertoires...
echo.

if exist "%root_path%\src" (
    echo [OK] Dossier src (frontend) trouvé
) else (
    echo [ERREUR] Dossier src introuvable
    pause
    exit /b 1
)

if exist "%root_path%backend\server.js" (
    echo [OK] Fichier server.js trouvé
) else (
    echo [ERREUR] Fichier backend\server.js introuvable
    pause
    exit /b 1
)

echo.
echo [3/3] Lancement des serveurs...
echo.
echo Les deux fenêtres CMD vont s'ouvrir dans 2 secondes...
echo.

timeout /t 2 /nobreak

REM Lancer le frontend dans un nouveau terminal CMD
echo Lancement du Frontend (http://localhost:5173)...
start cmd /k "cd /d "%root_path%" && echo. && echo === FRONTEND === && echo. && pnpm dev"

REM Attendre un peu
timeout /t 3 /nobreak

REM Lancer le backend dans un nouveau terminal CMD
echo Lancement du Backend (http://localhost:3001)...
start cmd /k "cd /d "%root_path%backend" && echo. && echo === BACKEND === && echo. && pnpm dev"

echo.
echo ============================================
echo.   Lanceurs démarrés!
echo.   Frontend: http://localhost:5173
echo.   Backend:  http://localhost:3001/api
echo.   API:      POST /api/reservations
echo ============================================
echo.
echo Appuyez sur Entrée pour fermer cette fenêtre...
pause >nul
