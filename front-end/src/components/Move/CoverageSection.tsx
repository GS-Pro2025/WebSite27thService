/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { MapPin, AlertCircle, CheckCircle2, Navigation, Package, TrendingUp, DollarSign } from "lucide-react";

interface FormData {
  originAddress: string;
  finalAddress: string;
  agreeToTerms: boolean;
}

interface CoverageResult {
  isWithinPickupRange: boolean;
  isWithinDeliveryRange: boolean;
  estimatedDistance: number;
  pickupDistance: number;
  message: string;
}

const InterstateMoving: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const originInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    originAddress: "",
    finalAddress: "",
    agreeToTerms: false,
  });
  
  const [coverageResult, setCoverageResult] = useState<CoverageResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Configuración
  const VIRGINIA_BASE = { 
    city: "Chesapeake", 
    state: "Virginia",
    coords: { lat: 36.7682, lng: -76.2875 },
    address: "Chesapeake, VA, USA"
  };
  const MAX_PICKUP_DISTANCE = 150; // millas
  const MAX_DELIVERY_DISTANCE = 500; // millas

  // Inicializar Google Maps
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (typeof google !== 'undefined' && google.maps) {
        initializeMap();
      } else {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
        script.async = true;
        script.defer = true;
        script.onload = () => initializeMap();
        document.head.appendChild(script);
      }
    };

    loadGoogleMaps();
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
      center: VIRGINIA_BASE.coords,
      zoom: 7,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });
    
    setMap(mapInstance);

    // Inicializar servicios de direcciones
    const dirService = new google.maps.DirectionsService();
    const dirRenderer = new google.maps.DirectionsRenderer({
      map: mapInstance,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: "#0E6F7E",
        strokeWeight: 5,
        strokeOpacity: 0.8
      }
    });
    
    setDirectionsService(dirService);
    setDirectionsRenderer(dirRenderer);

    // Agregar marcador base con infowindow
    const marker = new google.maps.Marker({
      position: VIRGINIA_BASE.coords,
      map: mapInstance,
      title: `Our Base: ${VIRGINIA_BASE.city}, ${VIRGINIA_BASE.state}`,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        scaledSize: new google.maps.Size(40, 40)
      },
      animation: google.maps.Animation.DROP,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; font-family: 'Manrope', sans-serif;">
          <h3 style="margin: 0 0 8px 0; color: #0E6F7E; font-weight: bold;">Twenty Seventh Base</h3>
          <p style="margin: 0; color: #666;">${VIRGINIA_BASE.city}, ${VIRGINIA_BASE.state}</p>
          <div style="margin-top: 8px; font-size: 12px; color: #666;">
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
              <span>📍</span>
              <span>Base Location</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
              <span>🚚</span>
              <span>Pickup Radius: ${MAX_PICKUP_DISTANCE} miles</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span>🛣️</span>
              <span>Max Delivery: ${MAX_DELIVERY_DISTANCE} miles</span>
            </div>
          </div>
        </div>
      `
    });

    marker.addListener('click', () => {
      infoWindow.open(mapInstance, marker);
    });

    // Agregar círculo de cobertura de recogida (150 millas)
    new google.maps.Circle({
      strokeColor: "#0E6F7E",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#0E6F7E",
      fillOpacity: 0.15,
      map: mapInstance,
      center: VIRGINIA_BASE.coords,
      radius: MAX_PICKUP_DISTANCE * 1609.34, // Convertir millas a metros
    });

    // Inicializar autocomplete cuando los inputs estén listos
    initializeAutocomplete(mapInstance);
  };

  const initializeAutocomplete = (mapInstance: google.maps.Map) => {
    if (!originInputRef.current || !destinationInputRef.current) {
      setTimeout(() => initializeAutocomplete(mapInstance), 100);
      return;
    }

    // Autocomplete para origen (restringido a USA)
    const originAc = new google.maps.places.Autocomplete(originInputRef.current, {
      componentRestrictions: { country: "us" },
      fields: ["formatted_address", "geometry", "name"],
      types: ["address"]
    });

    originAc.addListener("place_changed", () => {
      const place = originAc.getPlace();
      if (place.formatted_address) {
        setFormData(prev => ({ ...prev, originAddress: place.formatted_address || "" }));
      }
    });

    // Autocomplete para destino (restringido a USA)
    const destinationAc = new google.maps.places.Autocomplete(destinationInputRef.current, {
      componentRestrictions: { country: "us" },
      fields: ["formatted_address", "geometry", "name"],
      types: ["address"]
    });

    destinationAc.addListener("place_changed", () => {
      const place = destinationAc.getPlace();
      if (place.formatted_address) {
        setFormData(prev => ({ ...prev, finalAddress: place.formatted_address || "" }));
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const calculateDistance = (origin: string, destination: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      if (!directionsService) {
        reject(new Error("Directions service not initialized"));
        return;
      }

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        },
        (result, status) => {
          if (status === "OK" && result) {
            const route = result.routes[0];
            if (route && route.legs[0]) {
              const distanceInMeters = route.legs[0].distance?.value || 0;
              const distanceInMiles = distanceInMeters / 1609.34;
              resolve(distanceInMiles);
            } else {
              reject(new Error("No route found"));
            }
          } else {
            reject(new Error(`Directions request failed: ${status}`));
          }
        }
      );
    });
  };

  const drawRoute = (origin: string, destination: string, isWithinRange: boolean) => {
    if (!directionsService || !directionsRenderer || !map) return;

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      },
      (result, status) => {
        if (status === "OK" && result) {
          // Actualizar color según cobertura
          directionsRenderer.setOptions({
            polylineOptions: {
              strokeColor: isWithinRange ? "#22c55e" : "#ef4444",
              strokeWeight: 5,
              strokeOpacity: 0.8
            },
            suppressMarkers: false,
            markerOptions: {
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Falta añadir la url de lo que se quiere mientras coloco esta para el despliegue
                scaledSize: new google.maps.Size(40, 40)
              }
            }
          });

          directionsRenderer.setDirections(result);

          // Ajustar vista para incluir la ruta, origen, destino Y la base
          const bounds = new google.maps.LatLngBounds();
          bounds.extend(VIRGINIA_BASE.coords);
          
          const route = result.routes[0];
          if (route && route.overview_path) {
            route.overview_path.forEach(point => {
              bounds.extend(point);
            });
          }
          
          map.fitBounds(bounds);
          
          // Pequeño zoom out para mejor vista
          setTimeout(() => {
            const currentZoom = map.getZoom();
            if (currentZoom && currentZoom > 8) {
              map.setZoom(Math.min(currentZoom - 1, 8));
            }
          }, 500);
        }
      }
    );
  };

  const checkCoverage = async () => {
    if (!formData.originAddress || !formData.finalAddress) {
      alert("Please select valid addresses using autocomplete.");
      return;
    }

    setIsCalculating(true);

    try {
      // Calcular distancia desde la base al origen (pickup)
      const pickupDistance = await calculateDistance(
        VIRGINIA_BASE.address,
        formData.originAddress
      );

      // Calcular distancia total del viaje (origen -> destino)
      const deliveryDistance = await calculateDistance(
        formData.originAddress,
        formData.finalAddress
      );

      const isWithinPickupRange = pickupDistance <= MAX_PICKUP_DISTANCE;
      const isWithinDeliveryRange = deliveryDistance <= MAX_DELIVERY_DISTANCE;

      // Dibujar ruta en el mapa
      drawRoute(
        formData.originAddress,
        formData.finalAddress,
        isWithinPickupRange && isWithinDeliveryRange
      );

      // Preparar mensaje
      let message = "";
      if (isWithinPickupRange && isWithinDeliveryRange) {
        message = `Excellent! Your move is within our coverage area. 
        We pickup at ${Math.round(pickupDistance)} miles from our base in ${VIRGINIA_BASE.city}.
        Total delivery distance: ${Math.round(deliveryDistance)} miles.
        Request your quote now!`;
      } else if (!isWithinPickupRange) {
        message = `Sorry, the origin is ${Math.round(pickupDistance)} miles from our base in ${VIRGINIA_BASE.city}, ${VIRGINIA_BASE.state}. 
        We only pickup within ${MAX_PICKUP_DISTANCE} miles. 
        Please contact us for special options.`;
      } else if (!isWithinDeliveryRange) {
        message = `Sorry, the total distance of ${Math.round(deliveryDistance)} miles exceeds our maximum of ${MAX_DELIVERY_DISTANCE} miles for delivery.
        Please contact us for long-distance moving options.`;
      }

      setCoverageResult({
        isWithinPickupRange,
        isWithinDeliveryRange,
        estimatedDistance: deliveryDistance,
        pickupDistance,
        message,
      });
    } catch (error) {
      console.error("Error calculating coverage:", error);
      setCoverageResult({
        isWithinPickupRange: false,
        isWithinDeliveryRange: false,
        estimatedDistance: 0,
        pickupDistance: 0,
        message: "Error calculating coverage. Please check the addresses and try again.",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkCoverage();
  };

  const isFullyCovered = coverageResult?.isWithinPickupRange && coverageResult?.isWithinDeliveryRange;

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[#E8F4F8] to-white overflow-hidden">
      {/* Wavy top decoration */}
      <div className="absolute top-0 left-0 w-full h-32">
        <svg
          className="absolute top-0 w-full h-32"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64 C240,32 480,96 720,64 C960,32 1200,96 1440,64 L1440,0 L0,0 Z"
            fill="#E8F4F8"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 font-[Poppins]">
            Interstate Moving
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-[Manrope] max-w-3xl mx-auto">
            Interstate moves carried out with planning, security, and total control.
          </p>
          
          {/* Coverage Info Badge */}
          <div className="mt-6 inline-flex items-center gap-2 bg-[#0E6F7E] text-white px-6 py-3 rounded-full shadow-lg">
            <MapPin className="w-5 h-5" />
            <span className="font-semibold font-[Manrope] text-sm md:text-base">
              Pickup: {MAX_PICKUP_DISTANCE} miles from {VIRGINIA_BASE.city} • Delivery: Up to {MAX_DELIVERY_DISTANCE} miles
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Features and Form */}
          <div>
            {/* Features List */}
            <div className="mb-8">
              <ul className="space-y-3 text-gray-700 font-[Manrope]">
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-gray-900">1.</span>
                  <span>Safe and planned transfers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-gray-900">2.</span>
                  <span>Monitoring and constant communication.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-gray-900">3.</span>
                  <span>Team trained for long routes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-gray-900">4.</span>
                  <span>Service area: {MAX_PICKUP_DISTANCE} miles pickup radius from {VIRGINIA_BASE.city}, {VIRGINIA_BASE.state}.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-gray-900">5.</span>
                  <span>Maximum delivery distance: {MAX_DELIVERY_DISTANCE} miles.</span>
                </li>
              </ul>
            </div>

            {/* Form Card */}
            <div className="bg-[#D4E8E8] rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 font-[Poppins]">
                Check if we cover your route
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Origin Address with Autocomplete */}
                <div>
                  <label
                    htmlFor="originAddress"
                    className="block text-sm font-semibold text-gray-700 mb-2 font-[Manrope] flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-[#0E6F7E]" />
                    Pickup Address (Origin)
                  </label>
                  <input
                    ref={originInputRef}
                    type="text"
                    id="originAddress"
                    name="originAddress"
                    value={formData.originAddress}
                    onChange={handleInputChange}
                    placeholder="Start typing your pickup address..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#0E6F7E] focus:border-transparent outline-none transition-all font-[Manrope]"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1 font-[Manrope]">
                    Must be within {MAX_PICKUP_DISTANCE} miles of {VIRGINIA_BASE.city}, {VIRGINIA_BASE.state}
                  </p>
                </div>

                {/* Destination Address with Autocomplete */}
                <div>
                  <label
                    htmlFor="finalAddress"
                    className="block text-sm font-semibold text-gray-700 mb-2 font-[Manrope] flex items-center gap-2"
                  >
                    <Package className="w-4 h-4 text-[#0E6F7E]" />
                    Delivery Address (Destination)
                  </label>
                  <input
                    ref={destinationInputRef}
                    type="text"
                    id="finalAddress"
                    name="finalAddress"
                    value={formData.finalAddress}
                    onChange={handleInputChange}
                    placeholder="Start typing your delivery address..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#0E6F7E] focus:border-transparent outline-none transition-all font-[Manrope]"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1 font-[Manrope]">
                    Maximum {MAX_DELIVERY_DISTANCE} miles from pickup location
                  </p>
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 text-[#0E6F7E] border-gray-300 rounded focus:ring-[#0E6F7E] cursor-pointer"
                    required
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="text-sm text-gray-700 cursor-pointer font-[Manrope]"
                  >
                    <span className="font-semibold">I agree to receive coverage information</span>
                    <br />
                    <span className="text-gray-500">
                      By checking this box, you consent to route verification
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isCalculating}
                  className={`w-full bg-[#FFE67B] hover:bg-[#FFD700] text-gray-900 font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg font-[Manrope] flex items-center justify-center gap-2 ${
                    isCalculating ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                      Calculating Route...
                    </>
                  ) : (
                    <>
                      <Navigation className="w-5 h-5" />
                      Check Coverage & View Route
                    </>
                  )}
                </button>
              </form>

              {/* Coverage Result */}
              {coverageResult && (
                <div
                  className={`mt-6 p-4 rounded-lg ${
                    isFullyCovered
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-red-100 border-2 border-red-500"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isFullyCovered ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h4
                        className={`font-semibold mb-3 font-[Poppins] ${
                          isFullyCovered ? "text-green-800" : "text-red-800"
                        }`}
                      >
                        {isFullyCovered ? "✓ Route Covered!" : "⚠ Route Not Covered"}
                      </h4>
                      
                      {isFullyCovered ? (
                        <div className="space-y-2">
                          <p className="text-sm font-[Manrope] text-green-700">
                            Excellent! Your move is within our coverage area.
                          </p>
                          <div className="flex items-center gap-2 text-sm text-green-700">
                            <MapPin className="w-4 h-4" />
                            <span>We pickup at {Math.round(coverageResult.pickupDistance)} miles from our base in {VIRGINIA_BASE.city}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-green-700">
                            <TrendingUp className="w-4 h-4" />
                            <span>Total delivery distance: {Math.round(coverageResult.estimatedDistance)} miles</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                            <DollarSign className="w-4 h-4" />
                            <span>Request your quote now!</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm font-[Manrope] text-red-700 whitespace-pre-line">
                          {coverageResult.message}
                        </p>
                      )}
                      
                      {isFullyCovered && (
                        <a
                          href={`https://wa.me/14075417478?text=Hello! I need a quote for a move from ${encodeURIComponent(formData.originAddress)} to ${encodeURIComponent(formData.finalAddress)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block bg-[#0E6F7E] text-white px-6 py-2 rounded-lg hover:bg-[#0a5563] transition-colors font-semibold"
                        >
                          Request Quote
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Interactive Map */}
          <div className="relative">
            <div 
              ref={mapRef} 
              className="w-full h-[500px] lg:h-[700px] rounded-3xl shadow-2xl overflow-hidden border-4 border-white"
            />
            
            {/* Map Legend */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#0E6F7E]">
              <h4 className="font-semibold text-lg mb-3 text-gray-900 font-[Poppins]">
                Map Legend
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 font-[Manrope]">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span>Our Base - {VIRGINIA_BASE.city}, {VIRGINIA_BASE.state}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span>Route (Covered)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span>Route (Not Covered)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#0E6F7E] opacity-30"></div>
                  <span>Pickup Coverage Area ({MAX_PICKUP_DISTANCE} mi radius)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterstateMoving;