"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ShieldCheck, Droplets, Sparkles, CheckCircle2, ArrowRight, Star, Shield, X, ChevronRight, Check, Search, FlaskConical } from "lucide-react";
import { MouseEvent, useEffect, useState, useRef } from "react";
import Image from "next/image";
export type Detailer = { id?: string; name: string };
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { PricingEstimator, SIZES, PAINT_TIERS, INTERIOR, BUNDLE_DISCOUNT } from "../components/PricingEstimator";
import { AnimatedShieldReveal } from "../components/AnimatedShieldReveal";
import { InfographicSection } from "../components/InfographicSection";
import { BookingModal } from '../components/BookingModal';


// ==========================================
// CUSTOM CURSOR (Global)
// ==========================================
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 800, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 800, damping: 40 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileCheck = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobileCheck);
    if (mobileCheck) return;

    const moveCursor = (e: globalThis.MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (window.getComputedStyle(target).cursor === 'pointer' || target.closest('button, a, input, select')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-cyan-400/50 mix-blend-screen"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{
           width: isHovering ? 60 : 30,
           height: isHovering ? 60 : 30,
           backgroundColor: isHovering ? "rgba(6,182,212,0.1)" : "rgba(6,182,212,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </>
  );
}

// ==========================================
// GLOW CARD W/ LOCAL MOUSE TRACKING
// ==========================================
function GlowCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      className={`relative group overflow-hidden border border-white/5 bg-[#0a0a0a] rounded-3xl ${className}`}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(6,182,212,0.1), transparent 80%)`,
        }}
      />
      <motion.div
        className="absolute inset-[-1px] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
        style={{
          background: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(6,182,212,0.5), transparent 80%)`,
          WebkitMaskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
}

// ==========================================
// TACTILE MAGNETIC BUTTON
// ==========================================
function MagneticButton({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  return (
    <motion.button 
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95, boxShadow: "0 0 0 0 rgba(6,182,212,0)" }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.button>
  );
}

// ==========================================
// SCROLL REVEAL
// ==========================================
function ScrollReveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


