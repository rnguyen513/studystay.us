import { useState, useEffect } from 'react'
import { Search, Globe, Menu, User, Heart, MapPin, X, ChevronLeft, ChevronRight, Star } from 'lucide-react'
//import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

import afacad from '@/utils/fonts'

const mapContainerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: 37.7749, // Centered on Virginia, USA
  lng: -79.3262,
}

const ImageCarousel = ({ images }:any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Match this with the transition duration in CSS
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="relative w-full pb-[66.67%] rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex transition-transform duration-300 ease-in-out"
           style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image:any, index:any) => (
          <img
            key={index}
            src={image}
            alt={`Listing image ${index + 1}`}
            className="flex-shrink-0 w-full h-full object-cover"
          />
        ))}
      </div>
      <button 
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-4 h-4 text-gray-800" />
      </button>
      <button 
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="w-4 h-4 text-gray-800" />
      </button>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {images.map((_:any, index:any) => (
          <div 
            key={index} 
            className={`w-1.5 h-1.5 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function LandingPage() {
  const [showTotalBeforeTaxes, setShowTotalBeforeTaxes] = useState(false)
  const [showMap, setShowMap] = useState(false)

  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your actual API key
  // })

  const listings = [
    { 
      location: 'Penhook, Virginia', 
      views: 'Mountain and lake views', 
      dates: 'Oct 20 - 25', 
      price: 900, 
      rating: 4.96, 
      lat: 37.0024, 
      lng: -79.6397,
      images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/d6226d33-5397-43b6-8806-9c9f2ffdacef.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/d051d89a-be7d-47ac-b368-21e9a6b3e4ec.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/bc78c584-9b93-4eaf-be31-7c35aeca9f88.jpeg?im_w=720',
      ]
    },
    { 
      location: 'Broadway, Virginia', 
      views: 'Mountain and valley views', 
      dates: 'Nov 18 - 23', 
      price: 225, 
      rating: 4.94, 
      lat: 38.6126, 
      lng: -78.7992,
      images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/a701c888-2d26-4bcd-bfd7-7e5ad9a5ad4d.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/7fb13042-18f0-4eb5-8361-dd15296d40c1.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/63a41d17-b31e-4ff7-afdb-58627cd22267.jpeg?im_w=720',
      ]
    },
    { 
      location: 'Luray, Virginia', 
      views: 'Mountain and park views', 
      dates: 'Nov 17 - 22', 
      price: 256, 
      rating: 5.0, 
      lat: 38.6651, 
      lng: -78.4594,
      images: [
        'https://a0.muscache.com/im/pictures/23be904d-ba59-4814-91b5-b23f82481421.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/db3bfcf3-cd0c-4884-a83a-b8b6ab206935.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/f0e49c18-15de-47d2-84c1-a1c70d5d9371.jpg?im_w=720',
      ]
    },
    { 
      location: 'Dunmore, West Virginia', 
      views: 'Mountain and lake views', 
      dates: 'Oct 13 - 18', 
      price: 121, 
      rating: 4.97, 
      lat: 38.2762, 
      lng: -79.7764,
      images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-49569025/original/96dad999-3c42-49f7-b04f-1b6616dfd126.jpeg?im_w=720',
        'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-49569025/original/d3896651-4cde-4241-afb2-2c2f29b3c2f0.jpeg?im_w=720',
        'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-49569025/original/c37eb15e-f926-4c40-8621-41a4411f429a.jpeg?im_w=720',
      ]
    },
    { 
      location: 'Dunmore, West Virginia', 
      views: 'Mountain and lake views', 
      dates: 'Oct 13 - 18', 
      price: 121, 
      rating: 4.97, 
      lat: 38.2762, 
      lng: -79.7764,
      images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-49569025/original/96dad999-3c42-49f7-b04f-1b6616dfd126.jpeg?im_w=720',
        'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-49569025/original/d3896651-4cde-4241-afb2-2c2f29b3c2f0.jpeg?im_w=720',
        'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-49569025/original/c37eb15e-f926-4c40-8621-41a4411f429a.jpeg?im_w=720',
      ]
    },
    { 
      location: 'Luray, Virginia', 
      views: 'Mountain and park views', 
      dates: 'Nov 17 - 22', 
      price: 256, 
      rating: 5.0, 
      lat: 38.6651, 
      lng: -78.4594,
      images: [
        'https://a0.muscache.com/im/pictures/23be904d-ba59-4814-91b5-b23f82481421.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/db3bfcf3-cd0c-4884-a83a-b8b6ab206935.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/f0e49c18-15de-47d2-84c1-a1c70d5d9371.jpg?im_w=720',
      ]
    },
    { 
      location: 'Penhook, Virginia', 
      views: 'Mountain and lake views', 
      dates: 'Oct 20 - 25', 
      price: 900, 
      rating: 4.96, 
      lat: 37.0024, 
      lng: -79.6397,
      images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/d6226d33-5397-43b6-8806-9c9f2ffdacef.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/d051d89a-be7d-47ac-b368-21e9a6b3e4ec.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/bc78c584-9b93-4eaf-be31-7c35aeca9f88.jpeg?im_w=720',
      ]
    },
    { 
      location: 'Broadway, Virginia', 
      views: 'Mountain and valley views', 
      dates: 'Nov 18 - 23', 
      price: 225, 
      rating: 4.94, 
      lat: 38.6126, 
      lng: -78.7992,
      images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/a701c888-2d26-4bcd-bfd7-7e5ad9a5ad4d.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/7fb13042-18f0-4eb5-8361-dd15296d40c1.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/63a41d17-b31e-4ff7-afdb-58627cd22267.jpeg?im_w=720',
      ]
    }
  ]

  return (
    <div className={`min-h-screen bg-white text-black ${afacad.className} text-xl`}>
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-blue-600 text-2xl font-bold">studystay</div>
          <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="font-semibold">Stays</a>
            <a href="#" className="text-gray-500">Experiences</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hidden md:block text-sm font-semibold hover:bg-gray-100 px-4 py-2 rounded-full transition-colors duration-200">StudyStay your home</a>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Globe className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 border rounded-full p-2 hover:shadow-md">
              <Menu className="w-5 h-5" />
              <User className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center shadow-md rounded-full border max-w-5xl w-full">
            <div className="px-6 py-2 border-r flex-1">
              <div className="text-xs font-bold">Where</div>
              <input type="text" placeholder="Search destinations" className="w-full outline-none text-sm" />
            </div>
            <div className="px-6 py-2 border-r flex-1">
              <div className="text-xs font-bold">Check in</div>
              <input type="text" placeholder="Add dates" className="w-full outline-none text-sm" />
            </div>
            <div className="px-6 py-2 border-r flex-1">
              <div className="text-xs font-bold">Check out</div>
              <input type="text" placeholder="Add dates" className="w-full outline-none text-sm" />
            </div>
            <div className="px-6 py-2 flex-1">
              <div className="text-xs font-bold">Who</div>
              <input type="text" placeholder="Add guests" className="w-full outline-none text-sm" />
            </div>
            <button className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 m-2">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        <hr className="mb-8"/>

        <div className="flex items-start justify-between content-center mb-8">
          <div className="relative flex-grow overflow-hidden mr-4">
            <div className="flex space-x-8 overflow-x-auto pb-4 px-4 md:px-8 categories-scroll">
              {[{text:'Amazing views',thumbnail:"https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg"},
               {text:'Icons',thumbnail:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png"},
               {text:'Cabins',thumbnail:"https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg"},
               {text:'Treehouses',thumbnail:"https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg"},
               {text:'Earth homes',thumbnail:"https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg"},
               {text:'Bed & breakfasts',thumbnail:"https://a0.muscache.com/pictures/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325.jpg"},
               {text:'Tiny homes',thumbnail:"https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg"},
               {text:'OMG!',thumbnail:"https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg"},
               {text:'Lakefront',thumbnail:"https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg"},
               {text:'Beachfront',thumbnail:"https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg"}
              ].map((label, index) => (
                <button key={index} className={`flex flex-col items-center space-y-2 ${index === 0 ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}>
                  <img src={label.thumbnail} alt={label.text} className="w-6 h-6" />
                  <span className="text-xs whitespace-nowrap">{label.text}</span>
                </button>
              ))}
            </div>
            <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent"></div>
            <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent"></div>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 border rounded-lg px-4 py-2 whitespace-nowrap">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-sm font-semibold">Filters</span>
            </button>
            <div className="flex items-center space-x-2">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing, index) => (
            <div key={index} className="space-y-4">
              <div className="relative">
                <ImageCarousel images={listing.images} />
                <button className="absolute top-2 right-2 text-white z-10">
                  <Heart className="w-6 h-6" />
                </button>
                <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-xs font-semibold z-10">
                  Guest favorite
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-base">{listing.location}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-current text-black mr-1" />
                    <span>{listing.rating}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{listing.views}</p>
                <p className="text-gray-500 text-sm">{listing.dates}</p>
                <p className="font-semibold">${listing.price} <span className="font-normal">night</span></p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <button
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full font-semibold shadow-lg z-10"
        onClick={() => setShowMap(!showMap)}
      >
        {showMap ? 'Show list' : 'Show map'}
      </button>

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