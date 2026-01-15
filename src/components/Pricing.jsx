import { useState, useEffect } from "react";
import { Check, Clock, TrendingUp, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/shopify";

export default function Pricing() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();

  const parseFeatures = (description) => {
    // Extract features from HTML description
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;
    const listItems = tempDiv.querySelectorAll("li");

    if (listItems.length > 0) {
      return Array.from(listItems).map((li) => li.textContent.trim());
    }

    // Default features if none found
    return ["Free Shipping", "30-Day Money Back", "Secure Payment"];
  };

  useEffect(() => {
    // Fetch products from Shopify
    getProducts()
      .then((res) => {
        const productsData = res.data.products.edges.map(({ node }) => {
          const variant = node.variants.edges[0]?.node;
          const price = parseFloat(variant?.price?.amount || 0);
          const compareAtPrice = variant?.compareAtPrice
            ? parseFloat(variant.compareAtPrice.amount)
            : null;
          const discount = compareAtPrice
            ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
            : 0;
          const savings = compareAtPrice ? compareAtPrice - price : 0;

          // Extract bottle count from title or tags
          const bottles = node.title.includes("3")
            ? 3
            : node.title.includes("5")
            ? 5
            : 1;

          // Determine icon based on bottles
          const icon = bottles === 1 ? Package : TrendingUp;

          // Check if product is popular from tags
          const isPopular =
            node.tags.includes("popular") || node.tags.includes("featured");

          // Parse features from description
          const features = parseFeatures(node.description);

          return {
            id: node.id,
            variantId: variant?.id,
            name: node.title,
            bottles: bottles,
            price: Math.round(price),
            originalPrice: compareAtPrice
              ? Math.round(compareAtPrice)
              : Math.round(price),
            discount: discount,
            savings: savings > 0 ? Math.round(savings) : null,
            features: features,
            popular: isPopular,
            icon: icon,
            image: node.images.edges[0]?.node?.url || null,
            description: node.description,
          };
        });

        // Sort products: put popular first, then by bottles count
        productsData.sort((a, b) => {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return a.bottles - b.bottles;
        });

        setProducts(productsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Helper function to parse features from description

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl text-gray-600">Loading products...</div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Special Launch Offer
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Limited time pricing - Stock selling fast!
          </p>

          <div className="inline-flex items-center bg-red-100 border-2 border-red-200 rounded-xl px-6 py-4">
            <Clock className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <div className="text-sm text-red-800 font-semibold mb-1">
                Offer Ends In:
              </div>
              <div className="flex gap-2 text-2xl font-bold text-red-600">
                <span>{String(timeLeft.hours).padStart(2, "0")}h</span>
                <span>:</span>
                <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
                <span>:</span>
                <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {products.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 transition-all transform hover:scale-105 ${
                  plan.popular
                    ? "bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-2xl border-4 border-emerald-400"
                    : "bg-white text-gray-900 shadow-lg border-2 border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-center mb-6">
                  <Icon
                    className={`w-12 h-12 mx-auto mb-3 ${
                      plan.popular ? "text-white" : "text-emerald-600"
                    }`}
                  />
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-sm opacity-90">
                    {plan.bottles} Bottle{plan.bottles > 1 ? "s" : ""}
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span
                      className={`text-2xl line-through opacity-75 ${
                        plan.popular ? "text-white" : "text-gray-500"
                      }`}
                    >
                      ₹{plan.originalPrice}
                    </span>
                    {plan.discount > 0 && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{plan.discount}%
                      </span>
                    )}
                  </div>
                  <div className="text-5xl font-bold mb-2">₹{plan.price}</div>
                  {plan.savings && (
                    <div
                      className={`text-sm font-semibold ${
                        plan.popular ? "text-emerald-100" : "text-emerald-600"
                      }`}
                    >
                      Save ₹{plan.savings}
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check
                        className={`w-5 h-5 mr-3 flex-shrink-0 ${
                          plan.popular ? "text-emerald-300" : "text-emerald-600"
                        }`}
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
                    plan.popular
                      ? "bg-white text-emerald-600 hover:bg-gray-100"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                  // In Pricing.jsx
                  onClick={() => {
                    navigation("/checkout", {
                      state: {
                        productId: plan.id,
                      },
                    });
                  }}
                >
                  Order Now
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                10,000+
              </div>
              <div className="text-gray-700">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                4.8★
              </div>
              <div className="text-gray-700">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                30 Days
              </div>
              <div className="text-gray-700">Money-Back Guarantee</div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Secure checkout with multiple payment options
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-sm text-gray-500">💳 Credit/Debit Card</span>
            <span className="text-sm text-gray-500">📱 UPI</span>
            <span className="text-sm text-gray-500">💰 Wallets</span>
            <span className="text-sm text-gray-500">🏦 Net Banking</span>
          </div>
        </div>
      </div>
    </section>
  );
}
