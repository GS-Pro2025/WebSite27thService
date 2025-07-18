import React from "react";

const UsSection: React.FC = () => {
  return (
    <section className="relative w-full -mt-83 z-10 bg-[#F7F7F7] overflow-hidden pt-24 pb-16">
      {/* Contenido */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Imagen */}
          <div className="relative w-full max-w-7xl mx-auto transform -translate-y-12">
            <img
              src="/assets/banner.png"
              alt="Nuestro equipo"
              className="w-full rounded"
            />
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-[#FFE67B] text-white font-bold text-sm px-10 py-3 rounded-full shadow uppercase">
              Nosotros
            </div>
          </div>

          {/* Texto + óvalo */}
          <div className="text-[#1C1C1C] font-montserrat text-[15px] flex flex-col gap-6">
            <div>
              <h3 className="text-[18px] font-bold uppercase mb-2">
                En Twenty Seventh Services Group, LLC, hacemos de cada mudanza
                una experiencia confiable y sin estrés.
              </h3>
              <p className="mb-4">
                Nos especializamos en mudanzas residenciales y comerciales,
                asegurando un proceso ágil, seguro y adaptado a tus necesidades.
                Desde el primer contacto hasta la entrega final.
              </p>
              <p>
                Nuestro equipo está formado por profesionales calificados,
                responsables y atentos, que manejan tus pertenencias como si
                fueran propias. Sabemos que detrás de cada caja hay una
                historia, y por eso trabajamos con dedicación, eficiencia y
                respeto.
              </p>
            </div>

            {/* Óvalo informativo */}
            <div className="bg-[#A2C2BF] rounded-full shadow-md px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#D9D9D9] text-white text-[15px]">
              <div className="text-[#2C2C2C] flex-1 text-center font-semibold">
                Servicio Integral y de calidad
              </div>
              <div className="text-[#2C2C2C] flex-1 text-center font-semibold">
                Mejores precios
              </div>
              <div className="text-[#2C2C2C] flex-1 text-center font-semibold">
                Experiencia comprobada
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsSection;
