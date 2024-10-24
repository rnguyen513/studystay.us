import { Menu, User, House } from "lucide-react"
import Link from "next/link";
import AuthPopup from "@/components/AuthPopup";
import { leagueSpartan } from "@/utils/fonts";
import { useSession, signOut, signIn } from "next-auth/react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const [showAuth, setShowAuth] = useState(false);

  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status != "authenticated") return;

    try {
      fetch("/api/firebaselink/confirmuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: data?.user?.email,
          picture: data?.user?.image
        })
      }).then(res => res.json()).then(data => {
        console.log("data returned from /api/firebaselink/confirmuser:", data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [status]);

    return (
      <>
        <header className={`border-b z-100 ${leagueSpartan.className}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-[#004aad] text-2xl font-extrabold"><Link href="/airbnb-style-landing">studystay</Link></div>
          <div className="hidden md:flex space-x-4 absolute left-1/2 transform -translate-x-1/2 text-[#004aad]">
            <a href="#" className="font-bold">Looking</a>
            <a>|</a>
            <a href="#" className="">Leasing</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hidden md:block text-sm font-semibold hover:bg-gray-100 px-4 py-2 rounded-full transition-colors duration-200 blur-sm">StudyStay your place</a>
            <button className="p-2 rounded-full hover:bg-gray-100 blur-sm">
              <House className="w-5 h-5" />
            </button>
            {status == "unauthenticated" || status == "loading" ? (
                <button onClick={() => setShowAuth(true)} className="flex items-center space-x-2 border rounded-full p-2 hover:shadow-md">
                  <Menu className="w-5 h-5" />
                  <User className="w-6 h-6 text-[#004aad]" />
                </button>
            ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex items-center space-x-2 border rounded-full p-2 hover:shadow-md">
                      <Menu className="w-5 h-5" />
                      <img src={data?.user?.image || ""} className="w-6 h-6 rounded-full"></img>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="font-semibold w-56 p-2">
                    {/* <DropdownMenuLabel>Menu label</DropdownMenuLabel>
                    <DropdownMenuSeparator></DropdownMenuSeparator> */}
                    {/* <DropdownMenuItem onClick={() => router.push("/profile")} className="py-2 text-gray-500">My profile</DropdownMenuItem> */}
                    <DropdownMenuItem className="py-2 hover:cursor-pointer">Saved stays</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()} className="py-2 hover:cursor-pointer">Sign out</DropdownMenuItem>
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