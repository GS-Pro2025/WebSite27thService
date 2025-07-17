import React, { useState } from "react";

const OpinionSection = () => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  return (
    <section
      className="relative w-full -mt-36 z-20 overflow-hidden
  min-h-screen 
  sm:min-h-[130vh] 
  md:min-h-[80vh] 
  lg:min-h-[180vh] 
  xl:min-h-[203vh]
"
    >
      {/* Botón superior derecho responsivo */}
      <div className="absolute top-4 right-4 md:right-12 lg:right-36 z-30">
        <button
          className="
          bg-[#FFE67B]
          text-[#606060]
          text-xs
          md:text-sm
          lg:text-base
          font-semibold
          px-2 py-1.5
          md:px-2 md:py-2
          lg:px-4 lg:py-2
          rounded-full
          shadow-md
          transition-all duration-300
          hover:brightness-110
        "
        >
          COBERTURA INTERESTATAL
        </button>
      </div>

      {/* Fondo con textura y curvas */}
      <img
        src="/assets/textura.png"
        alt="Fondo con textura curvada"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 z-0
        w-[150%] max-w-none
        md:w-full
        xl:w-[100vw] xl:h-auto
        object-contain object-top"
      />
      {/* Texto superior sobre la tabla */}
      <div className="absolute top-[10%] sm:top-[10%] md:top-[10%] lg:top-[8%] left-[4%] sm:left-[6%] md:left-[8%] z-30 w-[92%] sm:w-[88%] md:w-[60%] lg:w-[40%] xl:w-[28%] px-2 sm:px-3 md:px-4">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold font-[Montserrat] leading-tight sm:leading-snug text-white">
          Llegamos a donde comienza <br />
          <span className="text-[#FFE67B]">tu próximo capítulo</span>
        </h2>
      </div>

      {/* Formulario - Parte izquierda */}
      <div className="absolute top-[22%] md:top-[23%] lg:top-[20%] left-[6%] z-20 w-[46%] md:w-[45%] lg:w-[35%] xl:w-[28%] p-2 md:p-6 bg-white rounded-xl shadow-lg">
        <form className="space-y-1.5 md:space-y-4">
          {/* Campo Origen */}
          <div>
            <label className="block text-[#606060] text-sm font-medium mb-0.5 md:mb-1">
              Origen
            </label>
            <input
              type="text"
              placeholder="Value"
              className="bg-[#FFFF] w-full border border-gray-300 rounded px-3 md:px-4 py-1.5 md:py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
            />
          </div>

          {/* Campo Destino */}
          <div>
            <label className="block text-[#606060] text-sm font-medium mb-0.5 md:mb-1">
              Destino
            </label>
            <input
              type="text"
              placeholder="Value"
              className="bg-[#FFFF] w-full border border-gray-300 rounded px-3 md:px-4 py-1.5 md:py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-start space-x-2">
            <input type="checkbox" id="checkbox" className="mt-1" />
            <label htmlFor="checkbox" className="text-[#606060] text-sm">
              <span className="font-medium">Label</span>
              <br />
              <span className="text-xs text-gray-500">Description</span>
            </label>
          </div>

          {/* Botón */}
          <div className="pt-0.5 md:pt-2">
            <button
              type="submit"
              className="w-full bg-[#FFE67B] text-[#606060] font-semibold py-1.5 md:py-2 rounded-md shadow hover:brightness-110 transition-all"
            >
              verificar cobertura
            </button>
          </div>
        </form>
      </div>

      {/* Globo terráqueo - Parte derecha */}
      <div
        className="
        absolute 
        right-[-3%] top-[20%] 
        md:right-[-3%] md:top-[25%]
        lg:right-[20%] lg:top-[100%]
        xl:right-[-3%] xl:top-[27%]
        transform -translate-y-1/2 
        z-20
      "
      >
        <img
          src="/assets/globo_opiniones.png"
          alt="Globo terráqueo"
          className="
            w-56 h-56
            md:w-96 md:h-96 
            lg:w-96 lg:h-96 
            xl:w-[45rem] xl:h-[45rem] 
            object-contain
          "
        />
      </div>

      {/* Carrusel - Imagen estirada al ancho completo de la pantalla */}
      <div
        className="
    absolute 
    top-[60%] md:top-[60%] lg:top-1/2 
    left-1/2 
    transform -translate-x-1/2 -translate-y-1/2 
    z-10 
    w-screen
  "
      >
        <img
          src="/assets/linea.png"
          alt="Carrusel"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Logo - Parte inferior izquierda */}
      <div className="hidden sm:block absolute bottom-[55%] md:bottom-[10%] lg:bottom-[8%] left-[-1%] md:left-[-1%] lg:left-[-0.9%] z-20">
        <img
          src="/assets/logo_simple.png"
          alt="Logo"
          className="
        w-36 h-36
        sm:w-16 sm:h-16
        md:w-64 md:h-64
        lg:w-28 lg:h-28
        xl:w-[600px] xl:h-[600px]
        object-contain
      "
        />
      </div>

      {/* Texto alineado con la parte superior del logo */}
      <div className="absolute bottom-[15%] sm:bottom-[28%] md:bottom-[10%] lg:bottom-[25%] left-[5%] sm:left-[15%] md:left-[30%] lg:left-[43%] z-30 max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]">
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-[45px] font-semibold font-[Montserrat] leading-snug">
          <span className="text-[#FFE67B]">¡ Tu opinión </span>
          <span className="text-white">es importante para nosotros !</span>
        </h2>
        <p className="mt-2 text-white text-xs sm:text-sm md:text-base font-[Montserrat] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl">
          Cuéntanos sobre tu experiencia de servicio, esto nos ayuda a mejorar
          cada día para brindarte la mejor calidad en mudanzas
        </p>

        {/* Caja de calificación - ahora dentro del flujo */}
        <div className="mt-3 sm:mt-4 md:mt-8 bg-white/75 rounded-md px-3 sm:px-4 md:px-6 py-3 sm:py-4 w-full max-w-xs sm:max-w-sm md:max-w-md shadow">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={star <= (hovered || rating) ? "#FCD21C" : "#0E6F7E"}
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-all duration-200"
                >
                  <path d="M12 2l2.6 6.5H22l-5.2 4.2L18.6 20 12 16.3 5.4 20l1.4-7.3L2 8.5h7.4L12 2z" />
                </svg>
                <span className="text-[8px] sm:text-[9px] md:text-[10px] text-[#0E6F7E] mt-0.5 sm:mt-1 whitespace-nowrap">
                  Tab {star}
                </span>
              </div>
            ))}
          </div>

          {/* Botón */}
          <div className="flex justify-center">
            <button
              className="bg-[#FFE67B]/40 text-[#606060] font-semibold px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 rounded-full border border-[#FFE67B] hover:brightness-105 transition text-xs sm:text-sm md:text-base"
              onClick={() => alert(`Calificación enviada: ${rating} estrellas`)}
            >
              Envia tu calificación
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpinionSection;
