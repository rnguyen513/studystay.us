import { motion } from "framer-motion"
import { ArrowRight, CircleHelp } from "lucide-react"
import { leagueSpartan } from "@/utils/fonts"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import PropertyCarousel from "@/components/PropertyCarousel"
import StudyStayFooter from "@/components/StudyStayFooter"
import Header from "@/components/header"

import SeoHead from "@/components/SeoHead"

export default function LandingPage() {
    const router = useRouter()

    return (
        <div className={`min-h-screen ${leagueSpartan.className} overflow-x-hidden`}>

            <SeoHead/>

            {/* Header */}
            <header className="fixed w-full z-10 bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                            <Image src="/favicon.png" alt="favicon" fill className="object-contain" />
                        </div>
                    </Link>
                    <nav className="hidden md:flex space-x-6 text-blue-800 font-medium text-sm sm:text-base">
                        <Link href="/in">Home</Link>
                        <Link href="/in">Subletting</Link>
                        <Link href="/about">About Us</Link>
                        <Link href="/about">Resources</Link>
                    </nav>
                </div>
            </header>

            {/* Split Screen Content */}
            <div className="flex flex-col lg:flex-row min-h-screen pt-20 mb-8">
                {/* Left Section */}
                <motion.div
                    className="w-full lg:w-1/2 bg-blue-700 flex flex-col justify-center items-start px-6 sm:px-12 py-16"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-lg">
                        <motion.h1
                            className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            studystay:
                        </motion.h1>

                        <motion.p
                            className="text-white text-xl sm:text-2xl lg:text-3xl font-light mb-12 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            subletting for students <span className="underline decoration-2 underline-offset-4">made easy</span>
                        </motion.p>

                        <motion.button
                            className="bg-white text-blue-700 px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-lg sm:text-xl hover:bg-gray-50 transition-colors shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            onClick={() => router.push("/in")}
                        >
                            Continue
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right Section */}
                <motion.div
                    className="w-full lg:w-1/2 bg-gray-50 flex flex-col justify-center items-center px-6 sm:px-12 py-16"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-lg w-full">
                        <motion.h2
                            className="text-blue-700 text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Get Started
                        </motion.h2>

                        <motion.p
                            className="text-gray-700 text-lg sm:text-xl mb-12 text-center font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            I want to...
                        </motion.p>

                        <div className="space-y-6">
                            <motion.button
                                onClick={() => router.push("/in")}
                                className="w-full bg-blue-400 hover:bg-blue-500 text-white px-6 py-4 sm:px-10 sm:py-5 rounded-lg font-semibold text-lg sm:text-xl transition-colors flex items-center justify-center group shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                Find a Sublet
                                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            <motion.button
                                onClick={() => router.push("/onboarding")}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 sm:px-10 sm:py-5 rounded-lg font-semibold text-lg sm:text-xl transition-colors flex items-center justify-center group shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                Post a Sublet
                                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <PropertyCarousel />

            {/* How It Works Section */}
            <main className="container mx-auto px-4">
                <section className="text-center mt-10 mb-20 bg-white py-16 rounded-xl">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black">How It Works</h2>
                    <p className="text-gray-600 text-base sm:text-lg mb-12 max-w-2xl mx-auto">
                        StudyStay helps UVA students find verified, secure, off-campus sublets in Charlottesville. Whether you&apos;re going abroad or need temporary housing near the University of Virginia, StudyStay makes student housing easier.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                step: 1,
                                icon: "🏠",
                                title: "List Your Space",
                                description: "Create a detailed listing with photos, amenities, and preferences",
                                userType: "Host",
                            },
                            {
                                step: 2,
                                icon: "🔍",
                                title: "Find Your Sublet",
                                description: "Browse verified listings and express interest in your favorites",
                                userType: "Renter",
                            },
                            {
                                step: 3,
                                icon: "📋",
                                title: "Connect & Sign",
                                description: "Our team helps finalize the match and handles document signing",
                                userType: "Both",
                            },
                            {
                                step: 4,
                                icon: "💳",
                                title: "Secure Payment",
                                description: "Pay and receive rent through our secure payment system",
                                userType: "Both",
                            },
                        ].map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl mb-2">
                                        {step.icon}
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                                        {step.step}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-black">{step.title}</h3>
                                <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                    {step.userType}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Section */}
                <section className="flex flex-col items-center w-full md:w-3/4 mx-auto mb-16 mt-10 px-4">
                    <motion.div
                        className="bg-white p-6 sm:p-10 rounded-xl w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="flex flex-col items-center justify-center mb-6">
                            <CircleHelp className="h-10 w-10 sm:h-12 sm:w-12 text-blue-800 mb-4" />
                            <h2 className="text-2xl sm:text-4xl font-semibold text-blue-800 text-center">Why use studystay?</h2>
                        </div>
                        <div className="text-base sm:text-lg space-y-6 text-gray-700">
                            <p>
                                Subletting your space or finding a sublet to take over is a <b>notoriously difficult process</b>. Here&apos;s
                                what studystay does to make it easy:
                            </p>

                            <div className="space-y-5">
                                <div>
                                    <h3 className="font-bold text-blue-800 mb-2">1) We authenticate our users and our listings</h3>
                                    <p>
                                        Many other platforms like housing group chats are rampant with scams. <b className="text-blue-800">studystay</b> lets you worry less.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-blue-800 mb-2">2) We streamline the sublet process</h3>
                                    <p>
                                        As a seller, you can have your listing up in a few simple steps. As a buyer, you can sort through
                                        listings to find ones that meet your criteria.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-blue-800 mb-2">3) We have a secure payment system</h3>
                                    <p>Transactions on studystay are processed securely and minimize risk.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-blue-800 mb-2">4) We&apos;re made for students, by students</h3>
                                    <p>
                                        At studystay, we&apos;ve experienced the current subletting system firsthand and we are dedicated to
                                        making it a better experience for everyone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>

            <StudyStayFooter />
        </div>
    )
}
