"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Droplets, ArrowDown, ChevronRight } from 'lucide-react';

const LAYERS = [
  {
    id: 4,
    label: "9H Ceramic Coating",
    thickness: "1μm",
    detail: "Our proprietary 9H nano-coating fuses with the clear coat at a molecular level, providing self-cleaning hydrophobic properties and immense physical scratch resistance. Lasts 5+ years.",
    color: "rgba(6, 182, 212, 0.4)",
    borderColor: "rgba(6, 182, 212, 1)",
    glow: "0 0 30px rgba(6, 182, 212, 0.5)",
    icon: Shield,
    z: 200, // Highest float
  },
  {
    id: 3,
    label: "Clear Coat",
    thickness: "40μm",
    detail: "Factory UV protection. This is the sacrificial layer we meticulously machine-correct to remove swirls, scratches, and holograms before ceramic locking.",
    color: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    glow: "none",
    icon: Sparkles,
    z: 100,
  },
  {
    id: 2,
    label: "Base Colour",
    thickness: "15μm",
    detail: "Your vehicle's pigment layer. Paint correction ensures the clear coat above it is flawlessly transparent, allowing this colour to burst through visually.",
    color: "rgba(30, 64, 175, 0.6)",
    borderColor: "rgba(59, 130, 246, 0.8)",
    glow: "none",
    icon: Droplets,
    z: 50,
  },
  {
    id: 1,
    label: "E-Coat Primer",
    thickness: "20μm",
    detail: "Electrodeposited corrosion primer applied at the factory. Critical anti-corrosion foundation layer.",
    color: "rgba(39, 39, 42, 0.8)",
    borderColor: "rgba(82, 82, 91, 1)",
    glow: "none",
    icon: null,
    z: 25,
  },
  {
    id: 0,
    label: "Metal Substrate",
    thickness: "0.8mm",
    detail: "The raw steel or aluminium body panel. The ultimate foundation everything rests upon.",
    color: "rgba(24, 24, 27, 1)",
    borderColor: "rgba(63, 63, 70, 1)",
    glow: "none",
    icon: null,
    z: 0, // Base
  }
];

