-- Run this in your Supabase SQL Editor
-- Complete setup for auto-creating user profiles with nullable required fields

-- Step 1: Make required fields nullable initially
ALTER TABLE public.public_user_data 
ALTER COLUMN first_name DROP NOT NULL,
ALTER COLUMN last_name DROP NOT NULL,
ALTER COLUMN school DROP NOT NULL,
ALTER COLUMN major DROP NOT NULL;

-- Step 2: Add completion check constraint
ALTER TABLE public.public_user_data 
ADD CONSTRAINT check_profile_complete 
CHECK (
  (first_name IS NOT NULL AND first_name != '') AND
  (last_name IS NOT NULL AND last_name != '') AND
  (school IS NOT NULL AND school != '') AND
  (major IS NOT NULL AND major != '')
);

-- Step 3: Create the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.public_user_data (
    user_id,
    first_name,
    last_name,
    profile_picture_url,
    gender,
    gender_other_specify,
    description,
    school,
    major,
    linkedin_url,
    introduction,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NULL,  -- first_name (NULL initially)
    NULL,  -- last_name (NULL initially)
    NULL,  -- profile_picture_url
    'M',   -- default gender
    NULL,  -- gender_other_specify
    NULL,  -- description
    NULL,  -- school (NULL initially)
    NULL,  -- major (NULL initially)
    NULL,  -- linkedin_url
    NULL,  -- introduction
    NOW(),
    NOW()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4: Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 5: Create helper function for profile completion checking
CREATE OR REPLACE FUNCTION public.is_profile_complete(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  profile_record RECORD;
BEGIN
  SELECT * INTO profile_record 
  FROM public.public_user_data 
  WHERE user_id = user_uuid;
  
  RETURN profile_record IS NOT NULL 
    AND profile_record.first_name IS NOT NULL 
    AND profile_record.first_name != ''
    AND profile_record.last_name IS NOT NULL 
    AND profile_record.last_name != ''
    AND profile_record.school IS NOT NULL 
    AND profile_record.school != ''
    AND profile_record.major IS NOT NULL 
    AND profile_record.major != '';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
