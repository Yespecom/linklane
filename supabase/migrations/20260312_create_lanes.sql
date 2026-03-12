-- Create the lanes table
CREATE TABLE public.lanes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create lane comments table
CREATE TABLE public.lane_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lane_id UUID REFERENCES public.lanes(id) ON DELETE CASCADE NOT NULL,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create lane interactions table
CREATE TABLE public.lane_interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lane_id UUID REFERENCES public.lanes(id) ON DELETE CASCADE NOT NULL,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('like', 'bookmark')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(lane_id, profile_id, type)
);

-- Enable RLS
ALTER TABLE public.lanes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lane_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lane_interactions ENABLE ROW LEVEL SECURITY;

-- Lanes Policies
CREATE POLICY "Anyone can view lanes" ON public.lanes FOR SELECT USING (true);

CREATE POLICY "Users can insert own lanes" ON public.lanes FOR INSERT WITH CHECK (
    profile_id IN (
        SELECT id FROM public.profiles 
        WHERE user_id = auth.uid() OR id = auth.uid()
    )
);

CREATE POLICY "Users can update own lanes" ON public.lanes FOR UPDATE USING (
    profile_id IN (
        SELECT id FROM public.profiles 
        WHERE user_id = auth.uid() OR id = auth.uid()
    )
);

CREATE POLICY "Users can delete own lanes" ON public.lanes FOR DELETE USING (
    profile_id IN (
        SELECT id FROM public.profiles 
        WHERE user_id = auth.uid() OR id = auth.uid()
    )
);

-- Lane Comments Policies
CREATE POLICY "Anyone can view lane comments" ON public.lane_comments FOR SELECT USING (true);

CREATE POLICY "Users can insert own comments" ON public.lane_comments FOR INSERT WITH CHECK (
    profile_id IN (
        SELECT id FROM public.profiles 
        WHERE user_id = auth.uid() OR id = auth.uid()
    )
);

CREATE POLICY "Users can update own comments" ON public.lane_comments FOR UPDATE USING (
    profile_id IN (
        SELECT id FROM public.profiles 
        WHERE user_id = auth.uid() OR id = auth.uid()
    )
);

CREATE POLICY "Users can delete own comments" ON public.lane_comments FOR DELETE USING (
    profile_id IN (
        SELECT id FROM public.profiles 
        WHERE user_id = auth.uid() OR id = auth.uid()
    )
);

-- Lane Interactions Policies
CREATE POLICY "Anyone can view lane interactions" ON public.lane_interactions FOR SELECT USING (true);

CREATE POLICY "Users can insert own interactions" ON public.lane_interactions FOR INSERT WITH CHECK (
    profile_id IN (
        SELECT id FROM public.profiles 
        WHERE user_id = auth.uid() OR id = auth.uid()
    )
);

CREATE POLICY "Users can delete own interactions" ON public.lane_interactions FOR DELETE USING (
    profile_id IN (
        SELECT id FROM public.profiles 
        WHERE user_id = auth.uid() OR id = auth.uid()
    )
);

-- Trigger to ensure user_id is always populated for profiles
CREATE OR REPLACE FUNCTION public.handle_profile_user_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.user_id IS NULL THEN
        NEW.user_id := NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_handle_profile_user_id ON public.profiles;
CREATE TRIGGER tr_handle_profile_user_id
BEFORE INSERT OR UPDATE OF user_id ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.handle_profile_user_id();

-- Backfill existing profiles
UPDATE public.profiles SET user_id = id WHERE user_id IS NULL;
