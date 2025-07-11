import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#C6D7CE] overflow-hidden min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center pt-20 pb-20"> 

      <div className="absolute bottom-0 left-0 w-full z-0">
        <img
          src="/assets/superior.svg"
          alt="Ola inferior"
          className="w-full h-auto object-cover object-bottom"
        />
      </div>

        {/* IMAGEN SUPERIOR DERECHA */}
        <div className="absolute top-0 right-0 z-10 hidden md:block">
        <img
            src="/assets/logo_principal_inicio.png"
            alt="Equipo Twenty Seventh"
            className="w-[350px] sm:w-[450px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-auto object-cover"
        />
        </div>


      {/* CONTENIDO TEXTO */}
      <div className="relative z-20 max-w-7x1 px-20 flex items-start h-full -mt-20"> 
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-[#FFFF] text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-6 leading-tight">
            Un nuevo comienzo<br />
            Inicia aquí
          </h1>

          <button className="bg-[#FEDC56] hover:bg-[#FEDC56]/80 text-[#000000] font-semibold px-8 py-3 rounded-full uppercase text-sm sm:text-base mb-8 transition-colors">
            Cotiza aquí
          </button>

          <p className="text-[#585858] text-base sm:text-lg font-medium leading-relaxed">
            Tu mudanza hace parte de tu nueva historia por eso, <br />
            <span className="text-[#FFE67B] font-bold">estamos aquí para cuidar lo que amas</span> y guiarte en cada paso del trayecto.
          </p>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;