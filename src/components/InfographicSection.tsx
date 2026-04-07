"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Droplets, Zap, Sparkles, ArrowDown } from 'lucide-react';

const LAYERS = [
  {
    label: "Metal Substrate",
    thickness: "0.8mm",
    detail: "The raw steel or aluminium body panel. All protection ultimately bonds to this surface.",
    gradient: "from-zinc-800 to-zinc-900",
    accentColor: "#71717a",
    heightPx: 56,
  },
  {
    label: "E-Coat Primer",
    thickness: "20μm",
    detail: "Electrodeposited corrosion primer applied at the factory. Critical anti-corrosion foundation.",
    gradient: "from-zinc-700 to-zinc-800",
    accentColor: "#a1a1aa",
    heightPx: 44,
  },
  {
    label: "Base Colour",
    thickness: "15μm",
    detail: "Your vehicle's pigment layer. Where swirl marks and scratches become visible under inspection light.",
    gradient: "from-blue-950 to-slate-900",
    accentColor: "#38bdf8",
    heightPx: 50,
  },
  {
    label: "Clear Coat",
    thickness: "40μm",
    detail: "Factory UV protection. This is the sacrificial layer we machine-correct during paint correction work.",
    gradient: "from-white/[0.08] to-white/[0.03]",
    accentColor: "#d4d4d8",
    heightPx: 46,
    isTranslucent: true,
  },
  {
    label: "9H Ceramic Coating",
    thickness: "1μm",
    detail: "Our SiO2 ceramic substrate. Chemically bonds to the clear coat creating a permanent, self-leveling glass shield rated to 9H hardness.",
    gradient: "from-cyan-500/20 to-cyan-400/5",
    accentColor: "#06b6d4",
    heightPx: 38,
    isCeramic: true,
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: "Substrate Fusion",
    stat: "9H",
    statLabel: "hardness",
    desc: "SiO2 ceramic penetrates clear coat pores, permanently bonding at a chemical level. Locks out UV oxidation and acid rain.",
    color: "#06b6d4",
  },
  {
    icon: Droplets,
    title: "Hydrophobic Shell",
    stat: "110°",
    statLabel: "contact angle",
    desc: "Liquid instantly beads and sheets off the surface, carrying dirt and contaminants with it. Self-cleaning in rain.",
    color: "#3b82f6",
  },
  {
    icon: Zap,
    title: "Anti-Static Repulsion",
    stat: "80%",
    statLabel: "less dust",
    desc: "Reduces static charge build-up dramatically, cutting dust adhesion between washes. Your car stays cleaner, longer.",
    color: "#8b5cf6",
  },
];

