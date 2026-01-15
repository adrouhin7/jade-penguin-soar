import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center px-4">
          <div className="text-7xl md:text-8xl font-bold text-orange-600 mb-4">404</div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Page non trouvée</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Désolé, la page que vous recherchez n'existe pas. Elle a peut-être été déplacée ou supprimée.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link to="/">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full px-8 py-3">
                Retour à l'accueil
              </Button>
            </Link>
            <Link to="/reservation">
              <Button variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 rounded-full px-8 py-3">
                Réserver une table
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default NotFound;
