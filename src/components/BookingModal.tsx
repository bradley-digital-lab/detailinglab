"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Droplets, Sparkles, CheckCircle2, X, Check, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { EnterpriseCalendar, DetailingEvent } from "./EnterpriseCalendar";
import { PricingEstimator, SIZES, PAINT_TIERS, INTERIOR, BUNDLE_DISCOUNT } from "./PricingEstimator";

export type Detailer = { id?: string; name: string };

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: any;
  serverPackages?: any;
  serverInterior?: any;
  serverBookingsPaused?: boolean;
  operationStartTime?: string;
  operationEndTime?: string;
  slotIntervalMinutes?: number;
}

export function BookingModal({
  isOpen,
  onClose,
  initialPackage,
  serverPackages,
  serverInterior,
  serverBookingsPaused,
  operationStartTime = '09:00',
  operationEndTime = '18:00',
  slotIntervalMinutes = 120
}: BookingModalProps) {
  
  const LIVE_PAINT_TIERS = serverPackages || PAINT_TIERS;
  const LIVE_INTERIOR = serverInterior || INTERIOR;
  
  // Package Selection State
  const [size, setSize] = useState(SIZES[0]);
  const [paintTier, setPaintTier] = useState(LIVE_PAINT_TIERS[1] || LIVE_PAINT_TIERS[0]);
  const [includeInterior, setIncludeInterior] = useState(false);
  const [upsells, setUpsells] = useState({ engineBay: false, glassSealant: false });

  // Input State
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [postcode, setPostcode] = useState("");
  
  // Routing State
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [assignedDetailer, setAssignedDetailer] = useState<Detailer | null>(null);
  const [routingError, setRoutingError] = useState<string | null>(null);

  // View control (Form vs Success)
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Available Time Slots (Deterministic)
  const generateSlots = () => {
    if (!operationStartTime || !operationEndTime || !slotIntervalMinutes) return [];
    
    // Parse times (e.g. "09:00")
    const [startH, startM] = operationStartTime.split(':').map(Number);
    const [endH, endM] = operationEndTime.split(':').map(Number);
    
    let current = new Date();
    current.setHours(startH, startM, 0, 0);
    
    const end = new Date();
    end.setHours(endH, endM, 0, 0);
    
    const slots = [];
    while (current < end) {
      const h = current.getHours().toString().padStart(2, '0');
      const m = current.getMinutes().toString().padStart(2, '0');
      slots.push(`${h}:${m}`);
      current.setMinutes(current.getMinutes() + slotIntervalMinutes);
    }
    return slots;
  };
  const availableSlots = generateSlots();

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      if (initialPackage) {
        const found = LIVE_PAINT_TIERS.find((p: any) => p.id === initialPackage.id);
        if (found) setPaintTier(found);
      }
      setIsSuccess(false);
      setIsLoading(false);
      setAssignedDetailer(null);
      setRoutingError(null);
      setSelectedDate(null);
      setSelectedTime("");
      setPostcode("");
      setUpsells({ engineBay: false, glassSealant: false });
      setCustomerName("");
      setCustomerEmail("");
      setVehicleMake("");
      setVehicleModel("");
    }
  }, [isOpen, initialPackage, LIVE_PAINT_TIERS]);

  // Handle Dispatch Payload
  const handleFinalSubmit = async () => {
    setIsLoading(true);
    setRoutingError(null);
    try {
      // In a real app we'd query the DB first. For frontend simulation, we assign automatically.
      setAssignedDetailer({ name: "Detailing Lab Lead Tech" });
      
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'dispatch',
          date: selectedDate?.toISOString().split("T")[0],
          time_slot: selectedTime,
          customer_postcode: postcode,
          package_id: paintTier.id,
          customer_name: customerName,
          customer_email: customerEmail,
          vehicle_make: vehicleMake,
          vehicle_model: vehicleModel,
          upsell_engine_bay: upsells.engineBay,
          upsell_glass_sealant: upsells.glassSealant
        })
      });
      // await res.json();
      
      setIsLoading(false);
      setIsSuccess(true);
    } catch(err) {
       setIsLoading(false);
       setIsSuccess(true); // Complete anyway for demo.
    }
  };

  const isFormValid = customerName && customerEmail && vehicleMake && vehicleModel && postcode && selectedDate && selectedTime;

  // Mock Admin Calendar Events
  // To visually block out days, create overlapping DetailingEvents where isAvailable = false
  const getMockEvents = (): DetailingEvent[] => {
     // Create a blocked event for tomorrow to showcase it working
     const tomorrow = new Date();
     tomorrow.setDate(tomorrow.getDate() + 1);
     tomorrow.setHours(9, 0, 0, 0);
     
     const tomorrowEnd = new Date(tomorrow);
     tomorrowEnd.setHours(18, 0, 0, 0);

     return [
       {
         title: "Fully Booked",
         start: tomorrow,
         end: tomorrowEnd,
         isAvailable: false
       }
     ];
  };

  return (
    <AnimatePresence>
      {serverBookingsPaused && isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
           {/* Bookings Paused Banner (Kept for compatibility) */}
           <div className="bg-[#050505] p-8 md:p-12 rounded-3xl max-w-lg w-full text-center border border-white/10 shadow-2xl relative">
             <button onClick={onClose} className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors"><X size={24} /></button>
             <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <ShieldCheck size={32} />
             </div>
             <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-4">Bookings Paused</h2>
             <p className="text-neutral-400 mb-8">
                 We are currently at absolute maximum capacity and are not accepting new clients at this time.
             </p>
          </div>
        </div>
      )}

      {!serverBookingsPaused && isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl cursor-auto"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            className="w-full max-w-6xl h-[95vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.15)] flex flex-col"
          >
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/5 flex justify-between items-center bg-white/5 shrink-0">
              <div className="font-black text-xl tracking-tighter uppercase flex items-center gap-3">
                <ShieldCheck size={24} className="text-cyan-400" />
                Network Dispatch Engine
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                <X size={24} className="text-neutral-400" />
              </button>
            </div>

            {/* Success State */}
            {isSuccess ? (
                <div className="flex flex-col items-center justify-center flex-1 p-10 text-center">
                  <div className="w-24 h-24 rounded-full bg-cyan-500/20 flex items-center justify-center mb-8">
                    <CheckCircle2 size={48} className="text-cyan-400" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 text-cyan-400 tracking-tighter w-full">Order Dispatched.</h3>
                  <p className="text-neutral-400 text-lg mb-10 max-w-lg">
                    Your request has been securely matched to <span className="text-white font-bold">{assignedDetailer?.name}</span>. 
                    They will contact you within 24 hours to structurally confirm your slot.
                  </p>
                  <button onClick={onClose} className="py-4 px-10 border border-white/20 text-white rounded-xl font-black uppercase text-sm hover:bg-white/10 transition-colors">
                    Close Dashboard
                  </button>
                </div>
            ) : (
                /* Body Grid - Two Columns */
                <div className="flex flex-col xl:flex-row flex-1 overflow-y-auto xl:overflow-hidden custom-scrollbar">
                   
                   {/* LEFT COLUMN: THE ASSET */}
                   <div className="w-full xl:w-[45%] h-auto xl:h-full xl:overflow-y-auto custom-scrollbar p-6 md:p-8 xl:border-r border-b xl:border-b-0 border-white/5 xl:pb-24">
                      <h3 className="text-xl md:text-2xl font-black uppercase mb-6 md:mb-8 tracking-tighter border-b border-white/5 pb-4"><span className="text-cyan-500">1.</span> Asset Intel</h3>
                      
                      {/* Vehicle Inputs */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 block">Make</label>
                          <input type="text" value={vehicleMake} onChange={e => setVehicleMake(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors" placeholder="e.g. BMW" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 block">Model & Year</label>
                          <input type="text" value={vehicleModel} onChange={e => setVehicleModel(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors" placeholder="e.g. M4 (2024)" />
                        </div>
                      </div>

                      {/* Package Selectors Flattened */}
                      <div className="space-y-6">
                        {/* Size Select */}
                        <div>
                            <label className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-2 block">Vehicle Size Class</label>
                            <div className="flex gap-2">
                              {SIZES.map(s => (
                                <button
                                  key={s.id}
                                  onClick={() => setSize(s)}
                                  className={`flex-1 py-3 px-2 rounded-xl border flex flex-col items-center gap-1 transition-colors ${size.id === s.id ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[inset_0_0_20px_rgba(6,182,212,0.15)]' : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'}`}
                                >
                                  <span className="text-[10px] font-bold text-center uppercase tracking-wider">{s.label}</span>
                                </button>
                              ))}
                            </div>
                        </div>

                        {/* Paint Tier */}
                        <div>
                            <label className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-2 block">Exterior Service Protocol</label>
                            <div className="flex flex-col gap-2">
                              {LIVE_PAINT_TIERS.map((t: any) => (
                                <button
                                  key={t.id}
                                  onClick={() => setPaintTier(t)}
                                  className={`p-4 rounded-xl border text-left transition-all ${paintTier.id === t.id ? 'bg-cyan-500/10 border-cyan-500 shadow-[inset_0_0_20px_rgba(6,182,212,0.15)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <span className={`font-black uppercase text-xs tracking-wider ${paintTier.id === t.id ? 'text-cyan-400' : 'text-white'}`}>{t.label}</span>
                                    <span className={`text-xs font-bold ${paintTier.id === t.id ? 'text-cyan-400' : 'text-neutral-500'}`}>£{Math.round(t.price * size.multiplier)}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                        </div>

                        {/* Interior Toggle & Upsells */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <button
                            onClick={() => setIncludeInterior(!includeInterior)}
                            className={`p-3 rounded-xl border flex flex-col items-start transition-all ${
                              includeInterior ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[inset_0_0_20px_rgba(52,211,153,0.1)]' : 'bg-white/5 border-white/5 hover:bg-white/10'
                            }`}
                          >
                             <span className={`font-black uppercase text-[10px] tracking-wider mb-1 ${includeInterior ? 'text-emerald-400' : 'text-white'}`}>{INTERIOR.label}</span>
                             {includeInterior ? (
                                <span className="text-emerald-400/80 font-bold text-[10px]">Added (-10% Bundle)</span>
                             ) : (
                                <span className="text-neutral-500 font-bold text-[10px]">+ £{Math.round(INTERIOR.price * size.multiplier)}</span>
                             )}
                          </button>
                          
                          <button
                            onClick={() => setUpsells(prev => ({ ...prev, engineBay: !prev.engineBay }))}
                            className={`p-3 rounded-xl border flex flex-col items-start transition-all ${
                              upsells.engineBay ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[inset_0_0_20px_rgba(52,211,153,0.1)]' : 'bg-white/5 border-white/5 hover:bg-white/10'
                            }`}
                          >
                             <span className={`font-black uppercase text-[10px] tracking-wider mb-1 ${upsells.engineBay ? 'text-emerald-400' : 'text-white'}`}>Engine Bay Detail</span>
                             {upsells.engineBay ? (
                                <span className="text-emerald-400/80 font-bold text-[10px]">Added</span>
                             ) : (
                                <span className="text-neutral-500 font-bold text-[10px]">+ £40</span>
                             )}
                          </button>

                          <button
                            onClick={() => setUpsells(prev => ({ ...prev, glassSealant: !prev.glassSealant }))}
                            className={`p-3 rounded-xl border flex flex-col items-start md:col-span-2 transition-all ${
                              upsells.glassSealant ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[inset_0_0_20px_rgba(52,211,153,0.1)]' : 'bg-white/5 border-white/5 hover:bg-white/10'
                            }`}
                          >
                             <span className={`font-black uppercase text-[10px] tracking-wider mb-1 ${upsells.glassSealant ? 'text-emerald-400' : 'text-white'}`}>Glass Ceramic Sealant</span>
                             {upsells.glassSealant ? (
                                <span className="text-emerald-400/80 font-bold text-[10px]">Added</span>
                             ) : (
                                <span className="text-neutral-500 font-bold text-[10px]">+ £30</span>
                             )}
                          </button>
                        </div>
                      </div>

                      {/* Client Details */}
                      <h3 className="text-2xl font-black uppercase mt-12 mb-6 tracking-tighter border-b border-white/5 pb-4"><span className="text-cyan-500">2.</span> Target Profile</h3>
                      <div className="space-y-4">
                        <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500" placeholder="Full Name" />
                        <input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500" placeholder="Email Address" />
                        <input type="text" value={postcode} onChange={e => setPostcode(e.target.value.toUpperCase())} maxLength={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 tracking-widest uppercase" placeholder="Postcode Prefix (e.g. LS1, HG1)" />
                      </div>
                   </div>

                   {/* RIGHT COLUMN: CALENDAR SCHEDULER */}
                   <div className="w-full xl:w-[55%] h-auto xl:h-full bg-[#050505] p-6 md:p-8 flex flex-col xl:overflow-y-auto custom-scrollbar relative">
                      <h3 className="text-xl md:text-2xl font-black uppercase mb-6 tracking-tighter"><span className="text-cyan-500">3.</span> Schedule & Deploy</h3>
                      
                      <div className="mb-6 flex-shrink-0">
                         <div className="flex items-center gap-4 text-xs font-bold text-neutral-400 mb-2 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-cyan-400" /> Available</span>
                            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-slate-900 border border-white/10" /> Blocked</span>
                         </div>
                         {/* Enterprise Calendar Injection */}
                         <EnterpriseCalendar 
                            onSelectSlot={(start) => { setSelectedDate(start); setSelectedTime(""); }} 
                            events={getMockEvents()}
                         />
                      </div>

                      {selectedDate && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                          <label className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-4 block">Select Time for {selectedDate.toDateString()}</label>
                          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                              {availableSlots.map((slot) => (
                                 <button 
                                    key={slot}
                                    onClick={() => setSelectedTime(slot)}
                                    className={`py-2 rounded-lg border font-bold tracking-widest text-xs transition-all focus:outline-none ${selectedTime === slot ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-[#0a0a0a] text-neutral-400 border-white/10 hover:border-cyan-500/50 hover:text-white'}`}
                                 >
                                    {slot}
                                 </button>
                              ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Sticky Bottom Dispatch Bar */}
                      <div className="mt-auto pt-6 border-t border-white/10 bg-[#050505] sticky bottom-0 w-full z-20 pb-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                           <div className="flex flex-col">
                             <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Total Investment</div>
                             <div className="text-3xl font-black text-white tracking-tighter">
                               £{(Math.round(paintTier.price * size.multiplier) + (includeInterior ? Math.round(INTERIOR.price * size.multiplier * (1 - BUNDLE_DISCOUNT)) : 0) + (upsells.engineBay ? 40 : 0) + (upsells.glassSealant ? 30 : 0))}
                             </div>
                           </div>
                           
                           <button 
                               onClick={handleFinalSubmit} 
                               disabled={!isFormValid || isLoading}
                               className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-tr from-cyan-600 to-cyan-400 hover:from-cyan-500 hover:to-cyan-300 border border-cyan-400/50 hover:border-cyan-300 text-white font-black uppercase rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-20 cursor-pointer shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] disabled:shadow-none text-xs"
                             >
                              {isLoading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                  <Sparkles size={18} />
                                </motion.div>
                              ) : (
                                <>Initialize Dispatch <ShieldCheck size={18} /></>
                              )}
                            </button>
                        </div>
                        {!isFormValid && (
                            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-3 text-right">Please complete all fields & select a time slot to dispatch.</p>
                        )}
                      </div>

                   </div>
                </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
