import React from 'react';
import { ShoppingBag, PhoneCall } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-left group flex items-center gap-2.5 focus:outline-none whitespace-nowrap shrink-0"
          aria-label="Green Chilly Restaurant Home"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center font-display font-black text-white text-base shadow-sm">
            GC
          </div>
          <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            Green Chilly
          </span>
        </button>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
          <button
            onClick={() => onNavigate('menu')}
            className={`whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors ${
              activeSection === 'menu' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Menu & Order
          </button>
          <button
            onClick={() => onNavigate('reservation')}
            className={`whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors ${
              activeSection === 'reservation' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Book a Table
          </button>
          <button
            onClick={() => onNavigate('rewards')}
            className={`whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors ${
              activeSection === 'rewards' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Rewards Club
          </button>
          <button
            onClick={() => onNavigate('location')}
            className={`whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors ${
              activeSection === 'location' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Location & Hours
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Call Button */}
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Call Restaurant Directly"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">04 885 8802</span>
          </a>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-md transition-all active:scale-95 whitespace-nowrap shrink-0"
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-stone-900 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-stone-900 shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
