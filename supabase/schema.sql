-- Supabase Schema for Portfolio Contact Form
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create contact_submissions table
create table if not exists public.contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  company text,
  project text,
  message text,
  created_at timestamptz not null default now(),
  ip_hash text,
  user_agent text
);

-- Create index for common queries
create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_email_idx
  on public.contact_submissions (email);

-- Enable Row Level Security
alter table public.contact_submissions enable row level security;

-- Policy: Allow anonymous inserts (for contact form submissions)
-- This allows the API route to insert using the service role key
-- while preventing direct browser access to the table
create policy "Allow insert from service role only"
  on public.contact_submissions
  for insert
  to authenticated, anon
  with check (false); -- Block direct inserts from browser

-- Policy: Allow service role full access (used by API route)
create policy "Service role full access"
  on public.contact_submissions
  for all
  to service_role
  using (true)
  with check (true);

-- Policy: Allow authenticated users to read their own submissions (optional, for future admin panel)
-- create policy "Users can view own submissions"
--   on public.contact_submissions
--   for select
--   to authenticated
--   using (auth.uid()::text = ip_hash); -- Would need auth integration

-- Function to automatically hash IP for basic privacy
create or replace function hash_ip(ip text) returns text
language plpgsql
security definer
as $$
begin
  return encode(digest(ip || current_setting('app.contact_salt', true), 'sha256'), 'hex');
end;
$$;

-- Note: For production, consider adding:
-- 1. Rate limiting via Supabase Edge Functions or middleware
-- 2. Honeypot field validation
-- 3. reCAPTCHA / Turnstile integration
-- 4. Automated spam detection