import { motion } from "framer-motion"
import { leagueSpartan } from "@/utils/fonts"
import Link from "next/link"
import Header from "@/components/header"

export default function Flyer() {
  return (
    <div className={`min-h-screen w-full overflow-hidden bg-white ${leagueSpartan.className}`}>
      <Header />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-14 mb-28 px-4 w-full flex justify-center"
      >
        <div className="w-full max-w-3xl text-center space-y-10">
          <h1 className="text-5xl font-extrabold text-blue-800">Welcome to StudyStay</h1>
          <p className="text-4xl text-[#F7CC85] font-bold">
            We will buy your sublease!
          </p>

          <div className="text-left bg-gray-100 rounded-xl p-6 space-y-6">
            <h2 className="text-2xl font-bold text-blue-800 text-center">How It Works</h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-800">
              <li>
                <strong>Sellers:</strong> List your sublease and,
                <ul className="list-disc ml-6 mt-1">
                  <li><strong>Sell immediately</strong> to StudyStay for a guaranteed price.</li>
                  <li><strong>Post to market</strong> starting at 50% of your rent, and will change based on market demand.</li>
                </ul>
              </li>
              <li>
                <strong>Buyers:</strong> Browse listings to snatch up underpriced gems as they fall with time.
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              href="/in"
              className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-md text-lg transition"
            >
              Browse Listings →
            </Link>
            <Link
              href="/onboarding"
              className="border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-semibold px-8 py-3 rounded-md text-lg transition"
            >
              List Your Place (requires an account) →
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
