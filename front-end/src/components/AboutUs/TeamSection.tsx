import React from "react";

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
    photoSrc: "/assets/team/julie.jpg",
    roleClass: "text-[#FFE67B]",
  },
  {
    name: "Andres Londoño",
    role: "CEO",
    photoSrc: "/assets/team/andres.jpg",
    roleClass: "text-[#0E6F7E]",
  },
];

const TeamCard: React.FC<Member> = ({ name, role, photoSrc, roleClass }) => (
  <div className="flex flex-col items-center gap-3">
    {/* Marco para la foto */}
    <div className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-3xl bg-white/85 shadow-[0_6px_20px_rgba(0,0,0,0.15)] overflow-hidden">
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

    {/* Nombre + Rol */}
    <div className="text-center">
      <p className="text-[#585858] font-semibold leading-none text-xl sm:text-2xl">
        {name}
      </p>
      <p
        className={`font-extrabold uppercase tracking-wide -mt-0.5 text-xl sm:text-3xl ${roleClass}`}
      >
        {role}
      </p>
    </div>
  </div>
);

const TeamSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Barra superior clara con el título */}
      <div className="w-full bg-gradient-to-r from-[#9bb5b9] to-[#e5e1ce]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h2 className="text-center text-[#0E6F7E] font-extrabold tracking-wide text-2xl sm:text-3xl">
            OUR TEAM
          </h2>
        </div>
      </div>

      {/* Faja central con el degradado principal */}
      <div className="w-full bg-[linear-gradient(90deg,#002C3D_0%,#0E6F7E_45%,#FFE67B_80%,#FFF7E6_100%)]">
        <div className="max-w-6xl mx-auto px-6 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 place-items-center">
            {TEAM.map((m) => (
              <TeamCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </div>

      {/* Franja inferior de texto (fondo claro/translúcido) */}
      <div className="w-full bg-gradient-to-r from-[#9bb5b9] to-[#e5e1ce]">
        <div className="max-w-6xl mx-auto px-6 py-5 text-center text-sm sm:text-base text-[#2D2A26]">
          <p>
            Our dream began with two people who believe in the power of{" "}
            <strong className="font-semibold">
              doing things with love and dedication
            </strong>
            , which is why we have put each of our values and ideals into this
            company and the goal of having a{" "}
            <strong className="font-semibold">
              professional team that shares our vision
            </strong>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
