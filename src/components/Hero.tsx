import React from 'react';
import { ArrowRight, MapPin, Clock, Star, Flame, Utensils, Calendar } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import heroSpreadImg from '../assets/images/hero_green_chilly_spread_1793283670265.jpg';

interface HeroProps {
  onGoToTableside: () => void;
  onGoToBooking: () => void;
  selectedTableLabel: string;
}

export const Hero: React.FC<HeroProps> = ({ onGoToTableside, onGoToBooking, selectedTableLabel }) => {
  return (
    <section id="hero" className="relative pt-4 sm:pt-6 pb-10 sm:pb-14 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-950/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unboxed Metadata Kicker */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-stone-400 mb-3 sm:mb-4">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Dubai Investments Park 1</span>
          </span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>Opposite Choithrams</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="flex items-center gap-1 text-amber-400">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span>4.5 (580+ Reviews)</span>
          </span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="text-stone-300">Open 6 AM – Midnight</span>
        </div>

        {/* 2-Column Split: Hero Content & Visual Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Authentic Multi-Cuisine Feast at Green Chilly DIP
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-stone-300 max-w-2xl leading-relaxed">
              Welcome to <strong className="text-emerald-400 font-semibold">Green Chilly Restaurant</strong>, situated in Dubai Investments Park 1 right opposite Choithrams. Experience authentic Hyderabadi Dum Biryani, char-grilled tandoori platters, Peshawari wok karahis, and Zafran Karak chai with seamless <strong>Tableside QR Ordering</strong> and instant <strong>Table Reservations</strong>.
            </p>

            {/* Core Action Buttons: Tableside Order & Table Booking */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2">
              <button
                onClick={onGoToTableside}
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Utensils className="w-4 h-4 shrink-0" />
                <span>Order on Tableside ({selectedTableLabel.split(' ')[0]} {selectedTableLabel.split(' ')[1] || ''})</span>
                <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
              </button>

              <button
                onClick={onGoToBooking}
                className="w-full sm:w-auto px-5 py-3.5 text-xs sm:text-sm font-semibold text-stone-200 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Book a Table in Advance</span>
              </button>
            </div>

            {/* Tableside Fast Note */}
            <div className="pt-1 text-xs text-stone-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Sitting at a table? Select your table number to send your order straight to the kitchen.</span>
            </div>
          </div>

          {/* Right Column: Unique Feast Spread Photography (5 cols on lg) */}
          <div className="lg:col-span-5 relative mt-2 sm:mt-0">
            <div className="relative rounded-2xl overflow-hidden border border-stone-700/80 shadow-2xl bg-stone-800 aspect-[16/10] sm:aspect-[16/10] lg:aspect-[4/3] group">
              <img
                src={heroSpreadImg}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/hero_green_chilly_spread_1793283670265.jpg';
                }}
                alt="Green Chilly Restaurant Signature Feast with Dum Biryani, Tandoori Skewers and Fresh Naan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom badge overlay */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-[11px] sm:text-xs text-white">
                <div className="bg-stone-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-stone-700/80 truncate mr-2">
                  <span className="text-amber-400 font-semibold">Dine-In Special: </span>
                  <span className="hidden sm:inline">Charcoal Tandoor & Wok Karahi</span>
                  <span className="sm:hidden">Tandoor & Karahi</span>
                </div>
                <div className="bg-emerald-950/90 backdrop-blur-md text-emerald-300 px-2.5 py-1.5 rounded-lg border border-emerald-800/80 font-medium shrink-0">
                  Halal Certified
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Proof & Highlights Strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-stone-800">
          <div className="p-4 rounded-xl bg-stone-800/50 border border-stone-800">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="font-display font-bold text-lg text-white">4.5 / 5.0</span>
            </div>
            <p className="text-xs text-stone-400">580+ Google Reviews in DIP 1</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-800/50 border border-stone-800">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="font-display font-bold text-lg text-white">6 AM – 12 AM</span>
            </div>
            <p className="text-xs text-stone-400">Breakfast, Lunch, Dinner & Supper</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-800/50 border border-stone-800">
            <div className="flex items-center gap-2 text-rose-400 mb-1">
              <Flame className="w-4 h-4" />
              <span className="font-display font-bold text-lg text-white">Live Kitchen KOT</span>
            </div>
            <p className="text-xs text-stone-400">Direct tableside kitchen ticket dispatch</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-800/50 border border-stone-800">
            <div className="flex items-center gap-2 text-sky-400 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="font-display font-bold text-lg text-white">Opposite Choithrams</span>
            </div>
            <p className="text-xs text-stone-400">Convenient parking & metro access</p>
          </div>
        </div>

      </div>
    </section>
  );
};
