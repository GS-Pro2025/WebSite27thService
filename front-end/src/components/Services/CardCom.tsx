import React from 'react';
import bagroundImg from "/assets/Slider1.png";

const CardCom: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "OFFICES",
      description: "We move items, whether from small or large office spaces.",
      bgColor: "bg-[#FFE67B]"
    },
    {
      id: 2,
      title: "STORES",
      description: "We transport your goods and relocate your store wherever you need.",
      bgColor: "bg-[#FFE67B]"
    },
    {
      id: 3,
      title: "CONTAINER",
      description: "Need to move some items — or everything? No problem, we've got you covered.",
      bgColor: "bg-[#FFE67B]"
    }
  ];

  return (
    <div className="relative w-full h-full min-h-[600px] md:min-h-[700px] overflow-hidden rounded-t-3xl">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={bagroundImg}
          alt="Equipo de mudanzas trabajando"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overlay para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>
      
      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24 py-12">
        <div className="space-y-6 md:space-y-8 lg:space-y-10 max-w-4xl">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-6 transform transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Etiqueta del servicio */}
              <div className={`${service.bgColor} rounded-full px-6 md:px-8 py-3 md:py-4 min-w-[140px] md:min-w-[160px] text-center shadow-xl flex-shrink-0`}>
                <span className="text-black font-bold text-sm md:text-base uppercase tracking-wide">
                  {service.title}
                </span>
              </div>
              
              {/* Descripción */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 md:px-8 py-4 md:py-5 w-full md:max-w-lg shadow-xl">
                <p className="text-gray-800 font-medium text-base md:text-lg lg:text-xl leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Elementos decorativos sutiles */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-[#0E6F7E]/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-[#FFE67B]/20 rounded-full blur-xl pointer-events-none"></div>
    </div>
  );
};

export default CardCom;