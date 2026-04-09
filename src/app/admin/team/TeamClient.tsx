"use client";

import { useState } from 'react';
import { UserPlus, MoreVertical, Shield, ShieldCheck, X, Save, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TeamClient({ initialTeam }: { initialTeam: any[] }) {
  const [team, setTeam] = useState(initialTeam);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isRecruiting, setIsRecruiting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleEditClick = (member: any) => {
    setEditingMember({ ...member, postcode_radius: member.postcode_radius ? member.postcode_radius.join(', ') : '' });
  };

  const handleSave = async () => {
    if (!editingMember) return;
    setIsSaving(true);
    
    // Convert string of postcodes back to array
    const radiusArray = editingMember.postcode_radius
      .split(',')
      .map((r: string) => r.trim().toUpperCase())
      .filter((r: string) => r.length > 0);

    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingMember.id,
          role: editingMember.role,
          postcode_radius: radiusArray,
          base_split_percentage: editingMember.base_split_percentage || 50
        }),
      });

      if (res.ok) {
        // Update local state optimistic
        setTeam(team.map(m => m.id === editingMember.id ? { ...m, role: editingMember.role, postcode_radius: radiusArray } : m));
        setEditingMember(null);
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <header className="mb-10 flex justify-between items-end">
         <div>
             <h1 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white mb-2 transition-colors">Team <span className="text-cyan-600 dark:text-cyan-500">Roster</span></h1>
             <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium transition-colors">Manage deployment radius and access levels.</p>
         </div>
         <button onClick={() => setIsRecruiting(true)} className="bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-cyan-400 text-white dark:text-black px-6 py-3 rounded-lg font-black uppercase text-sm tracking-widest transition-colors flex items-center gap-2">
            <UserPlus size={18} />
            Recruit Staff
         </button>
      </header>

      <div className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm dark:shadow-none transition-colors">
         <table className="w-full text-left">
           <thead className="bg-neutral-50 dark:bg-black/40 border-b border-neutral-200 dark:border-white/10 transition-colors">
              <tr>
                 <th className="p-5 text-xs font-bold uppercase tracking-widest text-neutral-500">Operator</th>
                 <th className="p-5 text-xs font-bold uppercase tracking-widest text-neutral-500">Role</th>
                 <th className="p-5 text-xs font-bold uppercase tracking-widest text-neutral-500">Operational Radius</th>
                 <th className="p-5 text-xs font-bold uppercase tracking-widest text-neutral-500">Status</th>
                 <th className="p-5"></th>
              </tr>
           </thead>
           <tbody className="divide-y divide-neutral-100 dark:divide-white/5 transition-colors">
              {team.length === 0 && (
                  <tr>
                      <td colSpan={5} className="p-10 text-center text-neutral-400 dark:text-neutral-500 text-sm font-bold uppercase tracking-widest">
                          No personnel records found.
                      </td>
                  </tr>
              )}
              {team.map((member: any) => (
                 <tr key={member.id} className="hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors group">
                    <td className="p-5">
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors
                            ${member.role === 'owner' ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30' : 'bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-white border border-neutral-200 dark:border-white/20'}`}>
                             {member.first_name ? member.first_name.charAt(0) : '?'}
                          </div>
                          <div>
                             <p className="text-neutral-900 dark:text-white font-bold text-sm transition-colors">{member.first_name} {member.last_name}</p>
                             <p className="text-neutral-500 text-xs">{member.id.substring(0, 8)}...</p>
                          </div>
                       </div>
                    </td>
                    <td className="p-5">
                       <div className="flex items-center gap-2">
                          {member.role === 'owner' ? <ShieldCheck size={14} className="text-cyan-600 dark:text-cyan-500" /> : <Shield size={14} className="text-neutral-400 dark:text-neutral-500" />}
                          <span className={`text-xs font-bold tracking-widest uppercase transition-colors ${member.role === 'owner' ? 'text-cyan-600 dark:text-cyan-400' : 'text-neutral-500 dark:text-neutral-400'}`}>
                            {member.role}
                          </span>
                       </div>
                    </td>
                    <td className="p-5">
                       <div className="flex gap-2 flex-wrap">
                          {member.postcode_radius && member.postcode_radius.map((rad: string) => (
                             <span key={rad} className="px-2 py-1 rounded bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-neutral-300 text-[10px] font-bold tracking-widest border border-neutral-200 dark:border-white/10 transition-colors">
                                {rad}
                             </span>
                          ))}
                          {(!member.postcode_radius || member.postcode_radius.length === 0) && (
                             <span className="text-neutral-400 dark:text-neutral-600 text-[10px] font-bold uppercase tracking-widest transition-colors">Unassigned</span>
                          )}
                       </div>
                    </td>
                    <td className="p-5">
                       <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-emerald-500 animate-pulse`} />
                          <span className="text-neutral-500 dark:text-neutral-400 text-xs font-bold tracking-wider transition-colors">Active</span>
                       </div>
                    </td>
                    <td className="p-5 text-right">
                       <button onClick={() => handleEditClick(member)} className="p-2 hover:bg-neutral-200 dark:hover:bg-white/10 rounded-lg transition-colors text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white border-2 border-transparent">
                          Edit <MoreVertical size={16} className="inline ml-1" />
                       </button>
                    </td>
                 </tr>
              ))}
           </tbody>
         </table>
      </div>

      {/* Editing Modal */}
      {editingMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-white/10 w-full max-w-lg shadow-2xl p-6">
                  <div className="flex justify-between items-start mb-6">
                      <div>
                          <h2 className="text-xl font-black text-neutral-900 dark:text-white uppercase">Edit Operator</h2>
                          <p className="text-neutral-500 text-sm">Update privileges and operational radius for {editingMember.first_name}</p>
                      </div>
                      <button onClick={() => setEditingMember(null)} className="text-neutral-400 hover:text-white transition-colors">
                          <X size={20} />
                      </button>
                  </div>

                  <div className="space-y-4">
                      <div>
                          <label className="text-xs font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2 block">Role Level</label>
                          <select 
                            value={editingMember.role}
                            onChange={(e) => setEditingMember({...editingMember, role: e.target.value})}
                            className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-3 text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors uppercase tracking-widest text-sm"
                          >
                              <option value="freelancer">Freelancer</option>
                              <option value="owner">Owner / Admin</option>
                          </select>
                      </div>

                      <div>
                          <label className="text-xs font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2 block">Operational Radius (Postcodes)</label>
                          <input 
                            type="text" 
                            value={editingMember.postcode_radius}
                            onChange={(e) => setEditingMember({...editingMember, postcode_radius: e.target.value.toUpperCase()})}
                            className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-3 text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors uppercase tracking-widest text-sm"
                            placeholder="e.g. LS, HG, S1, ALL"
                          />
                          <p className="text-neutral-500 text-[10px] uppercase font-bold tracking-widest mt-2">Comma separated prefixes (e.g. LS, HG). Use "ALL" for no limits.</p>
                      </div>

                      <div className="pt-4 border-t border-neutral-200 dark:border-white/10 mt-4">
                          <label className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2 flex justify-between">
                            <span>Fractional Wage Cut</span>
                            <span className="text-white text-sm font-black">{editingMember.base_split_percentage || 50}%</span>
                          </label>
                          <input 
                            type="range" 
                            min="10" max="90" step="5"
                            value={editingMember.base_split_percentage || 50}
                            onChange={(e) => setEditingMember({...editingMember, base_split_percentage: parseInt(e.target.value)})}
                            className="w-full accent-emerald-500 h-2 bg-neutral-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer mt-2"
                          />
                          <p className="text-neutral-500 text-[10px] uppercase font-bold tracking-widest mt-2">The exact algorithmic percentage this operative receives per completed job. Applies automatically.</p>
                      </div>
                  </div>

                  <div className="mt-8 flex justify-end gap-3">
                      <button onClick={() => setEditingMember(null)} className="px-5 py-2.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white text-sm font-bold uppercase tracking-wider transition-colors">
                          Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-cyan-400 text-white dark:text-black px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-black uppercase tracking-wider transition-all disabled:opacity-50"
                      >
                          {isSaving ? <Search className="animate-spin" size={16} /> : <Save size={16} />}
                          Confirm Update
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Recruiting Modal */}
      {isRecruiting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-white/10 w-full max-w-lg shadow-2xl p-6">
                  <div className="flex justify-between items-start mb-6">
                      <div>
                          <h2 className="text-xl font-black text-neutral-900 dark:text-white uppercase transition-colors">Onboard Operator</h2>
                          <p className="text-neutral-500 text-sm">Create a new secure authentication link for personnel.</p>
                      </div>
                      <button onClick={() => setIsRecruiting(false)} className="text-neutral-400 hover:text-white transition-colors">
                          <X size={20} />
                      </button>
                  </div>

                  <form onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSaving(true);
                      const fd = new FormData(e.currentTarget);
                      try {
                          const res = await fetch('/api/admin/recruit', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                  email: fd.get('email'),
                                  firstName: fd.get('firstName'),
                                  lastName: fd.get('lastName'),
                                  role: fd.get('role')
                              })
                          });
                          if(res.ok) {
                              setIsRecruiting(false);
                              router.refresh();
                          }
                      } finally {
                          setIsSaving(false);
                      }
                  }} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="text-xs font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2 block">First Name</label>
                              <input name="firstName" required className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500" placeholder="John" />
                          </div>
                          <div>
                              <label className="text-xs font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2 block">Last Name</label>
                              <input name="lastName" className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500" placeholder="Doe" />
                          </div>
                      </div>
                      <div>
                          <label className="text-xs font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2 block">Secure Contact Email</label>
                          <input type="email" name="email" required className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500" placeholder="john@detailinglab.co.uk" />
                      </div>
                      <div>
                          <label className="text-xs font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2 block">Role Level</label>
                          <select name="role" className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500 uppercase tracking-widest font-bold">
                              <option value="freelancer">Freelancer</option>
                              <option value="owner">Owner / Admin</option>
                          </select>
                      </div>

                      <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-white/10">
                          <button type="button" onClick={() => setIsRecruiting(false)} className="px-5 py-2.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white text-sm font-bold uppercase tracking-wider transition-colors">
                              Cancel
                          </button>
                          <button type="submit" disabled={isSaving} className="bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-cyan-400 text-white dark:text-black px-6 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all disabled:opacity-50">
                              Generate Secure Auth
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </>
  );
}
