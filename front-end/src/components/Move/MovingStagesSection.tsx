import React from "react";

const MovingStagesSection: React.FC = () => {
  const stages = [
    {
      id: 1,
      title: "Packing",
      description: "We take care of protecting each object as if it were our own, with quality materials and maximum security.",
      position: "sm:col-start-2",
      descriptionPosition: "sm:col-start-3 sm:row-start-1 sm:justify-self-start sm:mt-16 sm:ml-4",
    },
    {
      id: 2,
      title: "Loading",
      description: "We move your belongings with care, optimizing space and ensuring that everything arrives intact.",
      position: "sm:col-start-3 sm:-translate-y-10",
      descriptionPosition: "sm:col-start-3 sm:row-start-3 sm:justify-self-center sm:-mt-12 sm:ml-20",
    },
    {
      id: 3,
      title: "Delivery",
      description: "We move your things in a punctual and efficient manner, always meeting your time and trust.",
      position: "sm:col-start-1 sm:row-start-3 sm:translate-y-2 sm:translate-x-15",
      descriptionPosition: "sm:col-start-1 sm:row-start-2 sm:justify-self-end sm:mr-4",
    },
    {
      id: 4,
      title: "Unpacking",
      description: "We unpack with care and leave each object ready for you to enjoy your new space without stress.",
      position: "sm:col-start-2 sm:row-start-5 sm:-translate-x-45 sm:-translate-y-12",
      descriptionPosition: "sm:col-start-1 sm:row-start-5 sm:justify-self-center sm:mt-12 sm:mr-16",
    },
    {
      id: 5,
      title: "Organization",
      description: "We help you locate and organize everything in your new home, because moving is starting from scratch, but with order.",
      position: "sm:col-start-3 sm:row-start-5 sm:-translate-x-40 sm:-translate-y-12",
      descriptionPosition: "sm:col-start-3 sm:row-start-6 sm:justify-self-start sm:-mt-4 sm:ml-8",
    },
  ];

  // Componente de mensaje individual con gradientes personalizados
  const StageMessage = ({ 
    description, 
    className = "", 
    gradientType = "blue" 
  }: { 
    description: string; 
    className?: string; 
    gradientType?: "yellow" | "blue";
  }) => {
    const gradientStyle = gradientType === "yellow" 
      ? {
          background: "linear-gradient(135deg, #FFE67B 10%, #FFE887 40%, #FFEEA5 70%, #FFF4C3 100%)"
        }
      : {
          background: "linear-gradient(135deg, #86B7BE 10%, #4A939E 40%, #2C818E 70%, #1D7886 100%)"
        };

    return (
      <div className={`hidden sm:block absolute z-20 ${className}`}>
        <div 
          className="backdrop-blur-sm rounded-xl p-4 max-w-xs shadow-lg border border-white/10"
          style={gradientStyle}
        >
          <p className="text-black text-sm leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-[#7AACAE] py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white -mt-30">
      
      {/* NUEVA VISTA ELEGANTE PARA TABLETS MD SOLAMENTE */}
      <div className="hidden md:block lg:hidden">
        <div className="container mx-auto relative z-10">
          
          {/* Header elegante */}
          <div className="text-center mb-16">
            <h2 className="text-[#FFE67B] text-5xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Moving Stages
            </h2>
            <div className="w-24 h-1 bg-[#FFE67B] mx-auto mb-6 rounded-full"></div>
            <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Montserrat'" }}>
              Your complete moving journey in five professional steps
            </p>
          </div>

          {/* Timeline vertical elegante */}
          <div className="max-w-4xl mx-auto relative">
            
            {/* Línea vertical central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FFE67B] via-white/30 to-[#FFE67B] rounded-full"></div>
            
            {/* Step 1 - Packing (Derecha) */}
            <div className="relative flex items-center justify-end mb-20 group">
              <div className="w-1/2 pr-12">
                <div 
                  className="backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl"
                  style={{ background: "linear-gradient(135deg, #FFE67B 10%, #FFE887 40%, #FFEEA5 70%, #FFF4C3 100%)" }}
                >
                  <h3 className="text-[#7AACAE] text-2xl font-bold mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    1. Packing
                  </h3>
                  <p className="text-black text-base leading-relaxed font-medium">
                    {stages[0].description}
                  </p>
                </div>
              </div>
              
              {/* Círculo central */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#FFE67B] rounded-full flex items-center justify-center text-2xl font-bold text-[#7AACAE] shadow-2xl border-4 border-white z-10 transition-all duration-300 group-hover:scale-110">
                1
              </div>
            </div>

            {/* Step 2 - Loading (Izquierda) */}
            <div className="relative flex items-center justify-start mb-20 group">
              <div className="w-1/2 pl-12">
                <div 
                  className="backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl"
                  style={{ background: "linear-gradient(135deg, #86B7BE 10%, #4A939E 40%, #2C818E 70%, #1D7886 100%)" }}
                >
                  <h3 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    2. Loading
                  </h3>
                  <p className="text-black text-base leading-relaxed font-medium">
                    {stages[1].description}
                  </p>
                </div>
              </div>
              
              {/* Círculo central */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#FFE67B] rounded-full flex items-center justify-center text-2xl font-bold text-[#7AACAE] shadow-2xl border-4 border-white z-10 transition-all duration-300 group-hover:scale-110">
                2
              </div>
            </div>

            {/* Texto motivacional central */}
            <div className="relative mb-20">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border-2 border-[#FFE67B] z-10">
                <div className="w-3 h-3 bg-[#FFE67B] rounded-full animate-pulse"></div>
              </div>
              <div className="text-center pt-16">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-lg mx-auto shadow-2xl border border-white/20">
                  <p className="text-2xl font-medium text-white leading-relaxed mb-2" style={{ fontFamily: "'Montserrat'" }}>
                    Safe moves twenty seventh does it for you
                  </p>
                  <div className="w-16 h-1 bg-[#FFE67B] mx-auto my-4 rounded-full"></div>
                  <p className="text-lg text-white/80" style={{ fontFamily: "'Montserrat'" }}>
                    Stress-free, with commitment and the care you need
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 - Delivery (Derecha) */}
            <div className="relative flex items-center justify-end mb-20 group">
              <div className="w-1/2 pr-12">
                <div 
                  className="backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl"
                  style={{ background: "linear-gradient(135deg, #86B7BE 10%, #4A939E 40%, #2C818E 70%, #1D7886 100%)" }}
                >
                  <h3 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    3. Delivery
                  </h3>
                  <p className="text-black text-base leading-relaxed font-medium">
                    {stages[2].description}
                  </p>
                </div>
              </div>
              
              {/* Círculo central */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#FFE67B] rounded-full flex items-center justify-center text-2xl font-bold text-[#7AACAE] shadow-2xl border-4 border-white z-10 transition-all duration-300 group-hover:scale-110">
                3
              </div>
            </div>

            {/* Step 4 - Unpacking (Izquierda) */}
            <div className="relative flex items-center justify-start mb-20 group">
              <div className="w-1/2 pl-12">
                <div 
                  className="backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl"
                  style={{ background: "linear-gradient(135deg, #FFE67B 10%, #FFE887 40%, #FFEEA5 70%, #FFF4C3 100%)" }}
                >
                  <h3 className="text-[#7AACAE] text-2xl font-bold mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    4. Unpacking
                  </h3>
                  <p className="text-black text-base leading-relaxed font-medium">
                    {stages[3].description}
                  </p>
                </div>
              </div>
              
              {/* Círculo central */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#FFE67B] rounded-full flex items-center justify-center text-2xl font-bold text-[#7AACAE] shadow-2xl border-4 border-white z-10 transition-all duration-300 group-hover:scale-110">
                4
              </div>
            </div>

            {/* Step 5 - Organization (Derecha) */}
            <div className="relative flex items-center justify-end group">
              <div className="w-1/2 pr-12">
                <div 
                  className="backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl"
                  style={{ background: "linear-gradient(135deg, #FFE67B 10%, #FFE887 40%, #FFEEA5 70%, #FFF4C3 100%)" }}
                >
                  <h3 className="text-[#7AACAE] text-2xl font-bold mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    5. Organization
                  </h3>
                  <p className="text-black text-base leading-relaxed font-medium">
                    {stages[4].description}
                  </p>
                </div>
              </div>
              
              {/* Círculo central */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#FFE67B] rounded-full flex items-center justify-center text-2xl font-bold text-[#7AACAE] shadow-2xl border-4 border-white z-10 transition-all duration-300 group-hover:scale-110">
                5
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NUEVA VISTA MÓVIL - Timeline Vertical Compacto */}
      <div className="block sm:hidden">
        <div className="container mx-auto relative z-10 px-6">
          
          {/* Header móvil */}
          <div className="text-center mb-12">
            <h2 className="text-[#FFE67B] text-3xl font-bold mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Moving Stages
            </h2>
            <div className="w-16 h-0.5 bg-[#FFE67B] mx-auto mb-4 rounded-full"></div>
            <p className="text-white/80 text-base leading-relaxed" style={{ fontFamily: "'Montserrat'" }}>
              Your complete moving journey
            </p>
          </div>

          {/* Timeline móvil */}
          <div className="relative max-w-sm mx-auto">
            
            {/* Línea vertical móvil */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFE67B] via-white/20 to-[#FFE67B] rounded-full"></div>
            
            {/* Step 1 - Packing */}
            <div className="relative flex items-start mb-12">
              <div className="flex-shrink-0 w-12 h-12 bg-[#FFE67B] rounded-full flex items-center justify-center text-lg font-bold text-[#7AACAE] shadow-lg border-3 border-white relative z-10">
                1
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-[#FFE67B] text-lg font-bold mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Packing
                </h3>
                <div 
                  className="backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/10"
                  style={{ background: "linear-gradient(135deg, #FFE67B 10%, #FFE887 40%, #FFEEA5 70%, #FFF4C3 100%)" }}
                >
                  <p className="text-black text-sm leading-relaxed">
                    {stages[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 - Loading */}
            <div className="relative flex items-start mb-12">
              <div className="flex-shrink-0 w-12 h-12 bg-[#FFE67B] rounded-full flex items-center justify-center text-lg font-bold text-[#7AACAE] shadow-lg border-3 border-white relative z-10">
                2
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-[#FFE67B] text-lg font-bold mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Loading
                </h3>
                <div 
                  className="backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/10"
                  style={{ background: "linear-gradient(135deg, #86B7BE 10%, #4A939E 40%, #2C818E 70%, #1D7886 100%)" }}
                >
                  <p className="text-black text-sm leading-relaxed">
                    {stages[1].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Mensaje central móvil */}
            <div className="relative mb-12">
              <div className="flex-shrink-0 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-2 border-[#FFE67B] mx-auto mb-4 relative z-10">
                <div className="w-2 h-2 bg-[#FFE67B] rounded-full animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <p className="text-white text-base font-medium leading-relaxed mb-2" style={{ fontFamily: "'Montserrat'" }}>
                    Safe moves twenty seventh does it for you
                  </p>
                  <div className="w-12 h-0.5 bg-[#FFE67B] mx-auto my-3 rounded-full"></div>
                  <p className="text-white/80 text-sm" style={{ fontFamily: "'Montserrat'" }}>
                    Stress-free, with commitment and care
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 - Delivery */}
            <div className="relative flex items-start mb-12">
              <div className="flex-shrink-0 w-12 h-12 bg-[#FFE67B] rounded-full flex items-center justify-center text-lg font-bold text-[#7AACAE] shadow-lg border-3 border-white relative z-10">
                3
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-[#FFE67B] text-lg font-bold mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Delivery
                </h3>
                <div 
                  className="backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/10"
                  style={{ background: "linear-gradient(135deg, #86B7BE 10%, #4A939E 40%, #2C818E 70%, #1D7886 100%)" }}
                >
                  <p className="text-black text-sm leading-relaxed">
                    {stages[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 - Unpacking */}
            <div className="relative flex items-start mb-12">
              <div className="flex-shrink-0 w-12 h-12 bg-[#FFE67B] rounded-full flex items-center justify-center text-lg font-bold text-[#7AACAE] shadow-lg border-3 border-white relative z-10">
                4
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-[#FFE67B] text-lg font-bold mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Unpacking
                </h3>
                <div 
                  className="backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/10"
                  style={{ background: "linear-gradient(135deg, #FFE67B 10%, #FFE887 40%, #FFEEA5 70%, #FFF4C3 100%)" }}
                >
                  <p className="text-black text-sm leading-relaxed">
                    {stages[3].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 - Organization */}
            <div className="relative flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#FFE67B] rounded-full flex items-center justify-center text-lg font-bold text-[#7AACAE] shadow-lg border-3 border-white relative z-10">
                5
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-[#FFE67B] text-lg font-bold mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Organization
                </h3>
                <div 
                  className="backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/10"
                  style={{ background: "linear-gradient(135deg, #FFE67B 10%, #FFE887 40%, #FFEEA5 70%, #FFF4C3 100%)" }}
                >
                  <p className="text-black text-sm leading-relaxed">
                    {stages[4].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYOUT ORIGINAL PARA DESKTOP (sin cambios) */}
      <div className="hidden lg:block">
        <div className="absolute inset-0 z-0 opacity-75">
          <img
            src="assets/flechaClara.svg"
            alt="Background decorative arrows"
            className="hidden sm:block absolute right-0 bottom-154"
          />
          <img
            src="assets/flechaMedia.svg"
            alt="Background decorative arrows"
            className="hidden sm:block absolute left-0 bottom-82"
          />
          <img
            src="assets/lineaEtapas.svg"
            alt="Decorative dotted line"
            className="hidden sm:block absolute inset-0 w-full h-full object-contain -mt-26"
          />
        </div>

        <div className="container mx-auto relative z-10">
          <h2
            className="text-[#FFE67B] text-4xl md:text-5xl font-bold mb-12 md:mb-24 text-center sm:text-left -translate-y-15"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Moving stages
          </h2>

          {/* Contenedor relativo para el posicionamiento absoluto de los mensajes */}
          <div className="relative">
            {/* Mensajes absolutos con gradientes específicos */}
            <StageMessage 
              description={stages[0].description} 
              className="lg:-top-[15%] lg:right-[15%] lg:w-100 lg:h-50 opacity-70"
              gradientType="yellow"
            />
            <StageMessage 
              description={stages[1].description} 
              className="lg:top-[55%] lg:right-[10%] lg:w-100 lg:h-50 opacity-70"
              gradientType="blue"
            />
            <StageMessage 
              description={stages[2].description} 
              className="lg:top-[15%] lg:left-[20%] lg:w-100 lg:h-50 opacity-70"
              gradientType="blue"
            />
            <StageMessage 
              description={stages[3].description} 
              className="lg:-bottom-[15%] lg:left-[10%] lg:w-100 lg:h-50 opacity-70"
              gradientType="yellow"
            />
            <StageMessage 
              description={stages[4].description} 
              className="lg:-bottom-[15%] lg:-right-[10%] lg:w-100 lg:h-50 opacity-70"
              gradientType="yellow"
            />

            {/* Grid original - mantiene exactamente el mismo layout */}
            <div
              className="flex flex-col items-center text-center gap-y-12 mb-10
                           sm:grid sm:grid-cols-3 sm:gap-y-16 sm:gap-x-8 sm:relative sm:text-left sm:-translate-y-20"
            >
              <div className="flex flex-col items-center sm:col-start-2 lg:-translate-y-25">
                <div className="relative mb-2">
                  <div className="bg-[#FFE67B] w-24 h-20 lg:w-16 lg:w-24 h-24 rounded-full flex items-center justify-center text-2xl lg:text-7xl font-bold text-[#7AACAE] shadow-lg z-10 transform transition-all duration-300 hover:scale-110 group cursor-help">
                    1
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F6F7C] text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-20">
                      Step 1: Packing
                    </div>
                  </div>
                </div>
                <h3
                  className="text-[#FFE67B] text-2xl font-semibold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Packing
                </h3>
              </div>

              <div className="text-center sm:col-span-3 sm:flex sm:justify-end sm:items-center sm:translate-y-10">
                <p
                  className="text-2xl sm:text-4xl max-w-2xl opacity-75 whitespace-nowrap"
                  style={{ fontFamily: "'Montserrat'" }}
                >
                  Safe moves twenty seventh does it for you
                </p>
              </div>

              <div className="flex flex-col items-center sm:col-start-3 sm:-translate-y-0">
                <div className="relative mb-2">
                  <div className="bg-[#FFE67B] w-24 h-20 lg:w-16 lg:w-24 h-24 rounded-full flex items-center justify-center text-2xl lg:text-7xl font-bold text-[#7AACAE] shadow-lg z-10 transform transition-all duration-300 hover:scale-110 group cursor-help">
                    2
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F6F7C] text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-20">
                      Step 2: Loading
                    </div>
                  </div>
                </div>
                <h3
                  className="text-[#FFE67B] text-2xl font-semibold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Loading
                </h3>
              </div>

              <div className="flex flex-col items-center sm:col-start-1 sm:row-start-3 sm:translate-y-2 sm:translate-x-15">
                <div className="relative mb-2">
                  <div className="bg-[#FFE67B] w-24 h-20 lg:w-16 lg:w-24 h-24 rounded-full flex items-center justify-center text-2xl lg:text-7xl font-bold text-[#7AACAE] shadow-lg z-10 transform transition-all duration-300 hover:scale-110 group cursor-help">
                    3
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F6F7C] text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-20">
                      Step 3: Delivery
                    </div>
                  </div>
                </div>
                <h3
                  className="text-[#FFE67B] text-2xl font-semibold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Delivery
                </h3>
              </div>

              <div className="text-center sm:col-span-3 sm:flex sm:justify-start sm:items-center sm:translate-y-5 sm:-translate-x-15">
                <p
                  className="text-2xl sm:text-4xl max-w-2xl opacity-75 whitespace-nowrap"
                  style={{ fontFamily: "'Montserrat'" }}
                >
                  Stress-free, with commitment and the care you need
                </p>
              </div>

              <div className="flex flex-col items-center sm:col-start-2 sm:row-start-5 sm:-translate-x-45 sm:translate-y-25">
                <div className="relative mb-2">
                  <div className="bg-[#FFE67B] w-24 h-20 lg:w-16 lg:w-24 h-24 rounded-full flex items-center justify-center text-2xl lg:text-7xl font-bold text-[#7AACAE] shadow-lg z-10 transform transition-all duration-300 hover:scale-110 group cursor-help">
                    4
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F6F7C] text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-20">
                      Step 4: Unpacking
                    </div>
                  </div>
                </div>
                <h3
                  className="text-[#FFE67B] text-2xl font-semibold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Unpacking
                </h3>
              </div>

              <div className="flex flex-col items-center sm:col-start-3 sm:row-start-5 sm:-translate-x-40 sm:translate-y-25">
                <div className="relative mb-2">
                  <div className="bg-[#FFE67B] w-24 h-20 lg:w-16 lg:w-24 h-24 rounded-full flex items-center justify-center text-2xl lg:text-7xl font-bold text-[#7AACAE] shadow-lg z-10 transform transition-all duration-300 hover:scale-110 group cursor-help">
                    5
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F6F7C] text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-20">
                      Step 5: Organization
                    </div>
                  </div>
                </div>
                <h3
                  className="text-[#FFE67B] text-2xl font-semibold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Organization
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovingStagesSection;
