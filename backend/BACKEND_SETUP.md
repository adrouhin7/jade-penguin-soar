# Backend O'Rubri - Documentation Complète

## 📋 Vue d'ensemble

Backend Node.js/Express pour le système de réservation du restaurant O'Rubri.

**Fonctionnalités :**
- ✅ API REST complète (GET, POST, PUT, DELETE)
- ✅ Support MongoDB Atlas + fallback JSON
- ✅ Envoi d'emails automatiques (Nodemailer Gmail)
- ✅ CORS configuré pour production
- ✅ Gestion d'erreurs robuste
- ✅ Prêt pour déploiement Render

---

## 🚀 Installation locale

### 1. Cloner et installer
```bash
cd backend
npm install
```

### 2. Configurer le fichier .env
```bash
# Copier l'exemple
cp .env.example .env

# Éditer .env avec vos valeurs:
```

**Fichier .env local (développement):**
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# MongoDB (optionnel)
MONGO_URI=

# Email Gmail
EMAIL_USER=
EMAIL_PASS=
```

### 3. Démarrer le serveur
```bash
# Mode développement (avec hot reload)
npm run dev

# Mode production
npm start
```

**Output attendu :**
```
🍷 Backend O'Rubri lancé sur le port 3001
📍 API: http://localhost:3001/api
🔗 Réservations: http://localhost:3001/api/reservations
```

---

## 🔧 Configuration Gmail + Nodemailer

### Étape 1 : Activer 2FA sur Gmail
1. Accéder à [myaccount.google.com](https://myaccount.google.com)
2. Aller à "Sécurité" → "Vérification en deux étapes"
3. Activer 2FA

### Étape 2 : Créer une App Password
1. Aller à [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Sélectionner "Mail" et "Windows Computer"
3. Générer une App Password (16 caractères)
4. Copier et coller dans `.env` → `EMAIL_PASS`

### Étape 3 : Configurer le .env
```env
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-app-password-16-caracteres
```

---

## 🗄️ MongoDB Atlas (Production)

### Étape 1 : Créer un cluster
1. Accéder à [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Créer un compte gratuit
3. Créer un cluster M0 (gratuit)

### Étape 2 : Obtenir la connexion
1. Cliquer sur "Connect"
2. Choisir "Connect your application"
3. Copier l'URI MongoDB : `mongodb+srv://...`
4. Remplacer `<username>` et `<password>` par vos identifiants

### Étape 3 : Ajouter à .env
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/orudentaire
```

---

## 📡 API Endpoints

### Health Check
```bash
GET http://localhost:3001/api
# Réponse: { "message": "API O'Rubri OK" }
```

### GET - Toutes les réservations
```bash
GET http://localhost:3001/api/reservations

# Réponse:
{
  "success": true,
  "source": "MongoDB" ou "JSON",
  "count": 5,
  "data": [...]
}
```

### GET - Une réservation
```bash
GET http://localhost:3001/api/reservations/:id

# Réponse:
{
  "success": true,
  "data": { ... }
}
```

### POST - Créer une réservation
```bash
POST http://localhost:3001/api/reservations
Content-Type: application/json

{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "+33612345678",
  "date": "2026-02-14",
  "time": "19:30",
  "numberOfPeople": 4,
  "message": "Anniversaire!"
}

# Réponse (201):
{
  "success": true,
  "message": "Réservation enregistrée avec succès",
  "reservationId": "507f1f77bcf86cd799439011",
  "data": { ... }
}
```

### DELETE - Supprimer une réservation
```bash
DELETE http://localhost:3001/api/reservations/:id

# Réponse:
{
  "success": true,
  "message": "Réservation supprimée"
}
```

---

## 🧪 Tests locaux

### Avec cURL
```bash
# Créer une réservation
curl -X POST http://localhost:3001/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "phone": "+33600000000",
    "date": "2026-02-14",
    "time": "19:30",
    "numberOfPeople": 2
  }'

# Voir toutes les réservations
curl http://localhost:3001/api/reservations
```

### Avec Postman
1. Importer la collection
2. Tester chaque endpoint

---

## 📁 Structure du projet

```
backend/
├── server.js              # Serveur Express principal
├── db.js                  # Connexion MongoDB
├── email.js               # Configuration Nodemailer
├── models/
│   └── Reservation.js     # Schéma Mongoose
├── package.json           # Dépendances
├── .env                   # Variables d'environnement (local)
├── .env.example           # Template .env
├── reservations.json      # Fallback JSON
└── README.md              # Cette documentation
```

---

## 🔐 Variables d'environnement

| Variable | Type | Exemple | Requis |
|----------|------|---------|--------|
| `PORT` | number | 3001 | Non (défaut: 3001) |
| `NODE_ENV` | string | production | Non (défaut: development) |
| `MONGO_URI` | string | mongodb+srv://... | Non (fallback JSON) |
| `EMAIL_USER` | string | email@gmail.com | Non |
| `EMAIL_PASS` | string | app-password | Non |
| `FRONTEND_URL` | string | https://... | Non |

---

## 🚢 Déploiement sur Render

### Étape 1 : Créer un Web Service
1. Aller à [render.com](https://render.com)
2. Cliquer "New +" → "Web Service"
3. Connecter le repo GitHub
4. Remplir les infos:
   - **Name:** orudentaire-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### Étape 2 : Ajouter les variables d'environnement
Dans "Environment Variables", ajouter:

```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://o-rubri-frontend.onrender.com
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/orudentaire
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-app-password-16-caracteres
```

### Étape 3 : Déployer
1. Cliquer "Create Web Service"
2. Attendre 2-3 minutes
3. Votre API sera disponible à : `https://orudentaire-backend.onrender.com`

---

## 🔗 Liaison Frontend-Backend

### URL API (Frontend)
```typescript
// Mode développement
const API_URL = 'http://localhost:3001';

// Mode production
const API_URL = 'https://orudentaire-backend.onrender.com';
```

### CORS
Le backend accepte automatiquement:
- `http://localhost:5173` (dev)
- `https://o-rubri-frontend.onrender.com` (prod)

---

## 🐛 Dépannage

### Erreur : "MONGO_URI not provided"
✅ Normal en développement. Le backend utilise JSON en fallback.
Pour MongoDB, ajouter `MONGO_URI` au `.env`.

### Erreur : "Email not sent"
Vérifier:
- [ ] Gmail 2FA activé
- [ ] App Password créée (16 caractères)
- [ ] EMAIL_USER et EMAIL_PASS corrects dans `.env`
- [ ] Connexion internet

### Erreur : CORS bloquée
Vérifier:
- [ ] `FRONTEND_URL` correct dans `.env`
- [ ] URL du frontend dans la liste CORS du server.js

---

## 📚 Commandes utiles

```bash
# Développement
npm run dev

# Production
npm start

# Installer dépendances
npm install

# Ajouter une dépendance
npm install nom-package

# Voir les logs
npm run dev 2>&1 | tail -f
```

---

## 🎯 Checklist déploiement

- [ ] MongoDB Atlas cluster créé
- [ ] Gmail App Password généré
- [ ] `.env` rempli localement
- [ ] Tests locaux OK
- [ ] Git push vers main
- [ ] Render Web Service créé
- [ ] Variables d'environnement sur Render
- [ ] URL Frontend mise à jour
- [ ] Test POST depuis frontend OK
- [ ] Email reçu ✅

---

## 📞 Support

Pour des questions:
1. Vérifier la documentation ci-dessus
2. Voir les logs: `npm run dev`
3. Consulter la console Render

---

**Dernière mise à jour:** Janvier 2026  
**Backend Version:** 1.0.0
