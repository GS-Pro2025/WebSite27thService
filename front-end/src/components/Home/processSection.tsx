import React, { useState } from "react";
import decorativeLine from "../../../public/assets/lineaProgreso.svg";
import click from "../../../public/assets/Click.svg";


interface StepCard {
  number: string;
  title: string;
  frontDescription: string;
  backDescription: string;
}

const ProcessSteps: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const steps: StepCard[] = [
    {
      number: "01",
      title: "Phase",
      frontDescription: "Select your moving service",
      backDescription: "Choose from our comprehensive range of moving services tailored to your specific needs. From local moves to international relocations, we have you covered.",
    },
    {
      number: "02",
      title: "Phase",
      frontDescription: "Fast and simple quote",
      backDescription: "Get an instant quote with our transparent pricing system. No hidden fees, no surprises. Just honest pricing for quality service.",
    },
    {
      number: "03",
      title: "Phase",
      frontDescription: "Schedule a date",
      backDescription: "Pick a date that works for you. Our flexible scheduling ensures your move happens when it's most convenient for you.",
    },
  ];

  const toggleCard = (index: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(index)) {
      newFlipped.delete(index);
    } else {
      newFlipped.add(index);
    }
    setFlippedCards(newFlipped);
  };

  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-[#0E6F7E] to-[#D9F3FF] overflow-hidden font-[Manrope]">
      {/* Decorative Line SVG */}
      <div className="relative mt-10 w-full">
        <img 
          src={decorativeLine} 
          alt="" 
          className="w-full max-w-6xl mx-auto opacity-70"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 pt-8 md:pt-10 lg:pt-15">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4 font-[Poppins]">
            Moving with us is that simple
          </h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto px-4">
            Introduction text here with a maximum of two lines to explain our process
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 px-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="perspective-1000"
              style={{ perspective: "1000px" }}
            >
              <div
                className={`relative w-full h-72 sm:h-64 transition-transform duration-700 transform-style-3d cursor-pointer ${
                  flippedCards.has(index) ? "rotate-y-180" : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: flippedCards.has(index) ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
                onClick={() => toggleCard(index)}
              >
                {/* Front of Card */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#FFE67B] rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col items-center justify-center backface-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div className="text-5xl sm:text-6xl font-light text-[#0E6F7E] mb-2">
                    {step.number}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#0E6F7E] mb-3 sm:mb-4 font-[Poppins]">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-800 text-center font-medium">
                    {step.frontDescription}
                  </p>
                </div>

                {/* Back of Card */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#FFE67B] rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col items-center justify-center backface-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <p className="text-sm sm:text-base text-gray-900 text-center leading-relaxed">
                    {step.backDescription}
                  </p>
                  <button 
                    className="mt-4 sm:mt-6 text-[#0E6F7E] font-semibold hover:underline text-sm sm:text-base"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCard(index);
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>

              {/* Learn More Button */}
              <button
                className="flex items-center gap-2 text-gray-800 font-medium mt-4 sm:mt-6 mx-auto hover:text-gray-900 transition-colors text-sm sm:text-base"
                onClick={() => toggleCard(index)}
              >
                Learn more
                <img src={click} alt="Quote" className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;