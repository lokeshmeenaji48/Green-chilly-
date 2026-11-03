import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTablesideTotals,
  validatePhone,
  validateTablesideOrder,
  validateReservationForm
} from './orderCalculations';
import { CartItem } from '../types';

const mockBiryani: CartItem = {
  id: 'cart-1',
  menuItem: {
    id: 'b1',
    name: 'Special Royal Dum Biryani',
    category: 'biryani',
    price: 24,
    description: 'Fragrant saffron rice',
    prepTime: '20 min',
    rating: 4.9,
    reviewCount: 312
  },
  quantity: 2,
};

const mockKebab: CartItem = {
  id: 'cart-2',
  menuItem: {
    id: 't1',
    name: 'Chef’s Sizzling Mixed Tandoori Platter',
    category: 'tandoor',
    price: 42,
    description: 'Assorted kebabs',
    prepTime: '25 min',
    rating: 4.9,
    reviewCount: 245
  },
  quantity: 1,
  selectedAddOns: [
    { name: 'Fresh Mint Raita', price: 3 },
    { name: 'Hot Butter Naan', price: 4 }
  ]
};

test('calculateTablesideTotals computes correct subtotal with add-ons and 5% UAE VAT', () => {
  // 2 * 24 = 48. Kebab: (42 + 3 + 4) * 1 = 49. Subtotal = 97
  const totals = calculateTablesideTotals([mockBiryani, mockKebab]);
  assert.equal(totals.subtotal, 97);
  assert.equal(totals.itemCount, 3);
  // 5% VAT on 97 = 4.85
  assert.equal(totals.vat, 4.85);
  // Total = 97 + 4.85 = 101.85
  assert.equal(totals.total, 101.85);
});

test('validatePhone checks valid UAE numbers', () => {
  assert.equal(validatePhone('+971 4 8858802'), true);
  assert.equal(validatePhone('0508858802'), true);
  assert.equal(validatePhone('123'), false);
  assert.equal(validatePhone(''), false);
});

test('validateTablesideOrder checks selected table number and items', () => {
  const valid = validateTablesideOrder({
    tableNumber: 'Table 04',
    itemCount: 2
  });
  assert.equal(valid.isValid, true);

  const missingTable = validateTablesideOrder({
    tableNumber: '',
    itemCount: 2
  });
  assert.equal(missingTable.isValid, false);

  const emptyCart = validateTablesideOrder({
    tableNumber: 'Table 04',
    itemCount: 0
  });
  assert.equal(emptyCart.isValid, false);
});

test('validateReservationForm verifies table booking parameters', () => {
  const valid = validateReservationForm({
    guestName: 'Rashid Khan',
    phone: '0508858802',
    date: '2026-10-31',
    timeSlot: '19:30',
    guestsCount: 4
  });
  assert.equal(valid.isValid, true);

  const invalid = validateReservationForm({
    guestName: '',
    phone: '0508858802',
    date: '2026-10-31',
    timeSlot: '19:30',
    guestsCount: 4
  });
  assert.equal(invalid.isValid, false);
});
