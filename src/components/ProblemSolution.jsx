import { X, Check } from "lucide-react";

export default function ProblemSolution() {
  const problems = [
    "Painful cracked heels that bleed",
    "Thick, stubborn calluses",
    "Constant foot discomfort",
    "Failed creams and treatments",
    "Embarrassment wearing sandals",
  ];

  const solutions = [
    "Deep healing from root cause",
    "Smooth, soft feet in days",
    "Natural Siddha ingredients",
    "No harsh chemicals or side effects",
    "Confidence to go barefoot",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            The Problem With Traditional Treatments
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Most foot creams only mask symptoms. We heal from the inside out.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-100">
            <div className="flex items-center mb-6">
              <div className="bg-red-500 rounded-full p-3 mr-4">
                <X className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">The Problem</h3>
            </div>

            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-red-200 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <X className="w-4 h-4 text-red-700" />
                  </div>
                  <span className="text-gray-700 text-lg">{problem}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-red-100 rounded-lg">
              <p className="text-red-800 font-medium">
                Over 60% of adults suffer from foot problems, spending hundreds
                on treatments that don't work.
              </p>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-8 border-2 border-emerald-100">
            <div className="flex items-center mb-6">
              <div className="bg-emerald-500 rounded-full p-3 mr-4">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Solution</h3>
            </div>

            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-emerald-200 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <Check className="w-4 h-4 text-emerald-700" />
                  </div>
                  <span className="text-gray-700 text-lg">{solution}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-emerald-100 rounded-lg">
              <p className="text-emerald-800 font-medium">
                Powered by 5000-year-old Siddha wisdom combined with modern
                research for guaranteed results.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-lg font-bold text-xl transition-all transform hover:scale-105 shadow-lg"
          >
            Get Your Solution Now
          </button>
        </div>
      </div>
    </section>
  );
}
