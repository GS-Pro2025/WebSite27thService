import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// Import de las imágenes
import valuableItemsImage from "../../../public/assets/valueItem.png";
import valuableItemsImage1 from "../../../public/assets/violin.png";
import valuableItemsImage2 from "../../../public/assets/reloj2.png";
import valuableItemsImage3 from "../../../public/assets/cuadro.png";

interface ValuableItem {
  name: string;
  description: string;
}

interface FormData {
  // Step 1: Valuable Items
  valuableItems: ValuableItem[];
  currentItem: ValuableItem;
  // Step 2: Location & Contact
  pickupLocation: string;
  destination: string;
  moveDate: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  agreeToTerms: boolean;
}

const ValuableItemsSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    valuableItems: [],
    currentItem: {
      name: "",
      description: "",
    },
    pickupLocation: "",
    destination: "",
    moveDate: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const images = [
    valuableItemsImage,
    valuableItemsImage1,
    valuableItemsImage2,
    valuableItemsImage3,
  ];

  // Referencias para Google Places Autocomplete
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    if (currentStep === 2) {
      const loadGoogleMapsScript = () => {
        if (window.google?.maps?.places) {
          initAutocomplete();
          return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => initAutocomplete();
        document.head.appendChild(script);
      };

      const initAutocomplete = () => {
        if (!pickupInputRef.current || !destinationInputRef.current) return;

        const pickupAutocomplete = new google.maps.places.Autocomplete(
          pickupInputRef.current,
          {
            types: ["address"],
            fields: ["formatted_address", "name"],
          }
        );

        const destinationAutocomplete = new google.maps.places.Autocomplete(
          destinationInputRef.current,
          {
            types: ["address"],
            fields: ["formatted_address", "name"],
          }
        );

        pickupAutocomplete.addListener("place_changed", () => {
          const place = pickupAutocomplete.getPlace();
          if (place?.formatted_address) {
            setFormData((prev) => ({
              ...prev,
              pickupLocation: place.formatted_address || place.name || "",
            }));
            setErrors((prev) => ({ ...prev, pickupLocation: "" }));
          }
        });

        destinationAutocomplete.addListener("place_changed", () => {
          const place = destinationAutocomplete.getPlace();
          if (place?.formatted_address) {
            setFormData((prev) => ({
              ...prev,
              destination: place.formatted_address || place.name || "",
            }));
            setErrors((prev) => ({ ...prev, destination: "" }));
          }
        });
      };

      loadGoogleMapsScript();
    }
  }, [currentStep]);

  const handleCurrentItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      currentItem: {
        ...prev.currentItem,
        [name]: value,
      },
    }));
    setErrors((prev) => ({ ...prev, currentItem: "" }));
  };

  const handleAddItem = () => {
    if (!formData.currentItem.name.trim()) {
      setErrors({ currentItem: "Please fill in item name" });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      valuableItems: [...prev.valuableItems, prev.currentItem],
      currentItem: {
        name: "",
        description: "",
      },
    }));

    setErrors({});
  };

  const handleRemoveItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      valuableItems: prev.valuableItems.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep1 = (): boolean => {
    if (formData.valuableItems.length === 0) {
      setErrors({ valuableItems: "Please add at least one valuable item" });
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = "Pickup location is required";
    }
    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required";
    }
    if (!formData.moveDate) {
      newErrors.moveDate = "Move date is required";
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number is invalid";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateQuoteId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `SM-VI-${timestamp}-${random}`;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_SENDQUOTE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const quoteId = generateQuoteId();

      const itemsList = formData.valuableItems
        .map(
          (item) =>
            `${item.name}${
              item.description ? `\n  Description: ${item.description}` : ""
            }`
        )
        .join("\n\n");

      const packageInfo = `Valuable Items Moving Service\n\nItems to move:\n${itemsList}`;

      const templateParams = {
        quote_id: quoteId,
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phoneNumber,
        move_type: "Valuable Items",
        move_date: formData.moveDate,
        from_location: formData.pickupLocation,
        to_location: formData.destination,
        move_size: `${formData.valuableItems.length} valuable item(s)`,
        package_info: packageInfo,
        additional_notes: `Special handling required for ${formData.valuableItems.length} valuable items`,
        submission_date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      alert(
        `✅ Quote request submitted successfully!\n\nYour Quote ID: ${quoteId}\n\nWe'll get back to you within 24 hours with special handling instructions.`
      );

      // Reset form
      setFormData({
        valuableItems: [],
        currentItem: { name: "", description: "" },
        pickupLocation: "",
        destination: "",
        moveDate: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        agreeToTerms: false,
      });
      setCurrentStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen py-8 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#0E6F7E]">
      <div className="max-w-8xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background Images Carousel */}
          <div className="hidden md:block absolute inset-0 w-full h-full">
            {images.map((image, index) => (
              <img
                key={index}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                  index === currentImageIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
                src={image}
                alt={`Valuable items ${index + 1}`}
              />
            ))}
          </div>

          {/* Content Container */}
          <div className="relative z-10 px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Side - Form */}
              <div className="order-2 lg:order-1">
                {/* Badge */}
                <div className="flex justify-center lg:justify-start mb-6 md:mb-8">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-[#0E6F7E] px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                    Special moving - Step {currentStep} of 2
                  </span>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-8 w-full max-w-md mx-auto lg:mx-0">
                  <form
                    onSubmit={currentStep === 1 ? handleNextStep : handleSubmit}
                    className="space-y-4 md:space-y-5"
                  >
                    {currentStep === 1 ? (
                      // STEP 1: Valuable Items
                      <>
                        {/* Item Name */}
                        <div>
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2 font-[Manrope]">
                            Item <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.currentItem.name}
                            onChange={handleCurrentItemChange}
                            placeholder="e.g., Antique Piano, Violin, Art Piece"
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E6F7E] focus:border-transparent outline-none transition-all font-[Manrope]"
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2 font-[Manrope]">
                            Description (Optional)
                          </label>
                          <textarea
                            name="description"
                            value={formData.currentItem.description}
                            onChange={handleCurrentItemChange}
                            placeholder="Special handling instructions, dimensions, fragility details..."
                            rows={3}
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E6F7E] focus:border-transparent outline-none transition-all font-[Manrope] resize-none"
                          />
                        </div>

                        {/* Add Item Button */}
                        <button
                          type="button"
                          onClick={handleAddItem}
                          className="w-full bg-[#0E6F7E] hover:bg-[#0C5F6C] text-white font-semibold py-2.5 md:py-3 text-sm md:text-base rounded-lg transition-all duration-300 font-[Manrope]"
                        >
                          + Add Item to List
                        </button>

                        {errors.currentItem && (
                          <p className="text-xs text-red-500">
                            {errors.currentItem}
                          </p>
                        )}

                        {/* Items List */}
                        {formData.valuableItems.length > 0 && (
                          <div className="bg-[#FFE67B]/20 rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
                            <p className="text-xs font-semibold text-gray-700">
                              Items Added ({formData.valuableItems.length})
                            </p>
                            {formData.valuableItems.map((item, index) => (
                              <div
                                key={index}
                                className="bg-white rounded-lg p-2 flex items-start justify-between text-xs"
                              >
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-900">
                                    {item.name}
                                  </p>
                                  {item.description && (
                                    <p className="text-gray-600 text-xs mt-1">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem(index)}
                                  className="ml-2 text-red-500 hover:text-red-700"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {errors.valuableItems && (
                          <p className="text-xs text-red-500 text-center">
                            {errors.valuableItems}
                          </p>
                        )}

                        {/* Next Button */}
                        <button
                          type="submit"
                          className="w-full bg-[#FFE67B] hover:bg-[#FFD700] text-gray-900 font-semibold py-2.5 md:py-3 text-sm md:text-base rounded-lg transition-all duration-300 hover:shadow-lg font-[Manrope]"
                        >
                          Continue →
                        </button>
                      </>
                    ) : (
                      // STEP 2: Contact & Location
                      <>
                        {/* Pickup Location */}
                        <div>
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2 font-[Manrope]">
                            Pickup Location <span className="text-red-500">*</span>
                          </label>
                          <input
                            ref={pickupInputRef}
                            type="text"
                            name="pickupLocation"
                            value={formData.pickupLocation}
                            onChange={handleInputChange}
                            placeholder="Enter pickup address"
                            autoComplete="off"
                            className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-[#0E6F7E] outline-none transition-all font-[Manrope] ${
                              errors.pickupLocation
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.pickupLocation && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.pickupLocation}
                            </p>
                          )}
                        </div>

                        {/* Destination */}
                        <div>
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2 font-[Manrope]">
                            Destination <span className="text-red-500">*</span>
                          </label>
                          <input
                            ref={destinationInputRef}
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleInputChange}
                            placeholder="Enter destination address"
                            autoComplete="off"
                            className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-[#0E6F7E] outline-none transition-all font-[Manrope] ${
                              errors.destination
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.destination && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.destination}
                            </p>
                          )}
                        </div>

                        {/* Move Date */}
                        <div>
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2 font-[Manrope]">
                            Move Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="moveDate"
                            value={formData.moveDate}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split("T")[0]}
                            className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-[#0E6F7E] outline-none transition-all font-[Manrope] ${
                              errors.moveDate ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.moveDate && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.moveDate}
                            </p>
                          )}
                        </div>

                        {/* Full Name */}
                        <div>
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2 font-[Manrope]">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-[#0E6F7E] outline-none transition-all font-[Manrope] ${
                              errors.fullName ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.fullName && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2 font-[Manrope]">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-[#0E6F7E] outline-none transition-all font-[Manrope] ${
                              errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2 font-[Manrope]">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="+1 (555) 123-4567"
                            className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-[#0E6F7E] outline-none transition-all font-[Manrope] ${
                              errors.phoneNumber
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.phoneNumber && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.phoneNumber}
                            </p>
                          )}
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-start gap-2 md:gap-3">
                          <input
                            type="checkbox"
                            id="agreeToTerms"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleInputChange}
                            className="mt-0.5 md:mt-1 w-4 h-4 md:w-5 md:h-5 text-[#0E6F7E] border-gray-300 rounded focus:ring-[#0E6F7E] cursor-pointer flex-shrink-0"
                          />
                          <label
                            htmlFor="agreeToTerms"
                            className="text-xs md:text-sm text-gray-700 cursor-pointer font-[Manrope]"
                          >
                            <span className="font-semibold">
                              I agree to the Terms & Conditions
                            </span>
                            <br />
                            <span className="text-gray-500">
                              We'll handle your items with special care
                            </span>
                          </label>
                        </div>
                        {errors.agreeToTerms && (
                          <p className="text-xs text-red-500">
                            {errors.agreeToTerms}
                          </p>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2.5 md:py-3 text-sm md:text-base rounded-lg transition-all duration-300 font-[Manrope]"
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-1 bg-[#FFE67B] hover:bg-[#FFD700] text-gray-900 font-semibold py-2.5 md:py-3 text-sm md:text-base rounded-lg transition-all duration-300 hover:shadow-lg font-[Manrope] ${
                              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center gap-2">
                                <svg
                                  className="animate-spin h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Sending...
                              </span>
                            ) : (
                              "Get Quote"
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                </div>
              </div>

              {/* Right Side - Text Content */}
              <div className="order-1 lg:order-2 text-center lg:text-left mb-6 lg:mb-0">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#FFe67B] lg:text-[#FFe67B] mb-3 md:mb-4 font-[Poppins] leading-tight">
                  Need to move valuable items?
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 lg:text-[#FFe67B]/90 font-[Manrope]">
                  We take care of them as if they were ours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuableItemsSection;