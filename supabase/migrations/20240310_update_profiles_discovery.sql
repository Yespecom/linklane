-- Add business discovery fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS rating NUMERIC(3,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

-- Function to update profile rating stats
CREATE OR REPLACE FUNCTION update_profile_rating_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') AND NEW.status = 'approved' THEN
        UPDATE public.profiles
        SET 
            rating = (SELECT COALESCE(AVG(rating), 0) FROM public.reviews WHERE profile_id = NEW.profile_id AND status = 'approved'),
            review_count = (SELECT COUNT(*) FROM public.reviews WHERE profile_id = NEW.profile_id AND status = 'approved')
        WHERE id = NEW.profile_id;
    ELSIF (TG_OP = 'DELETE' OR TG_OP = 'UPDATE') THEN
        UPDATE public.profiles
        SET 
            rating = (SELECT COALESCE(AVG(rating), 0) FROM public.reviews WHERE profile_id = OLD.profile_id AND status = 'approved'),
            review_count = (SELECT COUNT(*) FROM public.reviews WHERE profile_id = OLD.profile_id AND status = 'approved')
        WHERE id = OLD.profile_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for rating updates
DROP TRIGGER IF EXISTS tr_update_profile_rating ON public.reviews;
CREATE TRIGGER tr_update_profile_rating
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION update_profile_rating_stats();
