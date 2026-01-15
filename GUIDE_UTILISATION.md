# Guide d'Utilisation - O'Rubri Restaurant

## Pour les Clients

### Réserver une Table

1. Allez sur la page [Réservation](/reservation)
2. Remplissez le formulaire :
   - **Nom** : Votre nom complet
   - **Email** : Votre adresse email
   - **Téléphone** : Votre numéro de téléphone
   - **Date** : Sélectionnez votre date préférée (pas de dimanche)
   - **Heure** : Choisissez entre 11h et 22h
   - **Nombre de personnes** : De 1 à 20 personnes
   - **Message** (optionnel) : Informations spéciales (régimes, occasions, etc.)
3. Cliquez sur "Confirmer ma Réservation"
4. Vous recevrez une confirmation par email sous 24h

### Consulter le Menu

Visitez la page [Menu](/menu) pour voir :
- **Entrées** : Soupes, salades, charcuteries
- **Plats Principaux** : Fruits de mer, viandes, spécialités
- **Desserts** : Gourmandises maison
- **Boissons** : Vins, cidre, bières, jus frais

### Découvrir les Événements

Allez à la page [Événements](/events) pour :
- Voir les prochains concerts et soirées
- Consulter les dates et heures
- Réserver une place directement

### Horaires d'Ouverture

- **Lundi à Jeudi** : 11h30 - 22h00
- **Vendredi et Samedi** : 11h30 - 23h00
- **Dimanche** : 12h00 - 21h00

### Contact

- **Téléphone** : +33 (0)2 99 73 XX XX
- **Email** : contact@orubri.fr
- **Adresse** : Rougemont, Bretagne

---

## Pour les Administrateurs

### Accéder l'Interface Admin

Allez à l'URL racine (/) pour accéder à l'interface de gestion des réservations.

### Gérer les Réservations

1. **Voir toutes les réservations** : Elles s'affichent dans le tableau de droite
2. **Ajouter une réservation** : Utilisez le formulaire à gauche
3. **Modifier une réservation** : Cliquez sur la réservation pour éditer
4. **Annuler une réservation** : Cliquez sur le bouton d'annulation

### Chatbot Assistant

Le chatbot vous aide avec :
- Gestion rapide des réservations
- Rafraîchissement de la liste
- Assistance générale

---

## Personnalisation du Contenu

### Modifier les Informations du Restaurant

Éditez le fichier `src/data/restaurant-content.json` :

```json
{
  "restaurant": {
    "name": "O'Rubri",
    "location": "Rougemont",
    "description": "Votre description...",
    "tagline": "Votre slogan..."
  },
  "hours": {
    "monday": { "open": "11:30", "close": "22:00" },
    ...
  },
  "contact": {
    "phone": "+33...",
    "email": "...",
    "address": "..."
  },
  "menu": {
    "entrees": [...],
    "plats": [...],
    "desserts": [...],
    "boissons": [...]
  },
  "events": [...]
}
```

### Ajouter un Événement

Ajoutez une entrée dans la section `events` :

```json
{
  "id": 5,
  "title": "Votre Événement",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "description": "Description...",
  "image": "/event-image.jpg"
}
```

### Modifier le Menu

Éditez les sections correspondantes dans `restaurant-content.json` et ajoutez des plats :

```json
{
  "name": "Nom du plat",
  "description": "Description courte",
  "price": 19.99
}
```

---

## Conseils

- Consultez régulièrement les réservations
- Mettez à jour les événements avant chaque mois
- Vérifiez les messages spéciaux dans les réservations
- Confirmez les réservations importantes par téléphone
- Gardez le menu à jour avec les promotions

---

## Support

Pour toute question, consultez le README.md du projet ou contactez l'équipe de développement.
