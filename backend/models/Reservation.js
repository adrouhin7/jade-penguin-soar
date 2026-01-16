const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email invalide',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Le téléphone est requis'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'La date est requise'],
    },
    time: {
      type: String,
      required: [true, "L'heure est requise"],
    },
    numberOfPeople: {
      type: Number,
      required: [true, 'Le nombre de personnes est requis'],
      min: [1, 'Au minimum 1 personne'],
      max: [20, 'Au maximum 20 personnes'],
    },
    message: {
      type: String,
      default: '',
      maxlength: [500, 'Le message ne peut pas dépasser 500 caractères'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Reservation', reservationSchema);
