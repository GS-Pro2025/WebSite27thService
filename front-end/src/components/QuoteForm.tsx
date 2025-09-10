import React, { useState, useCallback, useMemo, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormData {
  name: string;
  phone: string;
  origin: string;
  destination: string;
  email: string;
  typeOfMove: string;
  address: string;
  additional_info: string;
  tentative_date: Date | null;
  size_of_move: string;
}

interface QuoteFormProps {
  onComplete?: (data: FormData) => void;
  onNextDesktop?: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const VALIDATION_PATTERNS = {
  phone: /^\(?([0-9]{3})\)?[-.● ]?([0-9]{3})[-.● ]?([0-9]{4})$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

const INITIAL_FORM_DATA: FormData = {
  name: "",
  phone: "",
  origin: "",
  destination: "",
  email: "",
  typeOfMove: "",
  address: "",
  additional_info: "",
  tentative_date: null,
  size_of_move: "",
};

const MOVE_TYPE_OPTIONS = [
  { value: "", label: "type of move" },
  { value: "home", label: "Home move" },
  { value: "apartment", label: "Apartment move" },
  { value: "commercial", label: "Commercial move" },
  { value: "store", label: "Store move" },
  { value: "warehouse", label: "Warehouse move" },
  { value: "item", label: "Item move" },
] as const;

const MOVE_SIZE_OPTIONS = [
  { value: "", label: "Size of Move" },
  { value: "xsmall", label: "Studio" },
  { value: "small", label: "1 Bedroom" },
  { value: "medium", label: "2 Bedrooms" },
  { value: "large", label: "3 Bedrooms" },
  { value: "xlarge", label: "4+ Bedrooms" },
] as const;

type StringKeys = Exclude<keyof FormData, "tentative_date">;

const QuoteForm: React.FC<QuoteFormProps> = ({ onComplete, onNextDesktop }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const originAutoRef = useRef<any>(null);
  const destAutoRef = useRef<any>(null);

  const handlePlaceChanged = (
    ref: React.MutableRefObject<any>,
    field: "origin" | "destination"
  ) => {
    const place = ref.current?.getPlace();
    const value =
      place?.formatted_address ||
      place?.name ||
      (typeof place === "string" ? place : "");

    if (value) {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    }
  };

  const validateStep1 = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.origin.trim()) newErrors.origin = "Origin is required";
    if (!formData.destination.trim())
      newErrors.destination = "Destination is required";
    if (!formData.typeOfMove) newErrors.typeOfMove = "Please select a type";
    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!VALIDATION_PATTERNS.phone.test(formData.phone)) {
      newErrors.phone = "Enter a valid US phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!VALIDATION_PATTERNS.email.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const validateStep2 = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.address.trim()) newErrors.address = "Postal code is required";
    if (!formData.tentative_date) {
      newErrors.tentative_date = "Tentative date is required";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const chosen = new Date(formData.tentative_date);
      chosen.setHours(0, 0, 0, 0);
      if (chosen < today)
        newErrors.tentative_date = "Date cannot be in the past";
    }

    if (!formData.size_of_move.trim())
      newErrors.size_of_move = "Size of move is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target as { name: StringKeys; value: string };
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleNext = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validateStep1()) {
        setStep(2);
        if (onNextDesktop) {
          onNextDesktop();
        }
      }
    },
    [validateStep1, onNextDesktop]
  );

  const handleBack = useCallback(() => {
    setStep(1);
    setErrors({});
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateStep2() || isSubmitting) return;

      setIsSubmitting(true);
      try {
        if (onComplete) onComplete(formData);
      } catch (error) {
        console.error("Error en el envío:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateStep2, isSubmitting, formData, onComplete]
  );

  const renderField = useMemo(
    () => ({
      input: (
        name: keyof FormData,
        label: string,
        type = "text",
        placeholder?: string
      ) => (
        <div className="text-black flex flex-col">
          <label className="text-xs lg:text-sm font-semibold">{label}</label>
          <input
            type={type}
            name={name}
            value={formData[name] === null ? "" : typeof formData[name] === "object" && formData[name] instanceof Date ? formData[name].toISOString().slice(0, 10) : formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className="p-2 rounded-xl bg-white text-sm transition-colors focus:ring-2 focus:ring-[#FFE67B] focus:outline-none"
            disabled={isSubmitting}
          />
          {errors[name] && (
            <span className="text-red-500 text-xs mt-1">{errors[name]}</span>
          )}
        </div>
      ),

      select: (
        name: keyof FormData,
        label: string,
        options: readonly { value: string; label: string }[]
      ) => (
        <div className="text-black flex flex-col">
          <label className="text-xs lg:text-sm font-semibold">{label}</label>
          <select
            name={name}
            value={
              formData[name] === null
                ? ""
                : typeof formData[name] === "object" && formData[name] instanceof Date
                ? formData[name].toISOString().slice(0, 10)
                : formData[name]
            }
            onChange={handleChange}
            className="p-2 rounded-xl bg-white text-sm transition-colors focus:ring-2 focus:ring-[#FFE67B] focus:outline-none"
            disabled={isSubmitting}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors[name] && (
            <span className="text-red-500 text-xs mt-1">{errors[name]}</span>
          )}
        </div>
      ),

      textarea: (name: keyof FormData, label: string, rows = 3) => (
        <div className="text-black flex flex-col">
          <label className="text-xs lg:text-sm font-semibold">{label}</label>
          <textarea
            name={name}
            value={
              formData[name] === null
                ? ""
                : typeof formData[name] === "object" && formData[name] instanceof Date
                ? formData[name].toISOString()
                : String(formData[name])
            }
            onChange={handleChange}
            rows={rows}
            className="p-2 rounded-xl bg-white text-sm resize-none transition-colors focus:ring-2 focus:ring-[#FFE67B] focus:outline-none"
            disabled={isSubmitting}
          />
          {errors[name] && (
            <span className="text-red-500 text-xs mt-1">{errors[name]}</span>
          )}
        </div>
      ),
    }),
    [formData, handleChange, errors, isSubmitting]
  );

  return (
    <div className="bg-[#D9D9D9] rounded-2xl sm:rounded-3xl p-4 sm:p-4 lg:p-6 pt-8 sm:pt-8 lg:pt-12 font-[Montserrat] shadow-md w-full">
      {/* Paso 1 */}
      {step === 1 && (
        <form onSubmit={handleNext} className="space-y-4">
          {/* Fila 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div className="text-black flex flex-col">
              <label className="text-xs lg:text-sm font-semibold">Origin</label>
              <Autocomplete
                onLoad={(auto) => {
                  originAutoRef.current = auto;

                  const center = new google.maps.LatLng(37.4316, -78.6569);
                  const circle = new google.maps.Circle({
                    center,
                    radius: 160_934,
                  });

                  auto.setBounds(circle.getBounds()!);
                  auto.setOptions({
                    componentRestrictions: { country: ["us"] },
                    fields: ["formatted_address", "geometry", "name"],
                    types: ["geocode"],
                    strictBounds: true,
                  });
                }}
                onPlaceChanged={() =>
                  handlePlaceChanged(originAutoRef, "origin")
                }
              >
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="Origin"
                  className="p-2 rounded-xl bg-white text-sm transition-colors focus:ring-2 focus:ring-[#FFE67B] focus:outline-none"
                  disabled={isSubmitting}
                  autoComplete="off"
                />
              </Autocomplete>
              {errors.origin && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.origin}
                </span>
              )}
            </div>

            <div className="text-black flex flex-col">
              <label className="text-xs lg:text-sm font-semibold">
                Destination
              </label>
              <Autocomplete
                options={{
                  componentRestrictions: { country: ["us"] },
                  fields: ["formatted_address", "geometry", "name"],
                  types: ["geocode"],
                }}
                onLoad={(auto) => (destAutoRef.current = auto)}
                onPlaceChanged={() =>
                  handlePlaceChanged(destAutoRef, "destination")
                }
              >
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Destination"
                  className="p-2 rounded-xl bg-white text-sm transition-colors focus:ring-2 focus:ring-[#FFE67B] focus:outline-none"
                  disabled={isSubmitting}
                  autoComplete="off"
                />
              </Autocomplete>
              {errors.destination && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.destination}
                </span>
              )}
            </div>

            {renderField.select(
              "typeOfMove",
              "Type of move",
              MOVE_TYPE_OPTIONS
            )}
          </div>

          {/* Fila 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {renderField.input("name", "Name")}
            {renderField.input("phone", "Phone", "tel", "555-555-5555")}
            {renderField.input("email", "Email", "email", "you@example.com")}
          </div>

          <div className="text-black flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#FFE67B] px-6 py-2 rounded-full font-semibold transition-all duration-200 hover:bg-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              {isSubmitting ? "PROCESSING..." : "GET A QUOTE NOW"}
            </button>
          </div>
        </form>
      )}

      {/* Paso 2 */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Fila 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderField.input("address", "Postal code")}
            <div className="text-black flex flex-col">
              <label className="text-xs lg:text-sm font-semibold">
                Tentative date
              </label>
              <ReactDatePicker
                selected={formData.tentative_date}
                onChange={(date) => {
                  setFormData((prev) => ({ ...prev, tentative_date: date }));
                  if (errors.tentative_date) {
                    setErrors((prev) => ({ ...prev, tentative_date: "" }));
                  }
                }}
                placeholderText="Select a date"
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                className={`p-2 rounded-xl bg-white text-sm transition-colors focus:ring-2 focus:ring-[#FFE67B] focus:outline-none ${
                  errors.tentative_date ? "border border-red-500" : ""
                }`}
                disabled={isSubmitting}
                isClearable
                showPopperArrow
              />
              {errors.tentative_date && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.tentative_date}
                </span>
              )}
            </div>
          </div>

          {/* Fila 2 */}
          <div className="text-black grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderField.select(
              "size_of_move",
              "Size of move",
              MOVE_SIZE_OPTIONS
            )}
            {renderField.textarea("additional_info", "Additional info")}
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="bg-gray-300 px-6 py-2 rounded-full font-semibold transition-all duration-200 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-black bg-[#FFE67B] px-6 py-2 rounded-full font-semibold transition-all duration-200 hover:bg-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              {isSubmitting ? "SUBMITTING..." : "CONTINUE"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default QuoteForm;
