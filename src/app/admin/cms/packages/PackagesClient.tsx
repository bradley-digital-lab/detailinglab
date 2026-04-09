'use client';

import React, { useState } from 'react';
import { updatePackage } from './actions';
import { Edit2, Check, Loader2 } from 'lucide-react';

interface Package {
  id: string;
  label: string;
  price: number;
  description: string;
  type: string;
  order_index: number;
  active: boolean;
}

export function PackagesClient({ initialPackages }: { initialPackages: Package[] }) {
  const [packages, setPackages] = useState(initialPackages);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Package>>({});
  const [loading, setLoading] = useState(false);

  const handleEdit = (pkg: Package) => {
    setEditingId(pkg.id);
    setEditForm(pkg);
  };

  const handleSave = async (id: string) => {
    setLoading(true);
    const result = await updatePackage(id, editForm);
    
    if (result.success) {
      setPackages(prev => prev.map(p => p.id === id ? { ...p, ...editForm } : p));
      setEditingId(null);
    } else {
      alert("Error saving package: " + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {packages.map((pkg) => (
        <div key={pkg.id} className="p-6 rounded-2xl border bg-white dark:bg-white/5 border-neutral-200 dark:border-white/10 flex flex-col gap-4 shadow-sm dark:shadow-none transition-colors">
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              
              {editingId === pkg.id ? (
                // EDIT MODE
                <div className="space-y-4 max-w-2xl">
                  <div>
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-1">Label</label>
                    <input 
                      type="text" 
                      value={editForm.label || ''} 
                      onChange={e => setEditForm({ ...editForm, label: e.target.value })}
                      className="w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-lg px-4 py-2 text-neutral-900 dark:text-white outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-1/3">
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-1">Base Price (£)</label>
                      <input 
                        type="number" 
                        value={editForm.price || ''} 
                        onChange={e => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                        className="w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-lg px-4 py-2 text-neutral-900 dark:text-white font-mono outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-1">Description (Frontend Tooltip)</label>
                    <textarea 
                      value={editForm.description || ''} 
                      onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                      rows={3}
                      className="w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-lg px-4 py-2 text-neutral-900 dark:text-white outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  
                  <button 
                    onClick={() => handleSave(pkg.id)}
                    disabled={loading}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
                  >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
                    Save Changes
                  </button>
                </div>
              ) : (
                // VIEW MODE
                <>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tight transition-colors">{pkg.label}</h3>
                    <span className="font-mono text-cyan-700 dark:text-cyan-400 font-bold bg-cyan-100 dark:bg-cyan-500/10 px-3 py-1 rounded-md text-sm border border-cyan-200 dark:border-cyan-500/20 transition-colors">
                      £{pkg.price}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest border border-neutral-200 dark:border-white/10 px-2 py-0.5 rounded-full transition-colors">
                      {pkg.type}
                    </span>
                  </div>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-3xl leading-relaxed transition-colors">
                    {pkg.description}
                  </p>
                </>
              )}
            </div>

            {/* Edit Button (only show if not editing) */}
            {editingId !== pkg.id && (
              <button 
                onClick={() => handleEdit(pkg)}
                className="w-10 h-10 rounded-lg bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors flex items-center justify-center shrink-0"
              >
                <Edit2 size={16} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
