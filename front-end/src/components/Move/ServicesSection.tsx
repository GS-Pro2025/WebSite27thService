import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HoverPillSlider from "./HoverPillSlider";

const TEAL = "#0E6F7E";
const YELLOW = "#FFE67B";
const YELLOW_HOVER = "#FFD54D";

export default function ServicesSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetQuote = () => {
    const targetId = "process-section";
    if (location.pathname === "/") {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/", { state: { scrollTo: targetId } });
    }
  };

  return (
    <section
      className="
        relative w-full overflow-visible
        bg-[url('/assets/banner13.svg')] bg-cover bg-center
      "
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="w-full h-full bg-white/0" />
      </div>

      {/* Flecha + cajas */}
      <div className="relative w-full flex justify-center items-center mb-6">
        <img
          src="/assets/flechaService.svg"
          alt="Flecha hacia los servicios"
          className="absolute left-0 right-0 w-full md:w-3/4 max-w-none"
        />
        <h2 className="relative z-10 text-white font-extrabold text-xl md:text-5xl tracking-wide translate-y-5 -translate-x-30">
          DISCOVER OUR PACKAGES
        </h2>
        <img
          src="/assets/box.svg"
          alt="Cajas"
          className="absolute right-0 md:right-20 w-100 translate-x-40"
        />
      </div>

      {/* Contenido */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 mt-30">
        <p className="text-center text-white drop-shadow-sm font-bold text-xl md:text-2xl">
          Find yours here or we will help you create one tailored to your needs.
        </p>

        <HoverPillSlider />

        {/* CTA inferior amarillo */}
        <div className="mt-4 md:mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleGetQuote}
            className="rounded-full px-12 md:px-16 py-5 font-extrabold text-2xl md:text-3xl shadow-lg transition-colors duration-200"
            style={{ backgroundColor: YELLOW, color: TEAL }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                YELLOW_HOVER)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                YELLOW)
            }
          >
            Get a quote here 
          </button>
        </div>
      </div>
    </section>
  );
}
