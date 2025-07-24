import React, { useState } from "react";
import bagroundImg from "/assets/FondoQuestion.svg";
import box from "/assets/Box.png";
import linea2 from "/assets/linea2.svg";
const FAQComponent = () => {
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "What determines the cost of my move?",
      answer:
        "The cost depends on factors such as distance, item volume, additional services, and the time of year.",
      position: "top-left",
      icon: "/assets/icon_1_circle.svg",
    },
    {
      id: 2,
      question: "Can I request a personalized move?",
      answer:
        "Yes, we offer personalized services tailored to your specific needs and budget.",
      position: "top-right",
      icon: "/assets/icon_4_circle.svg",
    },
    {
      id: 3,
      question: "Can I move just one item?",
      answer:
        "Absolutely — we handle everything from single-item moves to full relocations.",
      position: "bottom-left",
      icon: "/assets/icon_2_circle.svg",
    },
    {
      id: 4,
      question: "Can I calculate how much weight I’m moving?",
      answer:
        "Yes, we’ll help you estimate the approximate weight and provide recommendations.",
      position: "bottom-center",
      icon: "/assets/icon_5_circle.svg",
    },
    {
      id: 5,
      question: "How do you protect my high-value items?",
      answer:
        "We use special materials, insurance, and trained staff to ensure the safety of valuable items.",
      position: "bottom-right",
      icon: "/assets/icon_3_circle.svg",
    },
  ];

  const getPositionClasses = (position: string) => {
    switch (position) {
      case "top-left":
        return `
          hidden md:block absolute left-0 top-1/4 -translate-x-1/2 -translate-y-1/2
          md:left-0 md:top-1/4 md:-translate-x-1/2 md:-translate-y-1/2
          w-48 md:w-56
        `;
      case "top-right":
        return `
          hidden md:block absolute right-0 top-1/4 translate-x-1/2 -translate-y-1/2
          md:right-0 md:top-1/4 md:translate-x-1/2 md:-translate-y-1/2
          w-48 md:w-56
        `;
      case "bottom-left":
        return `
          hidden md:block absolute left-0 bottom-1/4 -translate-x-1/2 translate-y-1/2
          md:left-0 md:bottom-1/4 md:-translate-x-1/2 md:translate-y-1/2
          w-48 md:w-56
        `;
      case "bottom-center":
        return `
          hidden md:block absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2
          md:left-1/2 md:bottom-0 md:-translate-x-1/2 md:translate-y-1/2
          w-48 md:w-56
        `;
      case "bottom-right":
        return `
          hidden md:block absolute right-0 bottom-1/4 translate-x-1/2 translate-y-1/2
          md:right-0 md:bottom-1/4 md:translate-x-1/2 md:translate-y-1/2
          w-48 md:w-56
        `;
      default:
        return "";
    }
  };

  return (
    <div className="relative h-lvw bg-gradient-to-b from-[#68A2A6] to-[#0E6F7E]/60">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={bagroundImg}
          alt="Background"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Boxes Background */}
      <div className="absolute bottom-100 left-0 w-1/3 h-1/3">
        <img
          src={box}
          alt="Moving boxes"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="absolute bottom-60 w-full h-auto">
        <img
          src={linea2}
          alt="Lines"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="flex flex-col items-center justify-center relative z-30 overflow-visible pt-8">
        <div className="bg-[#FFE67B] backdrop-blur-sm mx-4 md:mx-8 lg:mx-20 w-1/3 min-w-fit rounded-3xl p-6 shadow-2xl relative overflow-visible">
          {/* Imagen alineada arriba a la derecha */}
          <img
            src="/assets/Recurso_question_faq.svg"
            alt="FAQ"
            className="w-12 md:w-16 lg:w-20 absolute -top-6 -right-2 md:-top-8 md:-right-4 z-50"
          />
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 text-center pr-8 md:pr-12">
            <span className="text-white">We answer your questions</span>
          </h1>
        </div>
        <p className="text-lg md:text-3xl text-[#585858] text-center">
          Because moving should be{" "}
          <span className="text-[#FFE67B] font-semibold drop-shadow">
            easy, stress-free, and reliable
          </span>
        </p>
      </div>
      {/* Central Circle */}
      <div className="relative z-10 flex items-center justify-center h-full -top-120">
        <div className="relative">
          {/* Outer circle */}
          <div className="w-[500px] h-[500px] md:w-[900px] md:h-[900px] rounded-full border-4 border-white/50 flex items-center justify-center">
            {/* Inner circle */}
            <div className="w-80 h-80 md:w-150 md:h-150 rounded-full border-2 border-white/50 flex items-center justify-center">
              {/* Center circle */}
              <div className="w-60 h-60 md:w-100 md:h-100 bg-teal-600 rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <h2 className="text-white font-bold text-xl md:text-3xl mb-1">
                    FREQUENTLY 
                  </h2>
                  <h2 className="text-white font-bold text-xl md:text-3xl">
                    ASKED QUESTIONS
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
              )} w-48 md:w-56 group cursor-pointer transform transition-all duration-300 hover:scale-105`}
              onClick={() =>
                setSelectedFAQ(selectedFAQ === faq.id ? null : faq.id)
              }
            >
              <div className="bg-gradient-to-b from-[#C6D7CE] to-[#FFF7E6] backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 hover:bg-white/90 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="flex-1 text-center">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight mb-2">
                      {faq.question}
                    </h3>
                    <img
                      src={faq.icon}
                      alt=""
                      className="w-10 h-10 mx-auto mb-2"
                    />
                    {selectedFAQ === faq.id && (
                      <div className="animate-in slide-in-from-top duration-300">
                        <p className="text-xs text-gray-600 leading-relaxed border-t border-gray-200 pt-2">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Connector line to center */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-px h-8 bg-gradient-to-b from-teal-400 to-transparent absolute top-full left-1/2 transform -translate-x-1/2 opacity-30"></div>
                </div>
              </div>
            </div>
          ))}

          {/* Connection lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              width: "600px",
              height: "600px",
              left: "-100px",
              top: "-100px",
            }}
          >
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="1" fill="white" opacity="0.3" />
              </pattern>
            </defs>

            {/* Dotted connection lines */}
            <line
              x1="100"
              y1="100"
              x2="300"
              y2="300"
              stroke="url(#dots)"
              strokeWidth="2"
              opacity="0.5"
            />
            <line
              x1="500"
              y1="100"
              x2="300"
              y2="300"
              stroke="url(#dots)"
              strokeWidth="2"
              opacity="0.5"
            />
            <line
              x1="100"
              y1="500"
              x2="300"
              y2="300"
              stroke="url(#dots)"
              strokeWidth="2"
              opacity="0.5"
            />
            <line
              x1="300"
              y1="550"
              x2="300"
              y2="300"
              stroke="url(#dots)"
              strokeWidth="2"
              opacity="0.5"
            />
            <line
              x1="500"
              y1="500"
              x2="300"
              y2="300"
              stroke="url(#dots)"
              strokeWidth="2"
              opacity="0.5"
            />
          </svg>
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
