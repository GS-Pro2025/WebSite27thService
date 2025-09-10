import React, { useEffect, useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import api from "../api/axiosInstance";
import ServicesForm from "./ServicesForm";
import SuccessModal from "./SuccessModal";

interface FormData {
  name: string;
  phone: string;
  origin: string;
  destination: string;
  email: string;
  address: string;
  additional_info: string;
  tentative_date: string;
  typeOfMove: string;
  sizeMove: string;
}

interface Errors {
  [key: string]: string;
}

const INITIAL_FORM_DATA: FormData = {
  name: "",
  phone: "",
  origin: "",
  destination: "",
  email: "",
  address: "",
  additional_info: "",
  tentative_date: "",
  typeOfMove: "",
  sizeMove: "",
};

const BEDROOM_MAP = {
  small: 1,
  medium: 2,
  large: 3,
  xlarge: 4,
} as const;

const TYPE_OPTIONS = [
  { value: "home", label: "Home move" },
  { value: "apartment", label: "Apartment move" },
  { value: "commercial", label: "Commercial move" },
  { value: "store", label: "Store move" },
  { value: "warehouse", label: "Warehouse move" },
  { value: "item", label: "Item move" },
];

const SIZE_OPTIONS = [
  { value: "xsmall", label: "Studio" },
  { value: "small", label: "1 Bedroom" },
  { value: "medium", label: "2 Bedrooms" },
  { value: "large", label: "3 Bedrooms" },
  { value: "xlarge", label: "4+ Bedrooms" },
];

const SERVICE_NAME_BY_KEY = {
  pack: "Pack",
  wrap: "Wrap",
  load: "Load",
  unload: "Unload",
  unpack: "Unpack",
  home_org: "Home Organization",
};

const getTodayDate = () => new Date().toISOString().split("T")[0];

const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

const getBedroomCount = (sizeMove: string): number => {
  return BEDROOM_MAP[sizeMove as keyof typeof BEDROOM_MAP] || 0;
};

const useFormValidation = () => {
  const validateStep1 = (formData: FormData): Errors => {
    const errors: Errors = {};
    if (!formData.origin.trim()) errors.origin = "Origin is required";
    if (!formData.destination.trim())
      errors.destination = "Destination is required";
    return errors;
  };

  const validateStep2 = (formData: FormData, today: string): Errors => {
    const errors: Errors = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!isValidEmail(formData.email)) errors.email = "Invalid email address";
    if (formData.tentative_date && formData.tentative_date < today) {
      errors.tentative_date = "Date cannot be in the past";
    }
    if (!formData.typeOfMove) errors.typeOfMove = "Select a type of move";
    if (!formData.sizeMove) errors.sizeMove = "Select size of move";

    return errors;
  };

  return { validateStep1, validateStep2 };
};

const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  error?: string;
  min?: string;
}> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  min,
}) => (
  <div>
    <label className="block text-[#606060] text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      className={`bg-white w-full border rounded px-3 md:px-4 py-1.5 md:py-2 text-black 
        focus:outline-none focus:ring-2 focus:ring-[#FFE67B] ${
          error ? "border-red-500" : "border-gray-300"
        }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const SelectField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  error?: string;
}> = ({ label, name, value, onChange, options, placeholder, error }) => (
  <div>
    <label className="block text-[#606060] text-sm font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`bg-white w-full border rounded px-3 md:px-4 py-1.5 md:py-2 text-black 
        focus:outline-none focus:ring-2 focus:ring-[#FFE67B] ${
          error ? "border-red-500" : "border-gray-300"
        }`}
    >
      <option value="">{placeholder}</option>
      {options.map(({ value: optionValue, label }) => (
        <option key={optionValue} value={optionValue}>
          {label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const TextareaField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}> = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-[#606060] text-sm font-medium">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-white w-full border border-gray-300 rounded px-3 md:px-4 py-1.5 md:py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
    />
  </div>
);

const Button: React.FC<{
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  children: React.ReactNode;
}> = ({
  type = "button",
  onClick,
  variant = "primary",
  fullWidth = false,
  children,
}) => {
  const baseClasses =
    "font-semibold py-1.5 md:py-2 rounded-md shadow transition-all";
  const variantClasses =
    variant === "primary"
      ? "bg-[#FFE67B] text-[#606060] hover:brightness-110"
      : "bg-gray-200 text-[#606060] hover:brightness-105";
  const widthClasses = fullWidth ? "w-full" : "w-1/2";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${widthClasses}`}
    >
      {children}
    </button>
  );
};
const VA_CENTER = { lat: 37.4316, lng: -78.6569 };
const RADIUS_M = 160_934;

const US_AUTOCOMPLETE_OPTIONS: google.maps.places.AutocompleteOptions = {
  componentRestrictions: { country: ["us"] },
  fields: ["formatted_address", "geometry", "name"],
  types: ["geocode"],
};

const FormCover: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errors, setErrors] = useState<Errors>({});
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [selectedServices, setSelectedServices] = useState<
    ("pack" | "wrap" | "load" | "unload" | "unpack" | "home_org")[]
  >([]);
  const [services, setServices] = useState<
    { service_id: number; name: string }[]
  >([]);

  const today = getTodayDate();
  const { validateStep1, validateStep2 } = useFormValidation();
  const originAutoRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destAutoRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = (
    ref: React.MutableRefObject<google.maps.places.Autocomplete | null>,
    field: "origin" | "destination"
  ) => {
    const place = ref.current?.getPlace();
    const value = place?.formatted_address || place?.name || ("" as string);

    if (value) {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const stepErrors = validateStep1(formData);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
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

  const handleStep2Continue = async (e: React.FormEvent) => {
    e.preventDefault();
    const stepErrors = validateStep2(formData, today);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      setStep(3);
    }
  };
  const handleFinalSubmitServices = async () => {
    try {
      // 1) Person
      const personRes = await api.post("/persons", {
        full_name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        address: formData.address,
        additional_info: formData.additional_info,
      });

      // 2) Move
      const moveRes = await api.post("/moves", {
        person_id: personRes.data.person_id,
        status: "pending",
        tentative_date: formData.tentative_date,
        origin_address: formData.origin,
        destination_address: formData.destination,
      });
      const moveId = moveRes.data.move_id;

      // 3) MoveItems
      const bedrooms = getBedroomCount(formData.sizeMove);
      const moveItemPromises = [
        api.post("/move-items", {
          move_id: moveId,
          description: formData.typeOfMove,
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
      setShowSuccess(true);

      // 4) MoveServices
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

  const renderStep1 = () => (
    <>
      <div>
        <label className="block text-[#606060] text-sm font-medium">
          Origin
        </label>
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
            onChange={handleChange}
            placeholder="Origin"
            className={`bg-white w-full border rounded px-3 md:px-4 py-1.5 md:py-2 text-black 
            focus:outline-none focus:ring-2 focus:ring-[#FFE67B] ${
              errors.origin ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="off"
          />
        </Autocomplete>
        {errors.origin && (
          <p className="text-red-500 text-xs mt-1">{errors.origin}</p>
        )}
      </div>

      <div>
        <label className="block text-[#606060] text-sm font-medium">
          Destination
        </label>
        <Autocomplete
          onLoad={(auto) => (destAutoRef.current = auto)}
          onPlaceChanged={() => handlePlaceChanged(destAutoRef, "destination")}
          options={US_AUTOCOMPLETE_OPTIONS}
        >
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Destination"
            className={`bg-white w-full border rounded px-3 md:px-4 py-1.5 md:py-2 text-black 
            focus:outline-none focus:ring-2 focus:ring-[#FFE67B] ${
              errors.destination ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="off"
          />
        </Autocomplete>
        {errors.destination && (
          <p className="text-red-500 text-xs mt-1">{errors.destination}</p>
        )}
      </div>

      <div className="flex items-start space-x-2">
        <input type="checkbox" id="checkbox" className="mt-1" />
        <label
          htmlFor="checkbox"
          className="text-[#606060] text-sm cursor-pointer"
        >
          <span className="font-medium">Label</span>
          <br />
          <span className="text-xs text-gray-500">Description</span>
        </label>
      </div>

      <div className="pt-2">
        <Button type="submit" fullWidth>
          VERIFY COVERAGE
        </Button>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        error={errors.name}
      />

      <InputField
        label="Phone (USA)"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+1 (555) 555-5555"
        type="tel"
      />

      <InputField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="example@email.com"
        type="email"
        error={errors.email}
      />

      <InputField
        label="Postal Code"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="12345"
      />

      <TextareaField
        label="Additional Info"
        name="additional_info"
        value={formData.additional_info}
        onChange={handleChange}
        placeholder="Details about your move"
      />

      <InputField
        label="Tentative Date"
        name="tentative_date"
        value={formData.tentative_date}
        onChange={handleChange}
        placeholder=""
        type="date"
        min={today}
        error={errors.tentative_date}
      />

      <SelectField
        label="Type of Move"
        name="typeOfMove"
        value={formData.typeOfMove}
        onChange={handleChange}
        options={TYPE_OPTIONS}
        placeholder="Type of Move"
        error={errors.typeOfMove}
      />

      <SelectField
        label="Size of Move"
        name="sizeMove"
        value={formData.sizeMove}
        onChange={handleChange}
        options={SIZE_OPTIONS}
        placeholder="Size of move"
        error={errors.sizeMove}
      />

      <div className="flex space-x-2 pt-2">
        <Button variant="secondary" onClick={handlePrevStep}>
          BACK
        </Button>
        <Button type="submit">Continue</Button>
      </div>
    </>
  );

  return (
    <>
      {step <= 2 ? (
        <form
          onSubmit={step === 1 ? handleNextStep : handleStep2Continue}
          className="space-y-1.5 md:space-y-4"
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
      <SuccessModal
        show={showSuccess}
        title="Request successful"
        message="Your request has been submitted successfully. You will receive more information in your email."
        onClose={() => window.location.reload()}
      />
    </>
  );
};

export default FormCover;