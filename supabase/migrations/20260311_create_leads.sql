-- Create the leads table
CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL, -- e.g., 'view', 'click_link', 'click_service', 'click_product', 'call', 'email'
  target text, -- e.g., 'Profile Page', 'Instagram', 'Consulting Call'
  session_key text NOT NULL, -- To deduplicate (1 per session per target)
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public/anon) to insert a lead
CREATE POLICY "Anyone can insert leads" ON leads FOR INSERT WITH CHECK (true);

-- Allow profile owners to view their own leads
CREATE POLICY "Users can view own leads" ON leads FOR SELECT USING (
  profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);
