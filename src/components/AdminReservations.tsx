"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import api from '@/services/api';
import { showSuccess, showError } from '@/utils/toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from '@/lib/utils';

interface Reservation {
  id: string;
  name: string;
  contact: string;
  date: string;
  time: string;
  numberOfPeople: number;
  notes?: string;
}

interface AdminReservationsProps {
  refreshTrigger: number;
}

const AdminReservations: React.FC<AdminReservationsProps> = ({ refreshTrigger }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    contact: '',
    date: undefined as Date | undefined,
    time: '',
    numberOfPeople: '',
    notes: '',
  });

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await api.get('/reservations');
      if (response.data.success) {
        // Sort reservations by date and time
        const sortedReservations = response.data.reservations.sort((a: Reservation, b: Reservation) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA.getTime() - dateB.getTime();
        });
        setReservations(sortedReservations);
      } else {
        showError(response.data.message || "Failed to fetch reservations.");
      }
    } catch (error: any) {
      console.error("Fetch reservations error:", error);
      showError(error.response?.data?.message || "An error occurred while fetching reservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [refreshTrigger]);

  const handleCancelReservation = async (id: string) => {
    try {
      const response = await api.delete(`/cancel/${id}`);
      if (response.data.success) {
        showSuccess("Reservation cancelled successfully!");
        fetchReservations();
      } else {
        showError(response.data.message || "Failed to cancel reservation.");
      }
    } catch (error: any) {
      console.error("Cancel reservation error:", error);
      showError(error.response?.data?.message || "An error occurred during cancellation.");
    }
  };

  const handleEditClick = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setEditForm({
      name: reservation.name,
      contact: reservation.contact,
      date: new Date(reservation.date),
      time: reservation.time,
      numberOfPeople: reservation.numberOfPeople.toString(),
      notes: reservation.notes || '',
    });
  };

  const handleEditFormChange = (field: string, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateReservation = async () => {
    if (!editingReservation) return;

    const { name, contact, date, time, numberOfPeople, notes } = editForm;

    if (!name || !contact || !date || !time || !numberOfPeople) {
      showError("Please fill in all required fields for the update.");
      return;
    }

    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const numPeople = parseInt(numberOfPeople, 10);

      if (isNaN(numPeople) || numPeople <= 0) {
        showError("Number of people must be a positive number.");
        return;
      }

      const response = await api.put(`/reserve/${editingReservation.id}`, {
        name,
        contact,
        date: formattedDate,
        time,
        numberOfPeople: numPeople,
        notes,
      });

      if (response.data.success) {
        showSuccess("Reservation updated successfully!");
        setEditingReservation(null);
        fetchReservations();
      } else {
        showError(response.data.message || "Failed to update reservation.");
      }
    } catch (error: any) {
      console.error("Update reservation error:", error);
      showError(error.response?.data?.message || "An error occurred during update.");
    }
  };

  const availableTimes = Array.from({ length: 12 }, (_, i) => {
    const hour = 11 + i; // From 11h to 22h
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Upcoming Reservations</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center">Loading reservations...</p>
        ) : reservations.length === 0 ? (
          <p className="text-center">No upcoming reservations.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">{reservation.name}</TableCell>
                    <TableCell>{reservation.contact}</TableCell>
                    <TableCell>{format(new Date(reservation.date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{reservation.time}</TableCell>
                    <TableCell>{reservation.numberOfPeople}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{reservation.notes || '-'}</TableCell>
                    <TableCell className="text-right flex justify-end space-x-2">
                      <Dialog open={editingReservation?.id === reservation.id} onOpenChange={(open) => !open && setEditingReservation(null)}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => handleEditClick(reservation)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Reservation</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-name" className="text-right">Name</Label>
                              <Input id="edit-name" value={editForm.name} onChange={(e) => handleEditFormChange('name', e.target.value)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-contact" className="text-right">Contact</Label>
                              <Input id="edit-contact" value={editForm.contact} onChange={(e) => handleEditFormChange('contact', e.target.value)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-date" className="text-right">Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "col-span-3 justify-start text-left font-normal",
                                      !editForm.date && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {editForm.date ? format(editForm.date, "PPP") : <span>Pick a date</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={editForm.date}
                                    onSelect={(date) => handleEditFormChange('date', date)}
                                    initialFocus
                                    disabled={(date) => date < new Date()}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-time" className="text-right">Time</Label>
                              <Select value={editForm.time} onValueChange={(value) => handleEditFormChange('time', value)}>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableTimes.map((t) => (
                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-num-people" className="text-right">Guests</Label>
                              <Input id="edit-num-people" type="number" value={editForm.numberOfPeople} onChange={(e) => handleEditFormChange('numberOfPeople', e.target.value)} className="col-span-3" min="1" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-notes" className="text-right">Notes</Label>
                              <Textarea id="edit-notes" value={editForm.notes} onChange={(e) => handleEditFormChange('notes', e.target.value)} className="col-span-3" />
                            </div>
                          </div>
                          <Button onClick={handleUpdateReservation}>Save changes</Button>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the reservation.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleCancelReservation(reservation.id)}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminReservations;