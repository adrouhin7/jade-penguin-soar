"use client";

import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MadeWithDyad } from "@/components/made-with-dyad";
import restaurantData from "@/data/restaurant-content.json";

const Menu = () => {
  const { menu } = restaurantData;

  const sections = [
    { id: "entrees", label: "Entrées", icon: "🥗", color: "from-green-400 to-emerald-600" },
    { id: "plats", label: "Plats Principaux", icon: "🍽️", color: "from-orange-400 to-red-600" },
    { id: "desserts", label: "Desserts", icon: "🍰", color: "from-pink-400 to-rose-600" },
    { id: "boissons", label: "Boissons", icon: "🍷", color: "from-purple-400 to-indigo-600" },
  ];

  const MenuItem = ({ item }: { item: any }) => (
    <Card className="rounded-3xl border-2 border-amber-200 hover:shadow-xl transition-all hover:scale-102">
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold text-amber-900 mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-orange-600">{item.price}€</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 text-white py-16 rounded-b-3xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Notre Menu</h1>
          <p className="text-xl text-amber-50">Des saveurs authentiques et généreuses</p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="container mx-auto px-4 py-16">
        <Tabs defaultValue="entrees" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 rounded-3xl bg-gradient-to-r from-amber-100 to-orange-100 p-2 mb-12">
            {sections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="rounded-2xl font-semibold data-[state=active]:bg-white data-[state=active]:text-orange-600"
              >
                <span className="mr-2">{section.icon}</span>
                <span className="hidden sm:inline">{section.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Entrées */}
          <TabsContent value="entrees">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="text-4xl">🥗</div>
                <h2 className="text-4xl font-bold text-amber-900">Entrées</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {menu.entrees.map((item, idx) => (
                  <MenuItem key={idx} item={item} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Plats */}
          <TabsContent value="plats">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="text-4xl">🍽️</div>
                <h2 className="text-4xl font-bold text-amber-900">Plats Principaux</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {menu.plats.map((item, idx) => (
                  <MenuItem key={idx} item={item} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Desserts */}
          <TabsContent value="desserts">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="text-4xl">🍰</div>
                <h2 className="text-4xl font-bold text-amber-900">Desserts</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {menu.desserts.map((item, idx) => (
                  <MenuItem key={idx} item={item} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Boissons */}
          <TabsContent value="boissons">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="text-4xl">🍷</div>
                <h2 className="text-4xl font-bold text-amber-900">Boissons</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {menu.boissons.map((item, idx) => (
                  <MenuItem key={idx} item={item} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16 rounded-3xl mx-4 md:mx-0 mb-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl mb-4">👨‍🍳</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Cuisine Maison</h3>
              <p className="text-gray-700">Tous nos plats sont préparés avec des produits frais et locaux.</p>
            </div>
            <div>
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Produits de Qualité</h3>
              <p className="text-gray-700">Nous privilégions les circuits courts et les producteurs locaux.</p>
            </div>
            <div>
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Fait avec Amour</h3>
              <p className="text-gray-700">Chaque plat est préparé avec passion pour votre satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      <MadeWithDyad />
    </div>
  );
};

export default Menu;
