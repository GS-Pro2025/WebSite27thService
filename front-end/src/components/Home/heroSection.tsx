import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full bg-[#68A2A6] overflow-hidden relative">
      {/* Imagen de fondo */}
      <img
        src="/assets/banner1.svg"
        alt="Hero Banner"
        className="w-full h-auto block"
      />

      {/* Contenedor principal */}
      <div className="absolute top-[42%] left-[6%] sm:left-[8%] lg:left-[10%] transform -translate-y-1/2 w-11/12 max-w-[240px] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
        
        {/* Título principal */}
        <h1 className="font-['Montserrat'] text-white text-[16px] sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px] leading-tight text-center -ml-28 sm:-ml-6 md:-ml-8 lg:-ml-50">
          <span className="font-medium">A NEW BEGINNING</span>
          <br />
          <span className="font-extrabold">STARTS HERE</span>
        </h1>

        {/* Botón de cotización (Perfecto, sin cambios) */}
        <div className="mt-3 sm:mt-4 md:mt-6">
          <button className="bg-[#FFE67B] text-[#535353] font-['Montserrat'] font-semibold rounded-full shadow-md hover:scale-105 transition-transform 
            text-xs py-2 px-5
            sm:text-sm sm:py-2.5 sm:px-6 
            md:text-base md:py-3 md:px-8
            lg:text-xl
            xl:text-[28px] xl:py-5 xl:px-12">
            GET A QUOTE
          </button>
        </div>

        {/* Párrafo descriptivo */}
        <p className="mt-3 sm:mt-4 md:mt-6 -ml-2 sm:-ml-2 md:-ml-4 lg:-ml-10 font-['Montserrat'] text-[#585858] leading-snug
            text-[12px] 
            sm:text-sm 
            md:text-base
            lg:text-lg
            xl:text-[30px]">
          <span className="font-semibold">Your move is part of your new story, that's why </span>
          <span className="font-extrabold text-[#FFE67B]">we are here to take care of what you love </span>
          <span className="font-semibold">and guide you every step of the way.</span>
        </p>
          
      </div>
    </section>
  );
};

export default HeroSection;