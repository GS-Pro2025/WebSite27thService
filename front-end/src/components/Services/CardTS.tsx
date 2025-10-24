import React from "react";
import bagroundImg from "/assets/Slider0.webp";
import ServiceImg from "/assets/logos.png";

const MovingServicesHero: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[600px] md:min-h-[700px] overflow-hidden rounded-t-3xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={bagroundImg}
          alt="Equipo de mudanzas trabajando"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay sutil para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20"></div>

      {/* Main Container with Responsive Layout */}
      <div className="relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-8">
          
          {/* Left Content */}
          <div className="flex items-center justify-center lg:justify-start px-6 md:px-10 lg:px-12 py-8 md:py-12">
            <div className="w-full max-w-2xl">
              {/* Question Badge */}
              <div className="inline-block mb-6 md:mb-8">
                <div className="text-black bg-[#FFE67B] px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  WHY?
                </div>
              </div>

              {/* Main Text */}
              <div className="space-y-4 md:space-y-6">
                <div className="text-[#0E6F7E] text-base md:text-xl lg:text-2xl font-normal leading-relaxed bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl">
                  <p>
                    We'll tell you everything about the{" "}
                    <span className="font-bold">services</span> we have for you,
                    so you can discover which{" "}
                    <span className="font-bold">moving category</span> you
                    belong to.
                  </p>
                </div>

                <div className="text-[#0E6F7E] text-sm md:text-lg lg:text-xl leading-relaxed bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl">
                  <p>
                    Knowing the type of move you are going to make helps us
                    manage your move in record time.
                  </p>
                </div>
              </div>

              {/* Decorative Text - Mobile/Tablet Only */}
              <div className="mt-8 md:mt-10 lg:hidden text-center">
                <div className="space-y-3">
                  <div className="text-white text-xl md:text-2xl font-semibold drop-shadow-lg">
                    find out what
                  </div>
                  <div className="text-[#FFE67B] text-3xl md:text-4xl font-bold drop-shadow-2xl">
                    we move for you
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Services Image - Desktop Only */}
          <div className="hidden lg:flex items-center justify-center relative px-8">
            <div className="relative">
              <img
                src={ServiceImg}
                alt="Servicios de mudanza"
                className="w-full max-w-lg h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingServicesHero;