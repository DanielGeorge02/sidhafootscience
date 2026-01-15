import { useState } from "react";
import { ChevronLeft, ChevronRight, Leaf, Clock, Shield } from "lucide-react";

export default function ProductShowcase() {
  const [currentImage, setCurrentImage] = useState(0);

  const productImages = [
    "https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg",
    "https://images.pexels.com/photos/105028/pexels-photo-105028.jpeg",
    "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  const benefits = [
    {
      icon: Leaf,
      title: "100% Herbal Formula",
      description: "Pure plant-based ingredients from ancient Siddha medicine",
    },
    {
      icon: Clock,
      title: "Fast Acting Relief",
      description: "See visible results within 7 days of regular use",
    },
    {
      icon: Shield,
      title: "Clinically Tested",
      description: "Safe for all skin types with no harmful side effects",
    },
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Meet Your Foot Care Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scientifically formulated with time-tested Siddha ingredients for
            complete foot rejuvenation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={productImages[currentImage]}
                alt={`Product view ${currentImage + 1}`}
                className="w-full h-96 object-cover"
              />
            </div>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImage
                      ? "bg-emerald-600 w-8"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Powerful Benefits in Every Application
            </h3>

            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-emerald-100 rounded-lg p-3 mr-4 flex-shrink-0">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
              <h4 className="text-lg font-bold text-emerald-900 mb-2">
                What Makes Us Different?
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="text-emerald-600 mr-2">✓</span>
                  No petroleum or mineral oil
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-600 mr-2">✓</span>
                  No artificial fragrances
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-600 mr-2">✓</span>
                  Cruelty-free and vegan
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-600 mr-2">✓</span>
                  Dermatologically tested
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
