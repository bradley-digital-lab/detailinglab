import React from 'react';
import { ShieldAlert, TrendingDown, Crosshair, Zap, Car } from 'lucide-react';
import { motion } from 'framer-motion';

// This dynamic layout intercepts searches for competitive brands and programmatically generates an aggressive comparison page.
export default async function CompareCompetitor({ params }: { params: { competitor: string } }) {
  const competitorName = decodeURIComponent(params.competitor).replace(/-/g, ' ');
  const capitalizedCompetitor = competitorName.replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-sans selection:bg-cyan-500/30">
      
      {/* WARNING BANNER */}
      <div className="fixed top-0 left-0 w-full bg-red-600/10 border-b border-red-500/30 text-red-500 py-2 text-center text-xs font-bold uppercase tracking-widest z-50 flex items-center justify-center gap-2 backdrop-blur-md">
        <Crosshair className="w-4 h-4" /> Consumer Protection Notice
      </div>

      <div className="mx-auto max-w-6xl w-full">
        {/* HEADER SECTION */}
        <div className="mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
            Direct Comparison
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white leading-tight">
            Detailing Lab <br className="md:hidden" />
            <span className="text-zinc-600 px-4 md:px-6 text-4xl">VS</span> <br className="md:hidden" />
            <span className="text-red-500">{capitalizedCompetitor}</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl uppercase tracking-wider font-bold border-l-4 border-red-500 pl-4 py-1">
            Why settling for high-volume commercial washing is slowly destroying your vehicle's clear coat. The absolute truth about Northern detailing standards.
          </p>
        </div>

        {/* COMPARISON GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
          
          {/* VS Divider Graphic (Desktop) */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-zinc-900 border-2 border-zinc-800 rounded-full items-center justify-center font-black text-xl z-10 text-zinc-500 shadow-2xl">
            VS
          </div>

          {/* COMPETITOR BLOCK (NEGATIVE ANCHORING) */}
          <div className="p-8 md:p-10 rounded-3xl bg-zinc-900 border border-zinc-800 relative group transition-all hover:border-red-500/30">
            <h2 className="text-2xl md:text-3xl font-black text-red-500 mb-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-500" />
              </div>
              The {capitalizedCompetitor} Approach
            </h2>
            
            <ul className="space-y-8">
              <li className="flex items-start gap-5">
                <span className="text-red-500 font-black text-2xl mt-1 opacity-50">01</span>
                <div>
                  <h3 className="font-bold text-xl text-white tracking-wide uppercase">Volume Over Quality</h3>
                  <p className="text-zinc-400 mt-2 leading-relaxed">
                    Churning through 10+ cars a day physically prevents proper chemical bonding times. You are paying for speed, not protection.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-5">
                <span className="text-red-500 font-black text-2xl mt-1 opacity-50">02</span>
                <div>
                  <h3 className="font-bold text-xl text-white tracking-wide uppercase">Acidic Chemical Wash</h3>
                  <p className="text-zinc-400 mt-2 leading-relaxed">
                    Heavy traffic means using aggressive TFRs (Traffic Film Removers) to melt dirt instantly. This slowly strips protective waxes and ages plastics.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-5">
                <span className="text-red-500 font-black text-2xl mt-1 opacity-50">03</span>
                <div>
                  <h3 className="font-bold text-xl text-white tracking-wide uppercase">Contaminated Media</h3>
                  <p className="text-zinc-400 mt-2 leading-relaxed">
                    Wash mitts are reused across multiple commercial vehicles before touching yours. Micro-scratching is a mathematical certainty.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* DETAILING LAB BLOCK (SUPERIORITY) */}
          <div className="p-8 md:p-10 rounded-3xl bg-black border-2 border-cyan-500 shadow-[0_0_60px_rgba(6,182,212,0.15)] relative overflow-hidden">
            <div className="absolute -right-12 top-10 rotate-45 bg-cyan-500 text-black font-black text-[10px] uppercase tracking-[0.2em] py-2 w-48 text-center shadow-lg">
              The Standard
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-cyan-400 mb-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-cyan-400" />
              </div>
              Detailing Lab
            </h2>
            
            <ul className="space-y-8">
              <li className="flex items-start gap-5">
                <span className="text-cyan-500 font-black text-2xl mt-1 opacity-50">01</span>
                <div>
                  <h3 className="font-bold text-xl text-white tracking-wide uppercase">Scientific Curing</h3>
                  <p className="text-zinc-400 mt-2 leading-relaxed">
                    Dedicated temperature-controlled curing zones. We do not release the vehicle until the nano-ceramic bond is chemically locked.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-5">
                <span className="text-cyan-500 font-black text-2xl mt-1 opacity-50">02</span>
                <div>
                  <h3 className="font-bold text-xl text-white tracking-wide uppercase">PH Neutral Matrix</h3>
                  <p className="text-zinc-400 mt-2 leading-relaxed">
                    Zero acid washes. We use laboratory-grade, PH-neutral snow foams that lift embedded iron particles without stressing the lacquer.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-5">
                <span className="text-cyan-500 font-black text-2xl mt-1 opacity-50">03</span>
                <div>
                  <h3 className="font-bold text-xl text-white tracking-wide uppercase">Quarantine Protocol</h3>
                  <p className="text-zinc-400 mt-2 leading-relaxed">
                    Fresh microfiber media unsealed specifically for your vehicle, then quarantined after one use. Zero cross-contamination.
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* CTA TO CAPTURE THE LEAD */}
        <div className="mt-20 pt-16 border-t border-zinc-900 text-center">
          <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Stop Subsidizing Inferior Washes
          </h3>
          <p className="text-zinc-400 mb-10 max-w-2xl mx-auto">
            If you are tired of swirl marks, stripped clear coats, and volume-based detailing, it's time to upgrade to a controlled laboratory environment.
          </p>
          <a href="/booking" className="inline-flex items-center gap-3 px-10 py-5 bg-cyan-500 text-black font-black text-sm uppercase tracking-widest hover:bg-cyan-400 transition-colors rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <Car className="w-5 h-5" />
            Switch to The Lab
          </a>
        </div>

      </div>
    </div>
  );
}
