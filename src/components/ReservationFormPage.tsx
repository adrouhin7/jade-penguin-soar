"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Mail, Phone, Users, Clock } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import api from '@/services/api';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { ErrorBoundary } from './ErrorBoundary';

export const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: undefined as Date | undefined,
    time: '',
    numberOfPeople: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [openSelects, setOpenSelects] = useState({ time: false, people: false });

  const availableTimes = Array.from({ length: 12 }, (_, i) => {
    const hour = 11 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.numberOfPeople) {
      showError("Veuillez remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showError("Veuillez entrer une adresse email valide.");
      setLoading(false);
      return;
    }

    // Validate phone
    if (formData.phone.replace(/\D/g, '').length < 10) {
      showError("Veuillez entrer un numéro de téléphone valide.");
      setLoading(false);
      return;
    }

    try {
      const formattedDate = format(formData.date, 'yyyy-MM-dd');
      const numPeople = parseInt(formData.numberOfPeople, 10);

      if (isNaN(numPeople) || numPeople <= 0 || numPeople > 20) {
        showError("Le nombre de personnes doit être entre 1 et 20.");
        setLoading(false);
        return;
      }

      const reservationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formattedDate,
        time: formData.time,
        numberOfPeople: numPeople,
        message: formData.message,
      };

      console.log('📤 Envoi de la réservation:', reservationData);
      const apiUrl = window.location.hostname.includes('onrender.com')
        ? 'https://o-rubri-backend.onrender.com/api/reservations'
        : 'http://localhost:3001/api/reservations';
      console.log('📍 URL cible:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      });

      const responseData = await response.json();
      console.log('✅ Réponse du serveur (Status:', response.status, '):', responseData);
      
      if (response.status === 201 || response.status === 200) {
        showSuccess(`Réservation confirmée pour ${formData.name}! Un email de confirmation a été envoyé.`);
        // Fermer les Select et réinitialiser
        setOpenSelects({ time: false, people: false });
        // Délai pour s'assurer que les Select sont entièrement fermés et démonté
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            date: undefined,
            time: '',
            numberOfPeople: '',
            message: '',
          });
        }, 300);
      } else {
        showError(responseData.error || responseData.message || 'Erreur serveur');
      }
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'envoi:', error);
      console.error('Stack:', error.stack);
      showError(error.message || "Erreur lors de la réservation. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-amber-900 mb-8">Formulaire de Réservation</h2>

      {/* Name */}
      <div>
        <Label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          <span className="text-orange-600">*</span> Nom
        </Label>
        <Input
          type="text"
          placeholder="Votre nom complet"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="border-2 border-amber-200 rounded-xl focus:border-orange-500 focus:ring-orange-500 placeholder:text-gray-400"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <Label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
            <Mail size={18} className="text-orange-600" />
            <span>
              <span className="text-orange-600">*</span> Email
            </span>
          </Label>
          <Input
            type="email"
            placeholder="votre.email@example.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="border-2 border-amber-200 rounded-xl focus:border-orange-500 focus:ring-orange-500 placeholder:text-gray-400"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <Label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
            <Phone size={18} className="text-orange-600" />
            <span>
              <span className="text-orange-600">*</span> Téléphone
            </span>
          </Label>
          <Input
            type="tel"
            placeholder="+33 (0) 2 99 73 XX XX"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="border-2 border-amber-200 rounded-xl focus:border-orange-500 focus:ring-orange-500 placeholder:text-gray-400"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Date */}
        <div>
          <Label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
            <CalendarIcon size={18} className="text-orange-600" />
            <span>
              <span className="text-orange-600">*</span> Date
            </span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left border-2 border-amber-200 rounded-xl h-10 hover:border-orange-500",
                  !formData.date && "text-muted-foreground"
                )}
              >
                {formData.date ? (
                  format(formData.date, 'dd MMMM yyyy', { locale: fr })
                ) : (
                  "Sélectionner une date"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-3xl" align="start">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => handleChange('date', date)}
                disabled={(date) => date < new Date() || date.getDay() === 0}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time */}
        <div>
          <Label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
            <Clock size={18} className="text-orange-600" />
            <span>
              <span className="text-orange-600">*</span> Heure
            </span>
          </Label>
          <Select
  value={formData.time}
  onValueChange={(value) => handleChange('time', value)}
  open={openSelects.time}
  onOpenChange={(open) =>
    setOpenSelects(prev => ({ ...prev, time: open }))
  }
>
            <SelectTrigger className="border-2 border-amber-200 rounded-xl focus:border-orange-500">
              <SelectValue placeholder="Sélectionner une heure" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {availableTimes.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Number of People */}
        <div>
          <Label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
            <Users size={18} className="text-orange-600" />
            <span>
              <span className="text-orange-600">*</span> Personnes
            </span>
          </Label>
          <Select value={formData.numberOfPeople} onValueChange={(value) => handleChange('numberOfPeople', value)} open={openSelects.people} onOpenChange={(open) => setOpenSelects(prev => ({ ...prev, people: open }))}>
            <SelectTrigger className="border-2 border-amber-200 rounded-xl focus:border-orange-500">
              <SelectValue placeholder="Nombre de personnes" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "personne" : "personnes"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message */}
      <div>
        <Label className="text-gray-700 font-semibold mb-2">Message (Optionnel)</Label>
        <Textarea
          placeholder="Remarques spéciales, régimes alimentaires, occasions particulières..."
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className="border-2 border-amber-200 rounded-xl focus:border-orange-500 focus:ring-orange-500 placeholder:text-gray-400 min-h-[100px]"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-full text-lg disabled:opacity-50"
      >
        {loading ? "Traitement en cours..." : "Confirmer ma Réservation"}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        * Champs obligatoires
      </p>
    </form>
    </ErrorBoundary>
  );
};
