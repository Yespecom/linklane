-- Add user_id to profiles to support multiple lanes per account
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Backfill user_id with the current id (which is the user's UID)
UPDATE public.profiles 
SET user_id = id 
WHERE user_id IS NULL;

-- Update RLS to check for user_id instead of id where appropriate
-- For profiles, the owner is determined by user_id
DROP POLICY IF EXISTS "Allow users to update own profile" ON public.profiles;
CREATE POLICY "Allow users to update own profile" ON public.profiles
FOR UPDATE USING (
    auth.uid() = user_id
);

DROP POLICY IF EXISTS "Allow users to insert own profile" ON public.profiles;
CREATE POLICY "Allow users to insert own profile" ON public.profiles
FOR INSERT WITH CHECK (
    auth.uid() = user_id
);
