"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, Crosshair, Droplets, CheckCircle2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const SERVICES = [
  {
    id: "armor",
    title: "Ceramic Armor",
    subtitle: "9H Hardness · 5+ Year Shield",
    icon: ShieldCheck,
    accent: "cyan",
    desc: "Industrial-grade SiO2 ceramic substrate chemically bonds to your clear coat, creating an impenetrable hydrophobic fortress. UV resistance, chemical immunity, and mirror-like gloss depth.",
    bullets: [
      "Covalent molecular bonding to clear coat",
      "Self-cleaning hydrophobic surface",
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
    accent: "violet",
    desc: "We don't hide scratches — we permanently remove them. Multi-stage machine compounding obliterates swirl marks, buffer trails, holograms, and oxidation to micron-level precision.",
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
    accent: "emerald",
    desc: "Full interior extraction with thermal steam sterilisation. Leather conditioning, Alcantara restoration, and plastics revived to delivery-day spec. Your cabin, rebuilt from the inside out.",
    bullets: [
      "Hot steam extraction & sanitisation",
      "pH-neutral leather hydration protocol",
      "Alcantara & suede micro-fibre restoration"
    ],
    stat: "100%",
    statLabel: "Factory Spec"
  }
];

const ACCENT_MAP: Record<string, { text: string, border: string, bg: string, glow: string }> = {
  cyan:    { text: 'text-cyan-400',    border: 'border-cyan-500/30',    bg: 'bg-cyan-500/10',    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]' },
  violet:  { text: 'text-violet-400',  border: 'border-violet-500/30',  bg: 'bg-violet-500/10',  glow: 'shadow-[0_0_20px_rgba(139,92,246,0.15)]' },
  emerald: { text: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', glow: 'shadow-[0_0_20px_rgba(52,211,153,0.15)]' },
};

export function AnimatedShieldReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Main scroll tracking for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring for the shield entrance
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  // Shield transforms — enters with scale + slight rotation, settles into position
  const shieldScale = useTransform(smoothProgress, [0, 0.2, 0.35], [0.3, 1.05, 1]);
  const shieldOpacity = useTransform(smoothProgress, [0, 0.15, 0.25], [0, 0.6, 1]);
  const shieldRotateY = useTransform(smoothProgress, [0, 0.2, 0.35], [-25, 5, 0]);
  const shieldRotateZ = useTransform(smoothProgress, [0, 0.2, 0.35], [-8, 2, 0]);
  const shieldY = useTransform(smoothProgress, [0, 0.25, 0.4], [80, -10, 0]);
  
  // Glow pulse behind shield
  const glowScale = useTransform(smoothProgress, [0.15, 0.35], [0.5, 1.2]);
  const glowOpacity = useTransform(smoothProgress, [0.1, 0.25, 0.5], [0, 0.6, 0.3]);

  // Service cards stagger — each card reveals at a different scroll point
  const card1X = useTransform(smoothProgress, [0.2, 0.38], [120, 0]);
  const card1Opacity = useTransform(smoothProgress, [0.2, 0.35], [0, 1]);
  
  const card2X = useTransform(smoothProgress, [0.28, 0.46], [120, 0]);
  const card2Opacity = useTransform(smoothProgress, [0.28, 0.43], [0, 1]);
  
  const card3X = useTransform(smoothProgress, [0.36, 0.54], [120, 0]);
  const card3Opacity = useTransform(smoothProgress, [0.36, 0.51], [0, 1]);

  const cardTransforms = [
    { x: card1X, opacity: card1Opacity },
    { x: card2X, opacity: card2Opacity },
    { x: card3X, opacity: card3Opacity },
  ];

  // Section heading
  const headingY = useTransform(smoothProgress, [0, 0.2], [40, 0]);
  const headingOpacity = useTransform(smoothProgress, [0.02, 0.15], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-[#050505] border-t border-white/5 overflow-hidden"
    >
      {/* Subtle ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(6,182,212,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        
        {/* Section heading — scroll reveal */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-16 lg:mb-24"
        >
          <p className="text-cyan-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">What We Engineer</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter">
            Protection <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Architecture</span>
          </h2>
        </motion.div>

        {/* Main layout: Shield on left, service cards emerge from right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Shield Column — occupies 5 of 12 columns */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            {/* Background glow behind shield */}
            <motion.div
              style={{ scale: glowScale, opacity: glowOpacity }}
              className="absolute w-[90%] aspect-square rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none"
            />
            
            {/* Secondary warm glow */}
            <motion.div
              style={{ opacity: glowOpacity }}
              className="absolute w-[60%] aspect-square rounded-full bg-white/[0.03] blur-[60px] pointer-events-none"
            />

            {/* The shield */}
            <motion.div
              style={{
                scale: shieldScale,
                opacity: shieldOpacity,
                rotateY: shieldRotateY,
                rotateZ: shieldRotateZ,
                y: shieldY,
              }}
              className="relative w-[280px] sm:w-[320px] lg:w-[380px] xl:w-[420px] aspect-[0.82] z-10"
            >
              {/* Metallic rim glow */}
              <div className="absolute inset-[-4%] rounded-[20%] bg-gradient-to-b from-white/[0.08] via-transparent to-white/[0.04] blur-sm pointer-events-none" />
              
              <Image
                src="/shield_emblem.png"
                alt="Detailing Lab Yorkshire Shield Emblem"
                fill
                className="object-contain drop-shadow-[0_0_40px_rgba(200,200,220,0.15)] z-10"
                priority
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 420px"
              />

              {/* Reflection sweep — cinematic light pass across shield surface */}
              <motion.div
                animate={{ x: ['-150%', '250%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatDelay: 3 }}
                className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[20%]"
              >
                <div className="w-[30%] h-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent skew-x-[-20deg]" />
              </motion.div>
            </motion.div>
          </div>

          {/* Service Cards Column — occupies 7 of 12, cards slide in from right */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {SERVICES.map((service, i) => {
              const accent = ACCENT_MAP[service.accent];
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.id}
                  style={{ 
                    x: cardTransforms[i].x, 
                    opacity: cardTransforms[i].opacity 
                  }}
                  className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-colors duration-500 overflow-hidden`}
                >
                  {/* Hover glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-transparent ${accent.bg} to-transparent`} />

                  <div className="relative z-10 p-5 lg:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5">
                    {/* Icon + stat block */}
                    <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 shrink-0">
                      <div className={`w-11 h-11 rounded-xl ${accent.bg} border ${accent.border} flex items-center justify-center ${accent.glow} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={20} className={accent.text} strokeWidth={2} />
                      </div>
                      <div className="sm:mt-1">
                        <div className={`text-xl font-black ${accent.text} leading-none`}>{service.stat}</div>
                        <div className="text-[9px] text-neutral-600 font-bold uppercase tracking-wider">{service.statLabel}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 mb-1">
                        <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">{service.title}</h3>
                        <span className="text-[10px] text-neutral-600 font-medium tracking-wide hidden sm:inline">{service.subtitle}</span>
                      </div>
                      
                      <p className="text-neutral-400 text-sm leading-relaxed mb-3">{service.desc}</p>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-3">
                        {service.bullets.map((b, j) => (
                          <div key={j} className="flex items-center gap-1.5 group/bullet">
                            <CheckCircle2 size={12} className={`${accent.text} opacity-60 shrink-0`} />
                            <span className="text-[11px] text-neutral-500 font-medium group-hover/bullet:text-neutral-300 transition-colors">{b}</span>
                          </div>
                        ))}
                      </div>

                      <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${accent.text} opacity-70 group-hover:opacity-100 transition-opacity cursor-pointer`}>
                        Get a Quote <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
