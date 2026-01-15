#!/usr/bin/env pwsh

# Script de lancement de l'application O'Rubri complète

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   O'Rubri - Restaurant Reservation System" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si pnpm est installé
try {
    pnpm --version | Out-Null
} catch {
    Write-Host "ERREUR: pnpm n'est pas installé" -ForegroundColor Red
    Write-Host "Installez pnpm avec: npm install -g pnpm" -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host "[1/2] Installation des dépendances..." -ForegroundColor Yellow
Write-Host ""

# Installation du frontend
Write-Host "Installation du frontend..." -ForegroundColor Cyan
$rootPath = Get-Location
if (Test-Path "$rootPath/node_modules") {
    Write-Host "Frontend déjà installé, passage..." -ForegroundColor Green
} else {
    pnpm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERREUR lors de l'installation du frontend" -ForegroundColor Red
        Read-Host "Appuyez sur Entrée pour quitter"
        exit 1
    }
}

# Installation du backend
Write-Host "Installation du backend..." -ForegroundColor Cyan
Set-Location "$rootPath/backend"
if (Test-Path "./node_modules") {
    Write-Host "Backend déjà installé, passage..." -ForegroundColor Green
} else {
    pnpm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERREUR lors de l'installation du backend" -ForegroundColor Red
        Read-Host "Appuyez sur Entrée pour quitter"
        exit 1
    }
}

Write-Host ""
Write-Host "[2/2] Lancement de l'application..." -ForegroundColor Yellow
Write-Host ""

# Retourner à la racine
Set-Location $rootPath

# Lancer le frontend
Write-Host "Lancement du frontend sur http://localhost:5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit -Command { pnpm dev }"

# Attendre un peu avant de lancer le backend
Start-Sleep -Seconds 3

# Lancer le backend
Write-Host "Lancement du backend sur http://localhost:3001..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit -Command { Set-Location '$rootPath/backend'; pnpm dev }"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Application lancée avec succès!" -ForegroundColor Green
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host "   Backend:  http://localhost:3001" -ForegroundColor Yellow
Write-Host "   API:      http://localhost:3001/api" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
