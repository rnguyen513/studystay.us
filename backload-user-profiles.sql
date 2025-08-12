-- Backload User Profiles Script
-- This script creates a new row in public.public_user_data for each user in auth.users
-- that doesn't already have a profile, ensuring all users have profile records

-- Step 1: Create a temporary function to handle the backload process
CREATE OR REPLACE FUNCTION backload_user_profiles()
RETURNS TABLE(
    user_id UUID,
    action TEXT,
    message TEXT
) AS $$
DECLARE
    user_record RECORD;
    profile_exists BOOLEAN;
    inserted_count INTEGER := 0;
    skipped_count INTEGER := 0;
    error_count INTEGER := 0;
BEGIN
    -- Loop through all users in auth.users
    FOR user_record IN 
        SELECT id, email, created_at 
        FROM auth.users 
        ORDER BY created_at
    LOOP
        BEGIN
            -- Check if profile already exists
            SELECT EXISTS(
                SELECT 1 FROM public.public_user_data 
                WHERE user_id = user_record.id
            ) INTO profile_exists;
            
            IF profile_exists THEN
                -- Profile already exists, skip
                skipped_count := skipped_count + 1;
                RETURN QUERY SELECT 
                    user_record.id, 
                    'SKIPPED'::TEXT, 
                    'Profile already exists for user ' || user_record.email;
            ELSE
                -- Profile doesn't exist, create one
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
                    user_record.id,
                    NULL,  -- first_name (NULL initially, user must fill out)
                    NULL,  -- last_name (NULL initially, user must fill out)
                    NULL,  -- profile_picture_url (NULL initially)
                    'M',   -- default gender
                    NULL,  -- gender_other_specify (NULL initially)
                    NULL,  -- description (NULL initially)
                    NULL,  -- school (NULL initially, user must fill out)
                    NULL,  -- major (NULL initially, user must fill out)
                    NULL,  -- linkedin_url (NULL initially)
                    NULL,  -- introduction (NULL initially)
                    user_record.created_at,  -- Use the user's original creation time
                    NOW()  -- updated_at set to now
                );
                
                inserted_count := inserted_count + 1;
                RETURN QUERY SELECT 
                    user_record.id, 
                    'INSERTED'::TEXT, 
                    'Created profile for user ' || user_record.email;
            END IF;
            
        EXCEPTION WHEN OTHERS THEN
            -- Handle any errors during profile creation
            error_count := error_count + 1;
            RETURN QUERY SELECT 
                user_record.id, 
                'ERROR'::TEXT, 
                'Error creating profile for user ' || user_record.email || ': ' || SQLERRM;
        END;
    END LOOP;
    
    -- Return summary
    RAISE NOTICE 'Backload completed: % profiles inserted, % profiles skipped, % errors', 
        inserted_count, skipped_count, error_count;
    
    RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 2: Execute the backload function
SELECT * FROM backload_user_profiles();

-- Step 3: Verify the results
-- Check total count of users vs profiles
SELECT 
    'Total Users' as metric,
    COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
    'Total Profiles' as metric,
    COUNT(*) as count
FROM public.public_user_data
UNION ALL
SELECT 
    'Users without Profiles' as metric,
    COUNT(*) as count
FROM auth.users u
LEFT JOIN public.public_user_data p ON u.id = p.user_id
WHERE p.user_id IS NULL;

-- Step 4: Show sample of newly created profiles
SELECT 
    pud.user_id,
    u.email,
    pud.first_name,
    pud.last_name,
    pud.school,
    pud.major,
    pud.created_at,
    pud.updated_at
FROM public.public_user_data pud
JOIN auth.users u ON pud.user_id = u.id
WHERE pud.first_name IS NULL 
   OR pud.last_name IS NULL 
   OR pud.school IS NULL 
   OR pud.major IS NULL
ORDER BY pud.created_at DESC
LIMIT 10;

-- Step 5: Clean up the temporary function
DROP FUNCTION IF EXISTS backload_user_profiles();

-- Optional: Show all profiles for verification
-- SELECT 
--     pud.user_id,
--     u.email,
--     pud.first_name,
--     pud.last_name,
--     pud.school,
--     pud.major,
--     pud.created_at,
--     pud.updated_at
-- FROM public.public_user_data pud
-- JOIN auth.users u ON pud.user_id = u.id
-- ORDER BY pud.created_at DESC;
