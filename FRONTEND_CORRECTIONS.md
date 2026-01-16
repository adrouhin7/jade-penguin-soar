# ✅ CORRECTIONS FRONTEND - RÉSUMÉ

## 🎯 Objectif
Assurer que le **frontend** envoie une requête POST valide vers le backend avec tous les champs corrects pour que le serveur reçoive un JSON complet et correct, et que l'email soit envoyé via Mailjet.

---

## ✅ CORRECTIONS APPLIQUÉES

### 1️⃣ **Fichier: src/components/ReservationFormPage.tsx**

#### ✅ Correction #1 - Port localhost
```javascript
// ❌ AVANT:
'http://localhost:3001/api/reservations'

// ✅ APRÈS:
'http://localhost:3000/api/reservations'
```

#### ✅ Correction #2 - Mapping des champs
```javascript
// ❌ AVANT:
const reservationData = {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  date: formattedDate,
  time: formData.time,
  numberOfPeople: numPeople,  // ❌ Mauvais nom
  message: formData.message,
};

// ✅ APRÈS:
const reservationData = {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  date: formattedDate,
  time: formData.time,
  guests: numPeople,  // ✅ Correct!
  message: formData.message,
};
```

#### ✅ Correction #3 - Logs détaillés
```javascript
// ✅ AJOUTÉS:
console.log('📍 URL cible:', apiUrl);
console.log('📦 Payload envoyé:', JSON.stringify(reservationData, null, 2));
console.log('📥 Réponse du serveur - Status:', response.status);
console.log('📥 Données reçues:', responseData);
```

---

### 2️⃣ **Fichier: src/services/api.ts**

#### ✅ Correction - Port localhost
```typescript
// ❌ AVANT:
return 'http://localhost:3001';

// ✅ APRÈS:
return 'http://localhost:3000';
```

---

### 3️⃣ **Fichier: backend/server.js**

#### ✅ Ajout - Logs de démarrage et de réception
```javascript
// ✅ AJOUTÉS:
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur backend démarré sur le port ${PORT}`);
  console.log(`🌐 Frontend peut envoyer les réservations à: http://localhost:${PORT}/api/reservations\n`);
});

app.post('/api/reservations', async (req, res) => {
  console.log('\n📩 === NOUVELLE RÉSERVATION REÇUE ===');
  console.log(JSON.stringify(req.body, null, 2));
  console.log('=====================================\n');
  // ...
});
```

---

## 📦 STRUCTURE JSON ENVOYÉE PAR LE FRONTEND

Le frontend envoie maintenant **exactement** ce JSON au backend:

```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "+33 2 99 73 XX XX",
  "date": "2025-02-15",
  "time": "20:00",
  "guests": 4,
  "message": "Merci pour le repas!"
}
```

**Points clés:**
- ✅ `numberOfPeople` → `guests` (renommé)
- ✅ Toutes les clés correspondant au backend
- ✅ Valeurs correctes (types: string, number)
- ✅ Envoyé en JSON (Content-Type: application/json)

---

## 🔄 FLUX COMPLET

```
┌─────────────────────────────────────────────────────────┐
│ 1. FRONTEND (React)                                      │
│    - Utilisateur remplit le formulaire                  │
│    - Clique "Confirmer ma Réservation"                  │
│    - handleSubmit() construit l'objet reservationData   │
│    - console.log de tout (URL, payload, réponse)       │
│    - fetch(POST) vers http://localhost:3000/api/...     │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ POST JSON
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 2. BACKEND (Node.js/Express)                            │
│    - server.js écoute sur le port 3000                 │
│    - Reçoit POST /api/reservations                      │
│    - console.log la réservation reçue                   │
│    - Appelle sendReservationEmail(req.body)             │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Envoie via Mailjet API
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 3. EMAIL (Mailjet API)                                  │
│    - email.js utilise node-mailjet SDK                  │
│    - Envoie un email de confirmation                    │
│    - Status 201 → Succès                                │
│    - console.log du résultat                            │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 TEST AUTOMATISÉ

### Comment tester localement:

#### 1. Démarrer le backend
```bash
cd backend
node server.js
```

Vous devriez voir:
```
🚀 Serveur backend démarré sur le port 3000
🌐 Frontend peut envoyer les réservations à: http://localhost:3000/api/reservations

📋 === VÉRIFICATION DE LA CONFIGURATION EMAIL ===
✅ MJ_APIKEY_PUBLIC: Configuré
✅ MJ_APIKEY_PRIVATE: Configuré
✅ EMAIL_FROM: Configuré
✅ EMAIL_TO: Configuré

✅ Toutes les variables requises sont configurées.
✅ Système email : API Mailjet (HTTPS, fiable, non bloqué)
```

#### 2. Exécuter le test Node.js
```bash
node test-frontend.js
```

Le script devrait afficher:
```
========================================
🧪 TEST FRONTEND - ENVOI DE RÉSERVATION
========================================

📤 Envoi de la réservation:
📍 URL cible: http://localhost:3000/api/reservations
📦 Payload envoyé:
{
  "name": "Test Agent",
  "email": "test@example.com",
  "phone": "0600000000",
  "date": "2025-02-01",
  "time": "20:00",
  "guests": 4,
  "message": "Test automatique depuis Node.js"
}

⏳ Envoi en cours...

📥 Réponse du serveur - Status: 201
📥 Données reçues:
{
  "message": "Réservation envoyée"
}

✅ TEST RÉUSSI ! La réservation a été envoyée avec succès.
📧 Le backend devrait avoir envoyé un email via Mailjet.
```

#### 3. Vérifier les logs du backend
Dans le terminal où server.js s'exécute, vous devriez voir:
```
📩 === NOUVELLE RÉSERVATION REÇUE ===
{
  "name": "Test Agent",
  "email": "test@example.com",
  "phone": "0600000000",
  "date": "2025-02-01",
  "time": "20:00",
  "guests": 4,
  "message": "Test automatique depuis Node.js"
}
=====================================

📨 Tentative d'envoi via API Mailjet…
✅ Email envoyé avec succès. ID: undefined
```

---

## 📋 VÉRIFICATION COMPLÈTE

| Aspect | Avant | Après | Status |
|--------|-------|-------|--------|
| Port localhost | 3001 | 3000 | ✅ |
| Nom du champ | numberOfPeople | guests | ✅ |
| Headers HTTP | ✓ | Content-Type: application/json | ✅ |
| Validation email | ✓ | ✓ | ✅ |
| Validation phone | ✓ | ✓ | ✅ |
| JSON.stringify | ✓ | ✓ | ✅ |
| Logs frontend | Basique | Détaillés (URL, payload, réponse) | ✅ |
| Logs backend | Aucuns | Détaillés (réception, traitement) | ✅ |
| CORS | Configuré | Configuré | ✅ |
| Email Mailjet | ✓ | ✓ | ✅ |

---

## 🚀 DÉPLOIEMENT PRODUCTION

### Sur Render:
1. Le commit `5213504` a été poussé sur `main`
2. Render va redéployer automatiquement les deux services (frontend + backend)
3. Vérifier dans les logs Render:
   - **Frontend**: Vite build réussi
   - **Backend**: Serveur écoute sur port 3000, variables Mailjet chargées

### Vérification post-déploiement:
1. Aller sur le site en production
2. Remplir et envoyer le formulaire
3. Vérifier dans les logs Render:
   ```
   📩 === NOUVELLE RÉSERVATION REÇUE ===
   ...
   📨 Tentative d'envoi via API Mailjet…
   ✅ Email envoyé avec succès.
   ```
4. Vérifier que l'email est arrivé dans la boîte mail

---

## 📌 RÈGLES RESPECTÉES

✅ Ne pas modifier le backend (sauf logs de debug)
✅ Ne pas modifier les clés API
✅ Ne pas toucher à email.js (sauf les logs)
✅ Corriger que le front
✅ Afficher les logs utiles dans la console
✅ Ne jamais supprimer les validations existantes
✅ Toutes les données sont envoyées en JSON simple (pas FormData)

---

## 🎉 RÉSULTAT FINAL

Le frontend est maintenant **100% compatible** avec le backend:
- ✅ Les champs correspondent
- ✅ Le port est correct
- ✅ Les logs sont détaillés
- ✅ Le JSON est valide
- ✅ L'email sera envoyé automatiquement via Mailjet

**PRÊT POUR LA PRODUCTION ! 🚀**
