import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full bg-[#68A2A6] overflow-hidden relative">
      {/* Background Image */}
      <img
        src="/assets/banner1.svg"
        alt="Hero Banner"
        className="w-full h-auto block"
      />

      {/* Button positioned over the image */}
      <div className="absolute top-[39%] left-[7%] transform -translate-y-1/2">
        <button className="bg-[#FFE67B] text-[#535353] text-[10px] sm:text-[20px] md:text-[20px] lg:text-[28px] font-semibold font-[Montserrat] py-2 px-3 sm:py-3 sm:px-12 md:py-4 md:px-12 lg:py-5 lg:px-30 rounded-full shadow hover:scale-105 transition-transform">
          GET A QUOTE
        </button>
      </div>
    </section>
  );
};

export default HeroSection;