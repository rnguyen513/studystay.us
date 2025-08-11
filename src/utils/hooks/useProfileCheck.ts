import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/component'
import { checkProfileCompletion } from '@/utils/profileUtils'

export function useProfileCheck() {
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null)
  const [user, setUser] = useState<any>(null)
  const [hasShownBanner, setHasShownBanner] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          setUser(user)
          const profileComplete = await checkProfileCompletion(user.id)
          setIsProfileComplete(profileComplete)
          
          if (!profileComplete) {
            router.push(`/profile/${user.id}`)
          }
        } else {
          setIsProfileComplete(false)
        }
      } catch (error) {
        console.error('Error checking profile:', error)
        setIsProfileComplete(false)
      }
    }

    checkProfile()
  }, [supabase, router])

  // Show banner only once per session
  const showBanner = () => {
    if (!hasShownBanner && user && isProfileComplete) {
      setHasShownBanner(true)
      return true
    }
    return false
  }

  return {
    isProfileComplete,
    user,
    showBanner
  }
}
