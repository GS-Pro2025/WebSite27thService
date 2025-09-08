import React from "react";

const WeightSection: React.FC = () => {
  return (
    <section className="w-full">
      {/* SECCIÓN 1: Cinta superior con degradado y título */}
      <div className="w-full bg-[linear-gradient(90deg,#002C3D_0%,#0E6F7E_45%,#FFE67B_80%,#FFF7E6_100%)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="py-10 md:py-14 text-center">
            <h2 className="text-white text-3xl md:text-4xl font-extrabold">
              ¿Cuánto pesa tu mudanza?
            </h2>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: Tarjeta gris de ancho completo */}
      <div className="w-full bg-[#C6D7CE] shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        {/* Contenedor para centrar el contenido de la tarjeta */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 md:py-8 text-slate-700">
          <p>
            El peso de tu mudanza es un referente importante para que sea
            programada con la mejor logística, por esto el conocer estos datos:
          </p>
          <ol className="mt-4 space-y-2">
            <li className="font-semibold">
              1. Podrá establecerte un estimado de costo
            </li>
            <li className="font-semibold">
              2. Hará que la mudanza se elabore con los mejores estándares de
              calidad y sin ningún contratiempo.
            </li>
          </ol>
        </div>
      </div>

      {/* SECCIÓN 3: Banda inferior amarilla pálida */}
      <div className="w-full bg-[#FFE67B]/65">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-8 md:gap-6 items-start">
            <p className="text-slate-800 leading-relaxed">
              Sabemos que puede ser difícil determinar el peso de toda tu
              mudanza, pero te ayudaremos con una guía sencilla.
            </p>

            <ArrowRight className="hidden md:block mt-2" />

            <p className="text-slate-800 leading-relaxed">
              Ten claro cuántas habitaciones / espacios deseas mudar, luego
              determina los objetos de mayor tamaño y haz una lista por espacio.
            </p>

            <ArrowRight className="hidden md:block mt-2" />

            <p className="text-slate-800 leading-relaxed">
              Te daremos algunos datos sobre objetos comunes y sus pesos
              aproximados para que tengas una referencia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Flecha estética y delgada, centrada verticalmente en la fila */
const ArrowRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="44"
    height="44"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 12h13M13 5l7 7-7 7"
      stroke="#FFFFFF"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default WeightSection;
