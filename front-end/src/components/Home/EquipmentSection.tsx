import React, { useState } from "react";
import { Plus } from "lucide-react";
import movingBoxImage from "../../../public/assets/cajaFamilia.png";

interface PackageInfo {
  id: string;
  name: string;
  description: string;
  features: string[];
  price?: string;
}

const MovingPackages: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("basic");

  const packages: Record<string, PackageInfo> = {
    basic: {
      id: "basic",
      name: "Basic",
      description: "Essential moving services for a simple relocation",
      features: [
        "Professional moving team",
        "Basic packing materials",
        "Loading and unloading",
        "Local transportation",
      ],
      price: "$299",
    },
    medium: {
      id: "medium",
      name: "Medium",
      description: "Comprehensive moving solution with additional services",
      features: [
        "Everything in Basic",
        "Full packing service",
        "Furniture disassembly/assembly",
        "Protection for delicate items",
        "Storage options available",
      ],
      price: "$599",
    },
    premium: {
      id: "premium",
      name: "Premium",
      description: "Complete white-glove moving experience",
      features: [
        "Everything in Medium",
        "Premium packing materials",
        "Custom crating for valuables",
        "Post-move cleaning",
        "Unpacking service",
        "Priority scheduling",
      ],
      price: "$999",
    },
  };

  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-[#D9F3FF] to-[#E8F8FC] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Package Selection */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-[Poppins]">
                Moving packages
              </h2>
              <p className="text-gray-700 text-sm md:text-base font-[Manrope]">
                Introduction text here with a maximum of two lines
              </p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 inline-flex gap-2">
              <button
                onClick={() => setActiveTab("basic")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "basic"
                    ? "bg-[#FFE67B] text-gray-900"
                    : "bg-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                Basic
              </button>
              <button
                onClick={() => setActiveTab("medium")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "medium"
                    ? "bg-[#FFE67B] text-gray-900"
                    : "bg-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setActiveTab("premium")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "premium"
                    ? "bg-[#FFE67B] text-gray-900"
                    : "bg-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                Premium
              </button>
            </div>

            {/* Package Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 min-h-[300px]">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-[Poppins]">
                    {packages[activeTab].name} Package
                  </h3>
                  <p className="text-gray-600 font-[Manrope]">
                    {packages[activeTab].description}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 font-[Poppins]">
                    What's included:
                  </h4>
                  <ul className="space-y-2 font-[Manrope]">
                    {packages[activeTab].features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-teal-600 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {packages[activeTab].price && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 font-[Manrope]">Starting from</p>
                    <p className="text-3xl font-bold text-teal-600 font-[Poppins]">
                      {packages[activeTab].price}
                    </p>
                  </div>
                )}
              </div>

              {/* Learn More Button */}
              <button className="flex items-center gap-2 text-gray-800 font-medium mt-6 hover:text-gray-900 transition-colors font-[Manrope]">
                Learn more
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={movingBoxImage}
                alt="Moving packages"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovingPackages;