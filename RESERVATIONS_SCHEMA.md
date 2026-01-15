# Structure des Réservations

## Format de Données - Réservation

Chaque réservation dans le système O'Rubri a la structure suivante :

```json
{
  "id": "1705258400000",
  "name": "Jean Dupont",
  "email": "jean.dupont@example.com",
  "phone": "+33 (0)2 99 73 12 34",
  "date": "2026-02-15",
  "time": "19:30",
  "numberOfPeople": 4,
  "message": "Anniversaire! Merci d'avance",
  "createdAt": "2025-01-14T15:30:00Z",
  "status": "confirmed"
}
```

### Détails des Champs

| Champ | Type | Description | Exemple |
|-------|------|-------------|---------|
| `id` | string | Identifiant unique (timestamp) | "1705258400000" |
| `name` | string | Nom complet du client | "Jean Dupont" |
| `email` | string | Adresse email | "jean@example.com" |
| `phone` | string | Numéro de téléphone | "+33 (0)2 99 73 XX XX" |
| `date` | string | Date (format ISO) | "2026-02-15" |
| `time` | string | Heure (format HH:MM) | "19:30" |
| `numberOfPeople` | number | Nombre de convives | 1-20 |
| `message` | string | Notes spéciales (optionnel) | "Allergies, occasions..." |
| `createdAt` | string | Timestamp ISO | "2025-01-14T15:30:00Z" |
| `status` | string | État (confirmed, pending, cancelled) | "confirmed" |

---

## Exemple de Réservation Complète

```json
{
  "id": "1705258400001",
  "name": "Marie et Pierre Blanc",
  "email": "marie.blanc@gmail.com",
  "phone": "+33 (0)2 99 73 45 67",
  "date": "2026-02-14",
  "time": "20:00",
  "numberOfPeople": 2,
  "message": "Réservation pour la Saint-Valentin. Candlelight SVP. Menu spécial si possible.",
  "createdAt": "2025-01-12T10:15:00Z",
  "status": "confirmed"
}
```

---

## Validation

### Règles de Validation

1. **Nom**
   - Minimum 2 caractères
   - Maximum 100 caractères
   - Requis

2. **Email**
   - Format valide (regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$`)
   - Requis

3. **Téléphone**
   - Minimum 10 chiffres
   - Requis

4. **Date**
   - Format ISO: YYYY-MM-DD
   - Ne peut pas être dans le passé
   - Dimanche interdit
   - Requis

5. **Heure**
   - Format HH:MM (24h)
   - Entre 11:00 et 22:00
   - Requis

6. **Nombre de personnes**
   - Entre 1 et 20
   - Entier
   - Requis

7. **Message**
   - Optionnel
   - Maximum 500 caractères

---

## Contraintes de Capacité

- **Capacité totale** : 60 places
- **Par créneau horaire** : Géré dynamiquement
- **Horaires d'ouverture** :
  - Lun-Jeu: 11:30 - 22:00
  - Ven-Sam: 11:30 - 23:00
  - Dim: 12:00 - 21:00

---

## États de Réservation

| État | Description |
|------|-------------|
| `confirmed` | Réservation confirmée |
| `pending` | En attente de confirmation |
| `cancelled` | Réservation annulée |

---

## Fichier de Stockage

Les réservations sont stockées dans:
```
src/server/data/reservations.json
```

Format du fichier :
```json
[
  { /* Réservation 1 */ },
  { /* Réservation 2 */ },
  { /* ... */ }
]
```

---

## Requêtes API

### Créer une Réservation

```
POST /api/reservations
Content-Type: application/json

{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "+33 (0)2 99 73 12 34",
  "date": "2026-02-15",
  "time": "19:30",
  "numberOfPeople": 4,
  "message": "Anniversaire"
}
```

**Réponse (201)**
```json
{
  "success": true,
  "reservation": {
    "id": "1705258400001",
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "phone": "+33 (0)2 99 73 12 34",
    "date": "2026-02-15",
    "time": "19:30",
    "numberOfPeople": 4,
    "message": "Anniversaire",
    "createdAt": "2025-01-14T15:30:00Z",
    "status": "confirmed"
  },
  "message": "Réservation confirmée avec succès!"
}
```

### Récupérer Toutes les Réservations

```
GET /api/reservations
```

**Réponse (200)**
```json
{
  "success": true,
  "reservations": [ /* Array of reservations */ ]
}
```

### Récupérer une Réservation

```
GET /api/reservations/1705258400001
```

### Modifier une Réservation

```
PUT /api/reservations/1705258400001
Content-Type: application/json

{
  "numberOfPeople": 5,
  "message": "Finalement 5 personnes"
}
```

### Annuler une Réservation

```
DELETE /api/reservations/1705258400001
```

**Réponse (200)**
```json
{
  "success": true,
  "message": "Réservation annulée avec succès"
}
```

---

## Erreurs Courantes

| Code | Message |
|------|---------|
| 400 | Missing required reservation fields |
| 400 | Invalid number of people |
| 400 | Not enough seats available |
| 404 | Reservation not found |
| 500 | Server error |

---

## Conseils d'Utilisation

1. **Validation côté client** : Valider les données avant envoi
2. **Feedback utilisateur** : Afficher message de confirmation/erreur
3. **Confirmation email** : Envoyer email après création (à implémenter)
4. **Horaires** : Toujours vérifier disponibilité avant réservation
5. **Backup** : Sauvegarder régulièrement le fichier JSON
