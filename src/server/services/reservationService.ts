import * as fs from 'fs';
import * as path from 'path';

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  numberOfPeople: number;
  message?: string;
  createdAt?: string;
  status?: 'confirmed' | 'pending' | 'cancelled';
}

const RESERVATIONS_FILE = path.join(__dirname, '../data/reservations.json');
const MAX_SEATS = 60;
const OPENING_HOUR = 11; // 11 AM
const CLOSING_HOUR = 23; // 11 PM

const loadReservations = (): Reservation[] => {
  if (!fs.existsSync(RESERVATIONS_FILE)) {
    fs.writeFileSync(RESERVATIONS_FILE, '[]', 'utf8');
    return [];
  }
  const data = fs.readFileSync(RESERVATIONS_FILE, 'utf8');
  return JSON.parse(data);
};

const saveReservations = (reservations: Reservation[]): void => {
  fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(reservations, null, 2), 'utf8');
};

const isWithinOpeningHours = (time: string): boolean => {
  const [hour] = time.split(':').map(Number);
  return hour >= OPENING_HOUR && hour < CLOSING_HOUR;
};

const getBookedSeats = (date: string, time: string, currentReservations: Reservation[]): number => {
  return currentReservations
    .filter(r => r.date === date && r.time === time)
    .reduce((sum, r) => sum + r.numberOfPeople, 0);
};

export const checkAvailability = (date: string, time: string, numberOfPeople: number): { available: boolean; message?: string } => {
  if (!isWithinOpeningHours(time)) {
    return { available: false, message: `We are only open from ${OPENING_HOUR}h to ${CLOSING_HOUR}h.` };
  }

  const currentReservations = loadReservations();
  const bookedSeats = getBookedSeats(date, time, currentReservations);

  if (bookedSeats + numberOfPeople > MAX_SEATS) {
    return { available: false, message: `Not enough seats available for ${numberOfPeople} people at ${time} on ${date}. Only ${MAX_SEATS - bookedSeats} seats remaining.` };
  }

  return { available: true, message: `Seats available for ${numberOfPeople} people at ${time} on ${date}.` };
};

export const addReservation = (newReservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>): { success: boolean; reservation?: Reservation; message: string } => {
  const { date, time, numberOfPeople } = newReservation;

  const availability = checkAvailability(date, time, numberOfPeople);
  if (!availability.available) {
    return { success: false, message: availability.message || "Could not add reservation due to availability." };
  }

  const reservations = loadReservations();
  const id = Date.now().toString(); // Simple unique ID
  const reservation: Reservation = { 
    id, 
    ...newReservation,
    createdAt: new Date().toISOString(),
    status: 'confirmed'
  };
  reservations.push(reservation);
  saveReservations(reservations);
  return { success: true, reservation, message: "Réservation confirmée avec succès!" };
};

export const getReservations = (): Reservation[] => {
  return loadReservations();
};

export const getReservationById = (id: string): Reservation | undefined => {
  const reservations = loadReservations();
  return reservations.find(r => r.id === id);
};

export const updateReservation = (id: string, updates: Partial<Omit<Reservation, 'id'>>): { success: boolean; reservation?: Reservation; message: string } => {
  const reservations = loadReservations();
  const index = reservations.findIndex(r => r.id === id);

  if (index === -1) {
    return { success: false, message: "Reservation not found." };
  }

  const existingReservation = reservations[index];
  const updatedReservation = { ...existingReservation, ...updates };

  // Re-check availability if number of people, date, or time changes
  if (
    updates.numberOfPeople !== undefined ||
    updates.date !== undefined ||
    updates.time !== undefined
  ) {
    const tempReservations = reservations.filter(r => r.id !== id); // Exclude current reservation for availability check
    const bookedSeats = getBookedSeats(updatedReservation.date, updatedReservation.time, tempReservations);

    if (!isWithinOpeningHours(updatedReservation.time)) {
      return { success: false, message: `We are only open from ${OPENING_HOUR}h to ${CLOSING_HOUR}h.` };
    }

    if (bookedSeats + updatedReservation.numberOfPeople > MAX_SEATS) {
      return { success: false, message: `Not enough seats available for ${updatedReservation.numberOfPeople} people at ${updatedReservation.time} on ${updatedReservation.date}. Only ${MAX_SEATS - bookedSeats} seats remaining.` };
    }
  }

  reservations[index] = updatedReservation;
  saveReservations(reservations);
  return { success: true, reservation: updatedReservation, message: "Reservation successfully updated." };
};

export const cancelReservation = (id: string): { success: boolean; message: string } => {
  let reservations = loadReservations();
  const initialLength = reservations.length;
  reservations = reservations.filter(r => r.id !== id);

  if (reservations.length === initialLength) {
    return { success: false, message: "Reservation not found." };
  }

  saveReservations(reservations);
  return { success: true, message: "Reservation successfully cancelled." };
};

export const getOpeningHours = (): string => {
  return `${OPENING_HOUR}h–${CLOSING_HOUR}h`;
};

export const getSpecialEvents = (): string => {
  // Placeholder for special events
  return "No special events scheduled at the moment. Please check back later!";
};