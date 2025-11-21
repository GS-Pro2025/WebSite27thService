import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServicesWheel from "./ServiceCarr";

interface ImageData {
  src: string;
  alt: string;
  title: string;
}

interface ImageCarouselProps {
  images: ImageData[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex(
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex(
      currentIndex === images.length - 1 ? 0 : currentIndex + 1
    );
  };


  return (
    <div 
      ref={carouselRef}
      className="relative z-0 w-full min-h-screen"
    >
      {/* Carousel Container */}
      <div className="relative w-full h-auto overflow-hidden rounded-3xl group">
        {/* Image Stack with Transitions */}
        <div className="relative w-full h-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-105 z-0"
              }`}
              style={{
                transform: index === currentIndex 
                  ? "translateX(0)" 
                  : `translateX(${direction * 100}px)`,
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
          
          {/* Visible image to maintain space */}
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-auto object-cover opacity-0"
          />

          {/* Service Title Overlay - Top Right */}
          <div className="absolute top-6 md:top-8 right-6 md:right-8 z-20">
            <div 
              key={`title-${currentIndex}`}
              className=" backdrop-blur-sm text-teal-600 px-6 md:px-8 py-3 md:py-4 rounded-2xl  text-2xl md:text-3xl lg:text-4xl font-light transform transition-all duration-500"
              style={{
                animation: "fadeInScale 0.6s ease-out"
              }}
            >
              {images[currentIndex].title}
            </div>
          </div>

          {/* Services Wheel - Left Side */}
          <div className="absolute left-4 md:left-8 top-1/4 -translate-y-1/2 z-20 w-50 md:w-70 lg:w-90">
            <ServicesWheel />
          </div>
        </div>

        {/* Navigation Buttons - Bottom Center */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-20">
          <button
            onClick={goToPrevious}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 p-2 md:p-2.5 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <button
            onClick={goToNext}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 p-2 md:p-2.5 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}; 

export default ImageCarousel;