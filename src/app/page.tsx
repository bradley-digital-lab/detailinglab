import { createClient } from '@/lib/supabase/server';
import ClientPage from './ClientPage';
import { PasswordGate } from '@/components/PasswordGate';

export const revalidate = 0; // Force dynamic to pick up DB changes instantly for this page

export default async function Page() {
  const supabase = await createClient();

  // Fetch active packages
  const { data: packagesData } = await supabase
    .from('packages')
    .select('*')
    .eq('active', true)
    .order('order_index');

  // Fetch settings
  const { data: settingsData } = await supabase
    .from('system_settings')
    .select('*');

  // Format packages to map safely to the frontend array formats
  const dbPackages = packagesData || [];
  const serverPaintTiers = dbPackages
    .filter(p => p.type === 'exterior')
    .map(p => ({ id: p.id, label: p.label, price: Number(p.price), desc: p.description }));
    
  let serverInterior = dbPackages.find(p => p.id === 'interior');
  if (serverInterior) {
    serverInterior = { id: serverInterior.id, label: serverInterior.label, price: Number(serverInterior.price), desc: serverInterior.description };
  }

  const isBookingsPaused = settingsData?.find(s => s.key === 'bookings_paused')?.value === 'true' || settingsData?.find(s => s.key === 'bookings_paused')?.value === true;
  
  const operationStartTime = settingsData?.find(s => s.key === 'operation_start_time')?.value || '09:00';
  const operationEndTime = settingsData?.find(s => s.key === 'operation_end_time')?.value || '18:00';
  const slotIntervalMinutes = parseInt(settingsData?.find(s => s.key === 'slot_interval_minutes')?.value || '120');

  return (
    <PasswordGate>
      <ClientPage 
        serverPackages={serverPaintTiers.length > 0 ? serverPaintTiers : null}
        serverInterior={serverInterior || null}
        serverBookingsPaused={isBookingsPaused}
        operationStartTime={operationStartTime}
        operationEndTime={operationEndTime}
        slotIntervalMinutes={slotIntervalMinutes}
      />
    </PasswordGate>
  );
}
