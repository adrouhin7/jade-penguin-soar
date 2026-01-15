# ✅ O'Rubri - Configuration CMD Complète

## 🎯 Résumé des Modifications

Toutes les commandes pnpm utilisent maintenant **CMD** (Command Prompt) au lieu de PowerShell.

---

## 🚀 Comment Démarrer (4 Options)

### ✅ Option 1: Automatique (Recommandée)
```bash
start.bat
```
Lance automatiquement:
- Frontend en CMD (port 5173)
- Backend en CMD (port 3001)

### ✅ Option 2: Menu Développement
```bash
dev.cmd
```

Options:
```bash
dev.cmd              # Frontend + Backend
dev.cmd frontend     # Frontend seulement
dev.cmd backend      # Backend seulement
```

### ✅ Option 3: Menu Interactif
```bash
cmd-menu.bat
```

Menu avec 10 options (dev, build, install, etc.)

### ✅ Option 4: Terminal CMD Dédié
```bash
open-cmd.bat
```

Ouvre un terminal CMD dans le dossier du projet avec instructions

---

## 📊 Scripts Créés

| Script | Description | Utilisation |
|--------|-------------|------------|
| `start.bat` | Lance Frontend + Backend | `start.bat` |
| `dev.cmd` | Développement avec options | `dev.cmd [frontend\|backend\|all]` |
| `cmd-menu.bat` | Menu interactif complet | `cmd-menu.bat` |
| `open-cmd.bat` | Ouvre terminal CMD | `open-cmd.bat` |

---

## 🔧 Commandes Manuelles

### Frontend
```bash
pnpm dev          # Développement
pnpm build        # Production build
pnpm preview      # Prévisualisation
```

### Backend
```bash
cd backend
pnpm dev          # Développement (nodemon)
pnpm start        # Production
pnpm install      # Installer dépendances
```

---

## 🖥️ Fenêtres CMD

### Frontend (Port 5173)
```
C:\...\jade-penguin-soar>pnpm dev
  ➜  Local:   http://localhost:5173/
```

### Backend (Port 3001)
```
🍷 Backend O'Rubri en écoute sur http://localhost:3001
📁 Fichier de réservations: ...
```

---

## 📚 Documentation

- **CMD Guide:** [CMD_GUIDE.md](CMD_GUIDE.md)
- **Quick Start:** [QUICK_START.md](QUICK_START.md)
- **Installation:** [INSTALL.md](INSTALL.md)

---

## ✅ Avantages CMD

✅ Natif à Windows
✅ Pas de dépendance supplémentaire
✅ Scripts plus simples
✅ Compatible avec tous les outils
✅ Performance optimisée

---

## 🎯 Workflow Recommandé

### Jour 1 - Configuration
```bash
start.bat
# Tout démarre automatiquement
```

### Développement Quotidien
```bash
# Option A: Menu
cmd-menu.bat

# Option B: Automatique
start.bat

# Option C: Terminal dédié
open-cmd.bat
```

### Production Build
```bash
cmd-menu.bat
# Choisir: 2 - pnpm build
```

---

## 🎉 Prêt à Commencer!

Lancez simplement:
```bash
start.bat
```

Puis ouvrez: **http://localhost:5173**

---

**O'Rubri © 2024**
**CMD Mode Enabled ✅**
