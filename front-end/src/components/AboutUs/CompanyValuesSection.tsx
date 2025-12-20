import React, { useState, useEffect, useRef } from "react";
import banner from "../../../public/assets/bannerCamion.png";

export default function StatsComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para animaciones de scroll
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
        threshold: 0.3,
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

  // Animación inicial al cargar
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen">
      {/* Badge superior izquierdo */}
      <div
        className={`absolute top-2 left-2 sm:top-4 sm:left-4 z-10 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-x-0 translate-y-0"
            : "opacity-0 -translate-x-8 -translate-y-4"
        }`}
        style={{
          transitionDelay: isVisible ? "200ms" : "0ms",
        }}
      >
        <span className="bg-[#7EBBC7] text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-xl text-xs sm:text-sm font-medium inline-block hover:scale-105 transition-transform duration-300">
          Special moving
        </span>
      </div>

      {/* Imagen de fondo */}
      <div className="relative w-full h-auto md:h-screen">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <img 
            src={banner}
            alt="Safe box"
            className="w-full h-auto object-cover scale-110 md:scale-100"
          />
        </div>

        {/* Overlay de estadísticas */}
        <div className="absolute inset-0 flex items-end md:items-center justify-center md:justify-end pb-8 md:pb-0 md:pr-8 lg:pr-16">
          <div className="text-[#0E6F7E] md:text-white text-center md:text-right space-y-4 sm:space-y-6">
            {/* 10 años */}
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
              style={{
                transitionDelay: isVisible ? "400ms" : "0ms",
              }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">10 years</div>
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl mt-1">Moving</div>
            </div>

            {/* +10,000 */}
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
              style={{
                transitionDelay: isVisible ? "600ms" : "0ms",
              }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">+10,000</div>
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl mt-1">Moving</div>
            </div>

            {/* +20k */}
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
              style={{
                transitionDelay: isVisible ? "800ms" : "0ms",
              }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">+20k</div>
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl mt-1">Satisfied customers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}