import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { leagueSpartan } from '@/utils/fonts'

interface EmailConfirmationPageProps {
  email: string;
  onResendEmail: () => void;
  onBackToLogin: () => void;
}

export default function EmailConfirmationPage({ email, onResendEmail, onBackToLogin }: EmailConfirmationPageProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${leagueSpartan.className}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Check Your Email</CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent a confirmation link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="bg-primary bg-opacity-10 rounded-full p-3">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <p className="text-center">
            We&apos;ve sent an email to <strong>{email}</strong>. Click the link in the email to confirm your account. It may take up to 5 minutes.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={onResendEmail} variant="outline" className="w-full">
            Resend confirmation email
          </Button>
          <Button onClick={onBackToLogin} variant="link" className="w-full">
            Back to login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}