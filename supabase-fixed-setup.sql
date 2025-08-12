-- Fixed Supabase Setup for Auto-Creating User Profiles
-- This script creates profiles with NULL required fields initially,
-- and provides functions to check completion when needed

-- Step 1: Make required fields nullable initially (if not already done)
ALTER TABLE public.public_user_data 
ALTER COLUMN first_name DROP NOT NULL,
ALTER COLUMN last_name DROP NOT NULL,
ALTER COLUMN school DROP NOT NULL,
ALTER COLUMN major DROP NOT NULL;

-- Step 2: Create the function that will be called by the trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert a new row into public_user_data for the new user
  -- Required fields start as NULL and must be filled out by the user
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
    NEW.id,                    -- user_id from the new auth.users row
    NULL,                      -- first_name (NULL initially, user must fill out)
    NULL,                      -- last_name (NULL initially, user must fill out)
    NULL,                      -- profile_picture_url (NULL initially)
    'M',                       -- default gender
    NULL,                      -- gender_other_specify (NULL initially)
    NULL,                      -- description (NULL initially)
    NULL,                      -- school (NULL initially, user must fill out)
    NULL,                      -- major (NULL initially, user must fill out)
    NULL,                      -- linkedin_url (NULL initially)
    NULL,                      -- introduction (NULL initially)
    NOW(),                     -- created_at
    NOW()                      -- updated_at
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Create the trigger that calls this function
-- This trigger fires AFTER a new row is inserted into auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 4: Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon;

-- Step 5: Create a helper function to check if a profile is complete
CREATE OR REPLACE FUNCTION public.is_profile_complete(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  profile_record RECORD;
BEGIN
  SELECT * INTO profile_record 
  FROM public.public_user_data 
  WHERE user_id = user_uuid;
  
  -- Return true if profile exists and all required fields are filled
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

-- Step 6: Grant permissions for the helper function
GRANT EXECUTE ON FUNCTION public.is_profile_complete(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_profile_complete(UUID) TO anon;

-- Step 7: Create a view for easy profile completion checking
CREATE OR REPLACE VIEW public.profile_completion_status AS
SELECT 
  pud.user_id,
  pud.first_name,
  pud.last_name,
  pud.school,
  pud.major,
  CASE 
    WHEN pud.first_name IS NOT NULL AND pud.first_name != '' 
         AND pud.last_name IS NOT NULL AND pud.last_name != ''
         AND pud.school IS NOT NULL AND pud.school != ''
         AND pud.major IS NOT NULL AND pud.major != ''
    THEN true 
    ELSE false 
  END as is_complete,
  pud.created_at,
  pud.updated_at
FROM public.public_user_data pud;

-- Step 8: Grant permissions for the view
GRANT SELECT ON public.profile_completion_status TO authenticated;
GRANT SELECT ON public.profile_completion_status TO anon;

-- Step 9: Create a function to enforce profile completion when needed
-- This can be called before allowing certain actions
CREATE OR REPLACE FUNCTION public.require_profile_completion(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if profile is complete
  IF NOT public.is_profile_complete(user_uuid) THEN
    RAISE EXCEPTION 'Profile completion required. Please complete your profile before proceeding.';
  END IF;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 10: Grant permissions for the requirement function
GRANT EXECUTE ON FUNCTION public.require_profile_completion(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.require_profile_completion(UUID) TO anon;
