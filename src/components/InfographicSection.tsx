"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
    z: 280, // Highest float
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
    z: 200,
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
    z: 130,
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
    z: 60,
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
  const [autoTriggered, setAutoTriggered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "0px 0px -50% 0px", once: true });

  useEffect(() => {
     if (isInView && !isExploded && !autoTriggered) {
         setAutoTriggered(true);
         // Fire debris before exploding
         setIsDebrisFiring(true);
         setTimeout(() => {
             setIsDebrisFiring(false);
             setIsExploded(true);
         }, 800);
     }
  }, [isInView, isExploded, autoTriggered]);

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
      { left: '20%', top: '30%', size: 4, delay: 0.1, startX: -800, startY: -600, endX: -600, endY: -800, endZ: 800, color: 'bg-neutral-400' },
      { left: '70%', top: '20%', size: 3, delay: 0.2, startX: 800, startY: -800, endX: 900, endY: -500, endZ: 700, color: 'bg-neutral-500' },
      { left: '40%', top: '60%', size: 5, delay: 0.05, startX: 0, startY: -1000, endX: 0, endY: 1000, endZ: 900, color: 'bg-cyan-100' },
      { left: '80%', top: '70%', size: 2, delay: 0.15, startX: 800, startY: 800, endX: 1000, endY: 800, endZ: 850, color: 'bg-neutral-400' },
      { left: '30%', top: '80%', size: 6, delay: 0.25, startX: -800, startY: 800, endX: -1000, endY: 1000, endZ: 1000, color: 'bg-neutral-300' },
      { left: '60%', top: '40%', size: 4, delay: 0, startX: 500, startY: -1000, endX: 800, endY: 800, endZ: 800, color: 'bg-cyan-200' }
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-black flex flex-col items-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10 flex flex-col items-center lg:items-start lg:block">
        
        {/* TOP TITLE SECTION */}
        <div className="mb-10 md:mb-16 text-center lg:text-left w-full">
           <h2 className="text-sm font-black text-cyan-500 uppercase tracking-[0.3em] mb-4">Structural Analysis</h2>
           <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight drop-shadow-xl">
               Substrate <span className="text-white/40 flex-wrap">Fusion Matrix.</span>
           </h3>
           <p className="mt-4 text-neutral-400 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We don't just apply wax. We permanently molecularly fuse a 9H ceramic shield onto your factory clear coat, locking in a flawless correction.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        
        {/* LEFT COLUMN: 3D EXPLODED VIEW */}
        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center perspective-[2000px] overflow-visible">
           <motion.div 
             className="relative w-[220px] h-[220px] md:w-[300px] md:h-[300px]"
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
                       translateZ: isExploded ? layer.z : (layer.id * 5),
                       // Depress physically downward on impact
                       scale: (isDebrisFiring && layer.id === 4) ? [1, 0.96, 1] : 1
                    }}
                    transition={{ 
                       duration: (isDebrisFiring && layer.id === 4) ? 0.3 : 0.8, 
                       delay: (isDebrisFiring && layer.id === 4) ? 0.32 : 0, // Triggers at exact impact millisecond
                       type: (isDebrisFiring && layer.id === 4) ? 'tween' : 'spring',
                       ease: (isDebrisFiring && layer.id === 4) ? 'easeInOut' : undefined,
                       bounce: 0.3 
                    }}
                  >
                     {/* Debris Impact Animation against Ceramic Top Layer (id: 4) */}
                     {layer.id === 4 && (
                         <AnimatePresence>
                             <motion.div 
                                 key="overlay-bg"
                                 className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none mix-blend-overlay opacity-30"
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 0.3 }}
                             >
                                 <motion.div 
                                     className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
                                     style={{
                                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='69.282' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 17.32l-20 11.547L0 17.32V-5.774l20-11.547L40-5.774V17.32zm0 46.188l-20 11.548-20-11.548V40.414L20 28.867l20 11.547v23.094z' fill='%2306b6d4' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                                         backgroundSize: '40px 69.282px'
                                     }}
                                     animate={{ x: [0, -40], y: [0, -69.282] }}
                                     transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                                 />
                             </motion.div>
                             
                             {isDebrisFiring && (
                                 <motion.div key="debris-container" className="absolute inset-0 pointer-events-none z-10" exit={{ opacity: 0 }}>
                                     {/* Intense Physical Surface Flash */}
                                     <motion.div
                                         className="absolute inset-0 rounded-2xl bg-white mix-blend-overlay pointer-events-none"
                                         initial={{ opacity: 0 }}
                                         animate={{ opacity: [0, 0.9, 0] }}
                                         transition={{ duration: 0.4, delay: 0.3 }}
                                     />
                                     
                                     {/* Particles hitting surface and being repelled */}
                                     {debrisParticles.map((particle, i) => (
                                         <motion.div
                                             key={`debris-${i}`}
                                             className={`absolute rounded-sm ${particle.color} shadow-lg shadow-black/50`}
                                             style={{ 
                                                 width: particle.size * 2, // Doubled the size for high visibility
                                                 height: particle.size * 2,
                                                 left: particle.left,
                                                 top: particle.top,
                                             }}
                                             initial={{ translateZ: 1500, opacity: 1, scale: 2, x: particle.startX, y: particle.startY, rotate: 0 }}
                                             animate={{ 
                                                 translateZ: [1500, 0, particle.endZ], // Comes from behind camera, hits layer, blasts back
                                                 opacity: [1, 1, 0], // Fully visible drop and impact, fades out off-screen
                                                 scale: [2, 1, 1.5],
                                                 x: [particle.startX, 0, particle.endX], // Wide angled strikes
                                                 y: [particle.startY, 0, particle.endY],
                                                 rotate: [0, 90, 720]
                                             }}
                                             exit={{ opacity: 0 }}
                                             transition={{ 
                                                 duration: 0.8, // Slightly longer so it travels the massive distance
                                                 delay: particle.delay, 
                                                 times: [0, 0.4, 1], // Impact hits precisely at 40%
                                                 ease: ["easeIn", "easeOut"] 
                                             }}
                                         />
                                     ))}
                                     
                                     {/* Impact Shield Kinetic Ripple Effect */}
                                     <motion.div
                                         className="absolute inset-0 border-[3px] border-cyan-400/0 rounded-2xl bg-cyan-400/0 overflow-hidden"
                                         initial={{ opacity: 0, scale: 1 }}
                                         animate={{ 
                                             opacity: [0, 1, 0], 
                                             scale: [0.95, 1.05, 1.1],
                                             backgroundColor: ["rgba(6,182,212,0)", "rgba(6,182,212,0.3)", "rgba(6,182,212,0)"],
                                             borderColor: ["rgba(6,182,212,0)", "rgba(6,182,212,1)", "rgba(6,182,212,0)"]
                                         }}
                                         transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                                     />
                                 </motion.div>
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
                  </motion.div>
                )
             })}
           </motion.div>

           {/* The Text Label Matrix (Isolated 2D rendering context so text remains perfectly flat and highly legible) */}
           <motion.div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[300px] md:h-[300px] pointer-events-none z-[100]"
             initial={{ scale: 0.8 }}
             animate={{ scale: isExploded ? 0.9 : 1.1 }}
             transition={{ duration: 1.5, type: 'spring', bounce: 0.2 }}
           >
             {LAYERS.map((layer) => {
                const isActive = activeLayer.id === layer.id;
                
                // FLawless 2D pixel-mapping calibrated to exactly match the rendered CSS 3D perspective(2000px) projection.
                const EXPLODED_Y_OFFSETS: Record<number, number> = {
                  4: -340, // 9H Ceramic (Closest to camera, highest perspective shift)
                  3: -225, // Clear Coat
                  2: -140, // Base Colour
                  1: -60,  // E-Coat Primer
                  0: 0     // Metal Substrate (Furthest from camera)
                };
                
                const yShift = isExploded ? EXPLODED_Y_OFFSETS[layer.id] : -(layer.id * 6);
                
                return (
                  <motion.div
                    key={`label-container-${layer.id}`}
                    className="absolute inset-0 pointer-events-none"
                    animate={{ y: yShift }}
                    transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                  >
                     <AnimatePresence>
                         {(isActive || isExploded) && isExploded && (
                             <motion.div 
                               key={`label-details-${layer.id}`}
                               initial={{ opacity: 0, x: -20 }}
                               animate={{ opacity: isActive ? 1 : 0.7, x: isActive ? 10 : 0, scale: isActive ? 1.05 : 1 }}
                               className="absolute top-[80%] left-0 -translate-y-[80%] flex items-center gap-3 pointer-events-none z-50"
                               style={{ 
                                  // Keep labels perfectly aligned vertically (no tapering)
                                  left: `calc(0px - clamp(120px, 25vw, 250px))`, 
                               }}
                             >
                                <div className="text-right transition-all">
                                    <h4 className={`font-black uppercase tracking-widest text-xs sm:text-sm ${isActive ? 'text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] scale-[1.05] transform origin-right' : 'text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]'}`}>
                                        {layer.label}
                                    </h4>
                                    <span className={`text-[10px] sm:text-xs font-bold block mt-0.5 ${isActive ? 'text-cyan-300' : 'text-neutral-400'}`}>{layer.thickness}</span>
                                </div>
                                <div 
                                    className={`hidden sm:block h-[2px] transition-colors ${isActive ? 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'bg-white/20'}`}
                                    style={{ width: `clamp(40px, 10vw, 80px)` }} // Static width to match non-tapered labels
                                ></div>
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

             <AnimatePresence mode="popLayout">
                <motion.div 
                   key={activeLayer.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.4 }}
                   className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 md:p-8 rounded-2xl relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
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
      </div>
    </section>
  );
}
