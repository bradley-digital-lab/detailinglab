import React from 'react';
import { MapPin, Shield, Star, CheckCircle2 } from 'lucide-react';

// Programmatic Geographic Landing Page Generator
// Captures hyperspecific local SEO searches (e.g. "Ceramic Coating Harrogate")
export default async function LocationServiceLanding({ params }: { params: { location: string } }) {
  // Parse slug like "ceramic-coating-harrogate" into "Ceramic Coating" and "Harrogate"
  const slug = decodeURIComponent(params.location);
  
  // Very basic NLP extraction for demo: Assume last word is location, rest is service
  const words = slug.split('-');
  const locationName = words.pop()?.replace(/\b\w/g, l => l.toUpperCase()) || 'Yorkshire';
  const serviceName = words.join(' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Elite Auto Detailing';

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-sans selection:bg-cyan-500/30">
        
        {/* LOCAL SEO ANCHOR BANNER */}
        <div className="fixed top-0 left-0 w-full bg-cyan-950/30 border-b border-cyan-500/20 text-cyan-400 py-2 text-center text-xs font-bold uppercase tracking-widest z-50 flex items-center justify-center gap-2 backdrop-blur-md">
            <MapPin className="w-4 h-4" /> Official Protected Territory: {locationName}
        </div>

        <div className="mx-auto max-w-5xl w-full">
            {/* HERO SECTION */}
            <div className="text-center mb-20 mt-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-8 shadow-2xl">
                    <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                    #1 Rated in {locationName}
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-[1.1]">
                    The Premier <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">{serviceName}</span> <br/>
                    Mobile Laboratory For <span className="underline decoration-cyan-500/50 underline-offset-8">{locationName}</span>
                </h1>
                
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto uppercase tracking-wider font-bold">
                    Stop trusting {locationName} mass-volume car washes with your luxury vehicle's clear coat. We bring laboratory-grade ceramic protection directly to your postcode.
                </p>
            </div>

            {/* TRUST MATRIX */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center">
                    <Shield className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white text-lg uppercase tracking-wide mb-2">Independent Matrix</h3>
                    <p className="text-sm text-zinc-500">On-board pure water & power</p>
                </div>
                <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center">
                    <CheckCircle2 className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white text-lg uppercase tracking-wide mb-2">PH-Neutral Chemistry</h3>
                    <p className="text-sm text-zinc-500">Zero acidic wash damage</p>
                </div>
                <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center">
                    <MapPin className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white text-lg uppercase tracking-wide mb-2">{locationName} VIP Coverage</h3>
                    <p className="text-sm text-zinc-500">Dedicated local operations</p>
                </div>
            </div>

            {/* DIRECT ACTION CTA */}
            <div className="p-12 rounded-3xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4 relative z-10">
                    Secure Your {serviceName} Slot
                </h2>
                <p className="text-zinc-400 mb-8 max-w-xl mx-auto relative z-10">
                    Due to the scientific perfectionism of our process, we strictly cap intake. Check immediate availability for {locationName} residents below.
                </p>
                <a href="/" className="inline-flex items-center gap-2 px-10 py-5 bg-cyan-500 text-black font-black text-sm uppercase tracking-widest hover:bg-cyan-400 transition-colors rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.3)] relative z-10 transition-transform hover:scale-105">
                    Get Booked In!
                </a>
            </div>
            
        </div>
    </div>
  );
}
