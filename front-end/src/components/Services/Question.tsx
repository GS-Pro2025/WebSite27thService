import React from "react";

const FAQGrid = () => {
  const faqs = [
    {
      id: 1,
      question: "What determines the cost of my move?",
      answer:
        "The cost of your move depends on three key factors: the volume and weight of your belongings, the distance to be covered, and any additional services you may require (such as packing, insurance, or furniture assembly).",
      icon: "/assets/recurso_question_1.svg",
    },
    {
      id: 2,
      question: "Can I move a single item?",
      answer:
        "Yes, at Mudanzas Ágiles we offer customized plans that allow you to move anything from a single item to a full relocation, with the same safety and efficiency.",
      icon: "/assets/recurso_question_2.svg",
    },
    {
      id: 3,
      question: "Can I calculate how much weight I have?",
      answer:
        "Yes, at Twenty Seventh we help you estimate the approximate weight of your belongings so we can provide you with the best transportation option.",
      icon: "/assets/recurso_question_3.svg",
    },
    {
      id: 4,
      question: "Can I make a personalized move?",
      answer:
        "Yes, at Twenty Seventh you can make your move completely personalized according to your needs, budget, and schedule.",
      icon: "/assets/recurso_question_4.svg",
    },
    {
      id: 5,
      question: "How do you protect my high-value items?",
      answer:
        "At Twenty Seventh, the care of your high-value items is a priority: we use specialized materials, insurance, and trained personnel to guarantee their protection.",
      icon: "/assets/recurso_question_5.svg",
    },
    {
      id: 6,
      question: "How can I know if my move is covered?",
      answer:
        "To know if your move is covered, you only need to provide us with your location and we will confirm whether it falls within our service area.",
      icon: "/assets/recurso_question_6.svg",
    },
  ];

  return (
    <div
      className="relative min-h-screen md:min-h-[80vh] lg:min-h-screen p-6 md:p-12"
      style={{
        background:
          "linear-gradient(to bottom, white 0%, white 15%, #B8CCC5 35%, #7AACAE 80%, #7AACAE 100%)",
      }}
    >
      {/* Caja decorativa */}
      <div className="absolute bottom-60 left-6 w-70 h-70 sm:bottom-20 sm:left-6 sm:w-28 sm:h-24 md:bottom-0 md:left-0 md:w-1/3 md:h-1/2 z-10">
        <img
          src="/assets/box.svg"
          alt="Moving boxes"
          className="w-full h-full object-contain object-bottom"
        />
      </div>

      {/* Título superior */}
      <div className="flex flex-col items-center justify-center relative z-30 pt-8 mb-12">
        <div className="bg-[#0E6F7E] backdrop-blur-sm mx-4 md:mx-8 lg:mx-20 w-fit rounded-3xl px-8 py-4 shadow-2xl relative overflow-visible mb-4">
          <img
            src="/assets/Recurso_question_faq.svg"
            alt="FAQ"
            className="w-16 md:w-20 lg:w-65 absolute -top-6 -right-2 md:-top-20 md:-right-30 z-50"
          />
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#FCD21C] text-center pr-8 md:pr-12">
            We answer your questions
          </h1>
        </div>
        <p className="text-lg md:text-2xl text-gray-700 text-center max-w-4xl">
          Because moving should be{" "}
          <span className="text-[#0E6F7E] font-semibold drop-shadow">
            easy, calm, and reliable
          </span>
        </p>
      </div>

      {/* Grid de FAQs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-20">
        {faqs.map((faq, index) => {
          const isDesign1 = index % 2 === 0;
          const bgColor = isDesign1 ? "bg-[#0E6F7E]" : "bg-[#FFE67B]";
          const textColor = isDesign1 ? "text-white" : "text-black";
          const numberColor = isDesign1 ? "text-[#FCD21C]" : "text-[#0E6F7E]";

          return (
            <div
              key={faq.id}
              className="group rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 bg-[#DAE2D6]"
            >
              {/* Parte superior fija */}
              <div className="p-6 min-h-[100px] flex items-center justify-center text-center">
                <h3 className="font-bold text-gray-800 text-lg">
                  {faq.question}
                </h3>
              </div>

              {/* Parte inferior expandible */}
              <div
                className={`max-h-0 opacity-0 overflow-hidden group-hover:max-h-60 group-hover:opacity-100 transition-all duration-500 ease-in-out ${bgColor} px-6 pb-6`}
              >
                <div className="flex items-center justify-between pt-4">
                  <span className={`font-semibold ${numberColor}`}>
                    00{faq.id}
                  </span>
                  <img src={faq.icon} alt="icon" className="w-8 h-8" />
                </div>
                <p className={`${textColor} text-sm leading-relaxed mt-3`}>
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQGrid;
