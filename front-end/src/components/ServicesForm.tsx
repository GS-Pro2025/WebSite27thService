import React from "react";
import { Package, Box, Truck, ClipboardList, Boxes } from "lucide-react";

type ServiceKey = "pack" | "wrap" | "load" | "unload" | "unpack" | "home_org";

const ALL_SERVICES: { key: ServiceKey; label: string; Icon: React.FC<any> }[] =
  [
    { key: "pack", label: "Pack", Icon: Package },
    { key: "wrap", label: "Wrap", Icon: Boxes },
    { key: "load", label: "Load", Icon: Truck },
    { key: "unload", label: "Unload", Icon: Truck },
    { key: "unpack", label: "Unpack", Icon: Box },
    { key: "home_org", label: "Home Organization", Icon: ClipboardList },
  ];

interface ServicesFormProps {
  selected: ServiceKey[];
  setSelected: React.Dispatch<React.SetStateAction<ServiceKey[]>>;
  onSubmit: () => void;
  disabledServices?: ServiceKey[];
}

const ServicesForm: React.FC<ServicesFormProps> = ({
  selected,
  setSelected,
  onSubmit,
  disabledServices = [],
}) => {
  const toggle = (key: ServiceKey) => {
    if (disabledServices.includes(key)) return;
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h3 className="text-[#FFE67B] font-bold text-xl">
          Build your service package
        </h3>
        <p className="text-white">Select the services you need</p>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ALL_SERVICES.map(({ key, label, Icon }) => {
          const active = selected.includes(key);
          const disabled = disabledServices.includes(key);

          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              disabled={disabled}
              className={[
                "group w-full rounded-2xl text-left px-4 py-4 transition-all border shadow-sm flex items-center gap-3",
                disabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                  : active
                  ? "bg-white border-[#FFE67B] ring-2 ring-[#FFE67B]"
                  : "bg-[#E9EFF5] border-transparent hover:bg-white hover:border-[#FFE67B]/60",
              ].join(" ")}
            >
              <input
                type="checkbox"
                checked={active}
                readOnly
                disabled={disabled}
                className="h-5 w-5 rounded-md accent-[#FFE67B] border-slate-300"
              />
              <span
                className={[
                  "inline-flex items-center gap-2 font-medium",
                  active
                    ? "text-[#0E6F7E]"
                    : disabled
                    ? "text-gray-400"
                    : "text-slate-700",
                ].join(" ")}
              >
                <Icon className="h-5 w-5 opacity-80" />
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Botón continuar */}
      <div>
        <button
          type="submit"
          className="w-full bg-[#FFE67B] text-[#0E6F7E] font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default ServicesForm;
