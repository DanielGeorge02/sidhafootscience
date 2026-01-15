import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Lock,
  ShoppingBag,
  Check,
  ArrowLeft,
  Package,
  Tag,
} from "lucide-react";
import { createCart, getProductById } from "../api/shopify";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "India",
    state: "",
    zipCode: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const productId = location.state?.productId;

  const parseFeatures = (description) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;
    const listItems = tempDiv.querySelectorAll("li");

    if (listItems.length > 0) {
      return Array.from(listItems).map((li) => li.textContent.trim());
    }

    return ["Free Shipping", "30-Day Money Back", "Secure Payment"];
  };

  useEffect(() => {
    if (!productId) {
      navigate("/");
      return;
    }

    getProductById(productId)
      .then((res) => {
        const node = res.data.product;

        if (!node) {
          throw new Error("Product not found");
        }

        const variant = node.variants.edges[0]?.node;
        const price = parseFloat(variant?.price?.amount || 0);
        const compareAtPrice = variant?.compareAtPrice
          ? parseFloat(variant.compareAtPrice.amount)
          : null;
        const discount = compareAtPrice
          ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
          : 0;
        const savings = compareAtPrice ? compareAtPrice - price : 0;

        const bottles = node.title.includes("3")
          ? 3
          : node.title.includes("5")
          ? 5
          : 1;

        const features = parseFeatures(node.description);

        const productData = {
          id: node.id,
          variantId: variant?.id,
          name: node.title,
          bottles: bottles,
          price: price,
          originalPrice: compareAtPrice || price,
          discount: discount,
          savings: savings > 0 ? savings : null,
          features: features,
          image: node.images.edges[0]?.node?.url || null,
          description: node.description,
          quantity: 1,
        };

        setProduct(productData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        alert("Product not found. Redirecting to home...");
        navigate("/");
      });
  }, [productId, navigate]);

  const subtotal = product?.price || 0;
  const originalTotal = product?.originalPrice || subtotal;
  const totalDiscount = originalTotal - subtotal;
  const shipping = 0;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // MAIN CHECKOUT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      console.log("Creating Shopify cart with variant ID:", product.variantId);

      // Create cart with customer info
      const response = await createCart(product.variantId, 1, {
        email: formData.email,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address1: formData.address,
          address2: formData.apartment || "",
          city: formData.city,
          province: formData.state,
          country: formData.country,
          zip: formData.zipCode,
          phone: formData.phone || "",
        },
      });

      console.log("Full API Response:", response);

      // Check response structure
      if (!response || !response.data) {
        throw new Error("Invalid response from API");
      }

      const { cartCreate } = response.data;

      if (!cartCreate) {
        throw new Error("No cartCreate in response");
      }

      const { cart, userErrors } = cartCreate;

      // Handle errors
      if (userErrors && userErrors.length > 0) {
        console.error("Cart errors:", userErrors);
        alert(`Error: ${userErrors[0].message}`);
        setIsProcessing(false);
        return;
      }

      if (!cart || !cart.checkoutUrl) {
        console.error("No checkout URL in response:", cart);
        throw new Error("Failed to create cart - no checkout URL returned");
      }

      // Track conversion events
      if (window.fbq) {
        window.fbq("track", "InitiateCheckout", {
          value: total,
          currency: "INR",
          content_ids: [product.id],
          content_type: "product",
        });
      }

      if (window.gtag) {
        window.gtag("event", "begin_checkout", {
          value: total,
          currency: "INR",
          items: [
            {
              item_id: product.id,
              item_name: product.name,
              price: product.price,
              quantity: 1,
            },
          ],
        });
      }

      // Redirect to Shopify checkout
      console.log("Redirecting to Shopify checkout:", cart.checkoutUrl);
      window.location.href = cart.checkoutUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      console.error("Error details:", error.message);
      alert(`Failed to create checkout: ${error.message}. Please try again.`);
      setIsProcessing(false);
    }
  };

  // EXPRESS CHECKOUT
  const handleExpressCheckout = async () => {
    if (!formData.email) {
      alert("Please enter your email first");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Creating express checkout cart...");

      const response = await createCart(product.variantId, 1, {
        email: formData.email,
      });

      console.log("Express checkout response:", response);

      // Check response structure
      if (!response || !response.data) {
        throw new Error("Invalid response from API");
      }

      const { cartCreate } = response.data;

      if (!cartCreate) {
        throw new Error("No cartCreate in response");
      }

      const { cart, userErrors } = cartCreate;

      if (userErrors && userErrors.length > 0) {
        alert(`Error: ${userErrors[0].message}`);
        setIsProcessing(false);
        return;
      }

      if (!cart || !cart.checkoutUrl) {
        throw new Error("No checkout URL returned");
      }

      // Redirect to Shopify checkout
      console.log("Redirecting to:", cart.checkoutUrl);
      window.location.href = cart.checkoutUrl;
    } catch (error) {
      console.error("Express checkout error:", error);
      console.error("Error details:", error.message);
      alert(`Failed to initiate checkout: ${error.message}`);
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">
            Loading checkout...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Fetching latest product details
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => navigate("/")}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6, .display-font {
          font-family: 'Bricolage Grotesque', sans-serif;
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .wallet-button {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .wallet-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.2);
        }
        
        .wallet-button:active {
          transform: translateY(0);
        }
        
        input:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
        
        .input-field {
          transition: all 0.2s ease;
        }
        
        .loading-spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          width: 24px;
          height: 24px;
          animation: spin 0.6s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-emerald-600" />
              <span className="text-xl font-bold display-font text-gray-900">
                Siddha Foot Science
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span className="font-medium">Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Checkout Form */}
          <div className="animate-slide-up">
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <h1 className="text-3xl font-bold display-font text-gray-900 mb-8">
                Checkout
              </h1>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Express Checkout */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Express Checkout
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    Enter your email and use express checkout for faster payment
                  </p>

                  <div className="mb-4">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={handleExpressCheckout}
                      disabled={isProcessing || !formData.email}
                      className="wallet-button bg-white border-2 border-gray-300 py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
                    >
                      <span className="text-sm font-bold text-gray-700">
                        Google Pay
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExpressCheckout}
                      disabled={isProcessing || !formData.email}
                      className="wallet-button bg-purple-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700"
                    >
                      <span className="text-sm font-bold">Shop Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExpressCheckout}
                      disabled={isProcessing || !formData.email}
                      className="wallet-button bg-white border-2 border-gray-300 py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
                    >
                      <span className="text-sm font-bold text-gray-700">
                        UPI
                      </span>
                    </button>
                  </div>

                  <div className="mt-4 text-center">
                    <div className="flex items-center">
                      <div className="flex-1 border-t border-gray-300"></div>
                      <span className="px-4 text-sm text-gray-500 font-medium">
                        OR ENTER FULL DETAILS
                      </span>
                      <div className="flex-1 border-t border-gray-300"></div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input-field w-full px-4 py-3 border border-gray-300 rounded-xl"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field w-full px-4 py-3 border border-gray-300 rounded-xl"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="input-field w-full px-4 py-3 border border-gray-300 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="input-field w-full px-4 py-3 border border-gray-300 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="input-field w-full px-4 py-3 border border-gray-300 rounded-xl"
                        placeholder="Street address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className="input-field w-full px-4 py-3 border border-gray-300 rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="input-field w-full px-4 py-3 border border-gray-300 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="input-field w-full px-4 py-3 border border-gray-300 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          className="input-field w-full px-4 py-3 border border-gray-300 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="loading-spinner mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Continue to Shopify Payment
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-gray-500">
                  You'll be redirected to Shopify's secure checkout page
                </p>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div
            className="lg:sticky lg:top-8 h-fit animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-200">
              <h2 className="text-2xl font-bold display-font text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="relative flex-shrink-0">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                          <Package className="w-10 h-10 text-emerald-600" />
                        </div>
                      )}
                      <div className="absolute -top-2 -right-2 bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        1
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {product.bottles} Bottle
                            {product.bottles > 1 ? "s" : ""} • {product.bottles}{" "}
                            Month Supply
                          </p>
                        </div>
                        {product.discount > 0 && (
                          <div className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1">
                            <Tag className="w-3 h-3" />
                            <span>{product.discount}% OFF</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-baseline space-x-2 mb-3">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice &&
                          product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{product.originalPrice.toFixed(2)}
                            </span>
                          )}
                      </div>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-2">
                        {product.features?.slice(0, 4).map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-1 text-xs text-gray-600"
                          >
                            <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                {totalDiscount > 0 && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Original Price</span>
                      <span className="text-gray-500 line-through">
                        ₹{originalTotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-600 font-medium">
                        Discount Savings
                      </span>
                      <span className="font-semibold text-emerald-600">
                        -₹{totalDiscount.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated GST (18%)</span>
                  <span className="font-semibold text-gray-900">
                    ₹{tax.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Estimated Total
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      ₹{total.toFixed(2)}
                    </p>
                  </div>
                  {totalDiscount > 0 && (
                    <div className="text-right">
                      <p className="text-xs text-gray-600 mb-1">You Save</p>
                      <p className="text-xl font-bold text-emerald-600">
                        ₹{totalDiscount.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-900">
                        Secure Payment via Shopify
                      </p>
                      <p className="text-xs text-emerald-700 mt-1">
                        Your payment is processed securely by Shopify
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900">
                        30-Day Money Back Guarantee
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        100% satisfaction guaranteed or your money back
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
