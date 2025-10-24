import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import teamGroup from "/assets/teamgroup.png";
import team2 from "/assets/team2.png";
import team3 from "/assets/team3.png";
import flechaTeam from "/assets/flechaTeam.svg";

const TeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Array de imágenes del equipo
  const teamImages = [
    {
      src: teamGroup,
      alt: "Equipo Twenty Seventh - Grupo Principal",
      title: "TRAINED PROFESSIONALS"
    },
    {
      src: team2,
      alt: "Equipo Twenty Seventh - En Acción",
      title: "EXPERT MOVERS"
    },
    {
      src: team3,
      alt: "Equipo Twenty Seventh - Servicio Premium",
      title: "QUALITY SERVICE"
    }
  ];

  // Auto-play del carrusel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, teamImages.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? teamImages.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % teamImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Imágenes del carrusel */}
      <div className="relative w-full h-full">
        {teamImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {/* Overlay degradado */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* Flecha decorativa + texto */}
      <div className="pointer-events-none absolute left-0 right-0 top-4 md:top-6 flex justify-end z-20">
        <div className="relative ml-auto w-[520px] sm:w-[600px] md:w-[720px] animate-[fadeInSlide_1s_ease-out]">
          <img 
            src={flechaTeam} 
            alt="" 
            className="w-full h-auto drop-shadow-2xl" 
          />
          <div className="absolute inset-0 flex items-center justify-center pr-8 md:pr-16">
            <span 
              className="text-[#FFE67B] font-extrabold tracking-wide text-base sm:text-xl md:text-2xl drop-shadow-lg transition-all duration-500"
              key={currentIndex}
            >
              {teamImages[currentIndex].title}
            </span>
          </div>
        </div>
      </div>

      {/* Botones de navegación */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-all duration-300 hover:scale-110 group"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-[#FFE67B] transition-colors" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-all duration-300 hover:scale-110 group"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-[#FFE67B] transition-colors" />
      </button>

      {/* Indicadores de puntos */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {teamImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-12 h-3 bg-[#FFE67B]"
                : "w-3 h-3 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Ir a la imagen ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamCarousel;