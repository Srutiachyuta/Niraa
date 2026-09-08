import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div id="page-privacy" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
            House of NIRAA™
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury text-[#14281E] font-medium mt-1">
            Privacy Policy & Data Ethics
          </h1>
          <p className="text-xs text-[#5C6761] mt-2">Last Revised: September 2026</p>
        </div>

        <div className="bg-white p-8 border border-[#DFCA9B]/50 space-y-6 text-xs sm:text-sm text-[#5C6761] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-serif-luxury font-bold text-[#14281E]">1. Commitment to Patron Discretion</h2>
            <p>
              NIRAA Luxury Beverages Private Limited ("NIRAA", "we", "our") respects the privacy and confidentiality of our esteemed patrons. We treat all personal information with the same rigorous care we apply to our cold-chain botanical products.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif-luxury font-bold text-[#14281E]">2. Data Collected</h2>
            <p>
              When purchasing from our living cellar or subscribing to recurring allocations, we collect your name, shipping address, telephone number, email, and preferred delivery instructions. Payment information (such as credit card numbers or UPI handles) is processed directly via PCI-DSS certified gateway partners (Razorpay/Stripe); NIRAA never stores raw credit card credentials on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif-luxury font-bold text-[#14281E]">3. Use of Personal Information</h2>
            <p>
              Your contact coordinates are utilized exclusively for fulfilling cold-chain shipments, transmitting order status updates, providing concierge assistance, and, should you opt in, sharing private invitations to limited vintage releases and Ayurvedic research.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif-luxury font-bold text-[#14281E]">4. Zero Data Commercialization</h2>
            <p>
              We do not sell, rent, monetize, or disclose your personal data to external marketing brokers. Data is shared solely with vetted logistics partners (e.g. Blue Dart, Delhivery) strictly for executing temperature-controlled delivery to your residence.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
