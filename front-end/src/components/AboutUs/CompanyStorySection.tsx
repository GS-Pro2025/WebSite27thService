import React from "react";

const CompanyStorySection: React.FC = () => {
  return (
    <section
      className="
        relative w-full
        min-h-[140vh] md:min-h-[140vh]
        overflow-hidden bg-[#7AACAE]
      "
    >
      {/* Degradado grande superior */}
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0
          h-[72%] md:h-[68%] lg:h-[64%] z-0
          bg-gradient-to-b from-[rgba(244,246,249,1)] to-[rgba(244,246,249,0.57)]
        "
        aria-hidden="true"
      />

      {/* Imagen decorativa: arriba-derecha */}
      <img
        src="/assets/equipo27.svg"
        alt=""
        className="
          absolute top-0 right-0 z-20 select-none pointer-events-none
          w-[min(44vw,700px)] md:w-[min(42vw,760px)] h-auto max-w-none
        "
      />

      {/* Imagen decorativa: abajo-izquierda (pegada) */}
      <img
        src="/assets/equipo27_2.svg"
        alt=""
        className="
          absolute left-0 -bottom-[8vh] md:-bottom-[10vh] lg:-bottom-[12vh] block
          z-10 select-none pointer-events-none
          w-[min(46vw,560px)] md:w-[min(38vw,640px)] h-auto max-w-none
        "
      />

      {/* Contenido */}
      <div className="relative z-30 container mx-auto px-6 sm:px-8 lg:px-10 pt-24 md:pt-32 pb-32">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Título + subtítulo (izquierda) */}
          <div className="col-span-12 lg:col-span-7">
            <h1 className="text-[clamp(2rem,6vw,4rem)] font-extrabold leading-tight tracking-tight uppercase text-[#0E6F7E]">
              TWENTY SEVENTH
            </h1>
            <p className="mt-3 text-[clamp(1.125rem,2.5vw,1.75rem)] font-semibold text-slate-800">
              movimiento confiables y con proposito
            </p>

            {/* Cuadro 1: IZQUIERDA debajo del título */}
            <h3 className="mt-8 text-sm font-extrabold tracking-wider text-[#0E6F7E]">
              DESDE 2010
            </h3>
            <div
              className="
                mt-3 rounded-2xl p-5 sm:p-6 shadow-xl max-w-[640px]
                text-slate-900 leading-relaxed
                bg-[linear-gradient(135deg,#002C3D_0%,#0E6F7E_35%,#FFE67B_75%,#FFF7E6_100%)]
              "
            >
              Nuestro sueño inició con una mudanza y de entender que este paso
              marca un antes y un después en la vida de cada familia. Por eso
              con nuestro hogar como inspiración iniciamos este viaje.
            </div>
          </div>

          {/* Columna derecha con 2 cuadros - MÁS ABAJO */}
          <div
            className="
              col-span-12 lg:col-span-5
              flex flex-col gap-10
              lg:absolute lg:right-6 lg:-bottom-110 lg:w-[calc(41.666667%-3rem)]
              lg:max-w-[500px]
            "
          >
            <div>
              <h3 className="text-sm font-extrabold tracking-wider text-[#0E6F7E]">
                NUESTRO PROPÓSITO
              </h3>
              <div
                className="mt-3 rounded-2xl p-5 sm:p-6 shadow-xl text-slate-900 leading-relaxed
                    bg-[linear-gradient(135deg,#002C3D_0%,#0E6F7E_35%,#FFE67B_75%,#FFF7E6_100%)]"
              >
                Esta empresa representa el sueño de millones de familias, de
                llegar a cada destino con la tranquilidad y la esperanza de
                haber hecho un buen trabajo.
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold tracking-wider text-[#0E6F7E]">
                PROFESIONALES EN MUDANZA
              </h3>
              <div
                className="mt-3 rounded-2xl p-5 sm:p-6 shadow-xl text-slate-900 leading-relaxed
                    bg-[linear-gradient(135deg,#002C3D_0%,#0E6F7E_35%,#FFE67B_75%,#FFF7E6_100%)]"
              >
                Nuestro equipo está conformado por profesionales 100%
                capacitados que entienden que cada objeto representa más que
                algo material. Los cuidamos por ti y usamos los mejores
                materiales.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStorySection;