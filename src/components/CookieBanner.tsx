"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Check } from 'lucide-react';
import Link from 'next/link';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already set cookie preferences
    const consent = localStorage.getItem('dl_cookie_consent');
    if (!consent) {
      // Small delay so it slides up smoothly after initial render
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('dl_cookie_consent', 'all');
    setIsVisible(false);
    // Here we would typically trigger GTM or Meta Pixel initialization
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem('dl_cookie_consent', 'essential');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
          className="fixed bottom-0 left-0 w-full z-[999999] p-4 flex justify-center pointer-events-none"
        >
          <div className="bg-[#111] border border-white/10 p-6 rounded-2xl shadow-[0_-10px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl w-full max-w-4xl pointer-events-auto flex flex-col md:flex-row gap-6 items-start md:items-center">
             
             {/* Left Text */}
             <div className="flex-1">
                 <div className="flex items-center gap-2 mb-2">
                     <Shield size={16} className="text-cyan-400" />
                     <h4 className="text-white font-black uppercase text-sm tracking-widest">Privacy & Control</h4>
                 </div>
                 <p className="text-neutral-400 text-xs leading-relaxed">
                    We use cookies to deliver the ultimate luxury automotive experience, analyse our high-ticket funnel performance, and securely process bookings. By selecting "Accept All", you consent to our use of tracking technologies in accordance with our <Link href="/legal/privacy-policy" className="text-white underline hover:text-cyan-400 transition-colors">Privacy Policy</Link>. You may heavily restrict tracking by selecting structural essentials only.
                 </p>
             </div>

             {/* Right Controls */}
             <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  <button 
                      onClick={handleRejectNonEssential}
                      className="px-6 py-3 border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                  >
                      <X size={14} /> Essentials Only
                  </button>
                  <button 
                      onClick={handleAcceptAll}
                      className="px-6 py-3 bg-cyan-500 text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  >
                      <Check size={14} /> Accept All
                  </button>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
