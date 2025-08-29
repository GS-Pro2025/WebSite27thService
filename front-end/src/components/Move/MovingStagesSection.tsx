import React from "react";

const MovingStagesSection: React.FC = () => {
  return (
    <section className="bg-[#7AACAE] py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white -mt-30">
      <div className="absolute inset-0 z-0 opacity-75">
        <img
          src="assets/flechaClara.svg"
          alt="Background decorative arrows"
          className="hidden sm:block absolute right-0 bottom-154"
        />
        <img
          src="assets/flechaMedia.svg"
          alt="Background decorative arrows"
          className="hidden sm:block absolute left-0 bottom-82"
        />
        <img
          src="assets/lineaEtapas.svg"
          alt="Decorative dotted line"
          className="hidden sm:block absolute inset-0 w-full h-full object-contain -mt-26"
        />
      </div>

      <div className="container mx-auto relative z-10">
        <h2
          className="text-[#FFE67B] text-3xl md:text-4xl font-bold mb-12 md:mb-24 text-center sm:text-left"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Moving stages
        </h2>

        <div
          className="flex flex-col items-center text-center gap-y-12 
                       sm:grid sm:grid-cols-3 sm:gap-y-16 sm:gap-x-8 sm:relative sm:text-left sm:-translate-y-20"
        >
          <div className="flex flex-col items-center sm:col-start-2">
            <img src="assets/number1.svg" alt="Step 1" className="mb-2" />
            <h3
              className="text-[#FFE67B] text-2xl font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Packing
            </h3>
          </div>

          <div className="text-center sm:col-span-3 sm:flex sm:justify-center sm:items-center sm:-translate-y-2">
            <p
              className="text-2xl sm:text-4xl max-w-2xl"
              style={{ fontFamily: "'Montserrat'" }}
            >
              Safe moves twenty seventh does it for you
            </p>
          </div>

          <div className="flex flex-col items-center sm:col-start-3 sm:-translate-y-10">
            <img src="assets/number2.svg" alt="Step 2" className="mb-2" />
            <h3
              className="text-[#FFE67B] text-2xl font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Loading
            </h3>
          </div>

          <div className="flex flex-col items-center sm:col-start-1 sm:row-start-3 sm:translate-y-2 sm:translate-x-15">
            <img src="assets/number3.svg" alt="Step 3" className="mb-2" />
            <h3
              className="text-[#FFE67B] text-2xl font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Delivery
            </h3>
          </div>

          <div className="text-center sm:col-span-3 sm:flex sm:justify-center sm:items-center sm:-translate-y-15">
            <p
              className="text-2xl sm:text-4xl max-w-2xl"
              style={{ fontFamily: "'Montserrat'" }}
            >
              Stress-free, with commitment and the care you need
            </p>
          </div>

          <div className="flex flex-col items-center sm:col-start-2 sm:row-start-5 sm:-translate-x-45 sm:-translate-y-12">
            <img src="assets/number2.svg" alt="Step 4" className="mb-2" />
            <h3
              className="text-[#FFE67B] text-2xl font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Unpacking
            </h3>
          </div>

          <div className="flex flex-col items-center sm:col-start-3 sm:row-start-5 sm:-translate-x-40 sm:-translate-y-12">
            <img src="assets/number2.svg" alt="Step 5" className="mb-2" />
            <h3
              className="text-[#FFE67B] text-2xl font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Organization
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovingStagesSection;
