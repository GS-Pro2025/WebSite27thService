import React, { useState, useEffect, useRef, useCallback } from "react";
import QuoteForm from "../QuoteForm";
import ServicesForm from "../ServicesForm";
import SuccessModal from "../SuccessModal";
import api from "../../api/axiosInstance";

interface FormData {
  name: string;
  phone: string;
  origin: string;
  destination: string;
  email: string;
  typeOfMove: string;
  address: string;
  additional_info: string;
  tentative_date: string;
  size_of_move: string;
}

const ANIMATION_CONFIG = {
  threshold: 0.1,
  rootMargin: "50px 0px -50px 0px",
  baseClass: "transform transition-all duration-1000 ease-out",
  delays: {
    title: "",
    process: "delay-300",
    content: "delay-500",
    form: "delay-700",
  },
} as const;

const MOVE_SIZE_TO_BEDROOMS: Record<string, number> = {
  xsmall: 1,
  small: 1,
  medium: 2,
  large: 3,
  xlarge: 4,
} as const;

const SERVICE_NAME_BY_KEY = {
  pack: "Pack",
  wrap: "Wrap",
  load: "Load",
  unload: "Unload",
  unpack: "Unpack",
  home_org: "Home Organization",
} as const;

const INITIAL_FORM_DATA: FormData = {
  name: "",
  phone: "",
  origin: "",
  destination: "",
  email: "",
  typeOfMove: "",
  address: "",
  additional_info: "",
  tentative_date: "",
  size_of_move: "",
};

