'use client'

import { useSearchParams } from 'next/navigation'
import EmailConfirmationPage from '@/components/EmailConfirmationPage'
import { createClient } from '@/utils/supabase/component'
import { useRouter } from 'next/navigation'

export default function EmailConfirmation() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const supabase = createClient()
  const router = useRouter()

  const handleResendEmail = async () => {
    if (email) {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })
      if (error) {
        console.error('Error resending email:', error)
      } else {
        console.log('Confirmation email resent')
      }
    }
  }

  const handleBackToLogin = () => {
    router.push('/in')
  }

  if (!email) {
    return <div>No email provided</div>
  }

  return (
    <EmailConfirmationPage
      email={email}
      onResendEmail={handleResendEmail}
      onBackToLogin={handleBackToLogin}
    />
  )
}