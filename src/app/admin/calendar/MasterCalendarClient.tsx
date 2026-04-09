"use client";

import React, { useState } from 'react';
import { EnterpriseCalendar } from '@/components/EnterpriseCalendar';
import { Plus, X, Search, Clock, MapPin, User, Car } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MasterCalendarClient({ initialJobs, staff }: { initialJobs: any[], staff: any[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();

  // Convert raw DB jobs into React Big Calendar Events
  const calendarEvents = jobs.map((job) => {
    // Basic date parsing based on `date` and `time_slot` ("09:00", etc)
    const baseDate = new Date(job.date);
    const startHour = job.time_slot ? parseInt(job.time_slot.split(':')[0]) : 9;
    
    const start = new Date(baseDate);
    start.setHours(startHour, 0, 0, 0);
    
    // Estimate 2 hour blocks for basic visualization
    const end = new Date(start);
    end.setHours(startHour + 2, 0, 0, 0);

    return {
      id: job.id,
      title: `${job.vehicle_make} - ${job.customer_name}`,
      start,
      end,
      resourceId: job.assigned_freelancer_id,
      isAvailable: job.status === 'assigned',
      jobData: job
    };
  });

  const handleSelectSlot = (start: Date, end: Date) => {
    setSelectedDate(start);
    setIsAddingJob(true);
  };

  const handleManualAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Construct manual payload
    const payload = {
        customer_name: formData.get('customer_name'),
        customer_email: formData.get('customer_email'),
        customer_phone: formData.get('customer_phone'),
        postcode: formData.get('postcode'),
        package_id: formData.get('package_id'),
        vehicle_make: formData.get('vehicle_make'),
        vehicle_model: formData.get('vehicle_model'),
        date: selectedDate?.toISOString().split('T')[0],
        time_slot: formData.get('time_slot'),
        status: 'assigned', // manually added bypasses pending
        assigned_freelancer_id: formData.get('assigned_freelancer_id'),
        revenue_estimate: 150 // Mock dynamic derived manually
    };

    try {
        const res = await fetch('/api/jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            setIsAddingJob(false);
            router.refresh();
        }
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
         <div>
             <h1 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white mb-2 transition-colors">Master <span className="text-cyan-600 dark:text-cyan-500">Schedule</span></h1>
             <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium transition-colors">Visual grid tracking of all personnel and dispatch vectors.</p>
         </div>
         <button 
           onClick={() => { setSelectedDate(new Date()); setIsAddingJob(true); }}
           className="bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-cyan-400 text-white dark:text-black px-6 py-3 rounded-lg font-black uppercase text-sm tracking-widest transition-colors flex items-center justify-center gap-2"
         >
            <Plus size={18} />
            Add Manual Job
         </button>
      </header>

      {/* Calendar View */}
      <div className="w-full h-[600px] bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-white/10 shadow-sm dark:shadow-none p-4 overflow-hidden relative z-10 transition-colors">
          <EnterpriseCalendar events={calendarEvents} onSelectSlot={handleSelectSlot} />
      </div>

      {/* Manual Insert Modal */}
      {isAddingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-white/10 w-full max-w-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
                  <div className="flex justify-between items-start mb-6">
                      <div>
                          <h2 className="text-xl font-black text-neutral-900 dark:text-white uppercase transition-colors">Dispatch Override</h2>
                          <p className="text-neutral-500 text-sm">Force insert a job directly to an operator's schedule.</p>
                      </div>
                      <button onClick={() => setIsAddingJob(false)} className="text-neutral-400 hover:text-white transition-colors">
                          <X size={20} />
                      </button>
                  </div>

                  <form onSubmit={handleManualAdd} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                              <label className="text-xs font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2 block">Customer Name</label>
                              <input required name="customer_name" type="text" className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500" placeholder="John Doe" />
                          </div>
                          <div>
                              <label className="text-xs font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2 block">Postcode Target</label>
                              <input required name="postcode" type="text" className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500" placeholder="LS1 4BX" />
                          </div>
                          <div>
                              <label className="text-xs font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2 block">Vehicle Make / Model</label>
                              <div className="flex gap-2">
                                <input required name="vehicle_make" type="text" className="w-1/2 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500" placeholder="Audi" />
                                <input required name="vehicle_model" type="text" className="w-1/2 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500" placeholder="RS6" />
                              </div>
                          </div>
                          <div>
                              <label className="text-xs font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2 block">Package Tier</label>
                              <select name="package_id" className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500 uppercase tracking-wider font-bold">
                                  <option value="maintenance_wash">Maintenance Wash</option>
                                  <option value="deep_clean">Deep Clean / Reset</option>
                                  <option value="machine_polish">Machine Polish (Paint Correction)</option>
                                  <option value="ceramic_coating">Ceramic Matrix Coating</option>
                              </select>
                          </div>
                          <div>
                              <label className="text-xs font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2 block">Time Slot</label>
                              <input required name="time_slot" type="time" defaultValue="09:00" className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500" />
                          </div>
                          <div>
                              <label className="text-xs font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2 block">Assign Operator</label>
                              <select name="assigned_freelancer_id" className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500">
                                 <option value="">-- Unassigned (Needs Dispatch) --</option>
                                 {staff.map(member => (
                                     <option key={member.id} value={member.id}>
                                         {member.first_name} {member.last_name} ({member.role})
                                     </option>
                                 ))}
                              </select>
                          </div>
                      </div>

                      <div className="pt-6 border-t border-neutral-200 dark:border-white/10 flex justify-end gap-3">
                          <button type="button" onClick={() => setIsAddingJob(false)} className="px-5 py-2.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white text-sm font-bold uppercase tracking-wider transition-colors">
                              Cancel
                          </button>
                          <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-cyan-400 text-white dark:text-black px-6 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all">
                              Force Dispatch
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
}
