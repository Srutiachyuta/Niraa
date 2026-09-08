import React from 'react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/SafeImage';
import { Sparkles, ArrowRight, ShieldCheck, Thermometer, Droplets, Clock, Truck, Sun } from 'lucide-react';
import { ASSETS } from '../data/assets';

export const PalmToBottlePage: React.FC = () => {
  const { setActivePage } = useStore();

  const steps = [
    {
      number: '01',
      title: 'Pre-Dawn Precision Tapping',
      time: '03:30 AM – 05:30 AM',
      location: 'Wild Phoenix Sylvestris (Khajur Tree) Sanctuaries, Karnataka & Gujarat',
      description:
        'Harvesting begins long before sunlight strikes the wild Khajur tree crowns. Master artisan climbers, hailing from generational guild families, ascend 40-foot wild Khajur trees to slice a paper-thin incision into the spadix. The unfermented living nectar drips slowly into sterile, chilled earthenware pots treated with natural mineral lime sediment.',
      icon: Clock,
      stat: '0.00% Fermentation',
    },
    {
      number: '02',
      title: 'Instant Terroir Chilling',
      time: 'Within 30 Minutes of Harvest',
      location: 'Grove-Side Mobile Cryo-Stations',
      description:
        'Wild Khajur tree sap is rich in natural complex sugars, minerals, and live ambient enzymes. If left uncooled, natural ambient fermentation begins within 90 minutes. NIRAA deploys solar-powered grove-side chillers that instantly plunge the freshly tapped Khajur neera from ambient morning temperatures down to 2°C, suspending metabolic breakdown.',
      icon: Thermometer,
      stat: '2°C Immediate Cryo-Lock',
    },
    {
      number: '03',
      title: 'Gentle Sub-Micron Cold Filtration',
      time: 'Clean Room Processing Facility',
      location: 'NIRAA Central Cellar Facility',
      description:
        'Unlike commercial beverages that boil or pasteurize juice (which kills delicate heat-sensitive enzymes and alters natural caramel floral tones), NIRAA uses multistage pharmaceutical ceramic membranes. This removes pollen and particulate while preserving active vitamins, minerals, and natural effervescence of the Khajur tree nectar.',
      icon: Droplets,
      stat: 'Zero Heat Applied',
    },
    {
      number: '04',
      title: 'Bottling & Inert Nitrogen Purge',
      time: 'Pharmaceutical Cleanroom',
      location: 'ISO 22000 & FSSAI Luxury Certified Facility',
      description:
        'Filtered Khajur tree neera is bottled in heavyweight, UV-protective flint glass. Each bottle receives a micro-purge of certified food-grade nitrogen to displace oxygen before being crowned with our signature airtight gold seal, locking in freshness for up to 90 days cold shelf life.',
      icon: ShieldCheck,
      stat: '100% Recyclable Glass',
    },
    {
      number: '05',
      title: 'Temperature-Logged Cold Express',
      time: '24–36 Hour Metro Dispatch',
      location: 'Air Cargo & Insulated Cold Vans',
      description:
        'Packed into biodegradable insulated coolers with non-toxic phase-change refrigerant gel packs. Each crate travels through dedicated temperature-monitored air logistics to arrive at your residence ice-cold, ready for your morning wellness ritual.',
      icon: Truck,
      stat: '2°C–6°C Monitored Freight',
    },
  ];

  return (
    <div id="page-palm-to-bottle" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
            The Living Science
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif-luxury text-[#14281E] font-medium mt-2">
            The Khajur Tree to Bottle Journey
          </h1>
          <p className="text-sm sm:text-base text-[#5C6761] mt-4 leading-relaxed">
            The journey of raw wild Khajur tree neera is an uncompromising race against the morning sun. How ancient botanical wisdom and modern cold-chain engineering deliver pristine unpasteurized nectar.
          </p>
        </div>

        {/* Hero Visual Collage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div className="relative border border-[#DFCA9B]/50 p-2 bg-white">
            <SafeImage
              src={ASSETS.khajurSunrise || ASSETS.harvestArtisan}
              alt="Artisan Khajur Tree Harvest at dawn"
              className="w-full h-80 sm:h-96 object-cover"
            />
            <div className="p-4 bg-[#FAF8F5]">
              <p className="font-serif-luxury text-base text-[#14281E] font-semibold">Pre-Dawn Khajur Harvesting Ritual</p>
              <p className="text-xs text-[#5C6761] mt-0.5">Tapped before sunlight initiates natural yeast activity in the wild trees.</p>
            </div>
          </div>

          <div className="relative border border-[#DFCA9B]/50 p-2 bg-white">
            <SafeImage
              src={ASSETS.khajurCrystalCoupe || ASSETS.pourGlass}
              alt="Freshly poured wild Khajur neera in crystal glass"
              className="w-full h-80 sm:h-96 object-cover"
            />
            <div className="p-4 bg-[#FAF8F5]">
              <p className="font-serif-luxury text-base text-[#14281E] font-semibold">Pristine Unpasteurized Living Liquid</p>
              <p className="text-xs text-[#5C6761] mt-0.5">Natural micro-effervescence and alive electrolyte balance in crystal coupe.</p>
            </div>
          </div>
        </div>

        {/* Sequential Timeline Steps */}
        <div className="relative border-l border-[#DFCA9B] ml-4 md:ml-32 space-y-16 pl-6 md:pl-12 pb-12">
          {steps.map((step, idx) => (
            <div key={step.number} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-6 h-6 rounded-full bg-[#14281E] text-[#DFCA9B] border-2 border-[#C5A265] flex items-center justify-center text-[10px] font-bold">
                {idx + 1}
              </div>

              <div className="bg-white p-6 sm:p-8 border border-[#DFCA9B]/50 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DFCA9B]/30 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#C5A265] uppercase">
                      Stage {step.number} • {step.time}
                    </span>
                    <h3 className="text-2xl font-serif-luxury font-bold text-[#14281E] mt-0.5">
                      {step.title}
                    </h3>
                  </div>
                  <span className="inline-block bg-[#14281E] text-[#DFCA9B] text-xs font-mono px-3 py-1 font-semibold self-start sm:self-auto">
                    {step.stat}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#5C6761] leading-relaxed mb-4">
                  {step.description}
                </p>

                <p className="text-[11px] text-[#2A4836] font-medium flex items-center">
                  <span className="font-semibold text-[#14281E] mr-1">Location:</span> {step.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-[#14281E] text-[#FAF8F5] p-10 text-center max-w-4xl mx-auto border border-[#2A4836]">
          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-medium">Taste the Dawn Harvest</h3>
          <p className="text-xs sm:text-sm text-[#DFCA9B]/80 max-w-lg mx-auto mt-2">
            Experience wild Khajur tree neera in its truest, most immaculate state. Cold-shipped to your residence within 24 hours.
          </p>
          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-6 bg-[#C5A265] text-[#0C1A13] hover:bg-[#DFCA9B] px-8 py-3.5 text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer inline-flex items-center space-x-2"
          >
            <span>Order Cold Cellar Bottles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
