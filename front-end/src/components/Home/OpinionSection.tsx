import FormCobertura from "../FormCover";
import TestimonialCard from "../TestimonialCard";
import RatingSection from "../RatingSection";

const testimonialsData = [
  {
    id: 1,
    text: "I can always find what I'm looking for on Splice, whether it's the exact sound I want or just a bit of inspiration.",
    containerClassName:
      "absolute top-[16%] left-[50%] md:left-[15%] lg:left-[20%] w-auto max-w-[130px] sm:max-w-[160px] lg:max-w-[200px]",
  },
  {
    id: 2,
    text: "Finally a way to buy plugins that works. By paying a little at a time, producers can get legit access to the top VSTs.",
    containerClassName:
      "hidden lg:block absolute top-[16%] right-[22%] w-auto max-w-[190px]",
  },
  {
    id: 3,
    text: "Its been fun to drive into Splices creator community and explore tools that support my own creative process.",
    containerClassName:
      "hidden lg:block absolute bottom-[35%] left-[22%] w-auto max-w-[210px]",
  },
  {
    id: 4,
    text: "Splice is a necessity for any producer. The value of the sounds and inspiration is immeasurable.",
    containerClassName:
      "hidden md:block absolute bottom-[25%] right-[10%] md:bottom-[20%] lg:bottom-[35%] lg:right-[15%] w-auto max-w-[130px] sm:max-w-[160px] lg:max-w-[200px]",
  },
];

const OpinionSection = () => {
  return (
    <section className="relative w-full z-30 overflow-hidden h-[68vh] sm:h-[130vh] md:h-[80vh] lg:h-[180vh] xl:h-[203vh] -mt-[50px] sm:-mt-[90px] md:-mt-[70px] lg:-mt-[180px] xl:-mt-[128px]">
      {/* Fondo con textura */}
      <img
        src="/assets/banner8.2.svg"
        alt="Fondo con textura curvada"
        className="block w-[110%] max-w-none md:w-[103%] lg:w-[160%] xl:w-[105%] -ml-4 object-contain"
      />
      {/* Título superior */}
      <div className="absolute top-[10%] left-[2%] z-30 px-4">
        <h2 className="text-white font-[Montserrat] font-semibold leading-tight text-[15px] sm:text-[28px] md:text-[30px] lg:text-[40px] xl:text-[42px]">
          <span className="block text-center">We arrive where</span>
          <span className="block text-center text-[#FFE67B]">
            your next chapter begins
          </span>
        </h2>
      </div>

      <div className="absolute top-[20%] sm:top-[20%] md:top-[23%] lg:top-[20%] left-[3%] sm:left-[6%] z-20 w-[50%] sm:w-[50%] md:w-[45%] lg:w-[35%] xl:w-[35%] p-3 sm:p-4 md:p-6 bg-white rounded-lg sm:rounded-xl shadow-lg">
        <FormCobertura />
      </div>

      {/* Globo con opiniones*/}
      <div className="absolute right-[-3%] top-[20%] md:right-[-3%] md:top-[25%] lg:right-[20%] lg:top-[100%] xl:right-[-3%] xl:top-[27.5%] transform -translate-y-1/2 z-20">
        <img
          src="/assets/globo.png"
          alt="Globo terráqueo"
          className="w-90 h-90 md:w-110 md:h-110 lg:w-96 lg:h-96 xl:w-[50rem] xl:h-[50rem] object-contain"
        />
        {testimonialsData.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>

      {/* Línea decorativa */}
      <div className="absolute bottom-[35%] md:bottom-[35%] lg:bottom-[35%] left-0 w-full z-20">
        <img
          src="/assets/Linea.svg"
          alt="Línea decorativa"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Logo */}
      <div className="absolute bottom-[14%] md:bottom-[13%] lg:bottom-[6%] left-[-1%] md:left-[-1%] lg:left-[-0.9%] z-20">
        <img
          src="/assets/logo_simple.png"
          alt="Logo"
          className="w-36 h-36 sm:w-70 sm:h-70 md:w-75 md:h-75 lg:w-28 lg:h-28 xl:w-[600px] xl:h-[600px] object-contain"
        />
      </div>

      {/* Sección de calificación (Componente) */}
      <RatingSection className="absolute bottom-[3%] sm:bottom-[13%] md:bottom-[7%] lg:bottom-[6%] right-[-260px] transform -translate-x-1/2 z-30 w-[95%] sm:w-[85%] md:w-[65%] lg:w-[50%] max-w-2xl" />
    </section>
  );
};

export default OpinionSection;
