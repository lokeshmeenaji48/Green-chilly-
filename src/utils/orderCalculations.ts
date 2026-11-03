import { CartItem } from '../types';

export interface TablesideTotals {
  subtotal: number;
  vat: number;
  total: number;
  itemCount: number;
}

export const VAT_RATE = 0.05; // 5% UAE VAT

export function calculateTablesideTotals(items: CartItem[]): TablesideTotals {
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

  subtotal = Math.round(subtotal * 100) / 100;
  const vat = Math.round(subtotal * VAT_RATE * 100) / 100;
  const total = Math.round((subtotal + vat) * 100) / 100;

  return {
    subtotal,
    vat,
    total,
    itemCount,
  };
}

export function validatePhone(phone: string): boolean {
  // Support UAE formats: +971501234567, 0501234567, 048858802, etc. (7 to 15 digits)
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

export function validateTablesideOrder(data: {
  tableNumber: string;
  itemCount: number;
}): { isValid: boolean; error?: string } {
  if (!data.tableNumber || data.tableNumber.trim() === '') {
    return { isValid: false, error: 'Please select your Table or Family Cabin number.' };
  }
  if (data.itemCount <= 0) {
    return { isValid: false, error: 'Please add at least one dish to send to the kitchen.' };
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
