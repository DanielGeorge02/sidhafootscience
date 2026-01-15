import { Leaf, Flower, TreePine, Heart } from "lucide-react";

export default function Ingredients() {
  const ingredients = [
    {
      icon: Leaf,
      name: "Neem Extract",
      benefit: "Natural antibacterial and antifungal properties",
      science: "Promotes healing and prevents infections",
    },
    {
      icon: Flower,
      name: "Turmeric",
      benefit: "Powerful anti-inflammatory agent",
      science: "Reduces pain and accelerates skin repair",
    },
    {
      icon: TreePine,
      name: "Coconut Oil",
      benefit: "Deep moisturization and nourishment",
      science: "Rich in fatty acids for soft, supple skin",
    },
    {
      icon: Heart,
      name: "Aloe Vera",
      benefit: "Soothes and heals damaged skin",
      science: "Contains vitamins and minerals for skin health",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-100 text-emerald-800 px-6 py-2 rounded-full font-semibold mb-4">
            Powered by Nature
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Ancient Siddha Ingredients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each ingredient is carefully selected from 5000-year-old Siddha
            medicine tradition, proven to heal and rejuvenate
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ingredients.map((ingredient, index) => {
            const Icon = ingredient.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md">
                  <Icon className="w-8 h-8 text-emerald-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {ingredient.name}
                </h3>

                <p className="text-emerald-700 font-semibold mb-2 text-sm">
                  {ingredient.benefit}
                </p>

                <p className="text-gray-600 text-sm">{ingredient.science}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              The Science Behind Siddha Medicine
            </h3>

            <p className="text-gray-700 text-lg mb-4">
              Siddha is one of the oldest medical systems in the world,
              originating in South India over 5000 years ago. It focuses on
              treating the root cause, not just symptoms.
            </p>

            <p className="text-gray-700 text-lg mb-6">
              Our formulation combines this ancient wisdom with modern quality
              standards to deliver results that are both safe and effective.
            </p>

            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-lg">
              <h4 className="font-bold text-emerald-900 mb-2">
                What We Don't Use:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>✗ No parabens or sulfates</li>
                <li>✗ No synthetic fragrances</li>
                <li>✗ No harmful chemicals</li>
                <li>✗ No animal testing</li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Natural herbal ingredients"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="text-4xl font-bold text-emerald-600">100%</div>
              <div className="text-gray-700 font-semibold">Natural</div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Clinically Proven. Naturally Powerful.
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Tested and trusted by thousands. Experience the healing power of
            nature.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white text-emerald-600 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Try It Risk-Free Today
          </button>
        </div>
      </div>
    </section>
  );
}
