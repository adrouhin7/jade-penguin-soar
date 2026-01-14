"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import ReservationForm from "@/components/ReservationForm";
import AdminReservations from "@/components/AdminReservations";
import Chatbot from "@/components/Chatbot";
import { useState } from "react";

const Index = () => {
  const [refreshAdminReservations, setRefreshAdminReservations] = useState(0);

  const handleReservationChange = () => {
    setRefreshAdminReservations(prev => prev + 1);
  };

  const handleBotAction = (action: string) => {
    if (action === 'refreshReservations') {
      handleReservationChange();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 p-4">
      <div className="container mx-auto py-8">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-600 dark:text-blue-400">
          Bar-Restaurant Reservation System
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ReservationForm onReservationSuccess={handleReservationChange} />
          <AdminReservations refreshTrigger={refreshAdminReservations} />
        </div>
      </div>
      <Chatbot onBotAction={handleBotAction} />
      <MadeWithDyad />
    </div>
  );
};

export default Index;