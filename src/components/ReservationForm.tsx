"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import api from '@/services/api';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

interface ReservationFormProps {
  onReservationSuccess?: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onReservationSuccess }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const availableTimes = Array.from({ length: 12 }, (_, i) => {
    const hour = 11 + i; // From 11h to 22h
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !contact || !date || !time || !numberOfPeople) {
      showError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const numPeople = parseInt(numberOfPeople, 10);

      if (isNaN(numPeople) || numPeople <= 0) {
        showError("Number of people must be a positive number.");
        setLoading(false);
        return;
      }

      const response = await api.post('/reserve', {
        name,
        contact,
        date: formattedDate,
        time,
        numberOfPeople: numPeople,
        notes,
      });

      if (response.data.success) {
        showSuccess("Reservation successful!");
        setName('');
        setContact('');
        setDate(undefined);
        setTime('');
        setNumberOfPeople('');
        setNotes('');
        onReservationSuccess?.();
      } else {
        showError(response.data.message || "Failed to make reservation.");
      }
    } catch (error: any) {
      console.error("Reservation error:", error);
      showError(error.response?.data?.message || "An error occurred during reservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Book a Table</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required />
          </div>
          <div>
            <Label htmlFor="contact">Phone or Email</Label>
            <Input id="contact" type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Phone or Email" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Select value={time} onValueChange={setTime} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="numberOfPeople">Number of People</Label>
            <Input id="numberOfPeople" type="number" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} placeholder="e.g., 4" min="1" required />
          </div>
          <div>
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special requests?" />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReservationForm;