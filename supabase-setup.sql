-- Create the public_user_data table
CREATE TABLE IF NOT EXISTS public.public_user_data (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    profile_picture_url TEXT,
    gender TEXT NOT NULL CHECK (gender IN ('M', 'F', 'Other')),
    gender_other_specify TEXT,
    description TEXT,
    school TEXT NOT NULL,
    major TEXT NOT NULL,
    linkedin_url TEXT,
    introduction TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_public_user_data_user_id ON public.public_user_data(user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_public_user_data_updated_at 
    BEFORE UPDATE ON public.public_user_data 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for the avatars bucket
-- Allow authenticated users to upload their own profile pictures
CREATE POLICY "Users can upload their own profile picture" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'avatars' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Allow public read access to profile pictures
CREATE POLICY "Profile pictures are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');

-- Allow users to update their own profile pictures
CREATE POLICY "Users can update their own profile picture" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'avatars' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Allow users to delete their own profile pictures
CREATE POLICY "Users can delete their own profile picture" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'avatars' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Set up RLS (Row Level Security) for the public_user_data table
ALTER TABLE public.public_user_data ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile data
CREATE POLICY "Users can view their own profile data" ON public.public_user_data
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own profile data
CREATE POLICY "Users can insert their own profile data" ON public.public_user_data
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile data
CREATE POLICY "Users can update their own profile data" ON public.public_user_data
    FOR UPDATE USING (auth.uid() = user_id);

-- Public read access to profile data (for viewing other users' profiles)
CREATE POLICY "Public read access to profile data" ON public.public_user_data
    FOR SELECT USING (true);

-- Grant necessary permissions
GRANT ALL ON public.public_user_data TO authenticated;
GRANT SELECT ON public.public_user_data TO anon;
