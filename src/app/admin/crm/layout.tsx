import Link from "next/link";
import { MessageSquare, LayoutDashboard, Database, Settings } from "lucide-react";

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[#050505] text-white selection:bg-indigo-500/30 overflow-hidden">
      
      {/* Structural Sidebar - Deep Neomorphism */}
      <aside className="w-20 lg:w-64 border-r border-[#ffffff10] bg-[#0A0A0A] flex flex-col justify-between py-8">
        <div className="flex flex-col gap-8 px-4 lg:px-8">
          <div className="font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-500">
            <span className="hidden lg:inline">Juggernaut OS</span>
            <span className="lg:hidden text-indigo-400">J/</span>
          </div>

          <nav className="flex flex-col gap-6">
            <Link href="/admin/crm" className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors">
              <LayoutDashboard size={20} />
              <span className="hidden lg:block text-sm font-medium tracking-wide">Command Center</span>
            </Link>
            <Link href="/admin/crm/chat" className="flex items-center gap-3 text-indigo-400">
              <MessageSquare size={20} />
              <span className="hidden lg:block text-sm font-medium tracking-wide">AI Comm-Link</span>
            </Link>
            <Link href="/admin/crm/database" className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors">
              <Database size={20} />
              <span className="hidden lg:block text-sm font-medium tracking-wide">Client Matrix</span>
            </Link>
          </nav>
        </div>

        <div className="px-4 lg:px-8">
          <button className="flex items-center gap-3 text-neutral-500 hover:text-white transition-all">
            <Settings size={20} />
            <span className="hidden lg:block text-sm tracking-wide">OS Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Glassmorphic Workspace */}
      <main className="flex-1 relative overflow-y-auto">
        {/* Subtle background glow effect representing the 'Awwwards' tier constraint */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full point-events-none" />
        
        <div className="relative z-10 w-full h-full p-6 lg:p-12">
          {children}
        </div>
      </main>

    </div>
  );
}
