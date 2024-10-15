import { Globe, Menu, User } from "lucide-react"
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthPopup from "@/components/AuthPopup";

import { useState } from "react";

const Header = () => {
  const [showAuth, setShowAuth] = useState(false);

    const router = useRouter();
    return (
      <>
        <header className="border-b z-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-blue-600 text-3xl font-black"><Link href="/airbnb-style-landing">studystay</Link></div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hidden md:block text-sm font-semibold hover:bg-gray-100 px-4 py-2 rounded-full transition-colors duration-200">StudyStay your home</a>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Globe className="w-5 h-5" />
            </button>
            <button onClick={() => setShowAuth(true)} className="flex items-center space-x-2 border rounded-full p-2 hover:shadow-md">
              <Menu className="w-5 h-5" />
              <User className="w-6 h-6 text-gray-500"/>
            </button>
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