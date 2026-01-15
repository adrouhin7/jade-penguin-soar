# O'Rubri - Restaurant Reservation System

Un système complet de gestion des réservations pour le restaurant **O'Rubri** à Rougemont.

## 🎯 Fonctionnalités

- **Page d'accueil** avec présentation du restaurant
- **Système de réservation** en ligne complet
- **Menu interactif** avec sections (Entrées, Plats, Desserts, Boissons)
- **Page Événements** pour afficher les soirées et concerts
- **Interface Admin** pour gérer les réservations
- **Chatbot** pour l'assistance
- **Design responsive** avec angles arrondis et palette chaleureuse

## 🚀 Démarrage

### Installation

```bash
pnpm install
```

### Mode développement

**Frontend :**
```bash
pnpm dev
```
L'application sera accessible à `http://localhost:5173`

**Backend :**
```bash
pnpm run server
```
Le serveur API tournera sur `http://localhost:3001`

### Build pour la production

```bash
pnpm build
```

## 📁 Structure du projet

```
src/
├── pages/
│   ├── Home.tsx           # Accueil
│   ├── Reservation.tsx    # Page de réservation
│   ├── Menu.tsx           # Menu du restaurant
│   ├── Events.tsx         # Événements
│   └── Index.tsx          # Admin (gestion réservations)
├── components/
│   ├── Navigation.tsx     # Barre de navigation
│   ├── ReservationFormPage.tsx  # Formulaire de réservation
│   ├── AdminReservations.tsx    # Interface admin
│   └── ui/                # Composants shadcn/ui
├── services/
│   ├── api.ts             # Client axios
│   └── reservationService.ts   # Service de réservation
├── data/
│   └── restaurant-content.json  # Contenu du restaurant
└── server/
    ├── routes/            # Routes API
    └── services/          # Services backend
```

## 🎨 Design

- **Palette de couleurs** : Ambre, Orange, Rouge (chaleureuse)
- **Angles arrondis** : Utilisation de `rounded-3xl` et `rounded-full`
- **Composants** : shadcn/ui avec Tailwind CSS

## 📋 Pages principales

### Accueil (`/`)
- Présentation du restaurant O'Rubri
- Horaires et contact
- Localisation
- Aperçu des événements

### Réservation (`/reservation`)
- Formulaire complet avec validation
- Champs : nom, email, téléphone, date, heure, nombre de personnes, message
- Intégration avec l'API backend

### Menu (`/menu`)
- 4 sections : Entrées, Plats, Desserts, Boissons
- Affichage des prix et descriptions
- Navigation par onglets

### Événements (`/events`)
- Liste des événements à venir
- Détails : date, heure, description
- Lien de réservation direct

### Admin (`/`)
- Gestion des réservations
- Visualisation de tous les réservations
- Chatbot d'assistance

## 🔧 API

L'API expose les endpoints suivants :

### Réservations
- `POST /api/reservations` - Créer une réservation
- `GET /api/reservations` - Lister toutes les réservations (admin)
- `GET /api/reservations/:id` - Obtenir une réservation
- `PUT /api/reservations/:id` - Mettre à jour une réservation
- `DELETE /api/reservations/:id` - Annuler une réservation

## 📝 Configuration

### Fichier de contenu (`src/data/restaurant-content.json`)

Personnalisez les informations du restaurant :
- Horaires
- Contact
- Menu
- Événements
- Description

## 🛠️ Technologies

- **Frontend** : React, TypeScript, Vite
- **UI** : shadcn/ui, Tailwind CSS, Lucide Icons
- **Backend** : Express, Node.js, TypeScript
- **État** : React Query, React Router
- **HTTP** : Axios
- **Formulaires** : React Hook Form
- **Dates** : date-fns

## 📞 Support

Pour toute question ou modification, consultez les fichiers de configuration ou contactez directement le restaurant.
