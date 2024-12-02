import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star, X, CheckCircle, CircleX, CircleHelp } from 'lucide-react'
import { leagueSpartan } from '@/utils/fonts'
import PropertyCarousel from '@/components/PropertyCarousel'
import StudyStayFooter from '@/components/StudyStayFooter'

import { useRouter, redirect } from 'next/navigation'
import Link from 'next/link'

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("You've been added to our database. We'll be in touch shortly with exciting opportunities for your study abroad housing.");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [firestoreRequestLoading, setFirestoreRequestLoading] = useState(false);

  const router = useRouter();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setFirestoreRequestLoading(true);

  //   try {
  //     await fetch("/api/firestoreRequest", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         collection: "emails",
  //         email: email
  //       }),
  //       signal: AbortSignal.timeout(5000)
  //     }).then(res => {
  //       console.log("res:", res);
  //       if (res.status != 200) {
  //         setPopupMessage("Something went wrong. Please try again later or contact Ryan at amk3ef@virginia.edu. ERROR_DATABASE_DOWN")
  //       }
  //       res.json();
  //     }).then(data => {
  //       console.log("data:", data)
  //     })
  //   } catch (error) {
  //     console.error('Error with request: ', error);
  //     setPopupMessage("Something went wrong. Please try again later or contact Ryan at amk3ef@virginia.edu. ERROR_FETCH_TIMEOUT_5000")
  //   }

  //   setFirestoreRequestLoading(false);
  //   setShowPopup(true);
  //   setEmail('')
  // }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-blue-50 to-white ${leagueSpartan.className} overflow-x-hidden`}>
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          {/* <Shield className="w-8 h-8 text-blue-800 mr-2" /> */}
          <div className="text-2xl font-bold text-blue-800">StudyStay</div>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {/* <li><a href="#" className="text-blue-800 hover:text-orange-500 transition-colors">How it works</a></li>
            <li><a href="#" className="text-blue-800 hover:text-orange-500 transition-colors">Listings</a></li>
            <li><a href="#" className="text-blue-800 hover:text-orange-500 transition-colors">About us</a></li>
            <li><a href="#" className="text-blue-800 hover:text-orange-500 transition-colors">Safety</a></li> */}
            <li><Link href="https://www.instagram.com/studystay.us" target="_blank" className="text-blue-800 hover:text-orange-500 transition-colors">Follow us on Instagram!</Link></li>
          </ul>
        </nav>
        {/* <motion.button 
          className="md:hidden text-blue-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          animate={{ rotate: isMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Menu className="w-6 h-6" />
        </motion.button> */}
      </header>

      {/* <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-2">
              <ul className="space-y-2">
                <li><a href="#" className="block py-2 text-blue-800 hover:text-orange-500 transition-colors">How it works</a></li>
                <li><a href="#" className="block py-2 text-blue-800 hover:text-orange-500 transition-colors">Listings</a></li>
                <li><a href="#" className="block py-2 text-blue-800 hover:text-orange-500 transition-colors">About us</a></li>
                <li><a href="#" className="block py-2 text-blue-800 hover:text-orange-500 transition-colors">Safety</a></li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence> */}

      <main className="container mx-auto px-4 py-16 md:py-16">
        <section className="text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6 text-blue-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Subleasing for students made easy
          </motion.h1>
          {/* <motion.p 
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            StudyStay connects you with verified subleases from fellow students, ensuring a secure and comfortable stay during your study abroad experience. <a href="https://www.instagram.com/studystay.us" target="_blank" className="text-blue-800 underline">Follow us on Instagram!</a>
          </motion.p> */}
          <motion.p 
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a>StudyStay facilitates the process of sub-leasing on college campuses by connecting authenticated student leasers with fellow students.</a><br/>
            {/* <a href="https://www.instagram.com/studystay.us" target="_blank" className="text-blue-800 underline">Follow us on Instagram!</a> */}
          </motion.p>
          {/* <motion.form 
            onSubmit={handleSubmit}
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 w-64 md:rounded-l-lg md:rounded-none rounded-lg mr-1 md:mr-0 border-2 border-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <button
              type="submit"
              disabled={firestoreRequestLoading}
              className={`relative bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors text-lg font-semibold ${firestoreRequestLoading ? 'text-transparent' : ''}`}
            >
              {firestoreRequestLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                </div>
              )}
              <span className={firestoreRequestLoading ? "invisible" : ""}>Let's find a sublet &rarr;</span>
            </button>
          </motion.form> */}
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
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-600">
            {/* <div className="flex items-center">
              <Shield className="w-5 h-5 text-blue-800 mr-1" />
              <span>Verified Listings</span>
            </div> */}
            {/* <div className="flex items-center">
              <Star className="w-5 h-5 text-blue-800 mr-1" />
              <span>4.8/5 Student Rating</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-blue-800 mr-1" />
              <span>100+ Happy Users</span>
            </div> */}
            <div className="flex items-center">
              <Star className="w-5 h-5 text-blue-800 mr-1"/>
              <span>For UVA students, open to all</span>
            </div>
          </div>
        </section>

        <PropertyCarousel/>

        <section className="flex flex-col items-center md:w-3/4 w-full mx-auto mb-16 mt-10">
          {/* {[
            { icon: Globe, title: "Global Network", description: "Access to verified listings from universities worldwide" },
            { icon: Shield, title: "Safety First", description: "All listings and users are thoroughly vetted for your security" },
            { icon: Home, title: "Comfortable Stays", description: "Find homes that meet our comfort and quality standards" },
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 * index }}
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-800" />
              <h2 className="text-xl font-semibold mb-2 text-blue-800">{feature.title}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))} */}
          {/* <motion.div
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CircleHelp className="w-12 h-12 mx-auto mb-4 text-blue-800" />
            <h2 className="text-xl font-semibold mb-2 text-blue-800">Why use StudyStay?</h2>
            <p className="text-gray-600">
              Subleasing your space/finding a sublease to take over is notoriously difficult in the college space

              Facebook chats are rampant with scams…listing information is limited or incomplete…theres no way to 
              accurately filter out needs for housing… StudyStay provides a platform for both the seller and buyer 
              to connect on a student-ID authenticated platform, where you can easily find housing that suits you, 
              and as a seller, find buyers more efficiently by listing your space with our intuitive UI.
            </p>
            <ul>
              <li>Facebook chats are rampant with scams</li>
              <li>Listed information is limited or incomplete</li>
              <li>There's no way to filter housing</li>
            </ul>
            <p>
              StudyStay provides a platform for both the seller and buyer 
              to connect on a student-ID authenticated platform, where you can find housing that suits you.
              Ass a seller, find buyers more efficiently by listing your space on our platform.
            </p>
          </motion.div> */}
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

        {/* Testimonials */}
        {/* <section className="mb-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Trusted by Students</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Sarah L.", university: "University of Virginia", quote: "StudyStay's verification process gave me peace of mind when finding a place for my semester in Paris." },
              { name: "Alex M.", university: "Stanford University", quote: "I was able to sublet my apartment quickly and to a fellow student I could trust. The platform's security measures are top-notch." },
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-blue-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.university}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">&quot;{testimonial.quote}&quot;</p>
              </motion.div>
            ))}
          </div>
        </section> */}

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

        {/* <section className="text-center bg-orange-100 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">Ready to sublease?</h2>
          <motion.div
            className="inline-flex items-center bg-blue-800 text-white px-8 py-4 rounded-lg hover:bg-blue-900 hover:cursor-pointer transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // onClick={() => router.push("/airbnb-style-landing")}
            onClick={() => {setPopupMessage("Coming Soon!"); setShowPopup(true);}}
          >
            <a className="text-xl font-semibold">Find the Perfect Place</a>
            <ArrowRight className="ml-2 w-6 h-6" />
          </motion.div>
          <p className="mt-4 text-sm text-gray-600">No commitment required. Browse our verified listings today.</p>
        </section> */}
      </main>

      <StudyStayFooter/>

      <AnimatePresence>
        {showPopup && (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full relative"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close popup"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center">
              { popupMessage[0] == "S" ? (
                <CircleX className="w-16 h-16 text-red-500 mx-auto mb-4"/>
              ) : (
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4"/>
              )}
              <h2 className="text-2xl font-bold text-blue-800 mb-2">{popupMessage[0] == "S" ? "Uh oh..." : "Thank You for Joining!"}</h2>
              <p className="text-gray-600 mb-4">
                {popupMessage}
              </p>
              <a>
                <button
                  onClick={() => {setShowPopup(false); setPopupMessage("You've been added to our database. We'll be in touch shortly with exciting opportunities for your study abroad housing.")}}
                  className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors"
                >
                  Got it!
                </button>
              </a>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}