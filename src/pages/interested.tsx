"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/component"
import { leagueSpartan } from "@/utils/fonts"
import Link from "next/link"

import Header from "@/components/header"

export default function Interested() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.")
      return
    }

    const { error } = await supabase.from("interested_emails").insert([{ email }])

    if (error) {
      setError("Something went wrong. Try again.")
      return
    }

    setSubmitted(true)
    setEmail("")
  }

  return (
    <div className={`min-h-screen w-full overflow-hidden bg-white ${leagueSpartan.className}`}>
      <Header />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-24 mb-28 px-4 w-full flex justify-center"
      >
        <div className="w-full max-w-xl text-center space-y-6">
          <h2 className="text-5xl font-bold text-blue-800">get notified</h2>
          <p className="text-lg text-gray-700">
            once you&apos;re in our system, we&apos;ll reach out to start working together
          </p>

          {submitted ? (
            <div className="space-y-4">
              <p className="text-green-600 font-medium text-lg">🎉 you&apos;re good to go!</p>
              <Link
                href="/in"
                className="text-blue-800 hover:text-blue-900 underline font-medium transition-colors mt-10"
              >
                see listings available now →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-base px-4 py-2"
              />
              <Button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-6 py-2 rounded-md transition-colors"
              >
                send
              </Button>
            </form>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </motion.section>
    </div>
  )
}
