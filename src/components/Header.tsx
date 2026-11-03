import React from 'react';
import { Utensils, PhoneCall, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO, AVAILABLE_TABLES } from '../data/restaurantData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  selectedTable: string;
  onSelectTable: (tableId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
  selectedTable,
  onSelectTable,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-left group flex items-center gap-2.5 focus:outline-none whitespace-nowrap shrink-0"
          aria-label="Green Chilly Restaurant Home"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center font-display font-black text-white text-base shadow-sm">
            GC
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors leading-none">
              Green Chilly
            </span>
            <span className="text-[10px] text-stone-400 font-medium tracking-wide">
              DIP 1 · Dubai
            </span>
          </div>
        </button>

        {/* Zone 2: 3 Clear Core Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
          <button
            onClick={() => onNavigate('tableside')}
            className={`whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors ${
              activeSection === 'tableside' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Order on Tableside
          </button>
          <button
            onClick={() => onNavigate('booking')}
            className={`whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors ${
              activeSection === 'booking' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Table Booking
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

        {/* Zone 3: Primary Action (Table Picker + Call + Table Order Button) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Quick Table Selector */}
          <div className="flex items-center gap-1.5 bg-stone-800 border border-stone-700 rounded-lg px-2 py-1.5 text-xs max-w-[130px] sm:max-w-none">
            <Utensils className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <select
              value={selectedTable}
              onChange={(e) => onSelectTable(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer text-xs truncate w-full"
              aria-label="Current Table"
            >
              {AVAILABLE_TABLES.map((t) => (
                <option key={t.id} value={t.id} className="bg-stone-900 text-white">
                  {t.shortLabel || t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Phone Call */}
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Call Restaurant Directly"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>04 885 8802</span>
          </a>

          {/* Table Order Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md transition-all active:scale-95 whitespace-nowrap shrink-0"
            aria-label={`Table Order with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Table Order</span>
            {cartCount > 0 && (
              <span className="bg-amber-400 text-stone-900 text-[10px] sm:text-[11px] font-black w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-stone-900 shadow shrink-0">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
