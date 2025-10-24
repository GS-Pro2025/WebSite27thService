import React from "react";
import backgroundImg from "/assets/Slider4.png";

const CardOrganization: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[600px] md:min-h-[700px] overflow-hidden rounded-t-3xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImg}
          alt="Space organization"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 py-12 md:py-16">
        {/* Center - Text Content */}
        <div className="w-full max-w-5xl flex justify-center items-center">
          {/* Description Box - Centered */}
          <div className="bg-[#FFE67B]/85 backdrop-blur-md rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl">
            <div className="space-y-6">
              <p className="text-black text-base md:text-lg lg:text-xl leading-relaxed font-medium text-justify">
                When you're moving, it's totally normal to find stuff you don't want anymore or realize that getting rid of some things will make your move way easier.
              </p>
              
              <p className="text-black text-base md:text-lg lg:text-xl leading-relaxed font-medium text-justify">
                We'll take care of hauling away and properly disposing of old furniture, appliances you no longer need, and anything else you're ready to part with. Our team handles the whole process, so you can focus on bringing only what really matters to your new place.
              </p>
              
              <p className="text-black text-base md:text-lg lg:text-xl leading-relaxed font-medium text-justify">
                This way, you can free yourself from bulky items and make room for your new life. If you need this extra service, just let us know and we'll take care of everything.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right - Call to Action */}
      <div className="absolute bottom-6 md:bottom-10 lg:bottom-12 right-6 md:right-10 lg:right-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl">
          <h3 className="text-[#0E6F7E] text-xl md:text-2xl lg:text-3xl font-bold text-right leading-tight">
            Make Room For What
          </h3>
          <p className="text-[#0E6F7E] text-xl md:text-2xl lg:text-3xl font-bold text-right">
            Really Matters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardOrganization;