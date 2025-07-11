import React from 'react';

const ServicesSection: React.FC = () => {
  return (
    <section className="relative w-full h-[750px] md:h-[850px] lg:h-[900px] overflow-hidden font-['Montserrat']">
      
      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F7F7] to-[#076d7c] z-0" />

      {/* Imagen pareja SOLO en la parte inferior de la sección */}
      <img
        src="/assets/pareja.png"
        alt="Pareja con cajas de mudanza"
        className="absolute bottom-0 left-0 w-full h-[75%] object-cover z-10"
      />

      {/* Contenido: círculo + texto, en la parte superior */}
      <div className="relative z-20 container mx-auto px-6 pt-0 md:pt-0 flex flex-col md:flex-row items-start md:items-center justify-between">
        
        {/* Círculo con íconos a la izquierda */}
        <div className="relative w-[320px] h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] mb-8 md:mb-0">
          <img
            src="/assets/logos.png"
            alt="Servicios"
            className="absolute left-0 top-0 w-full h-full object-contain"
          />
        </div>

        {/* Texto a la derecha */}
        <div className="text-left max-w-xl -mt-44">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#757575] leading-tight mb-4">
            Conoce nuestros <br />
            <span className="text-[#FFE67B]">servicios personalizados</span>
        </h2>
        <p className="text-lg md:text-xl text-white">
            Sabemos que cada historia y mudanza es diferente, <br className="hidden md:block" />
            por eso nos adaptamos a la tuya.
        </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
