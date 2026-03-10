-- Add SEO fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_description TEXT,
ADD COLUMN IF NOT EXISTS custom_keywords TEXT;
