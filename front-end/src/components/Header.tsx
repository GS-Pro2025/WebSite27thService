import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-50 font-montserrat">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + texto */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Twenty Seventh Logo" className="h-16" />
          <span className="text-white font-semibold text-base tracking-wide">
            TWENTY SEVENTH
          </span>
        </div>

        {/* Menú de navegación */}
        <nav className="hidden md:flex items-center space-x-6 text-white font-semibold text-base">
          <a href="#services" className="hover:text-yellow-300">
            SERVICIOS
          </a>
          <a href="#mudanza" className="hover:text-yellow-300">
            TU MUDANZA
          </a>
          <a href="#nosotros" className="hover:text-yellow-300">
            NOSOTROS
          </a>
          <a href="#cobertura" className="hover:text-yellow-300">
            COBERTURA
          </a>
        </nav>

        {/* Botón de contacto */}
        <a
          href="#contacto"
          className="ml-6 bg-[#FFE67B] text-[#535353] text-[24px] font-semibold px-6 py-2 rounded-full shadow-md hover:brightness-105 transition"
        >
          Contáctanos
        </a>
      </div>
    </header>
  );
};

export default Header;
