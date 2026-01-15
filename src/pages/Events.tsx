"use client";

import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";
import restaurantData from "@/data/restaurant-content.json";
import { format, parse } from "date-fns";
import { fr } from "date-fns/locale";

const Events = () => {
  const { events } = restaurantData;

  const upcomingEvents = events.filter((e) => {
    const eventDate = parse(e.date, 'yyyy-MM-dd', new Date());
    return eventDate >= new Date();
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const eventEmojis: { [key: string]: string } = {
    jazz: "🎷",
    concert: "🎸",
    acoustique: "🎵",
    brunch: "🥂",
    dégustation: "🍷",
  };

  const getEventEmoji = (title: string) => {
    const lowerTitle = title.toLowerCase();
    for (const [key, emoji] of Object.entries(eventEmojis)) {
      if (lowerTitle.includes(key)) return emoji;
    }
    return "🎉";
  };

  const EventCard = ({ event }: { event: any }) => {
    const eventDate = parse(event.date, 'yyyy-MM-dd', new Date());
    const formattedDate = format(eventDate, 'dd MMMM yyyy', { locale: fr });
    const formattedDay = format(eventDate, 'EEEE', { locale: fr });

    return (
      <Card className="rounded-3xl border-2 border-amber-200 overflow-hidden hover:shadow-xl transition-all hover:scale-105">
        <div className="h-40 bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 flex items-center justify-center">
          <span className="text-6xl">{getEventEmoji(event.title)}</span>
        </div>
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold text-amber-900 mb-2">{event.title}</h3>
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{formattedDay}</span> {formattedDate}
            </p>
            <p className="text-sm text-orange-600 font-semibold">🕐 {event.time}</p>
          </div>
          <p className="text-gray-700 mb-4">{event.description}</p>
          <Link to="/reservation" className="block">
            <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full">
              Réserver une place
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-16 rounded-b-3xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Nos Événements</h1>
          <p className="text-xl text-pink-50">Concerts, dégustations et moments magiques</p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="container mx-auto px-4 py-16">
        {upcomingEvents.length > 0 ? (
          <div>
            <h2 className="text-3xl font-bold text-amber-900 mb-12 text-center">À Venir</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">Aucun événement prévu pour le moment.</p>
            <p className="text-gray-500">Revenez nous voir bientôt pour découvrir nos prochains événements!</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16 rounded-3xl mx-4 md:mx-0 mb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-amber-900 mb-12 text-center">Pourquoi Nous Rejoindre?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎵</div>
              <h3 className="text-xl font-bold text-amber-900 mb-3">Musique Live</h3>
              <p className="text-gray-700">Profitez de performances musicales en direct dans une ambiance intime</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold text-amber-900 mb-3">Menus Spéciaux</h3>
              <p className="text-gray-700">Dégustez des menus créés spécialement pour chaque événement</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-amber-900 mb-3">Ambiance Festive</h3>
              <p className="text-gray-700">Partagez des moments inoubliables avec famille et amis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16 rounded-3xl mx-4 md:mx-0 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Restez Informé</h2>
          <p className="text-lg mb-8 text-orange-50">Inscrivez-vous pour recevoir nos actualités et événements</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-4 focus:ring-orange-300"
            />
            <Button className="bg-white text-orange-600 hover:bg-orange-50 rounded-full font-bold px-8">
              S'inscrire
            </Button>
          </div>
        </div>
      </section>

      <MadeWithDyad />
    </div>
  );
};

export default Events;
