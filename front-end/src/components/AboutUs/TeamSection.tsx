import React from "react";
import juliePhoto from "/assets/julie.png";
import andresPhoto from "/assets/andres.png";
import teamPhoto from "/assets/team.png";

type Member = {
  name: string;
  role: string;
  photoSrc?: string;
  roleClass?: string;
};

const TEAM: Member[] = [
  {
    name: "Julie Perilla",
    role: "CEO",
    photoSrc: juliePhoto,
    roleClass: "text-[#FFE67B]",
  },
  {
    name: "Andres Londoño",
    role: "CEO",
    photoSrc: andresPhoto,
    roleClass: "text-[#FFE67B]",
  },
];

const TeamCard: React.FC<Member> = ({ name, role, photoSrc, roleClass }) => (
  <div className="flex flex-col items-center gap-3">
    {/* Marco para la foto */}
    <div className="w-auto h-[220px] sm:h-[280px] lg:h-[320px] aspect-square rounded-2xl bg-white shadow-lg overflow-hidden">
      {photoSrc ? (
        <img
          src={photoSrc}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div
          className="w-full h-full bg-neutral-200"
          aria-label="Placeholder"
        />
      )}
    </div>

    {/* Rol arriba */}
    <p
      className={`font-extrabold uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl ${roleClass}`}
    >
      {role}
    </p>

    {/* Nombre abajo */}
    <p className="text-[#003D4D] font-semibold text-lg sm:text-xl lg:text-2xl -mt-2">
      {name}
    </p>
  </div>
);

const TeamSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Sección principal con degradado */}
      <div className="bg-gradient-to-r from-[#7AACAE] via-[#B8CFA0] to-[#F5ECC8]">
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
          {/* Título centrado */}
          <h2 className="text-center text-[#0E6F7E] font-extrabold tracking-wide text-3xl sm:text-4xl lg:text-5xl mb-12 lg:mb-16">
            OUR TEAM
          </h2>

          {/* Grid: foto grande centro + 2 CEOs a los lados */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center">
            {/* CEO Izquierda */}
            <div className="flex justify-center lg:justify-end">
              <TeamCard {...TEAM[0]} />
            </div>

            {/* Foto grande central - más ancha */}
            <div className="flex justify-center">
              <div className="w-auto h-[240px] sm:h-[300px] lg:h-[380px] aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={teamPhoto}
                  alt="Team photo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* CEO Derecha */}
            <div className="flex justify-center lg:justify-start">
              <TeamCard {...TEAM[1]} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer con texto descriptivo */}
      <div className="bg-[#D9D9D9] py-8 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[#2D2A26] text-xl sm:text-xl lg:text-2xl leading-relaxed">
            Our dream began with two people who believe in the power of doing things with love and dedication. That's why we have put each of our values and ideals into this company, with the goal of building a professional team that shares our vision.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;