import React, { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
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
  const originAutoRef = useRef<any>(null);
  const destAutoRef = useRef<any>(null);
  const originBoundsRef = useRef<google.maps.LatLngBounds | null>(null);
  const VA_CENTER = { lat: 37.4316, lng: -78.6569 };
  const MILES_TO_METERS = 1609.34;
  const ORIGIN_RADIUS_METERS = 100 * MILES_TO_METERS;

  const onLoadOrigin = (ac: any) => {
    originAutoRef.current = ac;

    const circle = new google.maps.Circle({
      center: VA_CENTER,
      radius: ORIGIN_RADIUS_METERS,
    });
    const bounds = circle.getBounds();
    originBoundsRef.current = bounds || null;

    ac.setBounds(bounds || undefined);
    ac.setOptions({
      strictBounds: true,
    });
  };

  const onLoadDest = (ac: any) => {
    destAutoRef.current = ac;
  };

  const onPlaceChangedOrigin = () => {
    const place = originAutoRef.current?.getPlace();
    if (!place) return;
    const address =
      place.formatted_address || place.name || personData.origin_address;

    setPersonData((prev) => ({
      ...prev,
      origin_address: address,
    }));
  };

  const onPlaceChangedDest = () => {
    const place = destAutoRef.current?.getPlace();
    if (!place) return;
    const address =
      place.formatted_address || place.name || personData.destination_address;

    setPersonData((prev) => ({
      ...prev,
      destination_address: address,
    }));
  };

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

      {/* DESTINO con Autocomplete */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <Autocomplete
          onLoad={onLoadDest}
          onPlaceChanged={onPlaceChangedDest}
          options={{
            componentRestrictions: { country: "US" },
            fields: ["formatted_address", "geometry", "name"],
            types: ["geocode"],
          }}
        >
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
        </Autocomplete>
      </div>

      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <Autocomplete
          onLoad={onLoadOrigin}
          onPlaceChanged={onPlaceChangedOrigin}
          options={{
            componentRestrictions: { country: "US" },
            fields: ["formatted_address", "geometry", "name"],
            types: ["geocode"],
            bounds: originBoundsRef.current || undefined,
            strictBounds: true,
          }}
        >
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
        </Autocomplete>
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
