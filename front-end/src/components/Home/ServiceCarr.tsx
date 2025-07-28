import React, { useState, useLayoutEffect, useRef } from 'react';

// Imports de las imágenes
import Recurso2 from "/assets/RecursoSlider1.svg";
import Recurso3 from "/assets/RecursoSlider2.svg";
import Recurso4 from "/assets/RecursoSlider3.svg";
import Recurso5 from "/assets/RecursoSlider4.svg";
import Recurso6 from "/assets/RecursoSlider5.svg";
import Recurso7 from "/assets/RecursoSlider6.svg";

interface ServiceItem {
  id: number;
  imageSrc: string;
  altText: string;
  fallbackIcon: string;
}

const ServicesWheel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const services: ServiceItem[] = [
    { id: 1, imageSrc: Recurso2, altText: 'Servicio 1', fallbackIcon: '🚛' },
    { id: 2, imageSrc: Recurso3, altText: 'Servicio 2', fallbackIcon: '🏠' },
    { id: 3, imageSrc: Recurso4, altText: 'Servicio 3', fallbackIcon: '📦' },
    { id: 4, imageSrc: Recurso5, altText: 'Servicio 4', fallbackIcon: '♻️' },
    { id: 5, imageSrc: Recurso6, altText: 'Servicio 5', fallbackIcon: '📋' },
    { id: 6, imageSrc: Recurso7, altText: 'Servicio 6', fallbackIcon: '📥' },
  ];

  const wheelRef = useRef<HTMLDivElement>(null);
  const [wheelSize, setWheelSize] = useState(500); // Tamaño inicial por defecto

  useLayoutEffect(() => {
    const updateSize = () => {
      if (wheelRef.current) {
        setWheelSize(wheelRef.current.offsetWidth);
      }
    };

    // Medir al montar el componente
    updateSize();

    // Usar ResizeObserver para detectar cambios de tamaño del contenedor
    const resizeObserver = new ResizeObserver(updateSize);
    if (wheelRef.current) {
      resizeObserver.observe(wheelRef.current);
    }

    // Limpiar el observer al desmontar
    return () => resizeObserver.disconnect();
  }, []);

  // --- CÁLCULOS DINÁMICOS BASADOS EN EL TAMAÑO DEL CONTENEDOR ---
  const middleRingSize = wheelSize * 0.8;    // 400px / 500px
  const centerCircleSize = wheelSize * 0.4;  // 200px / 500px
  const iconRingRadius = wheelSize * 0.44;   // 220px / 500px
  const iconSize = wheelSize * 0.2;        // 100px / 500px (aprox)
  const iconImageSize = iconSize * 0.6;      // 60px / 100px (aprox)

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>, fallbackIcon: string) => {
    const parent = event.currentTarget.parentElement;
    if (parent) {
      parent.innerHTML = `<div style="font-size: ${iconSize * 0.4}px">${fallbackIcon}</div>`;
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      {/* Contenedor principal ahora con clases responsivas y la ref */}
      <div 
        ref={wheelRef}
        className="relative w-full aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] cursor-pointer"
        onClick={() => setIsPaused(!isPaused)}
      >
        {/* Anillo exterior*/}
        <div className="absolute inset-0 border-[5px] border-slate-300 rounded-full z-10"></div>

        {/* Anillo medio con tamaño dinámico */}
        <div 
          className="absolute border-[5px] border-slate-300 rounded-full shadow-inner z-20"
          style={{
            width: `${middleRingSize}px`,
            height: `${middleRingSize}px`,
            top: `calc(50% - ${middleRingSize / 2}px)`,
            left: `calc(50% - ${middleRingSize / 2}px)`,
          }}
        ></div>

        {/* Anillo de servicios rotativo */}
        <div 
          className="absolute inset-0 z-30"
          style={{
            animation: `spin 20s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {services.map((service, index) => {
            const angle = (index * 60) - 90;
            const x = Math.cos((angle * Math.PI) / 180) * iconRingRadius;
            const y = Math.sin((angle * Math.PI) / 180) * iconRingRadius;

            return (
              <div
                key={service.id}
                className="absolute bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200"
                style={{
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                  left: `calc(50% + ${x}px - ${iconSize / 2}px)`,
                  top: `calc(50% + ${y}px - ${iconSize / 2}px)`,
                  animation: `counter-spin 20s linear infinite`,
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
              >
                <img
                  src={service.imageSrc}
                  alt={service.altText}
                  className="object-contain"
                  style={{ width: `${iconImageSize}px`, height: `${iconImageSize}px` }}
                  onError={(e) => handleImageError(e, service.fallbackIcon)}
                />
              </div>
            );
          })}
        </div>

        {/* Círculo central con tamaño dinámico */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-[#BAD2DD] rounded-full z-40 flex items-center justify-center text-[#848484] font-bold text-center shadow-2xl border-4 border-slate-300"
          style={{
            width: `${centerCircleSize}px`,
            height: `${centerCircleSize}px`,
            top: '50%',
            left: '50%',
            fontSize: `${centerCircleSize * 0.12}px`, // Tamaño de fuente dinámico
          }}
        >
          SERVICES
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};

export default ServicesWheel;