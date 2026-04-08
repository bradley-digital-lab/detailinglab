"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CarFront, Car, Truck, Plus, Check } from 'lucide-react';

export const SIZES = [
  { id: 'coupe', label: 'Coupe / Hatch', icon: CarFront, multiplier: 1.0 },
  { id: 'saloon', label: 'Saloon / Estate', icon: Car, multiplier: 1.15 },
  { id: 'suv', label: 'SUV / 4x4', icon: Truck, multiplier: 1.3225 },
];

// Paint correction tiers — mutually exclusive (they're stages)
export const PAINT_TIERS = [
  { id: 'enhance', label: 'Gloss Enhancement', price: 250, desc: 'Single-stage machine polish to remove light swirling and restore gloss. Includes 6-month sealant protection.' },
  { id: 'correct', label: 'Paint Correction', price: 300, desc: 'Two-stage compound and polish removing 85%+ of swirls, scratches, and holograms. Finished with 1-year ceramic sealant.' },
  { id: 'ceramic', label: 'Correction + Ceramic', price: 500, desc: 'Full multi-stage paint correction locked in with professional 9H ceramic coating. 3–5 year protection with hydrophobic finish.' },
];

// Interior reset — optional add-on
export const INTERIOR = { id: 'interior', label: 'Interior Reset', price: 95, desc: 'Full interior extraction with thermal steam sterilisation. Leather conditioning, Alcantara restoration, and plastics revived to delivery-day spec.' };

export const BUNDLE_DISCOUNT = 0.10; // 10% off interior when bundled

export function PricingEstimator({ onBook }: { onBook?: (pkg: any) => void }) {
  const [size, setSize] = useState(SIZES[0]);
  const [paintTier, setPaintTier] = useState(PAINT_TIERS[1]);
  const [includeInterior, setIncludeInterior] = useState(false);

  const paintPrice = Math.round(paintTier.price * size.multiplier);
  const interiorFull = Math.round(INTERIOR.price * size.multiplier);
  const interiorDiscounted = Math.round(interiorFull * (1 - BUNDLE_DISCOUNT));
  const totalPrice = includeInterior ? paintPrice + interiorDiscounted : paintPrice;

  return (
    <div className="w-full bg-[#050505] border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl">
      <div className="grid md:grid-cols-2 gap-12">
        
        {/* Left Column: Selectors */}
        <div className="space-y-8">
          {/* Vehicle Size */}
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4">1. Vehicle Size</h3>
            <div className="grid grid-cols-3 gap-3">
              {SIZES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSize(s)}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-colors ${size.id === s.id ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[inset_0_0_20px_rgba(6,182,212,0.15)]' : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'}`}
                >
                  <s.icon size={24} />
                  <span className="text-[10px] sm:text-xs font-bold text-center leading-tight uppercase tracking-wide">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Paint Correction Tier — single select */}
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4">2. Exterior Service</h3>
            <div className="flex flex-col gap-3">
              {PAINT_TIERS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setPaintTier(t)}
                  className={`p-5 rounded-xl border flex flex-col text-left transition-all ${paintTier.id === t.id ? 'bg-cyan-500/10 border-cyan-500 shadow-[inset_0_0_20px_rgba(6,182,212,0.15)] scale-[1.02]' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`font-black uppercase tracking-tight text-lg ${paintTier.id === t.id ? 'text-cyan-400' : 'text-white'}`}>{t.label}</span>
                    <span className={`text-sm font-bold ${paintTier.id === t.id ? 'text-cyan-400' : 'text-neutral-500'}`}>
                      £{Math.round(t.price * size.multiplier)}
                    </span>
                  </div>
                  <span className="text-sm text-neutral-400 leading-relaxed">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interior Add-on — toggle */}
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4">3. Add Interior?</h3>
            <button
              onClick={() => setIncludeInterior(!includeInterior)}
              className={`w-full p-5 rounded-xl border flex items-start gap-4 text-left transition-all ${
                includeInterior
                  ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[inset_0_0_20px_rgba(52,211,153,0.1)]'
                  : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {/* Checkbox */}
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                includeInterior
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-neutral-600'
              }`}>
                {includeInterior && <Check size={14} className="text-black" strokeWidth={3} />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-black uppercase tracking-tight text-lg ${includeInterior ? 'text-emerald-400' : 'text-white'}`}>{INTERIOR.label}</span>
                  <div className="text-right">
                    {includeInterior ? (
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-600 line-through text-xs">£{interiorFull}</span>
                        <span className="text-emerald-400 font-bold text-sm">£{interiorDiscounted}</span>
                      </div>
                    ) : (
                      <span className="text-neutral-500 font-bold text-sm flex items-center gap-1">
                        <Plus size={12} /> £{interiorFull}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-sm text-neutral-400 leading-relaxed">{INTERIOR.desc}</span>
                {includeInterior && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-emerald-500/70 text-[10px] font-bold uppercase tracking-widest mt-2"
                  >
                    10% bundle discount applied
                  </motion.p>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Calculator Result */}
        <div className="flex flex-col justify-center items-center bg-[#020202] rounded-2xl p-8 border border-white/5 relative overflow-hidden">
           {/* Ambient Glow */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)] pointer-events-none" />
           
           <span className="text-cyan-500 font-bold tracking-widest uppercase text-xs mb-6 relative z-10">Your Estimate</span>
           
           <div className="relative z-10 h-32 flex items-center justify-center">
             <motion.div 
               key={totalPrice}
               initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
               animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
               className="text-6xl md:text-[6rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500"
             >
               £{totalPrice}
             </motion.div>
           </div>

           {/* Breakdown */}
           <div className="relative z-10 w-full max-w-xs space-y-2 mt-4 mb-6">
             <div className="flex items-center justify-between text-xs">
               <span className="text-neutral-500">{paintTier.label}</span>
               <span className="text-neutral-400 font-bold">£{paintPrice}</span>
             </div>
             {includeInterior && (
               <motion.div
                 initial={{ opacity: 0, y: -5 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex items-center justify-between text-xs"
               >
                 <span className="text-neutral-500">{INTERIOR.label} <span className="text-emerald-500/60">(-10%)</span></span>
                 <span className="text-emerald-400 font-bold">£{interiorDiscounted}</span>
               </motion.div>
             )}
             <div className="h-px bg-white/10 !mt-3" />
           </div>
           
           <p className="text-neutral-500 text-[10px] uppercase tracking-widest text-center relative z-10">
             Starting from · {size.label} · Inc. VAT
           </p>
           
           <button 
             onClick={() => onBook?.({ size, paintTier, includeInterior })}
             className="mt-6 px-10 py-5 bg-cyan-500 text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-cyan-400 transition-colors w-full relative z-10 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
           >
             Get Booked In!
           </button>
        </div>
        
      </div>
    </div>
  );
}
