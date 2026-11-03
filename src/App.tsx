import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TablesideSection } from './components/TablesideSection';
import { ReservationSection } from './components/ReservationSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { TablesideCartDrawer } from './components/TablesideCartDrawer';
import { KitchenTicketModal } from './components/KitchenTicketModal';
import { CartItem, TablesideOrder } from './types';
import { AVAILABLE_TABLES } from './data/restaurantData';
import { Check } from 'lucide-react';

export default function App() {
  const [selectedTable, setSelectedTable] = useState<string>(AVAILABLE_TABLES[0].id);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeKitchenOrder, setActiveKitchenOrder] = useState<TablesideOrder | null>(null);
  const [isKitchenModalOpen, setIsKitchenModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('tableside');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const currentTableObj = AVAILABLE_TABLES.find((t) => t.id === selectedTable) || AVAILABLE_TABLES[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      } else {
        return [...prev, newItem];
      }
    });
    showToast(`Added ${newItem.quantity}x ${newItem.menuItem.name} to ${currentTableObj.label}`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleFireOrderToKitchen = (order: TablesideOrder) => {
    setActiveKitchenOrder(order);
    setCartItems([]);
    setIsCartOpen(false);
    setIsKitchenModalOpen(true);
    showToast(`Order sent to kitchen for ${order.tableNumber}! Ticket #${order.id}`);
  };

  const handleRequestService = (serviceDescription: string) => {
    showToast(`Service Request Sent: ${serviceDescription}`);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        selectedTable={selectedTable}
        onSelectTable={setSelectedTable}
      />

      {/* Main Content: Tableside Ordering, Table Booking & Location */}
      <main className="flex-1 pb-20 md:pb-0">
        <Hero
          onGoToTableside={() => handleNavigate('tableside')}
          onGoToBooking={() => handleNavigate('booking')}
          selectedTableLabel={currentTableObj.label}
        />

        {/* 1. ORDER ON TABLESIDE */}
        <TablesideSection
          selectedTable={selectedTable}
          onSelectTable={setSelectedTable}
          onAddToCart={handleAddToCart}
          onRequestService={handleRequestService}
        />

        {/* 2. TABLE BOOKING */}
        <ReservationSection />

        {/* 3. LOCATION & HOURS */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Fixed Bottom Navigation Bar (Visible only on mobile screens) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 px-2 py-2 flex items-center justify-around shadow-2xl"
      >
        <button
          onClick={() => handleNavigate('tableside')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors text-[11px] font-medium ${
            activeSection === 'tableside' ? 'text-emerald-400 font-bold' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="text-base leading-none">🍽️</span>
          </div>
          <span>Tableside</span>
        </button>

        <button
          onClick={() => handleNavigate('booking')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors text-[11px] font-medium ${
            activeSection === 'booking' ? 'text-emerald-400 font-bold' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="text-base leading-none">📅</span>
          </div>
          <span>Book Table</span>
        </button>

        <button
          onClick={() => handleNavigate('location')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors text-[11px] font-medium ${
            activeSection === 'location' ? 'text-emerald-400 font-bold' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="text-base leading-none">📍</span>
          </div>
          <span>Location</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <span className="text-base leading-none">🧾</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-400 text-stone-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-stone-900 shadow">
                {cartCount}
              </span>
            )}
          </div>
          <span>Table Order</span>
        </button>
      </nav>

      {/* Tableside Order / KOT Cart Drawer */}
      <TablesideCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        selectedTable={selectedTable}
        onSelectTable={setSelectedTable}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onFireOrderToKitchen={handleFireOrderToKitchen}
      />

      {/* Live Kitchen Order Ticket (KOT) Tracker Modal */}
      {isKitchenModalOpen && (
        <KitchenTicketModal
          order={activeKitchenOrder}
          onClose={() => setIsKitchenModalOpen(false)}
          onRequestBill={(tableNum) => handleRequestService(`Bill requested for ${tableNum}`)}
          onCallWaiter={(tableNum) => handleRequestService(`Waiter called to ${tableNum}`)}
        />
      )}

      {/* Floating Service & Order Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 border border-emerald-500/80 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 backdrop-blur-md animate-fade-in max-w-[90vw]">
          <span className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
            <Check className="w-3 h-3" />
          </span>
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
