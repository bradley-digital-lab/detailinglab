import { createClient } from '@/lib/supabase/server';
import { SettingsClient } from './SettingsClient';
import { Settings } from 'lucide-react';

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: settingsData, error } = await supabase
    .from('system_settings')
    .select('*')
    .order('key');

  if (error || !settingsData) {
    return <div className="p-8 text-red-500">Failed to load platform settings. {error?.message}</div>;
  }

  // Convert settings array into a key-value object and description map
  const settingsMap = settingsData.reduce((acc: any, row: any) => {
    acc[row.key] = { value: row.value, description: row.description };
    return acc;
  }, {});

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2 flex items-center gap-3">
          <Settings className="text-cyan-400" size={32} />
          Platform Settings
        </h1>
        <p className="text-neutral-400 font-medium">
          Global command center overrides. Instant propagation across all Edge nodes.
        </p>
      </header>
      
      <SettingsClient initialSettings={settingsMap} />
    </div>
  );
}
