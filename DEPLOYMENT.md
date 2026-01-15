# 🚀 Guide de Déploiement - O'Rubri Restaurant

## Options de Déploiement

### Option 1: Vercel (Recommandé - Frontend)

#### Étapes:
1. **Créez un compte Vercel** : https://vercel.com
2. **Connectez votre repo GitHub** : Vercel se connecte automatiquement
3. **Configurez le build**:
   ```
   Build Command: pnpm build
   Output Directory: dist
   Root Directory: ./
   ```
4. **Déployez** : Vercel lance automatiquement le build
5. **URL publique** : Votre app est en ligne immédiatement!

#### Avantages:
- ✅ Déploiement gratuit
- ✅ HTTPS automatique
- ✅ CDN global
- ✅ Déploiement continu (git push = déploiement)
- ✅ Analytics gratuit

---

### Option 2: Netlify (Recommandé - Frontend)

#### Étapes:
1. **Créez un compte Netlify** : https://netlify.com
2. **Connect Git ou drag & drop**
3. **Configurez le build**:
   ```
   Build command: pnpm build
   Publish directory: dist
   ```
4. **Déployez** : Netlify lance le build automatiquement

#### Avantages:
- ✅ Déploiement gratuit
- ✅ Preview automatique pour PRs
- ✅ Formulaires backend natifs
- ✅ Redirects et rewrites

---

### Option 3: Heroku (Pour Frontend + Backend)

#### Créer une app Heroku:
```bash
# Installer CLI Heroku
npm install -g heroku

# Login
heroku login

# Créer app
heroku create o-rubri-restaurant

# Ajouter git remote
git remote add heroku https://git.heroku.com/o-rubri-restaurant.git

# Déployer
git push heroku main
```

#### Configuration Procfile:
```
Créez un fichier `Procfile` à la racine:
```
web: npm run build && npm run server
```

#### Avantages:
- ✅ Frontend + Backend ensemble
- ✅ Base de données facile
- ✅ Gratuit (avec limitations)

---

### Option 4: Docker (Production-ready)

#### Créer Dockerfile:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copier package files
COPY package.json pnpm-lock.yaml ./

# Installer dépendances
RUN npm install -g pnpm && pnpm install

# Copier source
COPY . .

# Build
RUN pnpm build

# Expose ports
EXPOSE 5173 3001

# Start
CMD ["pnpm", "dev"]
```

#### Build et run:
```bash
# Build image
docker build -t o-rubri .

# Run container
docker run -p 5173:5173 -p 3001:3001 o-rubri
```

---

### Option 5: DigitalOcean / AWS / Azure

#### Déploiement VPS:
1. **Louer un serveur** (Ubuntu 22.04 recommandé)
2. **Installer Node.js et pnpm**
3. **Cloner le repo**
4. **Installer dépendances** : `pnpm install`
5. **Build** : `pnpm build`
6. **Lancer backend** : `pnpm run server`
7. **Servir frontend** : avec nginx

#### Fichier nginx:
```nginx
server {
    listen 80;
    server_name o-rubri.fr;

    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /api {
        proxy_pass http://localhost:3001;
    }
}
```

---

## 📝 Checklist Avant Déploiement

### Frontend
- [ ] Les variables d'environnement sont correctes
- [ ] L'URL de l'API backend est configurée
- [ ] Build compile sans erreurs (`pnpm build`)
- [ ] Tous les fichiers statiques sont inclus
- [ ] Meta tags pour SEO sont en place
- [ ] Images sont optimisées

### Backend
- [ ] CORS est configuré pour domaine de prod
- [ ] Base de données fonctionne
- [ ] Variables d'environnement sont définies
- [ ] Logs sont configurés
- [ ] Gestion d'erreurs est en place

### Général
- [ ] Domaine est enregistré et pointé
- [ ] SSL/HTTPS est activé
- [ ] Sauvegardes automatiques sont configurées
- [ ] Monitoring est en place
- [ ] Plan de récupération des données

---

## 🔧 Variables d'Environnement

