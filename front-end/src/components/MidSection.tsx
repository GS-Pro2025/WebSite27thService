import React from "react";

const MidSection: React.FC = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[450px] lg:h-[420px] overflow-hidden font-['Montserrat']">
      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F7F7] to-[#076d7c] z-0" />

      {/* Contenido: círculo + texto, en la parte superior */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 pt-0 md:pt-0 flex flex-col lg:flex-row items-center lg:items-center justify-between">
        {/* Círculo con íconos a la izquierda */}
        <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px] mb-4 sm:mb-6 lg:mb-0 flex-shrink-0">
          <img
            src="/assets/logos.png"
            alt="Servicios"
            className="absolute left-0 top-0 w-full h-full object-contain"
          />
        </div>

        {/* Texto a la derecha */}
        <div className="text-center lg:text-left max-w-xl px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#757575] leading-tight mb-5">
            Conoce nuestros <br />
            <span className="text-[#FFE67B]">servicios personalizados</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white">
            Sabemos que cada historia y mudanza es diferente,{" "}
            <br className="hidden lg:block" />
            por eso nos adaptamos a la tuya.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MidSection;
