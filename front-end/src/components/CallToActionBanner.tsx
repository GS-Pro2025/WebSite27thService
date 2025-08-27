import React from 'react';

const CallToActionBanner: React.FC = () => {
  return (
    <div className="relative z-40 w-[95%] md:w-[85%] mx-auto flex justify-center -mt-4">
      <div
        className="w-full rounded-xl p-2 sm:p-4 md:p-6 text-center text-white font-bold shadow-xl"
        style={{
          background: "linear-gradient(90deg, #0E6F7E 0%, #FFE67B 100%)",
        }}
      >
        <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3 leading-tight">
          Book today, plan with peace of mind, and ensure the care your move
          deserves.
        </h2>
        <button className="mt-2 px-5 py-1 sm:px-8 sm:py-2 bg-white text-black text-xs sm:text-sm md:text-base font-semibold rounded-full shadow hover:bg-gray-100 transition-colors">
          BOOK HERE
        </button>
      </div>
    </div>
  );
};

export default CallToActionBanner;
