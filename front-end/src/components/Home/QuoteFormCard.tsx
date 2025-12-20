import React, { useState, useEffect, useRef } from "react";
import { Home, Search, Truck, ArrowDownUp, Package, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";
import hotel from "/assets/Hotel.svg";

interface QuoteFormData {
  // Step 1
  from: string;
  to: string;
  date: string;
  services: string;
  // Step 2
  packageType: 'basic' | 'medium' | 'premium';
  selectedServices: string[];
  name: string;
  email: string;
  phone: string;
}

interface QuoteFormCardProps {
  onSubmit?: (formData: QuoteFormData) => void;
}

const QuoteFormCard: React.FC<QuoteFormCardProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Package configuration
  const packageServices = {
    basic: [
      { id: 'labor', name: 'Labor (hands-on work only)' },
      { id: 'packing', name: 'Packing' },
      { id: 'unpacking', name: 'Unpacking' },
      { id: 'loading', name: 'Loading' },
      { id: 'object_transport', name: 'Object Transport' },
      { id: 'removal', name: 'Object Removal' },
    ],
    medium: [
      { id: 'full_pack_unpack', name: 'Packing + Loading, Transport + Unpacking' },
      { id: 'home_transport', name: 'Home Moving Transport' },
      { id: 'commercial_transport', name: 'Commercial Moving Transport' },
      { id: 'freight_transport', name: 'Freight Transport' },
    ],
    premium: [
      { id: 'full_service', name: 'Full Service' },
      { id: 'custom', name: 'Custom Package' },
    ],
  };

  const [formData, setFormData] = useState<QuoteFormData>({
    from: "",
    to: "",
    date: "",
    services: "home",
    packageType: "basic",
    selectedServices: [],
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof QuoteFormData, string>>
  >({});

  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const fromAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const toAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(
    null
  );

  useEffect(() => {
    // Load Google Maps script
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
      if (!fromInputRef.current || !toInputRef.current) return;

      fromAutocompleteRef.current = new google.maps.places.Autocomplete(
        fromInputRef.current,
        {
          types: ["(cities)"],
          fields: [
            "address_components",
            "formatted_address",
            "geometry",
            "name",
          ],
        }
      );

      toAutocompleteRef.current = new google.maps.places.Autocomplete(
        toInputRef.current,
        {
          types: ["(cities)"],
          fields: [
            "address_components",
            "formatted_address",
            "geometry",
            "name",
          ],
        }
      );

      fromAutocompleteRef.current.addListener("place_changed", () => {
        const place = fromAutocompleteRef.current?.getPlace();
        if (place?.formatted_address) {
          setFormData((prev) => ({
            ...prev,
            from: place.formatted_address || place.name || "",
          }));
          setErrors((prev) => ({ ...prev, from: "" }));
        }
      });

      toAutocompleteRef.current.addListener("place_changed", () => {
        const place = toAutocompleteRef.current?.getPlace();
        if (place?.formatted_address) {
          setFormData((prev) => ({
            ...prev,
            to: place.formatted_address || place.name || "",
          }));
          setErrors((prev) => ({ ...prev, to: "" }));
        }
      });
    };

    loadGoogleMapsScript();

    return () => {
      if (fromAutocompleteRef.current) {
        google.maps.event.clearInstanceListeners(fromAutocompleteRef.current);
      }
      if (toAutocompleteRef.current) {
        google.maps.event.clearInstanceListeners(toAutocompleteRef.current);
      }
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePackageTypeChange = (packageType: 'basic' | 'medium' | 'premium') => {
    setFormData((prev) => ({
      ...prev,
      packageType,
      selectedServices: [], // Reset services when package type changes
    }));
    setErrors((prev) => ({ ...prev, selectedServices: "" }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => {
      const isSelected = prev.selectedServices.includes(serviceId);
      const newServices = isSelected
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId];
      
      return {
        ...prev,
        selectedServices: newServices,
      };
    });
    setErrors((prev) => ({ ...prev, selectedServices: "" }));
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (!formData.from.trim()) {
      newErrors.from = "Origin city is required";
    }
    if (!formData.to.trim()) {
      newErrors.to = "Destination city is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (formData.selectedServices.length === 0) {
      newErrors.selectedServices = "Please select at least one service";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{6,}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Phone must have at least 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateQuoteId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `SM-${timestamp}-${random}`;
  };

  const getServiceNames = (serviceIds: string[]): string[] => {
    const allServices = [...packageServices.basic, ...packageServices.medium, ...packageServices.premium];
    return serviceIds.map(id => {
      const service = allServices.find(s => s.id === id);
      return service ? service.name : id;
    });
  };

  const formatServicesForEmail = (): string => {
    const serviceNames = getServiceNames(formData.selectedServices);
    return serviceNames.join('\n- ');
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
      // Configuración de EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_SENDQUOTE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const quoteId = generateQuoteId();
      const servicesList = formatServicesForEmail();

      // Preparar datos estandarizados para el template universal
      const templateParams = {
        // Quote ID
        quote_id: quoteId,
        
        // Customer Information (campos estandarizados)
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        
        // Move Details (campos estandarizados)
        move_type: formData.services.charAt(0).toUpperCase() + formData.services.slice(1).replace('_', ' '),
        move_date: formData.date,
        from_location: formData.from,
        to_location: formData.to,
        
        // Package & Services
        package_info: `Package Type: ${formData.packageType.charAt(0).toUpperCase() + formData.packageType.slice(1)}\n\nSelected Services:\n- ${servicesList}`,
        
        // Additional info
        additional_notes: `Service Category: ${formData.services}\nPackage: ${formData.packageType}\nNumber of Services: ${formData.selectedServices.length}`,
        
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

      console.log("Quote form submitted successfully:", formData);
      
      if (onSubmit) {
        onSubmit(formData);
      }

      // Mostrar mensaje de éxito
      alert(`✅ Quote request submitted successfully!\n\nYour Quote ID: ${quoteId}\n\nWe'll get back to you within 24 hours.`);
      
      // Reset form
      setFormData({
        from: "",
        to: "",
        date: "",
        services: "home",
        packageType: "basic",
        selectedServices: [],
        name: "",
        email: "",
        phone: "",
      });
      
      // Reset to step 1
      setCurrentStep(1);
      
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("❌ There was an error submitting your request. Please try again or contact us directly at (123) 456-7890.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const swapLocations = () => {
    setFormData((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mb-8 sm:mb-16 -mt-10">
      {/* Folder Tab - Quote Here */}
      <div className="inline-flex items-center gap-2 bg-white rounded-t-xl sm:rounded-t-2xl px-4 sm:px-5 py-2 sm:py-3 shadow-sm border-b-0">
        <div className="inline-flex items-center gap-2 bg-[#C9E1EC] px-3 sm:px-5 py-2 sm:py-3 shadow-sm rounded-full">
          <img src={hotel} alt="Quote" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm font-semibold text-blue-700">
            Quote here - Step {currentStep} of 2
          </span>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl rounded-tl-none shadow-2xl overflow-hidden">
        <form
          onSubmit={currentStep === 1 ? handleNextStep : handleSubmit}
          className="p-4 sm:p-6 lg:p-8"
        >
          {currentStep === 1 ? (
            // STEP 1: Location and Date - Truck and Home icons
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch lg:items-center">
              {/* Card 1: From/To with Truck Icon */}
              <div className="flex-1 bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  {/* From */}
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 block mb-1 sm:mb-2">
                      From
                    </label>
                    <input
                      ref={fromInputRef}
                      type="text"
                      name="from"
                      value={formData.from}
                      onChange={handleInputChange}
                      className={`text-sm sm:text-base font-semibold text-gray-900 outline-none w-full bg-transparent placeholder:text-gray-400 placeholder:font-normal ${
                        errors.from ? "border-b-2 border-red-500" : ""
                      }`}
                      placeholder="Origin city"
                      autoComplete="off"
                    />
                    {errors.from && (
                      <span className="text-xs text-red-500 mt-1 block">
                        {errors.from}
                      </span>
                    )}
                  </div>

                  {/* Truck/Swap Icon */}
                  <div className="flex items-center justify-center sm:justify-start my-2 sm:my-0">
                    <button
                      type="button"
                      className="p-2 sm:p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all border border-gray-200"
                      onClick={swapLocations}
                      aria-label="Swap locations"
                    >
                      <Truck className="w-5 h-5 text-gray-600 hidden sm:block" />
                      <ArrowDownUp className="w-5 h-5 text-gray-600 sm:hidden" />
                    </button>
                  </div>

                  {/* To */}
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 block mb-1 sm:mb-2">
                      To
                    </label>
                    <input
                      ref={toInputRef}
                      type="text"
                      name="to"
                      value={formData.to}
                      onChange={handleInputChange}
                      className={`text-sm sm:text-base font-semibold text-gray-900 outline-none w-full bg-transparent placeholder:text-gray-400 placeholder:font-normal ${
                        errors.to ? "border-b-2 border-red-500" : ""
                      }`}
                      placeholder="Destination city"
                      autoComplete="off"
                    />
                    {errors.to && (
                      <span className="text-xs text-red-500 mt-1 block">
                        {errors.to}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2: Date and Services with Home Icon */}
              <div className="flex-1 bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  {/* Date */}
                  <div className="flex-1 relative">
                    <label className="text-xs text-gray-500 block mb-1 sm:mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={`text-sm sm:text-base font-semibold text-gray-900 outline-none w-full bg-transparent cursor-pointer [color-scheme:light] ${
                        errors.date ? "border-b-2 border-red-500" : ""
                      }`}
                      style={{
                        colorScheme: "light",
                      }}
                    />
                    {errors.date && (
                      <span className="text-xs text-red-500 mt-1 block">
                        {errors.date}
                      </span>
                    )}
                  </div>

                  {/* Home Icon */}
                  <div className="hidden sm:flex items-center justify-center">
                    <div className="p-3 bg-white rounded-full shadow-md border border-gray-200">
                      <Home className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>

                  {/* Services */}
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 block mb-1 sm:mb-2">
                      Services
                    </label>
                    <select
                      name="services"
                      value={formData.services}
                      onChange={handleInputChange}
                      className="text-sm sm:text-base font-semibold text-gray-900 outline-none w-full bg-transparent cursor-pointer"
                    >
                      <option value="home">Home</option>
                      <option value="commercial">Commercial</option>
                      <option value="packing">Packing and Unpacking</option>
                      <option value="furniture_removal">
                        Furniture Removal
                      </option>
                      <option value="home_organization">
                        Home Organization
                      </option>
                      <option value="freight_transport">
                        Freight Transport
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-full p-4 sm:p-5 lg:p-6 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex-shrink-0 self-center lg:self-auto"
                aria-label="Next step"
              >
                <Search className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            // STEP 2: Package Type and Contact Info
            <>
              {/* Contact Information */}
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch lg:items-center">
                {/* Card 1: Package Type and Name with Package Icon */}
                <div className="flex-1 bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    {/* Package Type Button */}
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1 sm:mb-2">
                        Package
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPackageModal(true)}
                        className="text-sm sm:text-base font-semibold text-gray-900 outline-none w-full bg-transparent text-left hover:text-teal-600 transition-colors"
                      >
                        {formData.packageType.charAt(0).toUpperCase() + formData.packageType.slice(1)}
                        {formData.selectedServices.length > 0 && (
                          <span className="text-xs text-gray-500 ml-2">
                            ({formData.selectedServices.length} selected)
                          </span>
                        )}
                      </button>
                      {errors.selectedServices && (
                        <span className="text-xs text-red-500 mt-1 block">
                          {errors.selectedServices}
                        </span>
                      )}
                    </div>

                    {/* Package Icon */}
                    <div className="hidden sm:flex items-center justify-center">
                      <div className="p-3 bg-white rounded-full shadow-md border border-gray-200">
                        <Package className="w-5 h-5 text-gray-600" />
                      </div>
                    </div>

                    {/* Name */}
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1 sm:mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`text-sm sm:text-base font-semibold text-gray-900 outline-none w-full bg-transparent placeholder:text-gray-400 placeholder:font-normal ${
                          errors.name ? "border-b-2 border-red-500" : ""
                        }`}
                        placeholder="Your name"
                        autoComplete="name"
                      />
                      {errors.name && (
                        <span className="text-xs text-red-500 mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card 2: Email and Phone with Mail Icon */}
                <div className="flex-1 bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    {/* Email */}
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1 sm:mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`text-sm sm:text-base font-semibold text-gray-900 outline-none w-full bg-transparent placeholder:text-gray-400 placeholder:font-normal ${
                          errors.email ? "border-b-2 border-red-500" : ""
                        }`}
                        placeholder="Your email"
                        autoComplete="email"
                      />
                      {errors.email && (
                        <span className="text-xs text-red-500 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Mail Icon */}
                    <div className="hidden sm:flex items-center justify-center">
                      <div className="p-3 bg-white rounded-full shadow-md border border-gray-200">
                        <Mail className="w-5 h-5 text-gray-600" />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1 sm:mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`text-sm sm:text-base font-semibold text-gray-900 outline-none w-full bg-transparent placeholder:text-gray-400 placeholder:font-normal ${
                          errors.phone ? "border-b-2 border-red-500" : ""
                        }`}
                        placeholder="000000"
                        autoComplete="tel"
                      />
                      {errors.phone && (
                        <span className="text-xs text-red-500 mt-1 block">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-teal-600 hover:bg-teal-700 text-white rounded-full p-4 sm:p-5 lg:p-6 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex-shrink-0 self-center lg:self-auto ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  aria-label="Submit quote"
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-6 w-6 sm:h-7 sm:w-7"
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
                  ) : (
                    <Search className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
                  )}
                </button>
              </div>
            </>
          )}

          {/* Back Button for Step 2 */}
          {currentStep === 2 && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-teal-600 hover:text-teal-700 font-semibold underline"
              >
                ← Back to step 1
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Package Selection Modal */}
      {showPackageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Package className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Select Package & Services</h3>
                  <p className="text-xs text-gray-600">Choose your package type and services</p>
                </div>
              </div>
              <button
                onClick={() => setShowPackageModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
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
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Package Type Selection */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Package Type</h4>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handlePackageTypeChange('basic')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.packageType === 'basic'
                        ? 'border-teal-600 bg-teal-50 shadow-md'
                        : 'border-gray-300 hover:border-teal-300'
                    }`}
                  >
                    <div className="text-center">
                      <h5 className="font-semibold text-gray-900 text-sm">Basic</h5>
                      <p className="text-xs text-gray-600 mt-1">Labor</p>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handlePackageTypeChange('medium')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.packageType === 'medium'
                        ? 'border-teal-600 bg-teal-50 shadow-md'
                        : 'border-gray-300 hover:border-teal-300'
                    }`}
                  >
                    <div className="text-center">
                      <h5 className="font-semibold text-gray-900 text-sm">Medium</h5>
                      <p className="text-xs text-gray-600 mt-1">Transport</p>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handlePackageTypeChange('premium')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.packageType === 'premium'
                        ? 'border-teal-600 bg-teal-50 shadow-md'
                        : 'border-gray-300 hover:border-teal-300'
                    }`}
                  >
                    <div className="text-center">
                      <h5 className="font-semibold text-gray-900 text-sm">Premium</h5>
                      <p className="text-xs text-gray-600 mt-1">Full Service</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Services Selection */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Services <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">(Select one or more)</span>
                </h4>
                <div className="space-y-2">
                  {packageServices[formData.packageType].map((service) => (
                    <label
                      key={service.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.selectedServices.includes(service.id)
                          ? 'border-teal-600 bg-teal-50'
                          : 'border-gray-200 hover:border-teal-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedServices.includes(service.id)}
                        onChange={() => handleServiceToggle(service.id)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-600"
                      />
                      <div className="font-medium text-gray-900 text-sm">{service.name}</div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-between">
              <div className="text-xs text-gray-600">
                {formData.selectedServices.length} service{formData.selectedServices.length !== 1 ? 's' : ''} selected
              </div>
              <button
                onClick={() => setShowPackageModal(false)}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
              >
                Confirm Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteFormCard;