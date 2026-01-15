const nodemailer = require('nodemailer');

// Configuration du transporteur Mailjet SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'in-v3.mailjet.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false, // TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/**
 * Envoie un email de réservation
 * @param {Object} data - Données de la réservation
 * @param {string} data.name - Nom du client
 * @param {string} data.email - Email du client
 * @param {string} data.phone - Téléphone du client
 * @param {string} data.date - Date de la réservation
 * @param {string} data.time - Heure de la réservation
 * @param {number} data.numberOfPeople - Nombre de personnes
 * @param {string} data.message - Message optionnel
 * @returns {Promise<boolean>} true si succès, false sinon
 */
async function sendReservationEmail(data) {
  try {
    // Validation des variables d'environnement
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('❌ Erreur : identifiants SMTP non configurés');
      return false;
    }

    if (!process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
      console.error('❌ Erreur : EMAIL_FROM ou EMAIL_TO non configurés');
      return false;
    }

    // Formatage de la date
    const reservationDate = new Date(data.date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Contenu HTML de l'email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
            .header { background: #d4652f; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background: white; padding: 20px; }
            .info-row { margin: 12px 0; padding: 10px; border-left: 3px solid #d4652f; }
            .label { font-weight: bold; color: #d4652f; }
            .footer { background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 5px 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🍷 Nouvelle Réservation O'Rubri</h1>
            </div>
            <div class="content">
              <h2>Détails de la réservation</h2>
              
              <div class="info-row">
                <span class="label">Nom du client :</span> ${data.name}
              </div>
              
              <div class="info-row">
                <span class="label">Email :</span> ${data.email}
              </div>
              
              <div class="info-row">
                <span class="label">Téléphone :</span> ${data.phone}
              </div>
              
              <div class="info-row">
                <span class="label">Date :</span> ${reservationDate}
              </div>
              
              <div class="info-row">
                <span class="label">Heure :</span> ${data.time}
              </div>
              
              <div class="info-row">
                <span class="label">Nombre de personnes :</span> ${data.numberOfPeople} ${data.numberOfPeople === 1 ? 'personne' : 'personnes'}
              </div>
              
              ${data.message ? `
              <div class="info-row">
                <span class="label">Message :</span> ${data.message}
              </div>
              ` : ''}
              
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
              <p><small><strong>Heure de réception :</strong> ${new Date().toLocaleString('fr-FR')}</small></p>
            </div>
            <div class="footer">
              <p>Réservation système O'Rubri | À traiter rapidement</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Configuration de l'email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `[O'Rubri] Nouvelle réservation - ${data.name}`,
      html: htmlContent,
      text: `
Nouvelle réservation O'Rubri

Nom : ${data.name}
Email : ${data.email}
Téléphone : ${data.phone}
Date : ${reservationDate}
Heure : ${data.time}
Nombre de personnes : ${data.numberOfPeople}
${data.message ? `Message : ${data.message}` : ''}

Heure de réception : ${new Date().toLocaleString('fr-FR')}
      `
    };

    // Envoi de l'email
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email envoyé avec succès via Mailjet:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email :', error.message);
    return false;
  }
}

module.exports = {
  sendReservationEmail,
  transporter
};
