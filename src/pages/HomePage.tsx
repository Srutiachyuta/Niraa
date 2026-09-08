import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/SafeImage';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Eye,
  Heart,
  Droplets,
  Leaf,
  Calendar,
  Truck,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { ASSETS } from '../data/assets';

export const HomePage: React.FC = () => {
  const {
    products,
    formatPrice,
    addToCart,
    setQuickViewProduct,
    setSubscriptionModalProduct,
    setSelectedProductId,
    setActivePage,
    toggleWishlist,
    isInWishlist,
    showToast,
  } = useStore();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const heroProduct = products[0]; // NIRAA Pure Neera
  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="page-home" className="bg-[#FAF8F5] text-[#1C221F]">
      {/* 1. CINEMATIC LUXURY HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0C1A13] overflow-hidden">
        {/* Background Atmospheric Image with Vignette */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={ASSETS.heroBottles}
            alt="NIRAA Luxury Date-Palm Neera Collection"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A13] via-[#0C1A13]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C1A13] via-transparent to-[#0C1A13]"></div>
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center space-x-2 border border-[#C5A265]/50 bg-[#14281E]/80 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A265]" />
            <span className="text-[11px] font-mono tracking-widest text-[#DFCA9B] uppercase font-semibold">
              Dawn Harvest • Unpasteurized & Living
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-luxury font-normal text-[#FAF8F5] tracking-[0.08em] leading-[1.1] max-w-4xl mx-auto">
            Nature’s Purest <br className="hidden sm:inline" />
            <span className="italic font-light text-[#DFCA9B]">Living Cellular Elixir</span>
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-[#F3EBDD]/80 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            Harvested before sunrise from India’s sacred wild Khajur trees. 
            Delicate sweetness, natural sparkling effervescence, and vital electrolyte minerals preserved at 2°C–6°C.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-btn-explore"
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-[#C5A265] text-[#0C1A13] hover:bg-[#DFCA9B] px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-btn-ritual"
              onClick={() => {
                setActivePage('palm-to-bottle');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto border border-[#DFCA9B]/50 text-[#FAF8F5] hover:bg-[#14281E] px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer"
            >
              The Khajur to Bottle Journey
            </button>
          </div>

          {/* Key Metrics Banner */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#2A4836]/60 pt-8 text-left">
            <div>
              <p className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#DFCA9B]">100% Raw</p>
              <p className="text-[11px] text-[#FAF8F5]/60 uppercase tracking-wider">Unheated & Pure</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#DFCA9B]">~35 Low GI</p>
              <p className="text-[11px] text-[#FAF8F5]/60 uppercase tracking-wider">Sustained Vitality</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#DFCA9B]">4x Potassium</p>
              <p className="text-[11px] text-[#FAF8F5]/60 uppercase tracking-wider">Vs. Coconut Water</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#DFCA9B]">0.0% Alcohol</p>
              <p className="text-[11px] text-[#FAF8F5]/60 uppercase tracking-wider">Halal & Pure Heritage</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PHILOSOPHY / BRAND MANIFESTO */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
              The Heritage of Indian Khajur Trees
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury text-[#14281E] leading-tight font-medium">
              Ancient Roots. <br />
              <span className="italic font-light text-[#5C6761]">A Brighter Tomorrow.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#5C6761] leading-relaxed">
              For millennia, India’s royal courts and agrarian families revered fresh wild Khajur tree neera as <em>Amrita</em> — the divine nectar of longevity. Tapped before the morning sun triggers fermentation, this transparent, sparkling sap carries living enzymes, amino acids, and balanced electrolytes.
            </p>
            <p className="text-sm sm:text-base text-[#5C6761] leading-relaxed">
              NIRAA was born to rescue this sacred heritage from oblivion. By introducing clinical clean-room microfiltration and an unbroken 2°C–6°C cold chain, we bring pristine, unadulterated neera from remote wild Khajur tree sanctuaries directly to the modern world’s most discerning tables.
            </p>

            <div className="pt-4 flex items-center space-x-6">
              <div className="border-l-2 border-[#C5A265] pl-4">
                <p className="font-serif-luxury text-lg text-[#14281E] italic">
                  "Not just a drink, but a living connection to India’s soil, artisans, and ancient wisdom."
                </p>
                <p className="text-xs uppercase tracking-wider text-[#5C6761] mt-1 font-semibold">
                  The Master Harvester Guild of NIRAA
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative border border-[#DFCA9B]/50 p-3 bg-white shadow-xl">
              <img
                src={ASSETS.khajurSunrise || ASSETS.harvestArtisan}
                alt="Sacred Khajur Tree Harvest Sanctuary at Dawn"
                className="w-full h-[450px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#14281E] text-[#F3EBDD] p-5 shadow-2xl border border-[#C5A265]/40 hidden sm:block max-w-xs">
                <p className="text-xs font-serif-luxury uppercase tracking-widest text-[#DFCA9B]">Wild Botanical Reserve</p>
                <p className="text-xs text-[#FAF8F5]/80 mt-1 leading-snug">
                  Harvested exclusively from wild-growing Phoenix Sylvestris (Khajur) trees, never sprayed or farmed with synthetics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE CURATED COLLECTION */}
      <section className="py-20 bg-[#F5F1E9] border-y border-[#DFCA9B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
                Bottled at 2°C–6°C
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#14281E] font-medium mt-1">
                The Signature Collection
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              {['all', 'pure', 'infusion', 'reserve'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#14281E] text-[#F3EBDD] font-semibold'
                      : 'bg-white text-[#5C6761] hover:text-[#14281E] border border-[#DFCA9B]/40'
                  }`}
                >
                  {cat === 'all' ? 'All Formats' : `${cat} Series`}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const defaultVariant = product.variants[0];
              const isFav = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white border border-[#DFCA9B]/40 group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Canvas with Hover Badges */}
                  <div className="relative bg-[#FAF8F5] p-8 aspect-4/5 flex items-center justify-center overflow-hidden">
                    <SafeImage
                      src={product.primaryImage}
                      alt={product.name}
                      onClick={() => handleProductClick(product.id)}
                      className="max-h-64 object-contain group-hover:scale-105 transition-transform duration-500 cursor-pointer drop-shadow-md"
                    />

                    {/* Category pill */}
                    <span className="absolute top-3 left-3 bg-[#14281E] text-[#DFCA9B] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1">
                      {product.category}
                    </span>

                    {/* Wishlist button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-xs transition-colors cursor-pointer ${
                        isFav ? 'text-red-600' : 'text-[#5C6761] hover:text-[#14281E]'
                      }`}
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    {/* Quick View Button on Hover */}
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#0C1A13]/90 text-[#FAF8F5] hover:bg-[#14281E] text-xs px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5 uppercase tracking-wider cursor-pointer shadow-lg whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C5A265]" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Product Details Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Rating */}
                      <div className="flex items-center space-x-1.5 text-xs mb-2">
                        <div className="flex text-[#C5A265]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-[#14281E] font-semibold text-[11px]">{product.rating}</span>
                        <span className="text-[#5C6761] text-[11px]">({product.reviewsCount})</span>
                      </div>

                      <h3
                        onClick={() => handleProductClick(product.id)}
                        className="text-lg font-serif-luxury font-semibold text-[#14281E] hover:text-[#C5A265] transition-colors cursor-pointer leading-tight"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#5C6761] font-serif-luxury italic mt-1 line-clamp-1">
                        {product.tagline}
                      </p>

                      <div className="mt-3 flex items-baseline space-x-2">
                        <span className="text-lg font-serif-luxury font-bold text-[#14281E]">
                          {formatPrice(defaultVariant.price)}
                        </span>
                        {defaultVariant.compareAtPrice && (
                          <span className="text-xs text-[#5C6761] line-through">
                            {formatPrice(defaultVariant.compareAtPrice)}
                          </span>
                        )}
                        <span className="text-[11px] text-[#5C6761] ml-auto">{defaultVariant.size}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 pt-4 border-t border-[#DFCA9B]/30 flex space-x-2">
                      <button
                        onClick={() => addToCart(product, defaultVariant, 1)}
                        className="flex-1 bg-[#14281E] text-[#F3EBDD] hover:bg-[#2A4836] py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A265]" />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        onClick={() => setSubscriptionModalProduct(product)}
                        className="border border-[#14281E] text-[#14281E] hover:bg-[#14281E] hover:text-[#F3EBDD] p-2.5 transition-colors cursor-pointer"
                        title="Subscribe & Save 15%"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TASTING PROFILE & BOTANICAL SCIENCE */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
            The Sommelier Experience
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury text-[#14281E] font-medium mt-2">
            The Botanical Anatomy of Raw Neera
          </h2>
          <p className="text-sm sm:text-base text-[#5C6761] mt-4 leading-relaxed">
            Unlike industrial sugary soft drinks or pasteurized canned waters, raw wild Khajur tree sap is an alive, dynamic fluid. Harvested in sterile earthen containers before sunrise, it offers an incomparable sensory journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#FAF8F5] p-8 border border-[#DFCA9B]/50 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#14281E] text-[#C5A265] flex items-center justify-center mb-6">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif-luxury font-bold text-[#14281E]">Sensory Bouquet</h3>
              <p className="text-xs uppercase tracking-widest text-[#C5A265] mt-1 font-semibold">Tasting Notes</p>
              <ul className="mt-4 space-y-2 text-xs text-[#5C6761] leading-relaxed">
                <li>• <strong>Aroma:</strong> Delicate coconut blossom, early morning petrichor, and warm crushed wild Khajur leaves & dawn blossom.</li>
                <li>• <strong>Palate:</strong> Mild floral caramel sweetness balanced with natural crisp mineral clarity.</li>
                <li>• <strong>Mouthfeel:</strong> Micro-effervescent, silken, and profoundly thirst-quenching.</li>
              </ul>
            </div>
            <p className="text-[11px] text-[#C5A265] font-mono mt-6 pt-4 border-t border-[#DFCA9B]/30">
              NATURAL DISSOLVED SOLIDS: 12.5° BRIX
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FAF8F5] p-8 border border-[#DFCA9B]/50 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#14281E] text-[#C5A265] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif-luxury font-bold text-[#14281E]">Nutritional Supremacy</h3>
              <p className="text-xs uppercase tracking-widest text-[#C5A265] mt-1 font-semibold">Clinical Biochemistry</p>
              <ul className="mt-4 space-y-2 text-xs text-[#5C6761] leading-relaxed">
                <li>• <strong>Low Glycemic Index (~35):</strong> Safe, sustained cellular energy without insulin spikes.</li>
                <li>• <strong>Vital Electrolytes:</strong> Rich in bioavailable potassium, sodium, and magnesium for rapid hydration.</li>
                <li>• <strong>B-Complex & Vitamin C:</strong> Active antioxidant compounds that protect cell health.</li>
              </ul>
            </div>
            <p className="text-[11px] text-[#C5A265] font-mono mt-6 pt-4 border-t border-[#DFCA9B]/30">
              ZERO ARTIFICIAL PRESERVATIVES
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FAF8F5] p-8 border border-[#DFCA9B]/50 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#14281E] text-[#C5A265] flex items-center justify-center mb-6">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif-luxury font-bold text-[#14281E]">The Cryo Cold-Chain</h3>
              <p className="text-xs uppercase tracking-widest text-[#C5A265] mt-1 font-semibold">Freshness Logistics</p>
              <ul className="mt-4 space-y-2 text-xs text-[#5C6761] leading-relaxed">
                <li>• <strong>Unbroken 2°C–6°C:</strong> Temperature-logged throughout express air travel across India.</li>
                <li>• <strong>Insulated Packaging:</strong> Biodegradable thermal liners with non-toxic gel refrigerant packs.</li>
                <li>• <strong>24-Hour Doorstep Dispatch:</strong> Tapped fresh and transported to metropolitan hubs daily.</li>
              </ul>
            </div>
            <p className="text-[11px] text-[#C5A265] font-mono mt-6 pt-4 border-t border-[#DFCA9B]/30">
              PHARMACEUTICAL GRADE LOGISTICS
            </p>
          </div>
        </div>
      </section>

      {/* 5. SUBSCRIPTION CALLOUT ("Never Run Out of NIRAA") */}
      <section className="bg-[#0C1A13] text-[#FAF8F5] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#2A4836]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A265] font-semibold">
              The Cellar Reserve Membership
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-medium leading-tight">
              Never Run Out of <br />
              <span className="italic text-[#DFCA9B]">Your Morning Nectar</span>
            </h2>
            <p className="text-sm sm:text-base text-[#F3EBDD]/80 leading-relaxed max-w-xl">
              Make pure wild Khajur tree neera a cornerstone of your daily wellness routine. Join our Patron Subscription Circle to receive recurring, chilled crates delivered straight from the Khajur trees to your residence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#C5A265] shrink-0 mt-0.5" />
                <span className="text-xs text-[#FAF8F5]/90">
                  <strong>Save 15% Forever:</strong> Locked pricing on every recurring cold crate.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#C5A265] shrink-0 mt-0.5" />
                <span className="text-xs text-[#FAF8F5]/90">
                  <strong>Priority Allocation:</strong> Guaranteed reserve bottles even during scarce seasonal tapings.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#C5A265] shrink-0 mt-0.5" />
                <span className="text-xs text-[#FAF8F5]/90">
                  <strong>Flexible Control:</strong> Pause, shift delivery cadence, or cancel in 1 click anytime.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#C5A265] shrink-0 mt-0.5" />
                <span className="text-xs text-[#FAF8F5]/90">
                  <strong>Free Cryo Shipping:</strong> Complimentary express cold delivery on all subscriber orders.
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setSubscriptionModalProduct(heroProduct)}
                className="bg-[#C5A265] text-[#0C1A13] hover:bg-[#DFCA9B] px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer inline-flex items-center space-x-2"
              >
                <span>Customize Your Subscription</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative border border-[#C5A265]/40 p-4 bg-[#14281E]/60 backdrop-blur-md">
              <SafeImage
                src={ASSETS.khajurRoyalBox || ASSETS.giftSet}
                alt="NIRAA Luxury Reserve Crate"
                className="w-full h-80 object-cover shadow-2xl"
              />
              <div className="p-4 text-center">
                <p className="font-serif-luxury text-lg text-[#DFCA9B]">The Bi-Weekly Cellar Crate</p>
                <p className="text-xs text-[#FAF8F5]/70 mt-1">3x 350ml Bottles of Pure Wild Khajur Neera & Botanical Infusions</p>
                <p className="text-sm font-bold text-[#C5A265] mt-2">₹3,822 / delivery (Reg. ₹4,497)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOSPITALITY PARTNERS & PATRON REVIEWS */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
            Endorsed by Connoisseurs
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#14281E] font-medium mt-1">
            Voices from Our Patrons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 border border-[#DFCA9B]/50 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex text-[#C5A265] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#1C221F] italic leading-relaxed">
                "NIRAA has replaced morning espresso in our household. The natural effervescence is utterly sublime — it tastes like fresh rain and crushed wild Khajur blossoms. A triumph of Indian culinary craftsmanship."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DFCA9B]/30 flex items-center justify-between">
              <div>
                <p className="text-xs font-serif-luxury font-bold text-[#14281E]">Vikramaditya S.</p>
                <p className="text-[10px] text-[#5C6761]">Bengaluru • Verified Cellar Patron</p>
              </div>
              <span className="text-[10px] bg-[#C5A265]/20 text-[#14281E] px-2 py-0.5 rounded font-semibold">
                Pure Neera 300ml
              </span>
            </div>
          </div>

          <div className="bg-white p-8 border border-[#DFCA9B]/50 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex text-[#C5A265] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#1C221F] italic leading-relaxed">
                "We feature NIRAA as a welcome beverage at our luxury wellness sanctuary in Udaipur. Guests are captivated by the story and the extraordinary nutrient profile. The cold packaging arrives freezing cold."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DFCA9B]/30 flex items-center justify-between">
              <div>
                <p className="text-xs font-serif-luxury font-bold text-[#14281E]">Dr. Ananya Ray</p>
                <p className="text-[10px] text-[#5C6761]">Integrative Wellness Director</p>
              </div>
              <span className="text-[10px] bg-[#C5A265]/20 text-[#14281E] px-2 py-0.5 rounded font-semibold">
                Imperial Gift Set
              </span>
            </div>
          </div>

          <div className="bg-white p-8 border border-[#DFCA9B]/50 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex text-[#C5A265] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#1C221F] italic leading-relaxed">
                "The Alphonso Mango infusion is a revelation. You taste real Ratnagiri mango puree blended seamlessly with crisp neera. No syrup, no chemicals. Truly world class."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DFCA9B]/30 flex items-center justify-between">
              <div>
                <p className="text-xs font-serif-luxury font-bold text-[#14281E]">Karan Singhania</p>
                <p className="text-[10px] text-[#5C6761]">Mumbai • Subscriber</p>
              </div>
              <span className="text-[10px] bg-[#C5A265]/20 text-[#14281E] px-2 py-0.5 rounded font-semibold">
                Alphonso Mango
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
