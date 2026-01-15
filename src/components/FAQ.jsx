import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How long does it take to see results?",
      answer:
        "Most customers notice visible improvement within 7 days of regular use. For severe cases of cracked heels or calluses, we recommend using the product for 2-3 weeks for optimal results. Consistency is key!",
    },
    {
      question: "Is this product safe for sensitive skin?",
      answer:
        "Yes! Our formula is 100% natural and dermatologically tested. It contains no harsh chemicals, parabens, or sulfates. However, if you have extremely sensitive skin or known allergies, we recommend doing a patch test first.",
    },
    {
      question: "How often should I apply the cream?",
      answer:
        "For best results, apply the cream twice daily - once in the morning and once before bed. After evening application, wear cotton socks to enhance absorption and effectiveness.",
    },
    {
      question: "What makes this different from other foot creams?",
      answer:
        "Unlike conventional creams that only moisturize the surface, our Siddha-based formula treats the root cause. We use ancient herbal ingredients that penetrate deep into the skin layers, promoting natural healing from within.",
    },
    {
      question: "Do you offer a money-back guarantee?",
      answer:
        "Absolutely! We offer a 30-day money-back guarantee. If you're not satisfied with the results, simply contact our customer support team for a full refund. No questions asked.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "We offer free shipping across India. Most orders are delivered within 3-5 business days. You'll receive a tracking number via email once your order is dispatched.",
    },
    {
      question: "Can I use this if I have diabetes?",
      answer:
        "Our product is made from natural ingredients and is generally safe. However, we always recommend consulting your healthcare provider before using any new foot care product if you have diabetes or other medical conditions.",
    },
    {
      question: "What if the product doesn't work for me?",
      answer:
        "While our product has a 94% success rate, results can vary. If you don't see improvement after consistent use for 30 days, simply reach out to us for a full refund under our money-back guarantee.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our product
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-200 hover:border-emerald-300 transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-emerald-50 rounded-2xl p-8 border-2 border-emerald-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our customer support team is here to help you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              <span className="mr-2">💬</span>
              WhatsApp Support
            </a>
            <a
              href="mailto:support@siddhafootscience.com"
              className="inline-flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              <span className="mr-2">📧</span>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
