// 🧪 TEST AUTOMATISÉ DU FRONTEND
// Ce script simule l'envoi du formulaire de réservation

const testReservation = {
  name: "Test Agent",
  email: "test@example.com",
  phone: "0600000000",
  date: "2025-02-01",
  time: "20:00",
  guests: 4,
  message: "Test automatique depuis Node.js"
};

async function testFrontendAPI() {
  console.log('\n========================================');
  console.log('🧪 TEST FRONTEND - ENVOI DE RÉSERVATION');
  console.log('========================================\n');

  console.log('📤 Envoi de la réservation:');
  console.log('📍 URL cible: http://localhost:3000/api/reservations');
  console.log('📦 Payload envoyé:');
  console.log(JSON.stringify(testReservation, null, 2));

  try {
    console.log('\n⏳ Envoi en cours...\n');
    
    const response = await fetch('http://localhost:3000/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testReservation)
    });

    console.log('📥 Réponse du serveur - Status:', response.status);
    
    const responseData = await response.json();
    console.log('📥 Données reçues:');
    console.log(JSON.stringify(responseData, null, 2));

    if (response.status === 201 || response.status === 200) {
      console.log('\n✅ TEST RÉUSSI ! La réservation a été envoyée avec succès.');
      console.log('📧 Le backend devrait avoir envoyé un email via Mailjet.');
    } else {
      console.log('\n⚠️  Réponse inattendue du serveur.');
    }
  } catch (error) {
    console.log('\n❌ Erreur lors de l\'envoi:');
    console.error(error.message);
    console.log('\n⚠️  Assurez-vous que le serveur backend tourne sur le port 3000');
  }

  console.log('\n========================================\n');
}

testFrontendAPI();
