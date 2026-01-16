require('dotenv').config();
const { sendReservationEmail } = require('./email');

const testReservation = {
  name: 'Test Agent',
  email: 'test@example.com',
  phone: '0600000000',
  date: '2025-01-01',
  time: '20:00',
  guests: 2,
  message: 'Test automatique'
};

console.log('🔍 Démarrage du test d\'envoi d\'email...\n');
console.log('📋 Configuration détectée :');
console.log(`   MJ_APIKEY_PUBLIC: ${process.env.MJ_APIKEY_PUBLIC ? '✅ Configuré' : '❌ Manquant'}`);
console.log(`   MJ_APIKEY_PRIVATE: ${process.env.MJ_APIKEY_PRIVATE ? '✅ Configuré' : '❌ Manquant'}`);
console.log(`   EMAIL_FROM: ${process.env.EMAIL_FROM ? '✅ Configuré' : '❌ Manquant'}`);
console.log(`   EMAIL_TO: ${process.env.EMAIL_TO ? '✅ Configuré' : '❌ Manquant'}\n`);

console.log('📧 Objet de test :');
console.log(JSON.stringify(testReservation, null, 2));
console.log('\n⏳ Envoi en cours...\n');

sendReservationEmail(testReservation).then(success => {
  if (success) {
    console.log('\n✅ Test réussi ! L\'email a été envoyé avec succès.');
  } else {
    console.log('\n❌ Échec du test. Vérifiez les logs ci-dessus pour plus de détails.');
  }
  process.exit(0);
}).catch(error => {
  console.error('\n❌ Erreur non gérée :', error);
  process.exit(1);
});
