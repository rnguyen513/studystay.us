import { useState } from 'react'
import { X } from 'lucide-react'
//import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

import { leagueSpartan } from '@/utils/fonts'
import Header from '@/components/header'
import SearchBar from '@/components/SearchBar'
import ListingsArray from '@/components/ListingsArray'
import { tempListings } from '@/utils/tempData'
import SearchResults from '@/components/SearchResults'
import { useRouter } from 'next/navigation'

const mapContainerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: 37.7749, // Centered on Virginia, USA
  lng: -79.3262
}

export default function LandingPage() {
  const [showTotalBeforeTaxes, setShowTotalBeforeTaxes] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const router = useRouter();

  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your actual API key
  // })

  return (
    <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>

      <Header/>

      <main className="container mx-auto px-4 py-8">
        <SearchBar/>
        {/* <ListingsArray listings={tempListings}/> */}
        <SearchResults searchQuery={""} date={""} home={true}/>
      </main>

      {/* <button
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full font-semibold shadow-lg z-10"
        onClick={() => setShowMap(!showMap)}
      >
        {showMap ? 'Show list' : 'Show map'}
      </button> */}


      {/* map */}
      {showMap && (
        <div className="fixed inset-0 z-50 bg-white">
          <button
            className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow-md"
            onClick={() => setShowMap(false)}
          >
            <X className="w-6 h-6" />
          </button>
          {/* {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={7}
            >
              {listings.map((listing, index) => (
                <Marker
                  key={index}
                  position={{ lat: listing.lat, lng: listing.lng }}
                  label={{
                    text: `$${listing.price}`,
                    className: 'bg-white px-2 py-1 rounded-full text-sm font-semibold',
                  }}
                />
              ))}
            </GoogleMap>
          ) : (
            <div>Loading map...</div>
          )} */}
          <div>
            <img src="https://cdn.britannica.com/51/93451-050-4C57C2D5/Shrek-sidekick-Donkey.jpg"/>
          </div>
        </div>
      )}
    </div>
  )
}