"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, Crosshair, CheckCircle2, ArrowRight, X, Droplet, Droplets, Sparkles } from 'lucide-react';

const SERVICES = [
  {
    id: "armor",
    title: "Fortified Ceramic Architecture",
    icon: ShieldCheck,
    desc: "Engineered to minimize surface threat vectors; this fortified silica-based substrate chemically bonds to the clear coat, establishing an immutable, hydrophobic barrier. It effectively neutralizes environmental degradation while maintaining an inviolable, high-index refractive gloss.",
    bullets: ["Attack Surface Reduction: Covalent bonding establishes a tamper-proof barrier against chemical anomalies.", "System Resilience: Omni-directional hydrophobic properties ensure autonomous self-cleaning.", "Integrity Verification: Protocol executed exclusively by high-clearance technicians."]
  },
  {
    id: "correction",
    title: "Surgical Correction",
    icon: Crosshair,
    desc: "We don't hide scratches. We structurally permanently remove them. Obliterate swirl marks, buffer trails, and oxidation using multi-stage compounding.",
    bullets: ["Micron-level paint depth analysis", "Permanent defect removal", "Hologram-free mirror polishing"]
  },
  {
    id: "interior",
    title: "Interior Reset",
    icon: Droplets,
    desc: "Deep carpet extraction, leather conditioning, and thermal sterilization. Regain the exact tactile feel and aroma of a 0-mile delivery.",
    bullets: ["Steam sterilization", "pH-neutral leather treatments", "Alcantara restoration"]
  }
];

