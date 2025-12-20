import banner from "../../../public/assets/about.png";
export default function FamilyDreamComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#C9E1EC] px-4">
      <div className="max-w-7xl mx-auto">
        {/* Título principal */}
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 text-center my-8">
          It started as a family dream
        </h1>

        {/* Tarjeta con imagen */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
          {/* Badge "Nuestro viaje" */}
          <div className="absolute top-6 left-6 z-10">
            <span className="bg-[#F4D35E] text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
              Nuestro viaje
            </span>
          </div>

          {/* Imagen importada */}
          <div className="relative">
            <img 
              src={banner}
              alt="Safe box"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Sección de texto descriptivo */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="text-gray-700 leading-relaxed">
            <p>
              Throughout the years we have grown, our story belongs to our purpose as a family.
            </p>
          </div>
          <div className="text-gray-700 leading-relaxed">
            <p>
              The dream of taking our home to a new beginning loaded with dreams and illusions.
            </p>
          </div>
        </div>

        {/* Sección "Inició con una mudanza" */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            It started with a move
          </h2>
        </div>
      </div>
    </div>
  );
}