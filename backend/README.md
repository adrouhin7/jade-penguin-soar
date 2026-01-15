# Backend O'Rubri

Serveur Express.js pour gérer les réservations du restaurant O'Rubri.

## Installation

```bash
cd backend
pnpm install
```

## Lancer le serveur

### Mode développement (avec rechargement automatique)
```bash
pnpm dev
```

### Mode production
```bash
pnpm start
```

Le serveur écoute sur `http://localhost:3001`

## Routes API

### GET /api
**Status:** Health check du backend

**Réponse:**
```json
{
  "message": "Backend OK"
}
```

### GET /api/reservations
**Status:** Récupérer toutes les réservations

**Réponse:**
```json
{
  "success": true,
  "reservations": [
    {
      "id": "1234567890",
      "name": "Jean Dupont",
      "phone": "+33612345678",
      "email": "jean@example.com",
      "numberOfPeople": 4,
      "date": "2024-01-15",
      "time": "19:30",
      "message": "Terrasse si possible",
      "createdAt": "2024-01-10T14:30:00.000Z"
    }
  ]
}
```

### GET /api/reservations/:id
**Status:** Récupérer une réservation spécifique

**Paramètres:**
- `id` : ID de la réservation

**Réponse:**
```json
{
  "success": true,
  "reservation": {
    "id": "1234567890",
    "name": "Jean Dupont",
    "phone": "+33612345678",
    "email": "jean@example.com",
    "numberOfPeople": 4,
    "date": "2024-01-15",
    "time": "19:30",
    "message": "Terrasse si possible",
    "createdAt": "2024-01-10T14:30:00.000Z"
  }
}
```

### POST /api/reservations
**Status:** Créer une nouvelle réservation

**Body (JSON):**
```json
{
  "name": "Jean Dupont",
  "phone": "+33612345678",
  "email": "jean@example.com",
  "numberOfPeople": 4,
  "date": "2024-01-15",
  "time": "19:30",
  "message": "Terrasse si possible"
}
```

**Réponse (201 Created):**
```json
{
  "success": true,
  "message": "Réservation enregistrée",
  "reservation": {
    "id": "1234567890",
    "name": "Jean Dupont",
    "phone": "+33612345678",
    "email": "jean@example.com",
    "numberOfPeople": 4,
    "date": "2024-01-15",
    "time": "19:30",
    "message": "Terrasse si possible",
    "createdAt": "2024-01-10T14:30:00.000Z"
  }
}
```

### PUT /api/reservations/:id
**Status:** Modifier une réservation existante

**Paramètres:**
- `id` : ID de la réservation

**Body (JSON):** Tous les champs sont optionnels
```json
{
  "name": "Jean Dupont",
  "phone": "+33612345678",
  "email": "jean@example.com",
  "numberOfPeople": 4,
  "date": "2024-01-15",
  "time": "19:30",
  "message": "Terrasse si possible"
}
```

**Réponse:**
```json
{
  "success": true,
  "message": "Réservation mise à jour",
  "reservation": { ... }
}
```

### DELETE /api/reservations/:id
**Status:** Supprimer une réservation

**Paramètres:**
- `id` : ID de la réservation

**Réponse:**
```json
{
  "success": true,
  "message": "Réservation supprimée"
}
```

## Gestion des données

- Les réservations sont stockées dans `backend/reservations.json`
- Format: Tableau JSON avec les objets réservation
- Les données persistent entre les redémarrages du serveur

## Configuration CORS

Le serveur accepte les requêtes CORS de tous les domaines. Pour limiter les origines en production, modifiez le middleware CORS dans `server.js`:

```javascript
app.use(cors({
  origin: 'http://localhost:5173', // URL du frontend
  credentials: true
}));
```

## Développement

### Fichiers clés
- `server.js` - Serveur Express principal
- `package.json` - Dépendances et scripts
- `reservations.json` - Stockage des réservations

### Dépendances
- `express` - Framework web
- `cors` - Middleware CORS
- `body-parser` - Parsing des requêtes JSON
- `nodemon` - Rechargement automatique en développement

## Architecture

```
backend/
├── server.js              # Serveur Express principal
├── package.json           # Dépendances et scripts
├── reservations.json      # Stockage des réservations
└── .gitignore             # Fichiers à ignorer
```

## Intégration avec le frontend

Le frontend (React) se connecte au backend via axios:

```typescript
// src/services/api.ts
const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Exemple d'utilisation
await api.post('/reservations', {
  name: 'Jean Dupont',
  phone: '+33612345678',
  email: 'jean@example.com',
  numberOfPeople: 4,
  date: '2024-01-15',
  time: '19:30',
  message: 'Terrasse si possible'
});
```

## Déploiement

Pour déployer en production:
1. Installer les dépendances: `pnpm install`
2. Lancer le serveur: `pnpm start`
3. Configurer les variables d'environnement si nécessaire
4. Ajouter la configuration CORS appropriée
5. Configurer un processus manager (PM2, systemd, etc.)

## Support

Pour toute question sur le backend, consultez la documentation principale du projet.
