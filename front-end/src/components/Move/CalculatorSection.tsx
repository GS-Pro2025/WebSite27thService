import React from "react";

const CalculatorSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(90deg,#002C3D_0%,#0E6F7E_45%,#FFE67B_80%,#FFF7E6_100%)]">
      {/* Contenedor principal: Aumentamos su ancho máximo para dar más espacio */}
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24 text-center">
        {/* Contenedor principal para las 3 columnas (botón + imagen) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12 mb-20">
          {/* Columna 1: Cocina */}
          <div className="flex flex-col items-center gap-y-6">
            <button className="bg-white text-[#0E6F7E] font-bold text-4xl py-3 px-12 rounded-2xl shadow-lg border border-black hover:bg-gray-100 transition-colors w-full max-w-xs">
              Cocina
            </button>
            <img
              src="/assets/estufa.svg"
              alt="Estufa 3D"
              className="w-full h-auto max-w-[300px] mx-auto transform hover:scale-105 transition-transform"
            />
          </div>

          {/* Columna 2: Habitación */}
          <div className="flex flex-col items-center gap-y-6">
            <button className="bg-white text-[#0E6F7E] font-bold text-4xl py-3 px-12 rounded-2xl shadow-lg border border-black hover:bg-gray-100 transition-colors w-full max-w-xs">
              Habitación
            </button>
            <img
              src="/assets/nevera.svg"
              alt="Nevera 3D"
              className="w-full h-auto max-w-[300px] mx-auto transform hover:scale-105 transition-transform"
            />
          </div>

          {/* Columna 3: Estudio */}
          <div className="flex flex-col items-center gap-y-6">
            <button className="bg-white text-[#0E6F7E] font-bold text-4xl py-3 px-12 rounded-2xl shadow-xl border border-black hover:bg-gray-100 transition-colors w-full max-w-xs">
              Estudio
            </button>
            <img
              src="/assets/horno.svg"
              alt="Horno microondas 3D"
              className="w-full h-auto max-w-[300px] mx-auto transform hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* Texto y botón de llamada a la acción (sin cambios) */}
        <div>
          <p className="text-xl md:text-4xl font-bold text-[#2D2A26]">
            Tranquilo, calculamos el peso por ti
          </p>
          <a
            href="#contactanos"
            className="text-5xl inline-block mt-5 bg-[#FFE67B] text-[#0E6F7E] font-bold py-4 px-18 rounded-full shadow-lg hover:bg-yellow-300 transition-all transform hover:scale-105"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
