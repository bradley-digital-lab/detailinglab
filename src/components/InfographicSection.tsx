"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Droplets, Zap, Sparkles } from 'lucide-react';

const LAYERS = [
  {
    label: "Metal Substrate",
    thickness: "0.8mm",
    detail: "The raw steel or aluminium body panel. All protection ultimately bonds to this surface.",
    color: "#3f3f46",
    textColor: "#a1a1aa",
    height: "h-[52px]",
  },
  {
    label: "E-Coat Primer",
    thickness: "20μm",
    detail: "Electrodeposited corrosion primer applied at the factory. Critical foundation layer.",
    color: "#52525b",
    textColor: "#a1a1aa",
    height: "h-[44px]",
  },
  {
    label: "Base Colour",
    thickness: "15μm",
    detail: "Your vehicle's pigment layer. Where swirl marks and scratches become visible.",
    color: "#1e3a5f",
    textColor: "#7dd3fc",
    height: "h-[48px]",
  },
  {
    label: "Clear Coat",
    thickness: "40μm",
    detail: "Factory UV protection. This is the layer we machine-correct during paint correction.",
    color: "rgba(255,255,255,0.06)",
    textColor: "#d4d4d8",
    height: "h-[44px]",
    isTranslucent: true,
  },
  {
    label: "9H Ceramic",
    thickness: "1μm",
    detail: "Our SiO2 ceramic substrate. Chemically bonds to the clear coat creating a permanent glass shield.",
    color: "#06b6d4",
    textColor: "#06b6d4",
    height: "h-[40px]",
    isCeramic: true,
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: "Substrate Fusion",
    desc: "SiO2 ceramic penetrates clear coat pores, permanently bonding at a chemical level. Locks out UV oxidation, acid rain, and micro-contaminant embedding.",
    color: "#06b6d4",
  },
  {
    icon: Droplets,
    title: "Hydrophobic Shell",
    desc: "Water contact angle exceeds 110°. Liquid instantly beads and sheets off, carrying dirt and contaminants with it. Self-cleaning in rain.",
    color: "#3b82f6",
  },
  {
    icon: Zap,
    title: "Anti-Static Repulsion",
    desc: "Reduces static charge build-up by up to 80%, dramatically cutting dust adhesion between washes. Your car stays cleaner, longer.",
    color: "#8b5cf6",
  },
];

function LayerBlock({ layer, index, isActive, onClick }: {
  layer: typeof LAYERS[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className={`relative w-full ${layer.height} rounded-lg flex items-center justify-between px-5 transition-all duration-400 cursor-pointer group border ${
        isActive
          ? 'scale-[1.03] z-10'
          : 'hover:scale-[1.01] z-0'
      }`}
      style={{
        background: layer.isCeramic
          ? `linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.05) 100%)`
          : layer.isTranslucent
            ? 'rgba(255,255,255,0.03)'
            : `linear-gradient(135deg, ${layer.color} 0%, ${layer.color}dd 100%)`,
        borderColor: isActive
          ? layer.isCeramic ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.15)'
          : layer.isCeramic ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.05)',
        boxShadow: isActive && layer.isCeramic
          ? '0 0 30px rgba(6,182,212,0.15), inset 0 0 20px rgba(6,182,212,0.05)'
          : isActive
            ? '0 4px 20px rgba(0,0,0,0.3)'
            : 'none',
      }}
    >
      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] relative z-10 transition-colors duration-300"
        style={{ color: isActive ? (layer.isCeramic ? '#06b6d4' : '#e4e4e7') : layer.textColor }}
      >
        {layer.label}
      </span>

      <span className="text-[10px] font-mono font-bold uppercase tracking-wider relative z-10 transition-colors duration-300"
        style={{ color: isActive ? (layer.isCeramic ? '#22d3ee' : '#a1a1aa') : '#52525b' }}
      >
        {layer.thickness}
      </span>
    </motion.button>
  );
}

export function InfographicSection() {
  const [activeIndex, setActiveIndex] = useState(4); // Start with ceramic selected

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
          <Sparkles size={13} /> Structural Architecture
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase text-white leading-[1.1]">
          The Physics of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Perfect Paint</span>
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

        {/* Left: Interactive layer stack */}
        <div className="w-full lg:w-[42%]">
          <div className="flex flex-col gap-[3px] max-w-md mx-auto lg:mx-0">
            {LAYERS.map((layer, i) => (
              <LayerBlock
                key={layer.label}
                layer={layer}
                index={i}
                isActive={activeIndex === i}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>

          {/* Layer detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="mt-5 max-w-md mx-auto lg:mx-0 px-4 py-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06]"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: LAYERS[activeIndex].isCeramic ? '#06b6d4' : LAYERS[activeIndex].color }} />
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: LAYERS[activeIndex].textColor }}>
                  {LAYERS[activeIndex].label}
                </span>
                <span className="text-[10px] font-mono text-neutral-600 ml-auto">{LAYERS[activeIndex].thickness}</span>
              </div>
              <p className="text-[12px] text-neutral-500 leading-relaxed">{LAYERS[activeIndex].detail}</p>
            </motion.div>
          </AnimatePresence>

          {/* Instruction */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-4 text-[10px] text-neutral-600 uppercase tracking-widest max-w-md mx-auto lg:mx-0"
          >
            ↑ Tap a layer to inspect
          </motion.p>
        </div>

        {/* Right: Description + features */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full lg:w-[58%]"
        >
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-10 max-w-lg">
            True protection isn&apos;t a spray-on product — it&apos;s molecular engineering. We permanently fuse a silica-based substrate into your clear coat, creating a self-leveling glass matrix rated to 9H hardness.
          </p>

          <div className="space-y-4">
            {FEATURES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="flex gap-4 items-start group"
              >
                <div
                  className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `${item.color}10`,
                    borderColor: `${item.color}25`,
                  }}
                >
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase text-[13px] sm:text-sm mb-1 tracking-wide">{item.title}</h4>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
