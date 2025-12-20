import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SecondFormProps {
  extraData: {
    email: string;
    address: string;
    additional_info: string;
    tentative_date: Date | null;
    type_of_move: string;
    size_of_move: string;
  };
  setExtraData: React.Dispatch<
    React.SetStateAction<{
      email: string;
      address: string;
      additional_info: string;
      tentative_date: Date | null;
      type_of_move: string;
      size_of_move: string;
    }>
  >;
  goNext: () => void;
}

const SecondForm: React.FC<SecondFormProps> = ({
  extraData,
  setExtraData,
  goNext,
}) => {
  const [error, setError] = useState("");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(extraData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!extraData.address.trim()) {
      setError("Postal code is required.");
      return;
    }
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    if (!extraData.tentative_date) {
      setError("Tentative date is required.");
      return;
    }

    if (extraData.tentative_date <= todayStart) {
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
    goNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <input
        type="email"
        placeholder="Email"
        value={extraData.email}
        onChange={(e) => setExtraData({ ...extraData, email: e.target.value })}
        className="w-full bg-white text-gray-800 py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
      />
      <input
        type="text"
        placeholder="Postal code"
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
      <DatePicker
        selected={extraData.tentative_date}
        onChange={(date) =>
          setExtraData({ ...extraData, tentative_date: date })
        }
        minDate={(() => {
          const d = new Date();
          d.setHours(0, 0, 0, 0);
          d.setDate(d.getDate() + 1);
          return d;
        })()}
        placeholderText="Tentative Date"
        dateFormat="yyyy-MM-dd"
        className="w-full bg-white text-gray-800 py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
      />

      <select
        value={extraData.type_of_move}
        onChange={(e) =>
          setExtraData({ ...extraData, type_of_move: e.target.value })
        }
        className="w-full bg-white text-gray-800 py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE67B]"
      >
        <option value="" disabled>
          type of move
        </option>
        <option value="home">Home move</option>
        <option value="apartment">Apartment move</option>
        <option value="commercial">Commercial move</option>
        <option value="store">Store move</option>
        <option value="warehouse">Warehouse move</option>
        <option value="item">Item move</option>
      </select>

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
          Continue
        </button>
      </div>
    </form>
  );
};

export default SecondForm;
