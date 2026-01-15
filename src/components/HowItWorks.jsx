import { Droplet, Timer, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Droplet,
      title: "Cleanse & Dry",
      description: "Wash your feet with warm water and pat dry thoroughly",
      step: 1,
    },
    {
      icon: Timer,
      title: "Apply Generously",
      description:
        "Massage the cream into affected areas, especially heels and calluses",
      step: 2,
    },
    {
      icon: Sparkles,
      title: "See Results",
      description: "Use twice daily for 7 days and watch your feet transform",
      step: 3,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-white to-emerald-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Simple 3-Step Process
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get smooth, healthy feet in just minutes a day
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="absolute -top-4 -left-4 bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">
                  {step.step}
                </div>

                <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto">
                  <Icon className="w-10 h-10 text-emerald-600" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {step.title}
                </h3>

                <p className="text-gray-600 text-center text-lg">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Pro Tips for Best Results
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <span className="text-emerald-600 text-2xl mr-3">💧</span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Stay Consistent
                </h4>
                <p className="text-gray-600">
                  Apply morning and night for fastest healing
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-emerald-600 text-2xl mr-3">🧦</span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Wear Socks</h4>
                <p className="text-gray-600">
                  Put on cotton socks after application for deeper absorption
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-emerald-600 text-2xl mr-3">💦</span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Stay Hydrated
                </h4>
                <p className="text-gray-600">
                  Drink plenty of water to support skin healing
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-emerald-600 text-2xl mr-3">✨</span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Be Patient</h4>
                <p className="text-gray-600">
                  Deep healing takes time, but results are worth it
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-emerald-100 rounded-2xl p-8">
            <p className="text-emerald-900 text-xl font-semibold mb-4">
              Most customers see visible improvement within 7 days!
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Transformation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
