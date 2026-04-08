import React from 'react';
import Link from 'next/link';
import { ChevronLeft, FlaskConical } from 'lucide-react';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black min-h-screen text-neutral-300 font-sans selection:bg-cyan-500/30">
      {/* Minimal Navigation */}
      <nav className="border-b border-white/5 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400 text-sm font-bold tracking-widest uppercase transition-colors">
                <ChevronLeft size={16} /> Return to Home
            </Link>
            
            <div className="flex items-center gap-2 opacity-50 pointer-events-none">
                <FlaskConical size={18} className="text-white" />
                <span className="font-black text-sm tracking-tighter text-white">DETAILING LAB</span>
            </div>
        </div>
      </nav>

      {/* Main Legal Content Container */}
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24 prose prose-invert prose-p:text-neutral-400 prose-headings:text-white prose-a:text-cyan-400">
        {children}
      </main>
    </div>
  );
}
