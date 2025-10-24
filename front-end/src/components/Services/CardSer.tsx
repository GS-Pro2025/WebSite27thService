import React from "react";
import backgroundImg from "/assets/Slider6.png";

const CardServices: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[600px] md:min-h-[700px] overflow-hidden rounded-t-3xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImg}
          alt="Transportation services"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30"></div>

      {/* Content Container */}
      <div className="relative h-full w-full flex flex-col justify-between px-6 md:px-10 lg:px-16 py-8 md:py-12 lg:py-16">
        
        {/* Top Section - Main Title */}
        <div className="w-full max-w-7xl">
          <h2 className="text-[#0E6F7E] bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight shadow-2xl">
            OUR SERVICE IS ALL ABOUT KEEPING YOU WORRY-FREE, OFFERING:
          </h2>
        </div>

        {/* Middle Section - Features List */}
        <div className="w-full max-w-7xl space-y-5 md:space-y-6 lg:space-y-8 mt-8 md:mt-10">
          
          {/* Feature 1 - Safety and Care */}
          <div className="bg-[#FFE67B]/90 backdrop-blur-sm px-6 md:px-8 lg:px-10 py-4 md:py-5 lg:py-6 rounded-2xl shadow-2xl">
            <h3 className="text-[#0E6F7E] text-sm md:text-base lg:text-lg xl:text-xl font-bold">
              SAFETY AND CARE:{" "}
              <span className="font-normal">
                WE HAVE HIGHLY TRAINED STAFF AND EQUIPPED VEHICLES TO HANDLE ALL TYPES OF CARGO, FROM FRAGILE ITEMS TO LARGE VOLUME SHIPMENTS.
              </span>
            </h3>
          </div>

          {/* Feature 2 - Flexibility and Efficiency */}
          <div className="bg-[#FFE67B]/90 backdrop-blur-sm px-6 md:px-8 lg:px-10 py-4 md:py-5 lg:py-6 rounded-2xl shadow-2xl">
            <h3 className="text-[#0E6F7E] text-sm md:text-base lg:text-lg xl:text-xl font-bold">
              FLEXIBILITY AND EFFICIENCY:{" "}
              <span className="font-normal">
                WE WORK AROUND YOUR SCHEDULE AND NEEDS, OPTIMIZING ROUTES TO GUARANTEE FAST AND EFFICIENT DELIVERIES WITHOUT COMPROMISING YOUR CARGO'S SAFETY.
              </span>
            </h3>
          </div>

          {/* Feature 3 - Real-Time Tracking */}
          <div className="bg-[#FFE67B]/90 backdrop-blur-sm px-6 md:px-8 lg:px-10 py-4 md:py-5 lg:py-6 rounded-2xl shadow-2xl">
            <h3 className="text-[#0E6F7E] text-sm md:text-base lg:text-lg xl:text-xl font-bold">
              REAL-TIME TRACKING:{" "}
              <span className="font-normal">
                STAY IN THE LOOP. YOU CAN TRACK YOUR SHIPMENT AT EVERY STAGE OF TRANSPORT, SO YOU HAVE COMPLETE CONFIDENCE AND CONTROL OVER THE PROCESS.
              </span>
            </h3>
          </div>

        </div>

        {/* Bottom Right - Call to Action */}
        <div className="self-end mt-8 md:mt-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl text-right">
            <p className="text-[#0E6F7E] text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
              Connecting Your Business
            </p>
            <p className="text-[#0E6F7E] text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
              With The World.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CardServices;