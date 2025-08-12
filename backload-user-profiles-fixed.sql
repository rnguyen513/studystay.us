-- Fixed Backload User Profiles Script
-- This script directly inserts missing profiles without using a complex function

-- Step 1: Check current state
SELECT 'Current State' as step, COUNT(*) as count FROM auth.users
UNION ALL
SELECT 'Existing Profiles', COUNT(*) FROM public.public_user_data
UNION ALL
SELECT 'Missing Profiles', COUNT(*) FROM auth.users u
LEFT JOIN public.public_user_data p ON u.id = p.user_id
WHERE p.user_id IS NULL;

-- Step 2: Insert missing profiles directly
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
)
SELECT 
    u.id,
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
    u.created_at,  -- Use the user's original creation time
    NOW()  -- updated_at set to now
FROM auth.users u
LEFT JOIN public.public_user_data p ON u.id = p.user_id
WHERE p.user_id IS NULL;

-- Step 3: Verify the results
SELECT 'After Backload' as step, COUNT(*) as count FROM auth.users
UNION ALL
SELECT 'Total Profiles', COUNT(*) FROM public.public_user_data
UNION ALL
SELECT 'Users without Profiles', COUNT(*) FROM auth.users u
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

-- Step 5: Show all profiles for final verification
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
ORDER BY pud.created_at DESC;
