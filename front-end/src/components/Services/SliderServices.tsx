import React, { useState } from 'react';
import CardTS from '../Services/CardTS';
import CardComponent from '../Services/CardCom';
import CardHome from '../Services/CardHg';
import CardPackaging from '../Services/CardEmb';
import CardOrganization from '../Services/CardOrg';
import CardOffices from '../Services/CardOf';
import CardServices from '../Services/CardSer';
import icon from "/assets/LogoAzul.svg"
import icon1 from "/assets/RecursoSlider1.svg"
import icon2 from "/assets/RecursoSlider2.svg"
import icon3 from "/assets/RecursoSlider3.svg"
import icon4 from "/assets/RecursoSlider4.svg"
import icon5 from "/assets/RecursoSlider5.svg"
import icon6 from "/assets/RecursoSlider6.svg"

const TabsCarousel: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, icon: icon, title: "TWENTY SEVEN" },
    { id: 1, icon: icon1, title: "COMMERCIAL" },
    { id: 2, icon: icon2, title: "HOME" },
    { id: 3, icon: icon3, title: "PACKING AND UNPACKING" },
    { id: 4, icon: icon4, title: "REMOVAL OF OBJECTS" },
    { id: 5, icon: icon5, title: "HOME ORGANIZATION" },
    { id: 6, icon: icon6, title: "CARGO TRANSPORT" }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b py-10 from-gray-50 to-white relative">
      {/* Tabs Container overflow not hidden*/}
      <div className="absolute top-0 left-0 w-full flex justify-center items-center pt-4 px-0 z-40 pointer-events-auto">
        {/* Desktop Version - Overlapping tabs */}
        <div className="md:flex relative items-center justify-center w-full px-8 lg:px-12 xl:px-16">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`relative z-50 px-23 transition-all duration-500 transform rounded-full border-2 border-[#0F6F7C]/80 flex-shrink-0
                ${activeTab === index
                  ? 'scale-110 bg-[#FFE67B] shadow-xl px-8'
                  : 'hover:scale-105 bg-white hover:shadow-md px-5'
                }`}
              style={{
                marginLeft: index === 0 ? '0' : '-20px',
                zIndex: activeTab === index ? 50 : 40 - Math.abs(activeTab - index)
              }}
              title={tab.title}
            >
              <div className={`h-24 flex items-center font-semibold transition-all duration-500
                ${activeTab === index
                  ? 'text-black justify-center gap-3'
                  : 'text-gray-600 justify-center w-20'
                }`}>
                <img 
                  src={tab.icon} 
                  alt={tab.title}
                  className={`object-contain flex-shrink-0 transition-all duration-500
                    ${activeTab === index ? 'w-12 h-12' : 'w-10 h-10'}
                  `}
                />
                <span className={`transition-all duration-500 text-[11px] leading-tight text-center
                  ${activeTab === index 
                    ? 'max-w-[200px] opacity-100' 
                    : 'max-w-0 opacity-0 overflow-hidden'
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
                className={`flex-shrink-0 px-4 py-3 rounded-2xl border-2 transition-all duration-300 min-w-[110px]
                  ${activeTab === index
                    ? 'bg-[#FFE67B] border-[#0F6F7C] scale-105 shadow-lg'
                    : 'bg-white border-gray-300 hover:border-gray-400'
                  }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <img 
                    src={tab.icon} 
                    alt={tab.title}
                    className="w-7 h-7 object-contain"
                  />
                  <span className={`text-[10px] font-semibold text-center leading-tight transition-colors duration-300
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

      {/* Content Container - MEJORADO */}
      <div className="relative w-full px-2 md:px-4 lg:px-6">
        <div className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                activeTab === index
                  ? 'opacity-100 translate-x-0 z-10'
                  : index < activeTab
                  ? 'opacity-0 -translate-x-full z-0 pointer-events-none'
                  : 'opacity-0 translate-x-full z-0 pointer-events-none'
              }`}
            >
              {index === 0 ? (
                <CardTS />
              ) : index === 1 ? (
                <CardComponent /> 
              ) : index === 2 ? (
                <CardHome />
              ) : index === 3 ? (
                <CardPackaging />
              ) : index === 4 ? (
                <CardOrganization />
              ) : index === 5 ? (
                <CardOffices />
              ) : index === 6 ? (
                <CardServices />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center py-6 space-x-2 bg-[#0E6F7E] rounded-b-3xl mx-2 md:mx-4 mt-2">
        {tabs.map((_, index) => ( 
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeTab === index ? 'w-8 bg-[#FFE67B]' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TabsCarousel;