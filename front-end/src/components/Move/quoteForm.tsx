import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

interface QuoteFormProps {
  selectedItem?: {
    title: string;
    weight: string;
    image: string;
  };
  items?: Array<{ name: string; weight: string }>; // Array de items con sus pesos
  onSubmit?: (formData: QuoteFormData) => void;
  onClose?: () => void;
}

export interface QuoteFormData {
  itemName: string;
  itemWeight: string;
  pickupLocation: string;
  destination: string;
  fullName: string;
  moveDate: string;
  email: string;
  phoneNumber: string;
  items?: Array<{ name: string; weight: string }>;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ 
  selectedItem, 
  items = [],
  onSubmit,
  onClose 
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    itemName: selectedItem?.title || "",
    itemWeight: selectedItem?.weight || "",
    pickupLocation: "",
    destination: "",
    fullName: "",
    moveDate: "",
    email: "",
    phoneNumber: "",
    items: items,
  });

  const [errors, setErrors] = useState<Partial<QuoteFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Referencias para Google Places Autocomplete
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  const pickupAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destinationAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    // Cargar Google Maps script
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

      // Autocomplete para pickup location
      pickupAutocompleteRef.current = new google.maps.places.Autocomplete(
        pickupInputRef.current,
        {
          types: ["address"],
          fields: ["formatted_address", "address_components", "geometry", "name"],
        }
      );

      // Autocomplete para destination
      destinationAutocompleteRef.current = new google.maps.places.Autocomplete(
        destinationInputRef.current,
        {
          types: ["address"],
          fields: ["formatted_address", "address_components", "geometry", "name"],
        }
      );

      // Listener para pickup location
      pickupAutocompleteRef.current.addListener("place_changed", () => {
        const place = pickupAutocompleteRef.current?.getPlace();
        if (place?.formatted_address) {
          setFormData((prev) => ({
            ...prev,
            pickupLocation: place.formatted_address || place.name || "",
          }));
          setErrors((prev) => ({ ...prev, pickupLocation: "" }));
        }
      });

      // Listener para destination
      destinationAutocompleteRef.current.addListener("place_changed", () => {
        const place = destinationAutocompleteRef.current?.getPlace();
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

    return () => {
      if (pickupAutocompleteRef.current) {
        google.maps.event.clearInstanceListeners(pickupAutocompleteRef.current);
      }
      if (destinationAutocompleteRef.current) {
        google.maps.event.clearInstanceListeners(destinationAutocompleteRef.current);
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof QuoteFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<QuoteFormData> = {};

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = "Pickup location is required";
    }
    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required";
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.moveDate) {
      newErrors.moveDate = "Move date is required";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateQuoteId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `SM-${timestamp}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Configuración de EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_SENDQUOTE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const quoteId = generateQuoteId();

      // Formatear items con sus pesos para el email
      let itemsList = "";
      if (formData.items && formData.items.length > 0) {
        itemsList = formData.items
          .map(item => `${item.name} (${item.weight})`)
          .join('\n- ');
      }

      // Formatear package info para el email
      let packageInfo = `Main Item: ${formData.itemName} (${formData.itemWeight})`;
      
      if (itemsList) {
        packageInfo += `\n\nAdditional Items:\n- ${itemsList}`;
      }

      // Preparar datos estandarizados para el template universal
      const templateParams = {
        // Quote ID
        quote_id: quoteId,
        
        // Customer Information (campos estandarizados)
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phoneNumber,
        
        // Move Details (campos estandarizados)
        move_type: formData.itemName || "Item Move",
        move_date: formData.moveDate,
        from_location: formData.pickupLocation,
        to_location: formData.destination,
        move_size: formData.itemWeight,
        
        // Package & Services info
        package_info: packageInfo,
        
        // Additional info
        additional_notes: formData.items && formData.items.length > 0 
          ? `Total items to move: ${formData.items.length + 1} (including main item)`
          : "Single item move",
        
        // Submission date
        submission_date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
      };

      // Enviar email usando EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log("Form submitted successfully:", formData);
      
      if (onSubmit) {
        onSubmit(formData);
      }

      // Mostrar mensaje de éxito
      alert(`✅ Quote request submitted successfully!\n\nYour Quote ID: ${quoteId}\n\nWe'll get back to you within 24 hours.`);
      
      // Reset form
      setFormData({
        itemName: selectedItem?.title || "",
        itemWeight: selectedItem?.weight || "",
        pickupLocation: "",
        destination: "",
        fullName: "",
        moveDate: "",
        email: "",
        phoneNumber: "",
        items: items,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ There was an error submitting your request. Please try again or contact us directly at (123) 456-7890.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto my-12 font-[Manrope]">
      {/* Close button if modal */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      )}

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-[Poppins]">
          Get Your Free Quote
        </h2>
        <p className="text-gray-600">
          Fill out the form below and we'll get back to you with a detailed quote within 24 hours
        </p>
      </div>

      {/* Selected Item Display */}
      {selectedItem && (
        <div className="mb-8 p-4 bg-[#B8CCC5]/20 rounded-xl border border-[#B8CCC5]/40">
          <div className="flex items-center gap-4">
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <p className="text-sm text-gray-600 font-medium">Selected Item:</p>
              <h3 className="text-xl font-bold text-gray-900">{selectedItem.title}</h3>
              <p className="text-sm text-[#FFE67B] font-semibold bg-gray-900 w-fit px-3 py-1 rounded-full mt-1">
                {selectedItem.weight}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Additional Items Display */}
      {items && items.length > 0 && (
        <div className="mb-8 p-4 bg-[#FFE67B]/20 rounded-xl border border-[#FFE67B]/40">
          <p className="text-sm text-gray-600 font-medium mb-3">Additional Items to Move:</p>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white px-4 py-2 rounded-lg"
              >
                <span className="font-medium text-gray-900">{item.name}</span>
                <span className="text-sm text-gray-600 bg-[#7AACAE] text-white px-3 py-1 rounded-full">
                  {item.weight}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Item Information (Read-only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Move Type / Item Name
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Size of Move / Approximate Weight
            </label>
            <input
              type="text"
              name="itemWeight"
              value={formData.itemWeight}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Location Information with Google Autocomplete */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pickup Location (From) <span className="text-red-500">*</span>
            </label>
            <input
              ref={pickupInputRef}
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="Enter pickup address"
              autoComplete="off"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8CCC5] transition-all ${
                errors.pickupLocation
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#B8CCC5]"
              }`}
            />
            {errors.pickupLocation && (
              <p className="mt-1 text-sm text-red-500">{errors.pickupLocation}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Destination (To) <span className="text-red-500">*</span>
            </label>
            <input
              ref={destinationInputRef}
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Enter destination address"
              autoComplete="off"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8CCC5] transition-all ${
                errors.destination
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#B8CCC5]"
              }`}
            />
            {errors.destination && (
              <p className="mt-1 text-sm text-red-500">{errors.destination}</p>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8CCC5] transition-all ${
                errors.fullName
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#B8CCC5]"
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tentative Move Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="moveDate"
              value={formData.moveDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8CCC5] transition-all ${
                errors.moveDate
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#B8CCC5]"
              }`}
            />
            {errors.moveDate && (
              <p className="mt-1 text-sm text-red-500">{errors.moveDate}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8CCC5] transition-all ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#B8CCC5]"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8CCC5] transition-all ${
                errors.phoneNumber
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#B8CCC5]"
              }`}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#FFE67B] hover:bg-[#FFD700] text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl font-[Poppins] ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
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
                Submitting...
              </span>
            ) : (
              "Get Free Quote"
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          By submitting this form, you agree to our Terms of Service and Privacy Policy
        </p>
      </form>
    </div>
  );
};

export default QuoteForm;