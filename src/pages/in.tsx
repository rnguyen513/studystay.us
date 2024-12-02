import { useState } from 'react'
//import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

import { leagueSpartan } from '@/utils/fonts'
import Header from '@/components/header'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/SearchResults'
import StudyStayFooter from '@/components/StudyStayFooter'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const [numListings, setNumListings] = useState<number>(0);

  const router = useRouter();

  return (
    <>
    <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>
      <Header/>
      <main className="container mx-auto px-4 py-8">
        <SearchBar numListings={numListings}/>
        <SearchResults searchQuery={""} date={""} home={true} setNumListings={setNumListings} randomized={true}/>
      </main>
    </div>
    <StudyStayFooter/>
    </>
  )
}