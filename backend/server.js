const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sendReservationEmail } = require('./email');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

app.use(express.json());

app.post('/api/reservations', async (req, res) => {
  console.log('\n📩 === NOUVELLE RÉSERVATION REÇUE ===');
  console.log(JSON.stringify(req.body, null, 2));
  console.log('=====================================\n');
  
  try {
    const success = await sendReservationEmail(req.body);
    if (success) {
      return res.status(201).json({ message: 'Réservation envoyée' });
    }
    return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur backend démarré sur le port ${PORT}`);
  console.log(`🌐 Frontend peut envoyer les réservations à: http://localhost:${PORT}/api/reservations\n`);
});
