import React from "react";
import backgroundImg from "/assets/Slider3.png";

const CardPackaging: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[600px] md:min-h-[700px] overflow-hidden rounded-t-3xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImg}
          alt="Moving Services"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20"></div>

      {/* Cards Container */}
      <div className="relative h-full w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 h-full items-center">
          
          {/* Card 1 - Professional Packing */}
          <div className="flex flex-col justify-between space-y-4">
            {/* Title Badge */}
            <div className="flex justify-center">
              <div className="bg-[#FFE67B]/90 px-6 md:px-8 py-4 md:py-5 rounded-2xl shadow-xl">
                <h3 className="text-black font-bold text-base md:text-lg uppercase tracking-wide text-center leading-tight">
                  PROFESSIONAL<br />PACKING
                </h3>
              </div>
            </div>

            {/* Description Box */}
            <div className="bg-[#0E6F7E]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl">
              <p className="text-white text-sm md:text-base leading-relaxed font-semibold uppercase text-center">
                WE'LL PACK EVERYTHING FOR YOU, FROM FRAGILE ITEMS TO BULKY FURNITURE, USING TOP-QUALITY SPECIALIZED BOXES.
              </p>
            </div>
          </div>

          {/* Card 2 - Quality Materials */}
          <div className="flex flex-col justify-between space-y-4">
            {/* Title Badge */}
            <div className="flex justify-center">
              <div className="bg-[#FFE67B]/90 px-6 md:px-8 py-4 md:py-5 rounded-2xl shadow-xl">
                <h3 className="text-black font-bold text-base md:text-lg uppercase tracking-wide text-center leading-tight">
                  QUALITY<br />MATERIALS
                </h3>
              </div>
            </div>

            {/* Description Box */}
            <div className="bg-[#0E6F7E]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl">
              <p className="text-white text-sm md:text-base leading-relaxed font-semibold uppercase text-center">
                WE USE HEAVY-DUTY TAPE, BUBBLE WRAP, AND HIGH-STRENGTH PACKING PAPER TO KEEP YOUR STUFF SAFE DURING THE MOVE.
              </p>
            </div>
          </div>

          {/* Card 3 - Unpacking & Setup */}
          <div className="flex flex-col justify-between space-y-4">
            {/* Title Badge */}
            <div className="flex justify-center">
              <div className="bg-[#FFE67B]/90 px-6 md:px-8 py-4 md:py-5 rounded-2xl shadow-xl">
                <h3 className="text-black font-bold text-base md:text-lg uppercase tracking-wide text-center leading-tight">
                  UNPACKING &<br />SETUP
                </h3>
              </div>
            </div>

            {/* Description Box */}
            <div className="bg-[#0E6F7E]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl">
              <p className="text-white text-sm md:text-base leading-relaxed font-semibold uppercase text-center">
                WHEN WE GET TO YOUR NEW PLACE, WE'LL UNPACK AND PUT EVERYTHING WHERE YOU WANT IT, SO YOU CAN START ENJOYING YOUR NEW HOME RIGHT AWAY.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-6 md:bottom-8 lg:bottom-10 left-0 right-0 text-center px-4">
        <p className="text-white text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-2xl">
          Your Move, <span className="text-[#FFE67B]">Made Easy</span> And Stress-Free
        </p>
      </div>
    </div>
  );
};

export default CardPackaging;