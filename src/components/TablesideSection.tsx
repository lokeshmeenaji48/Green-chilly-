import React, { useState, useMemo } from 'react';
import {
  Search,
  Flame,
  Leaf,
  Plus,
  Star,
  X,
  Check,
  Utensils,
  BellRing,
  GlassWater,
  Receipt,
  Sparkles
} from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS, AVAILABLE_TABLES } from '../data/restaurantData';

interface TablesideSectionProps {
  selectedTable: string;
  onSelectTable: (tableId: string) => void;
  onAddToCart: (item: CartItem) => void;
  onRequestService: (serviceType: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Dishes' },
  { id: 'biryani', label: 'Biryani & Rice' },
  { id: 'tandoor', label: 'Tandoor & Grills' },
  { id: 'curry', label: 'Curries & Karahi' },
  { id: 'arabic', label: 'Arabic Grills' },
  { id: 'chinese', label: 'Indo-Chinese' },
  { id: 'breakfast', label: 'Breakfast Dosas' },
  { id: 'beverages', label: 'Karak & Drinks' },
];

export const TablesideSection: React.FC<TablesideSectionProps> = ({
  selectedTable,
  onSelectTable,
  onAddToCart,
  onRequestService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'spicy' | 'popular'>('all');
  
  // Customization modal state
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedSpice, setSelectedSpice] = useState<string>('Medium');
  const [selectedAddOns, setSelectedAddOns] = useState<{ name: string; price: number }[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  const availableAddOns = [
    { name: 'Fresh Mint Raita', price: 3 },
    { name: 'Hot Butter Naan', price: 4 },
    { name: 'Zafran Karak Chai', price: 4 },
    { name: 'Extra Green Chilly & Lemons', price: 2 },
  ];

  const currentTableObj = AVAILABLE_TABLES.find((t) => t.id === selectedTable) || AVAILABLE_TABLES[0];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }
      if (dietaryFilter === 'veg' && !item.isVegetarian) return false;
      if (dietaryFilter === 'spicy' && !item.isSpicy) return false;
      if (dietaryFilter === 'popular' && !item.isPopular) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, dietaryFilter]);

  const handleOpenCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setSelectedSpice(item.spiceLevel || 'Medium');
    setSelectedAddOns([]);
    setSpecialInstructions('');
    setQuantity(1);
  };

  const handleToggleAddOn = (addon: { name: string; price: number }) => {
    setSelectedAddOns((prev) => {
      const exists = prev.some((a) => a.name === addon.name);
      if (exists) {
        return prev.filter((a) => a.name !== addon.name);
      } else {
        return [...prev, addon];
      }
    });
  };

  const handleConfirmAddToCart = () => {
    if (!customizingItem) return;
    const cartItemId = `${customizingItem.id}-${selectedSpice}-${selectedAddOns.map((a) => a.name).join('_')}`;
    const cartItem: CartItem = {
      id: cartItemId,
      menuItem: customizingItem,
      quantity,
      selectedSpice,
      selectedAddOns,
      specialInstructions: specialInstructions.trim() || undefined,
    };
    onAddToCart(cartItem);
    setCustomizingItem(null);
  };

  return (
    <section id="tableside" className="py-14 bg-stone-900 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Table Identification Banner */}
        <div className="bg-stone-800/80 border border-stone-700 rounded-2xl p-5 sm:p-6 mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <Utensils className="w-3.5 h-3.5" />
                <span>Order on Tableside</span>
                <span aria-hidden="true">·</span>
                <span>Direct Kitchen Ticket (KOT)</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Tableside Menu & Direct Kitchen Ordering
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
                Seated inside Green Chilly? Choose your table or family cabin to order fresh food straight from your phone to our kitchen chefs.
              </p>
            </div>

            {/* Active Table Selector & Instant Waiter Call Affordances */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
              <div className="bg-stone-900 border border-emerald-600/70 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2.5 sm:gap-3 shadow-md w-full sm:w-auto">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <div className="w-full">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                    Current Seating:
                  </span>
                  <select
                    value={selectedTable}
                    onChange={(e) => onSelectTable(e.target.value)}
                    className="bg-transparent text-white font-display font-bold text-xs sm:text-sm focus:outline-none cursor-pointer w-full"
                  >
                    {AVAILABLE_TABLES.map((table) => (
                      <option key={table.id} value={table.id} className="bg-stone-900 text-white">
                        {table.label} ({table.zone})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Instant Waiter Call Affordances */}
              <div className="grid grid-cols-3 sm:flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onRequestService(`Waiter called to ${currentTableObj.label}`)}
                  className="px-2.5 sm:px-3 py-2 bg-stone-700/80 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-600 flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
                  title="Call Waiter to Table"
                >
                  <BellRing className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => onRequestService(`Drinking water requested for ${currentTableObj.label}`)}
                  className="px-2.5 sm:px-3 py-2 bg-stone-700/80 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-600 flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
                  title="Request Drinking Water"
                >
                  <GlassWater className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Water</span>
                </button>

                <button
                  type="button"
                  onClick={() => onRequestService(`Bill requested for ${currentTableObj.label}`)}
                  className="px-2.5 sm:px-3 py-2 bg-stone-700/80 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-600 flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
                  title="Request Bill at Table"
                >
                  <Receipt className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Bill</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Search & Categories */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-stone-800/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-800/80 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Dietary Filters */}
        <div className="flex items-center gap-2 text-xs mb-8">
          <span className="text-stone-500 font-medium mr-1">Filter:</span>
          <button
            onClick={() => setDietaryFilter('all')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              dietaryFilter === 'all'
                ? 'bg-stone-700 text-white font-medium'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setDietaryFilter('popular')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
              dietaryFilter === 'popular'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60 font-medium'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Star className="w-3 h-3 text-amber-400" />
            <span>Chef's Bestsellers</span>
          </button>
          <button
            onClick={() => setDietaryFilter('veg')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
              dietaryFilter === 'veg'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-medium'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Leaf className="w-3 h-3 text-emerald-400" />
            <span>Pure Veg</span>
          </button>
          <button
            onClick={() => setDietaryFilter('spicy')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
              dietaryFilter === 'spicy'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60 font-medium'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Flame className="w-3 h-3 text-rose-400" />
            <span>Spicy Dishes</span>
          </button>
        </div>

        {/* Menu Grid - With ZERO Duplicate Images */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-stone-800/30 rounded-2xl border border-stone-800">
            <p className="text-stone-400 text-sm">No dishes found matching your current filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="mt-3 px-4 py-2 text-xs font-semibold text-emerald-400 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const hasUniquePhoto = Boolean(item.image);

              return (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between bg-stone-800/60 hover:bg-stone-800 border border-stone-700/60 hover:border-stone-600 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <div>
                    {/* Top Media: Dedicated Unique Image OR Culinary Typography Badge */}
                    {hasUniquePhoto ? (
                      <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                        <img
                          src={item.image}
                          onError={(e) => {
                            if (item.image) {
                              const filename = item.image.split('/').pop();
                              (e.currentTarget as HTMLImageElement).src = `/images/${filename}`;
                            }
                          }}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          {item.isPopular && (
                            <span className="bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                              Bestseller
                            </span>
                          )}
                          {item.isVegetarian && (
                            <span className="bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow">
                              <Leaf className="w-2.5 h-2.5" />
                              Veg
                            </span>
                          )}
                          {item.isSpicy && (
                            <span className="bg-rose-900/90 text-rose-200 border border-rose-700/60 text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-sm">
                              <Flame className="w-2.5 h-2.5 text-rose-400" />
                              {item.spiceLevel || 'Spicy'}
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-3 right-3 bg-stone-900/90 backdrop-blur-md px-2 py-1 rounded text-[11px] font-medium text-stone-300">
                          {item.prepTime}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-stone-800/90 border-b border-stone-700/60 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-emerald-400 font-bold text-xs">
                            {item.category.slice(0, 2).toUpperCase()}
                          </span>
                          <span className="text-xs uppercase font-bold tracking-wider text-stone-400">
                            {item.category} Special
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {item.isVegetarian && (
                            <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded">
                              Veg
                            </span>
                          )}
                          {item.isSpicy && (
                            <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-semibold px-2 py-0.5 rounded">
                              {item.spiceLevel || 'Spicy'}
                            </span>
                          )}
                          <span className="text-[11px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded">
                            {item.prepTime}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Dish Details */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-display font-semibold text-base sm:text-lg text-white group-hover:text-emerald-300 transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-display font-bold text-base sm:text-lg text-emerald-400 tabular-nums shrink-0">
                          AED {item.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-3">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-semibold">{item.rating}</span>
                        </div>
                        <span aria-hidden="true" className="text-stone-600">·</span>
                        <span>{item.reviewCount} reviews</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                    <button
                      onClick={() => handleOpenCustomize(item)}
                      className="w-full py-2.5 px-4 bg-stone-700 hover:bg-emerald-600 text-stone-200 hover:text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Customize & Add to Table</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Item Customization Modal / Bottom Sheet */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-stone-900 border-t sm:border border-stone-700 rounded-t-3xl sm:rounded-2xl w-full max-w-lg max-h-[82vh] sm:max-h-[88vh] flex flex-col shadow-2xl overflow-hidden pb-safe">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-stone-800 flex items-start justify-between gap-3 shrink-0">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Tableside Options · {currentTableObj.shortLabel || currentTableObj.label}
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-0.5">
                  {customizingItem.name}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-400 font-semibold tabular-nums mt-0.5">
                  Base Price: AED {customizingItem.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
              {/* Spice Level Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                  Choose Spice Level:
                </label>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {['Mild', 'Medium', 'Hot', 'Extra Hot'].map((spice) => (
                    <button
                      key={spice}
                      type="button"
                      onClick={() => setSelectedSpice(spice)}
                      className={`py-2 px-1 sm:px-2 text-[11px] sm:text-xs font-medium rounded-lg border text-center transition-all ${
                        selectedSpice === spice
                          ? 'bg-rose-950/80 border-rose-600 text-rose-200'
                          : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      {spice}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tableside Sides & Add-ons */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                  Add Sides to Table:
                </label>
                <div className="space-y-2">
                  {availableAddOns.map((addon) => {
                    const isChecked = selectedAddOns.some((a) => a.name === addon.name);
                    return (
                      <button
                        key={addon.name}
                        type="button"
                        onClick={() => handleToggleAddOn(addon)}
                        className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                          isChecked
                            ? 'bg-emerald-950/40 border-emerald-600/80 text-white'
                            : 'bg-stone-800/50 border-stone-700/80 text-stone-300 hover:border-stone-600'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isChecked
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-stone-600'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-xs font-medium">{addon.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-400 tabular-nums">
                          +AED {addon.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Instructions for Kitchen */}
              <div>
                <label htmlFor="instructions" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  Kitchen Cooking Instructions:
                </label>
                <input
                  id="instructions"
                  type="text"
                  placeholder="e.g. Less oil, extra lime, separate green chillies"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="p-3 sm:p-4 border-t border-stone-800 bg-stone-900/95 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center border border-stone-700 rounded-xl bg-stone-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-stone-300 hover:text-white font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-2.5 py-2 text-xs font-bold text-white tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-stone-300 hover:text-white font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleConfirmAddToCart}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all active:scale-95 flex items-center justify-between shadow-lg"
              >
                <span>Add to Table Order</span>
                <span className="tabular-nums font-bold">
                  AED {((customizingItem.price + selectedAddOns.reduce((acc, c) => acc + c.price, 0)) * quantity).toFixed(2)}
                </span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
