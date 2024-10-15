import { useState, useEffect, FormEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
//import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

import { afacad } from '@/utils/fonts'
import Header from '@/components/header'
import SearchBar from '@/components/SearchBar'
import ListingsArray from '@/components/ListingsArray'
import { tempListings, categoryIcons } from '@/utils/tempData'

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

  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your actual API key
  // })

  return (
    <div className={`min-h-screen bg-white text-black ${afacad.className} text-xl`}>

      <Header/>

      <main className="container mx-auto px-4 py-8">
        <SearchBar/>
        <hr className="hidden md:flex mb-8"/>


        {/*subheader*/}
        <div className="flex items-start justify-between content-center mb-8">
          <div className="relative flex-grow overflow-hidden mr-4">
            <div className="flex space-x-8 overflow-x-auto pb-4 px-4 md:px-8 categories-scroll">
              {categoryIcons.map((label, index) => (
                <button key={index} className={`flex flex-col items-center space-y-2 ${index === 0 ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}>
                  <img src={label.thumbnail} alt={label.text} className="w-6 h-6" />
                  <span className="text-xs whitespace-nowrap">{label.text}</span>
                </button>
              ))}
            </div>
            <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent"></div>
            <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent"></div>
          </div>
          <div className="space-x-4 hidden md:flex">
            <button className="flex items-center space-x-2 border rounded-lg px-4 py-2 whitespace-nowrap hover:bg-gray-100 hover:border-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-sm font-semibold">Filters</span>
            </button>
            <div className="flex items-center space-x-2 border rounded-lg px-4 py-2">
              <span className="text-sm whitespace-nowrap">Display total before taxes</span>
              <button
                className={`w-12 h-6 rounded-full p-1 ${showTotalBeforeTaxes ? 'bg-black' : 'bg-gray-300'}`}
                onClick={() => setShowTotalBeforeTaxes(!showTotalBeforeTaxes)}
              >
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${showTotalBeforeTaxes ? 'translate-x-6' : ''}`} />
              </button>
            </div>
          </div>
        </div>


        {/*listings*/}
        <ListingsArray listings={tempListings}/>
      </main>

      <button
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full font-semibold shadow-lg z-10"
        onClick={() => setShowMap(!showMap)}
      >
        {showMap ? 'Show list' : 'Show map'}
      </button>


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