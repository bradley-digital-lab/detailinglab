const postgres = require('postgres');

// Connection to Supabase utilizing pgBouncer port 6543
const sql = postgres('postgresql://postgres.xiotrkdenhkmcjhtzusi:DetailingLab2026%21@aws-0-eu-west-2.pooler.supabase.com:6543/postgres');

async function migrate() {
  try {
    console.log('1. Creating system_settings and packages tables...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS public.system_settings (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL,
        description TEXT,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS public.packages (
        id TEXT PRIMARY KEY,
        label TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description TEXT,
        type TEXT NOT NULL,
        order_index INTEGER DEFAULT 0,
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `;

    console.log('2. Enabling RLS and setting policies...');
    
    // RLS Setup
    await sql`ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;`;
    await sql`ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;`;
    
    // system_settings policies
    await sql`
      DO $$ BEGIN
        CREATE POLICY "Owner fully manages settings" ON public.system_settings FOR ALL 
        USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'owner'));
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;
    
    await sql`
      DO $$ BEGIN
        CREATE POLICY "Public can read settings" ON public.system_settings FOR SELECT USING (true);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;

    // packages policies
    await sql`
      DO $$ BEGIN
        CREATE POLICY "Owner fully manages packages" ON public.packages FOR ALL 
        USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'owner'));
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;
    
    await sql`
      DO $$ BEGIN
        CREATE POLICY "Public can read active packages" ON public.packages FOR SELECT USING (active = true);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;

    console.log('3. Seeding data...');
    
    // Seed Settings
    await sql`
      INSERT INTO public.system_settings (key, value, description)
      VALUES 
        ('bookings_paused', 'false'::jsonb, 'Global kill-switch to prevent new bookings.'),
        ('auto_assign', 'false'::jsonb, 'If true, instantly assign freelancers. If false, jobs require manual review.'),
        ('max_dispatch_radius_miles', '40'::jsonb, 'Absolute maximum distance to consider for dispatch.')
      ON CONFLICT (key) DO NOTHING;
    `;
    
    // Seed Packages (From PricingEstimator constants)
    await sql`
      INSERT INTO public.packages (id, label, price, description, type, order_index)
      VALUES 
        ('enhance', 'Gloss Enhancement', 250, 'Single-stage machine polish to remove light swirling and restore gloss. Includes 6-month sealant protection.', 'exterior', 1),
        ('correct', 'Paint Correction', 300, 'Two-stage compound and polish removing 85%+ of swirls, scratches, and holograms. Finished with 1-year ceramic sealant.', 'exterior', 2),
        ('ceramic', 'Correction + Ceramic', 500, 'Full multi-stage paint correction locked in with professional 9H ceramic coating. 3-5 year protection with hydrophobic finish.', 'exterior', 3),
        ('interior', 'Interior Reset', 95, 'Full interior extraction with thermal steam sterilisation. Leather conditioning, Alcantara restoration, and plastics revived to delivery-day spec.', 'addon', 4)
      ON CONFLICT (id) DO UPDATE SET 
        label = excluded.label,
        price = excluded.price,
        description = excluded.description;
    `;

    console.log('Migration complete.');
    
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await sql.end();
  }
}

migrate();
