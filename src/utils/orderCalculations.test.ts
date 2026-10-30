import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCartTotals,
  validatePhone,
  validateOrderForm,
  validateReservationForm,
  calculateLoyaltyPoints,
  DEFAULT_DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD
} from './orderCalculations';
import { CartItem } from '../types';

const mockBiryani: CartItem = {
  id: 'cart-1',
  menuItem: {
    id: 'b1',
    name: 'Chicken Dum Biryani',
    category: 'biryani',
    price: 22,
    description: 'Fragrant saffron rice',
    image: '',
    prepTime: '20 min',
    rating: 4.8,
    reviewCount: 140
  },
  quantity: 2,
};

const mockKebab: CartItem = {
  id: 'cart-2',
  menuItem: {
    id: 't1',
    name: 'Tandoori Mixed Platter',
    category: 'tandoor',
    price: 35,
    description: 'Assorted kebabs',
    image: '',
    prepTime: '25 min',
    rating: 4.9,
    reviewCount: 95
  },
  quantity: 1,
  selectedAddOns: [
    { name: 'Extra Mint Raita', price: 3 },
    { name: 'Butter Naan', price: 4 }
  ]
};

test('calculateCartTotals computes correct subtotal with add-ons', () => {
  // Biryani: 22 * 2 = 44. Kebab: (35 + 3 + 4) * 1 = 42. Subtotal = 86
  const totals = calculateCartTotals([mockBiryani, mockKebab], undefined, 'delivery');
  assert.equal(totals.subtotal, 86);
  assert.equal(totals.itemCount, 3);
  // Total >= 50, so delivery fee is 0
  assert.equal(totals.deliveryFee, 0);
  // VAT 5% of 86 = 4.3
  assert.equal(totals.vat, 4.3);
  assert.equal(totals.total, 90.3);
});

test('calculateCartTotals applies delivery fee below free delivery threshold', () => {
  // Only 1 biryani: 22 AED
  const totals = calculateCartTotals([mockBiryani], undefined, 'delivery');
  assert.equal(totals.subtotal, 44); // 2 * 22
  assert.equal(totals.deliveryFee, DEFAULT_DELIVERY_FEE);
  // VAT: 5% of 44 = 2.2
  // Total = 44 + 2.2 + 5 = 51.2
  assert.equal(totals.total, 51.2);
});

test('calculateCartTotals waives delivery fee on pickup', () => {
  const totals = calculateCartTotals([mockBiryani], undefined, 'pickup');
  assert.equal(totals.deliveryFee, 0);
  assert.equal(totals.total, 46.2); // 44 + 2.2
});

test('calculateCartTotals applies valid 10% promo code GREENCHILLY10', () => {
  const totals = calculateCartTotals([mockBiryani], 'GREENCHILLY10', 'pickup');
  assert.equal(totals.discount, 4.4); // 10% of 44
  const taxable = 44 - 4.4; // 39.6
  assert.equal(totals.vat, 1.98); // 5% of 39.6
  assert.equal(totals.total, 41.58);
});

test('validatePhone correctly accepts UAE mobile and landline numbers', () => {
  assert.equal(validatePhone('+971 4 8858802'), true);
  assert.equal(validatePhone('0501234567'), true);
  assert.equal(validatePhone('+971508858802'), true);
  assert.equal(validatePhone('123'), false);
  assert.equal(validatePhone(''), false);
});

test('validateOrderForm checks required delivery address for delivery orders', () => {
  const valid = validateOrderForm({
    customerName: 'Ahmed Al Mansoori',
    customerPhone: '0501234567',
    deliveryType: 'delivery',
    deliveryAddress: 'European Business Center, DIP 1, Dubai'
  });
  assert.equal(valid.isValid, true);

  const missingAddress = validateOrderForm({
    customerName: 'Ahmed',
    customerPhone: '0501234567',
    deliveryType: 'delivery',
    deliveryAddress: ''
  });
  assert.equal(missingAddress.isValid, false);
});

test('calculateLoyaltyPoints calculates 2 points per AED spent', () => {
  assert.equal(calculateLoyaltyPoints(50), 100);
  assert.equal(calculateLoyaltyPoints(25.5), 51);
});
