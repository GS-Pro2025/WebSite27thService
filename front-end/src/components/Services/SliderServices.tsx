import React, { useState } from 'react';
import CardTS from '../Services/CardTS';
import CardComponent from '../Services/CardCom';

import icon from "/assets/27_logo_white.svg"
import icon1 from "/assets/RecursoSlider1.svg"
import icon2 from "/assets/RecursoSlider2.svg"
import icon3 from "/assets/RecursoSlider3.svg"
import icon4 from "/assets/RecursoSlider4.svg"
import icon5 from "/assets/RecursoSlider5.svg"
import icon6 from "/assets/RecursoSlider6.svg"

const TabsCarousel: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      icon: icon,
      title: "TWENTY SEVENT"
    },
    {
      id: 1,
      icon: icon1,
      title: "COMERCIAL"
    },
    {
      id: 2,
      icon: icon2,
      title: "HOGAR"
    },
    {
      id: 3,
      icon: icon3,
      title: "EMBALAJE"
    },
    {
      id: 4,
      icon: icon4,
      title: "ORGANIZACIÓN"
    },
    {
      id: 5,
      icon: icon5,
      title: "OFICINAS"
    },
    {
      id: 6,
      icon: icon6,
      title: "SERVICIOS"
    }
  ];

  return (
    <div className="w-full max-w-9/12 mx-auto overflow-hidden rounded-lg">
      {/* Tabs Container */}
      <div className="flex justify-center items-center py-2">
        {/* Desktop Version - Overlapping tabs */}
        <div className="hidden md:flex relative items-center justify-center">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`min-w-24 px-10 relative transition-all duration-500 transform bg-white rounded-full border-2 border-black
                ${activeTab === index
                  ? ' z-20 scale-110 rounded-full'
                  : 'z-10 hover:scale-105'
                }`}
              style={{
                marginLeft: index === 0 ? '0' : '-70px',
                marginBottom: '-40px',
                zIndex: activeTab === index ? 20 : 10 - Math.abs(activeTab - index)
              }}
              title={tab.title}
            >
              <div className={`h-20 flex items-center font-semibold transition-all duration-500
                ${activeTab === index
                  ? ' text-black min-w-[150px] justify-center'
                  : ' hover:bg-opacity-80 text-gray-600 w-35 justify-end pr-9'
                }`}>
                <img 
                  src={tab.icon} 
                  alt={tab.title}
                  className="w-10 h-auto object-contain"
                />
                <span className={`ml-2 overflow-hidden transition-all duration-500
                  ${activeTab === index 
                    ? 'max-w-[100px] opacity-100' 
                    : 'max-w-0 opacity-0'
                  }`}>
                  {tab.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Mobile Version - Horizontal scroll */}
        <div className="md:hidden w-full">
          <div className="flex overflow-x-auto scrollbar-hide px-4 space-x-3 pb-2">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`flex-shrink-0 px-4 py-3 rounded-2xl border-2 transition-all duration-300 min-w-[120px]
                  ${activeTab === index
                    ? 'bg-[#FFE67B] border-black scale-105 shadow-lg'
                    : 'bg-white border-gray-300 hover:border-gray-400'
                  }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <img 
                    src={tab.icon} 
                    alt={tab.title}
                    className="w-6 h-6 object-contain"
                  />
                  <span className={`text-xs font-semibold text-center transition-colors duration-300
                    ${activeTab === index ? 'text-black' : 'text-gray-600'}
                  `}>
                    {tab.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative min-h-[400px] md:min-h-[600px]">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`absolute inset-0 transition-all duration-500 transform ${
              activeTab === index
                ? 'opacity-100 translate-x-0'
                : index < activeTab
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Renderizar componente específico para cada tab */}
            {index === 0 ? (
              <CardTS />
            ) : index === 1 ? (
              <CardComponent /> 
            ) : (
              <div className="flex items-center justify-center h-full px-4">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    {tab.title}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Componente específico para {tab.title} próximamente
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center py-4 space-x-2 bg-[#0E6F7E]/60 mb-6 rounded-b-4xl">
        {tabs.map((_, index) => ( 
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeTab === index ? 'w-8 bg-[#FFE67B]' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TabsCarousel;