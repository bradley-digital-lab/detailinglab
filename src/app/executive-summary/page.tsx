"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Database, TrendingUp, Cpu, Server, Lock, Activity, Eye, LayoutDashboard, Calendar, SplitSquareHorizontal, Search, Globe, Code, Target, Award, Car, Sparkles, AlertTriangle, Crosshair, Wallet, Scissors, Smartphone, ArrowRight, Layers } from 'lucide-react';

const TerminalBootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [textIndex, setTextIndex] = useState(0);
  const bootLogs = [
    "INITIALIZING SECURE HANDSHAKE...",
    "ESTABLISHING VERCEL EDGE CONNECTION...",
    "ISOLATING DETAILING LAB - YORKSHIRE DB...",
    "BYPASSING GHL TEMPLATE EXCHANGES...",
    "MOUNTING SUPABASE POSTGRESQL INSTANCE...",
    "VERIFYING CLEARANCE FOR: MARTIN...",
    "DECRYPTING ARCHITECTURAL MANIFESTO..."
  ];

  useEffect(() => {
    if (textIndex < bootLogs.length) {
      const timer = setTimeout(() => setTextIndex(prev => prev + 1), 300);
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 500);
    }
  }, [textIndex, onComplete, bootLogs.length]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black font-mono px-4"
    >
      <div className="w-full max-w-2xl">
        <Lock className="w-8 h-8 text-cyan-500 mb-8 animate-pulse mx-auto" />
        <div className="space-y-4">
          {bootLogs.map((log, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={index <= textIndex ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs md:text-sm border-l-2 border-cyan-500/30 pl-3 md:pl-4"
            >
              <span className="text-neutral-600 hidden sm:inline">[{Date.now().toString().slice(-6)}]</span>
              <span className={index === textIndex ? "text-cyan-400 font-bold" : "text-neutral-500"}>
                {log}
              </span>
            </motion.div>
          ))}
          {textIndex >= bootLogs.length && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center text-green-400 font-black tracking-widest uppercase border border-green-500/20 bg-green-500/10 py-3 rounded text-sm"
            >
              ACCESS GRANTED: MARTIN
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ArchitectureTopologyMap = () => {
  return (
    <div className="w-full bg-[#030303] rounded-3xl border border-white/5 p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group">
      {/* Background glow lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 max-w-5xl mx-auto">
        
        {/* Node 1: User */}
        <div className="flex flex-col items-center w-full md:w-auto relative">
           <div className="absolute -inset-4 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
           <div className="bg-black border border-white/10 w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(0,0,0,1)]">
             <Smartphone className="w-8 h-8 md:w-10 md:h-10 text-neutral-400" />
           </div>
           <p className="mt-6 font-bold text-xs md:text-sm uppercase tracking-widest text-white">High-Ticket Lead</p>
           <p className="mt-2 text-[10px] md:text-xs text-neutral-500 font-mono text-center leading-relaxed">Mobile Context<br/>0ms Request</p>
           
           <motion.div 
             animate={{ x: [0, 100], opacity: [0, 1, 0] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
             className="hidden md:block absolute top-[40px] md:top-[48px] -right-[70px] w-20 h-[2px] bg-cyan-400"
             style={{ boxShadow: "0 0 10px rgba(34, 211, 238, 0.8)" }}
           />
        </div>

        {/* Node 2: Edge Network */}
        <div className="flex flex-col items-center w-full md:w-auto mt-4 md:mt-0 relative">
           <div className="bg-cyan-950/30 border border-cyan-500/40 w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
             <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 animate-pulse blur-sm" />
             <Cpu className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 relative z-10" />
           </div>
           <p className="mt-6 font-bold text-xs md:text-sm uppercase tracking-widest text-cyan-400">Vercel Edge Node</p>
           <p className="mt-2 text-[10px] md:text-xs text-neutral-400 font-mono text-center leading-relaxed">Sub-50ms Render<br/>Next.js Core</p>

           <motion.div 
             animate={{ x: [0, 100], opacity: [0, 1, 0] }}
             transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, ease: "linear" }}
             className="hidden md:block absolute top-[48px] md:top-[56px] -right-[70px] w-20 h-[2px] bg-green-400"
             style={{ boxShadow: "0 0 10px rgba(34, 197, 94, 0.8)" }}
           />
        </div>

        {/* Node 3: Database */}
        <div className="flex flex-col items-center w-full md:w-auto mt-4 md:mt-0 relative">
           <div className="bg-green-950/20 border border-green-500/30 w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center relative z-10">
             <Server className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
           </div>
           <p className="mt-6 font-bold text-xs md:text-sm uppercase tracking-widest text-green-400">PostgreSQL Cloud</p>
           <p className="mt-2 text-[10px] md:text-xs text-neutral-500 font-mono text-center leading-relaxed">Row-Level Security<br/>Supabase Vault</p>

           <motion.div 
             animate={{ x: [0, 100], opacity: [0, 1, 0] }}
             transition={{ duration: 1.5, delay: 1.0, repeat: Infinity, ease: "linear" }}
             className="hidden md:block absolute top-[40px] md:top-[48px] -right-[70px] w-20 h-[2px] bg-red-500"
             style={{ boxShadow: "0 0 10px rgba(239, 68, 68, 0.8)" }}
           />
        </div>

        {/* Node 4: Dashboard */}
        <div className="flex flex-col items-center w-full md:w-auto mt-4 md:mt-0">
           <div className="bg-red-950/20 border-2 border-red-500/50 w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
             <Activity className="w-10 h-10 md:w-12 md:h-12 text-red-500" />
           </div>
           <p className="mt-6 font-bold text-xs md:text-sm uppercase tracking-widest text-red-500">Executive HQ</p>
           <p className="mt-2 text-[10px] md:text-xs text-neutral-400 font-mono text-center leading-relaxed">Live Notification<br/>Algorithms Fired</p>
        </div>

      </div>

      <div className="mt-16 border-t border-white/5 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto">
         <div>
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Total System Latency</p>
            <p className="text-2xl md:text-3xl font-black text-white font-mono">1.2ms <span className="text-xs text-green-400 ml-1">▲</span></p>
         </div>
         <div>
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Security Status</p>
            <p className="text-2xl md:text-3xl font-black text-white font-mono">ENCRYPTED</p>
         </div>
         <div>
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Architecture Integrity</p>
            <p className="text-2xl md:text-3xl font-black text-white font-mono">100%</p>
         </div>
         <div>
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Competitor Threat</p>
            <p className="text-2xl md:text-3xl font-black text-red-500 font-mono">NEGLIGIBLE</p>
         </div>
      </div>
    </div>
  )
}

export default function ExecutiveSummaryPage() {
  const [bootPhase, setBootPhase] = useState<'terminal' | 'greeting' | 'ready'>('terminal');
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  // Auto-advance greeting after 2.5 seconds
  useEffect(() => {
    if (bootPhase === 'greeting') {
      const timer = setTimeout(() => {
        setBootPhase('ready');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [bootPhase]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      <AnimatePresence>
        {bootPhase === 'terminal' && <TerminalBootSequence onComplete={() => setBootPhase('greeting')} />}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: bootPhase === 'terminal' ? 0 : 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="min-h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-cyan-500/30 touch-pan-y"
      >
        
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
           <motion.div 
             style={{ y: yBackground }}
             className="absolute top-[-20%] left-[-10%] w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-cyan-900/20 rounded-full blur-[100px] md:blur-[120px]" 
           />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-40">
          
          {/* HERO SECTION */}
          <section className="min-h-[90vh] md:min-h-[80vh] flex flex-col justify-center items-center text-center mt-12 md:mt-0 mb-20 md:mb-32 relative">
            
            <AnimatePresence mode="wait">
              {bootPhase === 'greeting' && (
                 <motion.div
                   key="greeting"
                   initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                   animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                   exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)", transition: { duration: 0.8 } }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   className="absolute inset-0 flex flex-col items-center justify-center z-50 mt-[-10vh]"
                 >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                       <Lock className="w-4 h-4 text-green-400" />
                       <span className="text-xs font-bold uppercase tracking-widest text-green-400">Authentication Confirmed</span>
                    </div>
                    <h1 className="text-2xl md:text-5xl font-medium uppercase tracking-widest text-neutral-400 mb-2">
                      Welcome,
                    </h1>
                    <span className="text-6xl md:text-9xl font-black block mt-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500 tracking-tighter">
                      Martin.
                    </span>
                 </motion.div>
              )}

              {bootPhase === 'ready' && (
                 <motion.div
                   key="hero"
                   initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                   animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                   transition={{ duration: 1.2, staggerChildren: 0.2 }}
                   className="w-full flex flex-col items-center relative z-40"
                 >
                    <motion.div 
                      className="absolute -top-[100px] md:-top-[150px] left-0 w-full flex justify-center px-4"
                    >
                      <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 rounded-full border border-red-500/20 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)] whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                         <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse flex-shrink-0" />
                         <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.3em] text-red-500 truncate">Clearance: Martin (Detailing Lab - Yorkshire)</span>
                      </div>
                    </motion.div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 md:mb-8 mt-12 md:mt-0">
                       <Shield className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                       <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-cyan-400">Enterprise Technical Disclosure</span>
                    </div>
                    
                    <div className="overflow-hidden mb-6 md:mb-8 px-2">
                       <h1 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                         We Don't Build <br className="md:hidden" />Websites. <br className="hidden md:block"/>
                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 block mt-2 md:mt-0">
                           We Build Monopolies.
                         </span>
                       </h1>
                    </div>
                    
                    <p className="text-base sm:text-lg md:text-2xl text-neutral-400 max-w-4xl font-medium leading-relaxed mb-8 md:mb-12">
                      Martin, you haven't stumbled into a backstreet web-design shop. We construct multi-million pound digital infrastructure designed entirely to annihilate your competition. Welcome to the backend of <span className="text-white font-bold">Detailing Lab - Yorkshire</span>.
                    </p>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1 cursor-pointer rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 max-w-4xl shadow-[0_0_40px_rgba(34,211,238,0.1)] relative group w-full mx-auto"
                    >
                       <div className="bg-black/80 backdrop-blur-xl p-6 md:p-8 rounded-xl border border-white/10 relative overflow-hidden">
                         <div className="absolute inset-0 bg-cyan-500/10 translate-y-[100%] group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500"></div>
                         <p className="text-white text-base md:text-2xl font-black italic tracking-wide uppercase relative z-10 leading-snug">
                           "We want Detailing Lab to crush the market on day one. <br className="hidden md:block" />  This is your ultimate starting advantage."
                         </p>
                       </div>
                    </motion.div>
                 </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* SECTION 1: THE ILLUSION OF CHOICE (MOBILE FIRST) */}
          <section className="mb-24 md:mb-40">
             <motion.div 
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="bg-black border border-white/10 p-6 sm:p-10 md:p-20 rounded-[30px] md:rounded-[40px] relative overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,1)] active:border-red-500/30 transition-colors"
             >
                <div className="absolute -top-10 -right-10 md:top-0 md:right-0 p-10 opacity-[0.03] md:opacity-5">
                   <Eye size={300} className="md:w-[400px] md:h-[400px]" />
                </div>
                <div className="relative z-10 max-w-4xl">
                   <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-500/10 border border-red-500/20 mb-6">
                     <Crosshair className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                     <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-red-400">The Scam of the Modern Web</span>
                   </div>

                   <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 md:mb-8 leading-tight">The Illusion of <br className="md:hidden"/>Choice.</h2>
                   <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                     Let’s be extremely candid: <strong>Every other detailer in Yorkshire is being held hostage and they don't even know it.</strong> 
                   </p>
                   <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                     Your competitors are sold the fantasy that a £50/month DIY subscription to Wix, or a cheap freelancer using GoHighLevel, makes them a business owner. It doesn't. They are renting server space. The second that template platform changes its algorithm, their entire cash flow ceases to exist. We aren't letting that happen to Detailing Lab.
                   </p>
                   <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-6">
                     Worse? <strong>The DIY "cheap" route bleeds businesses out invisibly.</strong> A standard WordPress template takes 4 seconds to load on mobile. Every 1-second delay kills 20% of conversions. Paying £50 for a cheap website costs your competitors tens of thousands in lost revenue because high-end clients bounce before the page even renders.
                   </p>
                   <div className="bg-red-500/5 p-4 rounded-xl border-l-[3px] border-red-500 backdrop-blur-sm">
                     <p className="text-white font-bold text-base md:text-xl leading-relaxed">
                       If Detailing Lab was built on a cheap template, you wouldn't be saving money. You would slowly be funding your competitors. We are eliminating this risk entirely.
                     </p>
                   </div>
                </div>
             </motion.div>
          </section>

          {/* SECTION 2: THE ARSENAL (TAP INTERACTIONS) */}
          <section className="mb-24 md:mb-40">
             <div className="text-center mb-10 md:mb-16 px-2">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 md:mb-6">Detailing Lab's Arsenal.</h2>
                <p className="text-neutral-400 text-sm md:text-lg max-w-3xl mx-auto">
                  We want this business to scale flawlessly. That's why we built a proprietary, isolated <strong>SaaS</strong> platform exclusively for Detailing Lab - Yorkshire. But we aren't just handing you code—we are your technical partners moving forward. Over time, we will aggressively optimize your site, build out new bespoke features, and iterate on this architecture within reason to ensure you continuously outpace the UK market. Tap into what we custom-engineered:
                </p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  { icon: Calendar, title: "Omni-View Dispatch", desc: "Custom React Big Calendar tied directly to your PostgreSQL database. Force-dispatch manual jobs without front-end rules. Complete operational control.", translation: "You can see where every member of staff is, instantly assign jobs, and override bookings at will." },
                  { icon: Lock, title: "Dynamic Role Security", desc: "Military-grade RBAC. Create infinite custom roles—from workshop managers to mobile detailers—each locked into their own restricted dashboard. Only YOU possess the master keys.", translation: "Your staff only see what you let them see. They cannot access your overall revenue, delete client records, or view other workers' schedules." },
                  { icon: SplitSquareHorizontal, title: "Variable Wage Splitting", desc: "A customizable fractional calculus engine. You dictate the exact percentage metrics. When Detailing Lab books a £1,000 job, the server automatically calculates precisely what each specific staff member is owed.", translation: "If a sub-contractor does a job, the system automatically calculates their 'cut' (e.g. 60%) so you never have to do the math at the end of the month." },
                  { icon: Zap, title: "Zero-Friction Checkout", desc: "Direct Stripe API Webhooks. Elite clients can drop a £200 secure deposit instantly via Apple Pay or Google Pay. We eliminate checkout friction and trap intent immediately.", translation: "Clients can pay deposits securely on their phones in 2 seconds using Apple Pay. No clunky forms means more bookings." },
                  { icon: Database, title: "Absolute Sovereignty", desc: "Your customer data lives in a private Supabase PostgreSQL server governed by Row-Level Security. Complete GDPR immunity for Detailing Lab.", translation: "Unlike GoHighLevel which owns your client list, YOU own your data physically. Your entire client list is secure and untouchable." },
                  { icon: TrendingUp, title: "Automated Client Retention", desc: "Every client who books is pushed into your private CRM. We can securely automate 6-month ceramic coating maintenance triggers, generating guaranteed Recurring Revenue without you lifting a finger.", translation: "The system remembers your clients and emails them 6 months later to book a maintenance wash, artificially boosting your monthly income." }
                ].map((item, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     whileTap={{ scale: 0.95, border: "1px solid rgba(34,211,238,0.5)" }}
                     whileHover={{ scale: 1.02 }}
                     transition={{ duration: 0.4, delay: i * 0.1 }}
                     className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl hover:border-cyan-500/30 transition-all group cursor-pointer relative overflow-hidden flex flex-col"
                  >
                     <div className="absolute -right-10 -top-10 w-32 h-32 md:w-40 md:h-40 bg-cyan-500/5 rounded-full blur-3xl group-active:bg-cyan-500/20 transition-colors"></div>
                     <item.icon className="text-cyan-400 w-8 h-8 md:w-10 md:h-10 mb-4 md:mb-6 relative z-10" />
                     <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider mb-2 relative z-10 leading-tight">{item.title}</h3>
                     <p className="text-neutral-400 text-xs md:text-sm leading-relaxed relative z-10 mb-6 flex-grow">{item.desc}</p>
                     <div className="relative z-10 bg-cyan-900/20 border border-cyan-500/20 p-4 rounded-lg mt-auto">
                        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-2">// BUSINESS IMPACT</span>
                        <p className="text-cyan-100/80 text-xs md:text-sm leading-relaxed font-medium">{item.translation}</p>
                     </div>
                  </motion.div>
                ))}
             </div>
          </section>

          {/* SECTION 3: THE HIGH-TICKET REALITY (PRICE ANCHORING) */}
          <section className="mb-24 md:mb-40">
             <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center"
             >
                <div className="order-2 lg:order-1 relative h-[300px] md:h-[400px] bg-neutral-900 rounded-[30px] border border-white/10 overflow-hidden flex flex-col justify-center p-6 md:p-8 group hover:border-green-500/50 active:border-green-500/50 transition-colors duration-500 shadow-xl">
                   <div className="absolute inset-0 opacity-20 pointer-events-none">
                       <div className="absolute top-10 left-10 w-full h-[1px] bg-green-500"></div>
                       <div className="absolute top-1/2 left-10 w-full h-[1px] bg-green-500/50"></div>
                       <div className="absolute bottom-10 left-10 w-full h-[1px] bg-red-500/50"></div>
                   </div>
                   
                   <div className="relative z-10 space-y-4 md:space-y-6">
                      <div className="flex justify-between items-end border-b border-white/10 pb-3 md:pb-4">
                         <div>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-neutral-500 block">London Corporate API Build</span>
                            <span className="text-xl md:text-2xl font-black text-white">£35,000+</span>
                         </div>
                         <Scissors className="text-neutral-500 w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      
                      <div className="flex justify-between items-end border-b border-white/10 pb-3 md:pb-4">
                         <div>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-neutral-500 block">GHL Templates</span>
                            <span className="text-lg md:text-2xl font-black text-red-500 leading-none block">£15,000/yr <br className="sm:hidden"/><span className="text-xs font-medium text-red-500/60 uppercase ml-0 sm:ml-2">(Lost to Bounces)</span></span>
                         </div>
                         <TrendingUp className="text-red-500 w-4 h-4 md:w-5 md:h-5 rotate-180" />
                      </div>

                      <motion.div 
                        whileTap={{ scale: 0.98 }}
                        className="flex justify-between items-center p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)] active:bg-cyan-500/20 transition-all cursor-pointer"
                      >
                         <div>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">Detailing Lab's Vercel Deployment</span>
                            <span className="text-lg sm:text-xl md:text-3xl font-black text-cyan-400 block leading-none">Unrivaled Access.</span>
                         </div>
                         <Shield className="text-cyan-400 w-5 h-5 md:w-6 md:h-6 flex-shrink-0 ml-2" />
                      </motion.div>
                   </div>
                </div>

                <div className="order-1 lg:order-2">
                   <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/20 mb-4 md:mb-6">
                     <Wallet className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                     <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-green-400">The Economics of Power</span>
                   </div>
                   
                   <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 md:mb-6 leading-tight">Corporate Grade. <br/>Isolated For You.</h2>
                   <p className="text-neutral-400 text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
                     It's time to confront the financial reality of what you are holding. If you took Detailing Lab's backend infrastructure to a corporate London software firm, <strong>the invoice starts at £25,000 to £40,000.</strong>
                   </p>
                   <p className="text-neutral-400 text-sm md:text-lg leading-relaxed mb-6">
                     You are receiving this exact corporate architecture for next to nothing, exclusively because of your relationship with Tom. We want Detailing Lab to thrive, and this level of bulletproof engineering is absolutely not offered to the public at this tier. Period. 
                   </p>
                   <div className="bg-green-500/5 p-4 rounded-xl border-l-[3px] border-green-500 backdrop-blur-sm">
                     <p className="text-white font-bold text-base md:text-lg leading-relaxed">
                       This is a one-off deployment of a massive SaaS asset to give you the ultimate starting advantage. Your only job now is to use the weapon we have built for you to crush the Yorkshire detailing market.
                     </p>
                   </div>
                </div>
             </motion.div>
          </section>

          {/* SECTION 3.5: ARCHITECTURE INFOGRAPHIC */}
          <section className="mb-24 md:mb-40">
             <div className="text-center mb-10 md:mb-16 px-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 mb-4 md:mb-6">
                  <Activity className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-cyan-400">Live Telemetry</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 md:mb-6 leading-tight">The SaaS Pipeline.</h2>
                <p className="text-neutral-400 text-sm md:text-lg max-w-3xl mx-auto">
                  This is a live map of the private enterprise infrastructure running underneath Detailing Lab. Every client interaction is securely routed, instantly computed at the edge, and fired directly to your executive dashboard. 
                </p>
             </div>
             
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
             >
                <ArchitectureTopologyMap />
             </motion.div>
          </section>

          {/* SECTION 4: DOMINATING THE AUTO DETAILING SECTOR */}
          <section className="mb-24 md:mb-40">
             <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center"
             >
                <div className="relative h-[350px] md:h-[500px] bg-gradient-to-br from-neutral-900 to-black rounded-[30px] border border-white/10 overflow-hidden flex items-center justify-center p-6 group shadow-lg">
                   {/* Visual Mockery of Paint Detailing */}
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay md:scale-110 group-active:scale-100 md:group-hover:scale-100 transition-transform duration-[2s]"></div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                   
                   <div className="relative z-10 text-center w-full">
                     <Car className="w-12 h-12 md:w-16 md:h-16 text-cyan-400 mx-auto mb-4" />
                     <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest mb-6">Aesthetic Supremacy</h3>
                     <div className="flex gap-4 p-4 border border-white/5 bg-black/40 rounded-2xl backdrop-blur-md justify-between items-center sm:justify-center mx-auto max-w-[280px]">
                        <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
                          <Sparkles className="text-cyan-400 w-6 h-6 md:w-8 md:h-8 mb-2" />
                          <span className="text-[9px] uppercase font-bold text-neutral-400">WebGL Core</span>
                        </motion.div>
                        <div className="w-[1px] h-10 bg-white/10"></div>
                        <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
                          <Eye className="text-cyan-400 w-6 h-6 md:w-8 md:h-8 mb-2" />
                          <span className="text-[9px] uppercase font-bold text-neutral-400">Zero Latency</span>
                        </motion.div>
                     </div>
                   </div>
                </div>

                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 mb-4 md:mb-6">
                     <Target className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                     <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-cyan-400">Industry Weaponry</span>
                   </div>
                   
                   <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 md:mb-6 leading-tight">Engineered For <br/>High-Ticket.</h2>
                   <p className="text-neutral-400 text-sm md:text-lg leading-relaxed mb-6">
                     When Detailing Lab charges £1,200 for a multi-stage paint correction, your digital presence cannot look like a £50 template. We want you to command top market rates instantly, so we built an aesthetic perfectly engineered for the high-ticket psyche.
                   </p>
                   
                   <div className="space-y-4 md:space-y-6 mt-6 md:mt-8">
                      <motion.div whileTap={{ x: 5 }} className="flex gap-3 md:gap-4 transition-transform p-3 md:p-0 active:bg-white/5 rounded-xl md:rounded-none">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-1 shadow-inner">
                           <span className="text-cyan-400 font-black text-sm md:text-base">1</span>
                        </div>
                        <div>
                           <h4 className="text-base md:text-xl font-bold uppercase tracking-wider mb-1 md:mb-2">3D Graphic Physics</h4>
                           <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">Unlike competitors using static PNG images, we deploy GPU-accelerated graphics to visually simulate your clear-coat correction natively on mobile screens.</p>
                        </div>
                      </motion.div>
                      
                      <motion.div whileTap={{ x: 5 }} className="flex gap-3 md:gap-4 transition-transform p-3 md:p-0 active:bg-white/5 rounded-xl md:rounded-none">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-1 shadow-inner">
                           <span className="text-cyan-400 font-black text-sm md:text-base">2</span>
                        </div>
                        <div>
                           <h4 className="text-base md:text-xl font-bold uppercase tracking-wider mb-1 md:mb-2">Zero-Latency Sliders</h4>
                           <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">Most before-and-after sliders crash phones. Detailing Lab's slider forces high-net-worth enthusiasts to stare at the quality differential of your work without frustration.</p>
                        </div>
                      </motion.div>

                      <motion.div whileTap={{ x: 5 }} className="flex gap-3 md:gap-4 transition-transform p-3 md:p-0 active:bg-white/5 rounded-xl md:rounded-none">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-1 shadow-inner">
                           <span className="text-cyan-400 font-black text-sm md:text-base">3</span>
                        </div>
                        <div>
                           <h4 className="text-base md:text-xl font-bold uppercase tracking-wider mb-1 md:mb-2">Algorithmic Upselling</h4>
                           <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">Your checkout flow isn't passive. We architect behavioral funnels that automatically trigger 'add-on' prompts (interior fabric guard, engine bay detail) at peak buyer intent, mathematically forcing Average Order Value (AOV) higher.</p>
                        </div>
                      </motion.div>
                   </div>
                </div>
             </motion.div>
          </section>

          {/* SECTION 5: RUTHLESS SEO & ORGANIC LEAD GEN (GATEKEPT SECRETS) */}
          <section className="mb-24 md:mb-40">
             <div className="text-center mb-10 md:mb-16 px-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/20 mb-4 md:mb-6">
                  <Target className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-green-400">Algorithmic Dominance</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 md:mb-6 leading-tight">Gatekept Search <br className="md:hidden" />Superpowers.</h2>
                <p className="text-neutral-400 text-sm md:text-lg max-w-3xl mx-auto mb-6">
                  Google aggressively punishes websites that fail its "Core Web Vitals". If your code shifts on a phone, Google demotes you. We don't just pass these tests; we deploy corporate SEO architectures kept strictly behind closed doors by billion-dollar firms.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
                {[
                  {
                    icon: Code,
                    title: "Invisible Schema Architecture",
                    val: "01",
                    desc: "Competitors rely on Google guessing what they do. We inject 'JSON-LD' markup directly into the hidden DOM. We force-feed Google's algorithm pure data, categorizing Detailing Lab not as a 'garage', but as an authoritative corporate entity. You bypass the algorithmic queue.",
                    translation: "Google instantly trusts your site more than competitors because we mathematically prove you are a premium business, skipping the line for higher rankings."
                  },
                  {
                    icon: Globe,
                    title: "Sub-50ms Edge Routing",
                    val: "02",
                    desc: "Competitor templates live on a single cheap server. We deploy Detailing Lab across Vercel’s global Edge network. When a high-ticket client in Yorkshire searches for you, the site is served from their nearest data node in milliseconds. Flawless speed equals higher rankings.",
                    translation: "Your website loads so fast that Google's algorithm physically rewards you with higher search positions over competitors who use slow Wix templates."
                  },
                  {
                    icon: Server,
                    title: "Programmatic Domination",
                    val: "03",
                    desc: "The ultimate weapon. We don't just write a single 'Services' page. Our Next.js architecture can programmatically generate highly-targeted, indexable nodes (e.g., 'Ceramic Coating Leeds'). We deploy an algorithmic net across Yorkshire that competitors cannot manually replicate.",
                    translation: "Instead of writing one specific 'Yorkshire' page, the system automatically spins up hundreds of invisible pages targeting every single rich town in the region, capturing all local searches."
                  }
                ].map((secret, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.15 }}
                    className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-green-500/30 transition-colors flex flex-col"
                  >
                     <div className="absolute -right-6 -top-6 text-[150px] font-black text-white/[0.02] group-hover:text-green-500/[0.05] transition-colors duration-500 pointer-events-none leading-none">
                       {secret.val}
                     </div>
                     <secret.icon className="w-8 h-8 text-green-400 mb-6 relative z-10" />
                     <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider mb-4 relative z-10 leading-tight">{secret.title}</h3>
                     <p className="text-neutral-400 text-sm leading-relaxed relative z-10 mb-6 flex-grow">{secret.desc}</p>
                     
                     <div className="relative z-10 bg-green-900/10 border border-green-500/20 p-4 rounded-lg mt-auto">
                        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-green-400 mb-2">// BUSINESS IMPACT</span>
                        <p className="text-green-100/80 text-xs md:text-sm leading-relaxed font-medium">{secret.translation}</p>
                     </div>
                  </motion.div>
                ))}
             </div>

             <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-black rounded-[30px] border border-cyan-500/20 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between shadow-[0_0_50px_rgba(6,182,212,0.1)] relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none"></div>
                
                <div className="max-w-xl relative z-10 md:mr-8 text-center md:text-left mb-8 md:mb-0">
                   <h3 className="text-2xl md:text-3xl font-black uppercase text-white mb-4">The Mathematical Advantage</h3>
                   <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                     By combining Edge routing, Server-Side Rendering, and programmatic schema, we organically force Detailing Lab to the top of UK search results. We don't want you bleeding thousands of pounds on Google Ads. You will dominate the market through sheer engineering superiority.
                   </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 md:gap-4 w-full md:w-auto relative z-10">
                    {[
                      { score: 99, label: "Performance", color: "text-green-400" },
                      { score: 100, label: "SEO Indexing", color: "text-green-400" },
                      { score: 100, label: "Accessibility", color: "text-green-400" },
                      { score: 100, label: "Schema Data", color: "text-cyan-400" }
                    ].map((metric, i) => (
                      <div key={i} className="p-3 md:p-4 bg-[#0a0a0a] rounded-xl border border-white/5 flex flex-col items-center justify-center min-w-[100px] md:min-w-[120px] shadow-inner">
                         <span className={`text-2xl md:text-3xl font-black ${metric.color} mb-1 leading-none`}>
                            {metric.score}
                         </span>
                         <span className="text-[9px] md:text-[10px] text-neutral-500 font-bold uppercase tracking-wider">{metric.label}</span>
                      </div>
                    ))}
                </div>
             </motion.div>
          </section>

          {/* SECTION 5.5: CLASSIFIED INTERCEPTION PROTOCOL */}
          <section className="mb-24 md:mb-40">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               className="bg-[#050000] border border-red-500/20 p-6 md:p-12 md:pt-16 rounded-[30px] shadow-[0_0_50px_rgba(239,68,68,0.05)] relative overflow-hidden"
             >
                {/* Warning tape style header */}
                <div className="absolute top-0 left-0 w-full bg-red-500/20 text-red-500 border-b-2 border-red-500 py-1 flex items-center overflow-hidden">
                   <div className="flex animate-[slide_20s_linear_infinite] whitespace-nowrap min-w-full">
                     {Array.from({ length: 20 }).map((_, i) => (
                       <span key={i} className="text-[11px] font-black uppercase tracking-[0.3em] px-4">
                         CLASSIFIED // DO NOT DISTRIBUTE //
                       </span>
                     ))}
                   </div>
                </div>

                <div className="mt-8 mb-8 md:mb-12 text-center">
                   <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto mb-6 animate-pulse" />
                   <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">Competitor Interception.</h2>
                   <p className="text-neutral-400 text-sm md:text-lg max-w-3xl mx-auto font-medium">
                     What you are about to read are ruthless, zero-sum organic search strategies. <span className="text-red-400 underline decoration-red-500/30">Keep this entirely to yourself.</span> If the wider Yorkshire detailing network understands the exact algorithmic mechanisms we are deploying to siphon their traffic, they will attempt to adapt. Do not let them.
                   </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
                   <div className="bg-black p-6 rounded-2xl border border-red-500/10 hover:border-red-500/30 transition-colors flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                         <Search className="text-red-500 w-6 h-6" />
                         <h3 className="text-lg font-bold text-white uppercase tracking-wider">Search Hijacking</h3>
                      </div>
                      <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 flex-grow">
                        When a high-ticket client actively searches for a specific local competitor by name on Google, we deploy <strong>'Intercept Nodes'</strong>. These are programmatically generated pages built to rank organically for their brand name, instantly comparing their standard services to Detailing Lab's corporate absolute. We intercept the lead at the exact moment of purchase intent.
                      </p>
                      <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-lg mt-auto">
                         <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-2">// BUSINESS IMPACT</span>
                         <p className="text-red-100/80 text-xs md:text-sm leading-relaxed font-medium">When someone Googles your biggest competitor to book them, your website shows up first to convince them to book you instead.</p>
                      </div>
                   </div>
                   
                   <div className="bg-black p-6 rounded-2xl border border-red-500/10 hover:border-red-500/30 transition-colors flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                         <Target className="text-red-500 w-6 h-6" />
                         <h3 className="text-lg font-bold text-white uppercase tracking-wider">Geofenced Extraction</h3>
                      </div>
                      <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 flex-grow">
                        We don't just rely on 'Yorkshire'. We actively map the exact coordinates of ultra-high-net-worth local areas (e.g. specific affluent postcodes). We then structure your back-end schema to geo-target these exact parameters. When a Porsche owner in an elite postcode searches for paint correction, Google inherently assumes your facility is the only authorized tier.
                      </p>
                      <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-lg mt-auto">
                         <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-2">// BUSINESS IMPACT</span>
                         <p className="text-red-100/80 text-xs md:text-sm leading-relaxed font-medium">Instead of advertising to everyone, we force Google to only favor your website to people living in the richest postcodes with expensive cars.</p>
                      </div>
                   </div>

                   <div className="bg-black p-6 rounded-2xl border border-red-500/10 hover:border-red-500/30 transition-colors flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                         <Globe className="text-red-500 w-6 h-6" />
                         <h3 className="text-lg font-bold text-white uppercase tracking-wider">Authority Siphoning</h3>
                      </div>
                      <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 flex-grow">
                        We deploy automated tracking to scan thousands of Yorkshire-based automotive clubs and high-net-worth directories. We locate high-value 'broken links' pointing at dead competitor websites, acquire them, and 301-redirect their domain authority straight into Detailing Lab's servers. We actively drain their organic power.
                      </p>
                      <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-lg mt-auto">
                         <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-2">// BUSINESS IMPACT</span>
                         <p className="text-red-100/80 text-xs md:text-sm leading-relaxed font-medium">We steal digital trust points from dead competitor websites so that Google ranks your site higher for entirely free.</p>
                      </div>
                   </div>

                   <div className="bg-black p-6 rounded-2xl border border-red-500/10 hover:border-red-500/30 transition-colors flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                         <Award className="text-red-500 w-6 h-6" />
                         <h3 className="text-lg font-bold text-white uppercase tracking-wider">Reputation Asymmetry</h3>
                      </div>
                      <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 flex-grow">
                        When clients search "Best local detailer 5 stars", standard sites fail to communicate reviews to Google's backend. We inject AggregateRating JSON-LD directly into your site's core string, mathematically forcing Google to output your 5-star rating natively on the search results page. Your competitors immediately look inferior.
                      </p>
                      <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-lg mt-auto">
                         <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-2">// BUSINESS IMPACT</span>
                         <p className="text-red-100/80 text-xs md:text-sm leading-relaxed font-medium">When a client searches for a detailer, we physically force Google to print your 5 Gold Stars under your specific link so they click you over everyone else.</p>
                      </div>
                   </div>

                   <div className="bg-black p-6 rounded-2xl border border-red-500/10 hover:border-red-500/30 transition-colors flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                         <Eye className="text-red-500 w-6 h-6" />
                         <h3 className="text-lg font-bold text-white uppercase tracking-wider">Pixel Trapping</h3>
                      </div>
                      <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 flex-grow">
                        We install advanced Server-Side Conversions APIs. If a high-ticket client clicks a competitor's confusing Google Ad, bounces out in frustration, and eventually lands on your organic page, our 'Pixel' tags their device. We then relentlessly retarget them across platforms.
                      </p>
                      <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-lg mt-auto">
                         <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-2">// BUSINESS IMPACT</span>
                         <p className="text-red-100/80 text-xs md:text-sm leading-relaxed font-medium">You let your competitors pay expensive click fees to warm up the customer, and then our system steals the final conversion for pennies.</p>
                      </div>
                   </div>

                   <div className="bg-black p-6 rounded-2xl border border-red-500/10 hover:border-red-500/30 transition-colors flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                         <Wallet className="text-red-500 w-6 h-6" />
                         <h3 className="text-lg font-bold text-white uppercase tracking-wider">PPC Keyword Bleeding</h3>
                      </div>
                      <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 flex-grow">
                        Most local shops run Google Ads blindly, without negative keywords. We dynamically structure Detailing Lab's Schema to rank organically directly underneath their expensive paid ads. We then overshadow their ad with massive structured data modules, causing searchers to actively bypass them.
                      </p>
                      <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-lg mt-auto">
                         <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-2">// BUSINESS IMPACT</span>
                         <p className="text-red-100/80 text-xs md:text-sm leading-relaxed font-medium">We make your competitors waste thousands of pounds on Ads because customers become blind to their links and click your massive organic listing instead.</p>
                      </div>
                   </div>
                   
                   <div className="bg-black p-6 rounded-2xl border border-red-500/20 lg:col-span-2 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors" />
                      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                         <div className="bg-red-500/10 p-4 rounded-full border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                            <Crosshair className="text-red-500 w-10 h-10 md:w-12 md:h-12 flex-shrink-0" />
                         </div>
                         <div className="text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-2">The Hostile Takeover</h3>
                            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-3xl mb-6">
                              This isn't 'marketing'—it is algorithmic warfare. Most Yorkshire detailers write basic blog posts and hope for the best. We actively analyze their site structures, find the exact keywords they are paying £10 a click for, and weaponize your Next.js architecture to strip their organic rankings entirely for free. You will acquire leads they are currently paying to hold onto.
                            </p>
                            <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-lg text-left w-full">
                               <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-2">// BUSINESS IMPACT</span>
                               <p className="text-red-100/80 text-sm leading-relaxed font-medium">Instead of paying for expensive Google Ads, we figure out exactly what keywords your competitors are paying for and write code to take those leads for free.</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-[#020000] p-6 rounded-2xl border border-red-500/40 lg:col-span-2 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMjIyIi8+PC9zdmc+')] opacity-30 mix-blend-overlay" />
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                         <div className="bg-black p-4 rounded-xl border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                            <Lock className="text-red-500/80 w-10 h-10 md:w-12 md:h-12 flex-shrink-0" />
                         </div>
                         <div className="text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-black text-red-500 uppercase tracking-widest mb-2">[ REDACTED PROTOCOLS ]</h3>
                            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-3xl">
                              There are proprietary extraction mechanisms, payload injections, and machine-learning automations we simply cannot document here. If these systems leak, they lose their power. You do not need to understand how the engine works—you only need to know that because of these black-box secrets, Detailing Lab will achieve systemic dominance over your competitors.
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

             </motion.div>
          </section>

          {/* SECTION 6: EXECUTIVE DEPLOYMENT TIMELINE */}
          <section className="mb-24 md:mb-40">
             <div className="text-center mb-12 md:mb-16 px-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 mb-4 md:mb-6">
                  <Activity className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-cyan-400">Launch Protocol</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 md:mb-6 leading-tight">The Deployment <br className="md:hidden"/>Timeline.</h2>
                <p className="text-neutral-400 text-sm md:text-lg max-w-3xl mx-auto">
                  This entire architecture is built and idling on our secure development servers. The moment we receive your executive authorization, this is the exact mechanical sequence that takes Detailing Lab live.
                </p>
             </div>

             <div className="max-w-4xl mx-auto relative px-4 md:px-0">
                {/* Vertical Line */}
                <div className="absolute left-[34px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2"></div>
                
                <div className="space-y-12 md:space-y-24">
                   {/* Phase 1 */}
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group"
                   >
                      <div className="md:w-5/12 text-left md:text-right order-2 md:order-1 pl-20 md:pl-0 pr-0 md:pr-12 md:pt-0 pb-4">
                         <h3 className="text-xl md:text-2xl font-black uppercase text-white mb-2 group-hover:text-cyan-400 transition-colors">T-Minus 01: Server Procurement</h3>
                         <p className="text-neutral-400 text-sm leading-relaxed">
                           We lock down the UK Vercel Edge nodes and provision the private PostgreSQL database vault directly under Detailing Lab's verified corporate identity.
                         </p>
                      </div>
                      <div className="absolute left-1 md:left-1/2 -ml-[1px] md:-ml-0 top-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-black border-4 border-[#050505] shadow-[0_0_0_2px_rgba(6,182,212,0.3)] flex items-center justify-center z-10 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all order-1">
                         <Server className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                      </div>
                      <div className="md:w-5/12 order-3 hidden md:block" />
                   </motion.div>

                   {/* Phase 2 */}
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group"
                   >
                      <div className="md:w-5/12 order-1 md:order-1 hidden md:block" />
                      <div className="absolute left-1 md:left-1/2 -ml-[1px] md:-ml-0 top-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-black border-4 border-[#050505] shadow-[0_0_0_2px_rgba(34,197,94,0.3)] flex items-center justify-center z-10 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all order-1 md:order-2">
                         <Cpu className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                      </div>
                      <div className="md:w-5/12 text-left order-2 md:order-3 pl-20 md:pl-12 pt-1 md:pt-0">
                         <h3 className="text-xl md:text-2xl font-black uppercase text-white mb-2 group-hover:text-green-400 transition-colors">T-Minus 02: Engine Integration</h3>
                         <p className="text-neutral-400 text-sm leading-relaxed">
                           We structure your local logistics, upload the high-ticket pricing matrix, align the custom RBAC staff roles, and activate the zero-friction Apple Pay / Stripe gateways.
                         </p>
                      </div>
                   </motion.div>

                   {/* Phase 3 */}
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group"
                   >
                      <div className="md:w-5/12 text-left md:text-right order-2 md:order-1 pl-20 md:pl-0 pr-0 md:pr-12 md:pt-0">
                         <h3 className="text-xl md:text-2xl font-black uppercase text-white mb-2 group-hover:text-red-500 transition-colors">T-Minus 03: Live Domination</h3>
                         <p className="text-neutral-400 text-sm leading-relaxed">
                           We push the codebase to production, force-ping the global Google Search servers to index your site instantly, and trigger the hostile SEO protocol.
                         </p>
                      </div>
                      <div className="absolute left-1 md:left-1/2 -ml-[1px] md:-ml-0 top-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-black border-4 border-[#050505] shadow-[0_0_0_2px_rgba(239,68,68,0.3)] flex items-center justify-center z-10 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all order-1">
                         <Target className="w-5 h-5 md:w-6 md:h-6 text-red-500 animate-[pulse_2s_ease-in-out_infinite]" />
                      </div>
                      <div className="md:w-5/12 order-3 hidden md:block" />
                   </motion.div>
                </div>
             </div>
          </section>

          {/* FOOTER CALL TO ACTION */}
          <section className="text-center py-20 md:py-32 border-t border-white/10 relative overflow-hidden px-4">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] max-w-xl bg-cyan-900/20 blur-[100px] md:blur-[150px] pointer-events-none"></div>
             
             <motion.div
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             >
                <Award className="text-cyan-500/50 w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 md:mb-8" />
             </motion.div>
             
             <h2 className="text-2xl sm:text-3xl md:text-6xl font-black uppercase tracking-widest mb-4 md:mb-6">Ready to Dominate?</h2>
             <p className="text-neutral-400 text-sm md:text-lg max-w-2xl mx-auto mb-4 md:mb-6">
               Martin, you are equipped with UK enterprise-grade infrastructure. But we don't just deploy and walk away. We are entering an alliance. We will aggressively optimize this site, add new capabilities, and iterate on this asset alongside you over time to guarantee Detailing Lab scales flawlessly.
             </p>
             <p className="text-neutral-400 text-sm md:text-lg max-w-2xl mx-auto mb-8 md:mb-12">
               Furthermore, as an allied partner, you are officially entering our inner network. Starting in 2027, we will be hosting exclusive business award events and high-tier networking galas celebrating the local monopolies we are building. Detailing Lab - Yorkshire is officially on that roster starting today. It's time to capture the market.
             </p>
             
             <motion.div 
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(34,211,238,0.2)" }}
                className="inline-block w-full sm:w-auto px-8 md:px-10 py-5 bg-black border border-cyan-500/30 text-cyan-400 font-black tracking-wider text-xs md:text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)] cursor-default select-none uppercase"
             >
                Looking Forward To Chatting And Helping You Dominate Your Market.
             </motion.div>

             <div className="flex justify-center mt-12 md:mt-20">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 140" className="w-56 md:w-80 h-auto stroke-cyan-400 stroke-[2px] opacity-90 fill-none drop-shadow-md" strokeLinecap="round" strokeLinejoin="round">
                 {/* Master Cubic Bezier Pen Trace */}
                 <motion.path
                   initial={{ pathLength: 0 }}
                   whileInView={{ pathLength: 1 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
                   d="M 30,90 C 35,50 40,20 50,20 C 70,20 80,40 60,60 C 90,60 100,90 70,110 C 40,130 10,100 30,80 C 50,60 80,80 100,60 C 110,50 120,50 130,60 C 125,70 125,100 135,100 C 150,100 160,70 170,70 C 140,70 140,100 160,100 C 165,100 165,70 170,70 C 170,90 170,100 180,100 C 195,100 205,70 215,70 C 185,70 185,100 205,100 C 215,100 215,10 220,10 C 220,50 215,100 230,100 C 270,100 350,90 440,50"
                 />
                 {/* Aggressive Underline Sweep */}
                 <motion.path
                   initial={{ pathLength: 0 }}
                   whileInView={{ pathLength: 1 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ duration: 0.8, ease: "easeOut", delay: 2.7 }}
                   d="M 10 120 Q 200 130 430 115"
                 />
               </svg>
             </div>
          </section>

        </div>
      </motion.div>
    </>
  );
}
