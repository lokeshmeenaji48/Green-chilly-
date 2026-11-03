import React, { useState } from 'react';
import { X, Trash2, Utensils, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { CartItem, TablesideOrder } from '../types';
import { calculateTablesideTotals, validateTablesideOrder } from '../utils/orderCalculations';
import { AVAILABLE_TABLES } from '../data/restaurantData';

interface TablesideCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  selectedTable: string;
  onSelectTable: (tableId: string) => void;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onFireOrderToKitchen: (order: TablesideOrder) => void;
}

export const TablesideCartDrawer: React.FC<TablesideCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  selectedTable,
  onSelectTable,
  onUpdateQuantity,
  onRemoveItem,
  onFireOrderToKitchen,
}) => {
  const [guestName, setGuestName] = useState('');
  const [kitchenNotes, setKitchenNotes] = useState('');
  const [paymentPreference, setPaymentPreference] = useState<'cash' | 'card' | 'apple_pay'>('card');
  const [formError, setFormError] = useState('');

  const totals = calculateTablesideTotals(items);
  const currentTableObj = AVAILABLE_TABLES.find((t) => t.id === selectedTable) || AVAILABLE_TABLES[0];

  const handleSendToKitchen = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const validation = validateTablesideOrder({
      tableNumber: currentTableObj.label,
      itemCount: items.length,
    });

    if (!validation.isValid) {
      setFormError(validation.error || 'Please check your table order.');
      return;
    }

    const order: TablesideOrder = {
      id: `KOT-${Math.floor(1000 + Math.random() * 9000)}`,
      tableNumber: currentTableObj.label,
      guestName: guestName.trim() || undefined,
      items,
      subtotal: totals.subtotal,
      vat: totals.vat,
      total: totals.total,
      specialKitchenNotes: kitchenNotes.trim() || undefined,
      paymentPreference,
      status: 'sent_to_kitchen',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedServeTime: '15-20 min',
    };

    onFireOrderToKitchen(order);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full sm:w-auto">
        <div className="w-full sm:w-screen sm:max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col h-full">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-600 flex items-center justify-center text-emerald-400">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Table Order Ticket</h2>
                <span className="text-xs text-emerald-400 font-semibold">{currentTableObj.label}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
              aria-label="Close table order"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Table Switcher Bar */}
          <div className="p-3 bg-stone-800/40 border-b border-stone-800 flex items-center justify-between text-xs">
            <span className="text-stone-400">Seating:</span>
            <select
              value={selectedTable}
              onChange={(e) => onSelectTable(e.target.value)}
              className="bg-stone-900 text-emerald-300 font-semibold px-2 py-1 rounded border border-stone-700"
            >
              {AVAILABLE_TABLES.map((t) => (
                <option key={t.id} value={t.id} className="bg-stone-900 text-white">
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Items on Table List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-stone-400 space-y-3">
                <Utensils className="w-12 h-12 mx-auto text-stone-600" />
                <p className="text-sm font-medium">No dishes added to this table yet.</p>
                <p className="text-xs text-stone-500">
                  Select dishes from the menu to send directly to our tandoor & wok kitchen.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-stone-800/60 border border-stone-700/60 rounded-xl space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-semibold text-white">{item.menuItem.name}</h4>
                      <div className="text-[11px] text-stone-400 space-x-1 mt-0.5">
                        {item.selectedSpice && (
                          <span>Spice: <strong className="text-stone-300">{item.selectedSpice}</strong></span>
                        )}
                        {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                          <span>
                            · {item.selectedAddOns.map((a) => a.name).join(', ')}
                          </span>
                        )}
                      </div>
                      {item.specialInstructions && (
                        <p className="text-[10px] text-emerald-400 italic mt-0.5">
                          "{item.specialInstructions}"
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-bold text-emerald-400 tabular-nums shrink-0">
                      AED {((item.menuItem.price + (item.selectedAddOns?.reduce((s, a) => s + a.price, 0) || 0)) * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-stone-700 rounded-lg bg-stone-900 text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-stone-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 py-1 font-bold text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-stone-400 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-500 hover:text-rose-400 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Optional Guest Name & Table Preferences */}
            {items.length > 0 && (
              <div className="pt-2 border-t border-stone-800 space-y-3">
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">
                    Guest Name (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ahmed"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">
                    Kitchen Note for this Table:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Serve starters first, extra saucers"
                    value={kitchenNotes}
                    onChange={(e) => setKitchenNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Bill payment preference */}
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">
                    Payment Preference at Table:
                  </label>
                  <div className="grid grid-cols-3 gap-1 text-[11px]">
                    {[
                      { id: 'card', label: 'Card Machine' },
                      { id: 'cash', label: 'Cash' },
                      { id: 'apple_pay', label: 'Apple Pay' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentPreference(m.id as any)}
                        className={`p-2 rounded-lg border text-center font-medium ${
                          paymentPreference === m.id
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                            : 'bg-stone-800 border-stone-700 text-stone-300'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {formError && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{formError}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Footer Totals & Send to Kitchen CTA */}
          {items.length > 0 && (
            <div className="p-4 border-t border-stone-800 bg-stone-900/95 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums">AED {totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>UAE VAT (5%)</span>
                  <span className="tabular-nums">AED {totals.vat.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-bold text-white">
                  <span>Total Amount</span>
                  <span className="text-emerald-400 tabular-nums">AED {totals.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSendToKitchen}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-between"
              >
                <span>Send Order to Kitchen (Fire KOT)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
