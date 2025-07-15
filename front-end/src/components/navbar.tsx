import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/90 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/assets/27_logo_white.svg"
              alt="Twenty Seventh"
              className="h-12 w-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
            />
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 ml-8">
            <a
              href="#services"
              className={`font-medium transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-[#FFE67B]' : 'text-white hover:text-[#FFE67B]'
              }`}
            >
              SERVICIOS
            </a>
            <a
              href="#moving"
              className={`font-medium transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-[#FFE67B]' : 'text-white hover:text-[#FFE67B]'
              }`}
            >
              TU MUDANZA
            </a>
            <a
              href="#about-us"
              className={`font-medium transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-[#FFE67B]' : 'text-white hover:text-[#FFE67B]'
              }`}
            >
              NOSOTROS
            </a>
            <a
              href="#coverage"
              className={`font-medium transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-[#FFE67B]' : 'text-white hover:text-[#FFE67B]'
              }`}
            >
              COBERTURA
            </a>
          </div>
          {/* Contact Button */}
          <div className="flex items-center ml-8">
            <button className="bg-yellow hover:bg-yellow/80 text-[#535353] font-semibold px-6 py-2 rounded-full transition-colors">
              CONTÁCTANOS
            </button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button className={`p-2 rounded-md ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;