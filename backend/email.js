require('dotenv').config();
const Mailjet = require('node-mailjet');

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
  console.log('\n✅ Toutes les variables requises sont configurées.');
  console.log('✅ Système email : API Mailjet (HTTPS, fiable, non bloqué)\n');
}

// Créer le client API Mailjet
function createMailjetClient() {
  if (!process.env.MJ_APIKEY_PUBLIC || !process.env.MJ_APIKEY_PRIVATE) {
    return null;
  }

  return Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );
}

async function sendReservationEmail(reservation) {
  try {
    const mailjet = createMailjetClient();

    // Vérifier que toutes les variables sont présentes
    if (!mailjet || !process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
      console.warn('⚠️  Aucune configuration email trouvée. Email non envoyé.');
      return false;
    }

    console.log('📨 Tentative d\'envoi via API Mailjet…');

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

    // Utiliser l'API Mailjet v3.1
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.EMAIL_FROM,
            Name: 'O\'Rubri Réservations'
          },
          To: [
            {
              Email: process.env.EMAIL_TO,
              Name: 'O\'Rubri'
            }
          ],
          Subject: `Nouvelle réservation - ${reservation.name}`,
          TextPart: textContent,
          TrackOpens: 'true'
        }
      ]
    });

    const result = await request;
    console.log('✅ Email envoyé avec succès. ID:', result.body.Messages[0].ID);
    return true;
  } catch (error) {
    console.error('❌ Erreur Mailjet API :', error.message);
    return false;
  }
}

module.exports = {
  sendReservationEmail,
};
