import React, { useState } from 'react';

const MovingHeroComponent = () => {
  const [moveSize, setMoveSize] = useState('');
  
  return (
    <div className="relative w-full h-full min-h-[600px] md:min-h-[700px] overflow-hidden rounded-t-3xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/Slider2.png"
          alt="Equipo de mudanzas trabajando"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay para profundidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>

      <div className="relative z-10 flex h-full flex-col lg:flex-row">
        {/* Left Side - Quote Calculator */}
        <div className="w-full lg:w-2/5 flex items-center justify-center p-4 md:p-8 lg:pt-16">
          <div className="bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-md border border-white/20">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                We guide your home move right here
              </h2>
            </div>

            <div className="space-y-5 md:space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#FFE67B] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-black font-bold text-lg">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                    determine the size of your move
                  </h3>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#FFE67B] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-black font-bold text-lg">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">
                    Move sizes:
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="moveSize" 
                        value="small"
                        onChange={(e) => setMoveSize(e.target.value)}
                        className="w-4 h-4 text-[#FFE67B] focus:ring-[#FFE67B]"
                      />
                      <span className="text-gray-700 group-hover:text-[#0E6F7E] transition-colors text-sm md:text-base">
                        Small (1–2 rooms)
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="moveSize" 
                        value="medium"
                        onChange={(e) => setMoveSize(e.target.value)}
                        className="w-4 h-4 text-[#FFE67B] focus:ring-[#FFE67B]"
                      />
                      <span className="text-gray-700 group-hover:text-[#0E6F7E] transition-colors text-sm md:text-base">
                        Medium (3–4 rooms)
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="moveSize" 
                        value="large"
                        onChange={(e) => setMoveSize(e.target.value)}
                        className="w-4 h-4 text-[#FFE67B] focus:ring-[#FFE67B]"
                      />
                      <span className="text-gray-700 group-hover:text-[#0E6F7E] transition-colors text-sm md:text-base">
                        Large (5+ rooms)
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#FFE67B] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-black font-bold text-lg">3</span>
                </div>
                <div className="flex-1">
                  <button 
                    className={`w-full py-4 px-6 rounded-xl font-bold text-base md:text-lg transition-all duration-300 ${
                      moveSize 
                        ? 'bg-gradient-to-r from-[#FFE67B] to-amber-400 text-black shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!moveSize}
                  >
                    Get an automatic quote here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Content - Desktop */}
        <div className="hidden lg:flex lg:w-3/5 items-center justify-center px-8">
          <div className="text-center max-w-3xl">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white drop-shadow-2xl">
              <span className="text-white">The </span>
              <span className="text-[#FFE67B]">new chapter</span>
              <span className="text-white"> of your </span>
              <span className="text-[#FFE67B]">home</span>
              <span className="text-white"> deserves</span>
              <br />
              <span className="text-white">a fresh start with a </span>
              <span className="text-[#FFE67B]">pleasant memory</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Mobile Hero Content */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-6 md:p-8 text-center rounded-t-3xl">
        <h1 className="text-xl md:text-2xl font-bold leading-tight mb-4">
          <span className="text-gray-800">The </span>
          <span className="text-[#FFE67B]">new chapter</span>
          <span className="text-gray-800"> of your </span>
          <span className="text-[#FFE67B]">home</span>
          <span className="text-gray-800"> deserves a fresh start</span>
        </h1>
      </div>
    </div>
  );
};

export default MovingHeroComponent;