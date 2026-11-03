import { MenuItem } from '../types';
import biryaniImg from '../assets/images/dish_chicken_biryani_1793283672574.jpg';
import tandooriImg from '../assets/images/dish_tandoori_platter_1793283671381.jpg';
import karahiImg from '../assets/images/dish_karahi_curry_1793283672817.jpg';
import butterChickenImg from '../assets/images/dish_butter_chicken_1793358123036.jpg';
import shawarmaImg from '../assets/images/dish_arabic_shawarma_1793358124018.jpg';
import dosaImg from '../assets/images/dish_masala_dosa_1793358122900.jpg';
import chaiImg from '../assets/images/beverage_karak_chai_1793283672788.jpg';

export const RESTAURANT_INFO = {
  name: 'Green Chilly Restaurant',
  legalName: 'M&N Green Chilly Restaurant L.L.C',
  tagline: 'Authentic Indian, Pakistani & Multi-Cuisine Feast in Dubai',
  rating: 4.5,
  reviewCount: 584,
  phone: '+971 4 8858802',
  whatsapp: '+971 50 885 8802',
  address: 'Ground Floor, Opposite Choithrams, Dubai Investments Park 1 (DIP 1), Jebel Ali, Dubai, UAE',
  coordinates: {
    lat: 25.0068848,
    lng: 55.1661012,
  },
  timings: '6:00 AM – 12:00 AM (Midnight) Every Day',
  googleMapsUrl: 'https://maps.app.goo.gl/d2D6tuwPUi7ZSnzp7',
  averageMealCost: 'AED 25 – 45 for two',
  features: [
    'Halal Certified Kitchen',
    'Family Dining & Private Cabins',
    'Fast Live Charcoal Tandoor',
    'Outdoor Evening Terrace',
    'Free High-Speed Wi-Fi',
    'Tableside Direct QR Ordering'
  ]
};

export const AVAILABLE_TABLES = [
  { id: 'T-01', label: 'Table 01 (Window View)', shortLabel: 'Table 01', zone: 'Main Hall' },
  { id: 'T-02', label: 'Table 02', shortLabel: 'Table 02', zone: 'Main Hall' },
  { id: 'T-03', label: 'Table 03 (Central)', shortLabel: 'Table 03', zone: 'Main Hall' },
  { id: 'T-04', label: 'Table 04', shortLabel: 'Table 04', zone: 'Main Hall' },
  { id: 'T-05', label: 'Table 05 (Booth)', shortLabel: 'Table 05', zone: 'Main Hall' },
  { id: 'FC-01', label: 'Family Cabin 01 (Partitioned)', shortLabel: 'Cabin 01', zone: 'Family Section' },
  { id: 'FC-02', label: 'Family Cabin 02 (Partitioned)', shortLabel: 'Cabin 02', zone: 'Family Section' },
  { id: 'FC-03', label: 'Family Cabin 03 (Large Party)', shortLabel: 'Cabin 03', zone: 'Family Section' },
  { id: 'TR-01', label: 'Terrace Table 01 (Outdoor)', shortLabel: 'Terrace 01', zone: 'Terrace' },
  { id: 'TR-02', label: 'Terrace Table 02 (Outdoor)', shortLabel: 'Terrace 02', zone: 'Terrace' },
  { id: 'TR-03', label: 'Terrace Table 03 (Outdoor)', shortLabel: 'Terrace 03', zone: 'Terrace' },
];

