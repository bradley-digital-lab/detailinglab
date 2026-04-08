"use client";
import React from 'react';
import Link from 'next/link';
import { FlaskConical, MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                
                {/* Brand Column */}
                <div className="col-span-1 lg:col-span-1">
                    <Link href="/" className="flex items-center gap-3 group mb-6 inline-flex">
                        <FlaskConical size={28} className="text-white group-hover:text-cyan-400 transition-colors" />
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tighter leading-none text-white whitespace-nowrap">DETAILING LAB</span>
                            <div className="flex items-center justify-between mt-1 opacity-80">
                                <span className="text-[9px] font-bold tracking-[0.2em] text-cyan-500 leading-none">YORKSHIRE HQ</span>
                            </div>
                        </div>
                    </Link>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                        Elite protective coatings, high-end paint correction, and interior restoration. Not just clean. Molecularly fused perfection.
                    </p>
                </div>

                {/* Quick Links Column */}
                <div>
                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Navigation</h4>
                    <ul className="space-y-4">
                        <li><Link href="/#services" className="text-neutral-400 hover:text-cyan-400 text-sm transition-colors cursor-none">Services & Pricing</Link></li>
                        <li><Link href="/#protection" className="text-neutral-400 hover:text-cyan-400 text-sm transition-colors cursor-none">Ceramic Armor</Link></li>
                        <li><Link href="/#evidence" className="text-neutral-400 hover:text-cyan-400 text-sm transition-colors cursor-none">Visual Evidence</Link></li>
                    </ul>
                </div>

                {/* Legal Column */}
                <div>
                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Legal & Security</h4>
                    <ul className="space-y-4">
                        <li><Link href="/legal/privacy-policy" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-none">Privacy Policy (GDPR)</Link></li>
                        <li><Link href="/legal/terms-and-conditions" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-none">Terms & Conditions</Link></li>
                        <li><Link href="/legal/refund-policy" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-none">Refund & Cancellation Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Column */}
                <div>
                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">HQ Operations</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-neutral-400 text-sm">
                            <MapPin size={18} className="text-cyan-500 shrink-0 mt-0.5" />
                            <span>[HQ ADDRESS LINE 1]<br/>[CITY], [POSTCODE]<br/>United Kingdom</span>
                        </li>
                        <li className="flex items-center gap-3 text-neutral-400 text-sm">
                            <Phone size={18} className="text-cyan-500 shrink-0" />
                            <span>[PHONE NUMBER]</span>
                        </li>
                        <li className="flex items-center gap-3 text-neutral-400 text-sm">
                            <Mail size={18} className="text-cyan-500 shrink-0" />
                            <span>bookings@detailinglab.co.uk</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-neutral-600 text-xs font-bold uppercase tracking-widest">
                    &copy; {currentYear} Detailing Lab. All Rights Reserved.
                </p>
                <div className="text-neutral-600 text-[10px] uppercase font-bold tracking-widest">
                    Company No. [COMPANY NAME / CRN]
                </div>
            </div>
        </div>
    </footer>
  );
}
