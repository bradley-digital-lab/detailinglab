-- ======================================================================================
-- DETAILING LAB - FRACTIONAL WAGE SPLIT ENGINE (HOSTILE CALCULATION PROTOCOL)
-- ======================================================================================

-- 1. Create Staff Roles & Metric Preferences
CREATE TABLE IF NOT EXISTS public.staff_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role_type TEXT NOT NULL CHECK (role_type IN ('master_detailer', 'apprentice', 'contractor')),
    base_split_percentage NUMERIC(5,2) DEFAULT 50.00, -- e.g., 50% split of job revenue
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ALS Security Protocol for Staff Profiles
ALTER TABLE public.staff_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access" ON public.staff_profiles FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Staff view own" ON public.staff_profiles FOR SELECT USING (auth.uid() = id);

-- 2. Create Wage Metrics Table
-- This stores the algorithmic computation of a freelancer's exact cut per job
CREATE TABLE IF NOT EXISTS public.wage_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES public.staff_profiles(id) ON DELETE CASCADE,
    total_job_revenue NUMERIC(10,2) NOT NULL,
    split_percentage_applied NUMERIC(5,2) NOT NULL,
    calculated_payout NUMERIC(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'disputed')),
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.wage_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access" ON public.wage_metrics FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Staff view own wages" ON public.wage_metrics FOR SELECT USING (auth.uid() = staff_id);

-- 3. The Automation Trigger: Fractional Calculus
-- Automatically calculates and inserts a wage ledger entry when a job is marked 'COMPLETED'
CREATE OR REPLACE FUNCTION calculate_staff_payout()
RETURNS TRIGGER AS $$
DECLARE
    staff_split NUMERIC;
    job_value NUMERIC;
BEGIN
    -- Only trigger when status changes to 'COMPLETED'
    IF NEW.status = 'COMPLETED' AND OLD.status != 'COMPLETED' THEN
        -- Safely extract job value assuming it's stored in a `total_price` column on bookings
        job_value := NEW.total_price;
        
        -- Get the staff member's contracted percentage.
        -- If NEW.assigned_staff_id exists, fetch it.
        SELECT base_split_percentage INTO staff_split 
        FROM public.staff_profiles 
        WHERE id = NEW.assigned_staff_id;

        -- If staff exists, calculate and insert the ledger row.
        IF staff_split IS NOT NULL THEN
            INSERT INTO public.wage_metrics (
                job_id, staff_id, total_job_revenue, split_percentage_applied, calculated_payout
            ) VALUES (
                NEW.id,
                NEW.assigned_staff_id,
                job_value,
                staff_split,
                job_value * (staff_split / 100.0)
            );
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind the trigger to the bookings table
DROP TRIGGER IF EXISTS trigger_calculate_wage ON public.bookings;
CREATE TRIGGER trigger_calculate_wage
    AFTER UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION calculate_staff_payout();
