const mongoose = require('mongoose');

async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('⚠️ MONGO_URI non défini. Utilisation du mode fichier JSON.');
      return null;
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connecté avec succès');
    return true;
  } catch (error) {
    console.error('❌ Erreur connexion MongoDB:', error.message);
    console.warn('⚠️ Passage en mode fallback (JSON)');
    return false;
  }
}

async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB déconnecté');
  } catch (error) {
    console.error('❌ Erreur déconnexion MongoDB:', error.message);
  }
}

module.exports = { connectDB, disconnectDB };
