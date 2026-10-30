import React from 'react';
import { MapPin, Phone, Clock, Navigation, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Summary */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center font-display font-black text-white text-sm">
                GC
              </div>
              <span className="font-display text-lg font-bold text-white tracking-tight">
                Green Chilly Restaurant
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              Serving Dubai Investments Park with authentic Indian, Pakistani, Indo-Chinese and Arabian dining, charcoal tandoor, and express 30-minute delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              Explore
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Biryani & Rice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Tandoori Grills & Kebabs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Peshawari Karahis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reservation')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Family Table Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rewards')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Chilly Club Rewards
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Delivery */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              Timings & Delivery
            </h4>
            <div className="space-y-1 text-stone-400">
              <p className="flex items-center gap-1.5 text-stone-300">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>6:00 AM – 12:00 AM Midnight</span>
              </p>
              <p>Every single day of the week</p>
              <p className="pt-1 text-emerald-400">
                Free delivery in DIP on orders over AED 50
              </p>
              <p className="text-[11px] text-stone-500">
                Delivering to DIP 1, DIP 2, Dubai South, JVC & Jebel Ali
              </p>
            </div>
          </div>

          {/* Contact & Map */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              Visit Us in DIP 1
            </h4>
            <p className="text-stone-300">
              Ground Floor, Opposite Choithrams, Dubai Investments Park 1, Dubai, UAE.
            </p>
            <div className="pt-1 space-y-1">
              <p>
                Tel: <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-white hover:underline font-semibold">{RESTAURANT_INFO.phone}</a>
              </p>
              <p>
                WhatsApp: <a href="https://wa.me/971508858802" className="text-emerald-400 hover:underline">{RESTAURANT_INFO.whatsapp}</a>
              </p>
            </div>
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline font-medium pt-1"
            >
              <Navigation className="w-3 h-3" />
              <span>Google Maps Link</span>
            </a>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.legalName}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Prepared with passion for the DIP community</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
