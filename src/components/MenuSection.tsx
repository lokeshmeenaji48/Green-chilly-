import React, { useState, useMemo } from 'react';
import { Search, Flame, Leaf, Plus, Star, X, Check } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../data/restaurantData';

interface MenuSectionProps {
  onAddToCart: (item: CartItem) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'biryani', label: 'Biryani & Rice' },
  { id: 'tandoor', label: 'Tandoor & Grills' },
  { id: 'curry', label: 'Curries & Karahi' },
  { id: 'chinese', label: 'Indo-Chinese' },
  { id: 'arabic', label: 'Arabic Grills' },
  { id: 'breakfast', label: 'Breakfast Dosas' },
  { id: 'beverages', label: 'Karak & Drinks' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
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
    { name: 'Extra Green Chilly & Onions', price: 2 },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }
      // Dietary filter
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
    <section id="menu" className="py-14 bg-stone-900 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              <span>Authentic Recipes</span>
              <span aria-hidden="true">·</span>
              <span>Cooked Fresh Daily</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Our Full Signature Menu
            </h2>
            <p className="text-sm text-stone-400 mt-1 max-w-xl">
              Explore freshly cooked biryanis, charcoal tandoori grills, Peshawari wok karahis, breakfast dosas, and hot beverages.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Biryani)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-800/80 border border-stone-700 rounded-xl text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs & Dietary Filter */}
        <div className="space-y-4 mb-8">
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

          {/* Quick Dietary Filters */}
          <div className="flex items-center gap-2 text-xs">
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
              <span>Spicy Special</span>
            </button>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-stone-800/30 rounded-2xl border border-stone-800">
            <p className="text-stone-400 text-sm">No dishes found matching your current filter criteria.</p>
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
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col justify-between bg-stone-800/60 hover:bg-stone-800 border border-stone-700/60 hover:border-stone-600 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <div>
                  {/* Dish Image */}
                  <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

                    {/* Tags overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
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
                    <span>Customize & Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Item Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            
            <div className="flex items-start justify-between gap-4 border-b border-stone-800 pb-4">
              <div>
                <h3 className="font-display font-bold text-xl text-white">
                  {customizingItem.name}
                </h3>
                <p className="text-sm text-emerald-400 font-semibold tabular-nums mt-0.5">
                  Base Price: AED {customizingItem.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="p-1 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Spice Level Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                Choose Spice Level:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['Mild', 'Medium', 'Hot', 'Extra Hot'].map((spice) => (
                  <button
                    key={spice}
                    type="button"
                    onClick={() => setSelectedSpice(spice)}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all ${
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

            {/* Popular Add-ons */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                Recommended Add-ons & Sides:
              </label>
              <div className="space-y-2">
                {availableAddOns.map((addon) => {
                  const isChecked = selectedAddOns.some((a) => a.name === addon.name);
                  return (
                    <button
                      key={addon.name}
                      type="button"
                      onClick={() => handleToggleAddOn(addon)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
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

            {/* Special Instructions */}
            <div>
              <label htmlFor="instructions" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                Cooking Notes / Special Requests:
              </label>
              <input
                id="instructions"
                type="text"
                placeholder="e.g. Less oil, separate green chilly, extra lime"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Quantity and Final Add Button */}
            <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-4">
              <div className="flex items-center border border-stone-700 rounded-xl bg-stone-800">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-stone-300 hover:text-white font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold text-white tabular-nums">
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
                className="flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all active:scale-95 flex items-center justify-between shadow-lg"
              >
                <span>Add to Cart</span>
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
