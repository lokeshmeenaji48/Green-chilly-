import React, { useState, useEffect } from 'react';
import { CheckCircle2, ChefHat, Utensils, BellRing, Receipt, X } from 'lucide-react';
import { TablesideOrder } from '../types';

interface KitchenTicketModalProps {
  order: TablesideOrder | null;
  onClose: () => void;
  onRequestBill: (tableNumber: string) => void;
  onCallWaiter: (tableNumber: string) => void;
}

export const KitchenTicketModal: React.FC<KitchenTicketModalProps> = ({
  order,
  onClose,
  onRequestBill,
  onCallWaiter,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    if (!order) return;
    setCurrentStep(1);

    // Progression of kitchen cooking
    const timer1 = setTimeout(() => setCurrentStep(2), 2500);
    const timer2 = setTimeout(() => setCurrentStep(3), 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [order]);

  if (!order) return null;

  const steps = [
    { id: 1, label: 'KOT Fired to Kitchen', desc: 'Ticket printed at chef dispatch station', icon: CheckCircle2 },
    { id: 2, label: 'Cooking in Progress', desc: 'Charcoal tandoor & wok karahi live preparation', icon: ChefHat },
    { id: 3, label: 'Served at Table', desc: 'Fresh hot dishes brought directly to your table', icon: Utensils },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-900 border border-stone-700/80 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl space-y-4 sm:space-y-5 p-4 sm:p-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Live Tableside KOT
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-white mt-1">
              Ticket #{order.id} · {order.tableNumber}
            </h3>
            <p className="text-xs text-stone-400">
              Ordered at {order.createdAt} · Est. Serve: <strong className="text-stone-200">{order.estimatedServeTime}</strong>
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
          {steps.map((step) => {
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
                        Active Station
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table Order Summary */}
        <div className="p-3.5 bg-stone-800/50 rounded-xl border border-stone-800 space-y-2 text-xs">
          <div className="flex justify-between text-stone-300">
            <span>Table:</span>
            <span className="font-semibold text-white">{order.tableNumber}</span>
          </div>
          {order.guestName && (
            <div className="flex justify-between text-stone-300">
              <span>Guest:</span>
              <span className="text-stone-200">{order.guestName}</span>
            </div>
          )}
          <div className="flex justify-between text-stone-300">
            <span>Dishes ({order.items.reduce((s, i) => s + i.quantity, 0)}):</span>
            <span className="text-right text-stone-300 max-w-[220px] truncate">
              {order.items.map((i) => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
            </span>
          </div>
          <div className="flex justify-between text-stone-300">
            <span>Payment Preference:</span>
            <span className="capitalize text-stone-200">{order.paymentPreference.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-stone-700 text-sm font-bold text-white">
            <span>Table Bill Total:</span>
            <span className="text-emerald-400 tabular-nums">AED {order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Tableside Actions */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => onCallWaiter(order.tableNumber)}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition-colors"
          >
            <BellRing className="w-3.5 h-3.5 text-amber-400" />
            <span>Call Waiter</span>
          </button>
          <button
            onClick={() => onRequestBill(order.tableNumber)}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow transition-colors"
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Ask for Bill</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 text-xs text-stone-400 hover:text-stone-200 text-center transition-colors font-medium"
        >
          Add More Dishes to this Table
        </button>

      </div>
    </div>
  );
};
