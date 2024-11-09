'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { leagueSpartan } from '@/utils/fonts'

import { createClient } from '@/utils/supabase/component'
import type { AuthApiError } from '@supabase/supabase-js'

export default function AuthPopup({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [step, setStep] = useState(1)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)
  const [loading, setLoading] = useState(false)
  //const [showConfirmation, setShowConfirmation] = useState(false) //Removed

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)

    return () => window.removeEventListener('resize', updateHeight)
  }, [step, email, password, confirmPassword, agreedToTerms])

  const handleSignUp = async () => {
    try {
      if (!email.includes("@virginia.edu")) throw new Error("Please use your @virginia.edu email address")
      const { error } = await supabase.auth.signUp({ email, password })

      if (error) {
        setErrorMessage(error.message)
        throw new Error(error.message)
      }

      router.push(`/checkemail?email=${encodeURIComponent(email)}`)
    } catch (error) {
      setErrorMessage(`${error}`)
      throw new Error(`${error}`)
    }
  }

  const handleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setErrorMessage(error.message)
        throw new Error(error.message)
      }

      router.refresh()
      onClose()
    } catch (error) {
      setErrorMessage(`${error}`)
      throw new Error(`${error}`)
    }
  }

  const handleContinue = async () => {
    setErrorMessage("")
    if (step === 1 && email) {
      if (email.includes("@virginia.edu")) return setStep(2);
      setErrorMessage("Please use your @virginia.edu email address")
    } else if (step === 2 && password && confirmPassword && password === confirmPassword && agreedToTerms) {
      setLoading(true)
      try {
        await handleSignUp()
      } catch (error) {
        return error
      } finally {
        setLoading(false)
      }
    } else if (step === 3 && email && password) {
      setLoading(true)
      try {
        await handleSignIn()
      } catch (error) {
        return error
      } finally {
        setLoading(false)
      }
    }
  }

  const handleBack = () => {
    setErrorMessage("")
    if (step > 1) {
      setStep(1)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleContinue()
  }

  const handleResendEmail = async () => {
    // Implement resend email logic here
    console.log("Resending email to:", email)
  }

  //const handleBackToLogin = () => { //Removed
  //  setShowConfirmation(false)
  //  setStep(3)
  //} //Removed

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  }

  const renderSocialButtons = () => (
    <>
      <div className="mt-4 text-center text-sm text-gray-500 blur-sm">or</div>
      <div className="mt-4 space-y-3">
        <Button variant="outline" className="w-full justify-start disabled blur-sm">
          <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3.064 7.51A9.996 9.996 0 0 1 12 2c2.695 0 4.959.99 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123c-.2.6-.314 1.24-.314 1.9s.114 1.3.314 1.9c.786 2.364 2.99 4.123 5.595 4.123c1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045c0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49Z"/></svg>
          Continue with Google
        </Button>
        <div className="relative">
          <div className="space-y-3 opacity-50 blur-sm pointer-events-none">
            <Button variant="outline" className="w-full justify-start">
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/></svg>
              Continue with Meta
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25Z"/></svg>
              Continue with Apple
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m16.556 12.906l-.455.453s-1.083 1.076-4.038-1.862s-1.872-4.014-1.872-4.014l.286-.286c.707-.702.774-1.83.157-2.654L9.374 2.86C8.61 1.84 7.135 1.705 6.26 2.575l-1.57 1.56c-.433.432-.723.99-.688 1.61c.09 1.587.808 5 4.812 8.982c4.247 4.222 8.232 4.39 9.861 4.238c.516-.048.964-.31 1.325-.67l1.42-1.412c.96-.953.69-2.588-.538-3.255l-1.91-1.039c-.806-.437-1.787-.309-2.417.317Z"/></svg>
              Continue with phone number
            </Button>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-25 text-white font-bold py-2 px-4 rounded-lg">
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </>
  )

  //if (showConfirmation) { //Removed
  //  return (
  //    <EmailConfirmationPage
  //      email={email}
  //      onResendEmail={handleResendEmail}
  //      onBackToLogin={handleBackToLogin}
  //    />
  //  )
  //} //Removed

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 text-lg ${leagueSpartan.className}`}>
      <motion.div 
        className="bg-white rounded-lg w-full max-w-md overflow-hidden flex flex-col"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.3 }
        }}
      >
        <div className="p-6 flex-grow overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              {step > 1 && (
                <Button variant="ghost" size="icon" className="mr-2" onClick={handleBack}>
                  <ArrowLeft className="h-6 w-6" />
                </Button>
              )}
              <h2 className="text-3xl font-semibold">Sign up</h2>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-500" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div>
            <div ref={contentRef}>
              <AnimatePresence initial={false} custom={step}>
                <motion.div
                  key={step}
                  custom={step}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                >
                  <div className="relative">
                    <form onSubmit={handleSubmit} className="">
                      {step === 1 ? (
                        <div  className="space-y-4">
                          <h1 className="text-2xl font-bold">Welcome</h1>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            Your email end with @virginia.edu and must be confirmed before you can log in. Check your email for confirmation.
                          </p>
                        </div>
                      ) : step === 2 ? (
                        <div className="space-y-4">
                          <h1 className="text-2xl font-bold">Create your account</h1>
                          <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                              Password
                            </label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                              Confirm Password
                            </label>
                            <Input
                              id="confirm-password"
                              type="password"
                              placeholder="Confirm your password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                            />
                          </div>
                          {password && confirmPassword && password !== confirmPassword && (
                            <p className="text-sm text-red-500">Passwords do not match</p>
                          )}
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="terms"
                              checked={agreedToTerms}
                              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                              required
                            />
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              I agree to the <Link href="/terms-and-conditions" target="_blank" className="underline">terms and conditions</Link>
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <h1 className="text-2xl font-bold">Log in to your account</h1>
                          <div>
                            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <Input
                              id="login-email"
                              type="email"
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                              Password
                            </label>
                            <Input
                              id="login-password"
                              type="password"
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                          <div className="text-sm">
                            <a className="text-primary pointer-events-none blur-sm">Forgot your password?</a>
                          </div>
                        </div>
                      )}
                      <div className="mt-5">
                        {errorMessage && (
                          <div className="text-red-600 font-bold">
                            {errorMessage}
                          </div>
                        )}
                        <Button
                          type="submit"
                          className="w-full bg-primary text-white"
                          disabled={
                            (step === 1 && !email) ||
                            (step === 2 && (!password || !confirmPassword || password !== confirmPassword || !agreedToTerms)) ||
                            (step === 3 && (!email || !password))
                          }
                        >
                          {loading ? "loading..." : (step === 1 ? 'Sign up' : step === 2 ? 'Sign Up' : 'Log In')}
                        </Button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {step === 1 && (
              <div className="relative mt-2">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setStep(3)}
                >
                  Or log in
                </Button>
              </div>
            )}

            {/* {(step === 1 || step === 3) && renderSocialButtons()} */}
          </div>
        </div>
      </motion.div>
    </div>
  )
}