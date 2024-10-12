import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Globe, Home, Users, Shield, Star, X, CheckCircle } from 'lucide-react'

import db from '../pages/utils/firestore';
import { getDocs, addDoc, collection } from "firebase/firestore";

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "emails"), {
        email: email
      })
      console.log('Document written with ID: ', docRef.id);
      setShowPopup(true);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    console.log('Submitted email:', email)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="w-8 h-8 text-blue-800 mr-2" />
          <div className="text-2xl font-bold text-blue-800">StudyStay</div>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-blue-800 hover:text-orange-500 transition-colors">How it works</a></li>
            <li><a href="#" className="text-blue-800 hover:text-orange-500 transition-colors">Listings</a></li>
            <li><a href="#" className="text-blue-800 hover:text-orange-500 transition-colors">About us</a></li>
            <li><a href="#" className="text-blue-800 hover:text-orange-500 transition-colors">Safety</a></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <motion.h1 
            className="text-5xl font-bold mb-6 text-blue-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Safe and Reliable Housing for Students Abroad
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            StudyStay connects you with verified subleases from fellow students, ensuring a secure and comfortable stay during your study abroad experience.
          </motion.p>
          <motion.form 
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
              className="px-4 py-3 w-64 rounded-l-lg border-2 border-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <button
              type="submit"
              className="bg-blue-800 text-white px-6 py-3 rounded-r-lg hover:bg-blue-900 transition-colors text-lg font-semibold"
            >
              Get Started
            </button>
          </motion.form>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
            <Shield className="w-5 h-5 text-blue-800" />
            <span>Verified Listings</span>
            <Star className="w-5 h-5 text-blue-800" />
            <span>4.8/5 Student Rating</span>
            <Users className="w-5 h-5 text-blue-800" />
            <span>10,000+ Happy Users</span>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {[
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
          ))}
        </section>

        <section className="mb-16 bg-blue-50 p-8 rounded-lg">
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
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">How StudyStay Works</h2>
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

        <section className="text-center bg-orange-100 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">Ready for a Safe and Comfortable Stay?</h2>
          <motion.div
            className="inline-flex items-center bg-blue-800 text-white px-8 py-4 rounded-lg hover:bg-blue-900 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#" className="text-xl font-semibold">Find Your Perfect Stay</a>
            <ArrowRight className="ml-2 w-6 h-6" />
          </motion.div>
          <p className="mt-4 text-sm text-gray-600">No commitment required. Browse our verified listings today.</p>
        </section>
      </main>

      <footer className="bg-blue-800 py-8 mt-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About StudyStay</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-300">Our Story</a></li>
                <li><a href="#" className="hover:text-orange-300">How It Works</a></li>
                <li><a href="#" className="hover:text-orange-300">Safety Measures</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Students</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-300">Find a Sublease</a></li>
                <li><a href="#" className="hover:text-orange-300">List Your Space</a></li>
                <li><a href="#" className="hover:text-orange-300">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-300">FAQs</a></li>
                <li><a href="#" className="hover:text-orange-300">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-300">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-orange-300"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
                <a href="#" className="hover:text-orange-300"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207  1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg></a>
                <a href="#" className="hover:text-orange-300"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2024 StudyStay. All rights reserved.</p>
            <p className="mt-2">Trusted by universities worldwide. Licensed and insured.</p>
          </div>
        </div>
      </footer>

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
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Thank You for Joining!</h2>
              <p className="text-gray-600 mb-4">
                You've been successfully added to our database. We'll be in touch shortly with exciting opportunities for your study abroad housing.
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}