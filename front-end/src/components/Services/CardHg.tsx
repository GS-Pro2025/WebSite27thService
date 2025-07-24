import React, { useState } from 'react';

const MovingHeroComponent = () => {
  const [moveSize, setMoveSize] = useState('');
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/Slider2.png"
          alt="Equipo de mudanzas trabajando"
          className="w-full h-full object-cover rounded-t-4xl"
        />
      </div>

      <div className="relative z-10 flex h-full">
        {/* Left Side - Quote Calculator */}
        <div className="w-full lg:w-2/5 flex items-start justify-center p-2 pt-16">
          <div className="bg-white/30 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-orange-200">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-white mb-2">
                We guide your home move right here
              </h2>
            </div>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    determine the size of your move
                  </h3>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Move sizes:
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="moveSize" 
                        value="small"
                        onChange={(e) => setMoveSize(e.target.value)}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-400"
                      />
                      <span className="text-gray-700 group-hover:text-orange-600 transition-colors">
                        Small (1–2 rooms)
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="moveSize" 
                        value="medium"
                        onChange={(e) => setMoveSize(e.target.value)}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-400"
                      />
                      <span className="text-gray-700 group-hover:text-orange-600 transition-colors">
                        Medium (3–4 rooms)
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="moveSize" 
                        value="large"
                        onChange={(e) => setMoveSize(e.target.value)}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-400"
                      />
                      <span className="text-gray-700 group-hover:text-orange-600 transition-colors">
                        Large (5+ rooms)
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div className="flex-1">
                  <button 
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                      moveSize 
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer' 
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

        {/* Right Side - Hero Content */}
        <div className="hidden lg:flex lg:w-3/5 items-center justify-center relative ">
          {/* Main content */}
          <div className="text-center px-8 relative z-10">
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-2 text-white drop-shadow-lg">
              <span className="text-white">The </span>
              <span className="text-yellow-400">new chapter</span>
              <span className="text-white"> of your </span>
              <span className="text-yellow-400">home</span>
              <span className="text-white"> deserves</span>
              <br />
              <span className="text-white">a fresh start with a </span>
              <span className="text-yellow-400">pleasant memory</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Mobile Hero Content */}
      <div className="lg:hidden bg-white/80 backdrop-blur-sm p-8 text-center">
        <h1 className="text-3xl font-bold leading-tight mb-6">
          <span className="text-gray-800">The </span>
          <span className="text-yellow-500">new chapter</span>
          <span className="text-gray-800"> of your </span>
          <span className="text-yellow-500">home</span>
          <span className="text-gray-800"> deserves</span>
          <br />
          <span className="text-gray-800">a fresh start with a </span>
          <span className="text-yellow-500">pleasant memory</span>
        </h1>
        
        <button className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg">
          Start my move
        </button>
      </div>
    </div>
  );
};

export default MovingHeroComponent;