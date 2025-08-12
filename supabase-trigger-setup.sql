-- Supabase Trigger Setup for Auto-Creating User Profiles
-- This script creates a trigger that automatically creates a row in public_user_data
-- whenever a new user is created in auth.users

-- First, let's create a function that will be called by the trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert a new row into public_user_data for the new user
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
    '',                        -- first_name (empty, user will fill out)
    '',                        -- last_name (empty, user will fill out)
    NULL,                      -- profile_picture_url (NULL initially)
    'M',                       -- default gender
    NULL,                      -- gender_other_specify (NULL initially)
    NULL,                      -- description (NULL initially)
    '',                        -- school (empty, user will fill out)
    '',                        -- major (empty, user will fill out)
    NULL,                      -- linkedin_url (NULL initially)
    NULL,                      -- introduction (NULL initially)
    NOW(),                     -- created_at
    NOW()                      -- updated_at
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Now create the trigger that calls this function
-- This trigger fires AFTER a new row is inserted into auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon;

-- Optional: If you want to test the trigger, you can uncomment this:
-- INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
-- VALUES ('test-user-id', 'test@example.com', 'encrypted_password', NOW(), NOW(), NOW());
-- (This would create a test user and trigger the profile creation)
