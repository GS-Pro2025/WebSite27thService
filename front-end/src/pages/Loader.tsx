import React from 'react';

interface LoaderProps {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  fullScreen = true, 
  size = 'large',
  message
}) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-white'
    : 'flex flex-col items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="relative">
        <div className={`relative ${sizeClasses[size]}`}>
          {/* Primer círculo - gira en sentido normal */}
          <div
            className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#0E6F7E] border-b-[#FFE67B] animate-spin"
            style={{ animationDuration: '3s' }}
          ></div>
          
          {/* Segundo círculo - gira en sentido contrario */}
          <div
            className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#0E6F7E] animate-spin-reverse"
            style={{ animationDuration: '2s' }}
          ></div>
        </div>
        
        {/* Efecto de brillo con gradiente */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-[#0E6F7E]/10 via-transparent to-[#FFE67B]/10 animate-pulse rounded-full blur-sm"
        ></div>
      </div>

      {/* Mensaje opcional */}
      {message && (
        <p className="mt-8 text-[#0E6F7E] font-semibold text-lg animate-pulse">
          {message}
        </p>
      )}

      <style>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-spin-reverse {
          animation: spin-reverse linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;