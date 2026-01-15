/**
 * Exemple de test pour sendReservationEmail
 * 
 * À exécuter avec : node test-email.js
 * 
 * Assurez-vous que votre .env est configuré :
 * SMTP_USER=votre_clé_api_mailjet
 * SMTP_PASS=votre_clé_secrète_mailjet
 * EMAIL_FROM=adresse@domaine.com
 * EMAIL_TO=adresse@domaine.com
 */

require('dotenv').config();
const { sendReservationEmail } = require('./email');

// Données de test
const testReservation = {
  name: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  phone: '+33 2 99 73 12 34',
  date: '2026-01-20',
  time: '19:30',
  numberOfPeople: 4,
  message: 'Allergies aux fruits de mer - Table près de la fenêtre si possible'
};

console.log('🚀 Envoi d\'un email de test...\n');
console.log('📊 Données de réservation :', testReservation);
console.log('\n---\n');

sendReservationEmail(testReservation).then((success) => {
  if (success) {
    console.log('\n✅ Email envoyé avec succès !');
    console.log('Vérifiez votre boîte mail à :', process.env.EMAIL_TO);
  } else {
    console.log('\n❌ Erreur lors de l\'envoi de l\'email');
  }
  process.exit(0);
});
