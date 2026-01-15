# 🎯 COMMANDES ESSENTIELLES - O'Rubri Restaurant

## 🚀 DÉMARRAGE

```bash
# Installer dépendances
pnpm install

# Lancer frontend (Terminal 1)
pnpm dev

# Lancer backend (Terminal 2)
pnpm run server
```

## 📱 ACCÈS

```
Frontend:  http://localhost:5173
Backend:   http://localhost:3001/api
Admin:     http://localhost:5173/ (index page)
```

## 🔨 BUILD

```bash
# Build pour production
pnpm build

# Preview du build
pnpm preview
```

## 🧹 MAINTENANCE

```bash
# Vérifier le code
pnpm lint

# Mettre à jour une dépendance
pnpm update [package-name]@latest

# Mettre à jour toutes les dépendances
pnpm update -i --latest
```

## 🚀 DÉPLOIEMENT

```bash
# Build
pnpm build

# Deploy sur Vercel (si configuré)
vercel deploy

# Deploy sur Netlify (si configuré)
netlify deploy
```

## 📊 INFORMATIONS UTILES

### Fichiers à éditer pour personnaliser:
- `src/data/restaurant-content.json` - Infos restaurant
- `src/globals.css` - Couleurs et thème
- `src/pages/*.tsx` - Contenu des pages

### Documentation:
- `README.md` - Overview
- `INDEX.md` - Navigation doc
- `GUIDE_UTILISATION.md` - Guide d'usage
- `DEPLOYMENT.md` - Déploiement

### API de base:
```
POST   http://localhost:3001/api/reservations
GET    http://localhost:3001/api/reservations
GET    http://localhost:3001/api/reservations/:id
PUT    http://localhost:3001/api/reservations/:id
DELETE http://localhost:3001/api/reservations/:id
```

---

**Pour plus d'infos: Lisez [INDEX.md](INDEX.md)**
