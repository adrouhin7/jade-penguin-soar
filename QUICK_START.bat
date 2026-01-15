@echo off
REM O'Rubri Restaurant - Quick Start Script for Windows

echo.
echo 🍷 O'Rubri Restaurant System - Quick Start
echo ===========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installation des dépendances...
    call pnpm install
) else (
    echo ✅ Dépendances déjà installées
)

echo.
echo 🚀 Commandes disponibles:
echo.
echo    Frontend (Dev):
echo    ^> pnpm dev
echo    Launch dev server on http://localhost:5173
echo.
echo    Backend (Dev):
echo    ^> pnpm run server
echo    Launch API server on http://localhost:3001
echo.
echo    Build Production:
echo    ^> pnpm build
echo    Compile for production
echo.
echo    Lint:
echo    ^> pnpm lint
echo    Check code for errors
echo.
echo 📚 Documentation:
echo.
echo    - README.md                  ^-^> Project overview
echo    - GUIDE_UTILISATION.md       ^-^> User guide
echo    - MODIFICATIONS.md           ^-^> Change history
echo    - RESERVATIONS_SCHEMA.md     ^-^> Data structure
echo.
echo 🎨 Customization:
echo.
echo    - src/data/restaurant-content.json  ^-^> Restaurant info
echo    - src/globals.css                   ^-^> Theme colors
echo    - src/components/Navigation.tsx     ^-^> Navigation bar
echo.
echo 🌐 Main URLs:
echo.
echo    Home:           http://localhost:5173/
echo    Reservation:    http://localhost:5173/reservation
echo    Menu:           http://localhost:5173/menu
echo    Events:         http://localhost:5173/events
echo    Admin:          http://localhost:5173/
echo.
echo ✨ Ready to start!
echo.
pause
