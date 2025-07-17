import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#C6D7CE] overflow-hidden min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center pt-20 pb-20">
      {/* Ola superior */}
      <div className="absolute top-0 left-0 w-full z-0">
        <img
          src="/assets/superior.svg"
          alt="Ola superior"
          className="w-full h-auto object-cover object-bottom"
        />
      </div>

      {/* Imagen decorativa derecha */}
      <div className="absolute top-0 right-0 z-10 hidden md:block">
        <img
          src="/assets/logo_principal_inicio.png"
          alt="Equipo Twenty Seventh"
          className="w-[350px] md:w-[450px] lg:w-[600px] xl:w-[700px] 2xl:w-[800px] h-auto object-cover"
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 max-w-7xl px-6 sm:px-10 md:px-20 w-full flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start h-full mt-0 md:-mt-80">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl uppercase mb-6 leading-tight font-montserrat">
            <span className="font-normal">Un nuevo comienzo</span>
            <br />
            <span className="font-bold">Inicia aquí</span>
          </h1>

          <div className="flex justify-center md:justify-start -mt-3">
            <button className="bg-[#FEDC56] hover:bg-[#FEDC56]/80 text-black font-semibold px-8 py-3 rounded-full uppercase text-sm sm:text-base mb-10 transition-colors">
              Cotiza aquí
            </button>
          </div>

          <p className="text-[#585858] text-[20px] sm:text-[23px] font-bold leading-relaxed font-montserrat px-2 sm:px-0">
            Tu mudanza hace parte de tu nueva historia, por eso
            <span className="text-[#FFE67B] font-bold">
              {" "}
              estamos aquí para cuidar lo que amas
            </span>{" "}
            y guiarte en cada paso del trayecto.
          </p>
        </div>
      </div>

      {/* Ola inferior */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 254">
          <path
            fill="#7AACAE"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,122.7C640,160,800,224,960,245.3C1120,267,1280,245,1360,234.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
