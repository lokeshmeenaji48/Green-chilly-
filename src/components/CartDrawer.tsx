import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';
import { CartItem, Order } from '../types';
import {
  calculateCartTotals,
  validateOrderForm,
  FREE_DELIVERY_THRESHOLD,
} from '../utils/orderCalculations';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onPlaceOrder: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}) => {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  
  // Checkout form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedArea, setSelectedArea] = useState(RESTAURANT_INFO.deliveryZones[0]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'apple_pay'>('cash');
  const [formError, setFormError] = useState('');

  const totals = calculateCartTotals(items, appliedCoupon, deliveryType);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'GREENCHILLY10' || clean === 'WELCOME10') {
      setAppliedCoupon(clean);
    } else {
      setCouponError('Invalid code. Try GREENCHILLY10 for 10% off!');
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (items.length === 0) {
      setFormError('Your cart is empty. Add items from the menu first!');
      return;
    }

    const validation = validateOrderForm({
      customerName,
      customerPhone,
      deliveryType,
      deliveryAddress,
    });

    if (!validation.isValid) {
      setFormError(validation.error || 'Please check your form details.');
      return;
    }

    const newOrder: Order = {
      id: `GC-${Date.now().toString().slice(-5)}`,
      items,
      customerName,
      customerPhone,
      deliveryType,
      deliveryAddress: deliveryType === 'delivery' ? `${deliveryAddress}, ${selectedArea}` : undefined,
      area: selectedArea,
      paymentMethod,
      subtotal: totals.subtotal,
      discount: totals.discount,
      vat: totals.vat,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      status: 'placed',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedDeliveryTime: '30-40 min',
    };

    onPlaceOrder(newOrder);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="font-display font-bold text-lg text-white">Your Order</h2>
              <span className="text-xs text-stone-400">({totals.itemCount} items)</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery vs Pickup Selector */}
          <div className="p-4 bg-stone-800/40 border-b border-stone-800">
            <div className="grid grid-cols-2 gap-1 p-1 bg-stone-900 rounded-xl border border-stone-700/60 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`py-2 rounded-lg transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Delivery (30-40m)
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`py-2 rounded-lg transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Takeaway Pickup
              </button>
            </div>
            {deliveryType === 'delivery' && totals.subtotal < FREE_DELIVERY_THRESHOLD && totals.subtotal > 0 && (
              <p className="text-[11px] text-amber-300 mt-2 text-center">
                Add AED {(FREE_DELIVERY_THRESHOLD - totals.subtotal).toFixed(2)} more for <strong>FREE DIP Delivery!</strong>
              </p>
            )}
          </div>

          {/* Items List or Empty state */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-stone-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-stone-600" />
                <p className="text-sm font-medium">Your cart is currently empty.</p>
                <p className="text-xs text-stone-500">Add biryani, tandoor, or karahi to get started!</p>
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
                        className="px-2 py-1 text-stone-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 py-1 font-bold text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-stone-400 hover:text-white"
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

            {/* Coupon Code Input */}
            {items.length > 0 && (
              <div className="pt-2">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo code (GREENCHILLY10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 uppercase focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg border border-stone-700"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Coupon {appliedCoupon} applied (10% OFF)!
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-400 mt-1">
                    {couponError}
                  </p>
                )}
              </div>
            )}

            {/* Checkout Details Form */}
            {items.length > 0 && (
              <div className="pt-3 border-t border-stone-800 space-y-3">
                <h4 className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  Contact & Delivery Details
                </h4>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number (e.g. 050 885 8802) *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                  />

                  {deliveryType === 'delivery' && (
                    <>
                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1">Select Delivery Zone:</label>
                        <select
                          value={selectedArea}
                          onChange={(e) => setSelectedArea(e.target.value)}
                          className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                        >
                          {RESTAURANT_INFO.deliveryZones.map((zone) => (
                            <option key={zone} value={zone} className="bg-stone-900">
                              {zone}
                            </option>
                          ))}
                        </select>
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Building Name, Flat / Villa No., Street / Landmark *"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                      />
                    </>
                  )}

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">Payment Method:</label>
                    <div className="grid grid-cols-3 gap-1 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cash')}
                        className={`p-2 rounded-lg border text-center font-medium ${
                          paymentMethod === 'cash'
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                            : 'bg-stone-800 border-stone-700 text-stone-300'
                        }`}
                      >
                        Cash on Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2 rounded-lg border text-center font-medium ${
                          paymentMethod === 'card'
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                            : 'bg-stone-800 border-stone-700 text-stone-300'
                        }`}
                      >
                        Card on Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('apple_pay')}
                        className={`p-2 rounded-lg border text-center font-medium ${
                          paymentMethod === 'apple_pay'
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                            : 'bg-stone-800 border-stone-700 text-stone-300'
                        }`}
                      >
                        Apple Pay
                      </button>
                    </div>
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

          {/* Footer & Totals */}
          {items.length > 0 && (
            <div className="p-4 border-t border-stone-800 bg-stone-900/95 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums">AED {totals.subtotal.toFixed(2)}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount (10%)</span>
                    <span className="tabular-nums">-AED {totals.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>UAE VAT (5%)</span>
                  <span className="tabular-nums">AED {totals.vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="tabular-nums">
                    {totals.deliveryFee === 0 ? (
                      <strong className="text-emerald-400 font-medium">FREE</strong>
                    ) : (
                      `AED ${totals.deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-bold text-white">
                  <span>Total Due</span>
                  <span className="text-emerald-400 tabular-nums">AED {totals.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-between"
              >
                <span>Confirm & Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
