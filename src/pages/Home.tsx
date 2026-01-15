"use client";

import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import restaurantData from "@/data/restaurant-content.json";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Home = () => {
  const { restaurant, hours, contact, ambiance, events } = restaurantData;

  const getHoursDisplay = () => {
    const today = new Date();
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const todayKey = days[today.getDay()];
    const todayHours = hours[todayKey as keyof typeof hours];
    return `${todayHours.open} - ${todayHours.close}`;
  };

  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 text-white py-20 rounded-b-3xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">{restaurant.name}</h1>
          <p className="text-2xl md:text-3xl font-light mb-4 text-amber-100">{restaurant.tagline}</p>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-100">{restaurant.description}</p>
          <Link to="/reservation">
            <Button className="bg-white text-orange-600 hover:bg-amber-50 text-lg px-8 py-6 rounded-full font-bold shadow-lg">
              Réserver une Table
            </Button>
          </Link>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Hours Card */}
          <Card className="rounded-3xl border-2 border-amber-200 hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-t-3xl">
              <div className="flex items-center gap-2">
                <Clock className="text-orange-600" size={28} />
                <CardTitle className="text-amber-900">Horaires</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-lg font-semibold text-orange-600 mb-3">Aujourd'hui</p>
              <p className="text-gray-700 font-medium">{getHoursDisplay()}</p>
              <div className="mt-4 pt-4 border-t-2 border-amber-100">
                <p className="text-sm text-gray-600 mt-3">Lun-Jeu: 11:30 - 22:00</p>
                <p className="text-sm text-gray-600">Ven-Sam: 11:30 - 23:00</p>
                <p className="text-sm text-gray-600">Dim: 12:00 - 21:00</p>
              </div>
            </CardContent>
          </Card>

          {/* Location Card */}
          <Card className="rounded-3xl border-2 border-amber-200 hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-t-3xl">
              <div className="flex items-center gap-2">
                <MapPin className="text-orange-600" size={28} />
                <CardTitle className="text-amber-900">Localisation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-lg font-semibold text-orange-600 mb-3">{restaurant.location}</p>
              <p className="text-gray-700">{contact.address}</p>
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="w-full rounded-full border-2 border-orange-400 text-orange-600 hover:bg-orange-50 mt-3"
                >
                  Voir la carte
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card className="rounded-3xl border-2 border-amber-200 hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-t-3xl">
              <div className="flex items-center gap-2">
                <Phone className="text-orange-600" size={28} />
                <CardTitle className="text-amber-900">Nous Contacter</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-orange-600" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-gray-700 hover:text-orange-600 font-medium"
                  >
                    {contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-orange-600" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-gray-700 hover:text-orange-600 font-medium break-all"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ambiance Section */}
      <section className="bg-gradient-to-r from-orange-50 to-amber-50 py-16 rounded-3xl mx-4 md:mx-0">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-amber-900 mb-6">Notre Ambiance</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{ambiance}</p>
            <div className="mt-8 inline-flex gap-6 flex-wrap justify-center">
              <div className="bg-white rounded-3xl px-6 py-3 shadow-md">
                <span className="text-amber-900 font-semibold">🍷 Fine Cuisine</span>
              </div>
              <div className="bg-white rounded-3xl px-6 py-3 shadow-md">
                <span className="text-amber-900 font-semibold">🎵 Concerts</span>
              </div>
              <div className="bg-white rounded-3xl px-6 py-3 shadow-md">
                <span className="text-amber-900 font-semibold">👨‍👩‍👧‍👦 En Famille</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-amber-900 mb-12 text-center">Événements à Venir</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {upcomingEvents.map((event) => (
            <Card
              key={event.id}
              className="rounded-3xl border-2 border-amber-200 overflow-hidden hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="h-48 bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center">
                <div className="text-6xl">🎵</div>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{event.date} à {event.time}</p>
                <p className="text-gray-700 mb-4">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Link to="/events">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full px-8 py-3">
              Voir tous les événements
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-900 to-orange-800 text-white py-16 rounded-3xl mx-4 md:mx-0 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à nous visiter?</h2>
          <p className="text-lg mb-8 text-amber-50">Réservez votre table dès maintenant et découvrez nos délices culinaires</p>
          <Link to="/reservation">
            <Button className="bg-white text-orange-600 hover:bg-amber-50 text-lg px-8 py-6 rounded-full font-bold">
              Réserver Maintenant
            </Button>
          </Link>
        </div>
      </section>

      <MadeWithDyad />
    </div>
  );
};

export default Home;
