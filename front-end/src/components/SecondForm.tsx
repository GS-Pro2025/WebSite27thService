import React, { useState } from "react";
import SuccessModal from "./SuccessModal";

interface SecondFormProps {
  extraData: {
    email: string;
    address: string;
    additional_info: string;
    tentative_date: string;
    type_of_move: string;
    size_of_move: string;
  };
  setExtraData: React.Dispatch<
    React.SetStateAction<{
      email: string;
      address: string;
      additional_info: string;
      tentative_date: string;
      type_of_move: string;
      size_of_move: string;
    }>
  >;
  onSubmit: () => void;
}

const SecondForm: React.FC<SecondFormProps> = ({
  extraData,
  setExtraData,
  onSubmit,
}) => {
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(extraData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!extraData.address.trim()) {
      setError("Address is required.");
      return;
    }

    if (!extraData.tentative_date) {
      setError("Tentative date is required.");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(extraData.tentative_date);

    if (selectedDate <= today) {
      setError("Tentative date must be in the future.");
      return;
    }

    if (!extraData.type_of_move) {
      setError("Please select a type of move.");
      return;
    }

    if (!extraData.size_of_move) {
      setError("Please select a size of move.");
      return;
    }

    setError("");
    onSubmit();
    setShowSuccessModal(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          type="email"
          placeholder="Email"
          value={extraData.email}
          onChange={(e) =>
            setExtraData({ ...extraData, email: e.target.value })
          }
          className="w-full bg-white text-gray-800 py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
        />

        <input
          type="text"
          placeholder="Address"
          value={extraData.address}
          onChange={(e) =>
            setExtraData({ ...extraData, address: e.target.value })
          }
          className="w-full bg-white text-gray-800 py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
        />

        <input
          type="text"
          placeholder="Additional Info"
          value={extraData.additional_info}
          onChange={(e) =>
            setExtraData({ ...extraData, additional_info: e.target.value })
          }
          className="w-full bg-white text-gray-800 py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
        />

        <input
          type="date"
          placeholder="Tentative Date"
          value={extraData.tentative_date}
          onChange={(e) =>
            setExtraData({ ...extraData, tentative_date: e.target.value })
          }
          min={new Date().toISOString().split("T")[0]}
          className="w-full bg-white text-gray-800 py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
        />

        {/* Select Type of Move */}
        <select
          value={extraData.type_of_move}
          onChange={(e) =>
            setExtraData({ ...extraData, type_of_move: e.target.value })
          }
          className="w-full bg-white text-gray-800 py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
        >
          <option value="">Type of Move</option>
          <option value="home">Home move</option>
          <option value="apartment">Apartment move</option>
          <option value="commercial">Commercial move</option>
          <option value="store">Store move</option>
          <option value="warehouse">Warehouse move</option>
          <option value="item">Item move</option>
        </select>

        {/* Select Size of Move */}
        <select
          value={extraData.size_of_move}
          onChange={(e) =>
            setExtraData({ ...extraData, size_of_move: e.target.value })
          }
          className="w-full bg-white text-gray-800 py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
        >
          <option value="">Size of Move</option>
          <option value="studio">Studio</option>
          <option value="1_bedroom">1 bedroom</option>
          <option value="2_bedrooms">2 bedrooms</option>
          <option value="3_bedrooms">3 bedrooms</option>
          <option value="4+_bedrooms">4+ bedrooms</option>
        </select>

        {error && <p className="text-red-600 text-sm md:col-span-2">{error}</p>}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-[#0F6F7C] text-white font-bold py-3 px-6 rounded-full hover:bg-teal-700 transition-colors duration-300 text-lg"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            SEND
          </button>
        </div>
      </form>
      <SuccessModal
        show={showSuccessModal}
        title="Thank you for your quote!"
        message="You will shortly receive the information in your email."
        onClose={() => window.location.reload()}
      />
    </>
  );
};

export default SecondForm;
