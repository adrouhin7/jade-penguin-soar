import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: "/", label: "Accueil" },
    { path: "/menu", label: "Menu" },
    { path: "/reservation", label: "Réservation" },
    { path: "/events", label: "Événements" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-amber-800 to-amber-900 text-white shadow-lg rounded-b-3xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              O'Rubri
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:text-amber-300 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/reservation">
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-full px-6">
                Réserver
              </Button>
            </Link>
          </div>

          {/* Menu Mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-amber-300 transition-colors font-medium block py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/reservation" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 rounded-full">
                Réserver
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
