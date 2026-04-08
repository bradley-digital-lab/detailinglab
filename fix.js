const fs = require('fs');
let text = fs.readFileSync('src/app/page.tsx', 'utf8');

text = text.replace(
  'function BookingModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {', 
  'function BookingModal({ isOpen, onClose, initialPackage }: { isOpen: boolean, onClose: () => void, initialPackage?: any }) {'
);

let stateHooksOld = '  const [step, setStep] = useState(1);\n  const [isLoading, setIsLoading] = useState(false);';
let stateHooksNew = `  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Package Selection State
  const [size, setSize] = useState(SIZES[0]);
  const [paintTier, setPaintTier] = useState(PAINT_TIERS[1]);
  const [includeInterior, setIncludeInterior] = useState(false);`;
text = text.replace(stateHooksOld, stateHooksNew);

let effectOld = '  // Reset state when opened';
let effectTarget = '  const handleRoutingSearch';
let p1 = text.indexOf(effectOld);
let p2 = text.indexOf(effectTarget);
let newEffect = `  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      if (initialPackage) {
        setSize(initialPackage.size);
        setPaintTier(initialPackage.paintTier);
        setIncludeInterior(initialPackage.includeInterior);
        setStep(2); // Skip straight to calendar
      } else {
        setSize(SIZES[0]);
        setPaintTier(PAINT_TIERS[1]);
        setIncludeInterior(false);
        setStep(1); // Show Selection Package
      }
      setIsLoading(false);
      setAssignedDetailer(null);
      setRoutingError(null);
      setSelectedDate("");
      setPostcode("");
    }
  }, [isOpen, initialPackage]);

`;
text = text.substring(0, p1) + newEffect + text.substring(p2);

// increment steps strings
text = text.replace('{/* STEP 1: CALENDAR & GEO-ROUTING */}', '{/* STEP 2: CALENDAR & GEO-ROUTING */}');
text = text.replace('step === 1 && (', 'step === 2 && (');
text = text.replace('setTimeout(() => setStep(2), 1500);', 'setTimeout(() => setStep(3), 1500);');
text = text.replace('{/* STEP 2: THE ASSET */}', '{/* STEP 3: THE ASSET */}');
text = text.replace('step === 2 && (', 'step === 3 && (');
text = text.replace('onClick={() => setStep(3)}', 'onClick={() => setStep(4)}');
text = text.replace('{/* STEP 3: FINAL DISPATCH */}', '{/* STEP 4: FINAL DISPATCH */}');
text = text.replace('step === 3 && (', 'step === 4 && (');
text = text.replace('setStep(4);', 'setStep(5);');
text = text.replace('{/* STEP 4: SUCCESS */}', '{/* STEP 5: SUCCESS */}');
text = text.replace('step === 4 && (', 'step === 5 && (');

let newStep = `              {/* STEP 1: SELECT PACKAGE */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-3xl font-black uppercase mb-2">The Package.</h3>
                  <p className="text-neutral-400 mb-8">Configure your vehicle requirements before checking detailer availability.</p>
                  
                  <div className="space-y-6">
                    {/* Size Select */}
                    <div>
                        <label className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-3 block">1. Vehicle Size</label>
                        <div className="grid grid-cols-3 gap-2">
                          {SIZES.map(s => (
                            <button
                              key={s.id}
                              onClick={() => setSize(s)}
                              className={\`p-3 rounded-xl border flex flex-col items-center gap-2 transition-colors \${size.id === s.id ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[inset_0_0_20px_rgba(6,182,212,0.15)]' : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'}\`}
                            >
                              <span className="text-[10px] font-bold text-center uppercase tracking-wide">{s.label}</span>
                            </button>
                          ))}
                        </div>
                    </div>

                    {/* Paint Tier */}
                    <div>
                        <label className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-3 block">2. Exterior Service</label>
                        <div className="flex flex-col gap-2">
                          {PAINT_TIERS.map(t => (
                            <button
                              key={t.id}
                              onClick={() => setPaintTier(t)}
                              className={\`p-4 rounded-xl border flex flex-col text-left transition-all \${paintTier.id === t.id ? 'bg-cyan-500/10 border-cyan-500 shadow-[inset_0_0_20px_rgba(6,182,212,0.15)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}\`}
                            >
                              <div className="flex items-center justify-between w-full mb-1">
                                <span className={\`font-black uppercase text-sm \${paintTier.id === t.id ? 'text-cyan-400' : 'text-white'}\`}>{t.label}</span>
                                <span className={\`text-xs font-bold \${paintTier.id === t.id ? 'text-cyan-400' : 'text-neutral-500'}\`}>£{Math.round(t.price * size.multiplier)}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                    </div>

                    {/* Interior Toggle */}
                    <div>
                        <label className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-3 block">3. Add Interior?</label>
                        <button
                          onClick={() => setIncludeInterior(!includeInterior)}
                          className={\`w-full p-4 rounded-xl border flex text-left transition-all \${
                            includeInterior
                              ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[inset_0_0_20px_rgba(52,211,153,0.1)]'
                              : 'bg-white/5 border-white/5 hover:bg-white/10'
                          }\`}
                        >
                            <div className="flex items-center justify-between w-full">
                              <span className={\`font-black uppercase text-sm \${includeInterior ? 'text-emerald-400' : 'text-white'}\`}>{INTERIOR.label}</span>
                              <div className="text-right text-xs">
                                {includeInterior ? (
                                    <span className="text-emerald-400 font-bold">£{Math.round(INTERIOR.price * size.multiplier * (1 - BUNDLE_DISCOUNT))} (-10%)</span>
                                ) : (
                                    <span className="text-neutral-500 font-bold">+ £{Math.round(INTERIOR.price * size.multiplier)}</span>
                                )}
                              </div>
                            </div>
                        </button>
                    </div>

                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    className="mt-8 w-full py-4 bg-cyan-500 text-black font-black uppercase rounded-xl hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 cursor-none"
                  >
                    Check Availability <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

`;
text = text.replace('{/* STEP 2: CALENDAR & GEO-ROUTING */}', newStep + '              {/* STEP 2: CALENDAR & GEO-ROUTING */}');

fs.writeFileSync('src/app/page.tsx', text);
console.log('Update applied to BookingModal setup');
