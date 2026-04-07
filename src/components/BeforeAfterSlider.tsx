"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';
import Image from 'next/image';

export function BeforeAfterSlider({ beforeUrl, afterUrl }: { beforeUrl: string, afterUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Utilize standard React state strictly for the container boundaries.
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Use Framer Motion hardware values instead of React State to bypass render loop lag.
  const pixelPosition = useMotionValue(0);

  useEffect(() => {
     if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        setContainerWidth(width);
        pixelPosition.set(width / 2);
     }
     
     const handleResize = () => {
       if (containerRef.current) {
          const w = containerRef.current.getBoundingClientRect().width;
          setContainerWidth(w);
          pixelPosition.set(w / 2);
       }
     };
     window.addEventListener('resize', handleResize);
     return () => window.removeEventListener('resize', handleResize);
  }, [pixelPosition]);

  // Construct native GPU bounds polygon mapping directly to the un-rendered MotionValue.
  const clipPathTemplate = useMotionTemplate`polygon(0 0, ${pixelPosition}px 0, ${pixelPosition}px 100%, 0% 100%)`;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-500 mb-6 px-4">
        <span>Raw Damaged Substrate</span>
        <span className="text-cyan-500 shadow-cyan-500">SiO2 Armor Fused Finish</span>
      </div>
      
      <div 
        ref={containerRef}
        className="relative w-full h-[350px] md:h-[600px] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] touch-none bg-black border border-white/10"
      >
        {/* AFTER IMAGE (Perfect Real-World Reflection / Z-Index 0) */}
        <div className="absolute inset-0 pointer-events-none">
          <Image src={afterUrl} alt="Flawless Glass Reflection After Paint Correction" fill className="object-cover" priority />
        </div>

        {/* BEFORE IMAGE (Damaged Front Plate / Z-Index 10 / Clipped via Hardware) */}
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ clipPath: clipPathTemplate }}
        >
          <Image src={beforeUrl} alt="Real Scratched Paint Before Correction" fill className="object-cover" priority />
          {/* Faint overlay to accentuate the 'damage' vs the gloss of the clean side */}
          <div className="absolute inset-0 bg-[#050505]/20 mix-blend-multiply" />
        </motion.div>

        {/* Hardware-Accelerated Draggable Division Line */}
        <motion.div 
          className="absolute top-0 bottom-0 z-20 w-1 bg-cyan-400 shadow-[0_0_30px_rgba(6,182,212,1)]"
          style={{ x: pixelPosition }}
          drag="x"
          dragConstraints={{ left: 0, right: containerWidth }}
          dragElastic={0}
          dragMomentum={false}
        >
          {/* Slider Grip Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#050505]/90 backdrop-blur-xl border-2 border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.8)] hover:scale-110 active:scale-95 transition-transform cursor-grab active:cursor-grabbing">
             <ChevronsLeftRight size={24} className="text-cyan-400" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
