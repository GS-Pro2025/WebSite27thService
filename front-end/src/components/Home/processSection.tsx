import React, { useState, useEffect, useRef } from "react";
import QuoteForm from "../QuoteForm";
import QuoteModal from "../QuoteModal";

const ProcessSection: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Anima tanto cuando entra como cuando sale de la vista
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px' // Añade margen para activar antes/después
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
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        className="w-full relative overflow-hidden -mt-[70px] sm:-mt-[150px] md:-mt-[140px] lg:-mt-[250px] xl:-mt-[260px]"
      >
        {/* Fondo */}
        <img
          src="/assets/banner2-inicio.svg"
          alt="Proceso"
          className="w-full h-auto block"
        />

        {/* Contenedor*/}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-[8%] sm:pt-[10%] md:pt-[12%] lg:pt-[8%] xl:pt-[10%]">
          {/* Título animado */}
          <div 
            className={`w-full order-1 px-4 sm:px-6 md:px-8 transform transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-4'
            }`}
          >
            <h2
              className="text-center text-white font-[Montserrat] font-black
                text-sm sm:text-2xl md:text-3xl lg:text-4xl leading-tight mb-2 sm:mb-8"
            >
              YOUR MOVE MADE EASY, JUST AS IT SHOULD BE!
            </h2>
          </div>

          {/* Imagen del proceso animada */}
          <div 
            className={`w-full my-2 sm:my-12 md:my-9 lg:my-20 order-2 transform transition-all duration-1000 ease-out delay-300 ${
              isVisible 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-90'
            }`}
          >
            <img
              src="/assets/procesoCompleto.svg"
              alt="Proceso completo"
              className="w-full h-auto block"
            />
          </div>

          {/* Contenido inferior animado */}
          <div 
            className={`w-full max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 lg:gap-8 items-start px-4 sm:px-6 md:px-8 order-3 transform transition-all duration-1000 ease-out delay-500 ${
              isVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-6'
            }`}
          >
            {/* Texto descriptivo */}
            <div className="w-full sm:w-1/2 font-[Montserrat] text-left mb-1 sm:mb-0">
              <h3 className="text-sm sm:text-[18px] md:text-[22px] lg:text-[28px] font-extrabold mb-1 sm:mb-2 text-[#FFE67B]">
                SEE HOW WE DO IT
              </h3>
              <p className="text-[10px] sm:text-[12px] md:text-[16px] lg:text-[18px] font-bold leading-tight text-white">
                Here, in just three simple steps, we'll show you how to schedule
                a fast, stress-free move with 100% certified professionals.
              </p>
            </div>

            {/* Lógica para mostrar botón o formulario */}
            <div className="w-full sm:w-1/2">
              {/* Botón para móviles */}
              <div className="lg:hidden w-full flex justify-center mt-2">
                <button
                  onClick={() => setModalOpen(true)}
                  className={`bg-[#FFE67B] text-black text-xs font-semibold py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isVisible 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-90'
                  }`}
                >
                  GET A QUOTE NOW
                </button>
              </div>
              
              {/* Formulario para desktop */}
              <div 
                className={`hidden lg:block relative transform transition-all duration-1000 ease-out delay-700 ${
                  isVisible 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-90'
                }`}
              >
                <div className="absolute -top-6 lg:-top-8 -translate-x-1/2 bg-[#FFE67B] w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-2xl lg:text-3xl font-bold text-[#7ARACAE] shadow-lg z-10 transform transition-all duration-300 hover:scale-110 group cursor-help">
                  1
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F6F7C] text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-20">
                    Step 1: Fill out the form
                    {/* Flecha del tooltip */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </>
  );
};

export default ProcessSection;