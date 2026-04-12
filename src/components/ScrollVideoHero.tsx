"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function ScrollVideoHero({ onBook }: { onBook: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      video.pause();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    // In case already loaded
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }
    
    return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !duration) return;

    // PERFORMANCE OPTIMIZATION: On weak mobile devices, don't scrub at all. Just autoplay loop.
    const isMobile = window.matchMedia("(max-width: 768px)").matches || 
                     window.matchMedia("(hover: none) and (pointer: coarse)").matches;
                     
    if (isMobile) {
      video.loop = true;
      video.play().catch(() => {}); // handle auto-play block gracefully
      return; 
    }

    let lastSeekTime = 0;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      requestAnimationFrame(() => {
        // Only update if video is valid
        if (video.readyState < 1) return;
        
        const targetTime = latest * duration;
        
        // PERFORMANCE: Ignore micro-scrolls to save CPU
        if (Math.abs(video.currentTime - targetTime) < 0.05) return;
        
        // CRITICAL: Asking to seek while decoder is active causes massive stutter/crashes
        if (video.seeking) return;

        // PERFORMANCE: Throttle to ~25fps (40ms) max instead of 60fps
        const now = Date.now();
        if (now - lastSeekTime < 40) return;

        video.currentTime = targetTime;
        lastSeekTime = now;
      });
    });

    return () => unsubscribe();
  }, [scrollYProgress, duration]);

  return (
    <div ref={containerRef} className="relative w-full h-[100svh] md:h-[300vh] bg-black">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Video Background Layer */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src="/hero_video.mp4"
            className="w-full h-full object-cover"
            playsInline
            muted
            // On mobile we don't bind to scroll, so we want it to act like a normal background video
            autoPlay
            loop
            preload="auto"
            style={{ 
              filter: "grayscale(20%)"
            }}
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
        <div className="relative z-20 px-6 max-w-7xl mx-auto w-full flex flex-col items-center pt-28 pb-16">
          {/* Top badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/10 text-cyan-400 text-[11px] font-bold tracking-[0.2em] uppercase mb-10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] cursor-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            Yorkshire's Elite Mobile Detailing Unit
          </motion.div>
          
          {/* Main headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-[-0.04em] leading-[0.88] uppercase text-center mb-8 cursor-none selection:bg-cyan-500/30"
          >
            <span className="block text-white">Absolute</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400">Perfection.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed font-medium text-center mb-10 cursor-none"
          >
            Paint correction. Ceramic armoring. Interior restoration.
            <br className="hidden sm:block" />
            <span className="text-neutral-300">Zero compromises. Fully equipped mobile delivery to your door.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-14"
          >
            <motion.button 
              onClick={onBook} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-xl flex items-center gap-2.5 transition-all uppercase tracking-wide shadow-[0_0_40px_rgba(6,182,212,0.35)] cursor-none text-sm"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Booked In!
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            
            <motion.button 
              onClick={() => {
                const el = document.getElementById("pricing");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/[0.04] backdrop-blur-xl border border-white/10 text-white font-bold tracking-wide uppercase rounded-xl hover:bg-white/[0.08] hover:border-white/20 transition-all flex items-center gap-2.5 cursor-none text-sm"
            >
              <Sparkles size={18} className="text-cyan-400" /> View Packages
            </motion.button>
          </motion.div>

          {/* Integrated stats strip */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 items-center"
          >
            {[
              { val: "9H", label: "Ceramic Hardness", highlight: true },
              { val: "5+", label: "Years Protection", highlight: false },
              { val: "0%", label: "Swirl Marks", highlight: false },
              { val: "100%", label: "Flawless Finish", highlight: true }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="flex items-center gap-2.5 group cursor-none"
                whileHover={{ y: -2 }}
              >
                <span className={`text-xl font-black ${stat.highlight ? 'text-cyan-400' : 'text-white'}`}>{stat.val}</span>
                <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider group-hover:text-neutral-400 transition-colors">{stat.label}</span>
                {i < 3 && <span className="text-neutral-800 ml-4 hidden sm:inline">|</span>}
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-14"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
            >
              <motion.div className="w-1 h-1.5 bg-cyan-400 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
