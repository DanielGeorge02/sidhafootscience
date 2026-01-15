import { Star, Award, Truck, Lock } from "lucide-react";

export default function TrustProof() {
  const reviews = [
    {
      name: "Priya Sharma",
      rating: 5,
      text: "After years of painful cracked heels, this is the only product that actually worked! My feet are so soft now.",
      location: "Mumbai",
      verified: true,
    },
    {
      name: "Rajesh Kumar",
      rating: 5,
      text: "I was skeptical at first, but within a week I saw amazing results. The calluses are gone and no more pain!",
      location: "Delhi",
      verified: true,
    },
    {
      name: "Anita Desai",
      rating: 5,
      text: "Natural ingredients that actually work. No harsh chemicals, just pure healing. Highly recommend!",
      location: "Bangalore",
      verified: true,
    },
    {
      name: "Vikram Singh",
      rating: 5,
      text: "Best foot care product I have ever used. Results are visible and long-lasting. Worth every penny!",
      location: "Pune",
      verified: true,
    },
  ];

  const trustBadges = [
    {
      icon: Award,
      title: "Quality Assured",
      description: "ISO Certified",
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "On orders above ₹499",
    },
    {
      icon: Lock,
      title: "Secure Checkout",
      description: "100% Safe Payment",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Trusted by 10,000+ Happy Customers
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">4.8/5</span>
            <span className="text-gray-600">(2,847 reviews)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">
                    {review.name}
                  </div>
                  <div className="text-sm text-gray-500">{review.location}</div>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-3">{review.text}</p>

              {review.verified && (
                <div className="flex items-center text-emerald-600 text-sm">
                  <span className="mr-1">✓</span>
                  Verified Purchase
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-center bg-emerald-50 rounded-xl p-6 border-2 border-emerald-100"
              >
                <Icon className="w-10 h-10 text-emerald-600 mr-4" />
                <div>
                  <div className="font-bold text-gray-900 text-lg">
                    {badge.title}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {badge.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Join Thousands of Satisfied Customers
          </h3>
          <p className="text-xl mb-6 opacity-90">
            30-Day Money-Back Guarantee. Try Risk-Free!
          </p>
          <button
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white text-emerald-600 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Shop Now with Confidence
          </button>
        </div>
      </div>
    </section>
  );
}
