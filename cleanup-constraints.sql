-- Clean up existing constraints before running the fixed setup
-- Run this FIRST in your Supabase SQL Editor

-- Step 1: Drop the existing check constraint that's causing the error
ALTER TABLE public.public_user_data 
DROP CONSTRAINT IF EXISTS check_profile_complete;

-- Step 2: Verify the constraint is gone
-- You can check with: \d public.public_user_data

-- Step 3: Now you can run the supabase-dashboard-fixed.sql script
