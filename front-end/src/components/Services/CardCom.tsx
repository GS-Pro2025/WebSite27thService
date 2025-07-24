import React from 'react';
import bagroundImg from "/assets/Slider1.png"

const CardCom: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "OFFICES",
      description: "We move items, whether from small or large office spaces.",
      bgColor: "bg-[#FFE67B]/60"
    },
    {
      id: 2,
      title: "STORES",
      description: "We transport your goods and relocate your store wherever you need.",
      bgColor: "bg-[#FFE67B]/60"
    },
    {
      id: 3,
      title: "CONTAINER",
      description: "Need to move some items — or everything? No problem, we’ve got you covered.",
      bgColor: "bg-[#FFE67B]/60"
    }
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={bagroundImg}
          alt="Equipo de mudanzas trabajando"
          className="w-full h-full object-cover rounded-t-4xl"
        />
      </div>
      
      {/* Overlay para mejor legibilidad en móvil */}
      <div className="absolute inset-0"></div>
      
      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="space-y-3 md:space-y-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 transform transition-all duration-700"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Etiqueta del servicio */}
              <div className={`${service.bgColor} rounded-full px-4 md:px-6 py-2 md:py-3 min-w-[120px] md:min-w-[140px] text-center shadow-lg flex-shrink-0`}>
                <span className="text-black font-bold text-xs md:text-sm uppercase tracking-wide">
                  {service.title}
                </span>
              </div>
              
              {/* Descripción */}
              <div className="bg-white/50 md:bg-white/40 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 w-full md:max-w-md shadow-lg">
                <p className="text-gray-800 md:text-white font-medium text-sm md:text-xl leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Elementos decorativos - ocultos en móvil para mejor rendimiento */}
      <div className="hidden md:block absolute top-10 right-10 w-20 h-20 bg-[#0E6F7E]/20 rounded-full blur-xl"></div>
      <div className="hidden md:block absolute bottom-10 left-10 w-16 h-16 bg-[#FFE67B]/30 rounded-full blur-lg"></div>
      
      {/* Elementos decorativos móviles más pequeños */}
      <div className="md:hidden absolute top-5 right-5 w-12 h-12 bg-[#0E6F7E]/20 rounded-full blur-lg"></div>
      <div className="md:hidden absolute bottom-5 left-5 w-10 h-10 bg-[#FFE67B]/30 rounded-full blur-md"></div>
    </div>
  );
};

export default CardCom;