const nodemailer = require('nodemailer');

/**
 * Crée un transporteur Nodemailer
 * Supporte Gmail ou SMTP personnalisé selon la configuration
 */
function createTransporter() {
  // Si des identifiants Gmail sont fournis
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Sinon, essayer SMTP personnalisé (Mailjet, SendGrid, etc.)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return null;
}

/**
 * Envoie un email de réservation
 * @param {Object} reservation - Données de la réservation
 * @returns {Promise<boolean>}
 */
async function sendReservationEmail(reservation) {
  try {
    const transporter = createTransporter();

    if (!transporter) {
      console.warn('⚠️ Aucune configuration email trouvée. Email non envoyé.');
      return false;
    }

    // Déterminer les adresses email
    const emailFrom = process.env.EMAIL_USER || process.env.SMTP_USER;
    const emailTo = process.env.EMAIL_TO || emailFrom;

    if (!emailFrom) {
      console.warn('⚠️ Adresse email source non configurée.');
      return false;
    }

    // Formater la date
    const reservationDate = new Date(reservation.date).toLocaleDateString(
      'fr-FR',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );

    // Contenu texte simple
    const textContent = `
Nouvelle réservation sur O'Rubri

Nom : ${reservation.name}
Email : ${reservation.email}
Téléphone : ${reservation.phone}
Date : ${reservationDate}
Heure : ${reservation.time}
Nombre de personnes : ${reservation.numberOfPeople}
Message : ${reservation.message || 'Aucun'}

---
Cet email a été généré automatiquement.
    `;

    // Contenu HTML
    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle réservation O'Rubri</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; }
    h1 { color: #d97706; border-bottom: 2px solid #d97706; padding-bottom: 10px; }
    .info-block { margin: 15px 0; }
    .label { font-weight: bold; color: #333; }
    .value { color: #666; }
    footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🍷 Nouvelle réservation O'Rubri</h1>
    
    <div class="info-block">
      <span class="label">Nom :</span>
      <span class="value">${reservation.name}</span>
    </div>
    
    <div class="info-block">
      <span class="label">Email :</span>
      <span class="value">${reservation.email}</span>
    </div>
    
    <div class="info-block">
      <span class="label">Téléphone :</span>
      <span class="value">${reservation.phone}</span>
    </div>
    
    <div class="info-block">
      <span class="label">Date :</span>
      <span class="value">${reservationDate}</span>
    </div>
    
    <div class="info-block">
      <span class="label">Heure :</span>
      <span class="value">${reservation.time}</span>
    </div>
    
    <div class="info-block">
      <span class="label">Nombre de personnes :</span>
      <span class="value">${reservation.numberOfPeople}</span>
    </div>
    
    ${reservation.message ? `
    <div class="info-block">
      <span class="label">Message :</span>
      <div class="value" style="margin-top: 5px; padding: 10px; background-color: #f9f9f9; border-left: 3px solid #d97706;">
        ${reservation.message}
      </div>
    </div>
    ` : ''}
    
    <footer>
      <p>Cet email a été généré automatiquement par le système de réservation O'Rubri.</p>
    </footer>
  </div>
</body>
</html>
    `;

    // Options d'envoi
    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: `🍷 Nouvelle réservation - ${reservation.name} le ${reservation.date}`,
      text: textContent,
      html: htmlContent,
    };

    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi d\'email:', error.message);
    // Ne pas lancer l'erreur pour ne pas bloquer la réservation
    return false;
  }
}

module.exports = {
  sendReservationEmail,
};
