import React from "react";
import Img from "/assets/logo_principal_inicio.png";
import lineas from "/assets/Vectorabout.svg";
import Img2 from "/assets/Group2.png";

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
          bg-gradient-to-b from-[#0E6F7E] to-[#ffffff]
        "
        aria-hidden="true"
      />

      {/* Líneas decorativas de secuencia */}
      <img
        src={lineas}
        alt=""
        className="
          absolute  inset-0 z-[5] select-none pointer-events-none
          w-full h-auto object-cover
        "
        aria-hidden="true"
      />

      {/* Imagen decorativa: arriba-derecha */}
      <img
        src={Img}
        alt=""
        className="
          absolute top-0 right-0 z-20 select-none pointer-events-none
          w-1/2 h-auto max-w-none
          opacity-90
        "
      />

      {/* Imagen decorativa: abajo-izquierda (pegada) */}
      <img
        src={Img2}  
        alt=""
        className="
          absolute left-[5%] -bottom-[8vh] md:-bottom-[10vh] lg:-bottom-[12vh] block
          z-10 select-none pointer-events-none
          w-[min(52vw,680px)] md:w-[min(44vw,760px)] h-auto max-w-none
          opacity-90 -rotate-[10deg] origin-bottom-left
        "
      />

      {/* Contenido */}
      <div className="relative z-30 container mx-auto px-6 sm:px-8 lg:px-10 pt-24 md:pt-32 pb-32">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Título + subtítulo (izquierda) */}
          <div className="col-span-12 lg:col-span-7">
            <h1 className="text-[clamp(2rem,6vw,4rem)] font-extrabold leading-tight tracking-tight uppercase text-[#FFFFFF]">
              TWENTY SEVENTH
            </h1>
            <p className="mt-3 text-[clamp(1.125rem,2.5vw,1.75rem)] font-semibold text-slate-800">
              reliable moves with purpose
            </p>

            {/* Cuadro 1: IZQUIERDA debajo del título */}
            <h3 className="mt-8 text-lg font-extrabold tracking-wider text-[#0E6F7E]">
              SINCE 2010
            </h3>
            <div
              className="
                mt-3 rounded-2xl p-5 sm:p-6 shadow-xl max-w-[640px]
                text-white leading-relaxed text-xl
                bg-[linear-gradient(135deg,#002C3D_0%,#0E6F7E_35%,#FFE67B_85%,#FFF7E6_100%)]
              "
            >
              Our dream started with a single move and understanding that this step marks a before and after in every family's life. That's why, with our own home as inspiration, we began this journey.
            </div>
          </div>

          {/* Espaciador en desktop */}
          <div className="hidden lg:block lg:col-span-5"></div>

          {/* Cuadro 2: DERECHA abajo */}
          <div className="col-span-12 lg:col-span-5 mt-10 lg:mt-20">
            <h3 className="text-lg font-extrabold tracking-wider text-[#0E6F7E]">
              OUR PURPOSE
            </h3>
            <div
              className="mt-3 rounded-2xl p-5 sm:p-6 shadow-xl text-white leading-relaxed
                  bg-[linear-gradient(135deg,#002C3D_0%,#0E6F7E_35%,#FFE67B_85%,#FFF7E6_100%)] text-xl"
            >
              This company represents the dream of millions of families, to reach every destination with the peace of mind and hope of having done a great job.
            </div>
          </div>

          {/* Cuadro 3: CENTRO abajo */}
          <div className="col-span-12 lg:col-start-4 lg:col-span-6 mt-10 lg:mt-20">
            <h3 className="text-lg font-extrabold tracking-wider text-[#0E6F7E]">
              MOVING PROFESSIONALS
            </h3>
            <div
              className="mt-3 rounded-2xl p-5 sm:p-6 shadow-xl text-white leading-relaxed
                  bg-[linear-gradient(135deg,#002C3D_0%,#0E6F7E_35%,#FFE67B_85%,#FFF7E6_100%)] text-xl"
            >
              Our team is made up of 100% trained professionals who understand that each object represents more than just something material. We take care of them for you and use the best materials.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStorySection;