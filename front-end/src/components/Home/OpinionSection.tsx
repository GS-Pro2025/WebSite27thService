import React from "react";
import {MapPin } from "lucide-react";
// Imports de las imágenes
import QualityIcon from "/assets/quality-icon.png";
import PremiumIcon from "/assets/premium-icon.png";
import PackingIcon from "/assets/packing-icon.png";
import GuaranteeIcon from "/assets/guarantee-icon.png";

interface FeatureCard {
  id: number;
  iconSrc: string;
  title: string;
  subtitle: string;
  rating: number;
}

const WhyChooseUs: React.FC = () => {
  const features: FeatureCard[] = [
    {
      id: 1,
      iconSrc: QualityIcon,
      title: "Quality and excellence",
      subtitle: "Twenty seven",
      rating: 5.0,
    },
    {
      id: 2,
      iconSrc: PremiumIcon,
      title: "Premium service",
      subtitle: "Twenty seven",
      rating: 5.0,
    },
    {
      id: 3,
      iconSrc: PackingIcon,
      title: "Reliable packing",
      subtitle: "Twenty seven",
      rating: 5.0,
    },
    {
      id: 4,
      iconSrc: GuaranteeIcon,
      title: "Service guarantee",
      subtitle: "Twenty seven",
      rating: 5.0,
    },
  ];

  return (
    <section className="relative w-full py-16 bg-gradient-to-b from-[#D9F3FF] to-[#0E6F7E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why choose us?
          </h2>
          
          {/* Stats Badge */}
          <div className="inline-block bg-[#FFE67B] px-8 py-4 rounded-2xl shadow-lg">
            <p className="text-3xl font-bold text-gray-900">5000+</p>
            <p className="text-sm font-semibold text-gray-700">Successful moves</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative bg-white rounded-3xl p-6 shadow-lg transition-all duration-300 hover:bg-[#FFE67B] hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
            >
              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <span className="text-[#FFE67B]">⭐</span>
                <span className="text-sm font-bold text-gray-900">
                  {feature.rating}
                </span>
              </div>

              {/* Icon Container */}
              <div className="bg-[#0E6F7E] rounded-2xl flex items-center justify-center aspect-square transition-all duration-300 group-hover:bg-[#0E6F7E]">
                <img
                  src={feature.iconSrc}
                  alt={feature.title}
                  className="w-auto h-full object-contain"
                />
              </div>

              {/* Text Content */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <div className="flex items-center justify-center gap-1 text-gray-300">
                  <MapPin className="text-sm"/>
                  <p className="text-sm font-medium">{feature.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;