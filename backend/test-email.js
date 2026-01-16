require('dotenv').config();
const { sendReservationEmail } = require('./email');

console.log('\n\n🧪 === TEST D\'ENVOI D\'EMAIL ===\n');

const testReservation = {
  name: 'Test Agent',
  email: 'test@example.com',
  phone: '0600000000',
  date: '2025-01-01',
  time: '20:00',
  guests: 2,
  message: 'Test automatique'
};

console.log('📧 Objet de réservation de test :');
console.log(JSON.stringify(testReservation, null, 2));
console.log('\n⏳ Envoi en cours...\n');

sendReservationEmail(testReservation).then(success => {
  if (success) {
    console.log('\n✅ TEST RÉUSSI ! L\'email a été envoyé avec succès.\n');
  } else {
    console.log('\n❌ ÉCHEC DU TEST. Vérifiez les logs ci-dessus pour plus de détails.\n');
  }
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('\n❌ ERREUR NON GÉRÉE :', error);
  process.exit(1);
});
