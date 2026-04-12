"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function ScrollVideoHero({ onBook }: { onBook: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const FRAME_COUNT = 139;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let images: HTMLImageElement[] = [];

    // Preload first frame immediately
    const img0 = new Image();
    img0.src = `/hero-frames/frame_001.jpg`;
    img0.onload = () => {
        renderFrame(img0);
        
        // Lazy load the rest to prevent blocking the initial page hydration
        for (let i = 2; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `/hero-frames/frame_${i.toString().padStart(3, '0')}.jpg`;
            images[i] = img;
        }
    };
    images[1] = img0;

    const renderFrame = (img: HTMLImageElement) => {
        if (!canvas) return;
        // Dynamically scale internal canvas resolution to match outer CSS bounds (prevents blurring)
        if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        }
        
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = "grayscale(20%)";
        ctx.drawImage(img, 0, 0, img.width, img.height,
           centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    let requestRef: number;
    let lastDrawnIndex = 1;

    // Direct mapping from scroll progress to image sequence index
    const unsubscribe = scrollYProgress.on("change", (latest) => {
        const frameIndex = Math.max(1, Math.min(FRAME_COUNT, Math.floor(latest * FRAME_COUNT) + 1));
        
        if (frameIndex !== lastDrawnIndex) {
            const currentImg = images[frameIndex];
            // Only draw if image is fully downloaded to prevent flickering
            if (currentImg && currentImg.complete) {
                if (requestRef) cancelAnimationFrame(requestRef);
                requestRef = requestAnimationFrame(() => {
                    renderFrame(currentImg);
                });
                lastDrawnIndex = frameIndex;
            }
        }
    });

    return () => {
        unsubscribe();
        if (requestRef) cancelAnimationFrame(requestRef);
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[250svh] md:h-[300vh] bg-black">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Hardware-Accelerated Canvas Layer */}
        <div className="absolute inset-0 z-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
          {/* Multi-layer cinematic darkening */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>

        {/* Animated scan line */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.015) 2px, rgba(6,182,212,0.015) 4px)' }}
        />

        {/* Hero Content */}
        <div className="relative z-20 px-6 max-w-7xl mx-auto w-full flex flex-col items-center pt-20 md:pt-28 pb-16">
          {/* Top badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2.5 px-4 md:px-5 py-2 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/10 text-cyan-400 text-[9px] md:text-[11px] font-bold tracking-[0.2em] uppercase mb-8 md:mb-10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] cursor-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            Yorkshire's Elite Mobile Detailing Unit
          </motion.div>
          
          {/* Main headline - DYNAMIC SCALING FOR MOBILE */}
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            className="text-[12vw] sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-[-0.04em] leading-[0.88] uppercase text-center mb-6 md:mb-8 cursor-none selection:bg-cyan-500/30"
          >
            <span className="block text-white">Absolute</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400">Perfection.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
            className="text-sm sm:text-lg md:text-xl text-neutral-400 max-w-2xl px-4 leading-relaxed font-medium text-center mb-8 md:mb-10 cursor-none"
          >
            Paint correction. Ceramic armoring. Interior restoration.
            <br className="hidden sm:block" />
            <span className="text-neutral-300">Zero compromises. Fully equipped mobile delivery to your door.</span>
          </motion.p>

          {/* CTA Buttons - SCALED FOR MOBILE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mb-10 md:mb-14 w-full sm:w-auto"
          >
            <motion.button 
              onClick={onBook} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full sm:w-auto justify-center group px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-tr from-cyan-600 to-cyan-400 hover:from-cyan-500 hover:to-cyan-300 text-white font-black rounded-xl flex items-center gap-2 transition-all uppercase tracking-wide shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] border border-cyan-400/50 hover:border-cyan-300 cursor-none text-xs"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Get Booked In!
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            
            <motion.button 
              onClick={() => {
                const el = document.getElementById("pricing");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto justify-center px-5 md:px-6 py-2.5 md:py-3 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-bold tracking-wide uppercase rounded-xl hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 cursor-none text-xs shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <Sparkles size={14} className="text-cyan-400" /> View Packages
            </motion.button>
          </motion.div>

          {/* Integrated stats strip */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 md:gap-y-3 items-center"
          >
            {[
              { val: "9H", label: "Ceramic Hardness", highlight: true },
              { val: "5+", label: "Years Protection", highlight: false },
              { val: "0%", label: "Swirl Marks", highlight: false },
              { val: "100%", label: "Flawless Finish", highlight: true }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="flex items-center gap-2 md:gap-2.5 group cursor-none"
                whileHover={{ y: -2 }}
              >
                <span className={`text-lg md:text-xl font-black ${stat.highlight ? 'text-cyan-400' : 'text-white'}`}>{stat.val}</span>
                <span className="text-neutral-500 text-[9px] md:text-[10px] font-bold uppercase tracking-wider group-hover:text-neutral-400 transition-colors">{stat.label}</span>
                {i < 3 && <span className="text-neutral-800 ml-3 md:ml-4 hidden sm:inline">|</span>}
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8 md:mt-14"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-4 h-7 md:w-5 md:h-8 rounded-full border border-white/20 flex items-start justify-center p-1 md:p-1.5"
            >
              <motion.div className="w-1 h-1 md:h-1.5 bg-cyan-400 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
