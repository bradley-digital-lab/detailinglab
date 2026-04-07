"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Droplets, Sparkles, Layers, Zap } from 'lucide-react';

const LAYERS = [
  { label: "Metal Substrate", color: "from-neutral-700 to-neutral-900", border: "border-neutral-600/40", z: 0, glow: false },
  { label: "Primer", color: "from-neutral-600 to-neutral-800", border: "border-neutral-500/30", z: 1, glow: false },
  { label: "Base Colour", color: "from-cyan-950 to-neutral-900", border: "border-cyan-800/40", z: 2, glow: false },
  { label: "Clear Coat", color: "from-white/10 to-white/5", border: "border-white/15", z: 3, glow: false },
  { label: "SiO2 Ceramic", color: "from-cyan-500/20 to-cyan-400/10", border: "border-cyan-400/60", z: 4, glow: true },
];

function LayerSlab({ layer, index, total }: { layer: typeof LAYERS[0], index: number, total: number }) {
  const offset = index * 14;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x: -20 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      className="relative group"
      style={{ marginTop: index > 0 ? '-8px' : '0' }}
    >
      <div
        className={`
          relative w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r ${layer.color} border ${layer.border}
          flex items-center justify-between px-4 sm:px-6
          transition-all duration-500 group-hover:translate-x-2 group-hover:scale-[1.02]
          ${layer.glow ? 'shadow-[0_0_25px_rgba(6,182,212,0.25),inset_0_0_15px_rgba(6,182,212,0.1)]' : 'shadow-lg'}
        `}
      >
        {/* Scanning line for top ceramic layer */}
        {layer.glow && (
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none rounded-xl"
          />
        )}

        <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest relative z-10 ${
          layer.glow ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : index >= 3 ? 'text-neutral-300' : 'text-neutral-500'
        }`}>
          {layer.label}
        </span>

        <span className={`text-[10px] font-bold uppercase tracking-wider relative z-10 ${
          layer.glow ? 'text-cyan-500' : 'text-neutral-600'
        }`}>
          Layer {index + 1}/{total}
        </span>
      </div>
    </motion.div>
  );
}

export function InfographicSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const stackY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const stackOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  return (
    <div ref={sectionRef} className="w-full max-w-7xl mx-auto py-20 lg:py-28 px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      
      {/* Left: Layer stack visualization */}
      <motion.div
        style={{ y: stackY, opacity: stackOpacity }}
        className="w-full lg:w-[45%] relative"
      >
        {/* Section sub-header for the visual side */}
        <div className="mb-8">
          <p className="text-cyan-500/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Cross-Section Analysis</p>
          <div className="h-px w-16 bg-gradient-to-r from-cyan-500/50 to-transparent" />
        </div>

        {/* The layer stack */}
        <div className="space-y-0 max-w-md">
          {LAYERS.map((layer, i) => (
            <LayerSlab key={layer.label} layer={layer} index={i} total={LAYERS.length} />
          ))}
        </div>

        {/* Bottom annotation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex items-center gap-3 text-[10px] text-neutral-500 font-medium"
        >
          <div className="w-8 h-px bg-cyan-500/40" />
          <span className="uppercase tracking-widest">Hover layers to inspect</span>
        </motion.div>
      </motion.div>

      {/* Right: Technical data */}
      <motion.div 
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="w-full lg:w-[55%] flex flex-col justify-center"
      >
        <p className="text-cyan-500 font-bold uppercase tracking-[0.25em] text-xs mb-4 flex items-center gap-2">
          <Sparkles size={14} /> Structural Architecture
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-6 text-white leading-[1.1]">
          The Physics of <br/><span className="text-neutral-500">Perfect Paint</span>
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-10 max-w-lg">
          True protection isn&apos;t a spray-on product — it&apos;s molecular engineering. We permanently fuse a silica-based substrate into your clear coat, creating a self-leveling glass matrix rated to 9H hardness.
        </p>

        <div className="space-y-5">
          {[
            {
              icon: Shield,
              title: "Substrate Fusion",
              desc: "SiO2 ceramic penetrates clear coat pores, permanently bonding at a chemical level. Locks out UV oxidation, acid rain, and micro-contaminant embedding.",
              accent: "text-cyan-400",
              bg: "border-cyan-500/20",
            },
            {
              icon: Droplets,
              title: "Hydrophobic Shell",
              desc: "Water contact angle exceeds 110°. Liquid instantly beads and sheets off the surface, carrying dirt and contaminants with it. Self-cleaning in rain.",
              accent: "text-blue-400",
              bg: "border-blue-500/20",
            },
            {
              icon: Zap,
              title: "Anti-Static Repulsion",
              desc: "Reduces static charge accumulation by up to 80%, dramatically cutting dust adhesion between washes. Your car stays cleaner, longer.",
              accent: "text-violet-400",
              bg: "border-violet-500/20",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
              className="flex gap-4 items-start group"
            >
              <div className={`w-10 h-10 shrink-0 rounded-xl bg-white/[0.03] border ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={item.accent} size={18} />
              </div>
              <div>
                <h4 className="text-white font-black uppercase text-sm mb-1.5 tracking-wide">{item.title}</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
