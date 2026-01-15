# Guide d'installation complet

## Prérequis

- Node.js (v16+)
- pnpm (package manager)

## Architecture du projet

Le projet O'Rubri est structuré en deux parties:

```
jade-penguin-soar/
├── src/                  # Frontend React
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.tsx
│   └── main.tsx
├── backend/              # Backend Express.js
│   ├── server.js
│   ├── package.json
│   └── reservations.json
├── package.json          # Frontend dependencies
└── pnpm-workspace.yaml   # Configuration workspace
```

## Installation complète

### 1. Frontend

```bash
# À la racine du projet
cd "C:\Users\adrou\dyad-apps\jade-penguin-soar"

# Installer les dépendances
pnpm install

# Construire le projet
pnpm build

# Lancer le serveur de développement (optionnel)
pnpm dev
```

### 2. Backend

```bash
# Naviguer vers le dossier backend
cd backend

# Installer les dépendances
pnpm install

# Lancer le serveur (mode développement avec rechargement auto)
pnpm dev

# Ou en mode production
pnpm start
```

## Vérification de l'installation

### Frontend OK ✓
- Pas d'erreurs TypeScript
- Build réussi
- Axiosconfiguré pour pointer vers `http://localhost:3001/api`

### Backend OK ✓
- Fichiers créés: `server.js`, `package.json`, `reservations.json`
- Dépendances: Express, CORS, body-parser installées
- Routes configurées:
  - GET /api → Health check
  - GET /api/reservations → Lister les réservations
  - POST /api/reservations → Créer une réservation
  - PUT /api/reservations/:id → Modifier
  - DELETE /api/reservations/:id → Supprimer

## Lancer l'application complète

### Terminal 1 - Frontend
```bash
cd "C:\Users\adrou\dyad-apps\jade-penguin-soar"
pnpm dev
```
Frontend accessible à: `http://localhost:5173`

### Terminal 2 - Backend
```bash
cd "C:\Users\adrou\dyad-apps\jade-penguin-soar\backend"
pnpm dev
```
Backend accessible à: `http://localhost:3001`

## Tester l'intégration

### Vérifier que le backend fonctionne
```bash
curl http://localhost:3001/api
# Réponse attendue: {"message":"Backend OK"}
```

### Tester une réservation
```bash
curl -X POST http://localhost:3001/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jean Dupont",
    "phone": "+33612345678",
    "email": "jean@example.com",
    "numberOfPeople": 4,
    "date": "2024-01-15",
    "time": "19:30",
    "message": "Terrasse si possible"
  }'
```

## Fichiers importants

### Frontend
- [src/services/api.ts](../src/services/api.ts) - Client axios configuré
- [src/components/ReservationFormPage.tsx](../src/components/ReservationFormPage.tsx) - Formulaire de réservation
- [package.json](../package.json) - Dépendances frontend

### Backend
- [backend/server.js](server.js) - Serveur Express principal
- [backend/package.json](package.json) - Dépendances backend
- [backend/reservations.json](reservations.json) - Stockage des réservations

## Dépannage

### Frontend ne se connecte pas au backend
- Vérifiez que le backend écoute sur le port 3001
- Vérifiez l'URL dans `src/services/api.ts`
- Vérifiez qu'il n'y a pas de problème CORS

### Erreur CORS
- Le backend a CORS configuré pour accepter toutes les origines en développement
- En production, modifiez la configuration CORS dans `backend/server.js`

### Les réservations ne sont pas sauvegardées
- Vérifiez que `backend/reservations.json` est accessible en écriture
- Vérifiez les logs du serveur pour les erreurs d'I/O

## Documentation

- [Frontend Architecture](../README.md)
- [Backend API](./README.md)
- [Détails des Réservations](../RESERVATIONS_SCHEMA.md)

## Prochaines étapes

1. ✅ Installation frontend complète
2. ✅ Installation backend complète
3. ⏳ Tester l'intégration
4. ⏳ Déploiement en production
