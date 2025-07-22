import React from 'react';
import { BiLike, BiShare } from 'react-icons/bi';

const OpinionSection: React.FC = () => {

  const testimonials = [
    {
      id: 1,
      name: "Dolores",
      location: "Local Guide • 16 reseñas",
      rating: 5,
      timeAgo: "Hace 3 días",
      comment: "Muy contento del trato y la experiencia de compra que ofrecen en esta empresa. Actualmente de lo mejor que se puede encontrar en España que ofrece este servicio. Además muchísimo muy serviciales.",
      likes: 1,
      avatar: "D"
    },
    {
      id: 2,
      name: "Dolores Pérez Carrasco",
      location: "Local Guide • 16 reseñas",
      rating: 5,
      timeAgo: "Hace 4 meses",
      comment: "A la espera de que me llegué el próximo lote que he comprado. Esperaré en torno a año para que me llegue. Hay de todo pero se verdad que hay cosas caras pero todo. Te pagan. Y las cosas que no están del todo bien te tienen ojo al...",
      likes: 1,
      avatar: "D"
    },
    {
      id: 3,
      name: "Jesús González Martínez",
      location: "Local Guide • 49 reseñas",
      rating: 5,
      timeAgo: "Hace 4 meses",
      comment: "Reconozco que compré un palet de devoluciones de Amazon de productos del hogar con miedo, por lo que fueron. Se haber pactado en el estado junto al personal que estaban listos para atenderme muy grande. Muchas gracias!",
      likes: 1,
      avatar: "J"
    }
  ];

  return (
    <div className="relative w-full bg-[#7AACAE] py-10 px-4 md:px-8 overflow-hidden">
      {/* Header Section */}
      <div className="max-w-7/8 mx-right mb-12">
        {/* Yellow badge */}
        <div className="inline-block mb-8">
          <div className="bg-[#FFE67B] rounded-full px-6 py-3">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Opinion of our clients
            </h2>
          </div>
        </div>

        {/* Description */}
        <div className="bg-[#D9D9D9] backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-3xl">
          <p className="text-[#585858] text-lg md:text-xl leading-relaxed mb-4">
            Know what our clients think about us and our service.
            The opinions of our clients are very important to us.
          </p>
          <p className="text-[#585858] text-lg md:text-xl font-medium">
            Client feedback and satisfaction are our top priorities.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7/8 mx-right relative mb-20">
        
        {/* Testimonials - Full width now */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl ">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="relative">
              {/* Gray background - taller than the white card */}
              <div className="bg-[#D9D9D9] rounded-2xl p-2 pt-20 pb-15 h-full min-h-[400px]">
                {/* White card content */}
                <div className="bg-white rounded-2xl p-4 shadow-lg h-full mx-auto relative">
                  {/* User Info */}
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-orange-400 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {testimonial.location}
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Rating Stars */}
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-2">{testimonial.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {testimonial.comment}
                  </p>
                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                      <BiLike className="w-4 h-4" />
                      <span className="text-xs">{testimonial.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                      <BiShare className="w-4 h-4" />
                      <span className="text-xs">Compartir</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Absolute positioned Boxes Image - Overlapping */}
        <div className="absolute -top-55 -right-45 z-50 pointer-events-none">
          <div className="relative">
            <img
              src="/assets/boxes_opinion.png"
              alt="Opinion boxes with thumbs up"
              className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-170 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpinionSection;