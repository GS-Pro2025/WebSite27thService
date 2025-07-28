import React, { useState, useEffect } from 'react';

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
  const [animationDuration, setAnimationDuration] = useState(20);

  const services: ServiceItem[] = [
    { id: 1, imageSrc: Recurso2, altText: 'Servicio 1', fallbackIcon: '🚛' },
    { id: 2, imageSrc: Recurso3, altText: 'Servicio 2', fallbackIcon: '🏠' },
    { id: 3, imageSrc: Recurso4, altText: 'Servicio 3', fallbackIcon: '📦' },
    { id: 4, imageSrc: Recurso5, altText: 'Servicio 4', fallbackIcon: '♻️' },
    { id: 5, imageSrc: Recurso6, altText: 'Servicio 5', fallbackIcon: '📋' },
    { id: 6, imageSrc: Recurso7, altText: 'Servicio 6', fallbackIcon: '📥' },
  ];

  const handleClick = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setAnimationDuration(10); // Más rápido
          break;
        case 'ArrowDown':
          setAnimationDuration(30); // Más lento
          break;
        case ' ':
          event.preventDefault();
          setAnimationDuration(20); // Velocidad normal
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>, fallbackIcon: string) => {
    const target = event.target as HTMLImageElement;
    const parent = target.parentElement;
    if (parent) {
      parent.innerHTML = `<div class="text-3xl">${fallbackIcon}</div>`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div 
        className="relative w-[500px] h-[500px] cursor-pointer"
        onClick={handleClick}
      >

        {/* Anillo exterior */}
        <div className="absolute inset-0 border-[5px] border-slate-300 rounded-full z-10"></div>

        {/* Anillo medio */}
        <div className="absolute top-[50px] left-[50px] w-[400px] h-[400px] border-[5px] border-slate-300 rounded-full shadow-inner z-20"></div>

        {/* Anillo de servicios rotativo */}
        <div 
          className="absolute inset-0 z-30"
          style={{
            animation: `spin ${animationDuration}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {services.map((service, index) => {
            const angle = (index * 60) - 90; // Distribución en 360°/6 = 60°, comenzando desde arriba
            const radius = 220; // Radio aumentado para estar más cerca del anillo exterior
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <div
                key={service.id}
                className="absolute w-25 h-25 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200"
                style={{
                  left: `calc(50% + ${x}px - 40px)`, // Corregido el espacio
                  top: `calc(50% + ${y}px - 40px)`,
                  animation: `counter-spin ${animationDuration}s linear infinite`,
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
              >
                <img
                  src={service.imageSrc}
                  alt={service.altText}
                  className="w-14 h-14 object-contain max-w-[90%] max-h-[90%]"
                  onError={(e) => handleImageError(e, service.fallbackIcon)}
                />
              </div>
            );
          })}
        </div>

        {/* Círculo central */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-blue-300 rounded-full z-40 flex items-center justify-center text-white font-bold text-2xl text-center shadow-2xl border-4 border-white">
          SERVICIOS
        </div>

        {/* Instrucciones */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center text-sm text-gray-600">
          <p>Clic: Pausar/Reanudar</p>
          <p>↑ Rápido | ↓ Lento | Espacio: Normal</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes counter-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesWheel;