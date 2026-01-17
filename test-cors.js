// 🧪 TEST CORS - VÉRIFICATION DE LA CONFIGURATION

const testReservation = {
  name: "CORS Test Agent",
  email: "cors-test@example.com",
  phone: "0700000000",
  date: "2025-02-15",
  time: "19:00",
  guests: 3,
  message: "Test CORS depuis Node.js"
};

async function testCORS() {
  console.log('\n========================================');
  console.log('🧪 TEST CORS - CONFIGURATION BACKEND');
  console.log('========================================\n');

  // Test 1: Localhost
  console.log('📍 TEST 1: Requête depuis localhost:3000');
  await testRequest('http://localhost:3000/api/reservations', 'http://localhost:3000');

  // Test 2: Frontend Render
  console.log('\n📍 TEST 2: Simulation requête depuis frontend.onrender.com');
  await testRequest('https://o-rubri-backend.onrender.com/api/reservations', 'https://o-rubri-frontend.onrender.com');

  console.log('\n========================================\n');
}

async function testRequest(url, origin) {
  try {
    console.log(`   URL: ${url}`);
    console.log(`   Origine: ${origin}`);
    console.log(`   Payload:`);
    console.log(JSON.stringify(testReservation, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': origin  // Simule l'origine CORS
      },
      body: JSON.stringify(testReservation)
    });

    console.log(`\n   ✅ Status: ${response.status}`);
    console.log(`   ✅ Response:`);
    
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

    // Vérifier les headers CORS
    console.log(`\n   📋 Headers de réponse:`);
    const corsHeader = response.headers.get('access-control-allow-origin');
    if (corsHeader) {
      console.log(`   ✅ Access-Control-Allow-Origin: ${corsHeader}`);
    } else {
      console.log(`   ⚠️  Pas de header Access-Control-Allow-Origin`);
    }

  } catch (error) {
    console.log(`\n   ❌ Erreur: ${error.message}`);
    if (error.message.includes('fetch')) {
      console.log(`   ℹ️  Backend non accessible`);
    }
  }
}

testCORS();
