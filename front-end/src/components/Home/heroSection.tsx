import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#68A2A6] overflow-hidden h-[800px] flex items-center pt-20 pb-20">
      {/* Ola superior */}
      <div className="absolute top-0 left-0 w-full z-0">
        <img
          src="/assets/banner1.svg"
          alt="Ola superior"
          className="w-full h-auto object-cover object-bottom"
        />
      </div>

      {/* Imagen decorativa derecha */}
      {/* <div className="absolute top-0 right-0 z-10">
        <img
          src="/assets/logo_principal_inicio.png"
          alt="Equipo Twenty Seventh"
          className="w-[220px] md:w-[450px] lg:w-[600px] xl:w-[775px] 2xl:w-[800px] h-auto object-cover"
        />
      </div> */}

      {/* Contenido principal */}
      {/* <div className="relative z-20 w-full flex justify-center md:justify-start px-6 sm:px-10 md:px-20 mt-0 md:-mt-20 font-montserrat">
        <div className="max-w-[500px] text-center md:text-left mt-15">
          <h1 className="text-white text-[32px] sm:text-[36px] md:text-[40px] uppercase mb-6 leading-tight">
            <span className="font-normal block">Un nuevo comienzo</span>
            <span className="font-bold block ml-20">Inicia aquí</span>{" "}
          </h1>

          <div className="flex justify-center md:justify-start -mt-3 ml-12">
            {" "}
            <button className="bg-[#FFE67B] hover:bg-[#FFE67B]/80 text-[#535353] text-[24px] font-semibold px-25 py-6 rounded-full uppercase text-sm sm:text-base mb-10 transition-colors">
              Cotiza aquí
            </button>
          </div>

          <p className="text-[#585858] text-[30px] font-medium leading-tight text-left -ml-6">
            {" "}
            Tu mudanza hace parte de tu nueva historia, por eso{" "}
            <span className="text-[#FFE67B] font-semibold">
              estamos aquí para cuidar lo que amas
            </span>{" "}
            y guiarte en cada paso del trayecto.
          </p>
        </div>
      </div> */}
    </section>
  );
};

export default HeroSection;
