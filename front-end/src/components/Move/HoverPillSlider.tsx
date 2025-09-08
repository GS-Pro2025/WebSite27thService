import React, { useState } from "react";
import { ArrowRight, Bug, Bird, Turtle, Rabbit, Squirrel, Shield, Truck } from "lucide-react";

/**
 * HoverPillSlider (estilo como la imagen)
 * - 8 "líneas" verticales en forma de píldora
 * - Al pasar el cursor por cada línea se EXPANDE y muestra una tarjeta con texto y botón
 * - Colores intercalados: #F7F7F7 y #33A8BA
 * - Un ícono pequeño en la parte inferior de cada línea (puedes reemplazar por tus SVG/PNGs)
 * - Sin dependencias de UI; solo Tailwind + lucide-react (opcional para íconos)
 */

const ITEMS = [
  {
    title: "Ant Team",
    subtitle: "(Labor, solo mano de obra)",
    desc:
      "Para quienes ya tienen transporte y solo necesitan un equipo profesional para cargar, descargar o mover dentro del hogar u oficina.",
    cta: "LO QUIERO",
    icon: Bug,
  },
  { title: "Bear Team", subtitle: "(Carga pesada)", desc: "Ideal para objetos voluminosos y pesados con maniobra especializada.", cta: "Cotizar", icon: Shield },
  { title: "Butterfly Pack", subtitle: "(Empaque fino)", desc: "Empaque premium para artículos delicados y de alto valor.", cta: "Ver detalles", icon: Bird },
  { title: "Eagle Move", subtitle: "(Mudanza express)", desc: "Servicio ágil con ventanas de tiempo reducidas y priorización.", cta: "Reservar", icon: Truck },
  { title: "Hippo Fleet", subtitle: "(Transporte total)", desc: "Incluye camión, personal y materiales de protección.", cta: "Empezar", icon: Rabbit },
  { title: "Armadillo Care", subtitle: "(Protección extra)", desc: "Funda, cobijas y esquineros para máxima seguridad.", cta: "Activar", icon: Shield },
  { title: "Turtle Store", subtitle: "(Bodega temporal)", desc: "Almacenamiento por días o semanas mientras reubicas.", cta: "Conocer", icon: Turtle },
  { title: "Bee Assist", subtitle: "(Ayudante por horas)", desc: "Refuerzo por tiempo limitado para tareas puntuales.", cta: "Solicitar", icon: Squirrel },
] as const;

const BG_A = "#F7F7F7";
const BG_B = "#33A8BA";

export default function HoverPillSlider() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative w-full max-w-6xl mx-auto">
      {/* Tira de líneas (píldoras) */}
      <div className="relative flex items-end gap-3 md:gap-4 py-6 md:py-8">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          const isEven = i % 2 === 0;
          const bg = isEven ? BG_A : BG_B;
          const dark = !isEven; // cuando es #33A8BA, texto blanco en tarjeta

          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative"
            >
              {/* Píldora */}
              <div
                className="transition-all duration-300 ease-out rounded-full shadow-sm border border-black/5 flex items-end justify-center overflow-visible"
                style={{
                  backgroundColor: bg,
                  width: hovered === i ? "15rem" : "2.75rem",
                  height: "24rem",
                }}
              >
                {/* Icono inferior */}
                <div className="absolute -bottom-4 flex items-center justify-center w-10 h-10 rounded-full shadow bg-white/90 backdrop-blur border border-black/10">
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
              </div>

              {/* Tarjeta informativa (aparece al hover) */}
              <div
                className={
                  "pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+16px)] md:-translate-x-[calc(100%+20px)] w-[min(90vw,520px)]" +
                  " opacity-0 scale-[0.98] group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                }
              >
                <div className={`pointer-events-auto rounded-2xl shadow-xl p-5 sm:p-6 ${dark ? "bg-[#1e8997] text-white" : "bg-white text-slate-800"}`}>
                  <h3 className="text-2xl font-bold leading-tight">{item.title}</h3>
                  <p className={`mt-1 text-sm ${dark ? "text-white/80" : "text-slate-500"}`}>{item.subtitle}</p>
                  <p className={`mt-3 text-base ${dark ? "text-white" : "text-slate-700"}`}>{item.desc}</p>
                  <button
                    className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow ${
                      dark ? "bg-white text-slate-900 hover:bg-white/90" : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {item.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
