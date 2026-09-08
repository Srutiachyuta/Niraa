import React, { useState } from 'react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';
import { RotateCcw, Sparkles, Shield, Droplets, Heart } from 'lucide-react';

interface Props {
  product: Product;
}

export const InteractiveBottleViewer: React.FC<Props> = ({ product }) => {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const angles = [
    { label: 'Front Crest', sub: 'Embossed Label & Seal', image: product.primaryImage },
    {
      label: 'Crystal Pour',
      sub: 'Natural Sparkling Effervescence',
      image: product.galleryImages[1] || product.primaryImage,
    },
    {
      label: 'Dawn Harvest',
      sub: 'Wild Khajur Tree Terroir',
      image: product.galleryImages[2] || product.primaryImage,
    },
    {
      label: 'Complete Flight',
      sub: 'Cellar Presentation',
      image: product.galleryImages[3] || product.primaryImage,
    },
  ];

  const hotspots = [
    {
      id: 'gold-cap',
      top: '12%',
      left: '52%',
      title: 'Airtight Gold Embossed Seal',
      desc: 'Seals in delicate natural effervescence and prevents atmospheric oxidation.',
      icon: Sparkles,
    },
    {
      id: 'botanical-label',
      top: '48%',
      left: '50%',
      title: 'Pristine Phoenix Sylvestris',
      desc: '100% cold-stabilized raw sap tapped in pre-chilled clay pots before dawn.',
      icon: Droplets,
    },
    {
      id: 'glass-pedestal',
      top: '80%',
      left: '50%',
      title: 'Recyclable Heavy Flint Glass',
      desc: 'Preserves thermal integrity at 2°C–6°C throughout our cold chain logistics.',
      icon: Shield,
    },
  ];

  return (
    <div className="bg-[#F5F1E9] p-6 border border-[#DFCA9B]/50 relative rounded-sm">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DFCA9B]/40">
        <div className="flex items-center space-x-2 text-xs text-[#14281E] font-medium">
          <RotateCcw className="w-4 h-4 text-[#C5A265] animate-spin-slow" />
          <span className="uppercase tracking-widest text-[11px]">Interactive Cellar Inspection</span>
        </div>
        <span className="text-[10px] bg-[#14281E] text-[#DFCA9B] px-2 py-0.5 rounded font-mono">
          ANGLE {activeAngleIndex + 1} OF {angles.length}
        </span>
      </div>

      {/* Main Showcase Canvas */}
      <div className="relative aspect-4/3 max-h-96 flex items-center justify-center overflow-hidden bg-radial from-white to-[#F5F1E9]">
        <SafeImage
          src={angles[activeAngleIndex].image}
          alt={`${product.name} angle ${activeAngleIndex + 1}`}
          className="max-h-80 w-auto object-contain transition-all duration-500 drop-shadow-2xl"
        />

        {/* Interactive Hotspot Pins on primary front angle */}
        {activeAngleIndex === 0 &&
          hotspots.map((spot) => (
            <div
              key={spot.id}
              style={{ top: spot.top, left: spot.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  activeHotspot === spot.id
                    ? 'bg-[#C5A265] text-[#0C1A13] scale-125 ring-4 ring-[#C5A265]/40'
                    : 'bg-[#14281E]/80 text-[#DFCA9B] hover:scale-110 hover:bg-[#14281E]'
                }`}
                title={spot.title}
              >
                <spot.icon className="w-3.5 h-3.5" />
              </button>

              {activeHotspot === spot.id && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-56 bg-[#0C1A13] text-[#FAF8F5] p-3 text-xs shadow-2xl border border-[#C5A265]/60 z-30 animate-in fade-in zoom-in-95">
                  <p className="font-serif-luxury font-semibold text-[#DFCA9B] text-xs">{spot.title}</p>
                  <p className="text-[11px] text-[#FAF8F5]/80 mt-1 leading-relaxed">{spot.desc}</p>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Angle Selector Tabs */}
      <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-[#DFCA9B]/40">
        {angles.map((angle, idx) => (
          <button
            key={idx}
            onClick={() => setActiveAngleIndex(idx)}
            className={`p-2 text-left border transition-all cursor-pointer ${
              activeAngleIndex === idx
                ? 'border-[#14281E] bg-[#FAF8F5] shadow-xs'
                : 'border-[#DFCA9B]/40 bg-white/60 hover:bg-white'
            }`}
          >
            <p className="text-[11px] font-semibold text-[#14281E] truncate">{angle.label}</p>
            <p className="text-[9px] text-[#5C6761] truncate">{angle.sub}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
