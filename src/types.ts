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
  image: string;
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

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  deliveryType: 'delivery' | 'pickup';
  deliveryAddress?: string;
  area?: string;
  paymentMethod: 'cash' | 'card' | 'apple_pay';
  subtotal: number;
  discount: number;
  vat: number;
  deliveryFee: number;
  total: number;
  status: 'placed' | 'kitchen' | 'out_for_delivery' | 'delivered';
  createdAt: string;
  estimatedDeliveryTime: string;
}

export interface TableReservation {
  id: string;
  guestName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingZone: 'family' | 'main' | 'terrace';
  specialRequests?: string;
  status: 'confirmed' | 'pending';
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  relativeTime: string;
  comment: string;
  favoriteDish: string;
  visitType: 'Dine-in' | 'Takeaway' | 'Delivery';
}
