# 🚀 GUIDE DÉPLOIEMENT COMPLET - Backend O'Rubri sur Render

## 📋 Table des matières
1. [Préparation locale](#préparation-locale)
2. [Configuration MongoDB Atlas](#configuration-mongodb-atlas)
3. [Configuration Gmail](#configuration-gmail)
4. [Déploiement sur Render](#déploiement-sur-render)
5. [Vérification post-déploiement](#vérification-post-déploiement)
6. [Dépannage](#dépannage)

---

## ✅ Préparation locale

### Étape 1 : Vérifier le backend localement
```bash
cd backend
npm run dev
```

**Output attendu :**
```
🍷 Backend O'Rubri lancé sur le port 3001
📍 API: http://localhost:3001/api
🔗 Réservations: http://localhost:3001/api/reservations
```

### Étape 2 : Tester les endpoints
```bash
# Test health check
curl http://localhost:3001/api

# Test POST
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

# Test GET
curl http://localhost:3001/api/reservations
```

✅ Si tous les tests passent, continuer.

---

## 🗄️ Configuration MongoDB Atlas

### Étape 1 : Créer un compte MongoDB Atlas
1. Aller à [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Cliquer "Start Free"
3. Créer un compte avec email/password

### Étape 2 : Créer un cluster
1. Cliquer "Create" ou "Build a Database"
2. Choisir **M0 (Shared)** ← Gratuit
3. Choisir fournisseur cloud et région (AWS/GCP, région la plus proche)
4. Cliquer "Create Cluster" et attendre 2-3 minutes

### Étape 3 : Créer un utilisateur de base de données
1. Aller à "Security" → "Database Access"
2. Cliquer "Add New Database User"
3. Remplir:
   - **Username:** orudentaire (ou autre)
   - **Password:** Générer mot de passe sécurisé
   - **Database User Privileges:** Atlas Admin
4. Cliquer "Add User"

**Note l'username et password !** ⚠️

### Étape 4 : Permettre l'accès depuis n'importe quel IP
1. Aller à "Security" → "Network Access"
2. Cliquer "Add IP Address"
3. Entrer `0.0.0.0/0` (accès depuis n'importe quel IP)
4. Cliquer "Confirm"

### Étape 5 : Obtenir la chaîne de connexion
1. Retourner à "Database" → Cliquer "Connect"
2. Choisir "Connect your application"
3. Sélectionner "Node.js" version "4.1 or later"
4. Copier la chaîne : `mongodb+srv://`...

**Exemple :**
```
mongodb+srv://orudentaire:mDf9xQq2k!3vP@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

### Étape 6 : Remplacer les données sensibles
Dans la chaîne, remplacer:
- `<username>` par: `orudentaire`
- `<password>` par: votre mot de passe MongoDB

**Chaîne finalisée :**
```
mongodb+srv://orudentaire:mDf9xQq2k!3vP@cluster0.abc123.mongodb.net/orudentaire?retryWrites=true&w=majority
```

### Étape 7 : Ajouter au fichier .env local
```env
MONGO_URI=mongodb+srv://orudentaire:mDf9xQq2k!3vP@cluster0.abc123.mongodb.net/orudentaire?retryWrites=true&w=majority
```

### Étape 8 : Tester la connexion
```bash
npm run dev
```

**Vérifier dans les logs :**
```
✅ MongoDB connecté avec succès
```

✅ Si OK, MongoDB est configuré !

---

## 📧 Configuration Gmail

### Étape 1 : Accéder au compte Gmail
1. Aller à [myaccount.google.com](https://myaccount.google.com)
2. Cliquer "Security" (colonne gauche)

### Étape 2 : Activer 2FA
1. Chercher "Two-Step Verification"
2. Cliquer "Get started"
3. Suivre les instructions (téléphone requis)
4. Confirmer quand terminé

### Étape 3 : Générer une App Password
1. Retourner à [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Sélectionner:
   - **Select the app:** Mail
   - **Select the device:** Windows Computer
3. Cliquer "Generate"
4. Copier le mot de passe 16 caractères généré

**Exemple :**
```
pkfv bzlj mwxk qpqr
```

### Étape 4 : Ajouter au .env
```env
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=pkfvbzljmwxkqpqr  # Sans espaces
```

### Étape 5 : Tester l'email localement
```bash
# Créer une réservation avec npm run dev
curl -X POST http://localhost:3001/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "phone": "+33612345678",
    "date": "2026-02-14",
    "time": "19:30",
    "numberOfPeople": 4
  }'
```

**Vérifier dans les logs :**
```
✅ Email envoyé: <message-id>
```

✅ Si OK, Gmail est configuré !

---

## 🚢 Déploiement sur Render

### Étape 1 : Préparer le code
```bash
cd /c/Users/adrou/dyad-apps/jade-penguin-soar
git add .
git commit -m "Add MongoDB support and Nodemailer integration"
git push
```

### Étape 2 : Créer un Web Service sur Render
1. Aller à [render.com](https://render.com)
2. Cliquer "Dashboard" (en haut à droite)
3. Cliquer "New +" → "Web Service"

### Étape 3 : Connecter le dépôt GitHub
1. Cliquer "GitHub" sous "Build and deploy from a Git repository"
2. Autoriser Render à accéder à GitHub
3. Chercher et sélectionner **`jade-penguin-soar`**
4. Cliquer "Connect"

### Étape 4 : Configurer le service
Remplir les champs:

| Champ | Valeur |
|-------|--------|
| **Name** | `orudentaire-backend` |
| **Environment** | `Node` |
| **Region** | Proche de toi (Europe: Frankfurt) |
| **Branch** | `main` |
| **Build Command** | `cd backend && npm install --legacy-peer-deps` |
| **Start Command** | `cd backend && npm start` |

### Étape 5 : Ajouter les variables d'environnement
1. Scroller vers le bas
2. Cliquer "Add Environment Variable"
3. Ajouter **chaque variable** une par une:

```
KEY: PORT
VALUE: 3001

KEY: NODE_ENV
VALUE: production

KEY: FRONTEND_URL
VALUE: https://o-rubri-frontend.onrender.com

KEY: MONGO_URI
VALUE: mongodb+srv://orudentaire:mDf9xQq2k!3vP@cluster0.abc123.mongodb.net/orudentaire?retryWrites=true&w=majority

KEY: EMAIL_USER
VALUE: votre-email@gmail.com

KEY: EMAIL_PASS
VALUE: pkfvbzljmwxkqpqr
```

⚠️ **IMPORTANT :** Utiliser les **vraies valeurs** de:
- MONGO_URI (depuis MongoDB Atlas)
- EMAIL_USER (votre adresse Gmail)
- EMAIL_PASS (16 caractères générés par Google)

### Étape 6 : Créer le service
1. Scroller vers le bas
2. Cliquer "Create Web Service"
3. **Attendre 3-5 minutes** pour le déploiement

**Vérifier le statut:**
- 🟡 "Building..." → En cours
- 🟢 "Live" → Succès ✅

---

## ✅ Vérification post-déploiement

### Étape 1 : Obtenir l'URL de ton backend
Sur la page Render du service:
```
https://orudentaire-backend.onrender.com
```

(Remplacer par ton URL réelle si différente)

### Étape 2 : Tester les endpoints
```bash
# Test health check
curl https://orudentaire-backend.onrender.com/api
# Réponse attendue: { "message": "API O'Rubri OK" }

# Test GET réservations
curl https://orudentaire-backend.onrender.com/api/reservations
# Réponse attendue: {"success":true,"data":[...]}

# Test POST
curl -X POST https://orudentaire-backend.onrender.com/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Production",
    "email": "test@example.com",
    "phone": "+33600000000",
    "date": "2026-02-14",
    "time": "19:30",
    "numberOfPeople": 2
  }'
# Réponse attendue: {"success":true,"message":"Réservation enregistrée..."}
```

### Étape 3 : Vérifier MongoDB Atlas
1. Aller à [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Aller à "Collections"
3. Vérifier que la collection `reservations` existe
4. Voir les nouvelles réservations ajoutées

### Étape 4 : Vérifier Gmail
1. Ouvrir la boîte mail Gmail
2. Chercher les emails reçus avec le sujet "🍷 Nouvelle réservation"
3. Vérifier que les données sont correctes

✅ Si tous les tests réussissent, le backend est **100% déployé !**

---

## 🔗 Mettre à jour le frontend

Dans `src/services/api.ts` du frontend:

```typescript
const getApiBaseUrl = (): string => {
  if (window.location.hostname.includes('onrender.com')) {
    return 'https://orudentaire-backend.onrender.com';
  }
  return 'http://localhost:3001';
};
```

Le frontend détecte automatiquement l'environnement ! ✅

---

## 🐛 Dépannage

### ❌ "Service failed to start"
**Solution:**
```bash
# Vérifier les logs sur Render
# Cliquer "Logs" dans le dashboard

# Problèmes courants:
1. MONGO_URI vide ou incorrecte → Vérifier MongoDB Atlas
2. EMAIL_PASS incorrect → Vérifier App Password Google
3. Build command mal formaté → Vérifier cd backend && npm install
```

### ❌ "MongoDB connection timeout"
**Solution:**
```
1. Aller à MongoDB Atlas → Security → Network Access
2. Vérifier que 0.0.0.0/0 est autorisé
3. Vérifier l'username et password dans MONGO_URI
4. Tester la connexion locally avec le même MONGO_URI
```

### ❌ "Email not sent"
**Solution:**
```
1. Vérifier EMAIL_USER est bon
2. Vérifier EMAIL_PASS est exactement 16 caractères
3. Vérifier que Gmail 2FA est activé
4. Vérifier que l'App Password a été généré correctement
5. Tester l'email localement d'abord
```

### ❌ "CORS error from frontend"
**Solution:**
```
1. Vérifier que FRONTEND_URL est exact sur Render
2. Attendre 2-3 minutes pour que le changement prenne effet
3. Vérifier dans les logs Render que CORS est configuré
4. Recharger le frontend: Ctrl+Shift+R
```

---

## 📞 Checklist final

- [ ] Backend testé localement ✅
- [ ] MongoDB Atlas cluster créé
- [ ] MongoDB user créé avec credentials
- [ ] MONGO_URI obtenu et testé localement
- [ ] Gmail 2FA activé
- [ ] Gmail App Password généré
- [ ] EMAIL_USER et EMAIL_PASS testés localement
- [ ] Code poussé vers main
- [ ] Render Web Service créé
- [ ] Toutes les variables d'environnement ajoutées
- [ ] Build réussi (🟢 Live)
- [ ] Test API endpoints OK
- [ ] Test POST OK
- [ ] Email reçu ✅
- [ ] MongoDB enregistre les réservations
- [ ] Frontend mis à jour (si nécessaire)
- [ ] Test complet frontend → backend OK 🎉

---

## 🎉 Résultat final

Ton backend est **100% opérationnel** avec:
- ✅ API Express complète
- ✅ MongoDB Atlas pour stockage
- ✅ Nodemailer pour emails
- ✅ CORS configuré
- ✅ Déployé sur Render
- ✅ Prêt pour production

**URLs de production:**
- Backend API: `https://orudentaire-backend.onrender.com`
- MongoDB: Géré par Atlas
- Emails: Envoyés via Gmail SMTP

---

**Date:** Janvier 2026  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
