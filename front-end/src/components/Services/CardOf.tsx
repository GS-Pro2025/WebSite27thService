import React from "react";
import backgroundImg from "/assets/Slider5.png";

const CardOffices: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[600px] md:min-h-[700px] overflow-hidden rounded-t-3xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImg}
          alt="Office organization"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20"></div>

      {/* Content Container - Centered */}
      <div className="relative h-full w-full flex items-center justify-center px-6 md:px-10 lg:px-16 py-12 md:py-16">
        
        <div className="w-full max-w-6xl flex flex-col justify-center gap-8 md:gap-10 lg:gap-12">
          
          {/* Row 1 - Smart Placement */}
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 md:gap-6 items-center">
            {/* Title Badge */}
            <div className="bg-[#FFE67B]/90 px-6 md:px-8 lg:px-10 py-4 md:py-5 rounded-2xl shadow-xl lg:justify-self-start">
              <h3 className="text-black font-bold text-sm md:text-base lg:text-lg xl:text-xl uppercase text-center lg:whitespace-nowrap">
                SMART PLACEMENT
              </h3>
            </div>
            
            {/* Description Box */}
            <div className="bg-[#0E6F7E]/80 backdrop-blur-sm rounded-2xl p-6 md:p-7 lg:p-8 shadow-xl">
              <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed font-semibold">
                We put your furniture and boxes in the right rooms so your space makes sense from day one.
              </p>
            </div>
          </div>

          {/* Row 2 - Setting Up Your Stuff */}
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 md:gap-6 items-center">
            {/* Title Badge */}
            <div className="bg-[#FFE67B]/90 px-6 md:px-8 lg:px-10 py-4 md:py-5 rounded-2xl shadow-xl lg:justify-self-start">
              <h3 className="text-black font-bold text-sm md:text-base lg:text-lg xl:text-xl uppercase text-center lg:whitespace-nowrap">
                SETTING UP YOUR STUFF
              </h3>
            </div>
            
            {/* Description Box */}
            <div className="bg-[#0E6F7E]/80 backdrop-blur-sm rounded-2xl p-6 md:p-7 lg:p-8 shadow-xl">
              <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed font-semibold">
                Once everything's unpacked, we'll arrange your things in closets, shelves, and drawers—following your preferences or our organizing know-how.
              </p>
            </div>
          </div>

          {/* Row 3 - Creating Functional Spaces */}
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 md:gap-6 items-center">
            {/* Title Badge */}
            <div className="bg-[#FFE67B]/90 px-6 md:px-8 lg:px-10 py-4 md:py-5 rounded-2xl shadow-xl lg:justify-self-start">
              <h3 className="text-black font-bold text-sm md:text-base lg:text-lg xl:text-xl uppercase text-center leading-tight">
                CREATING FUNCTIONAL<br className="hidden md:inline" /> SPACES
              </h3>
            </div>
            
            {/* Description Box */}
            <div className="bg-[#0E6F7E]/80 backdrop-blur-sm rounded-2xl p-6 md:p-7 lg:p-8 shadow-xl">
              <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed font-semibold">
                We'll help you organize your kitchen, closets, bathroom, and every corner of your home, making sure everything has its place.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Right - Call to Action */}
      <div className="absolute bottom-6 md:bottom-10 lg:bottom-12 right-6 md:right-10 lg:right-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl">
          <p className="text-[#0E6F7E] text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-right leading-tight">
            Your New Home, Organized
          </p>
          <p className="text-[#0E6F7E] text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-right">
            And Ready To Enjoy
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardOffices;