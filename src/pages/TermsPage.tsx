import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div id="page-terms" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
            House of NIRAA™
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury text-[#14281E] font-medium mt-1">
            Terms & Conditions of Sale
          </h1>
          <p className="text-xs text-[#5C6761] mt-2">Last Revised: September 2026</p>
        </div>

        <div className="bg-white p-8 border border-[#DFCA9B]/50 space-y-6 text-xs sm:text-sm text-[#5C6761] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-serif-luxury font-bold text-[#14281E]">1. Scope of Agreement</h2>
            <p>
              By accessing the website or acquiring goods through NIRAA Luxury Beverages Private Limited, you agree to comply with these terms, governing purchases, cellar subscriptions, delivery protocols, and user conduct.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif-luxury font-bold text-[#14281E]">2. Living Perishable Nature of Products</h2>
            <p>
              NIRAA products are raw, unpasteurized, non-alcoholic botanicals tapped fresh from wild Khajur trees. They require uninterrupted refrigeration at 2°C–6°C. Customers agree to receive deliveries promptly upon arrival and immediately store bottles in appropriate refrigeration.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif-luxury font-bold text-[#14281E]">3. Cellar Subscription Policy</h2>
            <p>
              Subscribers to the "Never Run Out of NIRAA" program receive recurring shipments at discounted rates. Subscriptions may be paused, modified, or terminated at any time prior to the 24-hour cutoff preceding scheduled dawn harvesting.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif-luxury font-bold text-[#14281E]">4. Pricing and Payment Verification</h2>
            <p>
              All prices are listed in Indian Rupees (INR) inclusive of applicable goods and services taxes (GST). Overseas pricing reflects currency conversion rates at the time of checkout. Orders are dispatched only upon full payment authorization.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
