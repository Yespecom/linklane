-- Add icon_url to links
ALTER TABLE public.links 
ADD COLUMN IF NOT EXISTS icon_url TEXT;
