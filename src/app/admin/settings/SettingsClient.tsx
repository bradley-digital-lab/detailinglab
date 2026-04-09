'use client';

import React, { useState } from 'react';
import { updateSetting } from './actions';
import { ShieldAlert, Zap, Globe, Loader2, Clock, CreditCard, Wallet } from 'lucide-react';

interface SettingsClientProps {
  initialSettings: Record<string, { value: string | boolean; description: string }>;
}

export function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const handleToggle = async (key: string, currentValue: string | boolean) => {
    setLoadingKey(key);
    
    const isCurrentlyTrue = currentValue === 'true' || currentValue === true;
    const newValue = !isCurrentlyTrue;
    
    setSettings(prev => ({
      ...prev,
      [key]: { ...prev[key], value: newValue }
    }));

    const result = await updateSetting(key, newValue ? 'true' : 'false');
    
    if (result.error) {
      setSettings(prev => ({
        ...prev,
        [key]: { ...prev[key], value: currentValue }
      }));
      alert('Failed to update setting: ' + result.error);
    }
    
    setLoadingKey(null);
  };

  const handleTextSave = async (key: string, val: string) => {
    setLoadingKey(key);
    const result = await updateSetting(key, val);
    if (result.error) {
      alert('Failed to update ' + key + ': ' + result.error);
    }
    setLoadingKey(null);
  }

  const isPaused = settings['bookings_paused']?.value === 'true' || settings['bookings_paused']?.value === true;
  const isAutoAssign = settings['auto_assign']?.value === 'true' || settings['auto_assign']?.value === true;
  
  return (
    <div className="space-y-6">
      
      {/* SECTION: BOOKING CONTROLS */}
      <h2 className="text-xl font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-white/10 pb-2 mb-4 mt-8">Booking & Operations</h2>
      
      {/* Bookings Paused Switch */}
      <div className={`p-6 rounded-2xl border transition-all ${isPaused ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/50' : 'bg-white dark:bg-white/5 border-neutral-200 dark:border-white/10'}`}>
        <div className="flex items-start justify-between">
          <div className="flex gap-4 w-full">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isPaused ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500' : 'bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-white'}`}>
              <ShieldAlert size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-neutral-900 dark:text-white font-bold text-lg mb-1">Global Booking Pause</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-lg mb-4">
                    Instantly disables the booking form on the main landing page and rejects API requests. Use for emergency capacity blocks.
                  </p>
                </div>
                <button 
                  onClick={() => handleToggle('bookings_paused', settings['bookings_paused']?.value || 'false')}
                  disabled={loadingKey === 'bookings_paused'}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isPaused ? 'bg-red-500' : 'bg-neutral-300 dark:bg-neutral-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isPaused ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Hours */}
      <div className="p-6 rounded-2xl border bg-white dark:bg-white/5 border-neutral-200 dark:border-white/10">
        <div className="flex items-start justify-between">
          <div className="flex gap-4 w-full">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div className="w-full">
              <h3 className="text-neutral-900 dark:text-white font-bold text-lg mb-1">Global Operational Hours</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-lg mb-4">
                Set exactly when your agency accepts bookings. The system will auto-generate front-end time slots between these bounds natively.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 max-w-2xl">
                <div>
                   <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-2">Start Time (HH:MM)</label>
                   <div className="flex gap-2">
                     <input 
                       type="time"
                       className="bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-lg px-4 py-2 text-neutral-900 dark:text-white font-mono w-full outline-none focus:border-orange-500 transition-colors"
                       value={(settings['operation_start_time']?.value as string)?.replace(/"/g, '') || "09:00"}
                       onChange={(e) => setSettings(prev => ({ ...prev, operation_start_time: { ...prev.operation_start_time, value: e.target.value } }))}
                     />
                     <button onClick={() => handleTextSave('operation_start_time', `"${settings['operation_start_time']?.value}"`)} className="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-3 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-500/30 transition">Save</button>
                   </div>
                </div>
                <div>
                   <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-2">End Time (HH:MM)</label>
                   <div className="flex gap-2">
                     <input 
                       type="time"
                       className="bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-lg px-4 py-2 text-neutral-900 dark:text-white font-mono w-full outline-none focus:border-orange-500 transition-colors"
                       value={(settings['operation_end_time']?.value as string)?.replace(/"/g, '') || "18:00"}
                       onChange={(e) => setSettings(prev => ({ ...prev, operation_end_time: { ...prev.operation_end_time, value: e.target.value } }))}
                     />
                     <button onClick={() => handleTextSave('operation_end_time', `"${settings['operation_end_time']?.value}"`)} className="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-3 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-500/30 transition">Save</button>
                   </div>
                </div>
                <div>
                   <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-2">Slot Interval / Buffer</label>
                   <div className="flex gap-2">
                     <input 
                       type="number"
                       placeholder="e.g. 120"
                       className="bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-lg px-4 py-2 text-neutral-900 dark:text-white font-mono w-full outline-none focus:border-orange-500 transition-colors"
                       value={settings['slot_interval_minutes']?.value as string || "120"}
                       onChange={(e) => setSettings(prev => ({ ...prev, slot_interval_minutes: { ...prev.slot_interval_minutes, value: e.target.value } }))}
                     />
                     <button onClick={() => handleTextSave('slot_interval_minutes', String(settings['slot_interval_minutes']?.value))} className="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-3 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-500/30 transition">Save</button>
                   </div>
                   <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-widest">In minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: ROUTING */}
      <h2 className="text-xl font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-white/10 pb-2 mb-4 mt-12">Logistics & Extent</h2>

      {/* Auto Assign Matcher Switch */}
      <div className={`p-6 rounded-2xl border transition-all ${isAutoAssign ? 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/30' : 'bg-white dark:bg-white/5 border-neutral-200 dark:border-white/10'}`}>
        <div className="flex items-start justify-between">
          <div className="flex gap-4 w-full">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isAutoAssign ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400' : 'bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-white'}`}>
              <Zap size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-neutral-900 dark:text-white font-bold text-lg mb-1">Algorithmic Job Trajectory</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-lg mb-4">
                    If turned off, all incoming bookings bypass the routing algorithm and drop into the manual 'Pending Approval' queue for you to review and assign.
                  </p>
                </div>
                <button 
                  onClick={() => handleToggle('auto_assign', settings['auto_assign']?.value || 'false')}
                  disabled={loadingKey === 'auto_assign'}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isAutoAssign ? 'bg-cyan-500' : 'bg-neutral-300 dark:bg-neutral-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAutoAssign ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatch Radius Limit */}
      <div className="p-6 rounded-2xl border bg-white dark:bg-white/5 border-neutral-200 dark:border-white/10">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Globe size={20} />
            </div>
            <div className="w-full">
              <h3 className="text-neutral-900 dark:text-white font-bold text-lg mb-1">Max Operational Radius</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-lg mb-4">
                The absolute boundary limit the agency will serve. Overrides individual freelancer logic radially.
              </p>
              
              <div className="flex gap-3 mt-4">
                <input 
                  type="number"
                  className="bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-lg px-4 py-2 text-neutral-900 dark:text-white font-mono w-24 outline-none focus:border-purple-500 transition-colors"
                  value={settings['max_dispatch_radius_miles']?.value as string}
                  onChange={(e) => setSettings(prev => ({ ...prev, max_dispatch_radius_miles: { ...prev.max_dispatch_radius_miles, value: e.target.value } }))}
                />
                <button 
                  onClick={() => handleTextSave('max_dispatch_radius_miles', String(settings['max_dispatch_radius_miles']?.value))}
                  disabled={loadingKey === 'max_dispatch_radius_miles'}
                  className="bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-500/30 px-6 py-2 rounded-lg font-bold text-sm transition-colors flex items-center"
                >
                  {loadingKey === 'max_dispatch_radius_miles' ? <Loader2 className="animate-spin" size={16} /> : 'Lock Bounds'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: INTEGRATIONS */}
      <h2 className="text-xl font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-white/10 pb-2 mb-4 mt-12">Financial Integrations</h2>

       <div className="p-6 rounded-2xl border bg-white dark:bg-white/5 border-neutral-200 dark:border-white/10">
        <div className="flex items-start justify-between">
          <div className="flex gap-4 w-full">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 flex items-center justify-center shrink-0">
              <CreditCard size={20} />
            </div>
            <div className="w-full">
              <div className="flex items-center gap-3 mb-1">
                 <h3 className="text-neutral-900 dark:text-white font-bold text-lg">Stripe Connect Engine</h3>
                 <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest">Active Metric Telemetry</span>
              </div>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xl mb-4">
                Connect your active Stripe Secret Key to bypass estimated database revenue algorithms and pull 100% accurate financial telemetry directly into the agency dashboard. 
              </p>
              
              <div className="space-y-4 max-w-xl">
                 <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-2">Stripe Live Secret Key (sk_live_...)</label>
                    <div className="flex gap-2">
                       <input 
                         type="password"
                         placeholder="sk_live_..."
                         className="bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-lg px-4 py-2 text-neutral-900 dark:text-white font-mono w-full outline-none focus:border-blue-500 transition-colors"
                         value={(settings['stripe_secret_key']?.value as string)?.replace(/"/g, '') || ""}
                         onChange={(e) => setSettings(prev => ({ ...prev, stripe_secret_key: { ...prev.stripe_secret_key, value: e.target.value } }))}
                       />
                       <button onClick={() => handleTextSave('stripe_secret_key', `"${settings['stripe_secret_key']?.value}"`)} className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-6 font-bold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-500/30 transition">Link</button>
                    </div>
                 </div>
                 <div className="pt-2">
                     <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-2"><Wallet size={12} /> This will be securely encrypted in Supabase and accessed exclusively by the serverless route.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
