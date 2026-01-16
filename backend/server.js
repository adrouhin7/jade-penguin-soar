const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Importer la fonction d'email
const { sendReservationEmail } = require('./email');

const app = express();
const PORT = process.env.PORT || 3001;
const RESERVATIONS_FILE = path.join(__dirname, 'reservations.json');

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL || 'https://o-rubri-frontend.onrender.com'
    : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());

// Fonction pour lire les réservations
function readReservations() {
  try {
    const data = fs.readFileSync(RESERVATIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Fonction pour écrire les réservations
function writeReservations(reservations) {
  fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(reservations, null, 2));
}

// Route GET /api - Health check
app.get('/api', (req, res) => {
  res.json({ message: 'API OK — Backend O\'Rubri opérationnel' });
});

// Route POST /api/reservations - Créer une réservation
app.post('/api/reservations', async (req, res) => {
  const { name, email, phone, date, time, numberOfPeople, message } = req.body;

  // Vérifier les champs requis
  if (!name || !email || !phone || !date || !time || !numberOfPeople) {
    return res.status(400).json({
      success: false,
      error: 'Les champs name, email, phone, date, time et numberOfPeople sont requis'
    });
  }

  // Créer la réservation
  const reservation = {
    id: Date.now(),
    name,
    email,
    phone,
    date,
    time,
    numberOfPeople: parseInt(numberOfPeople),
    message: message || '',
    createdAt: new Date().toISOString()
  };

  try {
    // Lire les réservations existantes
    const reservations = readReservations();

    // Ajouter la nouvelle réservation
    reservations.push(reservation);

    // Écrire dans le fichier
    writeReservations(reservations);

    // Afficher en console
    console.log('✅ Nouvelle réservation enregistrée:', reservation);

    // Envoyer l'email
    await sendReservationEmail(reservation);

    // Renvoyer la réponse
    return res.status(201).json({
      success: true,
      message: 'Réservation enregistrée avec succès',
      reservationId: reservation.id
    });
  } catch (error) {
    console.error('❌ Erreur lors de la création de la réservation:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de la création de la réservation'
    });
  }
});

// Route GET /api/reservations - Lister toutes les réservations
app.get('/api/reservations', (req, res) => {
  const reservations = readReservations();
  res.json(reservations);
});

// Route 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🍷 Backend O'Rubri écoute sur http://localhost:${PORT}`);
  console.log(`📍 Endpoint API: http://localhost:${PORT}/api`);
});
