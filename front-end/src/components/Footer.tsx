import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="relative w-full bg-[#7AACAE]">
      {/* Cuadro con degradado superpuesto */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-30 w-[90%] md:w-[75%] flex justify-center">
        <div
          className="w-full rounded-xl p-6 md:p-10 text-center text-white font-bold shadow-xl"
          style={{
            background: "linear-gradient(90deg, #0F8697 0%, #FFE67B 100%)",
          }}
        >
          <h2 className="text-lg md:text-2xl mb-4 leading-snug">
            Reserva hoy, planifica con tranquilidad y asegura el cuidado que tu
            mudanza merece
          </h2>
          <button className="mt-2 px-6 py-2 bg-white text-black font-semibold rounded-full shadow hover:bg-gray-100 transition-colors">
            RESERVA AQUÍ
          </button>
        </div>
      </div>

      {/* Contenido principal del footer */}
      <footer className="relative z-10 pt-32 md:pt-40">
        <div className="flex flex-col md:flex-row w-full">
          {/* Columna Izquierda */}
          <div className="w-full md:w-1/2 bg-[#7AACAE] p-8 md:p-16 text-black">
            <h3 className="text-xl font-bold uppercase mb-6">
              Ubicación y Contacto
            </h3>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-1">Sede:</p>
              <p className="text-base">Chesapeake, Virginia</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-1">Teléfono:</p>
              <p className="text-base">+1 (407) 547-7478</p>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold mb-1">Correo:</p>
              <p className="text-base break-words">
                administrative.manager@twentyseventhservicesgroup.com
              </p>
            </div>

            <h3 className="text-xl font-bold uppercase mb-6">
              Find us on social
            </h3>
            <div className="flex space-x-4 mb-16">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  className="w-7 h-7 fill-current text-black hover:text-gray-200 transition-colors"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h3V2.14C19.43 2.07 18.33 2 17.15 2c-3.15 0-5.15 1.98-5.15 5.5v3.25H8v4h3v8h4v-7.5z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  className="w-7 h-7 fill-current text-black hover:text-gray-200 transition-colors"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2A2.85 2.85 0 015 7.8v8.4C5 18.15 5.85 19 7.8 19h8.4c1.95 0 2.85-.85 2.85-2.85V7.8C19 5.85 18.15 5 16.2 5H7.6zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm6.5-3a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <svg
                  className="w-7 h-7 fill-current text-black hover:text-gray-200 transition-colors"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.8.36-1.65.6-2.55.72A4.54 4.54 0 0020.25 4c-1.37.76-2.9 1.3-4.5 1.62A4.52 4.52 0 0011 8.5c0 .35.04.7.12 1.05A12.92 12.92 0 013 3c-1.4.92-2.16 2.5-2 4a4.52 4.52 0 001.38 3.12 4.5 4.5 0 01-2-.56v.05c0 2.12 1.5 3.9 3.5 4.3A4.5 4.5 0 014 17.9v.08a4.52 4.52 0 004 3.16c-1.87 1.4-4.22 2.2-6.75 2.2-1.28 0-2.53-.08-3.75-.24C2.33 22.84 5 24 7.88 24A13 13 0 0021 10.75c0-.2 0-.4 0-.6C21.6 9.42 22.1 8.04 22.46 6z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg
                  className="w-7 h-7 fill-current text-black hover:text-gray-200 transition-colors"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.58 7.19a2.29 2.29 0 00-1.62-1.62C18.23 5 12 5 12 5s-6.23 0-7.96.57a2.29 2.29 0 00-1.62 1.62C2 8.96 2 12 2 12s0 3.04.57 4.81a2.29 2.29 0 001.62 1.62C5.77 19 12 19 12 19s6.23 0 7.96-.57a2.29 2.29 0 001.62-1.62C22 15.04 22 12 22 12s0-3.04-.57-4.81zM9.54 15.03v-6.06l5.22 3.03-5.22 3.03z" />
                </svg>
              </a>
            </div>

            {/* Enlaces inferiores */}
            <div className="text-white flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 text-sm">
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
              src="/assets/27_logo_white_729x729.svg"
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
