import React from 'react';
import { ArrowRight, MapPin, Clock, Star, Flame } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onBookTable }) => {
  return (
    <section id="hero" className="relative pt-6 pb-14 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-950/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unboxed Metadata Kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-stone-400 mb-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <MapPin className="w-4 h-4" />
            Dubai Investments Park 1
          </span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>Opposite Choithrams</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            4.5 (580+ Google Reviews)
          </span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="text-stone-300">Open 6:00 AM – Midnight</span>
        </div>

        {/* 2-Column Split: Hero Content & Visual Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-display text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
              Royal Dum Biryanis, Sizzling Tandoor & Wok Karahis in DIP
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
              Welcome to <strong className="text-emerald-400 font-semibold">Green Chilly Restaurant</strong>, Dubai Investments Park’s premier destination for rich multi-cuisine delicacies. From fragrant Hyderabadi biryanis and Peshawari clay wok karahis to fresh tandoori platters and signature Zafran Karak chai.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-950/50 flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap"
              >
                <span>Order Online Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBookTable}
                className="px-5 py-3.5 text-sm font-semibold text-stone-200 bg-stone-800/90 hover:bg-stone-700/90 border border-stone-700 rounded-xl transition-all active:scale-95 whitespace-nowrap"
              >
                Reserve a Table
              </button>
            </div>

            {/* Quick Delivery Tag */}
            <div className="pt-2 text-xs text-stone-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Express 30–40 min delivery across DIP 1 & 2, Dubai South, JVC & Jebel Ali</span>
            </div>
          </div>

          {/* Right Column: High-Res Real Food Photography (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-700/80 shadow-2xl bg-stone-800 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group">
              <img
                src="/src/assets/images/hero_green_chilly_spread_1793283670265.jpg"
                alt="Green Chilly Restaurant Signature Feast with Dum Biryani, Tandoori Skewers and Fresh Naan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom badge overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <div className="bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-700/80">
                  <span className="text-amber-400 font-semibold">Chef Recommends: </span>
                  <span>Royal Dum Biryani & Tandoor</span>
                </div>
                <div className="bg-emerald-950/90 backdrop-blur-md text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-800/80 font-medium">
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
            <p className="text-xs text-stone-400">Based on 580+ Google Reviews in DIP</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-800/50 border border-stone-800">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="font-display font-bold text-lg text-white">6 AM – 12 AM</span>
            </div>
            <p className="text-xs text-stone-400">Breakfast, Lunch, Dinner & Late-night</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-800/50 border border-stone-800">
            <div className="flex items-center gap-2 text-rose-400 mb-1">
              <Flame className="w-4 h-4" />
              <span className="font-display font-bold text-lg text-white">100% Fresh Tandoor</span>
            </div>
            <p className="text-xs text-stone-400">Live charcoal tandoori meats & fresh rotis</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-800/50 border border-stone-800">
            <div className="flex items-center gap-2 text-sky-400 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="font-display font-bold text-lg text-white">Free DIP Delivery</span>
            </div>
            <p className="text-xs text-stone-400">On all orders over AED 50</p>
          </div>
        </div>

      </div>
    </section>
  );
};
