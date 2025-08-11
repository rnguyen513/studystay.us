# Profile Completion System Setup

This document explains how to set up and use the new profile completion system for StudyStay.

## Overview

The profile completion system ensures that users complete their profile information after email verification, collecting:
- **Required**: First Name, Last Name, Gender, School, Major
- **Optional**: Profile Picture, Description, LinkedIn URL, Introduction

## Database Setup

### 1. Run the SQL Script

Execute the `supabase-setup.sql` script in your Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-setup.sql`
4. Click "Run" to execute the script

This will create:
- `public_user_data` table with all profile fields
- `avatars` storage bucket for profile pictures
- Proper Row Level Security (RLS) policies
- Automatic timestamp updates

### 2. Verify Table Creation

Check that the `public_user_data` table was created with the correct structure:

```sql
SELECT * FROM public_user_data LIMIT 0;
```

## Storage Setup

The system automatically creates an `avatars` storage bucket for profile pictures. Users can upload images that will be stored with their user ID for security.

## Authentication Flow Changes

### Current Flow:
1. User signs up → Email verification required
2. User verifies email → Redirected to `/checkemail`
3. User can then access the app

### New Flow:
1. User signs up → Email verification required
2. User verifies email → Redirected to `/profile/[userid]`
3. User completes profile → Redirected to main app (`/in`)
4. If user tries to access protected routes without complete profile → Redirected to profile completion

## Files Modified/Created

### New Files:
- `src/pages/profile/[user].tsx` - Profile completion form
- `src/utils/profileUtils.ts` - Profile utility functions
- `src/utils/hooks/useProfileCheck.ts` - Hook for profile checking
- `supabase-setup.sql` - Database setup script

### Modified Files:
- `src/components/AuthPopup.tsx` - Now creates user record in users table
- `src/utils/SupabaseTypes.ts` - Added public_user_data table types

## Usage

### For Users:
1. After email verification, users are automatically redirected to `/profile/[userid]`
2. They must fill out the required fields (marked with *)
3. Optional fields can be completed later
4. Profile picture upload is supported
5. After completion, they're redirected to the main app

### For Developers:
Use the `useProfileCheck` hook in protected routes:

```tsx
import { useProfileCheck } from '@/utils/hooks/useProfileCheck'

function ProtectedComponent() {
  const { isProfileComplete, loading, user } = useProfileCheck()
  
  if (loading) return <div>Loading...</div>
  if (!isProfileComplete) return null // Will redirect automatically
  
  return <div>Protected content</div>
}
```

## Security Features

- **Row Level Security (RLS)**: Users can only access their own profile data
- **Storage Policies**: Users can only upload/update their own profile pictures
- **Input Validation**: Required fields are enforced both client and server-side
- **Foreign Key Constraints**: Profile data is linked to authenticated users

## Testing

1. Create a new user account
2. Verify the email
3. Should be redirected to `/profile/[userid]`
4. Fill out the form and submit
5. Should be redirected to `/in`
6. Try accessing `/profile/[userid]` again - should show completed profile

## Troubleshooting

### Common Issues:

1. **"Table doesn't exist"**: Make sure you ran the SQL script
2. **"Storage bucket not found"**: Check that the avatars bucket was created
3. **"Permission denied"**: Verify RLS policies are in place
4. **"Foreign key constraint"**: Ensure the users table exists and has the correct structure

### Debug Steps:

1. Check Supabase logs for errors
2. Verify table structure matches the types
3. Test RLS policies with different user contexts
4. Check storage bucket permissions

## Future Enhancements

- Profile editing after initial completion
- Profile picture cropping/resizing
- Social media integration
- Profile verification badges
- Admin profile review system
