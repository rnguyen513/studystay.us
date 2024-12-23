import { Menu, User, House } from "lucide-react"
import Link from "next/link";
import AuthPopup from "@/components/AuthPopup";
import { leagueSpartan } from "@/utils/fonts";

import { useState, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";

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
  const [userData, setUserData] = useState<{user: SupabaseUser | null} | null>(null);
  const supabase = createClient();

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUserData(data);
      console.log("data:", data);
    }
    fetchUserData();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserData(null);
    router.push("/in");
  }

  // const { data, status } = useSession();

  // useEffect(() => {
  //   if (status != "authenticated") return;

  //   try {
  //     fetch("/api/firebaselink/confirmuser", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         email: data?.user?.email,
  //         picture: data?.user?.image
  //       })
  //     }).then(res => res.json()).then(data => {
  //       console.log("data returned from /api/firebaselink/confirmuser:", data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [status]);

    return (
      <>
        <header className={`border-b z-100 ${leagueSpartan.className}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-[#004aad] text-2xl font-extrabold"><Link href="/">studystay</Link></div>
          <div className="hidden md:flex space-x-4 absolute left-1/2 transform -translate-x-1/2 text-[#004aad]">
            <Link href="/in" className="font-bold">Find a sublease</Link>
            <a>|</a>
            <a onClick={() => userData?.user?.confirmed_at ? router.push("/onboarding") : setShowAuth(true)} className="hover:cursor-pointer">List a lease</a>
          </div>
          <div className="flex items-center space-x-4">
            {/* <a href="#" className="hidden md:block text-sm font-semibold hover:bg-gray-100 px-4 py-2 rounded-full transition-colors duration-200 blur-sm pointer-events-none">StudyStay your place</a>
            <button className="p-2 rounded-full hover:bg-gray-100 blur-sm pointer-events-none">
              <House className="w-5 h-5" />
            </button> */}
            {/* {status == "unauthenticated" || status == "loading" ? (
                <button onClick={() => setShowAuth(true)} className="flex items-center space-x-2 border rounded-full p-2 hover:shadow-md">
                  <Menu className="w-5 h-5" />
                  <User className="w-6 h-6 text-[#004aad]" />
                </button>
            ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex items-center space-x-2 border rounded-full p-2 hover:shadow-md">
                      <Menu className="w-5 h-5" /> */}
                      {/* <img src={data?.user?.image || ""} className="w-6 h-6 rounded-full"></img> */}
                      {/* <img src="" className="w-6 h-6 rounded-full"></img>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="font-semibold w-56 p-2"> */}
                    {/* <DropdownMenuLabel>Menu label</DropdownMenuLabel>
                    <DropdownMenuSeparator></DropdownMenuSeparator> */}
                    {/* <DropdownMenuItem onClick={() => router.push("/profile")} className="py-2 text-gray-500">My profile</DropdownMenuItem> */}
                    {/* <DropdownMenuItem className="py-2 hover:cursor-pointer">Saved stays</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()} className="py-2 hover:cursor-pointer">Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            )} */}
            {!userData?.user ? (
                <button onClick={() => setShowAuth(true)} className="flex items-center space-x-2 border rounded-full p-2 hover:shadow-md">
                  <Menu className="w-5 h-5" />
                  <User className="w-6 h-6 text-[#004aad]" />
                </button>
            ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex items-center space-x-2 border rounded-full p-2 hover:shadow-md">
                      <Menu className="w-5 h-5" />
                      {/* <img src={data?.user?.image || ""} className="w-6 h-6 rounded-full"></img> */}
                      {/* <img src="" alt={userData.user.email?.split("")[0]} className="w-6 h-6 rounded-full"></img> */}
                      <a className="rounded-full text-sm font-bold">{userData.user.email}</a>
                      {/* <User className="w-6 h-6 text-[#004aad]"/> */}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="font-semibold w-56 p-2">
                    {/* <DropdownMenuLabel>Menu label</DropdownMenuLabel>
                    <DropdownMenuSeparator></DropdownMenuSeparator> */}
                    {/* <DropdownMenuItem onClick={() => router.push("/profile")} className="py-2 text-gray-500">My profile</DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => router.push("/onboarding")} className={`${leagueSpartan.className} text-xl py-2 hover:cursor-pointer`}>List a<a className="text-[#004aad]">stay</a></DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/mylistings")} className={`${leagueSpartan.className} text-xl py-2 hover:cursor-pointer`}>My listings</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => router.push("/savedlistings")} className={`${leagueSpartan.className} text-xl py-2 hover:cursor-pointer`}>Saved stays</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className={`${leagueSpartan.className} text-xl py-2 hover:cursor-pointer`}>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      {showAuth && <div className="z-50">
        <AuthPopup onClose={() => setShowAuth(false)}/>
      </div>}
    </>
    )
}

export default Header;