const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sendReservationEmail } = require('./email');

const app = express();

// Configuration CORS pour Render et localhost
app.use(cors({
  origin: [
    "https://o-rubri-frontend.onrender.com",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use(express.json());

app.post('/api/reservations', async (req, res) => {
  console.log('\n📩 === NOUVELLE RÉSERVATION REÇUE ===');
  console.log('Origine:', req.get('origin'));
  console.log('Contenu du body:');
  console.log(JSON.stringify(req.body, null, 2));
  console.log('=====================================\n');
  
  try {
    const success = await sendReservationEmail(req.body);
    if (success) {
      console.log('✅ Email envoyé avec succès\n');
      return res.status(201).json({ message: 'Réservation envoyée' });
    }
    console.log('❌ Échec de l\'envoi de l\'email\n');
    return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur backend démarré sur le port ${PORT}`);
  console.log('✅ CORS configuré pour:');
  console.log('   - https://o-rubri-frontend.onrender.com');
  console.log('   - http://localhost:5173');
  console.log('   - http://localhost:3000');
  console.log(`\n📨 Route API: https://o-rubri-backend.onrender.com/api/reservations\n`);
});
