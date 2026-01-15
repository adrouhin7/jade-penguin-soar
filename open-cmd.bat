@echo off
REM Ouvre un terminal CMD dans le dossier du projet

setlocal
set "project_root=%~dp0"

REM Ouvrir CMD dans le répertoire du projet
cmd.exe /k "cd /d "%project_root%" && cls && echo. && echo === O'Rubri Project Terminal === && echo. && echo Dossier: %project_root% && echo. && echo Commandes disponibles: && echo   - pnpm dev        (Frontend development) && echo   - cd backend ^&^& pnpm dev  (Backend development) && echo   - pnpm build      (Production build) && echo   - start.bat       (Lancer Frontend + Backend) && echo   - dev.cmd         (Menu développement) && echo   - cmd-menu.bat    (Menu complet) && echo."
