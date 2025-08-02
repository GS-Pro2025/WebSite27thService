import React, { useState } from "react";
import logoFlecha from "/assets/FlechaLogo.svg";
import Family from "/assets/Family.png";
import onda from "/assets/Vector.svg";
import Linea from "/assets/Linea.svg";
const Presentation: React.FC = () => {
  const [formData, setFormData] = useState({
    tipoMovimiento: "",
    fecha: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Details:", formData);
    // Aquí puedes manejar el envío del formulario
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Right Section - Family Image (Fondo) */}
      <div className="absolute right-0 w-full md:w-2/3 lg:w-5/10 h-full">
        <img
          src={Family}
          alt="Familia feliz"
          className="w-full h-auto object-cover object-center"
        />

        {/* Overlay con texto */}
        <div className="absolute bottom-60 right-20 text-right">
          <h2 className="text-white text-lg md:text-xl lg:text-2xl xl:text-4xl font-medium leading-tight">
            We turn every <span className="text-[#FFE67B] font-bold">move</span>
            <br />
            into a <span className="text-[#FFE67B] font-bold">
              MEMORABLE
            </span>{" "}
            experience
          </h2>
        </div>
      </div>

      {/* Logo Grande - Superpuesto */}
      <div className="absolute z-20">
        <img
          src={logoFlecha}
          alt="Twenty Seventh Logo"
          className="w-80 md:w-96 lg:w-5/7 xl:w-270 h-auto"
        />
      </div>

      {/* Vector decorativo - Debajo del contenido pero encima de la familia */}
      <div className="absolute top-80 left-0 w-full z-5">
        <img
          src={onda}
          alt="Vector decorativo"
          className="w-full h-150 object-cover"
        />
      </div>

      {/* Left Section - Contenido principal */}
      <div className="relative top-50 mb-10  z-10 flex flex-col justify-center min-h-screen px-4 md:px-8 lg:px-16 pt-32 md:pt-40">
        <div className="max-w-md lg:max-w-lg">
          {/* Título */}
          <div className="mb-8">
            <h1 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light mb-2">
              <span className="text-[#FFE67B] font-bold">Unique</span> and{" "}
              <span className="text-[#FFE67B] font-bold">personalized</span>{" "}
              moves
            </h1>
          </div>

          {/* Formulario */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selector de Movimiento */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Select your move
                </label>
                <select
                  name="tipoMovimiento"
                  value={formData.tipoMovimiento}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68A2A6] focus:border-transparent bg-white text-gray-700"
                  required
                >
                  <option value="">Select move type</option>
                  <option value="comercial">Commercial</option>
                  <option value="hogar">Home</option>
                  <option value="oficinas">Offices</option>
                  <option value="embalaje">Packing</option>
                  <option value="organizacion">Organization</option>
                </select>
              </div>

              {/* Selector de Fecha */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Date:
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68A2A6] focus:border-transparent bg-white text-gray-700"
                  required
                />
              </div>

              {/* Botón Submit */}
              <button
                type="submit"
                className="w-full bg-[#FFE67B] text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors shadow-lg"
              >
                Your move here
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="relative w-full h-30 md:h-42 lg:h-60 ">
        <img
          src={Linea}
          alt="Linea Punteada"
          className="w-full h-full object-contain opacity-60"
        />
      </div>
    </div>
  );
};

export default Presentation;
