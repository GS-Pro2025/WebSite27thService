import React, { useState } from "react";

type TabKey = "cocina" | "habitacion" | "estudio";

const ICONS: Record<TabKey, { src: string; alt: string; peso: string }[]> = {
  cocina: [
    { src: "/assets/estufa.svg", alt: "Estufa 3D", peso: "176 - 331 lb" },
    { src: "/assets/nevera.svg", alt: "Nevera 3D", peso: "200 - 400 lb" },
    {
      src: "/assets/horno.svg",
      alt: "Horno microondas 3D",
      peso: "50 - 120 lb",
    },
  ],
  habitacion: [
    { src: "/assets/cama.svg", alt: "Cama 3D", peso: "220 - 350 lb" },
    { src: "/assets/armario.svg", alt: "Armario 3D", peso: "300 - 500 lb" },
    { src: "/assets/gavetas.svg", alt: "Cómoda 3D", peso: "180 - 280 lb" },
  ],
  estudio: [
    { src: "/assets/silla.svg", alt: "Silla 3D", peso: "40 - 90 lb" },
    {
      src: "/assets/estanteria.svg",
      alt: "Estantería 3D",
      peso: "150 - 250 lb",
    },
    {
      src: "/assets/escritorio.svg",
      alt: "Escritorio 3D",
      peso: "200 - 320 lb",
    },
  ],
};

const TAB_LABELS: Record<TabKey, string> = {
  cocina: "Cocina",
  habitacion: "Habitación",
  estudio: "Estudio",
};

const CalculatorSection: React.FC = () => {
  const [active, setActive] = useState<TabKey>("cocina");

  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(90deg,#002C3D_0%,#0E6F7E_45%,#FFE67B_80%,#FFF7E6_100%)]">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12 mb-20">
          {(Object.keys(TAB_LABELS) as TabKey[]).map((key, index) => (
            <div key={key} className="flex flex-col items-center gap-y-6">
              <button
                onClick={() => setActive(key)}
                className={`text-[#0E6F7E] font-bold text-4xl py-3 px-12 rounded-2xl shadow-lg border border-black transition-colors w-full max-w-xs
    ${active === key ? "bg-[#FFE67B]" : "bg-white hover:bg-gray-100"}`}
              >
                {TAB_LABELS[key]}
              </button>

              <img
                src={ICONS[active][index].src}
                alt={ICONS[active][index].alt}
                className="w-full h-auto max-w-[300px] mx-auto transform hover:scale-105 transition-transform"
              />

              <div className="bg-white text-[#0E6F7E] font-bold text-lg py-3 px-2 rounded-2xl shadow-md border border-black w-full max-w-[200px]">
                {ICONS[active][index].peso}
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xl md:text-4xl font-bold text-[#2D2A26]">
            Tranquilo, calculamos el peso por ti
          </p>
          <a
            href="#contactanos"
            className="inline-block mt-5 bg-[#FFE67B] text-[#0E6F7E] font-bold 
             text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
             py-3 sm:py-4 
             px-6 sm:px-10 md:px-14 lg:px-20 
             rounded-full shadow-lg 
             hover:bg-yellow-300 transition-all transform hover:scale-105"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
