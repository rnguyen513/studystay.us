import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star, CircleHelp } from 'lucide-react'
import { leagueSpartan } from '@/utils/fonts'
import PropertyCarousel from '@/components/PropertyCarousel'
import StudyStayFooter from '@/components/StudyStayFooter'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className={`min-h-screen bg-gradient-to-b from-blue-50 to-white ${leagueSpartan.className} overflow-x-hidden`}>
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-blue-800">StudyStay</div>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link href="https://www.instagram.com/studystay.us" target="_blank" className="text-blue-800 hover:text-orange-500 transition-colors">Follow us on Instagram!</Link></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-16">
        <section className="text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6 text-blue-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Subletting for students made easy
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a>StudyStay facilitates the process of sub-leasing on college campuses by connecting authenticated student leasers with fellow students.</a><br/>
          </motion.p>
          <motion.p 
            className="text-2xl font-semibold text-gray-700 mb-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a>I want to...</a><br/>
          </motion.p>
          <motion.form
            onSubmit={(e) => {e.preventDefault()}}
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              onClick={() => router.push("/in")}
              className={`relative bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors text-lg font-semibold mr-4`}
            >
              <span className="flex flex-row">Find a sublet <ArrowRight className="ml-2"/></span>
            </button>
            <button
              onClick={() => router.push("/onboarding")}
              className={`relative bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors text-lg font-semibold`}
            >
              <span className="flex flex-row">Post a sublet <ArrowRight className="ml-2"/></span>
            </button>
          </motion.form>
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.6}}
            >
              <hr/>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-row items-center space-x-4 justify-center my-8"
          >
            <b className="text-gray-500">Or find housing for:</b>
            <div className="flex flex-row space-x-4 justify-center items-center">
              {
                ["International Students", "Transfer Students", "Traevling Nurses", "Summer Stays", "Monthly Stays", "Winter Break", "Internships/Co-ops"].map((demographic) => (
                  <Button onClick={() => router.push(`/s/UVA?open_to_demographics=${demographic}`)} className="px-2 py-1 bg-gray-500 rounded-lg" key={demographic}>{demographic}</Button>
                ))
              }
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-blue-800 mr-1"/>
                <span>For UVA students, open to all</span>
              </div>
            </div>
          </motion.div>
        </section>

        <PropertyCarousel/>

        <section className="flex flex-col items-center md:w-3/4 w-full mx-auto mb-16 mt-10">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-col items-center justify-center mb-4">
              <CircleHelp className="mr-2 h-12 w-12 text-blue-800 mb-4"/>
              <h2 className="text-4xl font-semibold text-blue-800">Why use StudyStay?</h2>
            </div>
            <div className="text-xl space-y-4">
              <p className="">
                Subleasing your space or finding a sublease to take over is <b>notoriously</b> difficult in the college space.
                StudyStay addresses these common challenges:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Facebook chats are rampant with scams</li>
                <li>Information is limited/incomplete on other platforms</li>
                <li>There&apos;s no way to accurately filter student housing needs</li>
              </ul>
              <p className="">
                StudyStay provides a platform for both sellers and buyers to connect on a student-ID authenticated
                 platform. <a className="font-bold">As a buyer, you can easily find housing that suits your needs</a>, and as a seller, you can find buyers more
                efficiently by listing your space with our intuitive UI.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-10 text-blue-800">How StudyStay Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Create an Account", description: "Sign up and verify your student status" },
              { step: 2, title: "Browse Listings", description: "Search for verified subleases that match your needs" },
              { step: 3, title: "Secure Your Stay", description: "Book with confidence through our secure platform" },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-800 text-white flex items-center justify-center text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <StudyStayFooter/>
    </div>
  )
}