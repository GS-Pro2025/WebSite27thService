import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignUpModal from "./Auth/SignUpModal";
import LoginModal from "./Auth/LoginModal";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location]);

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

  const isActivePage = (page: string) => {
    return (
      location.pathname === `/${page}` ||
      (page === "" && location.pathname === "/")
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0F6F7C]/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="/assets/27_logo_white.svg"
                alt="Twenty Seventh"
                className="h-16 sm:h-20 w-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
                onClick={goToHome}
              />
            </div>

            {/* Links principales */}
            <div className="hidden md:flex items-center space-x-8 md:ml-10">
              <button
                onClick={() => navigateToPage("services")}
                className="text-white font-medium transition-colors duration-300 hover:text-[#FFE67B]"
              >
                SERVICES
              </button>
              <button
                onClick={() => navigateToPage("your-move")}
                className="text-white font-medium transition-colors duration-300 hover:text-[#FFE67B]"
              >
                YOUR MOVE
              </button>
              <button
                onClick={() => navigateToPage("about-us")}
                className="text-white font-medium transition-colors duration-300 hover:text-[#FFE67B]"
              >
                ABOUT US
              </button>
              <button
                onClick={() => navigateToPage("coverage")}
                className="text-white font-medium transition-colors duration-300 hover:text-[#FFE67B]"
              >
                COVERAGE
              </button>
              <button
                onClick={() => navigateToPage("contact")}
                className="bg-[#FFE67B] hover:bg-[#FFE67BCC] text-black font-semibold px-6 py-2 rounded-full transition-colors duration-300"
              >
                CONTACT US
              </button>
            </div>

            {/* Botones Login / Sign Up / Logout */}
            <div className="hidden md:flex items-center space-x-4 ml-auto">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="bg-white text-black font-semibold px-5 py-2 rounded-full transition-colors duration-300 hover:bg-gray-200"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="bg-white text-black font-semibold px-5 py-2 rounded-full transition-colors duration-300 hover:bg-gray-200"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsSignUpOpen(true)}
                    className="bg-[#FFE67B] text-black font-semibold px-5 py-2 rounded-full transition-colors duration-300 hover:bg-[#FFD84D]"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Botón menú móvil */}
            <div className="ml-auto md:hidden">
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

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-[#0F6F7C]/80 backdrop-blur-md pb-4">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <span
                  onClick={() => navigateToPage("services")}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium cursor-pointer ${
                    isActivePage("services")
                      ? "text-[#FFE67B] bg-white/10"
                      : "text-white hover:text-[#FFE67B] hover:bg-white/10"
                  }`}
                >
                  SERVICES
                </span>
                {/* ... otros links ... */}
                <button
                  onClick={() => navigateToPage("contact")}
                  className="block w-full text-center px-3 py-3 mt-4 bg-[#FFE67B] hover:bg-amber-400 text-black font-semibold rounded-md transition-colors"
                >
                  CONTACT US
                </button>

                {/* Botones Login / Sign Up / Logout en móvil */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-white/20 mt-4">
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="bg-white text-black font-semibold px-5 py-2 rounded-full transition-colors duration-300 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setIsLoginOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="bg-white text-black font-semibold px-5 py-2 rounded-full transition-colors duration-300 hover:bg-gray-200"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          setIsSignUpOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="bg-[#FFE67B] text-black font-semibold px-5 py-2 rounded-full hover:bg-[#FFD84D]"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;
