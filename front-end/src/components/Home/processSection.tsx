import React from "react";

const ProcessSection: React.FC = () => {
  return (
    <section className="relative w-full -mt-40 z-10 pt-30 pb-40">
      <div className="absolute top-0 left-0 w-full z-0">
        <img
          src="/assets/banner2-inicio.svg"
          alt="Ola superior"
          className="w-full h-auto"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <h2 className="text-white text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 uppercase">
          ¡Tu mudanza fácil, como debe ser!
        </h2>

        {/* Proceso como imagen completa */}
        <div className="mb-25 mt-15">
          <img
            src="/assets/lineaProceso.svg"
            alt="Proceso completo"
            className="w-full mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 -mt-20">
          {/* Texto informativo - Alineado al inicio del formulario */}
          <div className="flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-[#FFE67B] text-[32px] font-bold uppercase font-montserrat">
                Conoce cómo los hacemos
              </h3>
            </div>
            <p className="text-white text-[20px] font-montserrat mt-5">
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

            <form className="bg-[#D9D9D9] rounded-lg p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
    </section>
  );
};

export default ProcessSection;