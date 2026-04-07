"use client"
import { Database, AlertCircle } from "lucide-react";

export default function ClientMatrix() {
  return (
    <div className="w-full flex-1 flex flex-col gap-6">
      <div className="flex items-center gap-4 mb-6">
        <Database size={28} className="text-emerald-400" />
        <h1 className="text-3xl font-bold tracking-tighter text-white">Client Matrix</h1>
      </div>

      <div className="rounded-2xl bg-[#0A0A0A] border border-[#ffffff10] shadow-2xl p-8 max-w-4xl flex items-start gap-4">
        <AlertCircle size={24} className="text-yellow-500 shrink-0 mt-1" />
        <div>
          <h2 className="text-lg font-bold text-white mb-2">Phase 4 Supabase Architecture Required</h2>
          <p className="text-neutral-400 text-sm leading-relaxed mb-4">
            The Client Matrix backend has not been instantiated. This area will securely fetch and display your CRM pipeline. 
            To activate this matrix, provide the NEXT_PUBLIC_SUPABASE_URL constraints to the Engine.
          </p>
          <div className="px-4 py-3 bg-[#111] border border-[#ffffff15] rounded-xl font-mono text-xs text-neutral-500 select-all">
            Awaiting Supabase Database Keys...
          </div>
        </div>
      </div>
    </div>
  );
}
