import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 30000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [hasShown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("email_captures")
        .insert([{ email, offer_type: "exit_intent" }]);

      if (error) {
        if (error.code === "23505") {
          setMessage("You're already registered for this offer!");
        } else {
          throw error;
        }
      } else {
        setMessage(
          "Success! Check your email for your exclusive discount code."
        );
        setEmail("");
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-bounce-in shadow-2xl">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close popup"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Gift className="w-10 h-10 text-emerald-600" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Wait! Don't Miss Out
          </h2>
          <p className="text-lg text-gray-600">
            Get an exclusive 25% discount code sent to your email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none text-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Get My Discount Code"}
          </button>

          {message && (
            <p
              className={`text-center text-sm ${
                message.includes("Success")
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        <div className="mt-6 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-emerald-600 mr-2">✓</span>
            Free shipping on all orders
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-emerald-600 mr-2">✓</span>
            30-day money-back guarantee
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-emerald-600 mr-2">✓</span>
            Join 10,000+ happy customers
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm underline"
        >
          No thanks, I'll pay full price
        </button>
      </div>
    </div>
  );
}
