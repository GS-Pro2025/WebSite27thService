import React, { useState } from "react";
import {
  Zap,
  Globe,
  ShieldCheck,
  
  Home,
  Search,Truck,
} from "lucide-react";
import banner from "../../../public/assets/bannerCamion.png";
import hotel from "../../../public/assets/hotel.svg";

interface QuoteFormData {
  from: string;
  to: string;
  date: string;
  services: string;
}

const HeroSection: React.FC = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    from: "",
    to: "",
    date: "",
    services: "Full",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote form submitted:", formData);
    // Handle form submission
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short', 
      weekday: 'short' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <section className="relative min-h-[120vh] flex items-start justify-center overflow-y-auto">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 h-9/10">
        <img
          src={banner}
          alt="Twenty Seventh Moving Team"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col min-h-[150vh]">
        {/* Hero Text */}
        <div className="text-center mb-auto pt-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Your new beginning starts
            <br />
            with a move
          </h1>
          <p className="text-lg sm:text-xl text-white/95 max-w-2xl mx-auto drop-shadow-md">
            Find the security of a reliable service and expert quality
            <br />
            to take care of your valuable belongings.
          </p>
        </div>

        {/* Spacer to push content down */}
        <div className="flex-grow"></div>

        {/* Feature Badges - Outside the main card */}
        <div className="flex justify-center gap-2 mb-6 max-w-5xl mx-auto px-4 pb-24">
          <div className="bg-[#FFE67B] rounded-lg px-4 py-2.5 flex flex-col items-center min-w-[100px] shadow-md">
            <Zap className="w-10 h-10 mb-1" />
            <span className="text-[10px] font-semibold leading-tight text-center">
              Fast
              <br />
              moves
            </span>
          </div>

          <div className="bg-[#FFE67B]  rounded-lg px-4 py-2.5 flex flex-col items-center min-w-[100px] shadow-md">
            <Globe className="w-10 h-10 mb-1" />
            <span className="text-[10px] font-semibold leading-tight text-center">
              International
              <br />
              coverage
            </span>
          </div>

          <div className="bg-[#FFE67B]  rounded-lg px-4 py-2.5 flex flex-col items-center min-w-[100px] shadow-md">
            <ShieldCheck className="w-10 h-10 mb-1" />
            <span className="text-[10px] font-semibold leading-tight text-center">
              Trusted
              <br />
              choice
            </span>
          </div>
        </div>

        {/* Quote Form Container */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          {/* Folder Tab - Quote Here */}
          <div className="inline-flex items-center gap-2 bg-white rounded-t-2xl px-5 py-3 shadow-sm border-b-0">
            <div className="inline-flex items-center gap-2 bg-[#C9E1EC] px-5 py-3 shadow-sm rounded-full">
              <img src={hotel} alt="Quote" className="w-5 h-5" />
              <span className="text-sm font-semibold text-blue-700">
                Quote here
              </span>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-3xl rounded-tl-none shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8">
              <div className="flex gap-6 items-center">
                {/* Card 1: From/To with Truck Icon */}
                <div className="flex-1 bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                  <div className="flex items-center gap-4">
                    {/* From */}
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-2">
                        From
                      </label>
                      <input
                        type="text"
                        name="from"
                        value={formData.from}
                        onChange={handleInputChange}
                        className="text-xl font-bold text-gray-900 outline-none w-full bg-transparent placeholder:text-gray-400 placeholder:font-normal"
                        placeholder="Origin city"
                      />
                    </div>

                    {/* Truck/Swap Icon */}
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all border border-gray-200"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            from: prev.to,
                            to: prev.from,
                          }));
                        }}
                      >
                        <Truck className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    {/* To */}
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-2">
                        Going to
                      </label>
                      <input
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleInputChange}
                        className="text-xl font-bold text-gray-900 outline-none w-full bg-transparent placeholder:text-gray-400 placeholder:font-normal"
                        placeholder="Destination city"
                      />
                    </div>
                  </div>
                </div>

                {/* Card 2: Date and Services with House Icon */}
                <div className="flex-1 bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                  <div className="flex items-center gap-4">
                    {/* Date */}
                    <div className="flex-1 relative">
                      <label className="text-xs text-gray-500 block mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="text-xl font-bold text-gray-900 outline-none w-full bg-transparent cursor-pointer [color-scheme:light]"
                        style={{
                          colorScheme: 'light'
                        }}
                      />
                    </div>

                    {/* House Icon */}
                    <div className="flex items-center justify-center">
                      <div className="p-3 bg-white rounded-full shadow-md border border-gray-200">
                        <Home className="w-5 h-5 text-gray-600" />
                      </div>
                    </div>

                    {/* Services */}
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-2">
                        Services
                      </label>
                      <select
                        name="services"
                        value={formData.services}
                        onChange={handleInputChange}
                        className="text-xl font-bold text-gray-900 outline-none w-full bg-transparent cursor-pointer"
                      >
                        <option value="Full">Full</option>
                        <option value="Partial">Partial</option>
                        <option value="Packing">Packing Only</option>
                        <option value="Loading">Loading Only</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white rounded-full p-6 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex-shrink-0"
                  aria-label="Search quotes"
                >
                  <Search className="w-7 h-7" strokeWidth={2.5} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;