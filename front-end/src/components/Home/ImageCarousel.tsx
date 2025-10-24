import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div 
      ref={carouselRef}
      className="relative z-0 w-full -mt-[170px] sm:-mt-[230px] md:-mt-[230px] lg:-mt-[300px] xl:-mt-[320px]"
    >
      {/* Contenedor del carrusel */}
      <div className="relative w-full h-auto overflow-hidden rounded-lg group">
        {/* Stack de imágenes con transición */}
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
          
          {/* Imagen visible para mantener el espacio */}
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-auto object-cover opacity-0"
          />

          {/* Texto superpuesto - posicionado a la izquierda y centrado verticalmente */}
          <div className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-20">
            <div 
              key={currentIndex}
              className="bg-white/80 backdrop-blur-sm text-[#757575] px-6 md:px-10 py-4 md:py-7 rounded-3xl shadow-2xl text-xl md:text-2xl lg:text-3xl font-bold max-w-md transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
              style={{
                animation: "slideInLeft 0.6s ease-out"
              }}
            >
              {images[currentIndex].title}
            </div>
          </div>
        </div>

        {/* Botones de navegación mejorados */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-20"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-20"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Indicadores (dots) mejorados */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-10 h-3 bg-white shadow-lg"
                  : "w-3 h-3 bg-white/60 hover:bg-white/90 hover:scale-125"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>

        {/* Overlay gradiente para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}; 

export default ImageCarousel;