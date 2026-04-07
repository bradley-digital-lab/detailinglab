"use client"
import { Sparkles, LayoutDashboard, Database, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function CommandCenter() {
  return (
    <div className="w-full flex-1 flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tighter text-white">Command Center</h1>
      <p className="text-neutral-400 max-w-2xl text-sm leading-relaxed mb-8">
        Welcome to your Agency OS. All subsystems are online. Select a vector below to begin operation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Link href="/admin/crm/chat" className="group rounded-2xl p-8 bg-[#0A0A0A] border border-[#ffffff10] shadow-2xl hover:border-indigo-500/50 cursor-pointer transition-all overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
            <MessageSquare size={120} className="text-indigo-400 translate-x-12 -translate-y-8" />
          </div>
          <h2 className="text-2xl font-bold text-indigo-400 mb-2 relative z-10">AI Comm-Link</h2>
          <p className="text-neutral-500 text-sm leading-relaxed relative z-10">
            Access the Juggernaut Prompt Matrix. Mathematically calculate High-Ticket B2B responses and lock £850-£2.5k client deployments.
          </p>
        </Link>
        
        <Link href="/admin/crm/database" className="group rounded-2xl p-8 bg-[#0A0A0A] border border-[#ffffff10] shadow-2xl hover:border-emerald-500/50 cursor-pointer transition-all overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
            <Database size={120} className="text-emerald-400 translate-x-12 -translate-y-8" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-400 mb-2 relative z-10">Client Matrix</h2>
          <p className="text-neutral-500 text-sm leading-relaxed relative z-10">
            Access Supabase database payloads. View active dossiers, client retainers, and pipeline velocity.
          </p>
        </Link>
      </div>
    </div>
  );
}
