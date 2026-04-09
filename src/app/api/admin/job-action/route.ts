import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Auth bypass checks logic (you would do proper validation in prod)
    const { data: { user } } = await supabase.auth.getUser();

    const body = await request.json();
    const { jobId, action, freelancerId } = body;

    if (!jobId || !action) {
        return NextResponse.json({ error: 'Missing specific variables' }, { status: 400 });
    }

    let nextStatus = 'pending';
    if (action === 'approve') {
       nextStatus = 'assigned'; // When owner verifies OR when freelancer accepts assigned
    } else if (action === 'reject') {
       nextStatus = 'rejected';
    } else if (action === 'assign') {
       nextStatus = 'assigned';
    }

    const updatePayload: any = { status: nextStatus };
    if (action === 'assign' && freelancerId) {
        updatePayload.assigned_freelancer_id = freelancerId;
    } else if (action === 'reject') {
        updatePayload.assigned_freelancer_id = null;
        updatePayload.status = 'pending_admin_approval'; // goes back to admin if freelancer rejects
    }

    const { error: updateError } = await supabase
      .from('jobs')
      .update(updatePayload)
      .eq('id', jobId);

    if (updateError) {
        return NextResponse.json({ error: 'Database fault' }, { status: 500 });
    }

    return NextResponse.json({ success: true, newStatus: nextStatus });

  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
