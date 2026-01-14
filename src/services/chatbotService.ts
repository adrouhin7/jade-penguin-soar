import api from './api';
import { format } from 'date-fns';

// Placeholder for an external AI API key. For this simulation, the AI logic is handled internally.
const AI_API_KEY = "YOUR_EXTERNAL_AI_API_KEY_HERE";

interface ChatbotResponse {
  response: string;
  action?: 'refreshReservations';
}

export const processMessage = async (message: string): Promise<ChatbotResponse> => {
  const lowerMessage = message.toLowerCase();

  // 1. Ask for opening hours
  if (lowerMessage.includes('opening hours') || lowerMessage.includes('when are you open')) {
    try {
      const res = await api.get('/opening-hours');
      if (res.data.success) {
        return { response: `We are open from ${res.data.hours}.` };
      }
      return { response: "I'm sorry, I couldn't retrieve the opening hours at the moment." };
    } catch (error) {
      console.error("Error fetching opening hours:", error);
      return { response: "I'm sorry, I couldn't retrieve the opening hours due to a system error." };
    }
  }

  // 2. Ask for special events
  if (lowerMessage.includes('special events') || lowerMessage.includes('what events do you have')) {
    try {
      const res = await api.get('/special-events');
      if (res.data.success) {
        return { response: res.data.events };
      }
      return { response: "I'm sorry, I couldn't retrieve special events at the moment." };
    } catch (error) {
      console.error("Error fetching special events:", error);
      return { response: "I'm sorry, I couldn't retrieve special events due to a system error." };
    }
  }

  // 3. Check availability
  const availabilityMatch = lowerMessage.match(/(check availability|is there a table|do you have a table) for (\d+) (people|person) on (.+) at (.+)/);
  if (availabilityMatch) {
    const numberOfPeople = parseInt(availabilityMatch[2], 10);
    const dateString = availabilityMatch[4];
    const timeString = availabilityMatch[5];

    try {
      const parsedDate = new Date(dateString);
      if (isNaN(parsedDate.getTime())) {
        return { response: "I couldn't understand the date. Please try a format like 'YYYY-MM-DD' or 'December 25'." };
      }
      const formattedDate = format(parsedDate, 'yyyy-MM-dd');

      const res = await api.get('/availability', {
        params: { date: formattedDate, time: timeString, numberOfPeople }
      });
      if (res.data.success) {
        return { response: res.data.message };
      }
      return { response: res.data.message || "I couldn't check availability at the moment." };
    } catch (error) {
      console.error("Error checking availability:", error);
      return { response: "I'm sorry, I couldn't check availability due to a system error." };
    }
  }

  // 4. Book a table
  const bookMatch = lowerMessage.match(/(book|reserve) a table for (\d+) (people|person) on (.+) at (.+) under the name (.+) with contact (.+)/);
  if (bookMatch) {
    const numberOfPeople = parseInt(bookMatch[2], 10);
    const dateString = bookMatch[4];
    const timeString = bookMatch[5];
    const name = bookMatch[7];
    const contact = bookMatch[8];

    try {
      const parsedDate = new Date(dateString);
      if (isNaN(parsedDate.getTime())) {
        return { response: "I couldn't understand the date. Please try a format like 'YYYY-MM-DD' or 'December 25'." };
      }
      const formattedDate = format(parsedDate, 'yyyy-MM-dd');

      const res = await api.post('/reserve', {
        name,
        contact,
        date: formattedDate,
        time: timeString,
        numberOfPeople,
      });
      if (res.data.success) {
        return { response: `Your reservation for ${numberOfPeople} people on ${formattedDate} at ${timeString} under ${name} has been confirmed! Your reservation ID is ${res.data.reservation.id}.`, action: 'refreshReservations' };
      }
      return { response: res.data.message || "Failed to book reservation." };
    } catch (error) {
      console.error("Error booking reservation:", error);
      return { response: error.response?.data?.message || "I'm sorry, I couldn't book the reservation due to a system error." };
    }
  }

  // 5. Cancel a reservation
  const cancelMatch = lowerMessage.match(/(cancel|delete) my reservation with id (.+)/);
  if (cancelMatch) {
    const reservationId = cancelMatch[2];
    try {
      const res = await api.delete(`/cancel/${reservationId}`);
      if (res.data.success) {
        return { response: `Reservation with ID ${reservationId} has been cancelled.`, action: 'refreshReservations' };
      }
      return { response: res.data.message || "Failed to cancel reservation." };
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      return { response: error.response?.data?.message || "I'm sorry, I couldn't cancel the reservation due to a system error." };
    }
  }

  // 6. Modify a reservation (simplified for chatbot, usually needs more context)
  const modifyMatch = lowerMessage.match(/(modify|change) my reservation with id (.+) to (.+)/);
  if (modifyMatch) {
    const reservationId = modifyMatch[2];
    const updateDetails = modifyMatch[3]; // This would need more sophisticated parsing

    return { response: `To modify a reservation, please use the admin panel or provide specific details like "change reservation ID ${reservationId} to 5 people on 2024-12-25 at 19:00".` };
  }


  // Default response
  return { response: "I'm a reservation bot. I can help you with: \n- Checking availability (e.g., 'check availability for 4 people on 2024-12-25 at 19:00')\n- Booking a table (e.g., 'book a table for 2 people on 2024-12-20 at 18:00 under the name John Doe with contact john@example.com')\n- Cancelling a reservation (e.g., 'cancel my reservation with id 12345')\n- Asking for opening hours\n- Asking for special events" };
};