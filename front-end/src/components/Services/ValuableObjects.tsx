import FormCobertura from "../FormCover";

const ValuableObjects = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#77ABB1] to-[#0E6F7E]/60 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Left side - Text content */}
          <div className="space-y-4 md:space-y-6">
            {/* Title with yellow background */}
            <div className="inline-block">
              <div className="bg-[#FFE67B] rounded-full px-4 py-2 md:px-8 md:py-4">
                <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800">
                  ¿valuable objects?
                </h2>
              </div>
            </div>

            {/* Description box */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 text-white">
              {/**translate plis  */}
              <p className="text-sm md:text-lg lg:text-xl xl:text-2xl leading-relaxed mb-3 md:mb-6">
                This category includes everything that holds significant value for you;
                they are more than just fragile items—they are memories, dreams, and moments to cherish
                and preserve.
              </p> 
              
              <p className="text-sm md:text-lg lg:text-xl xl:text-2xl leading-relaxed mb-3 md:mb-6">
                You have items that require{" "}
                <span className="text-[#FFE67B] font-semibold">special Care</span>, we show you how{" "}
                <span className="text-[#FFE67B] font-semibold">we take care of them for you</span>.
              </p>

              <p className="text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-300">
                What items do you need to move today?
              </p>
            </div>
          </div>

          {/* Right side - Heart icon, message and Form */}
          <div className="flex flex-col items-center space-y-3 md:space-y-4 -mt-8 md:-mt-50">
            {/* Heart and hands icon with text below - Centered in right column */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/assets/recurso_hands_heart.svg"
                alt="Hands with heart"
                className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-50 xl:h-50 mb-2 md:mb-3"
              />
              <h1 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight px-2">
                <span className="text-[#FFE67B]">We take care</span> of them,{" "}
                <span className="text-[#FFE67B]">as if they were our own</span>
              </h1>
            </div>

            {/* Form Cover Component */}
            <div className="bg-white rounded-2xl p-3 md:p-4 w-full max-w-sm md:max-w-xs shadow-2xl">
              <FormCobertura />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuableObjects;