export interface MenuItem {
  id: string;
  name: string;
  category: 'biryani' | 'tandoor' | 'curry' | 'chinese' | 'arabic' | 'breakfast' | 'beverages';
  price: number; // in AED
  description: string;
  isSpicy?: boolean;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  isVegetarian?: boolean;
  isPopular?: boolean;
  image?: string; // Only items with dedicated unique photography include an image
  prepTime: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string; // cart item id (unique with options)
  menuItem: MenuItem;
  quantity: number;
  selectedSpice?: string;
  selectedAddOns?: { name: string; price: number }[];
  specialInstructions?: string;
}

export interface TablesideOrder {
  id: string; // Kitchen Order Ticket e.g. KOT-8492
  tableNumber: string; // e.g. "Table 4", "Family Cabin 2"
  guestName?: string;
  items: CartItem[];
  subtotal: number;
  vat: number;
  total: number;
  specialKitchenNotes?: string;
  paymentPreference: 'cash' | 'card' | 'apple_pay';
  status: 'sent_to_kitchen' | 'cooking' | 'served' | 'bill_requested';
  createdAt: string;
  estimatedServeTime: string;
}

export interface TableReservation {
  id: string;
  guestName: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingZone: 'family' | 'main' | 'terrace';
  specialRequests?: string;
  status: 'confirmed';
}
