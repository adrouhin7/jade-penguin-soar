# 🖥️ O'Rubri - Guide CMD (Command Prompt)

## Configuration: Utiliser CMD au lieu de PowerShell

À partir de maintenant, toutes les commandes pnpm utilisent **CMD** (Command Prompt) au lieu de PowerShell.

---

## 🚀 Lancement Rapide

### Option 1: Script automatique (Recommandé)
```bash
start.bat
```
Cela lance:
1. Une fenêtre CMD pour le Frontend (port 5173)
2. Une fenêtre CMD pour le Backend (port 3001)

### Option 2: Script de développement
```bash
dev.cmd
```

Ou avec options:
```bash
dev.cmd frontend    # Seulement le frontend
dev.cmd backend     # Seulement le backend
dev.cmd all         # Frontend + Backend (par défaut)
```

### Option 3: Menu interactif
```bash
cmd-menu.bat
```

Menu avec 10 options (dev, build, install, etc.)

### Option 4: Manuel en CMD

Ouvrir CMD depuis VS Code:
- Ctrl + ` (backtick)
- Ou Terminal → New Terminal

```bash
# Terminal 1 - Frontend
cd c:\Users\adrou\dyad-apps\jade-penguin-soar
pnpm dev

# Terminal 2 - Backend (nouveau terminal)
cd c:\Users\adrou\dyad-apps\jade-penguin-soar\backend
pnpm dev
```

---

## 📋 Commandes Principales

### Frontend Commands
```bash
# Mode développement (rechargement auto)
pnpm dev

# Construire pour production
pnpm build

# Prévisualiser le build
pnpm preview

# Lancer ESLint
pnpm lint
```

### Backend Commands
```bash
# Mode développement (avec nodemon)
cd backend
pnpm dev

# Mode production
cd backend
pnpm start

# Installer dépendances
cd backend
pnpm install
```

### Installation
```bash
# Tout installer en une fois
# Terminal 1:
pnpm install

# Terminal 2:
cd backend
pnpm install
```

---

## 🖥️ Ouvrir CMD dans VS Code

### Méthode 1: Raccourci clavier
- **Ctrl + `** (backtick) pour ouvrir le terminal intégré
- Changer le shell en CMD si nécessaire

### Méthode 2: Via le menu
- Terminal → New Terminal
- Cliquer sur "Select Default Profile"
- Choisir "Command Prompt"

### Méthode 3: Directement dans le dossier
- Shift + Click droit sur le dossier
- "Ouvrir la fenêtre PowerShell ici"
- Changer en CMD

---

## 🎯 Flux Recommandé

### 1. Première utilisation
```bash
# Ouvrir start.bat
start.bat

# Cela lance automatiquement:
# - Frontend en CMD (http://localhost:5173)
# - Backend en CMD (http://localhost:3001)
```

### 2. Développement quotidien
```bash
# Ou utiliser le menu interactif
cmd-menu.bat

# Puis choisir l'option pour Frontend + Backend
```

### 3. Build pour production
```bash
cmd-menu.bat
# Choisir option 2: pnpm build
```

---

## 📊 Fenêtres CMD Expliquées

### Frontend (Port 5173)
```
C:\Users\adrou\dyad-apps\jade-penguin-soar>pnpm dev

  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

**Signification:** Le frontend est prêt. Ouvrir http://localhost:5173

### Backend (Port 3001)
```
🍷 Backend O'Rubri en écoute sur http://localhost:3001
📁 Fichier de réservations: C:\...\backend\reservations.json
```

**Signification:** Le backend écoute sur http://localhost:3001/api

---

## 🔍 Vérifications

### Vérifier que pnpm est installé
```bash
pnpm --version
```
Devrait afficher: `8.x.x` ou supérieur

### Vérifier les ports
```bash
# Port 5173 (Frontend)
netstat -ano | findstr 5173

# Port 3001 (Backend)
netstat -ano | findstr 3001
```

---

## 🚨 Troubleshooting

### Erreur: "pnpm n'est pas reconnu"
```bash
# Installer pnpm globalement
npm install -g pnpm

# Vérifier
pnpm --version
```

### Port déjà utilisé
```bash
# Trouver le processus qui utilise le port
netstat -ano | findstr :5173

# Tuer le processus
taskkill /PID [PID] /F
```

### CMD ferme immédiatement
- Vérifier que le chemin du dossier est correct
- Vérifier que `pnpm` est installé
- Vérifier qu'on est dans le bon répertoire

### Erreur lors du lancement du backend
```bash
cd backend
pnpm install
pnpm dev
```

---

## 💡 Conseils

### 1. Garder les fenêtres organisées
- Frontend à gauche
- Backend à droite
- Ainsi vous voyez les deux logs simultanément

### 2. Copier des erreurs
- Clic droit → Mark
- Sélectionner le texte d'erreur
- Clic droit → Copy
- Coller dans un terminal PowerShell pour davantage de détails

### 3. Personnaliser le titre
Pour voir facilement quel serveur est lequel:
```bash
# Dans la fenêtre CMD, modifier le titre
title Frontend O'Rubri

# Ou dans un script
start cmd /k "cd path && title Frontend && pnpm dev"
```

### 4. Sauvegarde des logs
```bash
# Rediriger la sortie vers un fichier
pnpm dev > frontend.log 2>&1

# Lire le fichier
type frontend.log
```

---

## 🔄 Cycle de développement

### Développement
```bash
1. Ouvrir start.bat
2. Deux fenêtres CMD s'ouvrent (Frontend + Backend)
3. Modifier le code
4. Les changements se rechargent automatiquement (Vite/Nodemon)
5. Tester dans le navigateur
```

### Build
```bash
cmd-menu.bat → Option 2 → pnpm build
# Crée le dossier ./dist/ avec les fichiers optimisés
```

### Production
```bash
# Frontend: Déployer le contenu du dossier ./dist/
# Backend: Utiliser `pnpm start` au lieu de `pnpm dev`
```

---

## 📚 Fichiers Utiles

| Fichier | Description |
|---------|-------------|
| `start.bat` | Lance automatiquement Frontend + Backend |
| `dev.cmd` | Scripts de développement avec options |
| `cmd-menu.bat` | Menu interactif pour les commandes |
| `package.json` | Scripts frontend (dev, build, preview) |
| `backend/package.json` | Scripts backend (dev, start) |

---

## 🎯 Procédure Standard

### Pour démarrer
```bash
# Ouvrir une invite de commande CMD dans le dossier du projet
cd c:\Users\adrou\dyad-apps\jade-penguin-soar

# Lancer le script
start.bat

# Ou manuellement:
# Terminal 1:
pnpm dev

# Terminal 2:
cd backend && pnpm dev
```

### Pour développer
- Modifier les fichiers
- Les changements se mettent à jour automatiquement
- Tester dans le navigateur

### Pour arrêter
- Appuyer sur Ctrl + C dans les fenêtres CMD

### Pour relancer
- Fermer les fenêtres CMD
- Relancer `start.bat`

---

## 🎉 C'est Prêt!

Vous avez maintenant un environnement complet avec:
- ✅ CMD au lieu de PowerShell
- ✅ Scripts de démarrage automatique
- ✅ Menu d'accès rapide
- ✅ Documentation complète

**Commencez par:**
```bash
start.bat
```

---

**O'Rubri © 2024**
**Mode CMD Enabled ✅**
