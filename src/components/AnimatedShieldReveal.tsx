"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Crosshair, Droplets, CheckCircle2, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const STANDARDS = [
  {
    id: "precision",
    title: "Surgical Precision",
    subtitle: "Measured · Verified · Flawless",
    icon: Crosshair,
    color: "#8b5cf6",
    desc: "Every vehicle is assessed with paint depth gauges and LED inspection lights. We measure before we correct — no guesswork, no shortcuts.",
    bullets: [
      "Paint depth readings before every cut",
      "LED panel inspection for hidden defects",
      "Micron-level compound calibration"
    ],
    stat: "0%",
    statLabel: "Guesswork"
  },
  {
    id: "protection",
    title: "Engineered Protection",
    subtitle: "9H Ceramic · SiO2 Substrate",
    icon: ShieldCheck,
    color: "#06b6d4",
    desc: "We use only professional-grade SiO2 coatings that chemically bond to your clear coat — creating a permanent, self-cleaning shield rated to 9H hardness.",
    bullets: [
      "Covalent molecular bonding technology",
      "Hydrophobic self-cleaning surface",
      "3–5 year certified protection"
    ],
    stat: "9H",
    statLabel: "Hardness"
  },
  {
    id: "results",
    title: "Guaranteed Results",
    subtitle: "Insured · Documented · Proven",
    icon: Droplets,
    color: "#34d399",
    desc: "Every job is fully insured and documented with before/after photography. Our results speak for themselves — factory-spec finishes, every time.",
    bullets: [
      "Full before & after documentation",
      "Fully insured detailing operation",
      "West Yorkshire mobile & workshop"
    ],
    stat: "100%",
    statLabel: "Satisfaction"
  }
];

// Simple spring config for satisfying motion
const spring = { type: "spring" as const, stiffness: 120, damping: 20 };
const gentleSpring = { type: "spring" as const, stiffness: 80, damping: 22 };

export function AnimatedShieldReveal() {
  return (
    <section
      id="services"
      className="relative w-full bg-[#050505] border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_40%,rgba(6,182,212,0.03)_0%,transparent_55%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-cyan-500 text-[11px] font-bold uppercase tracking-[0.3em] mb-4">The Detailing Lab</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Standard</span>
          </h2>
        </motion.div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">

          {/* ── SHIELD ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...spring, duration: 1 }}
            className="relative shrink-0 w-[240px] sm:w-[280px] lg:w-[340px] xl:w-[380px] lg:sticky lg:top-28"
          >
            {/* Ambient glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1.2 }}
              className="absolute inset-[-25%] rounded-full bg-cyan-500/[0.06] blur-[80px] pointer-events-none"
            />

            {/* Shield image */}
            <div className="relative aspect-[0.82]">
              <Image
                src="/shield_emblem.png"
                alt="Detailing Lab Yorkshire Shield"
                fill
                className="object-contain drop-shadow-[0_8px_40px_rgba(180,190,210,0.18)]"
                priority
                sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 380px"
              />

              {/* Light sweep — masked to shield shape only */}
              <div
                className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
                style={{
                  WebkitMaskImage: 'url(/shield_emblem.png)',
                  maskImage: 'url(/shield_emblem.png)',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                }}
              >
                <motion.div
                  animate={{ x: ['-100%', '400%'] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: [0.4, 0, 0.2, 1], repeatDelay: 7 }}
                  className="absolute inset-y-0 left-0 w-[18%] skew-x-[-15deg]"
                >
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
                </motion.div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, ...gentleSpring }}
              className="absolute top-[10%] right-[-8%] sm:right-[-12%]"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-xl border border-cyan-500/25 text-[9px] font-bold text-cyan-400 uppercase tracking-wider"
              >
                9H Ceramic
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, ...gentleSpring }}
              className="absolute bottom-[12%] left-[-8%] sm:left-[-12%]"
            >
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-xl border border-emerald-500/25 text-[9px] font-bold text-emerald-400 uppercase tracking-wider"
              >
                5yr Protection
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── SERVICE CARDS ── */}
          <div className="flex-1 flex flex-col gap-4 w-full min-w-0">
            {STANDARDS.map((service, i) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 0.15 + i * 0.12, ...gentleSpring }}
                  className="group"
                >
                  <div className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.025] to-transparent hover:from-white/[0.05] hover:border-white/[0.12] transition-all duration-400 overflow-hidden">
                    {/* Left accent bar */}
                    <div
                      className="absolute left-0 top-5 bottom-5 w-[2px] rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-500"
                      style={{ background: `linear-gradient(to bottom, ${service.color}, transparent)` }}
                    />

                    <div className="p-5 sm:p-6 pl-6 sm:pl-7">
                      {/* Header: Icon + Title + Stat */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110"
                            style={{
                              background: `${service.color}12`,
                              borderColor: `${service.color}25`,
                            }}
                          >
                            <Icon size={16} style={{ color: service.color }} strokeWidth={2} />
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-[15px] font-black uppercase tracking-tight text-white leading-tight">{service.title}</h3>
                            <p className="text-[9px] sm:text-[10px] text-neutral-500 font-medium tracking-wider uppercase">{service.subtitle}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-lg sm:text-xl font-black leading-none" style={{ color: service.color }}>{service.stat}</div>
                          <div className="text-[7px] sm:text-[8px] text-neutral-600 font-bold uppercase tracking-widest">{service.statLabel}</div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-neutral-400 text-xs sm:text-[13px] leading-relaxed mb-3.5">{service.desc}</p>

                      {/* Bullets — 3 column on sm+ */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-3 mb-3.5">
                        {service.bullets.map((b, j) => (
                          <div key={j} className="flex items-start gap-1.5">
                            <CheckCircle2 size={11} className="shrink-0 mt-[3px] opacity-40" style={{ color: service.color }} />
                            <span className="text-[10px] sm:text-[11px] text-neutral-500 leading-snug">{b}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* See Our Work — single CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-2"
            >
              <a
                href="#evidence"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-400 text-[11px] font-bold uppercase tracking-wider hover:bg-cyan-500/[0.12] hover:border-cyan-500/40 transition-all duration-300"
              >
                See Our Work <ChevronRight size={14} />
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] text-neutral-600 font-medium uppercase tracking-widest mt-3 pl-1"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-cyan-500/50" />
                Fully Insured
              </div>
              <div className="w-px h-2.5 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500/50" />
                Mobile & Workshop
              </div>
              <div className="w-px h-2.5 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-violet-500/50" />
                West Yorkshire
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
