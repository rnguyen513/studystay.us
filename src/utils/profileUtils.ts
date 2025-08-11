import { createClient } from '@/utils/supabase/component'

export interface ProfileData {
  user_id: string
  first_name: string
  last_name: string
  profile_picture_url?: string | null
  gender: 'M' | 'F' | 'Other'
  gender_other_specify?: string | null
  description?: string | null
  school: string
  major: string
  linkedin_url?: string | null
  introduction?: string | null
  created_at: string
  updated_at: string
}

export async function checkProfileCompletion(userId: string): Promise<boolean> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('public_user_data')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error || !data) {
    return false
  }
  
  // Check if all required fields are filled
  const requiredFields = ['first_name', 'last_name', 'gender', 'school', 'major']
  return requiredFields.every(field => data[field as keyof ProfileData])
}

export async function getProfileData(userId: string): Promise<ProfileData | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('public_user_data')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching profile data:', error)
    return null
  }
  
  return data
}

export async function redirectBasedOnProfileCompletion(userId: string, router: any) {
  const isComplete = await checkProfileCompletion(userId)
  
  if (!isComplete) {
    router.push(`/profile/${userId}`)
  } else {
    router.push('/in')
  }
}
