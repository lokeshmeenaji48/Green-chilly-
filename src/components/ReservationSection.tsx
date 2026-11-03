import React, { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { TableReservation } from '../types';
import { validateReservationForm } from '../utils/orderCalculations';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const ReservationSection: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('19:30');
  const [guestsCount, setGuestsCount] = useState(4);
  const [seatingZone, setSeatingZone] = useState<'family' | 'main' | 'terrace'>('family');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [confirmedBooking, setConfirmedBooking] = useState<TableReservation | null>(null);
  const [formError, setFormError] = useState('');

  const timeSlots = [
    '12:30', '13:00', '13:30', '14:00', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const validation = validateReservationForm({
      guestName,
      phone,
      date,
      timeSlot,
      guestsCount,
    });

    if (!validation.isValid) {
      setFormError(validation.error || 'Please fill in all required fields.');
      return;
    }

    const booking: TableReservation = {
      id: `TBL-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName,
      phone,
      email,
      date,
      timeSlot,
      guestsCount,
      seatingZone,
      specialRequests: specialRequests.trim() || undefined,
      status: 'confirmed',
    };

    setConfirmedBooking(booking);
  };

  return (
    <section id="booking" className="py-16 bg-stone-900/60 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <span>Dine-In & Gathering</span>
            <span aria-hidden="true">·</span>
            <span>Family Dining Available</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Reserve a Table at Green Chilly DIP
          </h2>
          <p className="text-sm text-stone-400 max-w-xl mx-auto">
            Enjoy warm hospitality, private family cabins, or outdoor evening dining opposite Choithrams in Dubai Investments Park 1.
          </p>
        </div>

        {confirmedBooking ? (
          <div className="max-w-xl mx-auto bg-stone-800/80 border border-emerald-500/50 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-2xl animate-fade-in">
            <div className="w-14 h-14 bg-emerald-950 rounded-full flex items-center justify-center mx-auto border border-emerald-600">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Booking Confirmed
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                We Look Forward to Welcoming You!
              </h3>
              <p className="text-xs text-stone-400">
                Reservation Pass #{confirmedBooking.id}
              </p>
            </div>

            {/* Pass details */}
            <div className="bg-stone-900/90 rounded-xl p-4 border border-stone-700/60 grid grid-cols-2 gap-3 text-left text-xs">
              <div>
                <span className="text-stone-400 block text-[11px]">Primary Guest</span>
                <span className="font-semibold text-white">{confirmedBooking.guestName}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Contact Number</span>
                <span className="font-semibold text-white">{confirmedBooking.phone}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Date & Time</span>
                <span className="font-semibold text-white">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Party Size & Zone</span>
                <span className="font-semibold text-white capitalize">{confirmedBooking.guestsCount} Guests ({confirmedBooking.seatingZone} Hall)</span>
              </div>
            </div>

            <p className="text-xs text-stone-400">
              A confirmation SMS has been prepared. Need directions or to adjust your time? Call us anytime at <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-emerald-400 underline font-semibold">04 885 8802</a>.
            </p>

            <button
              onClick={() => setConfirmedBooking(null)}
              className="px-6 py-2.5 bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-semibold rounded-xl transition-colors"
            >
              Book Another Table
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-stone-800/40 border border-stone-700/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Guest Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fatima Al Zarooni"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Phone Number (UAE) *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 050 885 8802"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Reservation Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Time Slot *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot} {parseInt(slot.split(':')[0]) >= 12 ? 'PM' : 'AM'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Number of Guests *
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Seating preference */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-2">
                Seating Section Preference:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {[
                  { id: 'family', label: 'Family Section', sub: 'Partitioned privacy' },
                  { id: 'main', label: 'Main Dining Hall', sub: 'Lively atmosphere' },
                  { id: 'terrace', label: 'Outdoor Terrace', sub: 'Open air breeze' },
                ].map((zone) => (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setSeatingZone(zone.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      seatingZone === zone.id
                        ? 'bg-emerald-950/60 border-emerald-500 text-white'
                        : 'bg-stone-900/60 border-stone-700 text-stone-400 hover:border-stone-600'
                    }`}
                  >
                    <p className="text-xs font-bold">{zone.label}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{zone.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Special Requests or Dietary Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Birthday celebration, high chair needed, corner booth"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {formError && (
              <p className="text-xs text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-950/40 transition-all active:scale-95"
            >
              Confirm Table Reservation
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
