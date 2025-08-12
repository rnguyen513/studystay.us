-- Run this in your Supabase SQL Editor
-- This creates a trigger to auto-create user profiles

-- Create the function
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
    '',
    '',
    NULL,
    'M',
    NULL,
    NULL,
    '',
    '',
    NULL,
    NULL,
    NOW(),
    NOW()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
