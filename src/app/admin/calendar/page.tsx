import { createClient } from '@/lib/supabase/server'
import MasterCalendarClient from './MasterCalendarClient'

export default async function AdminCalendarPage() {
  const supabase = await createClient()

  // Fetch all jobs
  const { data: jobsResponse } = await supabase
    .from('jobs')
    .select(`*`)
    .order('date', { ascending: true })
    .order('time_slot', { ascending: true })
  
  const jobs = jobsResponse || []

  // Fetch all staff logic for override
  const { data: staffResponse } = await supabase
    .from('profiles')
    .select('*')
    .order('first_name', { ascending: true })

  const staff = staffResponse || []

  return (
    <div className="p-8 max-w-7xl mx-auto relative z-10 w-full transition-colors duration-300">
        <MasterCalendarClient initialJobs={jobs} staff={staff} />
    </div>
  )
}
