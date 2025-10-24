import React, { useEffect, useRef, useState } from "react";
import ServiceCarr from "./ServiceCarr";
import banner from "/assets/banner.png";

const EquipmentSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Activar animación tanto al entrar como al salir
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px"
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
    <section 
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-white via-white to-[#85c6ca] py-16 lg:py-24 overflow-hidden"
    >
      <div className="relative z-20">
        {/* SECCIÓN "ABOUT US" */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
          {/* Imagen con animación desde la izquierda */}
          <div 
            className={`w-full md:w-3/5 relative transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-20"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div>
              <button
                type="button"
                className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 bg-[#FFE67B] text-white font-bold py-1 px-4 text-sm md:text-20 md:py-3 md:px-6 rounded-3xl shadow-md z-10 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95"
              >
                ABOUT US
              </button>
              <img
                src={banner}
                alt="Equipo de Twenty Seventh Services Group"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Texto con animación desde la derecha */}
          <div 
            className={`w-full md:w-2/5 flex flex-col justify-center transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-20"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <p className="font-montserrat font-bold text-base lg:text-lg text-[#545454] text-center md:text-left">
              At Twenty Seventh Services Group, LLC, we make every move a
              reliable and stress-free experience.
            </p>

            <p className="font-montserrat font-medium text-sm lg:text-base text-[#545454] mt-4 text-center md:text-left">
              We specialize in residential and commercial moves, ensuring a
              swift, safe, and tailored process to meet your needs. From the
              first contact to the final delivery.
              <br />
              <br />
              Our team is composed of qualified, responsible, and attentive
              professionals who handle your belongings as if they were their
              own. We know that behind every box there is a story, and that is
              why we work with dedication, efficiency, and respect.
            </p>

            <div className="w-full bg-[#A2C2BF] rounded-3xl md:rounded-full flex flex-col md:flex-row items-center justify-around gap-y-2 md:gap-y-0 py-3 px-4 mt-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
              <p className="text-[#2C2C2C] text-xs sm:text-sm font-semibold text-center">
                Comprehensive & Quality Service
              </p>
              <p className="text-[#2C2C2C] text-xs sm:text-sm font-semibold text-center">
                Best Prices
              </p>
              <p className="text-[#2C2C2C] text-xs sm:text-sm font-semibold text-center">
                Proven Experience
              </p>
            </div>
          </div>
        </div>

        {/* SECCIÓN DE SERVICIOS */}
        <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row md:items-center gap-8 px-4 mt-8 lg:mt-8">
          {/* Carrusel de Servicios - animación desde abajo */}
          <div 
            className={`w-full md:w-1/2 transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-20"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <ServiceCarr />
          </div>

          {/* Texto de Servicios - animación fade in con escala */}
          <div 
            className={`w-full md:w-1/2 flex flex-col text-center md:text-center -mt-6 md:-mt-38 transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <h2 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-[48px] text-[#757575] leading-tight">
              Get to know our
            </h2>
            <h3 className="font-montserrat font-bold text-3xl sm:text-4xl lg:text-[40px] text-[#FFE67B] leading-tight">
              customized services
            </h3>
            <p className="font-montserrat font-medium text-base sm:text-lg lg:text-[20px] text-white mt-4">
              We know that every story and move is different, which is why we
              adapt to yours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;