-- Refine Lanes RLS policies to be more robust and handle potential user_id issues
DROP POLICY IF EXISTS "Users can insert own lanes" ON public.lanes;
DROP POLICY IF EXISTS "Users can update own lanes" ON public.lanes;
DROP POLICY IF EXISTS "Users can delete own lanes" ON public.lanes;

-- Direct check policy for insertion
CREATE POLICY "Users can insert own lanes" ON public.lanes 
FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = lanes.profile_id 
        AND (profiles.user_id = auth.uid() OR profiles.id = auth.uid())
    )
);

-- Direct check policy for updates
CREATE POLICY "Users can update own lanes" ON public.lanes 
FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = lanes.profile_id 
        AND (profiles.user_id = auth.uid() OR profiles.id = auth.uid())
    )
);

-- Direct check policy for deletions
CREATE POLICY "Users can delete own lanes" ON public.lanes 
FOR DELETE USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = lanes.profile_id 
        AND (profiles.user_id = auth.uid() OR profiles.id = auth.uid())
    )
);

-- Also ensure user_id is set for the current user just in case
UPDATE public.profiles 
SET user_id = id 
WHERE user_id IS NULL AND id = auth.uid();
