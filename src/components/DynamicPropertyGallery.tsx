'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

import { leagueSpartan } from '@/utils/fonts'

interface GalleryProps {
  images?: string[]
}

export default function DynamicPropertyGallery({ images = [] }: GalleryProps) {
  const [showAllImages, setShowAllImages] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAllImages(false)
        setSelectedImageIndex(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src))
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 font-medium">No images available</p>
      </div>
    )
  }

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))
  }

  return (
    <div className={`relative w-full font-sans ${leagueSpartan.className}`}>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loader {
          border-top-color: #000000;
          animation: spin 1s linear infinite;
        }
      `}</style>
      <div className="grid grid-cols-4 gap-2 h-[400px]">
        {images.slice(0, 5).map((src, index) => (
          <div 
            key={src} 
            className={`relative rounded-lg overflow-hidden ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            {!loadedImages.has(src) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
              </div>
            )}
            <Image
              src={src}
              alt={`Property image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              onLoad={() => handleImageLoad(src)}
              className={loadedImages.has(src) ? 'opacity-100' : 'opacity-0'}
            />
          </div>
        ))}
      </div>

      {images.length > 5 && (
        <button
          onClick={() => setShowAllImages(true)}
          className="absolute bottom-4 left-4 bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-300 ease-in-out text-sm font-semibold tracking-wide"
        >
          View all {images.length} photos
        </button>
      )}

      {showAllImages && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">All Photos {`(${images.length})`}</h2>
              <button
                onClick={() => setShowAllImages(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((src, index) => (
                <div
                  key={src}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  {!loadedImages.has(src) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                    </div>
                  )}
                  <Image
                    src={src}
                    alt={`Property image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    onLoad={() => handleImageLoad(src)}
                    className={loadedImages.has(src) ? 'opacity-100' : 'opacity-0'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-4xl max-h-[80vh] mx-auto">
            {!loadedImages.has(images[selectedImageIndex]) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
              </div>
            )}
            <Image
              src={images[selectedImageIndex]}
              alt={`Expanded view of property image ${selectedImageIndex + 1}`}
              layout="fill"
              objectFit="contain"
              onLoad={() => handleImageLoad(images[selectedImageIndex])}
              className={loadedImages.has(images[selectedImageIndex]) ? 'opacity-100' : 'opacity-0'}
            />
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-4 text-black bg-white rounded-full hover:text-gray-300 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-black bg-white rounded-full hover:text-gray-300 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-black bg-white rounded-full hover:text-gray-300 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full text-sm font-medium">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}