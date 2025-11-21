import React from "react";

// Import de la imagen
import USAMapImage from "/assets/inter.png";

const InterstateMoveSection: React.FC = () => {
  return (
    <div className="relative w-full min-h-[120lvh] py-16 px-4 sm:px-6 lg:px-8 bg-[#0E6F7E]">
      <div className="max-w-9xl mx-auto h-auto">
        {/* Card Container */}
        <div className="relative bg-[#0E6F7E]">
          {/* Background Image with Overlay */}
          <img 
            className="absolute inset-0  bg-center opacity-80 w-full h-auto"
            src={USAMapImage}
          />
          
          {/* Decorative Stars */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
              />
            ))}
          </div>

          {/* Content Container */}
          <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            {/* Badge */}
            <div className="flex justify-start mb-8">
              <span className="inline-block bg-white/90 backdrop-blur-sm text-[#0E6F7E] px-6 py-2 rounded-full text-lg font-semibold shadow-lg">
                Interstate move!
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-center">
              Are you moving to another state?
            </h2>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-white/90 text-center mb-12 max-w-3xl mx-auto">
              We are getting closer and closer to where you need us
            </p>

            {/* CTA Button */}
            <div className="flex justify-center mb-12">
              <button className="bg-[#FFE67B] hover:bg-[#FFE67B]/60 text-gray-900 font-bold px-8 py-4 rounded-full text-xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Find your destination here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterstateMoveSection;