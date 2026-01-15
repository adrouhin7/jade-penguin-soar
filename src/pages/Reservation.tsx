"use client";

import { Navigation } from "@/components/Navigation";
import { ReservationForm } from "@/components/ReservationFormPage";
import { Card } from "@/components/ui/card";
import { MadeWithDyad } from "@/components/made-with-dyad";

const ReservationPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 text-white py-16 rounded-b-3xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Réserver une Table</h1>
          <p className="text-xl text-amber-50">Sécurisez votre place chez O'Rubri</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2">
            <Card className="rounded-3xl border-2 border-amber-200 p-8 shadow-lg">
              <ReservationForm />
            </Card>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <Card className="rounded-3xl border-2 border-amber-200 p-6 bg-gradient-to-br from-amber-50 to-orange-50">
              <h3 className="text-xl font-bold text-amber-900 mb-4">ℹ️ Informations</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-orange-600 mb-1">Délai de confirmation</p>
                  <p>Vous recevrez une confirmation par email dans les 24 heures.</p>
                </div>
                <div>
                  <p className="font-semibold text-orange-600 mb-1">Modificationsannulation</p>
                  <p>Vous pouvez modifier ou annuler jusqu'à 48h avant.</p>
                </div>
                <div>
                  <p className="font-semibold text-orange-600 mb-1">Champs requis</p>
                  <p>Tous les champs marqués avec * sont obligatoires.</p>
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl border-2 border-orange-300 p-6 bg-gradient-to-br from-orange-50 to-red-50">
              <h3 className="text-xl font-bold text-red-900 mb-4">📞 Besoin d'aide?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Contactez-nous directement pour une réservation spéciale.
              </p>
              <a
                href="tel:+330299730000"
                className="text-orange-600 font-semibold hover:underline"
              >
                Appeler le restaurant
              </a>
            </Card>
          </div>
        </div>
      </section>

      <MadeWithDyad />
    </div>
  );
};

export default ReservationPage;
