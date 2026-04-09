'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSetting(key: string, value: any) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('system_settings')
    .update({ value, updated_at: new Date().toISOString() })
    .eq('key', key);

  if (error) {
    console.error('Error updating setting:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/settings');
  revalidatePath('/api/jobs'); // Flush job api caching if applicable
  return { success: true };
}
