import React, { useState } from "react";

const FAQComponent = () => {
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "¿Qué determina el costo de mi mudanza?",
      answer:
        "El costo depende de factores como la distancia, volumen de objetos, servicios adicionales y época del año.",
      position: "top-left",
      icon: "/assets/icon_1_circle.svg",
    },
    {
      id: 2,
      question: "¿Puedo hacer una mudanza personalizada?",
      answer:
        "Sí, ofrecemos servicios personalizados adaptados a tus necesidades específicas y presupuesto.",
      position: "top-right",
      icon: "/assets/icon_4_circle.svg",
    },
    {
      id: 3,
      question: "¿puedo mover un solo objeto?",
      answer:
        "Absolutamente — manejamos desde mudanzas de un solo objeto hasta reubicaciones completas.",
      position: "bottom-left",
      icon: "/assets/icon_2_circle.svg",
    },
    {
      id: 4,
      question: "¿puedo calcular cuanto peso llevo?",
      answer:
        "Sí, te ayudaremos a estimar el peso aproximado y te daremos recomendaciones.",
      position: "bottom-center",
      icon: "/assets/icon_5_circle.svg",
    },
    {
      id: 5,
      question: "¿como cuidan mis objetos de alto valor?",
      answer:
        "Utilizamos materiales especiales, seguro y personal capacitado para garantizar la seguridad de objetos valiosos.",
      position: "bottom-right",
      icon: "/assets/icon_3_circle.svg",
    },
  ];

  const getPositionClasses = (position: string) => {
    switch (position) {
      case "top-left":
        return `
          absolute left-0 top-1/4 -translate-x-1/2 -translate-y-1/2
          sm:left-[-10px] sm:top-[20%]
          md:left-[-20px] md:top-1/4
          lg:left-0 lg:top-1/4 lg:-translate-x-1/2 lg:-translate-y-1/2
          w-32 sm:w-40 md:w-48 lg:w-56
        `;
      case "top-right":
        return `
          absolute right-0 top-1/4 translate-x-1/2 -translate-y-1/2
          sm:right-[-10px] sm:top-[20%]
          md:right-[-20px] md:top-1/4
          lg:right-0 lg:top-1/4 lg:translate-x-1/2 lg:-translate-y-1/2
          w-32 sm:w-40 md:w-48 lg:w-56
        `;
      case "bottom-left":
        return `
          absolute left-0 bottom-1/4 -translate-x-1/2 translate-y-1/2
          sm:left-[-10px] sm:bottom-[20%]
          md:left-[-20px] md:bottom-1/4
          lg:left-0 lg:bottom-1/4 lg:-translate-x-1/2 lg:translate-y-1/2
          w-32 sm:w-40 md:w-48 lg:w-56
        `;
      case "bottom-center":
        return `
          absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2
          sm:bottom-[-10px]
          md:bottom-[-20px]
          lg:left-1/2 lg:bottom-0 lg:-translate-x-1/2 lg:translate-y-1/2
          w-32 sm:w-40 md:w-48 lg:w-56
        `;
      case "bottom-right":
        return `
          absolute right-0 bottom-1/4 translate-x-1/2 translate-y-1/2
          sm:right-[-10px] sm:bottom-[20%]
          md:right-[-20px] md:bottom-1/4
          lg:right-0 lg:bottom-1/4 lg:translate-x-1/2 lg:translate-y-1/2
          w-32 sm:w-40 md:w-48 lg:w-56
        `;
      default:
        return "";
    }
  };

  return (
    <div className="relative min-h-screen md:min-h-[80vh] lg:min-h-screen p-4 md:p-8">
      {/* Boxes Background - Posicionadas como en la imagen */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 z-10">
        <img
          src="/assets/Box.png"
          alt="Moving boxes"
          className="w-full h-full object-contain object-bottom"
        />
      </div>

      {/* Título superior */}
      <div className="flex flex-col items-center justify-center relative z-30 pt-8 mb-8">
        <div className="bg-[#FFE67B] backdrop-blur-sm mx-4 md:mx-8 lg:mx-20 w-fit rounded-3xl px-8 py-4 shadow-2xl relative overflow-visible mb-4">
          {/* Imagen FAQ alineada arriba a la derecha */}
          <img
            src="/assets/Recurso_question_faq.svg"
            alt="FAQ"
            className="w-12 md:w-16 lg:w-20 absolute -top-6 -right-2 md:-top-8 md:-right-4 z-50"
          />
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center pr-8 md:pr-12">
            Resolvemos tus dudas
          </h1>
        </div>
        <p className="text-lg md:text-2xl text-gray-700 text-center max-w-4xl">
          Porque mudarse debe ser{" "}
          <span className="text-[#FFE67B] font-semibold drop-shadow">
            fácil, tranquilo y confiable
          </span>
        </p>
      </div>

      {/* Central Circle */}
      <div className="relative z-20 flex items-center justify-center py-8 md:py-16">
        <div className="relative">
          {/* Outer circle - Responsivo */}
          <div className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] rounded-full border-4 border-white/30 flex items-center justify-center">
            {/* Inner circle - Responsivo */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-120 lg:h-120 rounded-full border-2 border-white/30 flex items-center justify-center">
              {/* Center circle - Responsivo */}
              <div className="w-32 h-32 sm:w-44 sm:h-44 md:w-60 md:h-60 lg:w-80 lg:h-80 bg-[#0E6F7E] rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-center px-2">
                  <h2 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-1">
                    PREGUNTAS
                  </h2>
                  <h2 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                    FRECUENTES
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Cards */}
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`${getPositionClasses(
                faq.position
              )} group cursor-pointer transform transition-all duration-300 hover:scale-105`}
              onClick={() =>
                setSelectedFAQ(selectedFAQ === faq.id ? null : faq.id)
              }
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:bg-white transition-all duration-300">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="flex-1 text-center">
                    <h3 className="font-bold text-gray-800 text-xs sm:text-sm md:text-base leading-tight mb-2">
                      {faq.question}
                    </h3>
                    <img
                      src={faq.icon}
                      alt=""
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2"
                    />
                    {selectedFAQ === faq.id && (
                      <div className="animate-in slide-in-from-top duration-300">
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-2">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for mobile */}
      {selectedFAQ && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:hidden">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 text-lg">
                {faqs.find((f) => f.id === selectedFAQ)?.question}
              </h3>
              <button
                onClick={() => setSelectedFAQ(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {faqs.find((f) => f.id === selectedFAQ)?.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQComponent;
