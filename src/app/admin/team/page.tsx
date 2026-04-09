import { createClient } from '@/lib/supabase/server'
import TeamClient from './TeamClient';

export default async function TeamPage() {
  const supabase = await createClient()
  
  const { data: profilesResponse } = await supabase
    .from('profiles')
    .select('*')
    .order('role', { ascending: false }) // owner first
    .order('created_at', { ascending: false });

  const liveTeam = profilesResponse || [];

  return (
    <div className="p-8 max-w-6xl mx-auto relative z-10 w-full transition-colors duration-300">
        <TeamClient initialTeam={liveTeam} />
    </div>
  )
}