const ProcessSection: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [procStep, setProcStep] = useState<1 | 2>(1);
  const [quoteData, setQuoteData] = useState<FormData | null>(null);
  const [selectedServices, setSelectedServices] = useState<
    ("pack" | "wrap" | "load" | "unload" | "unpack" | "home_org")[]
  >([]);
  const [services, setServices] = useState<
    { service_id: number; name: string }[]
  >([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        threshold: ANIMATION_CONFIG.threshold,
        rootMargin: ANIMATION_CONFIG.rootMargin,
      }
    );

    observer.observe(currentSection);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/services");
        setServices(data || []);
      } catch (e) {
        console.error("Error loading services:", e);
      }
    })();
  }, []);

  const createMoveItems = useCallback(
    async (moveId: number, data: FormData) => {
      const bedrooms = MOVE_SIZE_TO_BEDROOMS[data.size_of_move] || 0;

      const promises = [
        api.post("/move-items", {
          move_id: moveId,
          description: data.typeOfMove,
          quantity: 1,
        }),
      ];

      if (bedrooms > 0) {
        promises.push(
          api.post("/move-items", {
            move_id: moveId,
            description: "bedroom",
            quantity: bedrooms,
          })
        );
      }

      return Promise.all(promises);
    },
    []
  );

  const handleFinalSubmitServices = useCallback(async () => {
    if (!quoteData || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Person
      const personRes = await api.post("/persons", {
        full_name: quoteData.name,
        email: quoteData.email,
        phone_number: quoteData.phone,
        address: quoteData.address,
        additional_info: quoteData.additional_info,
      });

      // Move
      const moveRes = await api.post("/moves", {
        person_id: personRes.data.person_id,
        status: "pending",
        tentative_date: quoteData.tentative_date,
        origin_address: quoteData.origin,
        destination_address: quoteData.destination,
      });
      const moveId = moveRes.data.move_id;

      // Move Items
      await createMoveItems(moveId, quoteData);

      // Move Services
      const idByName = new Map(services.map((s) => [s.name, s.service_id]));
      const reqs = selectedServices
        .map((k) => idByName.get(SERVICE_NAME_BY_KEY[k]))
        .filter(Boolean)
        .map((service_id) =>
          api.post("/move-services", {
            move_id: moveId,
            service_id,
            quantity: 1,
          })
        );
      await Promise.all(reqs);

      setShowSuccess(true);
    } catch (error) {
      console.error("Error al guardar datos:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [quoteData, isSubmitting, services, selectedServices, createMoveItems]);
  const handleQuoteComplete = useCallback((data: FormData) => {
    setFormData(data);
    setQuoteData(data);
    setProcStep(2);
  }, []);

  const handleQuoteClick = () => {
    if (window.innerWidth >= 1024) {
      const form = document.querySelector("form");
      if (form) form.requestSubmit();
    } else {
      setModalOpen(true);
    }
  };

  const getAnimationClass = (delay: keyof typeof ANIMATION_CONFIG.delays) =>
    `${ANIMATION_CONFIG.baseClass} ${ANIMATION_CONFIG.delays[delay]} ${
      isVisible
        ? "opacity-100 scale-100 translate-y-0"
        : "opacity-0 scale-95 translate-y-4"
    }`;

  const getScaleAnimationClass = (
    delay: keyof typeof ANIMATION_CONFIG.delays
  ) =>
    `${ANIMATION_CONFIG.baseClass} ${ANIMATION_CONFIG.delays[delay]} ${
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
    }`;

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full relative overflow-hidden -mt-[70px] sm:-mt-[150px] md:-mt-[140px] lg:-mt-[250px] xl:-mt-[260px]"
      >
        {/* Fondo */}
        <img
          src="/assets/banner2-inicio.svg"
          alt="Proceso"
          className="w-full h-auto block"
          loading="lazy"
        />

        {/* Contenedor principal */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-[8%] sm:pt-[10%] md:pt-[12%] lg:pt-[8%] xl:pt-[10%]">
          {/* Título animado */}
          <div
            className={`w-full order-1 px-4 sm:px-6 md:px-8 ${getAnimationClass(
              "title"
            )}`}
          >
            <h2 className="text-center text-white font-[Montserrat] font-black text-sm sm:text-2xl md:text-3xl lg:text-4xl leading-tight mb-2 sm:mb-8">
              YOUR MOVE MADE EASY, JUST AS IT SHOULD BE!
            </h2>
          </div>

          {/* Imagen del proceso */}
          <div
            className={`w-full my-2 sm:my-12 md:my-9 lg:my-20 order-2 ${getScaleAnimationClass(
              "process"
            )}`}
          >
            <img
              src="/assets/procesoCompleto.svg"
              alt="Proceso completo"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>

          {/* Contenido inferior */}
          <div
            className={`w-full max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 lg:gap-8 items-start px-4 sm:px-6 md:px-8 order-3 ${getAnimationClass(
              "content"
            )}`}
          >
            {/* Texto descriptivo */}
            <div className="w-full sm:w-1/2 font-[Montserrat] text-left mb-1 sm:mb-0">
              <h3 className="text-sm sm:text-[18px] md:text-[22px] lg:text-[28px] font-extrabold mb-1 sm:mb-2 text-[#FFE67B]">
                SEE HOW WE DO IT
              </h3>
              <p className="text-[10px] sm:text-[12px] md:text-[16px] lg:text-[18px] font-bold leading-tight text-white">
                Here, in just three simple steps, we'll show you how to schedule
                a fast, stress-free move with 100% certified professionals.
              </p>
            </div>

            {/* Sección del formulario */}
            <div className="w-full sm:w-1/2">
              {/* Botón móvil */}
              <div className="lg:hidden w-full flex justify-center mt-2">
                <button
                  onClick={handleQuoteClick}
                  disabled={isSubmitting}
                  className={`bg-[#FFE67B] text-black text-xs font-semibold py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${getScaleAnimationClass(
                    "content"
                  )}`}
                >
                  {isSubmitting ? "PROCESSING..." : "GET A QUOTE NOW"}
                </button>
              </div>

              {/* Formulario desktop */}
              <div
                className={`hidden lg:block relative ${getScaleAnimationClass(
                  "form"
                )}`}
              >
                {procStep === 1 && (
                  <div className="absolute -top-6 lg:-top-8 -translate-x-1/2 bg-[#FFE67B] w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-2xl lg:text-3xl font-bold text-[#7ARACAE] shadow-lg z-10 transform transition-all duration-300 hover:scale-110 group cursor-help">
                    1
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F6F7C] text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-20">
                      Step 1: Fill out the form
                    </div>
                  </div>
                )}

                {procStep === 1 ? (
                  <QuoteForm onComplete={handleQuoteComplete} />
                ) : (
                  <ServicesForm
                    selected={selectedServices}
                    setSelected={setSelectedServices}
                    onSubmit={handleFinalSubmitServices}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <QuoteModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} /> */}
      <SuccessModal
        show={showSuccess}
        title="Request successful"
        message="Your request has been submitted successfully. You will receive more information in your email."
        onClose={() => window.location.reload()}
      />
    </>
  );
};

export default ProcessSection;
