import React from "react";

const ProfessionalMovingSection: React.FC = () => {
  return (
    <section className="bg-[#7AACAE] py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-left mt-20 z-10">
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2
            className="text-white font-extrabold text-3xl sm:text-4xl text-center md:text-left mb-6 md:mb-0"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            This is how we make your move professional
          </h2>
          <button
            className="bg-[#FFE67B] text-white font-bold py-3 px-8 rounded-full text-lg sm:text-2xl lg:text-3xl whitespace-nowrap"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            SCHEDULE NOW
          </button>
        </div>

        <div className="inline-grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-[#DCE3D7] rounded-3xl w-full aspect-square mb-4 flex items-center justify-center p-1">
              <img src="/assets/carga.svg" alt="Carga" />
            </div>
            <p
              className="text-[#FFE67B] text-2xl font-semibold text-center"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Trained Professionals
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#DCE3D7] rounded-3xl w-full aspect-square mb-4 flex items-center justify-center p-1">
              <img src="assets/camion.svg" alt="Camion" />
            </div>
            <p
              className="text-[#FFE67B] text-2xl font-semibold text-center"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Customized Moves
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#DCE3D7] rounded-3xl w-full aspect-square mb-4 flex items-center justify-center p-1">
              <img src="/assets/empaque.svg" alt="Empaque" />
            </div>
            <p
              className="text-[#FFE67B] text-2xl font-semibold text-center"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Quality Materials and Service
            </p>
          </div>
        </div>
      </div>

      <div className="absolute left-0 w-full hidden md:flex md:bottom-23 lg:bottom-5">
        <img
          src="assets/flechaCompleta.svg"
          alt="Flecha decorativa de ancho completo"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};

export default ProfessionalMovingSection;
