-- Detailing Lab Enterprise CRM Schema
-- Paste this entire file into the Supabase SQL Editor and hit "RUN"

-- 1. Create custom types
CREATE TYPE user_role AS ENUM ('owner', 'freelancer');
CREATE TYPE job_status AS ENUM ('pending', 'assigned', 'completed', 'cancelled');
CREATE TYPE availability_status AS ENUM ('available', 'booked', 'blocked');

-- 2. Create the Profiles table (extends Supabase Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role DEFAULT 'freelancer'::user_role NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  postcode_radius TEXT[], -- Array of postcodes they cover e.g. ['LS', 'HG', 'YO']
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can read their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Owners can see all profiles"
  ON public.profiles FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'owner'));

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', COALESCE((new.raw_user_meta_data->>'role')::user_role, 'freelancer'::user_role));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Create the Availability Table (Freelancers block out dates)
CREATE TABLE public.availabilities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  freelancer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  status availability_status DEFAULT 'available'::availability_status NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(freelancer_id, date) -- A freelancer can only have one status per day
);

ALTER TABLE public.availabilities ENABLE ROW LEVEL SECURITY;

-- Availability Policies
CREATE POLICY "Freelancers manage their own availability"
  ON public.availabilities FOR ALL
  USING (auth.uid() = freelancer_id);

CREATE POLICY "Owners manage all availability"
  ON public.availabilities FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'owner'));

CREATE POLICY "Public can read available dates for booking routing"
  ON public.availabilities FOR SELECT
  USING (status = 'available');

-- 4. Create the Jobs Table (Customer Bookings)
CREATE TABLE public.jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_postcode TEXT NOT NULL,
  package_id TEXT NOT NULL, -- e.g. "correction_ceramic"
  vehicle_make TEXT,
  vehicle_model TEXT,
  date DATE NOT NULL,
  assigned_freelancer_id UUID REFERENCES public.profiles(id),
  status job_status DEFAULT 'pending'::job_status NOT NULL,
  revenue_estimate DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Jobs Policies
CREATE POLICY "Freelancers can read their assigned jobs"
  ON public.jobs FOR SELECT
  USING (auth.uid() = assigned_freelancer_id);

CREATE POLICY "Owners can perform all actions on jobs"
  ON public.jobs FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'owner'));

CREATE POLICY "Public can insert new jobs (via booking form)"
  ON public.jobs FOR INSERT
  WITH CHECK (true); -- We will lock this down tighter via API route later if needed

-- 5. Build routing function to automatically secure slots upon booking
CREATE OR REPLACE FUNCTION secure_slot(p_freelancer_id UUID, p_date DATE)
RETURNS BOOLEAN AS $$
DECLARE
  v_changed INTEGER;
BEGIN
  UPDATE public.availabilities
  SET status = 'booked'
  WHERE freelancer_id = p_freelancer_id AND date = p_date AND status = 'available';
  
  GET DIAGNOSTICS v_changed = ROW_COUNT;
  
  RETURN v_changed > 0;
END;
$$ LANGUAGE plpgsql;
