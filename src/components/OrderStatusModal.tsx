import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Bike, ChefHat, Phone, MessageSquare, X } from 'lucide-react';
import { Order } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface OrderStatusModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({ order, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    if (!order) return;
    setCurrentStep(1);

    // Simulate real kitchen progression
    const timer1 = setTimeout(() => setCurrentStep(2), 2500);
    const timer2 = setTimeout(() => setCurrentStep(3), 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [order]);

  if (!order) return null;

  const steps = [
    { id: 1, label: 'Order Received', desc: 'Sent directly to Green Chilly kitchen', icon: CheckCircle2 },
    { id: 2, label: 'Kitchen Preparing', desc: 'Fresh tandoor & wok karahi cooking', icon: ChefHat },
    { id: 3, label: 'Out for Delivery', desc: 'Rider Muhammad on Honda 125 in DIP', icon: Bike },
    { id: 4, label: 'Delivered', desc: 'Enjoy your hot meal!', icon: CheckCircle2 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-900 border border-stone-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-5 p-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Live Order Tracking
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-white mt-1">
              Order #{order.id}
            </h3>
            <p className="text-xs text-stone-400">
              Placed at {order.createdAt} · Est. Arrival: <strong className="text-stone-200">{order.estimatedDeliveryTime}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Stepper */}
        <div className="py-2 space-y-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div key={step.id} className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300 ring-4 ring-emerald-500/20'
                      : 'bg-stone-800 border-stone-700 text-stone-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 pt-0.5">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-xs font-bold ${
                        isCurrent || isCompleted ? 'text-white' : 'text-stone-500'
                      }`}
                    >
                      {step.label}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Snapshot */}
        <div className="p-3.5 bg-stone-800/50 rounded-xl border border-stone-800 space-y-2 text-xs">
          <div className="flex justify-between text-stone-300">
            <span>Customer:</span>
            <span className="font-semibold text-white">{order.customerName} ({order.customerPhone})</span>
          </div>
          {order.deliveryAddress && (
            <div className="flex justify-between text-stone-300">
              <span>Address:</span>
              <span className="font-medium text-stone-200 text-right max-w-[240px] truncate">
                {order.deliveryAddress}
              </span>
            </div>
          )}
          <div className="flex justify-between text-stone-300">
            <span>Payment:</span>
            <span className="capitalize text-stone-200">{order.paymentMethod.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-stone-700 text-sm font-bold text-white">
            <span>Total Amount:</span>
            <span className="text-emerald-400 tabular-nums">AED {order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Support Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Call Restaurant</span>
          </a>
          <a
            href={`https://wa.me/971508858802?text=Hello%20Green%20Chilly,%20checking%20status%20for%20order%20${order.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Dispatch</span>
          </a>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 text-xs text-stone-400 hover:text-stone-200 text-center transition-colors font-medium"
        >
          Return to Menu
        </button>

      </div>
    </div>
  );
};
