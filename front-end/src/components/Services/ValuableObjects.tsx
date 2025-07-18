import React, { useState } from "react";

const ValuableObjects = () => {
  const [formData, setFormData] = useState({
    objeto: "",
    value: "",
    tipoValor: "",
    label: false,
    description: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#68A2A6] to-[#68A2A6] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Left side - Text content */}
          <div className="space-y-6">
            {/* Title with yellow background */}
            <div className="inline-block">
              <div className="bg-[#FFE67B] rounded-full px-8 py-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                  objetos importantes?
                </h2>
              </div>
            </div>

            {/* Description box */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-white">
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-6">
                Esta categoría abarca todo aquello que tiene un valor importante para ti, son 
                más que piezas frágiles son recuerdos, sueños y memorias que preservar
              </p>
              
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-6">
                Tienes objeto/s que requieren un{" "}
                <span className="text-[#FFE67B] font-semibold">cuidado especial</span>, te mostramos como{" "}
                <span className="text-[#FFE67B] font-semibold">cuidamos de ellos por ti</span>.
              </p>

              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-300">
                ¿cuentanos que objeto vas a mover hoy?
              </p>
            </div>
          </div>

          {/* Right side - Heart icon, message and Form */}
          <div className="flex flex-col items-center space-y-6">
            {/* Heart and hands icon with text below - Centered in right column */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/assets/recurso_hands_heart.svg"
                alt="Hands with heart"
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-4"
              />
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                <span className="text-[#FFE67B]">Cuidamos</span> de ellos,{" "}
                <span className="text-[#FFE67B]">como si fueran nuestros</span>
              </h1>
            </div>

            {/* Compact Form */}
            <div className="bg-white rounded-2xl p-4 w-full max-w-xs shadow-2xl">
              <div className="space-y-3">
                
                {/* Objeto field */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Objeto
                  </label>
                  <input
                    type="text"
                    name="objeto"
                    value={formData.objeto}
                    onChange={handleInputChange}
                    placeholder="Value"
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Value field */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    placeholder="Value"
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Tipo de valor dropdown */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    tipo de valor
                  </label>
                  <select
                    name="tipoValor"
                    value={formData.tipoValor}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Value</option>
                    <option value="economico">Económico</option>
                    <option value="sentimental">Sentimental</option>
                    <option value="artistico">Artístico</option>
                    <option value="historico">Histórico</option>
                  </select>
                </div>

                {/* Checkbox */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    name="label"
                    checked={formData.label}
                    onChange={handleInputChange}
                    className="mt-0.5 w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Label
                    </label>
                    <p className="text-xs text-gray-500">Description</p>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#FFE67B] hover:bg-[#FFD93D] text-gray-800 font-semibold py-2 px-3 text-sm rounded-md transition-colors duration-200"
                >
                  Quiero mas información
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuableObjects;