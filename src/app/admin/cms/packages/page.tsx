import { createClient } from '@/lib/supabase/server';
import { PackagesClient } from './PackagesClient';
import { Package } from 'lucide-react';

export default async function PackagesPage() {
  const supabase = await createClient();

  const { data: packages, error } = await supabase
    .from('packages')
    .select('*')
    .order('order_index');

  if (error || !packages) {
    return <div className="p-8 text-red-500">Failed to load packages. {error?.message}</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto transition-colors duration-300">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter mb-2 flex items-center gap-3 transition-colors">
          <Package className="text-cyan-600 dark:text-cyan-400" size={32} />
          Services & Pricing
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium max-w-2xl transition-colors">
          Modify the frontend pricing algorithm natively. Changes here bypass code deployment and instantly propagate to the live Booking Flow.
        </p>
      </header>
      
      <PackagesClient initialPackages={packages} />
    </div>
  );
}
