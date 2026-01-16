require('dotenv').config();
const nodemailer = require('nodemailer');

// ✅ Vérifier les variables d'environnement requises au démarrage
console.log('\n📋 === VÉRIFICATION DE LA CONFIGURATION EMAIL ===');
const requiredEnvVars = ['MJ_APIKEY_PUBLIC', 'MJ_APIKEY_PRIVATE', 'EMAIL_FROM', 'EMAIL_TO'];
let allVarsPresent = true;

requiredEnvVars.forEach(envVar => {
  const isPresent = !!process.env[envVar];
  const status = isPresent ? '✅' : '❌';
  console.log(`${status} ${envVar}: ${isPresent ? 'Configuré' : 'MANQUANT'}`);
  if (!isPresent) allVarsPresent = false;
});

if (!allVarsPresent) {
  console.warn('\n⚠️  ATTENTION : Une ou plusieurs variables d\'environnement manquent !');
  console.warn('   L\'envoi d\'email sera désactivé jusqu\'à leur configuration.\n');
} else {
  console.log('\n✅ Toutes les variables requises sont configurées.\n');
}

function createTransporter() {
  // Vérifier les clés API Mailjet
  if (!process.env.MJ_APIKEY_PUBLIC || !process.env.MJ_APIKEY_PRIVATE) {
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

    // Vérifier que toutes les variables sont présentes
    if (!transporter || !process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
      console.warn('⚠️  Aucune configuration email trouvée. Email non envoyé.');
      return false;
    }

    console.log('📨 Tentative d\'envoi d\'email…');

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

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé avec succès. ID:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Échec de l\'envoi :', error.message);
    return false;
  }
}

module.exports = {
  sendReservationEmail,
};
