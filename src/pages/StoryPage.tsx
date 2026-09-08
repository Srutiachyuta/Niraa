import React from 'react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/SafeImage';
import { ArrowRight, Sparkles, Award, Heart, Globe, Leaf } from 'lucide-react';
import { ASSETS } from '../data/assets';

export const StoryPage: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <div id="page-story" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
            The House of NIRAA™
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif-luxury text-[#14281E] font-medium mt-2">
            Ancient Roots. <br />
            <span className="italic text-[#5C6761]">A Brighter Tomorrow.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#5C6761] mt-4 leading-relaxed font-light">
            Rooted in India's botanical heritage, elevated for the world’s most refined living tables.
          </p>
        </div>

        {/* Hero Vignette */}
        <div className="relative border border-[#DFCA9B]/60 p-3 bg-white mb-16 shadow-xl">
          <SafeImage
            src={ASSETS.heroBottles}
            alt="NIRAA Luxury Heritage"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute -bottom-6 right-6 bg-[#0C1A13] text-[#FAF8F5] p-6 max-w-sm hidden sm:block border border-[#C5A265]/40 shadow-2xl">
            <p className="font-serif-luxury text-sm tracking-widest text-[#DFCA9B] uppercase font-semibold">
              The Living Nectar
            </p>
            <p className="text-xs text-[#FAF8F5]/80 mt-1 leading-relaxed">
              "We did not invent this drink. Nature perfected it thousands of years ago. Our calling is simply to protect its sanctity."
            </p>
          </div>
        </div>

        {/* Narrative Chapters */}
        <div className="space-y-16 max-w-3xl mx-auto text-sm sm:text-base text-[#5C6761] leading-relaxed">
          {/* Chapter 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#14281E]">
              1. The Sacred Khajur Tree of the Subcontinent
            </h2>
            <p>
              In classical Sanskrit manuscripts, the wild date palm / Khajur tree (<em>Phoenix Sylvestris</em>) is revered as <em>Kalpavriksha of the Arid Lands</em>. While other crops wither in drought, wild Khajur trees plunge deep roots into subterranean aquifers, drawing up pure, mineral-laden moisture and filtering it through twenty years of botanical cellular structure.
            </p>
            <p>
              Before sunrise, this moisture emerges at the Khajur tree’s apex as <strong>Neera</strong>: a clear, naturally effervescent sap teeming with bio-available potassium, magnesium, zinc, and active living enzymes.
            </p>
          </section>

          {/* Chapter 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#14281E]">
              2. The Disappearance of a Royal Elixir
            </h2>
            <p>
              For centuries, neera was savored exclusively near Khajur tree sanctuaries at dawn. Because the raw sap contains wild natural sugars and active yeasts, morning sunlight quickly triggers spontaneous fermentation into alcoholic toddy. Lacking refrigeration, urban populations were cut off from this pristine nectar.
            </p>
            <p>
              As industrial soda conglomerates flooded the subcontinent with high-fructose corn syrups, artificial colorants, and synthetic flavor packs, India’s sacred Khajur tree tapping traditions began to fade into forgotten folklore.
            </p>
          </section>

          {/* Chapter 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#14281E]">
              3. The Birth of NIRAA™
            </h2>
            <p>
              In 2024, NIRAA set out to solve the central paradox of neera: <em>How do you share an intensely perishable, living botanical beverage with the world without cooking, pasteurizing, or adding chemical stabilizers?</em>
            </p>
            <p>
              The answer lay in cold-chain logistics. By investing in grove-side solar chilling pods, clinical micro-filtration, and dedicated insulated air cargo, NIRAA unlocked the ability to deliver raw neera anywhere in India at 2°C–6°C within 24 hours of harvest.
            </p>
          </section>

          {/* Pillar Values Box */}
          <div className="bg-[#F5F1E9] p-8 border border-[#DFCA9B]/50 my-12">
            <h3 className="font-serif-luxury text-xl text-[#14281E] mb-4 text-center">
              The Four Pillars of the House
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#5C6761]">
              <div className="space-y-1">
                <p className="font-semibold text-[#14281E] flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#C5A265]" />
                  Zero Adulteration
                </p>
                <p>Never diluted with water, never boosted with cane sugar, never stabilized with sodium benzoate.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-[#14281E] flex items-center">
                  <Leaf className="w-3.5 h-3.5 mr-1.5 text-[#C5A265]" />
                  Regenerative Wild Harvest
                </p>
                <p>We only tap wild Khajur trees without artificial fertilizers, safeguarding regional biodiversity.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-[#14281E] flex items-center">
                  <Heart className="w-3.5 h-3.5 mr-1.5 text-[#C5A265]" />
                  Artisan Dignity
                </p>
                <p>Guild harvesters receive 3.5x traditional commodity compensation and complete medical insurance.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-[#14281E] flex items-center">
                  <Globe className="w-3.5 h-3.5 mr-1.5 text-[#C5A265]" />
                  Global Modernity
                </p>
                <p>Presenting Indian botanical heritage in heavyweight flint glass designed for the world stage.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#14281E] text-[#F3EBDD] hover:bg-[#2A4836] px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer inline-flex items-center space-x-2"
          >
            <span>Experience The NIRAA Collection</span>
            <ArrowRight className="w-4 h-4 text-[#C5A265]" />
          </button>
        </div>
      </div>
    </div>
  );
};
