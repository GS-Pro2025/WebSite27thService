import React, { useState } from "react";
import QuoteForm from "../QuoteForm";
import QuoteModal from "../QuoteModal";

const ProcessSection: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="w-full relative overflow-hidden -mt-[70px] sm:-mt-[150px] md:-mt-[140px] lg:-mt-[250px] xl:-mt-[260px]">
        {/* Fondo */}
        <img
          src="/assets/banner2-inicio.svg"
          alt="Proceso"
          className="w-full h-auto block"
        />

        {/* Contenedor*/}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-[8%] sm:pt-[10%] md:pt-[12%] lg:pt-[8%] xl:pt-[10%]">
          <div className="w-full order-1 px-4 sm:px-6 md:px-8">
            <h2
              className="text-center text-white font-[Montserrat] font-black 
               text-sm sm:text-2xl md:text-3xl lg:text-4xl leading-tight mb-2 sm:mb-8"
            >
              YOUR MOVE MADE EASY, JUST AS IT SHOULD BE!
            </h2>
          </div>

          <div className="w-full my-2 sm:my-12 md:my-9 lg:my-20 order-2">
            <img
              src="/assets/procesoCompleto.svg"
              alt="Proceso completo"
              className="w-full h-auto block"
            />
          </div>

          <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 lg:gap-8 items-start px-4 sm:px-6 md:px-8 order-3">
            <div className="w-full sm:w-1/2 font-[Montserrat] text-left mb-1 sm:mb-0">
              <h3 className="text-sm sm:text-[18px] md:text-[22px] lg:text-[28px] font-extrabold mb-1 sm:mb-2 text-[#FFE67B]">
                SEE HOW WE DO IT
              </h3>
              <p className="text-[10px] sm:text-[12px] md:text-[16px] lg:text-[18px] font-bold leading-tight text-white">
                Here, in just three simple steps, we'll show you how to schedule
                a fast, stress-free move with 100% certified professionals.
              </p>
            </div>

            {/* Lógica para mostrar botón o formulario */}
            <div className="w-full sm:w-1/2">
              <div className="lg:hidden w-full flex justify-center mt-2">
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-[#FFE67B] text-black text-xs font-semibold py-2 px-6 rounded-full shadow-lg"
                >
                  GET A QUOTE NOW
                </button>
              </div>
              <div className="hidden lg:block relative">
                <div className="absolute -top-6 lg:-top-8 -translate-x-1/2 bg-[#FFE67B] w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-2xl lg:text-3xl font-bold text-[#7ARACAE] shadow-lg z-10">
                  1
                </div>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default ProcessSection;
