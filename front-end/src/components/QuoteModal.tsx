import React from "react";
import QuoteForm from "./QuoteForm"; // Asegúrate que la ruta sea correcta

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    // Fondo oscuro semi-transparente
    <div 
      className="fixed inset-0 bg-[#68A2A6]/80 bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* Contenedor del modal (evita que el clic en el contenido cierre el modal) */}
      <div 
        className="relative w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón para cerrar el modal */}
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold z-20"
        >
          &times;
        </button>

        {/* El pin amarillo del número '1' */}
        <div className="absolute -top-5 left-4 bg-[#FFE67B] w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-[#7AACAE] shadow-lg z-10">
          1
        </div>

        {/* Renderiza el formulario de cotización */}
        <QuoteForm />
      </div>
    </div>
  );
};

export default QuoteModal;