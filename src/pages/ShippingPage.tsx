import React from 'react';
import { useStore } from '../context/StoreContext';
import { Truck, ShieldCheck, Thermometer, AlertCircle, ArrowRight } from 'lucide-react';

export const ShippingPage: React.FC = () => {
  const { setActivePage, siteSettings, formatPrice } = useStore();

  return (
    <div id="page-shipping" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
            Cryo Logistics & Cold Chain
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif-luxury text-[#14281E] font-medium mt-2">
            Shipping & Freshness Protocols
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6761] mt-3 max-w-xl mx-auto leading-relaxed">
            Raw wild Khajur tree neera is an unpasteurized, living botanical beverage. To ensure peak freshness, we have engineered a proprietary cold-chain logistics network across India.
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="bg-[#14281E] text-[#FAF8F5] p-6 sm:p-8 border border-[#2A4836] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif-luxury text-xl text-[#DFCA9B]">Complimentary Express Shipping</h3>
            <p className="text-xs text-[#FAF8F5]/80">
              Orders of {formatPrice(siteSettings.freeShippingThreshold)} and above qualify for complimentary cold-chain express air shipping.
            </p>
          </div>
          <button
            onClick={() => setActivePage('shop')}
            className="bg-[#C5A265] text-[#0C1A13] hover:bg-[#DFCA9B] px-6 py-2.5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer"
          >
            Shop Cellar
          </button>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white p-8 border border-[#DFCA9B]/50 space-y-8 text-xs sm:text-sm text-[#5C6761] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-serif-luxury font-bold text-[#14281E] flex items-center">
              <Thermometer className="w-4 h-4 mr-2 text-[#C5A265]" />
              1. Continuous 2°C–6°C Cold Chain
            </h2>
            <p>
              Every NIRAA bottle is harvested at dawn, pre-chilled grove-side within 30 minutes, and placed into insulated thermal shippers lined with non-toxic phase-change refrigerant gel packs. Temperature indicators are inspected upon dispatch to guarantee thermal stability throughout transit.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif-luxury font-bold text-[#14281E] flex items-center">
              <Truck className="w-4 h-4 mr-2 text-[#C5A265]" />
              2. Delivery Timelines by Region
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 mt-2 text-xs">
              <li><strong>Tier 1 Metros (Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Chennai):</strong> Delivered within 24 hours of dawn bottling via Blue Dart Cold-Chain Air.</li>
              <li><strong>Tier 2 Cities:</strong> Delivered within 24 to 36 hours via specialized temperature-controlled air logistics.</li>
              <li><strong>Remote / Non-Air Corridor Pincodes:</strong> Currently unserviceable to safeguard product sanctity. We will not ship where thermal maintenance cannot be guaranteed.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif-luxury font-bold text-[#14281E] flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-[#C5A265]" />
              3. The NIRAA Temperature Guarantee & Replacement Policy
            </h2>
            <p>
              Upon receiving your package, inspect the temperature of the bottles. They should feel distinctly chilled to the touch. If your bottles arrive warm or exceeding 8°C due to transit delays, notify our Concierge within 4 hours with a photograph, and we will issue an immediate priority replacement at zero charge.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif-luxury font-bold text-[#14281E] flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-[#C5A265]" />
              4. Immediate Refrigeration Required
            </h2>
            <p>
              Because NIRAA contains no chemical preservatives, artificial acids, or pasteurized thermal treatment, bottles <strong>must be transferred to a domestic refrigerator (2°C–6°C) immediately</strong> upon delivery. Consume within 14 days of the harvest date stamped on the bottleneck.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
