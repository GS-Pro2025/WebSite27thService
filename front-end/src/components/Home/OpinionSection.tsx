/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import FormCobertura from "../FormCover";
import TestimonialCard from "../TestimonialCard";
import RatingSection from "../RatingSection";
import banner8 from "/assets/banner8.2.svg";
import globo from "/assets/globo.svg";
import linea from "/assets/Linea.svg";
import logoSimple from "/assets/logo_simple.png";
import { getComments, type CommentResponse } from "../../hooks/CommentService";

const testimonialsData = [
  {
    id: 1,
    text: "I can always find what I'm looking for on Splice, whether it's the exact sound I want or just a bit of inspiration.",
    rating: 5,
    containerClassName:
      "absolute top-25 right-20 w-auto max-w-[180px] sm:max-w-[220px] lg:max-w-[430px] xl:max-w-[600px] z-30",
  },
  {
    id: 2,
    text: "Finally a way to buy plugins that works. By paying a little at a time, producers can get legit access to the top VSTs.",
    rating: 4,
    containerClassName:
      "absolute top-110 right-100 w-auto max-w-[180px] sm:max-w-[220px] lg:max-w-[430px] xl:max-w-[600px] z-30",
  },
  {
    id: 3,
    text: "Its been fun to drive into Splices creator community and explore tools that support my own creative process.",
    rating: 5,
    containerClassName:
      "absolute top-50 right-160 w-auto max-w-[180px] sm:max-w-[220px] lg:max-w-[430px] xl:max-w-[600px] z-30",
  },
  {
    id: 4,
    text: "Splice is a necessity for any producer. The value of the sounds and inspiration is immeasurable.",
    rating: 5,
    containerClassName:
      "absolute top-85 right-40 w-auto max-w-[180px] sm:max-w-[220px] lg:max-w-[430px] xl:max-w-[600px] z-30",
  },
];

type TestimonialItem = {
  id: string | number;
  text: string;
  rating?: number;
  containerClassName: string;
};

const OpinionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedTestimonials, setDisplayedTestimonials] = useState<TestimonialItem[]>(testimonialsData);
  const [allComments, setAllComments] = useState<CommentResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // page of 4 comments
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  console.log("loadingComments:", loadingComments);
  console.log("commentsError:", commentsError);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadComments = async () => {
      setLoadingComments(true);
      setCommentsError(null);
      try {
        console.log("Fetching comments from backend...");
        const comments = await getComments(); // returns CommentResponse[]
        console.log("Comments received:", comments);
        // store all comments and reset page
        if (mounted) {
          setAllComments(comments);
          setCurrentPage(0);
        }
      } catch (err: any) {
        console.error("Error loading comments:", err);
        console.error("Error details:", err?.response?.data);
        console.error("Error status:", err?.response?.status);
        if (mounted) {
          setCommentsError(err?.message || "Failed to load comments");
          // fallback to original testimonials (first 4)
          console.log("Using fallback testimonials");
          setDisplayedTestimonials(testimonialsData.slice(0, 4));
        }
      } finally {
        if (mounted) setLoadingComments(false);
      }
    };

    loadComments();
    return () => {
      mounted = false;
    };
  }, []);

  // rotate pages every 10s when there are more than 4 comments
  useEffect(() => {
    if (!allComments || allComments.length <= 4) return;
    const pages = Math.ceil(allComments.length / 4);
    const id = setInterval(() => {
      setCurrentPage((p) => (p + 1) % pages);
    }, 10000);
    return () => clearInterval(id);
  }, [allComments]);

  // compute displayedTestimonials whenever allComments or currentPage changes
  useEffect(() => {
    if (!allComments || allComments.length === 0) return;
    const start = currentPage * 4;
    const slice = allComments.slice(start, start + 4);

    const mappedFromBackend: TestimonialItem[] = slice.map((c, i) => ({
      id: c.id,
      text: c.message,
      rating: c.rating ?? 5,
      containerClassName:
        testimonialsData[i]?.containerClassName || testimonialsData[i % testimonialsData.length].containerClassName,
    }));

    // If fewer than 4 items in slice, fill with fallback (no duplicates)
    const usedTexts = new Set(mappedFromBackend.map((t) => t.text));
    const fallback: TestimonialItem[] = [];
    for (const t of testimonialsData) {
      if (mappedFromBackend.length + fallback.length >= 4) break;
      if (!usedTexts.has(t.text)) {
        fallback.push({
          id: `fallback-${t.id}`,
          text: t.text,
          rating: t.rating,
          containerClassName: t.containerClassName,
        });
        usedTexts.add(t.text);
      }
    }

    const finalList = [...mappedFromBackend, ...fallback].slice(0, 4);
    setDisplayedTestimonials(finalList);
  }, [allComments, currentPage]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#0E6F7E] z-30 overflow-hidden h-[68vh] sm:h-[130vh] md:h-[80vh] lg:h-[180vh] xl:h-[203vh] -mt-[50px] sm:-mt-[90px] md:-mt-[70px] lg:-mt-[180px] xl:-mt-[128px]"
    >
      {/* Fondo con textura */}
      <img
        src={banner8}
        alt="Fondo con textura curvada"
        className="block w-[110%] max-w-none md:w-[103%] lg:w-[160%] xl:w-[105%] -ml-4 object-contain"
      />
      
      {/* Título superior con animación */}
      <div 
        className={`absolute top-[10%] left-0 right-0 z-30 px-4 transition-all duration-1000 ease-out ${
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-10"
        }`}
      >
        <h2 className="text-white font-[Montserrat] font-semibold leading-tight text-[15px] sm:text-[28px] md:text-[30px] lg:text-[40px] xl:text-[42px]">
          <span className="block text-center">We arrive where</span>
          <span className="block text-center text-[#FFE67B]">
            your next chapter begins
          </span>
        </h2>
      </div>

      {/* Formulario de cobertura con animación desde la izquierda */}
      <div 
        className={`absolute top-[20%] sm:top-[20%] md:top-[23%] lg:top-[20%] left-[3%] sm:left-[6%] z-30 w-[50%] sm:w-[50%] md:w-[45%] lg:w-[35%] xl:w-[35%] p-3 sm:p-4 md:p-6 bg-white rounded-lg sm:rounded-xl shadow-lg transition-all duration-1000 ease-out hover:shadow-2xl ${
          isVisible 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 -translate-x-20"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <FormCobertura />
      </div>

      {/* Container del Globo */}
      <div 
        className={`absolute right-[-3%] top-[20%] md:right-[-3%] md:top-[25%] lg:right-[20%] lg:top-[100%] xl:right-[-3%] xl:top-[27.5%] transform -translate-y-1/2 z-20 pointer-events-none transition-all duration-1500 ease-out ${
          isVisible 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-75"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        {/* Globo terráqueo giratorio */}
        <div className="animate-[spin_60s_linear_infinite]">
          <img
            src={globo}
            alt="Globo terráqueo"
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] xl:w-[800px] xl:h-[800px] object-contain opacity-90"
          />
        </div>
      </div>

      {/* Testimonios distribuidos en la parte superior derecha */}
      <div className="absolute top-[15%] right-0 w-[70%] h-[70%] pointer-events-auto">
        {displayedTestimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`transition-all duration-700 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-10"
            }`}
            style={{ 
              transitionDelay: `${600 + (index * 150)}ms` 
            }}
          >
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>

      {/* Línea decorativa con animación */}
      <div 
        className={`absolute bottom-[35%] md:bottom-[35%] lg:bottom-[35%] left-0 w-full z-10 transition-all duration-1000 ease-out ${
          isVisible 
            ? "opacity-100 scale-x-100" 
            : "opacity-0 scale-x-75"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <img
          src={linea}
          alt="Línea decorativa"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Logo con animación de fade y escala */}
      <div 
        className={`absolute bottom-[14%] md:bottom-[13%] lg:bottom-[6%] left-[-1%] md:left-[-1%] lg:left-[-0.9%] z-15 opacity-95 transition-all duration-1000 ease-out ${
          isVisible 
            ? "opacity-95 scale-100" 
            : "opacity-0 scale-90"
        }`}
        style={{ transitionDelay: "1000ms" }}
      >
        <img
          src={logoSimple}
          alt="Logo"
          className="w-36 h-36 sm:w-70 sm:h-70 md:w-75 md:h-75 lg:w-28 lg:h-28 xl:w-[600px] xl:h-[600px] object-contain"
        />
      </div>

      {/* Sección de calificación con animación desde abajo */}
      <div
        className={`absolute bottom-[3%] sm:bottom-[13%] md:bottom-[7%] lg:bottom-[6%] right-[-260px] transform 
          -translate-x-1/2 z-50 w-[95%] sm:w-[85%] md:w-[65%] lg:w-[50%] max-w-2xl transition-all duration-1000 ease-out ${
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: "1200ms" }}
      >
        <RatingSection className="" />
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default OpinionSection;