import { useState } from 'react'

import { leagueSpartan } from '@/utils/fonts'
import Header from '@/components/header'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/SearchResults'
import StudyStayFooter from '@/components/StudyStayFooter'
import ListingsArray from '@/components/ListingsArray'

import { tempListings } from '@/utils/tempData'
import SeoHead from '@/components/SeoHead'
import { useProfileCheck } from '@/utils/hooks/useProfileCheck'

export default function LandingPage() {
    const [numListings, setNumListings] = useState<number>(0);
    
    // Check if user profile is complete, redirect if not
    const { isProfileComplete, user, showBanner } = useProfileCheck();

    // If profile is not complete, this will automatically redirect
    // If profile is complete, show the normal page content
    return (
        <>
            <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden flex flex-col`}>
                <SeoHead/>
                <Header />
                <main className="container mx-auto px-4 py-8 flex-1">
                    {/* Profile completion reminder banner - only show once per session */}
                    {user && showBanner() && (
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-blue-800 font-medium">Welcome back, {user.email?.split('@')[0]}!</p>
                                        <p className="text-blue-600 text-sm">Your profile is complete and you have full access to StudyStay.</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => window.location.href = `/profile/${user.id}`}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    )}
                    
                    <div>
                        <div className="mb-5">
                            <h1 className="font-bold text-3xl">Current <a className="text-[#004aad]">studystay</a> sublets</h1>
                            <h3>Price negotiable!</h3>
                        </div>
                        {/* <ListingsArray listings={tempListings}/> */}
                        <SearchResults searchQuery={""} date={""} home={true} setNumListings={setNumListings} randomized={true} />
                    </div>
                    {/* <hr className="my-10"/> */}
                    {/* <SearchBar numListings={numListings}/>
        <SearchResults searchQuery={""} date={""} home={true} setNumListings={setNumListings} randomized={true}/> */}
                </main>
                <StudyStayFooter />
            </div>
        </>
    )
}