import { createClient } from '@/lib/supabase/server';
import ClientPage from './ClientPage';

export const revalidate = 0; // Force dynamic to pick up DB changes instantly for this page

export default async function Page() {
  const supabase = await createClient();

  // Fetch active packages
  const { data: packagesData } = await supabase
    .from('packages')
    .select('*')
    .eq('active', true)
    .order('order_index');

  // Fetch settings
  const { data: settingsData } = await supabase
    .from('system_settings')
    .select('*');

  // Format packages to map safely to the frontend array formats
  const dbPackages = packagesData || [];
  const serverPaintTiers = dbPackages
    .filter(p => p.type === 'exterior')
    .map(p => ({ id: p.id, label: p.label, price: Number(p.price), desc: p.description }));
    
  let serverInterior = dbPackages.find(p => p.id === 'interior');
  if (serverInterior) {
    serverInterior = { id: serverInterior.id, label: serverInterior.label, price: Number(serverInterior.price), desc: serverInterior.description };
  }

  const isBookingsPaused = settingsData?.find(s => s.key === 'bookings_paused')?.value === 'true' || settingsData?.find(s => s.key === 'bookings_paused')?.value === true;
  
  const operationStartTime = settingsData?.find(s => s.key === 'operation_start_time')?.value || '09:00';
  const operationEndTime = settingsData?.find(s => s.key === 'operation_end_time')?.value || '18:00';
  const slotIntervalMinutes = parseInt(settingsData?.find(s => s.key === 'slot_interval_minutes')?.value || '120');

  return (
    <>
      <div className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center text-center p-6 border-[8px] border-cyan-500/20">
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMjIyIi8+PC9zdmc+')] opacity-50 mix-blend-overlay"></div>
         <div className="relative z-10 flex flex-col items-center justify-center">
             <div className="bg-cyan-500/10 p-6 rounded-full border border-cyan-500/30 mb-8 animate-pulse shadow-[0_0_50px_rgba(6,182,212,0.2)]">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
             </div>
             <h1 className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] text-white mb-6">System Locked</h1>
             <p className="text-cyan-400 text-sm md:text-base font-bold tracking-[0.3em] uppercase max-w-xl leading-loose">
               Detailing Lab // Yorkshire<br/>
               <span className="text-neutral-500 text-xs">Corporate Architecture Phase 1 Is Currently Under Construction.</span>
             </p>
         </div>
      </div>
      {/* 
      <ClientPage 
        serverPackages={serverPaintTiers.length > 0 ? serverPaintTiers : null}
        serverInterior={serverInterior || null}
        serverBookingsPaused={isBookingsPaused}
        operationStartTime={operationStartTime}
        operationEndTime={operationEndTime}
        slotIntervalMinutes={slotIntervalMinutes}
      />
      */}
    </>
  );
}
