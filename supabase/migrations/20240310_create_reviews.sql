-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    company TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow public to insert reviews
CREATE POLICY "Allow public to insert reviews" ON public.reviews
FOR INSERT WITH CHECK (true);

-- Allow profile owners to manage their reviews
CREATE POLICY "Allow owners to manage reviews" ON public.reviews
FOR ALL USING (
    auth.uid() = profile_id
);

-- Allow public to view approved reviews
CREATE POLICY "Allow public to view approved reviews" ON public.reviews
FOR SELECT USING (
    status = 'approved'
);
