import React from "react";

const FormCobertura = () => (
  <form className="space-y-1.5 md:space-y-4">
    {/* Campo Origen */}
    <div>
      <label className="block text-[#606060] text-sm font-medium mb-0.5 md:mb-1">
        Origin
      </label>
      <input
        type="text"
        placeholder="Value"
        className="bg-[#FFFF] w-full border border-gray-300 rounded px-3 md:px-4 py-1.5 md:py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
      />
    </div>
    {/* Campo Destino */}
    <div>
      <label className="block text-[#606060] text-sm font-medium mb-0.5 md:mb-1">
        Destination 
      </label>
      <input
        type="text"
        placeholder="Value"
        className="bg-[#FFFF] w-full border border-gray-300 rounded px-3 md:px-4 py-1.5 md:py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
      />
    </div>
    {/* Checkbox */}
    <div className="flex items-start space-x-2">
      <input type="checkbox" id="checkbox" className="mt-1" />
      <label htmlFor="checkbox" className="text-[#606060] text-sm">
        <span className="font-medium">Label</span>
        <br />
        <span className="text-xs text-gray-500">Description</span>
      </label>
    </div>
    {/* Botón */}
    <div className="pt-0.5 md:pt-2">
      <button
        type="submit"
        className="w-full bg-[#FFE67B] text-[#606060] font-semibold py-1.5 md:py-2 rounded-md shadow hover:brightness-110 transition-all"
      >
        verify coverage
      </button>
    </div>
  </form>
);

export default FormCobertura;