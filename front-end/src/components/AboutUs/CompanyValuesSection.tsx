import { useState, useEffect, useRef } from "react";

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
    <div ref={sectionRef} className="relative w-full">
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

      {/* Imagen de fondo - Desktop/Tablet */}
      <div className="relative w-full h-auto md:h-screen">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <img 
            src="/assets/bannerCamion.webp"
            alt="Safe box"
            className="w-full h-auto object-cover md:scale-100"
          />
        </div>

        {/* Overlay de estadísticas - DESKTOP/TABLET */}
        <div className="hidden md:flex absolute inset-0 items-center justify-end pb-0 pr-8 lg:pr-16">
          <div className="text-white text-right space-y-6">
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
              <div className="text-5xl md:text-5xl lg:text-6xl font-semibold">10 years</div>
              <div className="text-xl md:text-xl lg:text-2xl mt-1">Moving</div>
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
              <div className="text-5xl md:text-5xl lg:text-6xl font-semibold">+10,000</div>
              <div className="text-xl md:text-xl lg:text-2xl mt-1">Moving</div>
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
              <div className="text-5xl md:text-5xl lg:text-6xl font-semibold">+20k</div>
              <div className="text-xl md:text-xl lg:text-2xl mt-1">Satisfied customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay de estadísticas - MÓVIL (debajo de la imagen) */}
      <div className="md:hidden bg-gradient-to-b from-[#0E6F7E] to-[#0a5563] px-6 py-12">
        <div className="grid grid-cols-3 gap-4">
          {/* 10 años */}
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: isVisible ? "400ms" : "0ms",
            }}
          >
            <div className="bg-[#FFE67B] rounded-2xl p-4 mb-3">
              <div className="text-2xl sm:text-3xl font-bold text-[#0E6F7E]">10</div>
            </div>
            <div className="text-sm sm:text-base font-semibold text-white">Years</div>
            <div className="text-xs text-gray-200">Moving</div>
          </div>

          {/* +10,000 */}
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: isVisible ? "600ms" : "0ms",
            }}
          >
            <div className="bg-[#FFE67B] rounded-2xl p-4 mb-3">
              <div className="text-2xl sm:text-3xl font-bold text-[#0E6F7E]">10k</div>
            </div>
            <div className="text-sm sm:text-base font-semibold text-white">+</div>
            <div className="text-xs text-gray-200">Moves</div>
          </div>

          {/* +20k */}
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: isVisible ? "800ms" : "0ms",
            }}
          >
            <div className="bg-[#FFE67B] rounded-2xl p-4 mb-3">
              <div className="text-2xl sm:text-3xl font-bold text-[#0E6F7E]">20k</div>
            </div>
            <div className="text-sm sm:text-base font-semibold text-white">+</div>
            <div className="text-xs text-gray-200">Customers</div>
          </div>
        </div>
      </div>
    </div>
  );
}