import { useEffect, useRef, useState } from "react";
import banner from "../../../public/assets/team.png";

export default function FamilyDreamComponent() {
  const [isVisible, setIsVisible] = useState({
    title: false,
    card: false,
    textLeft: false,
    textRight: false,
    subtitle: false,
  });

  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = (entry.target as HTMLElement).dataset.id;
          if (id) {
            setIsVisible((prev) => ({ ...prev, [id]: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const refs = [
      { ref: titleRef, id: "title" },
      { ref: cardRef, id: "card" },
      { ref: textLeftRef, id: "textLeft" },
      { ref: textRightRef, id: "textRight" },
      { ref: subtitleRef, id: "subtitle" },
    ];

    refs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#C9E1EC] px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main title */}
        <h1
          ref={titleRef}
          data-id="title"
          className={`text-4xl md:text-5xl font-semibold text-gray-900 text-center my-8 transition-all duration-1000 ${
            isVisible.title
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          It started as a family dream
        </h1>

        {/* Card with image */}
        <div
          ref={cardRef}
          data-id="card"
          className={`relative rounded-3xl overflow-hidden shadow-2xl mb-8 transition-all duration-1000 delay-200 ${
            isVisible.card
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          {/* Badge "Our journey" */}
          <div className="absolute top-6 left-6 z-10">
            <span
              className={`bg-[#F4D35E] text-gray-900 px-4 py-2 rounded-full text-sm font-medium inline-block transition-all duration-700 delay-500 ${
                isVisible.card
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              Our journey
            </span>
          </div>

          {/* Imported image */}
          <div className="relative">
            <img
              src={banner}
              alt="Safe box"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Descriptive text section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div
            ref={textLeftRef}
            data-id="textLeft"
            className={`text-gray-700 leading-relaxed transition-all duration-1000 ${
              isVisible.textLeft
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <p>
              Throughout the years we have grown, our story belongs to our
              purpose as a family.
            </p>
          </div>
          <div
            ref={textRightRef}
            data-id="textRight"
            className={`text-gray-700 leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible.textRight
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <p>
              The dream of taking our home to a new beginning loaded with dreams
              and illusions.
            </p>
          </div>
        </div>

        {/* "It started with a move" section */}
        <div className="text-center">
          <h2
            ref={subtitleRef}
            data-id="subtitle"
            className={`text-2xl md:text-3xl font-semibold text-gray-900 transition-all duration-1000 ${
              isVisible.subtitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            It started with a move
          </h2>
        </div>
      </div>
    </div>
  );
}