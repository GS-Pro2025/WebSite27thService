import React from 'react';

const ServicesSection: React.FC = () => {
  return (
    <section className="relative w-full h-[750px] sm:h-[800px] md:h-[850px] lg:h-[900px] overflow-hidden font-['Montserrat'] -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-32 z-0">
      
      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F7F7] to-[#076d7c] z-0" />

      {/* Imagen pareja SOLO en la parte inferior de la sección */}
      <img
        src="/assets/pareja.png"
        alt="Pareja con cajas de mudanza"
        className="absolute bottom-0 left-0 w-full h-[100%] object-cover object-top sm:object-center z-10"
      />

    </section>
  );
};

export default ServicesSection;