export function InfographicSection() {
  const [activeLayer, setActiveLayer] = useState(LAYERS[0]); // Default to Ceramic
  const [isExploded, setIsExploded] = useState(false); // Default to compressed
  const [isDebrisFiring, setIsDebrisFiring] = useState(false);

  const handleToggle = () => {
      if (isExploded) {
          setIsExploded(false);
      } else {
          // Fire debris before exploding
          setIsDebrisFiring(true);
          setTimeout(() => {
              setIsDebrisFiring(false);
              setIsExploded(true);
          }, 800);
      }
  };

  // Generate deterministic but scattered positions for debris to avoid hydration mismatch
  const debrisParticles = [
      { left: '20%', top: '30%', size: 4, delay: 0.1 },
      { left: '70%', top: '20%', size: 3, delay: 0.2 },
      { left: '40%', top: '60%', size: 5, delay: 0.05 },
      { left: '80%', top: '70%', size: 2, delay: 0.15 },
      { left: '30%', top: '80%', size: 3, delay: 0.25 },
      { left: '60%', top: '40%', size: 4, delay: 0 }
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-black flex flex-col items-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT COLUMN: 3D EXPLODED VIEW */}
        <div className="relative h-[600px] flex items-center justify-center perspective-[2000px]">
           <motion.div 
             className="relative w-[300px] h-[300px]"
             initial={{ rotateX: 60, rotateZ: -45, scale: 0.8 }}
             animate={{ rotateX: 60, rotateZ: isExploded ? -45 : 0, scale: isExploded ? 0.9 : 1.1 }}
             transition={{ duration: 1.5, type: 'spring', bounce: 0.2 }}
             style={{ transformStyle: "preserve-3d" }}
           >
             {LAYERS.map((layer, idx) => {
                const isActive = activeLayer.id === layer.id;
                
                return (
                  <motion.div
                    key={layer.id}
                    onHoverStart={() => {
                        if (!isExploded) return;
                        setActiveLayer(layer);
                    }}
                    onClick={() => {
                        if (!isExploded) return;
                        setActiveLayer(layer);
                    }}
                    className={`absolute inset-0 rounded-2xl transition-colors duration-500 backdrop-blur-md border ${isExploded ? 'cursor-pointer' : 'pointer-events-none'}`}
                    style={{ 
                         backgroundColor: layer.color,
                         borderColor: (isActive && isExploded) ? "rgba(255,255,255,0.8)" : layer.borderColor,
                         boxShadow: (layer.glow !== 'none' || !isExploded) ? layer.glow : 'none',
                         transformStyle: "preserve-3d"
                    }}
                    animate={{ 
                       // Ensure Ceramic (id:4) is on top when compressed by using layer.id for z-spacing
                       translateZ: isExploded ? layer.z : (layer.id * 5)
                    }}
                    transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                  >
                     {/* Debris Impact Animation against Ceramic Top Layer (id: 4) */}
                     {layer.id === 4 && (
                         <AnimatePresence>
                             {isDebrisFiring && (
                                 <>
                                     {/* Particles hitting surface */}
                                     {debrisParticles.map((particle, i) => (
                                         <motion.div
                                             key={`debris-${i}`}
                                             className="absolute rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,1)]"
                                             style={{ 
                                                 width: particle.size, 
                                                 height: particle.size,
                                                 left: particle.left,
                                                 top: particle.top,
                                             }}
                                             initial={{ translateZ: 100, opacity: 0, scale: 0 }}
                                             animate={{ translateZ: 0, opacity: [0, 1, 0], scale: [0, 1, 3] }}
                                             exit={{ opacity: 0 }}
                                             transition={{ duration: 0.5, delay: particle.delay, ease: "easeIn" }}
                                         />
                                     ))}
                                     
                                     {/* Impact Shockwave */}
                                     <motion.div
                                         className="absolute inset-0 bg-cyan-400/40 rounded-2xl"
                                         initial={{ opacity: 0, scale: 1 }}
                                         animate={{ opacity: [0, 0.5, 0], scale: [1, 1.05, 1] }}
                                         transition={{ duration: 0.4, delay: 0.3 }}
                                     />
                                 </>
                             )}
                         </AnimatePresence>
                     )}

                     {/* Depth lines dropping down from top layers during exploded view */}
                     {isExploded && layer.id > 0 && (
                        <motion.div 
                           className="absolute top-full left-4 w-px bg-white/20 origin-top hidden md:block"
                           style={{ height: `${layer.z - LAYERS[idx+1].z}px`, transform: 'rotateX(-90deg)' }}
                        />
                     )}

                     {/* Label visible on hover or active */}
                     <AnimatePresence>
                         {(isActive || isExploded) && isExploded && (
                             <motion.div 
                               initial={{ opacity: 0, x: -20 }}
                               animate={{ opacity: isActive ? 1 : 0.4, x: 0 }}
                               className="absolute -left-32 sm:-left-40 top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-4 pointer-events-none"
                               style={{ transform: 'translateZ(0px) rotateX(-60deg) rotateZ(45deg)' }}
                             >
                                <div className="text-right">
                                    <h4 className={`font-black uppercase tracking-widest text-xs sm:text-sm whitespace-nowrap ${isActive ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'text-white'}`}>
                                        {layer.label}
                                    </h4>
                                    <span className="text-[10px] sm:text-xs font-bold text-neutral-500">{layer.thickness}</span>
                                </div>
                                <div className={`hidden sm:block h-[1px] w-8 sm:w-12 ${isActive ? 'bg-cyan-500' : 'bg-white/20'}`}></div>
                             </motion.div>
                         )}
                     </AnimatePresence>
                  </motion.div>
                )
             })}
           </motion.div>

           {/* Toggle Exploed View */}
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4">
              <button 
                  onClick={handleToggle}
                  disabled={isDebrisFiring}
                  className={`px-6 py-2 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest transition-colors text-cyan-400 flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.1)] relative z-50 pointer-events-auto ${isDebrisFiring ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5'}`}
              >
                  {isExploded ? 'Compress Stack' : isDebrisFiring ? 'Analyzing...' : 'Explode View'} 
                  <ArrowDown size={14} className={`transform transition-transform ${isExploded ? 'rotate-180' : ''}`} />
              </button>
           </div>
        </div>

        {/* RIGHT COLUMN: DETAIL PANEL */}
        <div className="flex flex-col justify-center">
             <div className="mb-12">
                 <h2 className="text-sm font-black text-cyan-500 uppercase tracking-[0.3em] mb-4">Structural Analysis</h2>
                 <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight drop-shadow-xl">
                     Substrate <br/><span className="text-white/40">Fusion Matrix.</span>
                 </h3>
                 <p className="mt-6 text-neutral-400 text-lg leading-relaxed">
                    We don't just apply wax. We permanently molecularly fuse a 9H ceramic shield onto your factory clear coat, locking in a flawless correction.
                 </p>
             </div>

             <AnimatePresence mode="popLayout">
                <motion.div 
                   key={activeLayer.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.4 }}
                   className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
                >
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.8)]"></div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                           {activeLayer.icon && <activeLayer.icon size={24} className="text-cyan-400" />}
                           <h4 className="text-2xl font-black uppercase tracking-tight text-white">{activeLayer.label}</h4>
                        </div>
                        <span className="font-bold text-neutral-500 uppercase tracking-widest text-sm bg-black/50 px-3 py-1 rounded-md">{activeLayer.thickness}</span>
                    </div>
                    
                    <p className="text-neutral-300 text-base leading-relaxed">
                        {activeLayer.detail}
                    </p>

                    {activeLayer.id === 4 && (
                        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                             <div>
                                 <div className="text-4xl font-black text-cyan-400">110°</div>
                                 <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Contact Angle</div>
                             </div>
                             <div>
                                 <div className="text-4xl font-black text-white">9H</div>
                                 <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Pencil Hardness</div>
                             </div>
                        </div>
                    )}
                </motion.div>
             </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