export function InfographicSection() {
  const [activeIndex, setActiveIndex] = useState(4);

  return (
    <div className="w-full max-w-7xl mx-auto py-20 lg:py-28 px-6">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14 lg:mb-20"
      >
        <p className="text-cyan-500 font-bold uppercase tracking-[0.25em] text-[11px] mb-4 flex items-center justify-center gap-2">
          <Sparkles size={13} /> How Ceramic Protection Works
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase text-white leading-[1.1]">
          The Physics of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Perfect Paint</span>
        </h2>
        <p className="text-neutral-500 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
          True protection isn&apos;t a spray-on product — it&apos;s molecular engineering. We permanently fuse a silica-based substrate into your clear coat.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

        {/* Left: Cross-section diagram */}
        <div className="w-full lg:w-[48%]">
          {/* Perspective container for 3D effect */}
          <div className="relative max-w-lg mx-auto lg:mx-0" style={{ perspective: '800px' }}>

            {/* Layer stack */}
            <div
              className="relative"
              style={{ transformStyle: 'preserve-3d', transform: 'rotateX(8deg) rotateY(-3deg)' }}
            >
              {LAYERS.map((layer, i) => {
                const isActive = activeIndex === i;
                return (
                  <motion.button
                    key={layer.label}
                    initial={{ opacity: 0, x: -40, rotateY: -5 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                    onClick={() => setActiveIndex(i)}
                    className={`relative w-full rounded-lg flex items-center justify-between transition-all duration-400 cursor-pointer group overflow-hidden ${
                      isActive ? 'z-20' : 'z-0 hover:z-10'
                    }`}
                    style={{
                      height: `${layer.heightPx}px`,
                      marginTop: i > 0 ? '-1px' : '0',
                      transform: isActive ? 'translateZ(12px) scale(1.03)' : 'translateZ(0) scale(1)',
                    }}
                  >
                    {/* Background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${layer.gradient} transition-all duration-400`}
                      style={{
                        boxShadow: isActive
                          ? layer.isCeramic
                            ? '0 0 40px rgba(6,182,212,0.2), inset 0 0 30px rgba(6,182,212,0.08), 0 8px 32px rgba(0,0,0,0.4)'
                            : '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)'
                          : 'inset 0 1px 0 rgba(255,255,255,0.03), inset 0 -1px 0 rgba(0,0,0,0.2)',
                      }}
                    />

                    {/* Active border glow */}
                    {isActive && (
                      <motion.div
                        layoutId="layerHighlight"
                        className="absolute inset-0 rounded-lg border-2 pointer-events-none"
                        style={{ borderColor: layer.isCeramic ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.12)' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Left accent strip */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-300"
                      style={{
                        background: layer.accentColor,
                        opacity: isActive ? 0.8 : 0.15,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 w-full flex items-center justify-between px-5">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono font-bold text-neutral-700 w-3">{i + 1}</span>
                        <span
                          className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-300"
                          style={{ color: isActive ? (layer.isCeramic ? '#22d3ee' : '#f4f4f5') : layer.accentColor }}
                        >
                          {layer.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-mono font-bold tracking-wider transition-colors duration-300"
                          style={{ color: isActive ? (layer.isCeramic ? '#67e8f9' : '#a1a1aa') : '#3f3f46' }}
                        >
                          {layer.thickness}
                        </span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: layer.accentColor }}
                          />
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}

              {/* Depth connector arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute -right-8 top-0 bottom-0 flex flex-col items-center justify-between py-2"
              >
                <div className="w-px flex-1 bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />
                <ArrowDown size={10} className="text-neutral-600 my-1" />
                <span className="text-[7px] font-mono text-neutral-600 uppercase tracking-wider -rotate-90 whitespace-nowrap origin-center translate-x-3">
                  Surface → Core
                </span>
              </motion.div>
            </div>

            {/* Layer detail panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="mt-6 px-5 py-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-3 h-3 rounded"
                      style={{
                        background: LAYERS[activeIndex].isCeramic
                          ? 'linear-gradient(135deg, #06b6d4, #0891b2)'
                          : LAYERS[activeIndex].accentColor
                      }}
                    />
                    <span className="text-xs font-black uppercase tracking-wider" style={{ color: LAYERS[activeIndex].accentColor }}>
                      {LAYERS[activeIndex].label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-600 bg-white/[0.04] px-2 py-0.5 rounded">
                    {LAYERS[activeIndex].thickness}
                  </span>
                </div>
                <p className="text-[12px] sm:text-[13px] text-neutral-400 leading-relaxed">{LAYERS[activeIndex].detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Feature cards */}
        <div className="w-full lg:w-[52%] flex flex-col gap-4">
          {FEATURES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 * i, duration: 0.5 }}
              className="group rounded-xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-400 p-5 sm:p-6"
            >
              <div className="flex gap-4 items-start">
                <div
                  className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center border group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `${item.color}10`,
                    borderColor: `${item.color}20`,
                  }}
                >
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <h4 className="text-white font-black uppercase text-[13px] sm:text-sm tracking-wide">{item.title}</h4>
                    <div className="flex items-baseline gap-1 shrink-0">
                      <span className="text-base font-black" style={{ color: item.color }}>{item.stat}</span>
                      <span className="text-[8px] text-neutral-600 font-bold uppercase tracking-wider">{item.statLabel}</span>
                    </div>
                  </div>
                  <p className="text-neutral-500 text-xs sm:text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Bottom stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-3 mt-2"
          >
            {[
              { val: "5+", label: "Years Protection", color: "#06b6d4" },
              { val: "9H", label: "Hardness Rating", color: "#3b82f6" },
              { val: "110°", label: "Water Contact", color: "#8b5cf6" },
            ].map((s, i) => (
              <div key={i} className="text-center py-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <div className="text-lg font-black" style={{ color: s.color }}>{s.val}</div>
                <div className="text-[8px] text-neutral-600 font-bold uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
