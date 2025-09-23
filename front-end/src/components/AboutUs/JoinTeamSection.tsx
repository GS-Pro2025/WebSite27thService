import React from "react";

const JOBS = ["PACKERS", "DRIVERS", "ASSISTANTS"];

const JoinTeamSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#C6D7CE_0%,#DCE3D7_55%,#FFF7E6_100%)]">
      {/* Esquina superior izquierda decorativa */}

      <div className="max-w-6xl mx-auto px-6 pt-10 pb-14">
        <div className="relative w-screen left-1/2 -translate-x-1/2">
          <div className="rounded-2xl px-6 py-3 md:py-6 bg-[linear-gradient(90deg,#002C3D_0%,#0E6F7E_45%,#FFE67B_80%,#FFF7E6_100%)]">
            <h2 className="text-white text-2xl md:text-4xl font-extrabold tracking-wide text-center">
              BE PART OF THE TEAM
            </h2>
          </div>
        </div>

        {/* Subtítulo */}
        <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
          If you share our dream and desire to work on bringing new beginnings to life,
          write to us.
        </p>

        {/* Cargos */}
        <h3 className="text-center text-[#0E6F7E] font-extrabold text-xl md:text-2xl mt-6">
          AVAILABLE POSITIONS
        </h3>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 place-items-center">
          {JOBS.map((t) => (
            <div
              key={t}
              className="bg-white rounded-[28px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-black/10 w-64 h-40 flex items-center justify-center"
            >
              <span className="text-[#0E6F7E] font-extrabold tracking-wide">
                {t}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="#aplica"
            className="mt-7 inline-block bg-[#FFE67B] text-[#0E6F7E] font-extrabold rounded-full px-8 py-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition"
          >
            APPLY HERE
          </a>
        </div>
      </div>
    </section>
  );
};

export default JoinTeamSection;
