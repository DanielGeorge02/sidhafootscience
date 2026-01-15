-- Create tables in public schema
CREATE TABLE IF NOT EXISTS public.email_captures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  offer_type text DEFAULT 'first_time',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_captures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public insert
CREATE POLICY "Allow public email capture insert"
  ON public.email_captures
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public contact submission insert"
  ON public.contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);