// ZERO DUPLICATE IMAGES: Each photographed item has its own distinct photo file.
// Non-photographed dishes render as clean, elegant typography cards.
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'b1',
    name: 'Special Royal Dum Biryani',
    category: 'biryani',
    price: 24.0,
    description: 'Long-grain aged basmati rice slow-cooked on dum with marinated chicken, saffron, browned onions and aromatic spices. Served with cold mint raita.',
    isPopular: true,
    isSpicy: true,
    spiceLevel: 'Medium',
    image: biryaniImg, // UNIQUE PHOTO 1 (Bundled asset)
    prepTime: '15-20 min',
    rating: 4.9,
    reviewCount: 312
  },
  {
    id: 't1',
    name: 'Chef’s Sizzling Mixed Tandoori Platter',
    category: 'tandoor',
    price: 42.0,
    description: 'Generous sizzling platter featuring char-grilled chicken tikka, mutton seekh kebab, tandoori chicken leg, and malai boti with mint dip.',
    isPopular: true,
    isSpicy: true,
    spiceLevel: 'Medium',
    image: tandooriImg, // UNIQUE PHOTO 2 (Bundled asset)
    prepTime: '20-25 min',
    rating: 4.9,
    reviewCount: 245
  },
  {
    id: 'c1',
    name: 'Peshawari Chicken Karahi (Wok Special)',
    category: 'curry',
    price: 34.0,
    description: 'Signature wok-tossed chicken cooked in fresh tomatoes, crushed black pepper, julienned ginger, green chilies, and pure ghee.',
    isPopular: true,
    isSpicy: true,
    spiceLevel: 'Hot',
    image: karahiImg, // UNIQUE PHOTO 3 (Bundled asset)
    prepTime: '20 min',
    rating: 4.9,
    reviewCount: 290
  },
  {
    id: 'c2',
    name: 'Classic Butter Chicken Masala',
    category: 'curry',
    price: 28.0,
    description: 'Smoked tandoori chicken tikka simmered in silky velvety tomato cream gravy, finished with dried fenugreek leaves (kasoori methi).',
    isPopular: true,
    spiceLevel: 'Mild',
    image: butterChickenImg, // UNIQUE PHOTO 4 (Bundled asset)
    prepTime: '15 min',
    rating: 4.8,
    reviewCount: 230
  },
  {
    id: 'ar1',
    name: 'Arabic Chicken Shawarma Plate with Hummus',
    category: 'arabic',
    price: 20.0,
    description: 'Shaved seasoned chicken served with creamy hummus, pickled cucumbers, crispy fries, garlic toum, and freshly baked pita bread.',
    isPopular: true,
    spiceLevel: 'Mild',
    image: shawarmaImg, // UNIQUE PHOTO 5 (Bundled asset)
    prepTime: '10 min',
    rating: 4.8,
    reviewCount: 210
  },
  {
    id: 'br1',
    name: 'Crispy Masala Dosa with Sambar & Chutneys',
    category: 'breakfast',
    price: 12.0,
    description: 'Golden fermented rice-lentil crepe filled with spiced tempered potato masala. Served with fresh coconut chutney and hot sambar.',
    isVegetarian: true,
    isPopular: true,
    spiceLevel: 'Mild',
    image: dosaImg, // UNIQUE PHOTO 6 (Bundled asset)
    prepTime: '10 min',
    rating: 4.8,
    reviewCount: 280
  },
  {
    id: 'bv1',
    name: 'Signature Zafran Karak Chai',
    category: 'beverages',
    price: 4.0,
    description: 'Dubai’s all-time favorite slow-brewed black tea with evaporated milk, crushed green cardamom pods, and a touch of saffron.',
    isPopular: true,
    image: chaiImg, // UNIQUE PHOTO 7 (Bundled asset)
    prepTime: '5 min',
    rating: 5.0,
    reviewCount: 420
  },
  // Text-first authentic dishes (No photo = zero duplicate images)
  {
    id: 'b2',
    name: 'Mutton Hyderabadi Biryani',
    category: 'biryani',
    price: 32.0,
    description: 'Tender baby mutton pieces layered in golden saffron basmati, infused with cardamom, cloves, and kewra essence. Accompanied by mirchi ka salan.',
    isPopular: true,
    isSpicy: true,
    spiceLevel: 'Hot',
    prepTime: '20 min',
    rating: 4.8,
    reviewCount: 198
  },
  {
    id: 't2',
    name: 'Chicken Malai Boti Skewers',
    category: 'tandoor',
    price: 28.0,
    description: 'Boneless chicken cubes marinated in clotted cream, green cardamom, and mild aromatic spices, charcoal grilled on skewers.',
    spiceLevel: 'Mild',
    prepTime: '20 min',
    rating: 4.8,
    reviewCount: 160
  },
  {
    id: 'c3',
    name: 'Paneer Tikka Lababdar',
    category: 'curry',
    price: 25.0,
    description: 'Charred cottage cheese cubes cooked in a luscious onion-tomato gravy with fresh cream and crushed coriander.',
    isVegetarian: true,
    spiceLevel: 'Mild',
    prepTime: '15 min',
    rating: 4.6,
    reviewCount: 95
  },
  {
    id: 'ch1',
    name: 'Chicken Manchurian with Egg Fried Rice',
    category: 'chinese',
    price: 26.0,
    description: 'Indo-Chinese style crispy chicken tossed with ginger, garlic, scallions, served with hot wok-tossed egg fried rice.',
    isSpicy: true,
    spiceLevel: 'Medium',
    prepTime: '15 min',
    rating: 4.7,
    reviewCount: 165
  },
  {
    id: 'bv2',
    name: 'Fresh Mango Mint Lassi',
    category: 'beverages',
    price: 11.0,
    description: 'Thick creamy churned yogurt blended with Alphonso mango pulp, a touch of mint, and crushed pistachios.',
    prepTime: '5 min',
    rating: 4.8,
    reviewCount: 160
  }
];
