-- ==============================================================================
-- Supabase Schema for AI Automation Portfolio
-- Project Inquiries & Call Bookings Tables
-- Run this in your Supabase Project -> SQL Editor
-- ==============================================================================

-- 1. Create Inquiries Table (For Contact Form Submissions)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  budget TEXT,
  requirements TEXT NOT NULL,
  contact_method TEXT DEFAULT 'Email',
  source TEXT DEFAULT 'portfolio_contact_form',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Call Bookings Table (For Cal.com Scheduled Discovery Calls)
CREATE TABLE IF NOT EXISTS public.call_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid TEXT,
  name TEXT,
  email TEXT,
  cal_link TEXT NOT NULL,
  source TEXT DEFAULT 'portfolio_discovery_call_button',
  status TEXT DEFAULT 'initiated',
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  title TEXT DEFAULT 'Discovery Call (20 min)',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure upgrade columns exist if the table was created previously
ALTER TABLE public.call_bookings ADD COLUMN IF NOT EXISTS uid TEXT;
ALTER TABLE public.call_bookings ADD COLUMN IF NOT EXISTS start_time TIMESTAMPTZ;
ALTER TABLE public.call_bookings ADD COLUMN IF NOT EXISTS end_time TIMESTAMPTZ;
ALTER TABLE public.call_bookings ADD COLUMN IF NOT EXISTS title TEXT;

-- 3. Enable Row Level Security (RLS) on both tables for security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_bookings ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies allowing public website visitors to INSERT new inquiries
DROP POLICY IF EXISTS "Allow anonymous website visitor insert on inquiries" ON public.inquiries;
CREATE POLICY "Allow anonymous website visitor insert on inquiries" 
  ON public.inquiries 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- 5. Create RLS Policies allowing public website visitors to INSERT call bookings
DROP POLICY IF EXISTS "Allow anonymous website visitor insert on call_bookings" ON public.call_bookings;
CREATE POLICY "Allow anonymous website visitor insert on call_bookings" 
  ON public.call_bookings 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Note: SELECT, UPDATE, DELETE are restricted by default to service_role or authenticated owners,
-- keeping all prospective client contact information and PII private and secure!
