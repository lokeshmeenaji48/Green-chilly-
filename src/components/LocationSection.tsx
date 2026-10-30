import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation, Compass, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-16 bg-stone-900 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <span>Location & Direct Access</span>
            <span aria-hidden="true">·</span>
            <span>DIP 1 Landmark</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Find Us in Dubai Investments Park 1
          </h2>
          <p className="text-sm text-stone-400 mt-1">
            Conveniently situated right opposite Choithrams Supermarket in DIP 1, easily reachable from Sheikh Mohammed Bin Zayed Road (E311) and the DIP Metro Station.
          </p>
        </div>

        {/* 2-Column Layout: Location Details & Interactive Simulated Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details Card (5 cols on lg) */}
          <div className="lg:col-span-5 bg-stone-800/40 border border-stone-700/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider">Exact Address</h4>
                  <p className="text-sm text-white font-medium mt-0.5 leading-snug">
                    {RESTAURANT_INFO.address}
                  </p>
                  <span className="inline-block text-[11px] text-amber-400 font-semibold mt-1">
                    Direct Landmark: Opposite Choithrams Supermarket
                  </span>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0 text-stone-300 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider">Operating Hours</h4>
                  <p className="text-sm text-white font-medium mt-0.5">
                    {RESTAURANT_INFO.timings}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Serving Breakfast, Express Lunch, Family Dinner & Late Night
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0 text-stone-300 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider">Phone & Orders</h4>
                  <div className="space-y-0.5 mt-0.5">
                    <a
                      href={`tel:${RESTAURANT_INFO.phone}`}
                      className="block text-sm font-semibold text-emerald-400 hover:underline"
                    >
                      {RESTAURANT_INFO.phone} (Direct Dine-In & Takeaway)
                    </a>
                    <a
                      href={`https://wa.me/971508858802`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-stone-300 hover:text-white"
                    >
                      WhatsApp: {RESTAURANT_INFO.whatsapp}
                    </a>
                  </div>
                </div>
              </div>

              {/* Delivery coverage */}
              <div className="pt-2 border-t border-stone-700/60">
                <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Delivery Coverage Areas
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {RESTAURANT_INFO.deliveryZones.map((zone) => (
                    <span
                      key={zone}
                      className="text-[11px] bg-stone-900 border border-stone-700 px-2.5 py-1 rounded-md text-stone-300"
                    >
                      {zone}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Direct Link to Google Maps */}
            <div className="pt-4 border-t border-stone-700/60 space-y-2">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

          </div>

          {/* Right Visual Map Presentation (7 cols on lg) */}
          <div className="lg:col-span-7 bg-stone-800/40 border border-stone-700/80 rounded-2xl overflow-hidden flex flex-col justify-between">
            {/* Visual Simulated Map Interface */}
            <div className="relative h-72 sm:h-80 bg-stone-950 p-6 flex flex-col justify-between overflow-hidden">
              
              {/* Map Grid Pattern */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#10b981 1px, transparent 1px), radial-gradient(#64748b 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px'
                }}
              />

              {/* Stylized Road Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-20,120 Q180,90 320,160 T680,140" fill="none" stroke="#64748b" strokeWidth="12" />
                <path d="M120,-20 Q140,160 220,380" fill="none" stroke="#64748b" strokeWidth="10" />
                <path d="M300,-10 L300,350" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="6 6" />
              </svg>

              {/* Top Map Card Controls */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-700 text-xs text-stone-200 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
                  <span>Dubai Investments Park 1 (DIP 1)</span>
                </div>
                <div className="bg-emerald-950/90 text-emerald-300 text-xs px-2.5 py-1 rounded-lg border border-emerald-700/60 font-semibold">
                  Live Location
                </div>
              </div>

              {/* Center Map Pin for Green Chilly */}
              <div className="relative z-10 mx-auto text-center transform -translate-y-2">
                <div className="relative inline-block animate-bounce">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl ring-4 ring-emerald-500/30">
                    <MapPin className="w-6 h-6 fill-white text-emerald-600" />
                  </div>
                </div>
                <div className="bg-stone-900/95 backdrop-blur-md border border-stone-700 px-3.5 py-2 rounded-xl shadow-2xl mt-2 inline-block">
                  <p className="font-display font-bold text-white text-xs sm:text-sm">
                    Green Chilly Restaurant
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Opposite Choithrams DIP 1
                  </p>
                </div>
              </div>

              {/* Landmark Callouts on Map */}
              <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400">
                <span className="bg-stone-900/80 px-2 py-1 rounded border border-stone-800">
                  DIP Metro Station (3 mins)
                </span>
                <span className="bg-stone-900/80 px-2 py-1 rounded border border-stone-800">
                  Choithrams DIP 1 (50m)
                </span>
              </div>

            </div>

            {/* Bottom Map Details */}
            <div className="p-5 bg-stone-900/70 border-t border-stone-800 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2 text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ample Parking Space</span>
                </div>
                <div className="flex items-center gap-2 text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Near DIP Metro</span>
                </div>
                <div className="flex items-center gap-2 text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Family Cabins</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
