import { useState, useEffect } from "react";
import { ShoppingCart, MessageCircle, X } from "lucide-react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-emerald-600 shadow-2xl z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <div className="text-sm text-gray-600">Limited Time Offer</div>
              <div className="text-lg font-bold text-gray-900">
                Get 20% Off Today
              </div>
            </div>

            <div className="flex items-center gap-3 flex-1 sm:flex-initial justify-end">
              <button
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Buy Now</span>
              </button>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed right-6 bottom-24 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl z-50 transition-all transform hover:scale-110"
        aria-label="Quick actions"
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {isExpanded && (
        <div className="fixed right-6 bottom-44 bg-white rounded-2xl shadow-2xl z-50 p-4 w-64 border-2 border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
          <div className="space-y-2">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-semibold text-sm text-gray-900">
                  WhatsApp
                </div>
                <div className="text-xs text-gray-600">Chat with us</div>
              </div>
            </a>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <span className="text-xl">📞</span>
              <div>
                <div className="font-semibold text-sm text-gray-900">
                  Call Us
                </div>
                <div className="text-xs text-gray-600">+91 98765 43210</div>
              </div>
            </a>
            <a
              href="mailto:support@siddhafootscience.com"
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="text-xl">📧</span>
              <div>
                <div className="font-semibold text-sm text-gray-900">Email</div>
                <div className="text-xs text-gray-600">Get in touch</div>
              </div>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
