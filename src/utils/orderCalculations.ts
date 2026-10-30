import { CartItem } from '../types';

export interface CartTotals {
  subtotal: number;
  discount: number;
  vat: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
}

export const VAT_RATE = 0.05; // 5% UAE VAT
export const DEFAULT_DELIVERY_FEE = 5.0; // 5 AED standard delivery in DIP
export const FREE_DELIVERY_THRESHOLD = 50.0; // Free delivery over 50 AED

export function calculateCartTotals(
  items: CartItem[],
  couponCode?: string,
  deliveryType: 'delivery' | 'pickup' = 'delivery'
): CartTotals {
  let subtotal = 0;
  let itemCount = 0;

  for (const item of items) {
    let itemPrice = item.menuItem.price;
    if (item.selectedAddOns && item.selectedAddOns.length > 0) {
      const addOnsTotal = item.selectedAddOns.reduce((acc, curr) => acc + curr.price, 0);
      itemPrice += addOnsTotal;
    }
    subtotal += itemPrice * item.quantity;
    itemCount += item.quantity;
  }

  // Rounded to 2 decimals
  subtotal = Math.round(subtotal * 100) / 100;

  // Coupon discount
  let discount = 0;
  if (couponCode) {
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'GREENCHILLY10' || cleanCode === 'WELCOME10') {
      discount = Math.round(subtotal * 0.1 * 100) / 100; // 10% off
    } else if (cleanCode === 'DIPSPECIAL' && subtotal >= 40) {
      discount = 8.0; // 8 AED flat off
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const vat = Math.round(taxableAmount * VAT_RATE * 100) / 100;

  let deliveryFee = 0;
  if (deliveryType === 'delivery') {
    deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DEFAULT_DELIVERY_FEE;
  }

  const total = Math.max(0, Math.round((taxableAmount + vat + deliveryFee) * 100) / 100);

  return {
    subtotal,
    discount,
    vat,
    deliveryFee,
    total,
    itemCount,
  };
}

export function validatePhone(phone: string): boolean {
  // Support UAE formats: +971501234567, 0501234567, 048858802, etc. (7 to 15 digits)
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

export function validateOrderForm(data: {
  customerName: string;
  customerPhone: string;
  deliveryType: 'delivery' | 'pickup';
  deliveryAddress?: string;
}): { isValid: boolean; error?: string } {
  if (!data.customerName || data.customerName.trim().length < 2) {
    return { isValid: false, error: 'Please enter your full name.' };
  }
  if (!data.customerPhone || !validatePhone(data.customerPhone)) {
    return { isValid: false, error: 'Please enter a valid phone number (e.g., 050 123 4567).' };
  }
  if (data.deliveryType === 'delivery') {
    if (!data.deliveryAddress || data.deliveryAddress.trim().length < 5) {
      return { isValid: false, error: 'Please enter your building name or delivery address in Dubai.' };
    }
  }
  return { isValid: true };
}

export function validateReservationForm(data: {
  guestName: string;
  phone: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
}): { isValid: boolean; error?: string } {
  if (!data.guestName || data.guestName.trim().length < 2) {
    return { isValid: false, error: 'Please enter primary guest name.' };
  }
  if (!data.phone || !validatePhone(data.phone)) {
    return { isValid: false, error: 'Please provide a valid contact number.' };
  }
  if (!data.date) {
    return { isValid: false, error: 'Please select a reservation date.' };
  }
  if (!data.timeSlot) {
    return { isValid: false, error: 'Please select a dining time slot.' };
  }
  if (!data.guestsCount || data.guestsCount < 1 || data.guestsCount > 50) {
    return { isValid: false, error: 'Guest count must be between 1 and 50.' };
  }
  return { isValid: true };
}

export function calculateLoyaltyPoints(spendAED: number): number {
  return Math.floor(spendAED * 2); // 2 points per 1 AED
}
