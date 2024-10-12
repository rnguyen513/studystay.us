import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, Home, Users } from 'lucide-react'

export default function LandingPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Submitted email:', email)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-blue-100">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-800">StudyStay</div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-blue-800 hover:text-orange-500 transition-colors">How it works</a></li>
            <li><a href="#" className="text-blue-800 hover:text-orange-500 transition-colors">Listings</a></li>
            <li><a href="#" className="text-blue-800 hover:text-orange-500 transition-colors">About us</a></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <motion.h1 
            className="text-6xl font-bold mb-6 text-blue-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Find Your Home Away From Home
          </motion.h1>
          <motion.p 
            className="text-2xl text-orange-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Connect with fellow students for safe and affordable subleases while studying abroad.
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
              className="px-4 py-3 w-64 rounded-l-lg border-2 border-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-3 rounded-r-lg hover:bg-orange-600 transition-colors text-lg font-semibold"
            >
              Join Now
            </button>
          </motion.form>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Globe, title: "Global Network", description: "Connect with students from universities worldwide" },
            { icon: Home, title: "Verified Listings", description: "Safe and vetted sublease opportunities" },
            { icon: Users, title: "Community Support", description: "Get help from fellow students and our team" },
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 * index }}
              whileHover={{ scale: 1.05 }}
            >
              <feature.icon className="w-16 h-16 mx-auto mb-4 text-orange-500" />
              <h2 className="text-2xl font-semibold mb-2 text-blue-800">{feature.title}</h2>
              <p className="text-orange-700">{feature.description}</p>
            </motion.div>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 text-blue-800">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Sarah L.", quote: "StudyStay made finding a place to live during my semester abroad so much easier!" },
              { name: "Alex M.", quote: "I was able to sublet my apartment quickly and to a fellow student I could trust." },
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border-2 border-orange-500"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-blue-800 mb-4 text-lg">&quot;{testimonial.quote}&quot;</p>
                <p className="font-semibold text-orange-700">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-bold mb-6 text-blue-800">Ready to Get Started?</h2>
          <motion.div
            className="inline-flex items-center bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#" className="text-xl font-semibold">Find Your Stay</a>
            <ArrowRight className="ml-2 w-6 h-6" />
          </motion.div>
        </section>
      </main>

      <footer className="bg-blue-800 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-white">
          <p>&copy; 2023 StudyStay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}