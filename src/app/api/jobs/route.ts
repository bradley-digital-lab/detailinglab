import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    const { 
       action, // 'check' or 'dispatch'
       customer_name, 
       customer_email, 
       customer_phone, 
       customer_postcode, 
       package_id, 
       vehicle_make, 
       vehicle_model, 
       date,
       time_slot
    } = body;

    if (!customer_postcode || !date || !action || (action === 'dispatch' && !time_slot)) {
        return NextResponse.json({ error: 'Missing core routing fields' }, { status: 400 });
    }

    // 0. Fetch Platform Settings
    const { data: settingsData } = await supabase.from('system_settings').select('*');
    const isBookingsPaused = settingsData?.find(s => s.key === 'bookings_paused')?.value === 'true' || settingsData?.find(s => s.key === 'bookings_paused')?.value === true;
    const isAutoAssign = settingsData?.find(s => s.key === 'auto_assign')?.value === 'true' || settingsData?.find(s => s.key === 'auto_assign')?.value === true;

    if (isBookingsPaused) {
        return NextResponse.json({ error: 'Bookings are globally paused at this time.' }, { status: 403 });
    }

    // Extract prefix (e.g. LS1 4AB -> LS)
    const prefixMatch = customer_postcode.match(/^[A-Z]{1,2}/i);
    const prefix = prefixMatch ? prefixMatch[0].toUpperCase() : 'UNKNOWN';

    // 1. Routing Algorithm: Find an eligible, active freelancer covering this radius
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id, postcode_radius, first_name, last_name')
      .or('role.eq.freelancer,role.eq.owner') 

    if (profileError) {
        return NextResponse.json({ error: 'Database error while routing.' }, { status: 500 });
    }

    const eligibleFreelancers = profiles?.filter(p => 
        p.postcode_radius && (p.postcode_radius.includes('ALL') || p.postcode_radius.includes(prefix))
    ) || [];

    let assignedFreelancer = null;

    if (eligibleFreelancers.length > 0) {
        // Availability Check
        const { data: availabilities } = await supabase
           .from('availabilities')
           .select('freelancer_id, status')
           .in('freelancer_id', eligibleFreelancers.map(f => f.id))
           .eq('date', date)

        const blockedIds = (availabilities || [])
            .filter(a => a.status === 'blocked' || a.status === 'booked')
            .map(a => a.freelancer_id);
            
        const availableFreelancers = eligibleFreelancers.filter(f => !blockedIds.includes(f.id));

        if (availableFreelancers.length > 0) {
            assignedFreelancer = availableFreelancers[0];
        }
    }

    // If just checking, return the matched detailer info
    if (action === 'check') {
        if (assignedFreelancer) {
            return NextResponse.json({ 
                success: true, 
                detailer: { name: `${assignedFreelancer.first_name} ${assignedFreelancer.last_name || ''}`.trim() } 
            });
        }
        return NextResponse.json({ success: false, detailer: null });
    }

    // If dispatching, do the insert
    if (action === 'dispatch') {
        const revenueMap: Record<string, number> = {
            'interior_reset': 180,
            'correction_ceramic': 850,
            'clear_coat': 1200
        };
        const revenue_estimate = revenueMap[package_id] || 0;

        const { data: job, error: insertError } = await supabase
          .from('jobs')
          .insert({
              customer_name: customer_name || 'Pending Details',
              customer_email: customer_email || '',
              customer_phone: customer_phone || '',
              customer_postcode,
              package_id,
              vehicle_make: vehicle_make || '',
              vehicle_model: vehicle_model || '',
              date,
              time_slot,
              assigned_freelancer_id: assignedFreelancer ? assignedFreelancer.id : null,
              status: 'pending_admin_approval',
              revenue_estimate
          })
          .select()
          .single();

        if (insertError) {
            return NextResponse.json({ error: 'Failed to create job.' }, { status: 500 });
        }

        if (assignedFreelancer) {
            // Lock slot
            const { error: lockError } = await supabase.rpc('secure_slot', {
                p_freelancer_id: assignedFreelancer.id,
                p_date: date
            });

            if (lockError) {
                await supabase.from('availabilities').upsert({
                    freelancer_id: assignedFreelancer.id,
                    date: date,
                    status: 'booked'
                }, { onConflict: 'freelancer_id, date' })
            }
        }

        return NextResponse.json({ success: true, job, autoAssigned: !!assignedFreelancer });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
