import React, { useEffect, useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import api from "../api/axiosInstance";
import ServicesForm from "./ServicesForm";
import SuccessModal from "./SuccessModal";

interface PresentationFormProps {
  isLoaded: boolean;
  formTransform: number;
}

interface FormData {
  tipoMovimiento: string;
  fecha: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  additional_info: string;
  origin: string;
  destination: string;
  sizeMove: string;
}

interface Errors {
  [key: string]: string;
}

const INITIAL_FORM_DATA: FormData = {
  tipoMovimiento: "",
  fecha: "",
  name: "",
  phone: "",
  email: "",
  address: "",
  additional_info: "",
  origin: "",
  destination: "",
  sizeMove: "",
};

const SIZE_OPTIONS = [
  { value: "xsmall", label: "Studio" },
  { value: "small", label: "1 Bedroom" },
  { value: "medium", label: "2 Bedrooms" },
  { value: "large", label: "3 Bedrooms" },
  { value: "xlarge", label: "4+ Bedrooms" },
];

const BEDROOM_MAP = {
  small: 1,
  medium: 2,
  large: 3,
  xlarge: 4,
} as const;

const SERVICE_NAME_BY_KEY = {
  pack: "Pack",
  wrap: "Wrap",
  load: "Load",
  unload: "Unload",
  unpack: "Unpack",
  home_org: "Home Organization",
} as const;
const VA_CENTER = { lat: 37.4316, lng: -78.6569 };
const RADIUS_M = 160_934;

const US_AUTOCOMPLETE_OPTIONS: google.maps.places.AutocompleteOptions = {
  componentRestrictions: { country: ["us"] },
  fields: ["formatted_address", "geometry", "name"],
  types: ["geocode"],
};

const getBedroomCount = (sizeMove: string): number => {
  return BEDROOM_MAP[sizeMove as keyof typeof BEDROOM_MAP] || 0;
};

const getTodayDate = () => new Date().toISOString().split("T")[0];
const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

const PresentationForm: React.FC<PresentationFormProps> = ({
  isLoaded,
  formTransform,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Errors>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState<
    ("pack" | "wrap" | "load" | "unload" | "unpack" | "home_org")[]
  >([]);
  const [services, setServices] = useState<
    { service_id: number; name: string }[]
  >([]);

  const today = getTodayDate();
  const originAutoRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destAutoRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = (
    ref: React.MutableRefObject<google.maps.places.Autocomplete | null>,
    field: "origin" | "destination"
  ) => {
    const place = ref.current?.getPlace();
    const value = place?.formatted_address || place?.name || "";

    if (value) {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep1 = (formData: FormData, today: string): Errors => {
    const errors: Errors = {};
    if (!formData.tipoMovimiento)
      errors.tipoMovimiento = "Select a type of move";
    if (!formData.fecha) errors.fecha = "Select a date";
    if (formData.fecha && formData.fecha < today) {
      errors.fecha = "Date cannot be in the past";
    }
    return errors;
  };

  const validateStep2 = (formData: FormData): Errors => {
    const errors: Errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!isValidEmail(formData.email)) errors.email = "Invalid email";
    if (!formData.origin.trim()) errors.origin = "Origin is required";
    if (!formData.destination.trim())
      errors.destination = "Destination is required";
    if (!formData.sizeMove) errors.sizeMove = "Select size of move";
    return errors;
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/services");
        setServices(data || []);
      } catch (e) {
        console.error("Error loading services:", e);
      }
    })();
  }, []);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const stepErrors = validateStep1(formData, today);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) setStep(2);
  };

  const handlePrevStep = () => setStep(1);

  const handleStep2Continue = async (e: React.FormEvent) => {
    e.preventDefault();
    const stepErrors = validateStep2(formData);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) {
      setStep(3);
    }
  };
  const handleFinalSubmitServices = async () => {
    try {
      const personRes = await api.post("/persons", {
        full_name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        address: formData.address,
        additional_info: formData.additional_info,
      });

      const moveRes = await api.post("/moves", {
        person_id: personRes.data.person_id,
        status: "pending",
        tentative_date: formData.fecha,
        origin_address: formData.origin,
        destination_address: formData.destination,
      });
      const moveId = moveRes.data.move_id;

      const bedrooms = getBedroomCount(formData.sizeMove);
      const moveItemPromises = [
        api.post("/move-items", {
          move_id: moveId,
          description: formData.tipoMovimiento,
          quantity: 1,
        }),
      ];
      if (bedrooms > 0) {
        moveItemPromises.push(
          api.post("/move-items", {
            move_id: moveId,
            description: "bedroom",
            quantity: bedrooms,
          })
        );
      }
      await Promise.all(moveItemPromises);

      const idByName = new Map(services.map((s) => [s.name, s.service_id]));
      const svcRequests = selectedServices
        .map((k) => idByName.get(SERVICE_NAME_BY_KEY[k]))
        .filter(Boolean)
        .map((service_id) =>
          api.post("/move-services", {
            move_id: moveId,
            service_id,
            quantity: 1,
          })
        );
      await Promise.all(svcRequests);

      setShowModal(true);
    } catch (error) {
      console.error("Error al guardar datos:", error);
      alert("There was an error submitting your request.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    window.location.reload();
  };

  const renderStep1 = () => (
    <>
      {/* Tipo de movimiento */}
      <div
        className={`transition-all duration-700 delay-700 ${
          isLoaded
            ? "opacity-100 transform translate-x-0"
            : "opacity-0 transform translate-x-4"
        }`}
      >
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Select your move
        </label>
        <select
          name="tipoMovimiento"
          value={formData.tipoMovimiento}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#68A2A6] focus:border-transparent bg-white text-gray-700 transition-all duration-300 hover:shadow-md focus:shadow-lg ${
            errors.tipoMovimiento ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select move type</option>
          <option value="home">Home move</option>
          <option value="apartment">Apartment move</option>
          <option value="commercial">Commercial move</option>
          <option value="store">Store move</option>
          <option value="warehouse">Warehouse move</option>
          <option value="item">Item move</option>
        </select>
        {errors.tipoMovimiento && (
          <p className="text-red-500 text-xs mt-1">{errors.tipoMovimiento}</p>
        )}
      </div>

      {/* Fecha */}
      <div
        className={`transition-all duration-700 delay-900 ${
          isLoaded
            ? "opacity-100 transform translate-x-0"
            : "opacity-0 transform translate-x-4"
        }`}
      >
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Date:
        </label>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#68A2A6] focus:border-transparent bg-white text-gray-700 transition-all duration-300 hover:shadow-md focus:shadow-lg ${
            errors.fecha ? "border-red-500" : "border-gray-300"
          }`}
          min={today}
        />
        {errors.fecha && (
          <p className="text-red-500 text-xs mt-1">{errors.fecha}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[#FFE67B] text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 delay-1100"
      >
        Next
      </button>
    </>
  );

  const renderStep2 = () => (
    <>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className={`text-black w-full px-4 py-3 border rounded-lg mb-2 ${
          errors.name ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Phone"
        className="text-black w-full px-4 py-3 border rounded-lg mb-2 border-gray-300"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        className={`text-black w-full px-4 py-3 border rounded-lg mb-2 ${
          errors.email ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Postal code"
        className="text-black w-full px-4 py-3 border rounded-lg mb-2 border-gray-300"
      />

      <textarea
        name="additional_info"
        value={formData.additional_info}
        onChange={handleInputChange}
        placeholder="Additional info"
        className="text-black w-full px-4 py-3 border rounded-lg mb-2 border-gray-300"
      />

      <div>
        <Autocomplete
          onLoad={(auto) => {
            originAutoRef.current = auto;
            const center = new google.maps.LatLng(VA_CENTER.lat, VA_CENTER.lng);
            const circle = new google.maps.Circle({ center, radius: RADIUS_M });
            auto.setBounds(circle.getBounds()!);
            auto.setOptions({
              ...US_AUTOCOMPLETE_OPTIONS,
              strictBounds: true,
            });
          }}
          onPlaceChanged={() => handlePlaceChanged(originAutoRef, "origin")}
        >
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleInputChange}
            placeholder="Origin"
            className={`text-black w-full px-4 py-3 border rounded-lg mb-2 ${
              errors.origin ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="off"
          />
        </Autocomplete>
        {errors.origin && (
          <p className="text-red-500 text-xs">{errors.origin}</p>
        )}
      </div>

      <div>
        <Autocomplete
          onLoad={(auto) => (destAutoRef.current = auto)}
          onPlaceChanged={() => handlePlaceChanged(destAutoRef, "destination")}
          options={US_AUTOCOMPLETE_OPTIONS}
        >
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="Destination"
            className={`text-black w-full px-4 py-3 border rounded-lg mb-2 ${
              errors.destination ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="off"
          />
        </Autocomplete>
        {errors.destination && (
          <p className="text-red-500 text-xs">{errors.destination}</p>
        )}
      </div>

      {errors.destination && (
        <p className="text-red-500 text-xs">{errors.destination}</p>
      )}

      <select
        name="sizeMove"
        value={formData.sizeMove}
        onChange={handleInputChange}
        className={`text-black w-full px-4 py-3 border rounded-lg mb-2 ${
          errors.sizeMove ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select size of move</option>
        {SIZE_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {errors.sizeMove && (
        <p className="text-red-500 text-xs">{errors.sizeMove}</p>
      )}

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={handlePrevStep}
          className="w-1/2 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-300"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-1/2 bg-[#FFE67B] text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          Continue
        </button>
      </div>
    </>
  );

  return (
    <>
      <div
        className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-1000 delay-500 ${
          isLoaded
            ? "opacity-100 transform translate-y-0 scale-100"
            : "opacity-0 transform translate-y-12 scale-95"
        }`}
        style={{
          transform: `translateY(${-formTransform}px) scale(${
            isLoaded ? 1 : 0.95
          })`,
        }}
      >
        {step <= 2 ? (
          <form
            onSubmit={step === 1 ? handleNextStep : handleStep2Continue}
            className="space-y-6"
          >
            {step === 1 ? renderStep1() : renderStep2()}
          </form>
        ) : (
          <ServicesForm
            selected={selectedServices}
            setSelected={setSelectedServices}
            onSubmit={handleFinalSubmitServices}
          />
        )}
      </div>

      <SuccessModal
        show={showModal}
        title="Thank you for your request!"
        message="You will shortly receive the information in your email."
        onClose={handleModalClose}
      />
    </>
  );
};

export default PresentationForm;
