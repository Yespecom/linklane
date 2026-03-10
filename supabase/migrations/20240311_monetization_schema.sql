-- Add monetization and verification fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'free', -- 'free', 'pro'
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS custom_domain TEXT;

-- Index for featured profiles to speed up discovery
CREATE INDEX IF NOT EXISTS idx_profiles_featured ON public.profiles(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_profiles_verified ON public.profiles(is_verified) WHERE is_verified = true;
