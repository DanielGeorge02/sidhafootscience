import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailCapture = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("email_captures")
        .insert([{ email, offer_type: "hero_section" }]);

      if (error) {
        if (error.code === "23505") {
          setMessage("You're already registered!");
        } else {
          throw error;
        }
      } else {
        setMessage("Success! Check your email for your special offer.");
        setEmail("");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Ancient Siddha Science Meets Modern Relief
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Say Goodbye to
              <span className="text-emerald-600"> Cracked Heels </span>& Foot
              Pain Forever
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the power of 100% herbal Siddha medicine. Fast relief
              from heel cracks, calluses, and chronic foot pain—naturally and
              safely.
            </p>

            <form onSubmit={handleEmailCapture} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-lg"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center transition-all transform hover:scale-105 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Get 20% Off"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
              {message && (
                <p
                  className={`mt-3 text-sm ${
                    message.includes("Success")
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <button
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Buy Now - Limited Stock
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto border-2 border-gray-300 hover:border-emerald-600 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all"
              >
                How It Works
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-teal-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white"></div>
                </div>
                <span className="font-medium">10,000+ Happy Feet</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★★★★★</span>
                <span className="font-medium ml-1">4.8/5</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Healthy feet after treatment"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">
                  7 Days
                </div>
                <div className="text-sm text-gray-600">To Visible Results</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
