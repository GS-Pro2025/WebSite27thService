import React, { useState } from "react";
import { FaUser, FaPhoneAlt, FaSearch } from "react-icons/fa";

interface FirstFormProps {
  personData: {
    full_name: string;
    phone_number: string;
    destination_address: string;
    origin_address: string;
  };
  setPersonData: React.Dispatch<
    React.SetStateAction<{
      full_name: string;
      phone_number: string;
      destination_address: string;
      origin_address: string;
    }>
  >;
  goNext: () => void;
}

const FirstForm: React.FC<FirstFormProps> = ({
  personData,
  setPersonData,
  goNext,
}) => {
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !personData.full_name.trim() ||
      !personData.phone_number.trim() ||
      !personData.destination_address.trim() ||
      !personData.origin_address.trim()
    ) {
      setError("Please complete all fields before continuing.");
      return;
    }

    setError("");
    goNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div className="relative">
        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="name"
          value={personData.full_name}
          onChange={(e) =>
            setPersonData({ ...personData, full_name: e.target.value })
          }
          className="w-full bg-white text-gray-800 py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
        />
      </div>

      <div className="relative">
        <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="number"
          value={personData.phone_number}
          onChange={(e) =>
            setPersonData({ ...personData, phone_number: e.target.value })
          }
          className="w-full bg-white text-gray-800 py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
        />
      </div>

      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="destination"
          value={personData.destination_address}
          onChange={(e) =>
            setPersonData({
              ...personData,
              destination_address: e.target.value,
            })
          }
          className="w-full bg-white text-gray-800 py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
        />
      </div>

      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="origin"
          value={personData.origin_address}
          onChange={(e) =>
            setPersonData({
              ...personData,
              origin_address: e.target.value,
            })
          }
          className="w-full bg-white text-gray-800 py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
        />
      </div>

      {error && <p className="text-red-600 text-sm md:col-span-2">{error}</p>}

      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-[#FFE67B] text-[#0E6F7E] font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition-colors duration-300 text-3xl"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Your Coverage
        </button>
      </div>
    </form>
  );
};

export default FirstForm;
