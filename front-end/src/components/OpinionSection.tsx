import React from 'react';

const TexturedSection = () => {
  return (
    <section className="relative w-full min-h-[203vh] overflow-hidden">
      {/* Botón superior izquierdo */}
      <div className="absolute top-4 right-36 z-30">
        <button
          className="
            bg-[#FFE67B]
            text-[#606060]
            text-xs
            md:text-sm
            lg:text-base
            font-semibold
            px-4 py-2
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
      <div className="absolute top-[10%] left-[8%] z-30 w-[90%] md:w-[60%] lg:w-[40%] xl:w-[28%] px-2">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold font-[Montserrat] leading-snug text-white">
          Llegamos a donde comienza <br />
          <span className="text-[#FFE67B]">tu próximo capítulo</span>
        </h2>
      </div>

      {/* Formulario - Parte izquierda */}
      <div className="absolute top-[20%] left-[6%] z-20 w-[90%] md:w-[60%] lg:w-[40%] xl:w-[28%] p-6 bg-white rounded-xl shadow-lg">
        <form className="space-y-4">
          {/* Campo Origen */}
          <div>
            <label className="block text-[#606060] text-sm font-medium mb-1">Origen</label>
            <input
              type="text"
              placeholder="Value"
              className="bg-[#FFFF] w-full border border-gray-300 rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
            />
          </div>

          {/* Campo Destino */}
          <div>
            <label className="block text-[#606060] text-sm font-medium mb-1">Destino</label>
            <input
              type="text"
              placeholder="Value"
              className="bg-[#FFFF] w-full border border-gray-300 rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="checkbox"
              className="mt-1"
            />
            <label htmlFor="checkbox" className="text-[#606060] text-sm">
              <span className="font-medium">Label</span><br />
              <span className="text-xs text-gray-500">Description</span>
            </label>
          </div>

          {/* Botón */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#FFE67B] text-[#606060] font-semibold py-2 rounded-md shadow hover:brightness-110 transition-all"
            >
              verificar cobertura
            </button>
          </div>
        </form>
      </div>

      {/* Globo terráqueo - Parte derecha */}
      <div className="
        absolute 
        right-[5%] top-[35%] 
        md:right-[5%] md:top-[34%]
        lg:right-[20%] lg:top-[100%]
        xl:right-[-3%] xl:top-[27%]
        transform -translate-y-1/2 
        z-20
      ">
        <img
          src="/assets/globo_opiniones.png"
          alt="Globo terráqueo"
          className="
            w-56 h-56
            md:w-72 md:h-72 
            lg:w-96 lg:h-96 
            xl:w-[45rem] xl:h-[45rem] 
            object-contain
          "
        />
      </div>

      {/* Logo - Parte inferior izquierda */}
      <div className="absolute bottom-[8%] left-[-0.9%] z-20">
        <img
          src="/assets/logo_simple.png"
          alt="Logo"
          className="
            w-16 h-16
            md:w-24 md:h-24
            lg:w-32 lg:h-32
            xl:w-[600px] xl:h-[600px]
            object-contain
          "
        />
      </div>


      {/* Contenido adicional */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* Texto u otros elementos aquí */}
      </div>
    </section>
  );
};

export default TexturedSection;
