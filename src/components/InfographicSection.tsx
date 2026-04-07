"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Shield, Sparkles, Droplets } from 'lucide-react';

export function InfographicSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax Tilt Mechanics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 80, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 80, damping: 20 });

  // Base isometric tilt is X: 60deg, Z: -45deg
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [68, 52]); 
  const rotateZ = useTransform(mouseXSpring, [-0.5, 0.5], [-35, -55]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates to -0.5 to 0.5
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-24 px-6 flex flex-col lg:flex-row items-center gap-16 overflow-hidden bg-[#050505]">
      
      {/* 3D Native CSS Architecture Stack */}
      <motion.div 
         initial={{ opacity: 0, x: -50 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] flex items-center justify-center perspective-[1200px]"
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
      >
         <motion.div 
            style={{ 
               rotateX: isMobile ? 60 : rotateX, 
               rotateZ: isMobile ? -45 : rotateZ, 
               transformStyle: "preserve-3d" 
            }}
            className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px]"
         >
            {/* 1. Base Substrate (Steel/Alloy) */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#333] to-[#111] border border-[#555] rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] flex items-center justify-center group pointer-events-auto transition-transform hover:scale-105 duration-300"
              style={{ transform: "translateZ(0px)" }}
            >
               <div className="absolute inset-2 border border-white/5 rounded-2xl pointer-events-none" />
               <span className="absolute md:-right-40 md:top-1/2 md:-translate-y-1/2 bottom-[-40px] md:bottom-auto text-[10px] font-black uppercase tracking-widest text-neutral-500 md:before:content-[''] md:before:w-16 md:before:h-px md:before:bg-neutral-600 md:before:absolute md:before:right-full md:before:mr-3 whitespace-nowrap">Metal Substrate</span>
            </div>

            {/* 2. Primer */}
            <div 
              className="absolute inset-0 bg-neutral-800/95 border border-neutral-700/50 rounded-3xl backdrop-blur-sm group pointer-events-auto transition-transform hover:scale-105 duration-300"
              style={{ transform: "translateZ(50px)" }}
            >
               <span className="opacity-40 md:opacity-0 md:group-hover:opacity-100 transition-opacity absolute md:-right-24 md:top-1/2 md:-translate-y-1/2 top-4 right-4 md:right-auto md:top-auto text-[10px] font-black uppercase tracking-widest text-neutral-400 md:before:content-[''] md:before:w-12 md:before:h-px md:before:bg-neutral-500 md:before:absolute md:before:right-full md:before:mr-3 whitespace-nowrap">Primer Layer</span>
            </div>

            {/* 3. Base Coat (Paint Color) */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-cyan-900/90 to-[#020202]/95 border border-cyan-900/60 rounded-3xl backdrop-blur-md flex items-center justify-center group pointer-events-auto transition-transform hover:scale-105 duration-300 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
              style={{ transform: "translateZ(100px)" }}
            >
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.2)_0%,transparent_60%)] pointer-events-none" />
               <span className="opacity-40 md:opacity-0 md:group-hover:opacity-100 transition-opacity absolute md:-right-36 md:top-1/2 md:-translate-y-1/2 top-4 left-4 md:left-auto md:top-auto text-[10px] font-black uppercase tracking-widest text-cyan-600 md:before:content-[''] md:before:w-16 md:before:h-px md:before:bg-cyan-800 md:before:absolute md:before:right-full md:before:mr-3 whitespace-nowrap">Base Color Matrix</span>
            </div>

            {/* 4. Factory Clear Coat */}
            <div 
              className="absolute inset-0 bg-white/5 border border-white/20 rounded-3xl shadow-[inset_0_0_30px_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.5)] backdrop-blur-md group pointer-events-auto transition-transform hover:scale-105 duration-300"
              style={{ transform: "translateZ(150px)" }}
            >
               <div className="absolute inset-[-1px] rounded-3xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 pointer-events-none" />
               <span className="opacity-40 md:opacity-0 md:group-hover:opacity-100 transition-opacity absolute md:-right-32 md:top-1/2 md:-translate-y-1/2 bottom-4 right-4 md:right-auto md:bottom-auto text-[10px] font-black uppercase tracking-widest text-neutral-300 md:before:content-[''] md:before:w-14 md:before:h-px md:before:bg-white/30 md:before:absolute md:before:right-full md:before:mr-3 whitespace-nowrap">Factory Clear Coat</span>
            </div>

            {/* 5. SiO2 Ceramic Armor Layer */}
            <div 
              className="absolute inset-0 bg-cyan-400/10 border-2 border-cyan-400/80 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.3),inset_0_0_30px_rgba(6,182,212,0.2)] backdrop-blur-xl flex items-center justify-center overflow-hidden pointer-events-auto group hover:-translate-y-2 transition-all duration-500"
              style={{ transform: "translateZ(200px)" }}
            >
               <div className="absolute inset-0 opacity-50 mix-blend-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIiBmaWxsPSIjMDZiNmQ0IiAvPgo8L3N2Zz4=')]" style={{ backgroundSize: '15px 15px' }} />
               <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 to-transparent pointer-events-none" />
               
               {/* Internal Scanning UI */}
               <motion.div animate={{ y: [-150, 150] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="absolute w-full h-[2px] bg-cyan-300 shadow-[0_0_15px_#06b6d4] opacity-50 pointer-events-none" />

               <span className="absolute md:-right-40 md:top-1/2 md:-translate-y-1/2 top-[-30px] md:top-auto text-[12px] font-black uppercase tracking-widest text-cyan-400 md:before:content-[''] md:before:w-20 md:before:h-[2px] md:before:bg-cyan-500 md:before:absolute md:before:right-full md:before:mr-3 drop-shadow-[0_0_10px_rgba(6,182,212,1)] whitespace-nowrap">SiO2 Ceramic Armor</span>
            </div>

            {/* Vertical Fusion Correlation Line Core */}
            <div 
              className="absolute top-1/2 left-1/2 w-0.5 bg-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,1)] transform -translate-x-1/2 -translate-y-1/2 h-[200px] rotate-X-[90deg] origin-center z-50 pointer-events-none rounded-full" 
              style={{ transform: "translateZ(100px) rotateX(90deg)" }} 
            />
            
         </motion.div>
      </motion.div>

      {/* Technical Data Payload */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="w-full lg:w-1/2 flex flex-col justify-center relative z-20 pointer-events-none"
      >
         <h3 className="text-cyan-500 font-black uppercase tracking-[0.3em] text-xs mb-4 flex items-center gap-2">
            <Sparkles size={14} /> Structural Architecture
         </h3>
         <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-8 text-white leading-tight">
            The Physics Of <br/><span className="text-neutral-500">Perfect Paint</span>
         </h2>
         <p className="text-neutral-400 text-lg leading-relaxed mb-10 max-w-xl">
            True luxury detailing is not about temporary gloss products; it requires absolute structural engineering at a macroscopic level. 
            By permanently fusing silica substrates to your vehicle's porous clear coat layer, we calculate and generate an impenetrable, self-leveling glass matrix.
         </p>

         <div className="space-y-8">
            <div className="flex gap-5 items-start">
               <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#050505] border border-cyan-500/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]">
                  <Shield className="text-cyan-400" size={24} />
               </div>
               <div>
                  <h4 className="text-white font-black uppercase text-sm mb-2 tracking-widest">Substrate Fusion</h4>
                  <p className="text-neutral-500 text-sm leading-relaxed">The high-density coating deeply penetrates the clear coat pores, permanently locking out UV oxidation and microscopic debris on a chemical level.</p>
               </div>
            </div>
            
            <div className="flex gap-5 items-start">
               <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#050505] border border-cyan-500/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]">
                  <Droplets className="text-cyan-400" size={24} />
               </div>
               <div>
                  <h4 className="text-white font-black uppercase text-sm mb-2 tracking-widest">Absolute Hydrophobia</h4>
                  <p className="text-neutral-500 text-sm leading-relaxed">Achieve a hyper-slick surface tension threshold. Liquid anomalies instantly bead up and violently reject off the structural panel without leaving residue.</p>
               </div>
            </div>
         </div>
      </motion.div>

    </div>
  );
}
