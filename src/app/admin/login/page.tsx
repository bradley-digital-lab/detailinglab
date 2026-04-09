import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Shield, Lock, ArrowRight, AlertTriangle } from 'lucide-react'

export default async function LoginPage() {
  const hasEnvVars = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!hasEnvVars) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full border border-red-500/30 bg-red-500/5 rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(239,68,68,0.1)]">
            <AlertTriangle size={48} className="text-red-500 mx-auto mb-6" />
            <h1 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">Database Disconnected</h1>
            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
              The CRM and Fleet Management backbone requires a live Supabase Postgres Project. 
              You must supply <code className="bg-black text-red-400 px-1.5 py-0.5 rounded text-xs border border-white/10">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-black text-red-400 px-1.5 py-0.5 rounded text-xs border border-white/10">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in your environment variables to access the Admin Hub.
            </p>
            <a 
              href="https://supabase.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold uppercase text-sm tracking-widest hover:bg-neutral-200 transition-colors"
            >
              Get Keys via Supabase <ArrowRight size={16} />
            </a>
        </div>
      </div>
    )
  }

  // Handle Login logic
  const signIn = async (formData: FormData) => {
    'use server'
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/admin/login?message=Could not authenticate user')
    }

    return redirect('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10">
        <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center shadow-xl">
                 <Shield className="text-cyan-400" size={32} />
            </div>
        </div>

        <div className="text-center mb-10">
            <h1 className="text-3xl font-black uppercase text-white tracking-tighter mb-2">Platform Access</h1>
            <p className="text-neutral-500 text-sm font-medium uppercase tracking-widest">Detailing Lab Central Command</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">Email Coordinates</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="operator@detailinglab.co.uk"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-neutral-600 outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">Access Protocol (Password)</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              <input 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white placeholder-neutral-600 outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all text-sm tracking-widest"
              />
            </div>
          </div>

          <button 
            formAction={signIn}
            className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-sm tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
          >
            Engage Uplink
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center flex flex-col items-center gap-2">
           <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
           <p className="text-neutral-600 text-[10px] uppercase font-bold tracking-[0.2em] mt-4">Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  )
}
