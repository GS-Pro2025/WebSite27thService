import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import faqImage from "/assets/cajasMano.png";
import packageIcon from "/assets/Q1.svg";
import balance from "/assets/Q2.svg";
import scaleIcon from "/assets/Q3.svg";
import ListIcon from "/assets/Q4.svg";
import gemIcon from "/assets/Q5.svg";
import mapPinIcon from "/assets/Q6.svg";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  icon: string;
}

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "What determines the cost of my move?",
      answer:
        "The cost of your move depends on three key factors: the volume and weight of your belongings, the distance to be covered, and any additional services you may require (such as packing, insurance, or furniture assembly).",
      icon: packageIcon,
    },
    {
      id: 2,
      question: "Can I move a single item?",
      answer:
        "Yes, at Twenty Seventh we offer customized plans that allow you to move anything from a single item to a full relocation, with the same safety and efficiency.",
      icon: balance,
    },
    {
      id: 3,
      question: "Can I calculate how much weight I have?",
      answer:
        "Yes, at Twenty Seventh we help you estimate the approximate weight of your belongings so we can provide you with the best transportation option.",
      icon: scaleIcon,
    },
    {
      id: 4,
      question: "Can I make a personalized move?",
      answer:
        "Yes, at Twenty Seventh you can make your move completely personalized according to your needs, budget, and schedule.",
      icon: ListIcon,
    },
    {
      id: 5,
      question: "How do you protect my high-value items?",
      answer:
        "At Twenty Seventh, the care of your high-value items is a priority: we use specialized materials, insurance, and trained personnel to guarantee their protection.",
      icon: gemIcon,
    },
    {
      id: 6,
      question: "How can I know if my move is covered?",
      answer:
        "To know if your move is covered, you only need to provide us with your location and we will confirm whether it falls within our service area.",
      icon: mapPinIcon,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getItemColor = (index: number) => {
    return index % 2 === 0 ? "teal" : "yellow";
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-8 md:py-16 px-4 md:px-8 bg-gradient-to-b from-white via-[#E8F4F8] to-[#D4E8E8]"
    >
      <div className="max-w-8xl mx-auto lg:mx-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - FAQ Accordion */}
          <div>
            {/* Header */}
            <div 
              className={`mb-6 md:mb-8 transition-all duration-1000 ease-out ${
                isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-20"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2 md:mb-3 font-[Poppins]">
                Resolve doubts about your move
              </h2>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg font-[Manrope]">
                Staying selected on each question
              </p>
            </div>

            {/* Accordion Items */}
            <div className="space-y-3 md:space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const isTeal = getItemColor(index) === "teal";
                const bgColor = isTeal ? "bg-[#0E6F7E]" : "bg-[#C9E1EC]";
                const textColor = isTeal ? "text-white" : "text-gray-900";
                const numberColor = isTeal ? "text-[#C9E1EC]" : "text-[#0E6F7E]";

                return (
                  <div
                    key={faq.id}
                    className={`rounded-xl transition-all duration-1000 ease-out ${bgColor} overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 ${
                      isVisible 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-0 -translate-x-10"
                    }`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    {/* Question Header */}
                    <button
                      onClick={() => toggleAccordion(index)}
                      className={`w-full px-4 md:px-6 lg:px-8 py-4 md:py-5 flex items-center justify-between ${textColor} hover:opacity-90 transition-opacity`}
                    >
                      <div className="flex items-center gap-2 md:gap-3 lg:gap-4 flex-1 min-w-0">
                        <span className={`font-semibold text-sm md:text-base lg:text-lg ${numberColor} flex-shrink-0`}>
                          {String(faq.id).padStart(3, "0")}
                        </span>
                        <img 
                          src={faq.icon} 
                          alt={`${faq.question} icon`}
                          className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 object-contain flex-shrink-0 transition-transform duration-300 hover:scale-110"
                        />
                        <span className="font-semibold text-left font-[Manrope] text-sm md:text-base truncate">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 flex-shrink-0 ml-2 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Answer Content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="px-4 md:px-6 lg:px-8 pb-4 md:pb-6">
                        <p className={`${textColor} text-sm md:text-base leading-relaxed font-[Manrope]`}>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Image - Oculta en móvil */}
          <div 
            className={`hidden lg:block relative lg:sticky lg:top-24 transition-all duration-1000 ease-out ${
              isVisible 
                ? "opacity-100 translate-x-0 scale-100" 
                : "opacity-0 translate-x-20 scale-95"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={faqImage}
                alt="Person holding moving box"
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;