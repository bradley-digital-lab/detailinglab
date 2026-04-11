"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isLocked, setIsLocked] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Check session storage so it doesn't lock on every refresh
    const unlocked = sessionStorage.getItem("dl_unlocked");
    if (unlocked === "true") {
      setIsLocked(false);
    }
  }, []);

  useEffect(() => {
    if (input === "258258") {
      sessionStorage.setItem("dl_unlocked", "true");
      setIsLocked(false);
    }
  }, [input]);

  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center text-center p-6 border-[8px] border-cyan-500/20">
       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMjIyIi8+PC9zdmc+')] opacity-50 mix-blend-overlay"></div>
       <div className="relative z-10 flex flex-col items-center justify-center">
           <div className="bg-cyan-500/10 p-6 rounded-full border border-cyan-500/30 mb-8 animate-pulse shadow-[0_0_50px_rgba(6,182,212,0.2)]">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
           </div>
           <h1 className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] text-white mb-6">System Locked</h1>
           <p className="text-cyan-400 text-sm md:text-base font-bold tracking-[0.3em] uppercase max-w-xl leading-loose mb-10">
             Detailing Lab // Yorkshire<br/>
             <span className="text-neutral-500 text-xs">Corporate Architecture Phase 1 Is Currently Under Construction.</span>
           </p>

           <input 
             type="password" 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             className="bg-black border border-white/10 text-center text-cyan-400 p-3 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors uppercase tracking-[0.5em] w-48 text-sm"
             placeholder="OVERRIDE"
             autoFocus
           />
       </div>
    </div>
  );
}
