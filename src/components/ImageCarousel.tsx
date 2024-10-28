import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ImageCarousel = ({ images }:any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
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
            className={`${currentIndex == 0 && "hidden"} absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10`}
            onClick={prevSlide}
        >
            <ChevronLeft className="w-4 h-4 text-gray-800" />
        </button>
        <button 
            className={`${currentIndex == images.length - 1 && "hidden"} absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10`}
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

export default ImageCarousel;