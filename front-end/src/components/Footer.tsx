import React from "react";
import facebook from "/assets/facebook.svg";
import instagram from "/assets/instagram.svg";

const Footer: React.FC = () => {
  return (
    <div className="relative w-full bg-[#7AACAE] -mt-20 pt-20">
      {/* Cuadro con degradado superpuesto */}
      <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 z-30 w-[95%] md:w-[85%] flex justify-center mt-8 lg:mt-0">
        <div
          className="w-full rounded-xl p-2 sm:p-4 md:p-6 text-center text-white font-bold shadow-xl"
          style={{
            background: "linear-gradient(90deg, #0E6F7E 0%, #FFE67B 100%)",
          }}
        >
          {/* AJUSTE: Texto más pequeño en móvil */}
          <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3 leading-tight">
            Book today, plan with peace of mind, and ensure the care your move
            deserves.
          </h2>
          {/* AJUSTE: Botón más pequeño en móvil */}
          <button className="mt-2 px-5 py-1 sm:px-8 sm:py-2 bg-white text-black text-xs sm:text-sm md:text-base font-semibold rounded-full shadow hover:bg-gray-100 transition-colors">
            BOOK HERE
          </button>
        </div>
      </div>

      {/* Contenido principal del footer */}
      <footer className="relative z-0 pt-0 -mt-4">
        <div className="flex flex-col md:flex-row w-full">
          {/* Columna Izquierda */}
          <div className="w-full md:w-1/2 bg-[#7AACAE] p-8 md:p-16 text-black mt-8 md:mt-12">
            {/* Contenedor principal para "Ubicacion y Contacto" y "Find us on social" */}
            <div className="flex flex-col md:items-start md:justify-start md:gap-8">
              {/* Información de contacto */}
              <div className="w-full mb-8">
                {" "}
                <h3 className="text-xl font-bold uppercase mb-12">
                  LOCATION AND CONTACT
                </h3>
                <div className="mb-8">
                  <p className="text-sm font-semibold mb-2">Office:</p>
                  <p className="text-base">Chesapeake, Virginia</p>
                </div>
                <div className="mb-8">
                  <p className="text-sm font-semibold mb-2">Phone:</p>
                  <p className="text-base">+1 (407) 547-7478</p>
                </div>
                <div className="mb-12">
                  <p className="text-sm font-semibold mb-2">Email:</p>
                  <p className="text-base break-words">
                    administrative.manager@twentyseventhservicesgroup.com
                  </p>
                </div>
              </div>

              {/* Redes sociales */}
              <div className="flex-none -mt-15">
                {" "}
                <h3 className="text-xl font-bold uppercase mb-2">
                  Find us on social
                </h3>
                <div className="flex space-x-4 mb-16">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <div className="hidden md:block flex-shrink-0">
                      <img
                        src={facebook}
                        alt="Twenty Seventh"
                        className="h-10 sm:h-20 w-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
                      />
                    </div>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <img
                      src={instagram}
                      alt="Twenty Seventh"
                      className="h-10 sm:h-20 w-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Enlaces inferiores */}
            <div className="text-white flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-10 text-sm mt-12 md:mt-0">
              <a href="#" className="text-white hover:underline">
                Terms of Use
              </a>
              <a href="#" className="text-white hover:underline">
                Contact
              </a>
              <a href="#" className="text-white hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-white hover:underline">
                Jobs
              </a>
              <a href="#" className="text-white hover:underline">
                Help
              </a>
            </div>
          </div>

          {/* Columna Derecha - Logo */}
          <div className="w-full md:w-1/2 bg-[#0E6F7E] h-[300px] md:h-auto flex items-center justify-center">
            <img
              src="/assets/logofooter.svg"
              alt="Twenty Seventh Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
