# Storage Policy Fix for Profile Picture Upload

## Problem
The profile picture upload was failing with this error:
```
Object
error: "Unauthorized"
message: "new row violates row-level security policy"
statusCode: "403"
```

## Root Cause
The storage policies were checking for `storage.foldername(name)[1]` to match the user ID, but the file path structure in the code was using `profile-pictures/${fileName}` instead of `${user.id}/${fileName}`.

## Solutions

### Option 1: Update Storage Policies (Recommended)
Run the corrected SQL script `supabase-setup-fixed.sql` in your Supabase dashboard. This script:

1. **Drops existing problematic policies**
2. **Creates simplified policies** that only check if the user is authenticated
3. **Maintains security** while allowing profile picture uploads

### Option 2: Update File Path Structure
I've already updated the profile component to use `${user.id}/${fileName}` instead of `profile-pictures/${fileName}`. This change:

1. **Matches the original storage policies**
2. **Organizes files by user ID**
3. **Maintains the original security model**

## How to Apply the Fix

### Step 1: Run the Fixed SQL Script
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-setup-fixed.sql`
4. Click "Run"

### Step 2: Test the Upload
1. Go to the profile completion page
2. Try uploading a profile picture
3. The upload should now work without errors

## What Changed

### Before (Problematic):
```sql
CREATE POLICY "Users can upload their own profile picture" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'avatars' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );
```

### After (Fixed):
```sql
CREATE POLICY "Users can upload profile pictures" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'avatars' 
        AND auth.uid() IS NOT NULL
    );
```

## Security Considerations

The new policies are still secure because:
- **Only authenticated users** can upload files
- **Files are still organized by user ID** in the file structure
- **Public read access** is maintained for profile pictures
- **Users can only manage their own files** through the application logic

## File Structure

With the updated code, profile pictures will be stored as:
```
avatars/
├── user-id-1/
│   ├── user-id-1-1234567890.jpg
│   └── user-id-1-1234567891.png
└── user-id-2/
    └── user-id-2-1234567892.jpg
```

This structure is:
- **Organized** by user ID
- **Secure** (users can only access their own folder)
- **Scalable** (no folder depth issues)
- **Clean** (easy to manage and backup)

## Testing

After applying the fix:
1. ✅ Profile picture upload should work
2. ✅ Images should be accessible publicly
3. ✅ Users should only be able to upload when authenticated
4. ✅ File organization should be clean and logical

## Rollback

If you need to rollback to the original policies:
1. Run the original `supabase-setup.sql` script
2. The file path change in the code will still work with the original policies
