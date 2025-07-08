import { motion } from "framer-motion"
import { ArrowRight, CircleHelp } from "lucide-react"
import { leagueSpartan } from "@/utils/fonts"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import PropertyCarousel from "@/components/PropertyCarousel"
import StudyStayFooter from "@/components/StudyStayFooter"

export default function LandingPage() {
    const router = useRouter()

    return (
        <div className={`min-h-screen ${leagueSpartan.className} overflow-hidden`}>
            {/* Header */}
            <header className="w-full absolute top-0 z-10">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/in" className="flex items-center space-x-2">
                        <div className="relative w-20 h-20">
                            <Image src="/favicon.png" alt="favicon" fill className="object-contain" />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6 text-blue-800 font-medium text-lg">
                        <Link href="/">Home</Link>
                        <Link href="/subletting">Subletting</Link>
                        <Link href="/about">About Us</Link>
                        <Link href="/resources">Resources</Link>
                    </nav>
                </div>
            </header>

            {/* Split Screen Content */}
            <div className="flex min-h-screen mb-8">
                {/* Left Section - Blue Background */}
                <motion.div
                    className="flex-1 bg-blue-700 flex flex-col justify-center items-start px-12 lg:px-20"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-lg">
                        <motion.h1
                            className="text-white text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            studystay:
                        </motion.h1>

                        <motion.p
                            className="text-white text-2xl lg:text-3xl font-light mb-12 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            subletting for students <span className="underline decoration-2 underline-offset-4">made easy</span>
                        </motion.p>

                        <motion.button
                            className="bg-white text-blue-700 px-10 py-4 rounded-lg font-semibold text-xl hover:bg-gray-50 transition-colors shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            onClick={() => router.push("/about")}
                        >
                            Learn More
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right Section - Light Background */}
                <motion.div
                    className="flex-1 bg-gray-50 flex flex-col justify-center items-center px-12 lg:px-20"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-lg w-full">
                        <motion.h2
                            className="text-blue-700 text-5xl lg:text-6xl font-bold mb-6 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Get Started
                        </motion.h2>

                        <motion.p
                            className="text-gray-700 text-2xl mb-12 text-center font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            I want to...
                        </motion.p>

                        <div className="space-y-6">
                            <motion.button
                                onClick={() => router.push("/in")}
                                className="w-full bg-blue-400 hover:bg-blue-500 text-white px-10 py-5 rounded-lg font-semibold text-xl transition-colors flex items-center justify-center group shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                Find a Sublet
                                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            <motion.button
                                onClick={() => router.push("/onboarding")}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-lg font-semibold text-xl transition-colors flex items-center justify-center group shadow-lg"
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

            <PropertyCarousel/>

            {/* Additional Content Sections */}
            <main className="container mx-auto px-4">

                <section className="text-center mt-10 mb-20 bg-white py-16 rounded-xl">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-4 text-black">How It Works</h2>
                        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
                            Our simple process helps connect student hosts with reliable renters
                        </p>

                        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
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
                                <div key={index} className="flex flex-col items-center">
                                    <div className="relative mb-6">
                                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl mb-2">
                                            {step.icon}
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                                            {step.step}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-black">{step.title}</h3>
                                    <p className="text-gray-600 mb-3 text-center leading-relaxed">{step.description}</p>
                                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        {step.userType}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="flex flex-col items-center md:w-3/4 w-full mx-auto mb-16 mt-10">
                    <motion.div
                        className="bg-white p-16 rounded-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="flex flex-col items-center justify-center mb-6">
                            <CircleHelp className="mr-2 h-12 w-12 text-blue-800 mb-4" />
                            <h2 className="text-4xl font-semibold text-blue-800">Why use studystay?</h2>
                        </div>
                        <div className="text-lg space-y-6">
                            <p>
                                Subletting your space or finding a sublet to take over is a <b>notoriously difficult process</b>. Here's
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
                                    <h3 className="font-bold text-blue-800 mb-2">4) We're made for students, by students</h3>
                                    <p>
                                        At studystay, we've experienced the current subletting system firsthand and we are dedicated to
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
