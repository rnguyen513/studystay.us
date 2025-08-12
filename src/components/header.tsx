import { Menu, User } from "lucide-react"
import Link from "next/link";
import Image from "next/image";
import AuthPopup from "@/components/AuthPopup";
import { leagueSpartan } from "@/utils/fonts";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/component";
import type { User as SupabaseUser } from "@supabase/supabase-js";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
    const [showAuth, setShowAuth] = useState(false);
    const [userData, setUserData] = useState<{ user: SupabaseUser | null } | null>(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const { data } = await supabase.auth.getUser();
            setUserData(data);
        }
        fetchUserData();
    }, [supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUserData(null);
        router.push("/in");
    }

    const fullEmail = userData?.user?.email || "";
    const shortEmail = fullEmail.split("@")[0];

    return (
        <>
            <header className={`border-b z-100 ${leagueSpartan.className}`}>
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/in" className="flex items-center space-x-2">
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                            <Image src="/favicon.png" alt="favicon" fill className="object-contain" />
                        </div>
                    </Link>

                    {/* Main Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {/* Home */}
                        <Link 
                            href="/in" 
                            className="text-gray-700 hover:text-[#004aad] font-medium transition-colors"
                        >
                            Home
                        </Link>

                        {/* Subletting Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="text-gray-700 hover:text-[#004aad] font-medium transition-colors flex items-center space-x-1">
                                <span>Subletting</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className={`font-medium w-48 p-2 ${leagueSpartan.className}`}>
                                <DropdownMenuItem
                                    onClick={() => router.push("/onboarding")}
                                    className="py-2 hover:cursor-pointer"
                                >
                                    Post a Sublet
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => router.push("/in")}
                                    className="py-2 hover:cursor-pointer"
                                >
                                    Find a Sublet
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* List a Sublet Button */}
                        <button
                            onClick={() =>
                                userData?.user?.confirmed_at
                                    ? router.push("/onboarding")
                                    : setShowAuth(true)
                            }
                            className="bg-[#004aad] hover:bg-[#003d8f] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            List a Sublet
                        </button>

                        {/* About Us */}
                        <Link 
                            href="/sublet-resources" 
                            className="text-gray-700 hover:text-[#004aad] font-medium transition-colors"
                        >
                            About Us
                        </Link>

                        {/* Resources Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="text-gray-700 hover:text-[#004aad] font-medium transition-colors flex items-center space-x-1">
                                <span>Resources</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className={`font-medium w-56 p-2 ${leagueSpartan.className}`}>
                                <DropdownMenuItem
                                    onClick={() => window.open('/studystay-seller-agreement.pdf', '_blank')}
                                    className="py-2 hover:cursor-pointer"
                                >
                                    Buyer + Seller Agreement
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => router.push("/terms-and-conditions")}
                                    className="py-2 hover:cursor-pointer"
                                >
                                    Terms and Conditions
                                </DropdownMenuItem>
                                
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>

                    {/* Right controls */}
                    <div className="flex items-center space-x-4">
                                            {/* Mobile Navigation */}
                    <div className="lg:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="text-gray-700 hover:text-[#004aad] font-medium transition-colors p-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className={`font-medium w-64 p-2 ${leagueSpartan.className}`}>
                                <DropdownMenuItem
                                    onClick={() => router.push("/in")}
                                    className="py-3 text-lg hover:cursor-pointer"
                                >
                                    Home
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => router.push("/onboarding")}
                                    className="py-3 text-lg hover:cursor-pointer"
                                >
                                    Post a Sublet
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => router.push("/in")}
                                    className="py-3 text-lg hover:cursor-pointer"
                                >
                                    Find a Sublet
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => router.push("/sublet-resources")}
                                    className="py-3 text-lg hover:cursor-pointer"
                                >
                                    About Us
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => window.open('/studystay-seller-agreement.pdf', '_blank')}
                                    className="py-3 text-lg hover:cursor-pointer"
                                >
                                    Buyer + Seller Agreement
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => router.push("/terms-and-conditions")}
                                    className="py-3 text-lg hover:cursor-pointer"
                                >
                                    Terms and Conditions
                                </DropdownMenuItem>
                                
                                {/* <DropdownMenuItem
                                    onClick={() => router.push("/contact")}
                                    className="py-3 text-lg hover:cursor-pointer"
                                >
                                    Contact Us
                                </DropdownMenuItem> */}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                        {/* Auth / profile */}
                        {!userData?.user ? (
                            <button
                                onClick={() => setShowAuth(true)}
                                className="flex items-center space-x-2 border rounded-full p-2 hover:shadow-md"
                            >
                                <Menu className="w-5 h-5" />
                                <User className="w-6 h-6 text-[#004aad]" />
                            </button>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="flex items-center space-x-2 border rounded-full p-2 hover:shadow-md max-w-[180px] md:max-w-none overflow-hidden">
                                        <Menu className="w-5 h-5 shrink-0" />
                                        <span className="truncate text-sm font-bold text-black">
                                            <span className="md:hidden">{shortEmail}</span>
                                            <span className="hidden md:inline">{fullEmail}</span>
                                        </span>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className={`font-semibold w-56 p-2 ${leagueSpartan.className}`}>
                                    <DropdownMenuItem
                                        onClick={() => router.push("/onboarding")}
                                        className={`${leagueSpartan.className} text-xl py-2 hover:cursor-pointer`}
                                    >
                                        List a<a className="text-[#004aad]">stay</a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => router.push("/mylistings")}
                                        className={`${leagueSpartan.className} text-xl py-2 hover:cursor-pointer`}
                                    >
                                        My listings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => router.push(`/profile/${userData?.user?.id}`)}
                                        className={`${leagueSpartan.className} text-xl py-2 hover:cursor-pointer`}
                                    >
                                        My profile
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => router.push("/savedlistings")}
                                        className={`${leagueSpartan.className} text-xl py-2 hover:cursor-pointer`}
                                    >
                                        Saved stays
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={handleSignOut}
                                        className={`${leagueSpartan.className} text-xl py-2 hover:cursor-pointer`}
                                    >
                                        Sign out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </header>

            {showAuth && (
                <div className="z-50">
                    <AuthPopup onClose={() => setShowAuth(false)} />
                </div>
            )}
        </>
    );
}

export default Header;
