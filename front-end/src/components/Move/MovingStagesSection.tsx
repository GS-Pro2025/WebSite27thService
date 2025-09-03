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
            <div className="relative mb-2">
              <div className="bg-[#FFE67B] w-24 h-20 lg:w-16 lg:w-24 h-24 rounded-full flex items-center justify-center text-2xl lg:text-7xl font-bold text-[#7AACAE] shadow-lg z-10 transform transition-all duration-300 hover:scale-110 group cursor-help">
                1
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F6F7C] text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-20">
                  Step 1: Packing
                </div>
              </div>
            </div>
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
            <div className="relative mb-2">
              <div className="bg-[#FFE67B] w-24 h-20 lg:w-16 lg:w-24 h-24 rounded-full flex items-center justify-center text-2xl lg:text-7xl font-bold text-[#7AACAE] shadow-lg z-10 transform transition-all duration-300 hover:scale-110 group cursor-help">
                2
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F6F7C] text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-20">
                  Step 2: Loading
                </div>
              </div>
            </div>
            <h3
              className="text-[#FFE67B] text-2xl font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Loading
            </h3>
          </div>

          <div className="flex flex-col items-center sm:col-start-1 sm:row-start-3 sm:translate-y-2 sm:translate-x-15">
            <div className="relative mb-2">
              <div className="bg-[#FFE67B] w-24 h-20 lg:w-16 lg:w-24 h-24 rounded-full flex items-center justify-center text-2xl lg:text-7xl font-bold text-[#7AACAE] shadow-lg z-10 transform transition-all duration-300 hover:scale-110 group cursor-help">
                3
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F6F7C] text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-20">
                  Step 3: Delivery
                </div>
              </div>
            </div>
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
            <div className="relative mb-2">
              <div className="bg-[#FFE67B] w-24 h-20 lg:w-16 lg:w-24 h-24 rounded-full flex items-center justify-center text-2xl lg:text-7xl font-bold text-[#7AACAE] shadow-lg z-10 transform transition-all duration-300 hover:scale-110 group cursor-help">
                4
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F6F7C] text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-20">
                  Step 4: Unpacking
                </div>
              </div>
            </div>
            <h3
              className="text-[#FFE67B] text-2xl font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Unpacking
            </h3>
          </div>

          <div className="flex flex-col items-center sm:col-start-3 sm:row-start-5 sm:-translate-x-40 sm:-translate-y-12">
            <div className="relative mb-2">
              <div className="bg-[#FFE67B] w-24 h-20 lg:w-16 lg:w-24 h-24 rounded-full flex items-center justify-center text-2xl lg:text-7xl font-bold text-[#7AACAE] shadow-lg z-10 transform transition-all duration-300 hover:scale-110 group cursor-help">
                5
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F6F7C] text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-20">
                  Step 5: Organization
                </div>
              </div>
            </div>
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
