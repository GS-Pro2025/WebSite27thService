import React from "react";

const ProcessSection: React.FC = () => {
  return (
    <section className="w-screen relative overflow-hidden -mt-[70px] sm:-mt-[150px] md:-mt-[140px] lg:-mt-[250px] xl:-mt-[260px]">
      <img
        src="/assets/banner2-inicio.svg"
        alt="Proceso"
        className="w-full h-auto block"
      />

      {/* Contenido encima del fondo */}
      <div
        className="
          absolute inset-0 z-10
          flex flex-col items-center justify-start
          pt-[10%] sm:pt-[10%] md:pt-[12%] lg:pt-[8%] xl:pt-[10%]
          px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
        "
      >
        <div className="w-full">
          {/* Título */}
          <h2 className="text-center text-white font-[Montserrat] font-black text-[15px] sm:text-[28px] md:text-[30px] lg:text-[40px] xl:text-[40px] leading-tight mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
            YOUR MOVE MADE EASY, JUST AS IT SHOULD BE!
          </h2>

          {/* Proceso como imagen completa */}
          <div className="w-full mx-auto sm:my-14 md:my-1 lg:my-20 xl:my-24">
            <img
              src="/assets/procesoCompleto.svg"
              alt="Proceso completo"
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* Texto + formulario */}
        <div className="mt-0 w-full max-w-7xl mx-auto flex flex-row gap-4 sm:gap-8 lg:gap-16 items-start">
          {/* Texto izquierdo */}
          <div className="w-1/2 font-[Montserrat] text-left">
            <h3 className="text-[14px] sm:text-[18px] md:text-[22px] lg:text-[28px] xl:text-[32px] font-extrabold mb-2 sm:mb-4 text-[#FFE67B]">
              SEE HOW WE DO IT
            </h3>
            <p className="text-[10px] sm:text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-bold leading-snug text-white">
              Here, in just three simple steps, we'll show you how to schedule a
              fast, stress-free move with 100% certified professionals.
            </p>
          </div>

          {/* Formulario derecho */}
          <div className="relative w-1/2">
            {/* Pin sobre el formulario */}
            <div className="absolute -top-4 sm:-top-6 lg:-top-8 left-0 -translate-x-1/2 bg-[#FFE67B] w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-sm sm:text-2xl lg:text-3xl font-bold text-[#7AACAE] shadow-lg z-10">
              1
            </div>

            {/* Caja del formulario */}
            <div className="bg-[#D9D9D9] rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 pt-6 sm:pt-8 lg:pt-12 font-[Montserrat] shadow-md w-full">
              <form className="space-y-3 sm:space-y-4 lg:space-y-6">
                {/* Fila 1 - En móvil una columna, en tablet+ tres columnas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] sm:text-xs lg:text-sm text-[#333] font-semibold mb-1">
                      Origin
                    </label>
                    <input
                      type="text"
                      className="p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl bg-white text-[#333] text-xs sm:text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] sm:text-xs lg:text-sm text-[#333] font-semibold mb-1">
                      Destination
                    </label>
                    <input
                      type="text"
                      className="p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl bg-white text-[#333] text-xs sm:text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] sm:text-xs lg:text-sm text-[#333] font-semibold mb-1">
                      Type of move
                    </label>
                    <input
                      type="text"
                      className="p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl bg-white text-[#333] text-xs sm:text-sm"
                    />
                  </div>
                </div>

                {/* Fila 2 - En móvil una columna, en tablet+ tres columnas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] sm:text-xs lg:text-sm text-[#333] font-semibold mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl bg-white text-[#333] text-xs sm:text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] sm:text-xs lg:text-sm text-[#333] font-semibold mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl bg-white text-[#333] text-xs sm:text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] sm:text-xs lg:text-sm text-[#333] font-semibold mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl bg-white text-[#333] text-xs sm:text-sm"
                    />
                  </div>
                </div>

                {/* Botón */}
                <div className="flex justify-center mt-2 sm:mt-4">
                  <button className="bg-[#FFE67B] text-black text-[10px] sm:text-sm lg:text-[18px] font-semibold py-1.5 sm:py-2 px-4 sm:px-6 lg:px-10 rounded-full shadow hover:scale-105 transition-transform">
                    GET A QUOTE NOW
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
