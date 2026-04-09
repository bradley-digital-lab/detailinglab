'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updatePackage(id: string, updates: any) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('packages')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating package:', error);
    return { error: error.message };
  }

  // Revalidate the entire admin suite and root landing page to pull new pricing
  revalidatePath('/', 'layout'); 
  return { success: true };
}

export async function createPackage(data: any) {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('packages')
      .insert({ ...data, updated_at: new Date().toISOString() });
  
    if (error) {
      console.error('Error creating package:', error);
      return { error: error.message };
    }
  
    revalidatePath('/', 'layout'); 
    return { success: true };
  }
