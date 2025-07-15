import React from 'react';

const FullTextureSection: React.FC = () => {
  return (
    <section
      className="w-full h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/assets/textura.png')" }}
    >
      {/* Overlay opcional para mejorar legibilidad del texto */}
      <div className="absolute inset-0 bg-black/20 z-10" />
      
      {/* Contenido de la sección */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6">
            Tu contenido aquí
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl font-montserrat mb-8">
            Esta sección utiliza toda la imagen como fondo
          </p>
          <button className="bg-[#FFE67B] text-[#076d7c] px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
            Botón de ejemplo
          </button>
        </div>
      </div>
    </section>
  );
};

export default FullTextureSection;