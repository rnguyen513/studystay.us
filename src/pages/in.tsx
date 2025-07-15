import { useState } from 'react'

import { leagueSpartan } from '@/utils/fonts'
import Header from '@/components/header'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/SearchResults'
import StudyStayFooter from '@/components/StudyStayFooter'
import ListingsArray from '@/components/ListingsArray'

import { tempListings } from '@/utils/tempData'
import SeoHead from '@/components/SeoHead'

export default function LandingPage() {
    const [numListings, setNumListings] = useState<number>(0);

    return (
        <>
            <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>
                <SeoHead/>
                <Header />
                <main className="container mx-auto px-4 py-8">
                    <div>
                        <div className="mb-5 text-red-400">
                            <h1 className="font-bold text-3xl">StudyStay last minute sublets</h1>
                            <h3>Up to 60-70% off this summer!</h3>
                        </div>
                        {/* <ListingsArray listings={tempListings}/> */}
                        <SearchResults searchQuery={""} date={""} home={true} setNumListings={setNumListings} randomized={true} />
                    </div>
                    {/* <hr className="my-10"/> */}
                    {/* <SearchBar numListings={numListings}/>
        <SearchResults searchQuery={""} date={""} home={true} setNumListings={setNumListings} randomized={true}/> */}
                </main>
            </div>
            <StudyStayFooter />
        </>
    )
}