import React, { useState } from 'react';
import { Gift, Award, Star, Sparkles, Check, Quote } from 'lucide-react';
import { REVIEWS } from '../data/restaurantData';

export const LoyaltySection: React.FC = () => {
  const [scratched, setScratched] = useState(false);
  const [userPoints, setUserPoints] = useState(120);
  const [claimedReward, setClaimedReward] = useState<string | null>(null);

  const perks = [
    { points: 50, title: 'Free Zafran Karak Chai', desc: 'Complimentary special milk tea with your meal', code: 'FREEKARAK' },
    { points: 100, title: '15% Off Dine-In or Delivery', desc: 'Valid on bills above AED 40 in DIP', code: 'CHILLY15' },
    { points: 200, title: 'Free Chicken Dum Biryani', desc: '1 Full portion of Royal Dum Biryani', code: 'FREEBIRYANI' },
  ];

  const handleClaim = (perkTitle: string, code: string) => {
    setClaimedReward(`Claimed: ${perkTitle}! Use code "${code}" at checkout.`);
  };

  const handleScratch = () => {
    if (!scratched) {
      setScratched(true);
      setUserPoints((p) => p + 30);
    }
  };

  return (
    <section id="rewards" className="py-16 bg-stone-900/80 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <span>Customer Privileges</span>
            <span aria-hidden="true">·</span>
            <span>Chilly Club</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Earn Chilly Points & Exclusive DIP Perks
          </h2>
          <p className="text-sm text-stone-400 mt-1">
            Every AED 1 spent on dining or delivery earns you 2 Chilly Points. Redeem for complimentary karak chai, sizzler discounts, and free biryanis.
          </p>
        </div>

        {/* 2-Column Grid: Rewards Card & Interactive Scratch Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Rewards Tiers (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 bg-stone-800/40 rounded-xl border border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400">Your Current Balance:</span>
                <p className="text-xl font-display font-extrabold text-emerald-400 tabular-nums">
                  {userPoints} Chilly Points
                </p>
              </div>
              <span className="text-xs text-stone-300 bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700">
                Gold DIP Member
              </span>
            </div>

            <div className="space-y-3">
              {perks.map((perk) => {
                const canRedeem = userPoints >= perk.points;
                return (
                  <div
                    key={perk.title}
                    className="p-4 bg-stone-800/50 border border-stone-700/70 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-950/70 border border-amber-600/60 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                        <Gift className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{perk.title}</h4>
                          <span className="text-[11px] font-semibold text-emerald-400 tabular-nums">
                            {perk.points} pts
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 mt-0.5">{perk.desc}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleClaim(perk.title, perk.code)}
                      disabled={!canRedeem}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                        canRedeem
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                          : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                      }`}
                    >
                      {canRedeem ? 'Redeem Perk' : 'Need More Pts'}
                    </button>
                  </div>
                );
              })}
            </div>

            {claimedReward && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-600 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{claimedReward}</span>
              </div>
            )}
          </div>

          {/* Daily Scratch Card (5 cols on lg) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-800/80 to-stone-900 border border-stone-700 rounded-2xl p-6 flex flex-col justify-between text-center shadow-xl">
            <div>
              <div className="flex items-center justify-center gap-2 text-amber-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Daily Surprise</span>
              </div>
              <h3 className="font-display font-bold text-xl text-white">
                Green Chilly Mystery Scratch Card
              </h3>
              <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                Scratch or tap daily to win bonus points or instant coupon discounts on your order!
              </p>
            </div>

            <div className="my-6">
              {!scratched ? (
                <button
                  type="button"
                  onClick={handleScratch}
                  className="w-full py-12 px-4 rounded-xl border-2 border-dashed border-amber-500/60 bg-amber-950/20 hover:bg-amber-950/30 transition-all flex flex-col items-center justify-center gap-2 text-stone-300 hover:text-white cursor-pointer group"
                >
                  <Award className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="font-display font-bold text-sm text-amber-300">
                    Tap to Scratch Card
                  </span>
                  <span className="text-[11px] text-stone-400">Guaranteed prize inside</span>
                </button>
              ) : (
                <div className="py-8 px-4 rounded-xl bg-emerald-950/60 border border-emerald-600 space-y-2 animate-fade-in">
                  <span className="text-2xl">🎉</span>
                  <h4 className="font-display font-bold text-lg text-emerald-300">
                    You Won +30 Chilly Points!
                  </h4>
                  <p className="text-xs text-stone-300">
                    Plus use promo code <strong className="text-amber-400">GREENCHILLY10</strong> for 10% off any order today.
                  </p>
                </div>
              )}
            </div>

            <p className="text-[11px] text-stone-500">
              Points automatically saved to your profile on this device.
            </p>
          </div>

        </div>

        {/* Customer Reviews Section */}
        <div className="pt-10 border-t border-stone-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                Loved by Food Lovers across DIP
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Real customer feedback from our diners and corporate delivery partners.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-400 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="font-bold text-white">4.5 / 5.0</span>
              <span className="text-stone-400">on Google</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-xl bg-stone-800/40 border border-stone-800 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                    <span className="font-semibold text-white">{rev.author}</span>
                    <span>{rev.relativeTime}</span>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400 mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="truncate max-w-[140px] text-emerald-400 font-medium">
                    {rev.favoriteDish}
                  </span>
                  <span className="bg-stone-900 px-2 py-0.5 rounded text-stone-400">
                    {rev.visitType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
