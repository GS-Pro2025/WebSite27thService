import React, { useState, useEffect } from "react";

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Animación de carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Manejar scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calcular transformaciones basadas en scroll
  const contentTransform = -scrollY * 0.3; // Parallax inverso para el contenido
  const titleScale = Math.max(0.8, 1 - scrollY * 0.0008); // Escala del título
  const contentOpacity = Math.max(0.2, 1 - scrollY * 0.002); // Opacidad del contenido
  const imageOpacity = Math.max(0.3, 1 - scrollY * 0.001); // Opacidad de la imagen

  return (
    <section className="w-full bg-[#68A2A6] overflow-hidden relative">
      {/* Imagen de fondo */}
      <img
        src="/assets/banner1.svg"
        alt="Hero Banner"
        className={`w-full h-auto block transition-all duration-1000 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        style={{
          opacity: isLoaded ? imageOpacity : 0,
        }}
      />

      {/* Contenedor principal */}
      <div
        className="absolute top-[42%] left-[6%] sm:left-[8%] lg:left-[10%] w-11/12 max-w-[240px] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
        style={{
          transform: `translateY(-50%) translateY(${contentTransform}px)`,
          opacity: contentOpacity,
        }}
      >
        {/* Título principal */}
        <h1
          className={`font-['Montserrat'] text-white text-[16px] sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px] leading-tight text-center -ml-28 sm:-ml-6 md:-ml-50 lg:-ml-50 transition-all duration-1000 delay-300 ${
            isLoaded
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }`}
          style={{
            transform: `scale(${titleScale}) translateY(${
              isLoaded ? 0 : 32
            }px)`,
            filter: `brightness(${Math.max(0.7, 1 - scrollY * 0.001)})`,
          }}
        >
          <span className="font-medium inline-block transition-all duration-700 delay-400 hover:text-[#FFE67B]">
            A NEW BEGINNING
          </span>
          <br />
          <span
            className={`font-extrabold inline-block transition-all duration-700 delay-600 hover:text-[#FFE67B] ${
              isLoaded ? "transform scale-100" : "transform scale-95"
            }`}
          >
            STARTS HERE
          </span>
        </h1>

        {/* Botón de cotización */}
        <div
          className={`mt-3 sm:mt-4 md:mt-6 transition-all duration-1000 delay-800 ${
            isLoaded
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-6"
          }`}
          style={{
            transform: `translateY(${isLoaded ? 0 : 24}px) scale(${Math.max(
              0.9,
              1 - scrollY * 0.0005
            )})`,
          }}
        >
          <button
            className="bg-[#FFE67B] text-[#535353] font-['Montserrat'] font-semibold rounded-full shadow-md hover:scale-105 transition-all duration-300 hover:shadow-xl hover:bg-yellow-300 active:scale-95 group
             text-xs py-2 px-5            
             sm:text-sm sm:py-2.5 sm:px-6             
             md:text-base md:py-3 md:px-8            
             lg:text-xl            
             xl:text-[28px] xl:py-5 xl:px-12"
            style={{
              boxShadow: `0 ${Math.max(4, 8 - scrollY * 0.01)}px ${Math.max(
                8,
                16 - scrollY * 0.02
              )}px rgba(0,0,0,0.2)`,
            }}
          >
            <span className="group-hover:animate-pulse">GET A QUOTE</span>
          </button>
        </div>

        {/* Párrafo descriptivo */}
        <p
          className={`mt-3 sm:mt-4 md:mt-6 -ml-2 sm:-ml-2 md:-ml-4 lg:-ml-10 font-['Montserrat'] text-[#585858] leading-snug transition-all duration-1000 delay-1000
            text-[12px]             
            sm:text-sm             
            md:text-base            
            lg:text-lg            
            xl:text-[30px] ${
              isLoaded
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4"
            }`}
          style={{
            transform: `translateY(${isLoaded ? 0 : 16}px) scale(${Math.max(
              0.95,
              1 - scrollY * 0.0003
            )})`,
            opacity: Math.max(0.4, contentOpacity * 1.2),
          }}
        >
          <span
            className={`font-semibold transition-all duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "1200ms" }}
          >
            Your move is part of your new story, that's why{" "}
          </span>
          <span
            className={`font-extrabold text-[#FFE67B] transition-all duration-500 hover:animate-pulse ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "1400ms" }}
          >
            we are here to take care of what you love{" "}
          </span>
          <span
            className={`font-semibold transition-all duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "1600ms" }}
          >
            and guide you every step of the way.
          </span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;