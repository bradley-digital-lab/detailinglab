import Link from 'next/link'
import { Shield, LayoutDashboard, Users, Calendar, Settings, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

import { ThemeToggle } from '@/components/ThemeToggle'
import { PageTransition } from '@/components/PageTransition'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Gracefully handle local dev mode without keys
  const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co';

  let user = null;
  if (!isMockMode) {
     try {
       const { data } = await supabase.auth.getUser()
       user = data.user;
     } catch (e) {
       console.error("Supabase auth error (likely invalid keys):", e)
     }
  }

  // Assuming we check the profile role
  // For local rendering we'll assume "owner" if mock
  let role = isMockMode ? 'owner' : 'freelancer';

  if (!isMockMode && user) {
     const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single()
     if (data) role = data.role
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#020202] text-black dark:text-white flex transition-colors duration-300">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-neutral-200 dark:border-white/10 bg-white dark:bg-[#050505] hidden md:flex flex-col relative z-20 transition-colors duration-300">
          <div className="p-6 border-b border-neutral-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Shield className="text-cyan-600 dark:text-cyan-400" size={16} />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-neutral-800 dark:text-white">Detailing Lab</h2>
                <p className="text-[10px] text-cyan-600 dark:text-cyan-500 font-bold uppercase tracking-widest">{role === 'owner' ? 'Command Center' : 'Freelancer Hub'}</p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors text-sm font-bold text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white group">
               <LayoutDashboard size={18} className="text-neutral-400 dark:text-neutral-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
               Dashboard Overview
            </Link>

            <Link href="/admin/calendar" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors text-sm font-bold text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white group">
               <Calendar size={18} className="text-neutral-400 dark:text-neutral-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
               {role === 'owner' ? 'Master Schedule' : 'My Availability'}
            </Link>

            {role === 'owner' && (
              <>
                <Link href="/admin/team" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors text-sm font-bold text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white group">
                  <Users size={18} className="text-neutral-400 dark:text-neutral-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                  Team Management
                </Link>
                <Link href="/admin/cms/packages" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors text-sm font-bold text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white group">
                  <LayoutDashboard size={18} className="text-neutral-400 dark:text-neutral-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                  Services & Pricing
                </Link>
                <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors text-sm font-bold text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white group">
                  <Settings size={18} className="text-neutral-400 dark:text-neutral-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                  Platform Settings
                </Link>
              </>
            )}
          </nav>

          <div className="p-4 border-t border-neutral-200 dark:border-white/10">
             <form action="/auth/signout" method="post">
               <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-sm font-bold text-neutral-500 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-400 group">
                  <LogOut size={18} className="text-neutral-400 dark:text-neutral-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                  Terminate Link
               </button>
             </form>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-50 dark:bg-[#020202] relative transition-colors duration-300">
           <div className="absolute top-0 left-0 w-full h-[500px] bg-cyan-100/20 dark:bg-cyan-900/5 blur-[120px] pointer-events-none transition-colors duration-300" />
           <PageTransition>
              {children}
           </PageTransition>
        </main>
      </div>
  )
}
