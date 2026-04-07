"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Crosshair, Droplets, CheckCircle2, ArrowRight, Zap, Layers } from 'lucide-react';

const SERVICES = [
  {
    id: "armor",
    title: "Ceramic Armor",
    subtitle: "9H Hardness · 5+ Year Shield",
    icon: ShieldCheck,
    accent: "from-cyan-400 to-blue-500",
    accentBg: "rgba(6,182,212,0.12)",
    accentBorder: "rgba(6,182,212,0.3)",
    desc: "Industrial-grade SiO2 ceramic substrate chemically bonds to your clear coat, creating an impenetrable hydrophobic fortress. UV resistance, chemical immunity, and a mirror-like depth of gloss that self-cleans in rain.",
    bullets: [
      "Covalent molecular bonding to clear coat",
      "Self-cleaning hydrophobic surface technology",
      "Paint thickness verified with micron gauge"
    ],
    stat: "9H",
    statLabel: "Hardness"
  },
  {
    id: "correction",
    title: "Paint Correction",
    subtitle: "Stage 1–3 · Machine Compound",
    icon: Crosshair,
    accent: "from-violet-400 to-purple-500",
    accentBg: "rgba(139,92,246,0.12)",
    accentBorder: "rgba(139,92,246,0.3)",
    desc: "We don't hide scratches — we permanently remove them. Multi-stage machine compounding obliterates swirl marks, buffer trails, holograms, and oxidation down to micron-level precision.",
    bullets: [
      "Paint depth analysis before every cut",
      "Permanent swirl & hologram elimination",
      "Factory-spec mirror finish restoration"
    ],
    stat: "0%",
    statLabel: "Swirl Marks"
  },
  {
    id: "interior",
    title: "Interior Reset",
    subtitle: "Deep Clean · Leather · Steam",
    icon: Droplets,
    accent: "from-emerald-400 to-teal-500",
    accentBg: "rgba(52,211,153,0.12)",
    accentBorder: "rgba(52,211,153,0.3)",
    desc: "Full interior extraction with thermal steam sterilization. Leather conditioning, Alcantara restoration, and plastics revived to delivery-day spec. Your cabin, rebuilt from the inside out.",
    bullets: [
      "Hot steam extraction & sanitization",
      "pH-neutral leather hydration protocol",
      "Alcantara & suede micro-fibre restoration"
    ],
    stat: "100%",
    statLabel: "Factory Spec"
  }
];

function ServiceCard({ service, isActive, onClick }: { service: typeof SERVICES[0], isActive: boolean, onClick: () => void }) {
  const Icon = service.icon;

  return (
    <motion.button
      onClick={onClick}
      layout
      className={`relative group text-left w-full rounded-2xl border transition-all duration-500 overflow-hidden ${
        isActive 
          ? 'bg-white/[0.04] border-white/15 shadow-2xl' 
          : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
      }`}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Active indicator glow */}
      {isActive && (
        <motion.div
          layoutId="activeGlow"
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ 
            background: `radial-gradient(ellipse at 30% 50%, ${service.accentBg}, transparent 70%)`,
            border: `1px solid ${service.accentBorder}`
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <div className="relative z-10 p-5 lg:p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${service.accent} shadow-lg`}>
            <Icon size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div className={`text-right transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`text-2xl font-black bg-gradient-to-r ${service.accent} bg-clip-text text-transparent`}>{service.stat}</div>
            <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">{service.statLabel}</div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-black uppercase tracking-tight text-white mb-0.5">{service.title}</h3>
        <p className="text-[11px] text-neutral-500 font-medium tracking-wide mb-3">{service.subtitle}</p>

        {/* Expanded content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">{service.desc}</p>
              <div className="space-y-2.5">
                {service.bullets.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex items-center gap-2.5"
                  >
                    <CheckCircle2 size={14} className={`shrink-0 bg-gradient-to-r ${service.accent} bg-clip-text`} style={{ color: service.accentBorder }} />
                    <span className="text-xs text-neutral-300 font-medium">{b}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${service.accent} bg-clip-text text-transparent`}
              >
                Get a Quote <ArrowRight size={14} style={{ color: service.accentBorder }} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

function CentralShieldEmblem() {
  return (
    <div className="relative w-full aspect-square max-w-[320px] lg:max-w-[400px] mx-auto flex items-center justify-center">
      {/* Outermost pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0, 0.15] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full border border-cyan-500/20"
      />
      
      {/* Outer orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        className="absolute inset-[5%] rounded-full border border-white/[0.06]"
      >
        {/* Orbiting dot */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
      </motion.div>
      
      {/* Mid ring with dash pattern */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        className="absolute inset-[15%] rounded-full border border-dashed border-cyan-500/10"
      />

      {/* Inner ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="absolute inset-[25%] rounded-full border border-white/[0.04]"
      >
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
      </motion.div>

      {/* Central glowing orb */}
      <div className="relative z-10 w-[45%] aspect-square">
        {/* Deep background glow */}
        <div className="absolute inset-[-50%] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        
        {/* Metallic sphere */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1a2030] via-[#0a0f18] to-[#0d1520] border border-cyan-500/20 shadow-[0_0_60px_rgba(6,182,212,0.2),inset_0_2px_20px_rgba(255,255,255,0.08)]" />
        
        {/* Glossy highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/[0.06]" />
        
        {/* Rotating conic sweep */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="absolute inset-[15%] rounded-full opacity-40"
          style={{ background: 'conic-gradient(from 0deg, transparent, rgba(6,182,212,0.6), transparent)', mixBlendMode: 'screen' }}
        />
        
        {/* Central icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ShieldCheck size={36} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" strokeWidth={1.5} />
        </div>
      </div>

      {/* Floating label badges */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-[8%] right-[5%] px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-wider shadow-lg"
      >
        <Zap size={10} className="inline mr-1" />9H Hardness
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[8%] left-[5%] px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-wider shadow-lg"
      >
        <Layers size={10} className="inline mr-1" />5yr Armor
      </motion.div>
    </div>
  );
}

export function AnimatedShieldReveal() {
  const [activeTab, setActiveTab] = useState(SERVICES[0].id);

  return (
    <section id="services" className="relative w-full bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Subtle background radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,182,212,0.04)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 lg:mb-20"
        >
          <p className="text-cyan-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">What We Engineer</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter">
            Protection <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Architecture</span>
          </h2>
        </motion.div>

        {/* Main layout: Services left, Shield center-right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Service cards column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isActive={activeTab === service.id}
                onClick={() => setActiveTab(service.id)}
              />
            ))}
          </motion.div>

          {/* Central Shield visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <CentralShieldEmblem />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