// ==========================================
// CORE FEATURE: INSPECTION TORCH MODE
// ==========================================
function InspectionTorchMode() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set initial position out of bounds so it doesn't render until hover
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  const springX = useSpring(mouseX, { stiffness: 600, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 600, damping: 40 });

  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
        className="relative w-full h-[70vh] min-h-[500px] border-y border-white/5 overflow-hidden group bg-[#020202] cursor-none"
        onPointerMove={handlePointerMove}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        ref={containerRef}
    >
      
      {/* BASE LAYER: Dark, Scratched, Neglected Paint */}
      <div className="absolute inset-0 z-0">
         <Image src="/before_paint.png" fill className={`object-cover opacity-60 grayscale-[30%] ${isMobile ? '' : 'blur-[2px]'} transition-all duration-700 group-hover:blur-none group-hover:opacity-100`} alt="Scratched Paint" />
         <div className="absolute inset-0 bg-black/80 mix-blend-multiply pointer-events-none transition-colors duration-700 group-hover:bg-black/95" />
      </div>

      {/* MASKED REVEAL LAYER: Flawless Glass Coating */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          clipPath: useMotionTemplate`circle(${isActive ? '250px' : '0px'} at ${springX}px ${springY}px)`
        }}
      >
        <Image src="/after_paint.png" fill className="object-cover" alt="Flawless Paint" />
      </motion.div>

      {/* OPTICAL TORCH LAYER: Physical Lens Ring & Crosshair */}
      <motion.div
        className="absolute z-20 pointer-events-none w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 flex items-center justify-center mix-blend-screen"
        style={{
          left: springX,
          top: springY,
          opacity: isActive ? 1 : 0,
        }}
      >
        {/* The Outer Lens Border (Sharp ring to define the torch edge) */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/30 shadow-[inset_0_0_80px_rgba(6,182,212,0.6)] mix-blend-screen" />
        
        {/* The Hot Core LED Flare */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(6,182,212,0.5)_15%,transparent_60%)] pointer-events-none blur-sm" />

        {/* Technical Target Crosshair */}
        <div className="relative w-12 h-12">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-400/50 -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-cyan-400/50 -translate-x-1/2" />
            <div className="absolute inset-0 border border-cyan-400/50 rounded-full" />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_white]" />
        </div>
      </motion.div>
      
      {/* UI HUD Overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-12">
          
          <ScrollReveal>
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter opacity-100 group-hover:opacity-0 transition-opacity duration-700 drop-shadow-xl">
                 Discover <span className="text-cyan-500">Perfection.</span>
             </h2>
             <p className="text-neutral-400 font-bold uppercase tracking-widest text-sm mt-2 opacity-100 group-hover:opacity-0 transition-opacity duration-700">Move Cursor to Inspect</p>
          </ScrollReveal>

          <div className="flex justify-center mt-auto w-full transition-opacity duration-500" style={{ opacity: isActive ? 1 : 0 }}>
             <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/50 px-8 py-4 rounded-xl flex items-center gap-4 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                <Search size={18} className="text-cyan-400 animate-pulse" />
                <span className="text-white font-bold uppercase tracking-widest text-xs">Inspection Torch Active</span>
             </div>
          </div>
      </div>
    </section>
  );
}


// Extracted BookingModal to src/components/BookingModal.tsx

// ==========================================
// MAIN PAGE LAYER
// ==========================================
export default function ClientPage({ serverPackages, serverInterior, serverBookingsPaused, operationStartTime, operationEndTime, slotIntervalMinutes }: any) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingInitialPackage, setBookingInitialPackage] = useState<any>(null);

  // Hydrate local constants with server values if present
  const LIVE_PAINT_TIERS = serverPackages || PAINT_TIERS;
  const LIVE_INTERIOR = serverInterior || INTERIOR;

  const openBookingModalWithPackage = (pkg?: any) => {
    setBookingInitialPackage(pkg || null);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="bg-black min-h-screen text-white selection:bg-cyan-500/30 font-sans custom-scrollbar overflow-clip">
      <CustomCursor />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        initialPackage={bookingInitialPackage}
        serverPackages={LIVE_PAINT_TIERS} 
        serverInterior={LIVE_INTERIOR} 
        serverBookingsPaused={serverBookingsPaused} 
        operationStartTime={operationStartTime}
        operationEndTime={operationEndTime}
        slotIntervalMinutes={slotIntervalMinutes}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="relative">
               <FlaskConical size={32} className="text-white transform group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute -top-1 -right-1 text-white text-[12px] opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300">✨</div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter leading-none text-white whitespace-nowrap">DETAILING LAB</span>
              <div className="flex items-center justify-between mt-1 opacity-80">
                 <div className="h-[2px] flex-1 bg-white" />
                 <span className="text-[10px] font-bold tracking-[0.2em] text-white leading-none px-2">YORKSHIRE</span>
                 <div className="h-[2px] flex-1 bg-white" />
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400 cursor-none">
            <a href="#services" className="hover:text-white transition-colors cursor-none">Services</a>
            <a href="#protection" className="hover:text-white transition-colors cursor-none">Ceramic Armor</a>
            <a href="#reviews" className="hover:text-white transition-colors cursor-none">Results</a>
          </div>
          <MagneticButton onClick={() => openBookingModalWithPackage()} className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-black tracking-tight rounded-lg transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-none">
            Get Booked In
          </MagneticButton>
        </div>
      </nav>

      {/* Hero Section */}
      <main 
        className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-black"
      >
        {/* Background image with cinematic grade */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <Image 
            src="/hero_outdoor.png" 
            alt="Mobile Ceramic Coated Supercar outdoors, Yorkshire" 
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Multi-layer cinematic darkening */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </motion.div>

        {/* Animated scan line */}
        <motion.div
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
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/10 text-cyan-400 text-[11px] font-bold tracking-[0.2em] uppercase mb-10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            Yorkshire&apos;s Elite Mobile Detailing Unit
          </motion.div>
          
          {/* Main headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-[-0.04em] leading-[0.88] uppercase text-center mb-8"
          >
            <span className="block text-white">Surgical</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400">Precision.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed font-medium text-center mb-10"
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
            <MagneticButton onClick={() => openBookingModalWithPackage()} className="relative group px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-xl flex items-center gap-2.5 transition-all uppercase tracking-wide shadow-[0_0_40px_rgba(6,182,212,0.35)] cursor-none text-sm">
              <span className="relative z-10 flex items-center gap-2">
                Get Booked In!
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </MagneticButton>
            
            <MagneticButton className="px-8 py-4 bg-white/[0.04] backdrop-blur-xl border border-white/10 text-white font-bold tracking-wide uppercase rounded-xl hover:bg-white/[0.08] hover:border-white/20 transition-all flex items-center gap-2.5 cursor-none text-sm">
              <Sparkles size={18} className="text-cyan-400" /> View Packages
            </MagneticButton>
          </motion.div>

          {/* Integrated stats strip — NO gap */}
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
                className="flex items-center gap-2.5 group"
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
      </main>

      {/* CORE FEATURE: ANIMATED SHIELD REVEAL (Scroll Stopper Engine) */}
      <AnimatedShieldReveal />

      {/* CORE FEATURE: DYNAMIC PRICING ESTIMATOR */}
      <section className="py-24 px-4 bg-[#020202] relative" id="pricing">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Precision Quotes</h2>
            <p className="text-neutral-400 max-w-xl mx-auto">Get an instant calculation based on your vehicle's physical footprint and our service tier parameters.</p>
          </div>
          <PricingEstimator 
            onBook={openBookingModalWithPackage} 
            serverPackages={LIVE_PAINT_TIERS} 
            serverInterior={LIVE_INTERIOR} 
          />
        </div>
      </section>

      {/* CORE FEATURE: INFOGRAPHIC ENGINEERING ANALYSIS */}
      <section className="relative z-10 border-t border-white/5 bg-gradient-to-b from-[#020202] to-[#050505]">
          <InfographicSection />
      </section>

      {/* CORE FEATURE: VISUAL EVIDENCE GALLERY */}
      <section id="evidence" className="relative z-10 py-16 lg:py-24 px-6 max-w-7xl mx-auto">
         <ScrollReveal>
             <div className="text-center mb-14">
               <p className="text-cyan-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">Real Results</p>
               <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Visual <span className="text-cyan-500">Evidence</span></h2>
             </div>
             
             {/* Primary large slider */}
             <div className="mb-12">
               <BeforeAfterSlider beforeUrl="/subtle_before.png" afterUrl="/perfect_after.png" />
             </div>
             
             {/* Car gallery grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                 { before: "/bmw_before.png", after: "/bmw_after.png", car: "BMW 3 Series", service: "Stage 2 Correction + Ceramic" },
                 { before: "/audi_before.png", after: "/audi_after.png", car: "Audi A5", service: "Paint Correction + Sealant" },
                 { before: "/rangerover_before.png", after: "/rangerover_after.png", car: "Range Rover Sport", service: "Full Correction + 9H Ceramic" },
               ].map((item, i) => (
                 <ScrollReveal key={i} delay={i * 0.1}>
                   <div className="group relative rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a0a] hover:border-cyan-500/30 transition-all duration-500">
                     <div className="relative h-48 sm:h-56 overflow-hidden">
                       {/* After image (visible by default) */}
                       <Image src={item.after} alt={`${item.car} after detailing`} fill className="object-cover transition-opacity duration-700 group-hover:opacity-0" sizes="(max-width: 768px) 100vw, 33vw" />
                       {/* Before image (visible on hover) */}
                       <Image src={item.before} alt={`${item.car} before detailing`} fill className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" sizes="(max-width: 768px) 100vw, 33vw" />
                       
                       {/* Labels */}
                       <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-cyan-500/90 text-[10px] font-bold text-black uppercase tracking-wider opacity-100 group-hover:opacity-0 transition-opacity duration-300">After</div>
                       <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-red-500/90 text-[10px] font-bold text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">Before</div>
                       <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-bold text-neutral-300 uppercase tracking-wider">Hover to Compare</div>
                     </div>
                     <div className="p-4">
                       <p className="text-white font-bold text-sm">{item.car}</p>
                       <p className="text-neutral-500 text-xs mt-0.5">{item.service}</p>
                     </div>
                   </div>
                 </ScrollReveal>
               ))}
             </div>

             {/* Operational Showcase Banners */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full">
                 {/* Mobile Operations Banner */}
                 <ScrollReveal delay={0.2}>
                     <div className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden group border border-white/10 shadow-2xl">
                         <Image src="/mobile_service_car.png" alt="Detailing Lab mobile unit detailing a luxury car at a residential home" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                         <div className="absolute bottom-0 left-0 p-5 md:p-8 w-full">
                             <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                 Fully Mobile Operations
                             </div>
                             <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tighter leading-none mb-3 drop-shadow-md">
                                 The Studio <span className="text-cyan-500">Comes to You</span>
                             </h3>
                             <p className="text-neutral-300 text-sm font-medium leading-relaxed drop-shadow-md line-clamp-3">
                                 Our self-contained vans arrive equipped with pure DI water systems, pressure washers, and climate tents. Elite level detailing conducted perfectly on your driveway.
                             </p>
                         </div>
                     </div>
                 </ScrollReveal>

                 {/* Snow Foam Decontamination Banner */}
                 <ScrollReveal delay={0.3}>
                     <div className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden group border border-white/10 shadow-2xl">
                         <Image src="/snow_foam_uk_house.png" alt="Luxury car covered in thick snow foam during a decontamination wash" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                         <div className="absolute bottom-0 left-0 p-5 md:p-8 w-full">
                             <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                 Advanced Chemistry
                             </div>
                             <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tighter leading-none mb-3 drop-shadow-md">
                                 Touchless <span className="text-emerald-500">Decontamination</span>
                             </h3>
                             <p className="text-neutral-300 text-sm font-medium leading-relaxed drop-shadow-md line-clamp-3">
                                 We utilize pH-neutral, ultra-thick snow foam to safely lift bonded grit, road salt, and traffic film away from the paintwork before a single mitt touches the car—preventing micro-scratches.
                             </p>
                         </div>
                     </div>
                 </ScrollReveal>
             </div>
         </ScrollReveal>
      </section>

      {/* Trust & Review Section — 3 Column Grid */}
      <section id="reviews" className="relative z-10 py-16 lg:py-24 bg-gradient-to-b from-[#050505] to-[#0a0a0a] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-cyan-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">What Our Clients Say</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Trusted by <span className="text-cyan-500">Yorkshire</span></h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {[
              {
                name: "James T.",
                car: "BMW M4 Competition",
                service: "Stage 2 Correction + Ceramic",
                review: "Took out every single swirl mark. The depth of gloss in the paint is unreal — looks better than when I collected it from the dealer. Can't recommend enough.",
                initials: "JT"
              },
              {
                name: "Dr. Alistair M.",
                car: "Range Rover Autobiography",
                service: "Full Exterior + Interior Reset",
                review: "After 40k miles of motorway abuse, the paint was heavily swirled. They reversed the damage completely. Leather restoration is factory-spec. Worth every penny.",
                initials: "AM"
              },
              {
                name: "Sarah J.",
                car: "Audi RS6 Avant",
                service: "Paint Correction + 9H Ceramic",
                review: "The hydrophobic coating is incredible — dirt just sheets off in rain. After three months, the car still looks like it was polished yesterday. Proper craftsmanship.",
                initials: "SJ"
              }
            ].map((testimonial, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="h-full p-5 lg:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col group">
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-cyan-400 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} fill="currentColor" size={14} />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-neutral-300 text-sm leading-relaxed mb-5 flex-1">&ldquo;{testimonial.review}&rdquo;</p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="w-9 h-9 rounded-full bg-cyan-900/30 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs font-bold">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold">{testimonial.name}</p>
                      <p className="text-neutral-500 text-[10px] uppercase tracking-wider">{testimonial.car}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CORE FEATURE: PPC KEYWORD BLEEDING (Local SEO Architecture) */}
      <section className="relative z-10 py-16 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
               <h2 className="text-xl font-black uppercase tracking-widest text-cyan-500 mb-4">Elite Coverage Areas</h2>
               <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                 Our specialized mobile detailing units are deployed exclusively to the highest yield postcodes across Yorkshire. We bring studio-grade paint correction directly to your driveway.
               </p>
            </div>
            <div className="col-span-1">
               <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 border-b border-white/10 pb-2">North Yorkshire</h3>
               <ul className="space-y-3">
                 <li><a href="#" className="text-neutral-500 text-sm hover:text-cyan-400 transition-colors cursor-none">Mobile Detailing in Harrogate</a></li>
                 <li><a href="#" className="text-neutral-500 text-sm hover:text-cyan-400 transition-colors cursor-none">Ceramic Coating Wetherby</a></li>
                 <li><a href="#" className="text-neutral-500 text-sm hover:text-cyan-400 transition-colors cursor-none">Paint Correction York</a></li>
                 <li><a href="#" className="text-neutral-500 text-sm hover:text-cyan-400 transition-colors cursor-none">Luxury Valeting Ripon</a></li>
               </ul>
            </div>
            <div className="col-span-1">
               <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 border-b border-white/10 pb-2">West Yorkshire</h3>
               <ul className="space-y-3">
                 <li><a href="#" className="text-neutral-500 text-sm hover:text-cyan-400 transition-colors cursor-none">Mobile Detailer Leeds (LS1)</a></li>
                 <li><a href="#" className="text-neutral-500 text-sm hover:text-cyan-400 transition-colors cursor-none">Car Detailing Ilkley</a></li>
                 <li><a href="#" className="text-neutral-500 text-sm hover:text-cyan-400 transition-colors cursor-none">Ceramic Coating Otley</a></li>
                 <li><a href="#" className="text-neutral-500 text-sm hover:text-cyan-400 transition-colors cursor-none">Paint Protection Bradford</a></li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Direct-Response CTA Footer */}
      <footer className="relative z-10 py-20 md:py-40 px-4 md:px-6 overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 bg-cyan-900/10 pointer-events-none" />
        
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-cyan-600/20 blur-[150px] rounded-full pointer-events-none" />

        <ScrollReveal className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4 md:mb-6">
            Demand <span className="text-cyan-500">Perfection.</span>
          </h2>
          <p className="text-neutral-400 text-xl mb-12 leading-relaxed">
            Our bays book up weeks in advance. Stop driving a compromised asset. Request a quote today to secure your vehicle's transformative armor.
          </p>
          
          <div className="flex flex-col items-center">
            <MagneticButton onClick={() => openBookingModalWithPackage()} className="px-8 py-5 md:px-12 md:py-6 w-full sm:w-auto justify-center bg-cyan-500 text-black text-lg md:text-xl font-black tracking-tight uppercase rounded-xl transition-colors shadow-[0_0_40px_rgba(6,182,212,0.4)] flex items-center gap-3 cursor-none">
              Request Free Quote <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform hidden sm:block" />
            </MagneticButton>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="mt-6 flex items-center gap-2 text-neutral-400 text-sm font-medium border border-white/5 py-2 px-4 rounded-full bg-white/5 backdrop-blur-md cursor-none pointer-events-none"
            >
              <Shield size={16} className="text-cyan-500" />
              <span>No payment required to request. 100% Secure.</span>
            </motion.div>
          </div>
        </ScrollReveal>
      </footer>

    </div>
  );
}

