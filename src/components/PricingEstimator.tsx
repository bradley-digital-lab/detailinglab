"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CarFront, Car, Truck } from 'lucide-react';

const SIZES = [
  { id: 'coupe', label: 'Coupe / Hatch', icon: CarFront, multiplier: 1.0 },
  { id: 'saloon', label: 'Saloon / Estate', icon: Car, multiplier: 1.15 },
  { id: 'suv', label: 'SUV / 4x4', icon: Truck, multiplier: 1.35 },
];

const TIERS = [
  { id: 'enhance', label: 'Gloss Enhancement', price: 150, desc: 'Single-stage machine polish to remove light swirling and restore gloss. Includes 6-month sealant protection.' },
  { id: 'correct', label: 'Paint Correction', price: 300, desc: 'Two-stage compound and polish removing 85%+ of swirls, scratches, and holograms. Finished with 1-year ceramic sealant.' },
  { id: 'ceramic', label: 'Correction + Ceramic', price: 500, desc: 'Full multi-stage paint correction locked in with professional 9H ceramic coating. 3–5 year protection with hydrophobic finish.' },
  { id: 'interior', label: 'Interior Reset', price: 180, desc: 'Full interior extraction with thermal steam sterilisation. Leather conditioning, Alcantara restoration, and plastics revived to delivery-day spec.' },
];

export function PricingEstimator() {
  const [size, setSize] = useState(SIZES[0]);
  const [tier, setTier] = useState(TIERS[1]);

  const estimatedPrice = Math.round(tier.price * size.multiplier);

  return (
    <div className="w-full bg-[#050505] border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl">
      <div className="grid md:grid-cols-2 gap-12">
        
        {/* Left Column: Selectors */}
        <div className="space-y-8">
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
          
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4">2. Service Tier</h3>
            <div className="flex flex-col gap-3">
              {TIERS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTier(t)}
                  className={`p-5 rounded-xl border flex flex-col text-left transition-all ${tier.id === t.id ? 'bg-cyan-500/10 border-cyan-500 shadow-[inset_0_0_20px_rgba(6,182,212,0.15)] scale-[1.02]' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
                >
                  <span className={`font-black uppercase tracking-tight text-lg mb-1 ${tier.id === t.id ? 'text-cyan-400' : 'text-white'}`}>{t.label}</span>
                  <span className="text-sm text-neutral-400 leading-relaxed">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Calculator Result */}
        <div className="flex flex-col justify-center items-center bg-[#020202] rounded-2xl p-8 border border-white/5 relative overflow-hidden">
           {/* Ambient Glow */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)] pointer-events-none" />
           
           <span className="text-cyan-500 font-bold tracking-widest uppercase text-xs mb-6 relative z-10">Estimated Price</span>
           
           <div className="relative z-10 h-32 flex items-center justify-center">
             <motion.div 
               key={estimatedPrice}
               initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
               animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
               className="text-6xl md:text-[6rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500"
             >
               £{estimatedPrice}
             </motion.div>
           </div>
           
           <p className="text-neutral-500 text-[10px] uppercase tracking-widest mt-8 text-center relative z-10">
             Starting from. Final quote after inspection. <br/>Prices include VAT.
           </p>
           
           <button className="mt-8 px-10 py-5 bg-cyan-500 text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-cyan-400 transition-colors w-full relative z-10 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
             Get Your Quote
           </button>
        </div>
        
      </div>
    </div>
  );
}
