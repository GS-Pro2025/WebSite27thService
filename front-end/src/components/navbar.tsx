import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToPage = (page: string) => {
    setIsMobileMenuOpen(false);
    navigate(`/${page}`);
  };

  const goToHome = () => {
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Helper function to check if current page is active
  const isActivePage = (page: string) => {
    return (
      location.pathname === `/${page}` ||
      (page === "" && location.pathname === "/")
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0E6F7E]/60 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/assets/27_logo_white.svg"
              alt="Twenty Seventh"
              className="h-12 w-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
              onClick={goToHome}
            />
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8 ml-8">
            <span
              onClick={() => navigateToPage("services")}
              className={`font-medium transition-colors hover:text-[#FFE67B] cursor-pointer text-white ${
                isActivePage("services")
                  ? "text-[#FFE67B] border-b-2 border-[#FFE67B]"
                  : ""
              }`}
            >
              SERVICES
            </span>
            <span
              onClick={() => navigateToPage("your-move")}
              className={`font-medium transition-colors hover:text-[#FFE67B] cursor-pointer text-white ${
                isActivePage("your-move")
                  ? "text-[#FFE67B] border-b-2 border-[#FFE67B]"
                  : ""
              }`}
            >
              YOUR MOVE
            </span>
            <span
              onClick={() => navigateToPage("about-us")}
              className={`font-medium transition-colors hover:text-[#FFE67B] cursor-pointer text-white ${
                isActivePage("about-us")
                  ? "text-[#FFE67B] border-b-2 border-[#FFE67B]"
                  : ""
              }`}
            >
              ABOUT US
            </span>
            <span
              onClick={() => navigateToPage("coverage")}
              className={`font-medium transition-colors hover:text-[#FFE67B] cursor-pointer text-white ${
                isActivePage("coverage")
                  ? "text-[#FFE67B] border-b-2 border-[#FFE67B]"
                  : ""
              }`}
            >
              COVERAGE
            </span>
          </div>

          {/* Contact Button */}
          <div className="flex items-center ml-8">
            <button
              onClick={() => navigateToPage("contact")}
              className="bg-[#FFE67B] hover:bg-[#FFE67BCC] text-black font-semibold px-6 py-2 rounded-full transition-colors duration-300"
            >
              CONTACT US
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden ml-4">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden transition-all duration-300 ${
              isScrolled ? "bg-white/95" : "bg-black/90"
            } backdrop-blur-md`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <span
                onClick={() => navigateToPage("services")}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer text-white ${
                  isActivePage("services")
                    ? "text-[#FFE67B] bg-[#FFE67B]/10 border-b-2 border-[#FFE67B]"
                    : "hover:text-[#FFE67B] hover:bg-white/10"
                }`}
              >
                SERVICES
              </span>
              <span
                onClick={() => navigateToPage("your-move")}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer text-white ${
                  isActivePage("your-move")
                    ? "text-[#FFE67B] bg-[#FFE67B]/10 border-b-2 border-[#FFE67B]"
                    : "hover:text-[#FFE67B] hover:bg-white/10"
                }`}
              >
                YOUR MOVE
              </span>
              <span
                onClick={() => navigateToPage("about-us")}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer text-white ${
                  isActivePage("about-us")
                    ? "text-[#FFE67B] bg-[#FFE67B]/10 border-b-2 border-[#FFE67B]"
                    : "hover:text-[#FFE67B] hover:bg-white/10"
                }`}
              >
                ABOUT US
              </span>
              <span
                onClick={() => navigateToPage("coverage")}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer text-white ${
                  isActivePage("coverage")
                    ? "text-[#FFE67B] bg-[#FFE67B]/10 border-b-2 border-[#FFE67B]"
                    : "hover:text-[#FFE67B] hover:bg-white/10"
                }`}
              >
                COVERAGE
              </span>
              <button
                onClick={() => navigateToPage("contact")}
                className="block w-full text-left px-3 py-2 mt-4 bg-[#FFE67B] hover:bg-amber-500 text-black font-semibold rounded-md transition-colors"
              >
                CONTACT US
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;