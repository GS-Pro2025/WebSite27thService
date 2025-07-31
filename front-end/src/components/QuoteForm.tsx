import React from "react";

const QuoteForm: React.FC = () => {
  return (
    <div className="bg-[#D9D9D9] rounded-2xl sm:rounded-3xl p-4 sm:p-4 lg:p-6 pt-8 sm:pt-8 lg:pt-12 font-[Montserrat] shadow-md w-full">
      <form className="space-y-2 sm:space-y-4 lg:space-y-6">
        {/* Fila 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
          <div className="flex flex-col">
            <label className="text-xs lg:text-sm text-[#333] font-semibold mb-1">Origin</label>
            <input type="text" className="p-2 rounded-xl bg-white text-[#333] text-sm" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs lg:text-sm text-[#333] font-semibold mb-1">Destination</label>
            <input type="text" className="p-2 rounded-xl bg-white text-[#333] text-sm" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs lg:text-sm text-[#333] font-semibold mb-1">Type of move</label>
            <input type="text" className="p-2 rounded-xl bg-white text-[#333] text-sm" />
          </div>
        </div>

        {/* Fila 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
          <div className="flex flex-col">
            <label className="text-xs lg:text-sm text-[#333] font-semibold mb-1">Name</label>
            <input type="text" className="p-2 rounded-xl bg-white text-[#333] text-sm" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs lg:text-sm text-[#333] font-semibold mb-1">Phone</label>
            <input type="tel" className="p-2 rounded-xl bg-white text-[#333] text-sm" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs lg:text-sm text-[#333] font-semibold mb-1">Email</label>
            <input type="email" className="p-2 rounded-xl bg-white text-[#333] text-sm" />
          </div>
        </div>

        {/* Botón */}
        <div className="flex justify-center pt-2 sm:pt-4">
          <button className="bg-[#FFE67B] text-black text-sm lg:text-[18px] font-semibold py-2 px-6 lg:px-10 rounded-full shadow hover:scale-105 transition-transform">
            GET A QUOTE NOW
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;