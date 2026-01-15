import api from './api';

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  numberOfPeople: number;
  message?: string;
}

export interface Reservation extends ReservationData {
  id: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// Create a new reservation
export const createReservation = async (data: ReservationData): Promise<Reservation> => {
  const response = await api.post<Reservation>('/reservations', data);
  return response.data;
};

// Get all reservations (admin only)
export const getReservations = async (): Promise<Reservation[]> => {
  const response = await api.get<Reservation[]>('/reservations');
  return response.data;
};

// Get a specific reservation
export const getReservation = async (id: string): Promise<Reservation> => {
  const response = await api.get<Reservation>(`/reservations/${id}`);
  return response.data;
};

// Update a reservation
export const updateReservation = async (
  id: string,
  data: Partial<ReservationData>
): Promise<Reservation> => {
  const response = await api.put<Reservation>(`/reservations/${id}`, data);
  return response.data;
};

// Cancel a reservation
export const cancelReservation = async (id: string): Promise<void> => {
  await api.delete(`/reservations/${id}`);
};

// Get available time slots
export const getAvailableSlots = async (date: string): Promise<string[]> => {
  const response = await api.get<string[]>(`/reservations/available-slots/${date}`);
  return response.data;
};
