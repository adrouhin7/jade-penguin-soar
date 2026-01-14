import { Router } from 'express';
import { addReservation, checkAvailability, getReservations, updateReservation, cancelReservation, getOpeningHours, getSpecialEvents, getReservationById } from '../services/reservationService';

const router = Router();

// POST /reserve - Book a table
router.post('/reserve', (req, res) => {
  const { name, contact, date, time, numberOfPeople, notes } = req.body;

  if (!name || !contact || !date || !time || !numberOfPeople) {
    return res.status(400).json({ success: false, message: 'Missing required reservation fields.' });
  }

  const result = addReservation({ name, contact, date, time, numberOfPeople, notes });
  if (result.success) {
    return res.status(201).json(result);
  }
  return res.status(400).json(result);
});

// GET /availability - Check availability
router.get('/availability', (req, res) => {
  const { date, time, numberOfPeople } = req.query;

  if (!date || !time || !numberOfPeople) {
    return res.status(400).json({ success: false, message: 'Missing date, time, or numberOfPeople for availability check.' });
  }

  const numPeople = parseInt(numberOfPeople as string, 10);
  if (isNaN(numPeople) || numPeople <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid number of people.' });
  }

  const result = checkAvailability(date as string, time as string, numPeople);
  return res.status(200).json(result);
});

// GET /reservations - Get all reservations (admin view)
router.get('/reservations', (req, res) => {
  const reservations = getReservations();
  return res.status(200).json({ success: true, reservations });
});

// GET /reservations/:id - Get a single reservation by ID
router.get('/reservations/:id', (req, res) => {
  const { id } = req.params;
  const reservation = getReservationById(id);
  if (reservation) {
    return res.status(200).json({ success: true, reservation });
  }
  return res.status(404).json({ success: false, message: 'Reservation not found.' });
});

// PUT /reserve/:id - Modify a reservation
router.put('/reserve/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ success: false, message: 'No update fields provided.' });
  }

  const result = updateReservation(id, updates);
  if (result.success) {
    return res.status(200).json(result);
  }
  return res.status(404).json(result);
});


// DELETE /cancel/:id - Cancel a reservation
router.delete('/cancel/:id', (req, res) => {
  const { id } = req.params;
  const result = cancelReservation(id);
  if (result.success) {
    return res.status(200).json(result);
  }
  return res.status(404).json(result);
});

// GET /opening-hours - Get opening hours
router.get('/opening-hours', (req, res) => {
  const hours = getOpeningHours();
  return res.status(200).json({ success: true, hours });
});

// GET /special-events - Get special events
router.get('/special-events', (req, res) => {
  const events = getSpecialEvents();
  return res.status(200).json({ success: true, events });
});

export default router;