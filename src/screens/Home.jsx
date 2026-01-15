import { useEffect, useState } from "react";
import ExitIntentPopup from "../components/ExitIntentPopup";
import FAQ from "../components/FAQ";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Ingredients from "../components/Ingredients";
import Pricing from "../components/Pricing";
import ProblemSolution from "../components/ProblemSolution";
import ProductShowcase from "../components/ProductShowcase";
import StickyCTA from "../components/StickeyCTA";
import TrustProof from "../components/TrustProof";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ProblemSolution />
      <ProductShowcase />
      <TrustProof />
      <HowItWorks />
      <Ingredients />
      <Pricing />
      <FAQ />
      <StickyCTA />
      <ExitIntentPopup />

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Siddha Foot Science</h3>
              <p className="text-gray-400 text-sm">
                Ancient wisdom meets modern healing for complete foot care.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Shop Now
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-white transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="tel:+919876543210"
                    className="hover:text-white transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@siddhafootscience.com"
                    className="hover:text-white transition-colors"
                  >
                    support@siddhafootscience.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp Chat
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Guarantee</h4>
              <p className="text-sm text-gray-400 mb-2">30-Day Money Back</p>
              <p className="text-sm text-gray-400 mb-2">Free Shipping</p>
              <p className="text-sm text-gray-400">Secure Checkout</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Siddha Foot Science. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
