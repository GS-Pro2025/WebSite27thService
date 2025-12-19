import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import banner from "../../../public/assets/sliderAbout.png";
import slide2 from "../../../public/assets/sliderAbout1.png";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const slides: Slide[] = [
    {
      id: 1,
      image: banner,
      title: "Your move step by step",
      subtitle:
        "Because your belongings deserve to follow high-quality protocols, follow your move with us",
    },
    {
      id: 2,
      image: slide2,
      title: "Professional moving services",
      subtitle:
        "Expert care for your most valuable possessions, ensuring a safe and efficient relocation experience",
    },

  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (!hasAnimated) {
              setHasAnimated(true);
            }
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const changeSlide = (newIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const handlePrevSlide = () => {
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    changeSlide(newIndex);
  };

  const handleNextSlide = () => {
    const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    changeSlide(newIndex);
  };

  const handleDotClick = (index: number) => {
    if (index !== currentSlide) {
      changeSlide(index);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full flex items-start justify-center overflow-hidden"
    >
      {/* Background Images Container */}
      <div className="absolute inset-0 z-0 h-auto w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              currentSlide === index 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col min-h-screen">
        {/* Hero Text with scroll and transition animations */}
        <div className="text-center mb-auto pt-12 px-2 mt-20">
          <h1 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0E6F7E] mb-4 sm:mb-6 drop-shadow-lg font-[Poppins] transition-all duration-1000 ease-out ${
              isVisible && !isTransitioning
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
            style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
          >
            {slides[currentSlide].title}
          </h1>
          <p 
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-[#0E6F7E] max-w-3xl mx-auto drop-shadow-md font-[Manrope] transition-all duration-1000 ease-out ${
              isVisible && !isTransitioning
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
          >
            {slides[currentSlide].subtitle}
          </p>
        </div>

        {/* Carousel Navigation with scroll animation */}
        <div 
          className={`absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center gap-3 sm:gap-4 transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
        >
          {/* Previous Button */}
          <button
            onClick={handlePrevSlide}
            disabled={isTransitioning}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFE67B] hover:bg-[#FFD700] flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
          </button>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                disabled={isTransitioning}
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                  currentSlide === index
                    ? "bg-[#FFE67B] w-6 sm:w-8"
                    : "bg-white/50 hover:bg-white/80 w-2 sm:w-3"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextSlide}
            disabled={isTransitioning}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFE67B] hover:bg-[#FFD700] flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
          </button>
        </div>
      </div>

      {/* Decorative Elements - Animated on scroll */}
      <div 
        className={`absolute top-20 left-10 w-20 h-20 bg-[#FFE67B]/20 rounded-full blur-2xl transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{ transitionDelay: "300ms" }}
      />
      <div 
        className={`absolute bottom-40 right-10 w-32 h-32 bg-[#0E6F7E]/10 rounded-full blur-3xl transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{ transitionDelay: "500ms" }}
      />
    </section>
  );
};

export default HeroSection;