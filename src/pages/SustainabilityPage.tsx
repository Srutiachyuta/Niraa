import React from 'react';
import { useStore } from '../context/StoreContext';
import { Leaf, Droplets, HeartHandshake, ShieldCheck, ArrowRight, Sparkles, Recycle } from 'lucide-react';
import { ASSETS } from '../data/assets';

export const SustainabilityPage: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <div id="page-sustainability" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
            Ecology & Community
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif-luxury text-[#14281E] font-medium mt-2">
            Regenerative Living
          </h1>
          <p className="text-sm sm:text-base text-[#5C6761] mt-4 leading-relaxed font-light">
            How a beverage harvested from wild trees can replenish ecosystems and uplift agrarian communities across India.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 border border-[#DFCA9B]/50 text-center">
            <Droplets className="w-8 h-8 text-[#C5A265] mx-auto mb-3" />
            <p className="text-3xl font-serif-luxury font-bold text-[#14281E]">0 Liters</p>
            <p className="text-xs uppercase tracking-widest text-[#5C6761] mt-1 font-semibold">
              Groundwater Irrigation
            </p>
            <p className="text-xs text-[#5C6761] mt-2 leading-relaxed">
              Unlike almond or citrus orchards, wild Khajur trees flourish naturally without artificial irrigation.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#DFCA9B]/50 text-center">
            <HeartHandshake className="w-8 h-8 text-[#C5A265] mx-auto mb-3" />
            <p className="text-3xl font-serif-luxury font-bold text-[#14281E]">3.5x</p>
            <p className="text-xs uppercase tracking-widest text-[#5C6761] mt-1 font-semibold">
              Fair Guild Wage
            </p>
            <p className="text-xs text-[#5C6761] mt-2 leading-relaxed">
              Harvesters receive verified living wages and safety equipment directly into cooperative bank accounts.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#DFCA9B]/50 text-center">
            <Recycle className="w-8 h-8 text-[#C5A265] mx-auto mb-3" />
            <p className="text-3xl font-serif-luxury font-bold text-[#14281E]">100%</p>
            <p className="text-xs uppercase tracking-widest text-[#5C6761] mt-1 font-semibold">
              Recyclable Flint Glass
            </p>
            <p className="text-xs text-[#5C6761] mt-2 leading-relaxed">
              Zero single-use plastic bottles. Thermal shipping boxes utilize biodegradable mycelium and cornstarch liners.
            </p>
          </div>
        </div>

        {/* Deep Dive Sections */}
        <div className="space-y-12 text-sm sm:text-base text-[#5C6761] leading-relaxed max-w-3xl mx-auto">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#14281E] mb-3">
              The Wild Khajur Tree Sanctuary Model
            </h2>
            <p>
              In conventional modern agriculture, intensive monoculture depletes soil microbiomes, drains ancient aquifers, and relies heavily on chemical pesticides. <strong>Phoenix Sylvestris (Khajur Tree)</strong>, by contrast, is a native wild species that thrives on India’s arid margins.
            </p>
            <p className="mt-3">
              By monetizing the wild harvest of unfermented neera, NIRAA gives agrarian landholders a powerful economic incentive to protect wild Khajur tree sanctuaries rather than clearing them for commercial real estate or eucalyptus plantations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#14281E] mb-3">
              The Cellar Bottle Return & Circularity Circle
            </h2>
            <p>
              Every NIRAA bottle is made of premium heavyweight flint glass designed for longevity. In our primary metro delivery corridors (Bengaluru, Mumbai, Delhi-NCR), patrons can schedule doorstep collections of rinsed bottles. For every crate returned, customers receive ₹150 in cellar credit toward their next harvest allocation.
            </p>
          </div>

          {/* Cryo liner callout */}
          <div className="bg-[#14281E] text-[#FAF8F5] p-8 border border-[#2A4836]">
            <h3 className="font-serif-luxury text-xl text-[#DFCA9B] mb-2">
              Non-Toxic Biodegradable Cryo Packaging
            </h3>
            <p className="text-xs text-[#FAF8F5]/80 leading-relaxed">
              Our insulated cold-chain boxes contain zero Styrofoam (EPS). We utilize compressed plant cellulose panels and water-based, non-toxic coolant gels that can be safely poured down household drains or used to water home gardens.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#C5A265] text-[#0C1A13] hover:bg-[#DFCA9B] px-8 py-3.5 text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer inline-flex items-center space-x-2"
          >
            <span>Support Regenerative Harvesting</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
