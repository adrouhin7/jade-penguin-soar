require('dotenv').config();
const nodemailer = require('nodemailer');

// Vérifier les variables d'environnement requises
const requiredEnvVars = ['MJ_APIKEY_PUBLIC', 'MJ_APIKEY_PRIVATE', 'EMAIL_FROM', 'EMAIL_TO'];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.warn(`⚠️ Variable manquante : ${envVar}`);
  }
});

function createTransporter() {
  if (!process.env.MJ_APIKEY_PUBLIC || !process.env.MJ_APIKEY_PRIVATE) {
    console.warn('⚠️ Aucune configuration email trouvée. Email non envoyé.');
    return null;
  }

  return nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MJ_APIKEY_PUBLIC,
      pass: process.env.MJ_APIKEY_PRIVATE,
    },
  });
}

async function sendReservationEmail(reservation) {
  try {
    const transporter = createTransporter();

    if (!transporter) {
      console.warn('⚠️ Aucune configuration email trouvée. Email non envoyé.');
      return false;
    }

    const reservationDate = new Date(reservation.date).toLocaleDateString(
      'fr-FR',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );

    const textContent = `Nouvelle réservation O'Rubri

Nom : ${reservation.name}
Email : ${reservation.email}
Téléphone : ${reservation.phone}
Date : ${reservationDate}
Heure : ${reservation.time}
Nombre de personnes : ${reservation.guests}
Message : ${reservation.message || 'Aucun'}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Nouvelle réservation - ${reservation.name}`,
      text: textContent,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé');
    return true;
  } catch (error) {
    console.error('❌ Échec de l\'envoi :', error.message);
    return false;
  }
}

module.exports = {
  sendReservationEmail,
};