export function AnimatedShieldReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(SERVICES[0].id);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Determine screen size to alter spatial animation shifting safely
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 300vh Scroll Pipeline Engine
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });
  
  // Phase 1: Shield Flip Animation (0 to 180 degrees) [Scroll 0.0 -> 0.4]
  const rotateY = useTransform(smoothProgress, [0, 0.4], [0, 180]);
  
  // Phase 2: Shield Translation (Move Shield To The Left Space) [Scroll 0.3 -> 0.6]
  const shieldShiftX = useTransform(smoothProgress, [0.3, 0.6], ["0%", isMobile ? "0%" : "-25vw"]);
  const shieldShiftY = useTransform(smoothProgress, [0.3, 0.6], ["0%", isMobile ? "-20vh" : "0%"]);

  // Phase 3: Dashboard Entrance (Glide in alongside Shield) [Scroll 0.5 -> 0.8]
  const dashboardOpacity = useTransform(smoothProgress, [0.5, 0.8], [0, 1]);
  const dashboardShiftX = useTransform(smoothProgress, [0.5, 0.8], [isMobile ? "0%" : "15vw", "0%"]);
  const dashboardShiftY = useTransform(smoothProgress, [0.5, 0.8], [isMobile ? "20vh" : "0%", "0%"]);
  const pointerEvents = useTransform(smoothProgress, (p) => p > 0.6 ? "auto" : "none");

  const activeService = SERVICES.find(s => s.id === activeTab)!;

  return (
    <section id="services" ref={containerRef} className="relative w-full h-[300vh] bg-[#050505] border-t border-white/5">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05)_0%,transparent_50%)] pointer-events-none sticky top-0 h-screen" />
       
       <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center justify-center overflow-hidden px-4 md:px-12 perspective-[2000px]">
          
          {/* THE METALLIC SHIELD ACTOR */}
          <motion.div 
            className="absolute z-50 pointer-events-none"
            style={{ x: shieldShiftX, y: shieldShiftY }}
          >
             <motion.div style={{ rotateY, transformStyle: "preserve-3d" }}>
                 <div className="flex flex-col items-center justify-center">
                    
                    {/* Pure CSS Native Metallic Shield Object */}
                    <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                        {/* 3D Orbiting Rings */}
                        <div className="absolute inset-[-10%] lg:inset-[-20%] pointer-events-none">
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="absolute inset-0 border border-cyan-500/30 rounded-full" />
                            <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} className="absolute inset-[10%] border border-dashed border-cyan-400/20 rounded-full" />
                        </div>
                        
                        {/* Core Shield Chrome Dome */}
                        <div className="absolute inset-4 lg:inset-8 rounded-full bg-gradient-to-br from-[#1a1a1a] via-[#050505] to-[#111] shadow-[0_0_50px_rgba(6,182,212,0.5),inset_0_5px_20px_rgba(255,255,255,0.2)] border-2 border-[#333] z-10" />
                        
                        {/* Inner Sweeping Turbine Gloss */}
                        <motion.div 
                          animate={{ rotate: 360 }} 
                          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                          className="absolute inset-[25%] rounded-full opacity-70 z-20"
                          style={{ background: 'conic-gradient(from 0deg, rgba(6,182,212,0), rgba(6,182,212,0.8), rgba(6,182,212,0))', mixBlendMode: 'plus-lighter' }}
                        />
                        
                        {/* Top Protective Glass Reflection Layer */}
                        <div className="absolute inset-4 lg:inset-8 rounded-full bg-gradient-to-t from-cyan-900/40 to-transparent backdrop-blur-sm shadow-[inset_0_30px_50px_rgba(255,255,255,0.1)] border border-cyan-500/40 z-30 pointer-events-none" />
                        
                        {/* Engraved Center Emblem */}
                        <ShieldCheck size={90} className="relative z-40 text-cyan-400 filter drop-shadow-[0_0_20px_rgba(6,182,212,1)] opacity-90 scale-75 lg:scale-100" strokeWidth={1} />
                    </div>

                 </div>
             </motion.div>
          </motion.div>

          {/* THE DASHBOARD REVEAL PAYLOAD */}
          <motion.div 
             className="absolute lg:right-[5vw] z-40 w-full px-4 lg:w-[50vw] max-w-3xl"
             style={{ 
               opacity: dashboardOpacity, 
               x: dashboardShiftX, 
               y: dashboardShiftY,
               pointerEvents: pointerEvents as any
             }}
          >
             <div className="w-full bg-[#030303]/90 border border-cyan-500/30 rounded-3xl shadow-[0_0_100px_rgba(6,182,212,0.15)] flex flex-col relative backdrop-blur-2xl overflow-hidden">
                 {/* Internal Faint Watermark Emblem */}
                 <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none z-0">
                     <activeService.icon size={280} className="text-cyan-500 translate-x-12 -translate-y-12" />
                 </div>
                 
                 {/* Top Navigation Frame */}
                 <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/5 bg-white/5 relative z-10">
                     <div className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar pt-2 w-full pr-8">
                         {SERVICES.map((s) => (
                             <button
                               key={s.id}
                               onClick={() => setActiveTab(s.id)}
                               className={`uppercase text-[10px] sm:text-xs font-black tracking-widest pb-3 border-b-2 transition-all whitespace-nowrap pt-1 ${activeTab === s.id ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-neutral-500 hover:text-white'}`}
                             >
                                 {s.title}
                             </button>
                         ))}
                     </div>
                 </div>

                 {/* Content Data Payload */}
                 <div className="p-6 sm:p-10 relative z-10 flex flex-col xl:flex-row gap-8 items-center bg-transparent">
                    <div className="flex-1 w-full relative z-10">
                        <motion.div 
                           key={activeService.id + "-icon"}
                           initial={{ scale: 0, rotate: -45 }}
                           animate={{ scale: 1, rotate: 0 }}
                           className="mb-6 w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                        >
                          <activeService.icon size={24} className="text-cyan-400" />
                        </motion.div>
                        
                        <motion.h3 
                           key={activeService.id + "-title"}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-4 text-white"
                        >
                            {activeService.title}
                        </motion.h3>

                        <motion.p 
                           key={activeService.id + "-desc"}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.1 }}
                           className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6 max-w-lg"
                        >
                            {activeService.desc}
                        </motion.p>

                        <div className="space-y-3 mb-8 w-full">
                           {activeService.bullets.map((b, i) => (
                               <motion.div 
                                  key={i + b}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 + (i * 0.1) }}
                                  className="flex items-center gap-3 text-xs sm:text-sm font-bold text-neutral-300"
                               >
                                  <CheckCircle2 size={16} className="text-cyan-500 shrink-0" />
                                  <span>{b}</span>
                               </motion.div>
                           ))}
                        </div>
                    </div>

                    {/* Integrated CTA Module */}
                    <div className="w-full xl:w-64 shrink-0 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white/5 to-[#020202] border border-white/10 rounded-2xl shadow-xl z-20">
                        <ShieldCheck size={40} className="text-cyan-500/30 mb-4" />
                        <div className="text-center mb-6">
                            <p className="text-white font-black uppercase tracking-widest text-[10px] mb-2">Secure This Service</p>
                            <p className="text-neutral-500 text-[10px] leading-relaxed">Claim priority placement today.</p>
                        </div>
                        <button className="w-full py-3 px-4 bg-cyan-500 text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                            Initialize Protocol
                        </button>
                    </div>
                 </div>
             </div>
          </motion.div>

       </div>
    </section>
  );
}
