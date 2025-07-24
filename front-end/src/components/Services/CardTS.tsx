import React from 'react';
import bagroundImg from "/assets/Slider0.png"
import ServiceImg from "/assets/logos.png"

const MovingServicesHero: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={bagroundImg}
          alt="Equipo de mudanzas trabajando"
          className="w-full h-full object-cover rounded-t-4xl"
        />
      </div>
      
      {/* Overlay para mejor legibilidad en móvil */}
      <div className="absolute inset-0 "></div>

      {/* Main Container with Responsive Layout */}
      <div className="relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          
          {/* Left Content */}
          <div className="flex items-center lg:order-1 col-span-1 lg:col-span-1">
            <div className="container mx-auto px-4 md:px-6 lg:px-5">
              <div className="max-w-2xl mt-4 md:mt-10">
                
                {/* Question Badge */}
                <div className="inline-block mb-4 md:mb-8">
                  <div className="text-black bg-[#FFE67B]/90 px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-sm md:text-lg shadow-lg transform rotate-1">
                    WHY?
                  </div>
                </div>

                {/* Main Text */}
                <div className="space-y-3 md:space-y-6">
                  <p className="text-white text-sm md:text-xl lg:text-2xl font-normal leading-relaxed bg-white/20 md:bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl">
                    We’ll tell you everything about the <span className="font-bold">services</span> we have for you, so you can discover which <span className="font-bold">moving category</span> you belong to.
                  </p>

                  <p className="text-white text-sm md:text-lg lg:text-xl leading-relaxed bg-white/20 md:bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl">
                    Knowing the type of move you are going to make helps us manage your move in record time.
                  </p>
                </div>

                {/* Decorative Text Elements - Solo en móvil/tablet */}
                <div className="mt-6 md:mt-8 lg:hidden">
                  {/* Primera línea */}
                  <div className="flex items-center justify-center space-x-2 text-white mb-2">
                    <span className="text-xl md:text-3xl font-bold opacity-80 transform -rotate-6">find</span>
                    <span className="text-sm md:text-xl font-light opacity-60">out</span>
                    <span className="text-lg md:text-2xl font-bold opacity-70">what</span>
                  </div>

                  {/* Segunda línea */}
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-yellow-400 text-2xl md:text-4xl font-bold transform rotate-6">we move</span>
                    <span className="text-blue-400 text-sm md:text-xl">for</span>
                    <span className="text-white text-lg md:text-2xl font-semibold">you</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Services Image - SOLO VISIBLE EN DESKTOP */}
          <div className="hidden lg:flex relative justify-end lg:order-2">
            <div className="relative mt-10 px-0">
              <img
                src={ServiceImg}
                alt="Servicios de mudanza"
                className="w-4/6 h-auto max-w-md mx-0"
              />
            </div>            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingServicesHero;