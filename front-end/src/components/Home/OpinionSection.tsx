import React, { useState } from "react";
import FormCobertura from "../FormCover";

const OpinionSection = () => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [feedback, setFeedback] = useState("");
  return (
    <section
      className="relative w-full z-30 overflow-hidden bg-[#ffffff00]
      h-[68vh] 
      sm:h-[130vh] 
      md:h-[80vh] 
      lg:h-[180vh] 
      xl:h-[203vh]
      -mt-[50px] sm:-mt-[90px] md:-mt-[70px] lg:-mt-[180px] xl:-mt-[120px]"
    >
      {/* Botón superior derecho responsivo */}
      <div className="absolute top-2 right-2 md:right-17 lg:right-30 z-30">
        <button
          className="
          bg-[#FFE67B]
          text-[#535353]
          text-[10px]
          sm:text-[20px] 
          md:text-[15px] 
          lg:text-[20px]
          font-semibold
          font-[Montserrat]
          py-2 px-3 
          sm:py-3 sm:px-12 
          md:py-3 md:px-6 
          lg:py-4 lg:px-8
          rounded-full
          shadow
          hover:scale-105
          transition-transform
        "
        >
          INTERSTATE COVERAGE
        </button>
      </div>

      {/* Fondo con textura y curvas */}
      <img
        src="/assets/banner8.svg"
        alt="Fondo con textura curvada"
        className="block w-[110%] max-w-none
        md:w-[103%]            
        lg:w-[160%]           
        xl:w-[105%]
        mx-auto               
        object-contain"
      />
      {/* Texto superior sobre la tabla */}
      <div className="absolute top-[10%] left-[2%] z-30 px-4 ">
        <h2 className="text-white font-[Montserrat] font-semibold leading-tight text-[15px] sm:text-[28px] md:text-[30px] lg:text-[40px] xl:text-[42px]">
          <span className="block text-center">We arrive where</span>
          <span className="block text-center text-[#FFE67B]">
            your next chapter begins
          </span>
        </h2>
      </div>

      {/* Formulario - Parte izquierda */}
      <div className="absolute top-[20%] sm:top-[20%] md:top-[23%] lg:top-[20%] left-[3%] sm:left-[6%] z-20 w-[50%] sm:w-[50%] md:w-[45%] lg:w-[35%] xl:w-[35%] p-3 sm:p-4 md:p-6 bg-white rounded-lg sm:rounded-xl shadow-lg">
        <form className="space-y-0.4 sm:space-y-2.5 md:space-y-4">
          {/* Campo Origen */}
          <div>
            <label className="block text-[#606060] text-xs sm:text-sm font-medium mb-0.5 md:mb-1">
              Origin
            </label>
            <input
              type="text"
              className="bg-[#FFFF] w-full border border-gray-300 rounded px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
            />
          </div>

          {/* Campo Destino */}
          <div>
            <label className="block text-[#606060] text-xs sm:text-sm font-medium mb-0.5 md:mb-1">
              Destination
            </label>
            <input
              type="text"
              className="bg-[#FFFF] w-full border border-gray-300 rounded px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-start space-x-1.5 sm:space-x-2">
            <input
              type="checkbox"
              id="checkbox"
              className="mt-0.5 sm:mt-1 scale-75 sm:scale-100"
            />
            <label
              htmlFor="checkbox"
              className="text-[#606060] text-xs sm:text-sm"
            >
              <span className="font-medium">Label</span>
              <br />
              <span className="text-[10px] sm:text-xs text-gray-500">
                Description
              </span>
            </label>
          </div>

          {/* Botón */}
          <div className="pt-1 sm:pt-1.5 md:pt-2">
            <button
              type="submit"
              className="w-full bg-[#FFE67B] text-[#606060] font-semibold py-1.5 sm:py-2 md:py-2 text-xs sm:text-sm rounded-md shadow hover:brightness-110 transition-all"
            >
              Check coverage
            </button>
          </div>
        </form>
      </div>
      {/* Globo con opiniones superpuestas */}
      <div
        className="
  absolute 
  right-[-3%] top-[20%] 
  md:right-[-3%] md:top-[25%]
  lg:right-[20%] lg:top-[100%]
  xl:right-[-3%] xl:top-[27%]
  transform -translate-y-1/2 
  z-20
"
      >
        <img
          src="/assets/globo.png"
          alt="Globo terráqueo"
          className="
      w-50 h-50
      md:w-110 md:h-110 
      lg:w-96 lg:h-96 
      xl:w-[50rem] xl:h-[50rem] 
      object-contain
    "
        />

        {/* Opinión 1 - Superior izquierda */}
        <div className="absolute top-[15%] left-[20%] w-[30%] sm:w-[35%] md:w-[40%] max-w-[140px] sm:max-w-[180px] md:max-w-[200px]">
          <div className="bg-[#0E6F7E] text-white p-1.5 sm:p-2 md:p-3 rounded-md sm:rounded-lg shadow-lg text-[10px] sm:text-xs md:text-sm">
            <p className="mb-1 sm:mb-1.5 md:mb-2 leading-tight">
              "I can always find what I'm looking for on Splice, whether it's
              the exact sound I want or just a bit of inspiration."
            </p>
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400 text-[8px] sm:text-xs">
                ★★★★★
              </div>
            </div>
          </div>
        </div>

        {/* Opinión 2 - Superior derecha - Solo visible desde md */}
        <div className="hidden md:block absolute top-[16%] right-[22%] w-[38%] max-w-[190px]">
          <div className="bg-[#0E6F7E] text-white p-2 md:p-3 rounded-lg shadow-lg text-xs md:text-sm">
            <p className="mb-1.5 md:mb-2 leading-tight">
              "Finally a way to buy plugins that works. By paying a little at a
              time, producers can get legit access to the top VSTs."
            </p>
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400 text-xs">★★★★★</div>
            </div>
          </div>
        </div>

        {/* Opinión 3 - Inferior izquierda - Solo visible desde md */}
        <div className="hidden md:block absolute bottom-[35%] left-[22%] w-[42%] max-w-[210px]">
          <div className="bg-[#0E6F7E] text-white p-2 md:p-3 rounded-lg shadow-lg text-xs md:text-sm">
            <p className="mb-1.5 md:mb-2 leading-tight">
              "Its been fun to drive into Splices creator community and explore
              tools that support my own creative process."
            </p>
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400 text-xs">★★★★★</div>
            </div>
          </div>
        </div>

        {/* Opinión 4 - Inferior derecha */}
        <div className="hidden md:block absolute bottom-[35%] right-[15%] w-[30%] sm:w-[35%] md:w-[40%] max-w-[140px] sm:max-w-[180px] md:max-w-[200px]">
          <div className="bg-[#0E6F7E] text-white p-1.5 sm:p-2 md:p-3 rounded-md sm:rounded-lg shadow-lg text-[10px] sm:text-xs md:text-sm">
            <p className="mb-1 sm:mb-1.5 md:mb-2 leading-tight">
              "I can always find what I'm looking for on Splice, whether it's
              the exact sound I want or just a bit of inspiration."
            </p>
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400 text-[8px] sm:text-xs">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Línea decorativa */}
      <div className="absolute bottom-[35%] md:bottom-[35%] lg:bottom-[35%] left-0 w-full z-20">
        <img
          src="/assets/Linea.svg"
          alt="Línea decorativa"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Logo - Parte inferior izquierda */}
      <div className=" absolute bottom-[14%] md:bottom-[13%] lg:bottom-[6%] left-[-1%] md:left-[-1%] lg:left-[-0.9%] z-20">
        <img
          src="/assets/logo_simple.png"
          alt="Logo"
          className="
        w-36 h-36
        sm:w-70 sm:h-70
        md:w-75 md:h-75
        lg:w-28 lg:h-28
        xl:w-[600px] xl:h-[600px]
        object-contain
      "
        />
      </div>
      {/* Texto alineado con la parte superior del logo */}
      <div className="absolute bottom-[3%] sm:bottom-[13%] md:bottom-[7%] lg:bottom-[6%] right-[-260px] transform -translate-x-1/2 z-30 w-[95%] sm:w-[85%] md:w-[65%] lg:w-[50%] max-w-2xl">
        {/* Título principal */}
        <h2 className="text-[13px] sm:text-xl md:text-3xl lg:text-[40px] font-[Montserrat] font-semibold leading-tight text-center whitespace-nowrap">
          <span className="text-[#FFE67B]">Your opinion </span>
          <span className="text-white">is important to us!</span>
        </h2>

        {/* Texto descriptivo */}
        <p className="mt-2 text-white text-[10px] sm:text-sm md:text-lg lg:text-[28px] font-[Montserrat] text-center leading-snug px-2">
          Tell us about your service experience, it helps us improve every day
          to provide you with the best quality in moving services.
        </p>

        {/* Caja de calificación */}
        <div
          className="
    mt-4 sm:mt-6 bg-white/75 rounded-md px-3 sm:px-4 md:px-6 py-2 sm:py-3 mx-auto w-full
    max-w-[55%] sm:max-w-sm md:max-w-md shadow"
        >
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={star <= (hovered || rating) ? "#FCD21C" : "#0E6F7E"}
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-all duration-200"
                >
                  <path d="M12 2l2.6 6.5H22l-5.2 4.2L18.6 20 12 16.3 5.4 20l1.4-7.3L2 8.5h7.4L12 2z" />
                </svg>
                <span className="text-[8px] sm:text-[10px] text-[#0E6F7E] mt-0.5 sm:mt-1 whitespace-nowrap">
                  Tab {star}
                </span>
              </div>
            ))}
          </div>

          {/* Campo de texto */}
          <div className="mb-3 sm:mb-4">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts with us"
              className="text-[#606060] bg-white w-full px-2 sm:px-3 py-0.5 sm:py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0E6F7E] focus:border-transparent resize-none placeholder-[#606060] text-center placeholder:text-center text-xs sm:text-sm md:text-base"
              rows={2}
            />
          </div>

          {/* Botón */}
          <div className="flex justify-center">
            <button
              className="bg-[#FFE67B]/40 text-[#606060] font-semibold px-4 sm:px-6 py-1 sm:py-2 rounded-full border border-[#FFE67B] hover:brightness-105 transition text-xs sm:text-sm md:text-base"
              onClick={() => alert(`Calificación enviada: ${rating} estrellas`)}
            >
              Submit your rating
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpinionSection;
