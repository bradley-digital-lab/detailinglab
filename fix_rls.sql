CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'owner'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop recursive policies
DROP POLICY IF EXISTS "Owners can see all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Owners manage all availability" ON public.availabilities;
DROP POLICY IF EXISTS "Owners can perform all actions on jobs" ON public.jobs;
DROP POLICY IF EXISTS "Allow owner to manage packages" ON public.packages;
DROP POLICY IF EXISTS "Allow owner to manage system_settings" ON public.system_settings;

-- Recreate with SECURITY DEFINER
CREATE POLICY "Owners can see all profiles"
    ON public.profiles FOR ALL
    USING (public.is_admin());

CREATE POLICY "Owners manage all availability"
    ON public.availabilities FOR ALL
    USING (public.is_admin());

CREATE POLICY "Owners can perform all actions on jobs"
    ON public.jobs FOR ALL
    USING (public.is_admin());

CREATE POLICY "Allow owner to manage packages"
    ON public.packages FOR ALL
    USING (public.is_admin());

CREATE POLICY "Allow owner to manage system_settings"
    ON public.system_settings FOR ALL
    USING (public.is_admin());
