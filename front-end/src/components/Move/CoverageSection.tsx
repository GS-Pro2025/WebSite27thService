import React, { useEffect, useMemo, useState } from "react";
import FirstForm from "../FirstForm";
import SecondForm from "../SecondForm";
import ServicesForm from "../ServicesForm";
import api from "../../api/axiosInstance";
import SuccessModal from "../SuccessModal";
import { ArrowRight } from "lucide-react";

type ServiceKey = "pack" | "wrap" | "load" | "unload" | "unpack" | "home_org";

const SERVICE_NAME_BY_KEY: Record<ServiceKey, string> = {
  pack: "Pack",
  wrap: "Wrap",
  load: "Load",
  unload: "Unload",
  unpack: "Unpack",
  home_org: "Home Organization",
};

const CoverageSection: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const [personData, setPersonData] = useState({
    full_name: "",
    phone_number: "",
    destination_address: "",
    origin_address: "",
  });

  const [extraData, setExtraData] = useState({
    email: "",
    address: "",
    additional_info: "",
    tentative_date: "",
    type_of_move: "",
    size_of_move: "",
  });

  const [selectedServices, setSelectedServices] = useState<ServiceKey[]>([]);

  const [servicesCatalog, setServicesCatalog] = useState<
    { service_id: number; name: string; base_price: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/services");
        setServicesCatalog(data || []);
      } catch (err) {
        console.error("Error loading services catalog:", err);
      }
    })();
  }, []);

  const serviceIdByName = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of servicesCatalog) map.set(s.name, s.service_id);
    return map;
  }, [servicesCatalog]);

  const handleFinalSubmit = async () => {
    try {
      // 1) Crear person
      const personRes = await api.post("/persons", {
        full_name: personData.full_name,
        email: extraData.email,
        phone_number: personData.phone_number,
        address: extraData.address,
        additional_info: extraData.additional_info,
      });
      const createdPerson = personRes.data;

      //move
      const moveRes = await api.post("/moves", {
        person_id: createdPerson.person_id,
        status: "pending",
        tentative_date: extraData.tentative_date,
        origin_address: personData.origin_address,
        destination_address: personData.destination_address,
      });
      const createdMove = moveRes.data;

      //move-items
      let bedrooms = 0;
      switch (extraData.size_of_move) {
        case "1_bedroom":
          bedrooms = 1;
          break;
        case "2_bedrooms":
          bedrooms = 2;
          break;
        case "3_bedrooms":
          bedrooms = 3;
          break;
        case "4+_bedrooms":
          bedrooms = 4;
          break;
        default:
          bedrooms = 0;
      }

      const promises: Promise<any>[] = [];

      promises.push(
        api.post("/move-items", {
          move_id: createdMove.move_id,
          description: extraData.type_of_move,
          quantity: 1,
        })
      );

      if (bedrooms > 0) {
        promises.push(
          api.post("/move-items", {
            move_id: createdMove.move_id,
            description: "bedroom",
            quantity: bedrooms,
          })
        );
      }

      // 4) Crear move-services
      for (const key of selectedServices) {
        const serviceName = SERVICE_NAME_BY_KEY[key];
        const serviceId = serviceIdByName.get(serviceName);
        if (serviceId) {
          promises.push(
            api.post("/move-services", {
              move_id: createdMove.move_id,
              service_id: serviceId,
              quantity: 1,
            })
          );
        } else {
          console.warn(`No service_id found for ${serviceName}`);
        }
      }

      await Promise.all(promises);

      setShowSuccess(true);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <section className="relative py-16 md:py-28 px-4 sm:px-6 lg:px-8 text-white bg-cover bg-center z-20 -mt-15 md:-mt-35">
      <div className="absolute inset-0 z-0">
        <img
          src="assets/banner10.svg"
          alt="Coverage map"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 mt-40">
        <img
          src="assets/banner11.svg"
          alt="Coverage map"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto relative z-10 -mt-16">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#0F6F7C]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            COVERAGE
          </h2>
          <p
            className="text-2xl md:text-3xl font-semibold text-[#FFE67B] mt-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            We want to go with you where you need us
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8">
          <div className="w-full lg:w-3/12 bg-white/30 px-6 py-28 rounded-3xl space-y-8 mt-10">
            <h3 className="text-white text-xl font-bold">
              1. Does your move originate in Virginia?
            </h3>
            <p className="text-white text-base font-light">
              If you're located here, our moving service can travel with you to
              any state in the country.
            </p>
            <h3 className="text-white text-xl font-bold mt-6">
              2. Does your move start in another state?
            </h3>
            <p className="text-white text-base font-light">
              We have coverage for states near Virginia. Use our wizard to see
              if you're within our coverage area.
            </p>
          </div>

          <div className="w-full lg:w-7/12 lg:-mt-5">
            <div className="flex items-center justify-center text-3xl md:text-4xl font-bold text-white mb-8">
              <ArrowRight className="text-[#FFE67B] w-15 h-15 mr-8" />
              <h1>Check your coverage HERE</h1>
            </div>

            {step === 1 && (
              <FirstForm
                personData={personData}
                setPersonData={setPersonData}
                goNext={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <SecondForm
                extraData={extraData}
                setExtraData={setExtraData}
                goNext={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <ServicesForm
                selected={selectedServices}
                setSelected={setSelectedServices}
                onSubmit={handleFinalSubmit}
              />
            )}
          </div>
        </div>
      </div>
      <SuccessModal
        show={showSuccess}
        title="Request successful"
        message="Your request has been submitted successfully. You will receive more information in your email."
        onClose={() => window.location.reload()}
      />
    </section>
  );
};

export default CoverageSection;