### Frontend (.env.production)
```env
VITE_API_URL=https://api.o-rubri.fr
VITE_SITE_NAME=O'Rubri Restaurant
VITE_SITE_URL=https://o-rubri.fr
```

### Backend (.env)
```env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://o-rubri.fr
DATABASE_URL=votre_db_url
EMAIL_SERVICE=sendgrid_token
```

---

## 📦 Architecture Recommandée

### Frontend (Vercel/Netlify)
```
o-rubri.fr
└── Next.js/Vite app
    ├── Pages (Home, Reservation, Menu, Events)
    ├── Images optimisées
    └── CSS minifié
```

### Backend (Heroku/DigitalOcean)
```
api.o-rubri.fr ou o-rubri.fr/api
└── Express.js API
    ├── Routes réservations
    ├── Base données
    └── Authentification
```

### Base de données
- PostgreSQL (recommandé)
- MongoDB (alternatif)
- JSON file (développement)

---

## 🔐 Sécurité en Production

- [ ] HTTPS/SSL activé
- [ ] CORS configuré correctement
- [ ] Rate limiting activé
- [ ] Input validation en place
- [ ] SQL injection prevention
- [ ] CSRF tokens (si applicable)
- [ ] Authentification admin sécurisée
- [ ] Backups réguliers
- [ ] Monitoring actif

---

## 📊 Monitoring & Analytics

### Google Analytics
```html
<!-- Ajouter dans index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Sentry (Error tracking)
```bash
pnpm add @sentry/react
```

---

## 🚀 Commandes Déploiement

### Frontend
```bash
# Build
pnpm build

# Preview build localement
pnpm preview

# Deploy to Vercel
vercel deploy
```

### Backend
```bash
# Build TypeScript
tsc

# Start production
NODE_ENV=production node dist/server/server.js
```

---

## 📈 Performance Tips

1. **Optimiser les images** : WebP, lazy loading
2. **Minifier CSS/JS** : Vite le fait automatiquement
3. **Cacher statiques** : CDN, headers cache
4. **Compresser** : gzip sur serveur
5. **Database indexes** : Pour requêtes rapides
6. **Pagination** : Limiter résultats API

---

## 🛠️ Domaine & Email

### Configuration DNS
```
Type    Name           Value
A       o-rubri.fr     IP_serveur
CNAME   www            o-rubri.fr
MX      o-rubri.fr     mail.o-rubri.fr
```

### Email Admin
```
contact@o-rubri.fr
admin@o-rubri.fr
reservations@o-rubri.fr
```

---

## 💾 Backups

### Automatiques
```bash
# Backup base données quotidien
0 2 * * * pg_dump o_rubri > /backups/$(date +\%Y\%m\%d).sql

# Backup fichiers réservations
0 3 * * * cp -r /app/data /backups/data_$(date +\%Y\%m\%d)
```

### Manuel
```bash
# Base de données
pg_dump o_rubri > backup.sql

# Fichiers
tar -czf backup.tar.gz /app/data
```

---

## 📞 Support Post-Déploiement

### Monitoring
- Uptime robot
- Error tracking (Sentry)
- Performance monitoring
- Database monitoring

### Maintenance
- Updates mensuels
- Patch security
- Backup tests réguliers
- Cache clearing

---

## ✅ Checklist Déploiement Complet

- [ ] Code commité et pusher
- [ ] Build local réussit
- [ ] Pas d'erreurs de console
- [ ] API répond correctement
- [ ] Base de données est accessible
- [ ] SSL/HTTPS activé
- [ ] Domaine pointe vers serveur
- [ ] Email de contact fonctionne
- [ ] Formulaires réservation marchent
- [ ] Monitoring est actif
- [ ] Backups sont en place
- [ ] Documentation mise à jour

---

## 🎉 Bravo!

Votre application O'Rubri est en production! 🚀

**À faire maintenant:**
1. Tester depuis mobile
2. Tester depuis navigateurs différents
3. Tester formulaire de réservation
4. Vérifier emails de confirmation
5. Mettre en place monitoring

---

**Support**: Pour aide de déploiement, consultez la doc des services utilisés.
