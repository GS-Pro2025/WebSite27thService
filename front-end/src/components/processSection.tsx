import React from "react";

const ProcessSection: React.FC = () => {
  return (
    <section className="relative w-full -mt-83 z-10 bg-[#7AACAE] overflow-hidden pt-24 pb-16">
      {/* CONTENIDO */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <h2 className="text-white text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-6 uppercase">
          ¡Tu mudanza fácil, como debe ser!
        </h2>

        {/* Subtítulo */}
        <div className="flex justify-center mb-10">
          <span className="bg-[#FFE67B] text-[#FFFFFF] font-bold py-2 px-6 rounded-full uppercase text-sm sm:text-base">
            Tu mudanza
          </span>
        </div>

        {/* Proceso como imagen completa */}
        <div className="mb-20">
          <img
            src="/assets/proceso.png"
            alt="Proceso completo"
            className="w-full max-w-5xl mx-auto"
          />
        </div>

        {/* DOS COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Texto informativo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-[#FFE67B] text-[32px] font-bold uppercase font-montserrat">
                Conoce cómo los hacemos
              </h3>
            </div>
            <p className="text-white text-[20px] font-montserrat">
              Aquí en solo tres sencillos pasos te explicamos cómo tener una
              mudanza programada, rápida, sin estrés y con profesionales 100%
              capacitados.
            </p>
          </div>

          <div className="relative">
            {/* Círculo tipo pin */}
            <div className="absolute -top-9 left-1 -translate-x-1/2 bg-[#FFE67B] w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold text-[#7AACAE] shadow-lg z-10">
              1
            </div>

            {/* Formulario */}
            <form className="bg-[#D9D9D9] rounded-lg p-6 pt-12 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Origen"
                className="bg-white text-black rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Destino"
                className="bg-white text-black rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Tipo de mudanza"
                className="bg-white text-black rounded px-4 py-2 sm:col-span-2"
              />
              <input
                type="text"
                placeholder="Nombre"
                className="bg-white text-black rounded px-4 py-2"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="bg-white text-black rounded px-4 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-white text-black rounded px-4 py-2 sm:col-span-2"
              />
              <div className="col-span-1 sm:col-span-2 flex justify-center mt-2">
                <button
                  type="submit"
                  className="bg-[#FFE67B] hover:bg-[#ffe67bb0] text-black font-semibold px-8 py-3 rounded-full uppercase text-sm transition-colors"
                >
                  Cotiza ahora
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Ola inferior */}
      <div className="absolute -bottom-[190px] left-0 w-full z-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="150 -14.5 1450 320">
          <path
            fill="#f7f7f7"
            fillOpacity="1"
            d="M0,192L80,160C160,128,320,64,480,37.3C640,11,800,21,960,48C1120,75,1280,117,1360,138.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default ProcessSection;
