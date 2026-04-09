import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Verify admin access (assuming logged in user has access, for demo)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: adminCheck } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!adminCheck || adminCheck.role !== 'owner') {
        return NextResponse.json({ error: 'Requires owner permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { id, role, postcode_radius } = body;

    if (!id || !role || !Array.isArray(postcode_radius)) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role, postcode_radius })
      .eq('id', id);

    if (updateError) {
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
