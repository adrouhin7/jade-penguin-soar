const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Importer les modules
const { sendReservationEmail } = require('./email');
const { connectDB } = require('./db');
let Reservation;
let mongoEnabled = false;

const app = express();
const PORT = process.env.PORT || 3001;
const RESERVATIONS_FILE = path.join(__dirname, 'reservations.json');

// Déterminer l'origin CORS basé sur l'environnement
const getFrontendUrl = () => {
  // Si FRONTEND_URL est défini, l'utiliser
  if (process.env.FRONTEND_URL) {
    return process.env.FRONTEND_URL;
  }
  // Sinon, utiliser basé sur le PORT (Render vs localhost)
  if (PORT !== '3001') {
    // Si le PORT n'est pas 3001, on est probablement en production
    return 'https://o-rubri-frontend.onrender.com';
  }
  // Par défaut, localhost
  return 'http://localhost:5173';
};

const frontendUrl = getFrontendUrl();
console.log(`🔐 CORS Origin configuré pour: ${frontendUrl}`);

const corsOptions = {
  origin: [frontendUrl, 'http://localhost:5173', 'https://o-rubri-frontend.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialisation de MongoDB (optionnel)
async function initDB() {
  const mongoConnected = await connectDB();
  if (mongoConnected) {
    Reservation = require('./models/Reservation');
    mongoEnabled = true;
    console.log('✅ Utilisation de MongoDB pour les réservations');
  } else {
    console.log('📁 Utilisation du fichier JSON pour les réservations');
  }
}

initDB();

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

  try {
    let reservation;

    if (mongoEnabled && Reservation) {
      // Utiliser MongoDB
      reservation = new Reservation({
        name,
        email,
        phone,
        date,
        time,
        numberOfPeople: parseInt(numberOfPeople),
        message: message || '',
        status: 'pending'
      });
      await reservation.save();
      console.log('✅ Réservation MongoDB créée:', reservation._id);
    } else {
      // Fallback: utiliser le fichier JSON
      reservation = {
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

      const reservations = readReservations();
      reservations.push(reservation);
      writeReservations(reservations);
      console.log('✅ Réservation JSON créée:', reservation.id);
    }

    // Envoyer l'email (optionnel, ne bloque pas si erreur)
    try {
      await sendReservationEmail(reservation);
      console.log('✅ Email envoyé');
    } catch (emailError) {
      console.warn('⚠️ Email non envoyé:', emailError.message);
    }

    // Renvoyer la réponse
    return res.status(201).json({
      success: true,
      message: 'Réservation enregistrée avec succès',
      reservationId: mongoEnabled ? reservation._id : reservation.id,
      data: reservation
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
app.get('/api/reservations', async (req, res) => {
  try {
    if (mongoEnabled && Reservation) {
      // Utiliser MongoDB
      const reservations = await Reservation.find().sort({ createdAt: -1 });
      res.json({
        success: true,
        source: 'MongoDB',
        count: reservations.length,
        data: reservations
      });
    } else {
      // Fallback: utiliser le fichier JSON
      const reservations = readReservations();
      res.json({
        success: true,
        source: 'JSON',
        count: reservations.length,
        data: reservations
      });
    }
  } catch (error) {
    console.error('❌ Erreur GET /api/reservations:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur'
    });
  }
});

// Route GET /api/reservations/:id - Récupérer une réservation
app.get('/api/reservations/:id', async (req, res) => {
  try {
    if (mongoEnabled && Reservation) {
      const reservation = await Reservation.findById(req.params.id);
      if (!reservation) {
        return res.status(404).json({
          success: false,
          error: 'Réservation non trouvée'
        });
      }
      res.json({
        success: true,
        data: reservation
      });
    } else {
      const reservations = readReservations();
      const reservation = reservations.find(r => r.id == req.params.id);
      if (!reservation) {
        return res.status(404).json({
          success: false,
          error: 'Réservation non trouvée'
        });
      }
      res.json({
        success: true,
        data: reservation
      });
    }
  } catch (error) {
    console.error('❌ Erreur GET /api/reservations/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur'
    });
  }
});

// Route DELETE /api/reservations/:id - Supprimer une réservation
app.delete('/api/reservations/:id', async (req, res) => {
  try {
    if (mongoEnabled && Reservation) {
      const reservation = await Reservation.findByIdAndDelete(req.params.id);
      if (!reservation) {
        return res.status(404).json({
          success: false,
          error: 'Réservation non trouvée'
        });
      }
      res.json({
        success: true,
        message: 'Réservation supprimée'
      });
    } else {
      const reservations = readReservations();
      const index = reservations.findIndex(r => r.id == req.params.id);
      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Réservation non trouvée'
        });
      }
      reservations.splice(index, 1);
      writeReservations(reservations);
      res.json({
        success: true,
        message: 'Réservation supprimée'
      });
    }
  } catch (error) {
    console.error('❌ Erreur DELETE /api/reservations/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur'
    });
  }
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
