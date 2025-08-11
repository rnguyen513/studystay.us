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
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                            <Image src="/favicon.png" alt="favicon" fill className="object-contain" />
                        </div>
                    </Link>

                    {/* Right controls */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile: show 'List a lease' */}
                        <div className="md:hidden mt-1">
                            <a
                                onClick={() =>
                                    userData?.user?.confirmed_at
                                        ? router.push("/onboarding")
                                        : setShowAuth(true)
                                }
                                className="text-[#004aad] font-semibold hover:cursor-pointer"
                            >
                                List a sublet
                            </a>
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
                                <DropdownMenuContent className="font-semibold w-56 p-2">
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
