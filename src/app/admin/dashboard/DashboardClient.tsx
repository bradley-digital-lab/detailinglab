"use client";

import React, { useState } from 'react';
import { Activity, Car, CreditCard, Crosshair, Users, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardClient({ 
  role, 
  liveJobs, 
  grossRevenue, 
  stripeActive, 
  freelancerId 
}: { 
  role: string, 
  liveJobs: any[], 
  grossRevenue: string, 
  stripeActive: boolean,
  freelancerId?: string
}) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleJobAction = async (jobId: string, action: 'approve' | 'assign' | 'reject') => {
    setIsProcessing(jobId);
    try {
      const res = await fetch('/api/admin/job-action', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ jobId, action, freelancerId })
      });
      if (res.ok) {
         router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(null);
    }
  };

  // derived split for the admin view
  const rawRev = parseFloat(grossRevenue.replace(/[^0-9.-]+/g,""));
  const wageEst = rawRev * 0.6; // 60% standard detailer cut
  const netAdmin = rawRev - wageEst;

  if (role === 'freelancer') {
    return (
      <div className="space-y-8">
        <header className="mb-10">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white mb-2">Freelancer <span className="text-cyan-600 dark:text-cyan-500">Hub</span></h1>
          <p className="text-neutral-500 text-sm">Review your assigned operations and pending dispatches.</p>
        </header>

        <div className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
           <div className="p-6 border-b border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-black/40">
             <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-800 dark:text-white">Your Incoming Operations</h2>
           </div>
           
           <div className="divide-y divide-neutral-100 dark:divide-white/5">
             {liveJobs.filter(j => j.assigned_freelancer_id === freelancerId).length === 0 && (
                <div className="p-10 text-center text-neutral-500 text-sm font-bold uppercase tracking-widest">
                    No active dispatches.
                </div>
             )}
             {liveJobs.filter(j => j.assigned_freelancer_id === freelancerId).map((job) => (
               <div key={job.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                  <div>
                    <div className="flex gap-2 items-center mb-2">
                       <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${job.status === 'assigned' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500 box-border border border-amber-200 dark:border-amber-500/30' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/30'}`}>
                         {job.status === 'assigned' ? 'Action Required' : job.status}
                       </span>
                    </div>
                    <p className="text-neutral-900 dark:text-white font-bold text-sm">{job.vehicle_make} {job.vehicle_model} - {job.postcode}</p>
                    <p className="text-neutral-500 text-xs">{new Date(job.date).toLocaleDateString('en-GB', { timeZone: 'UTC' })} @ {job.time_slot}</p>
                  </div>

                  <div className="flex items-center gap-2">
                     <p className="text-emerald-500 text-lg font-black mr-4">+£{(job.revenue_estimate * 0.6).toFixed(2)} <span className="text-[10px] text-neutral-500">CUT</span></p>
                     
                     {job.status === 'assigned' && (
                       <>
                         <button onClick={() => handleJobAction(job.id, 'reject')} disabled={isProcessing === job.id} className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                            <XCircle size={20} />
                         </button>
                         <button onClick={() => handleJobAction(job.id, 'approve')} disabled={isProcessing === job.id} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-cyan-400 text-white dark:text-black rounded-lg text-xs font-black uppercase tracking-widest transition-colors flex gap-2">
                            <CheckCircle size={14} /> Accept Route
                         </button>
                       </>
                     )}
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    )
  }

  // Admin / Owner View
  return (
    <div className="space-y-8">
      <header className="mb-10">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white mb-2">Central <span className="text-cyan-600 dark:text-cyan-500">Command</span></h1>
        <p className="text-neutral-500 text-sm font-medium">Live Serverless Telemetry. Database Connected.</p>
      </header>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
         <div className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl p-5 relative overflow-hidden shadow-sm">
            <p className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2">{stripeActive ? "Stripe Net Volume" : "Gross Rev Estimate"}</p>
            <h3 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tighter mb-2">{grossRevenue}</h3>
            <p className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">{stripeActive ? "API SYNCED" : "ESTIMATED"}</p>
         </div>

         <div className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl p-5 relative overflow-hidden shadow-sm">
            <p className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2">Wage Allocation (60%)</p>
            <h3 className="text-3xl font-black text-amber-600 dark:text-amber-500 tracking-tighter mb-2">£{isNaN(wageEst) ? '0.00' : wageEst.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</h3>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">DRAG ON GROSS</p>
         </div>

         <div className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl p-5 relative overflow-hidden shadow-sm md:col-span-2">
            <p className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2">Owner Net Profit Return</p>
            <h3 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter mb-2">£{isNaN(netAdmin) ? '0.00' : netAdmin.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</h3>
            <p className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">+ 40% MARGIN SYNC</p>
         </div>
      </div>

      {/* Active Queue */}
      <div className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
         <div className="p-6 border-b border-neutral-200 dark:border-white/10 flex justify-between items-center bg-neutral-50 dark:bg-black/40">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-800 dark:text-white">Live Operations Queue</h2>
            </div>
         </div>

         <div className="divide-y divide-neutral-100 dark:divide-white/5 relative bg-white dark:bg-transparent">
           {liveJobs.length === 0 && (
               <div className="p-10 text-center text-neutral-500 text-sm font-bold uppercase tracking-widest">
                   No active jobs in the queue.
               </div>
           )}
           {liveJobs.map((job: any) => (
             <div key={job.id} className="p-6 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors flex items-center justify-between group">
               <div className="flex items-center gap-6">
                  <div className={`px-3 py-1 rounded border text-[10px] font-bold uppercase tracking-widest 
                    ${job.status === 'pending_admin_approval' ? 'bg-red-100 border-red-200 text-red-600 dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-500' : 
                      job.status === 'assigned' ? 'bg-amber-100 border-amber-200 text-amber-600 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-500' : 
                      'bg-emerald-100 border-emerald-200 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-500'}`}
                  >
                    {job.status.replace(/_/g, ' ')}
                  </div>
                  
                  <div>
                    <p className="text-neutral-900 dark:text-white font-bold text-sm mb-1">{job.customer_name}</p>
                    <p className="text-neutral-500 text-xs font-medium">{job.package_id?.replace('_', ' ')} • {new Date(job.date).toLocaleDateString('en-GB', { timeZone: 'UTC' })}</p>
                  </div>
               </div>

               <div className="flex items-center gap-8">
                  <div className="text-right hidden sm:block">
                    <p className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest mb-1">Value</p>
                    <p className="text-emerald-500 text-sm font-black">£{job.revenue_estimate}</p>
                  </div>
                  
                  {job.status === 'pending_admin_approval' && (
                     <button onClick={() => handleJobAction(job.id, 'approve')} disabled={isProcessing === job.id} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-xs font-black uppercase tracking-widest transition-colors flex gap-2">
                        Verify Job
                     </button>
                  )}
               </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  )
}
