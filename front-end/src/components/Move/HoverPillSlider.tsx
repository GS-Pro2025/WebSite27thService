import React, { useState } from "react";

type Item = {
  title: string;
  subtitle: string;
  desc: string;
  cta: string;
  iconSrc: string;
};

const ITEMS: Item[] = [
  {
    title: "Ant Team",
    subtitle: "(Labor, solo mano de obra)",
    desc: "Para quienes ya tienen transporte y solo necesitan un equipo profesional para cargar, descargar o mover dentro del hogar u oficina.",
    cta: "LO QUIERO",
    iconSrc: "ant.svg",
  },
  {
    title: "Beaver Team",
    subtitle: "(Carga pesada)",
    desc: "Ideal para objetos voluminosos y pesados con maniobra especializada.",
    cta: "Cotizar",
    iconSrc: "beaver.svg",
  },
  {
    title: "Butterfly Pack",
    subtitle: "(Empaque fino)",
    desc: "Empaque premium para artículos delicados y de alto valor.",
    cta: "Ver detalles",
    iconSrc: "butterfly.svg",
  },
  {
    title: "Eagle Move",
    subtitle: "(Mudanza express)",
    desc: "Servicio ágil con ventanas de tiempo reducidas y priorización.",
    cta: "Reservar",
    iconSrc: "eagle.svg",
  },
  {
    title: "Bull Fleet",
    subtitle: "(Transporte total)",
    desc: "Incluye camión, personal y materiales de protección.",
    cta: "Empezar",
    iconSrc: "bull.svg",
  },
  {
    title: "Kangaroo Care",
    subtitle: "(Protección extra)",
    desc: "Funda, cobijas y esquineros para máxima seguridad.",
    cta: "Activar",
    iconSrc: "kangaroo.svg",
  },
  {
    title: "Turtle Store",
    subtitle: "(Bodega temporal)",
    desc: "Almacenamiento por días o semanas mientras reubicas.",
    cta: "Conocer",
    iconSrc: "turtle.svg",
  },
  {
    title: "Bee Assist",
    subtitle: "(Ayudante por horas)",
    desc: "Refuerzo por tiempo limitado para tareas puntuales.",
    cta: "Solicitar",
    iconSrc: "bee.svg",
  },
];

const BG_LIGHT = "#F7F7F7EB";
const BG_BLUE = "#33A8BAE0";
const TEAL_TEXT = "#0E6F7E";
const YELLOW_TEXT = "#FFE67B";

export default function HoverPillSlider() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative w-full overflow-x-auto">
      <div className="flex items-end gap-3 md:gap-4 py-10 px-4 min-w-full">
        {ITEMS.map((item, i) => {
          const isActive = active === i;
          const isEven = i % 2 === 0;
          const bg = isEven ? BG_LIGHT : BG_BLUE;
          const dark = !isEven;

          const circleBg = isEven ? "#FFE67B" : "#C6D7CE";

          return (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group relative outline-none flex-shrink-0"
              aria-expanded={isActive}
            >
              <div
                className="transition-all duration-300 ease-out rounded-[3rem] shadow-md border border-black/10 overflow-hidden relative flex"
                style={{
                  backgroundColor: bg,
                  width: isActive ? "26rem" : "5rem",
                  height: "28rem",
                }}
              >
                {/* Contenido interno */}
                <div
                  className={`flex flex-col h-full w-full px-6 pt-6 pb-32
                    ${dark ? "text-white" : "text-slate-900"}`}
                >
                  <div
                    className={`${
                      isActive ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-300`}
                  >
                    <h3
                      className="text-3xl font-extrabold leading-tight"
                      style={
                        dark ? { color: YELLOW_TEXT } : { color: TEAL_TEXT }
                      }
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`mt-1 text-sm ${
                        dark ? "text-white/80" : "text-slate-500"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                    <p
                      className={`mt-4 text-base ${
                        dark ? "text-white" : "text-slate-700"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>

                {isActive ? (
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    {/* Botón a la izquierda */}
                    <a
                      href="#contactanos"
                      className={`rounded-full px-8 py-4 text-base font-extrabold shadow transition
        ${
          dark
            ? "bg-white text-slate-900 hover:bg-white/90"
            : "bg-white hover:bg-white/90"
        }`}
                      style={{ color: dark ? YELLOW_TEXT : TEAL_TEXT }}
                    >
                      {item.cta}
                    </a>

                    {/* Ícono a la derecha con círculo */}
                    <div
                      className="w-16 h-16 rounded-full shadow flex items-center justify-center relative"
                      style={{ backgroundColor: circleBg }}
                    >
                      <img
                        src={`/assets/${item.iconSrc}`}
                        alt={item.title}
                        className="w-24 h-24 object-contain absolute -top-2"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full shadow flex items-center justify-center"
                    style={{ backgroundColor: circleBg }}
                  >
                    <img
                      src={`/assets/${item.iconSrc}`}
                      alt={item.title}
                      className="w-24 h-24 object-contain relative"
                    />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
