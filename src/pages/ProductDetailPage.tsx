import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/SafeImage';
import { InteractiveBottleViewer } from '../components/InteractiveBottleViewer';
import {
  Sparkles,
  Star,
  Heart,
  Truck,
  ShieldCheck,
  Calendar,
  Minus,
  Plus,
  ArrowRight,
  Share2,
  CheckCircle,
  Leaf,
  Droplets,
  RotateCcw,
} from 'lucide-react';
import { ProductVariant, ProductReview } from '../types';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    formatPrice,
    addToCart,
    setSubscriptionModalProduct,
    setSelectedProductId,
    setActivePage,
    toggleWishlist,
    isInWishlist,
    checkPincodeServiceability,
    reviews,
    showToast,
  } = useStore();

  const product = selectedProduct;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product?.variants[0] || { id: 'v1', size: '300ml Glass Bottle', price: 250, stock: 50 }
  );
  const [purchaseMode, setPurchaseMode] = useState<'one-time' | 'subscribe'>('one-time');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [show360Viewer, setShow360Viewer] = useState(false);

  // Pincode checker
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{
    serviceable: boolean;
    estimatedDays: string;
    carrier: string;
  } | null>(null);

  // Tabs
  const [activeTab, setActiveTab] = useState<'details' | 'nutrition' | 'rituals' | 'reviews'>('details');

  // Review submission
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  if (!product) {
    return (
      <div className="py-20 text-center text-[#14281E]">
        <p className="font-serif-luxury text-xl">Product not found.</p>
        <button
          onClick={() => setActivePage('shop')}
          className="mt-4 text-xs underline text-[#C5A265]"
        >
          Return to Cellar Collection
        </button>
      </div>
    );
  }

  const isFav = isInWishlist(product.id);
  const gallery = [product.primaryImage, ...product.galleryImages];

  // Pricing calculations
  const basePrice = selectedVariant.price * quantity;
  const finalPrice = purchaseMode === 'subscribe' ? Math.round(basePrice * 0.85) : basePrice;

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkPincodeServiceability(pincode);
    setPincodeResult(result);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      showToast('Please provide your name and review note.', 'warning');
      return;
    }
    showToast('Your tasting review has been submitted for cellar curation.');
    setReviewerName('');
    setReviewComment('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Cellar link copied to clipboard.');
  };

  return (
    <div id="page-product-detail" className="bg-[#FAF8F5] text-[#1C221F] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-[#5C6761] mb-8 flex items-center space-x-2">
          <button onClick={() => setActivePage('home')} className="hover:text-[#14281E] cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={() => setActivePage('shop')} className="hover:text-[#14281E] cursor-pointer">
            Cellar
          </button>
          <span>/</span>
          <span className="text-[#14281E] font-medium truncate">{product.name}</span>
        </div>

        {/* Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Imagery & 360 viewer */}
          <div className="lg:col-span-7 space-y-4">
            {/* View Mode Toggle Button */}
            <div className="flex justify-between items-center pb-2">
              <span className="text-[11px] uppercase tracking-widest text-[#C5A265] font-semibold">
                Terroir Bottled Fresh
              </span>
              <button
                onClick={() => setShow360Viewer(!show360Viewer)}
                className="flex items-center space-x-1.5 text-xs text-[#14281E] hover:text-[#C5A265] font-medium border border-[#DFCA9B] px-3 py-1 bg-white cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#C5A265]" />
                <span>{show360Viewer ? 'View Static Gallery' : 'Interactive 360° Inspection'}</span>
              </button>
            </div>

            {show360Viewer ? (
              <InteractiveBottleViewer product={product} />
            ) : (
              <div className="space-y-4">
                {/* Main Large Image Display */}
                <div className="relative bg-[#F5F1E9] p-8 aspect-4/3 flex items-center justify-center border border-[#DFCA9B]/50 overflow-hidden">
                  <SafeImage
                    src={gallery[activeImageIndex] || product.primaryImage}
                    alt={product.name}
                    className="max-h-96 object-contain drop-shadow-2xl transition-all duration-300"
                  />
                  <span className="absolute top-4 left-4 bg-[#14281E] text-[#DFCA9B] text-[10px] uppercase font-bold tracking-wider px-3 py-1">
                    {product.category}
                  </span>
                </div>

                {/* Thumbnails Row */}
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-20 bg-[#F5F1E9] p-1.5 border shrink-0 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#14281E] shadow-sm ring-1 ring-[#14281E]'
                          : 'border-[#DFCA9B]/40 hover:border-[#14281E]'
                      }`}
                    >
                      <SafeImage
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cold Chain Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#DFCA9B]/30 text-center">
              <div className="p-3 bg-white border border-[#DFCA9B]/40">
                <Sparkles className="w-4 h-4 text-[#C5A265] mx-auto mb-1" />
                <p className="text-[11px] font-semibold text-[#14281E]">100% Unpasteurized</p>
                <p className="text-[9px] text-[#5C6761]">Enzymes Active & Alive</p>
              </div>
              <div className="p-3 bg-white border border-[#DFCA9B]/40">
                <ShieldCheck className="w-4 h-4 text-[#C5A265] mx-auto mb-1" />
                <p className="text-[11px] font-semibold text-[#14281E]">2°C–6°C Insulated</p>
                <p className="text-[9px] text-[#5C6761]">Cold-Chain Verified</p>
              </div>
              <div className="p-3 bg-white border border-[#DFCA9B]/40">
                <Leaf className="w-4 h-4 text-[#C5A265] mx-auto mb-1" />
                <p className="text-[11px] font-semibold text-[#14281E]">Phoenix Sylvestris</p>
                <p className="text-[9px] text-[#5C6761]">Wild Indian Khajur Trees</p>
              </div>
            </div>
          </div>

          {/* Right Column: Configuration & Purchase */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header / Rating */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-[#C5A265]">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[#14281E] font-semibold">{product.rating}</span>
                  <span className="text-[#5C6761]">({product.reviewsCount} verified reviews)</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleShare}
                    className="p-2 text-[#5C6761] hover:text-[#14281E] transition-colors"
                    title="Share beverage"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2 transition-colors ${
                      isFav ? 'text-red-600' : 'text-[#5C6761] hover:text-[#14281E]'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#14281E] mt-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6761] font-serif-luxury italic mt-1">{product.tagline}</p>
            </div>

            {/* Pricing Presentation */}
            <div className="bg-[#F5F1E9] p-4 border border-[#DFCA9B]/50 flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#14281E]">
                  {formatPrice(finalPrice)}
                </span>
                {selectedVariant.compareAtPrice && purchaseMode === 'one-time' && (
                  <span className="text-sm text-[#5C6761] line-through ml-2">
                    {formatPrice(selectedVariant.compareAtPrice * quantity)}
                  </span>
                )}
                {purchaseMode === 'subscribe' && (
                  <span className="text-xs bg-[#14281E] text-[#DFCA9B] px-2 py-0.5 ml-2 rounded font-semibold uppercase">
                    Saved 15% via Subscription
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-[#2A4836] font-semibold uppercase">
                {product.isColdChainRequired ? 'Cold Shipped' : 'Ambient Protected'}
              </span>
            </div>

            {/* Format / Variant Selection */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-2">
                Select Cellar Format:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      selectedVariant.id === v.id
                        ? 'border-[#14281E] bg-[#14281E] text-[#F3EBDD] shadow-xs'
                        : 'border-[#DFCA9B] bg-white text-[#14281E] hover:border-[#14281E]'
                    }`}
                  >
                    <p className="text-xs font-semibold truncate">{v.size}</p>
                    <p className="text-[11px] font-mono mt-1 opacity-90">{formatPrice(v.price)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Mode Toggle (One-Time vs Subscribe & Save) */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block">
                Purchase Option:
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setPurchaseMode('one-time')}
                  className={`p-3.5 border cursor-pointer transition-all ${
                    purchaseMode === 'one-time'
                      ? 'border-[#14281E] bg-[#FAF8F5] ring-1 ring-[#14281E]'
                      : 'border-[#DFCA9B] bg-white hover:border-[#14281E]'
                  }`}
                >
                  <p className="text-xs font-semibold text-[#14281E]">One-Time Order</p>
                  <p className="text-[11px] text-[#5C6761] mt-0.5">Standard single shipment</p>
                </div>

                <div
                  onClick={() => setPurchaseMode('subscribe')}
                  className={`p-3.5 border cursor-pointer transition-all relative ${
                    purchaseMode === 'subscribe'
                      ? 'border-[#14281E] bg-[#FAF8F5] ring-1 ring-[#14281E]'
                      : 'border-[#DFCA9B] bg-white hover:border-[#14281E]'
                  }`}
                >
                  <span className="absolute -top-2 -right-1 bg-[#C5A265] text-[#0C1A13] text-[9px] font-bold px-1.5 py-0.2 uppercase rounded">
                    Save 15%
                  </span>
                  <p className="text-xs font-semibold text-[#14281E]">Subscribe & Save</p>
                  <p className="text-[11px] text-emerald-800 font-medium mt-0.5">Bi-weekly or monthly</p>
                </div>
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-[#DFCA9B] bg-white h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-xs hover:bg-[#FAF8F5] cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-2 text-xs font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-xs hover:bg-[#FAF8F5] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {purchaseMode === 'one-time' ? (
                <button
                  id="btn-pdp-add-to-cart"
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#14281E] text-[#F3EBDD] hover:bg-[#2A4836] h-12 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A265]" />
                  <span>Add to Cellar Cart</span>
                </button>
              ) : (
                <button
                  id="btn-pdp-subscribe"
                  onClick={() => setSubscriptionModalProduct(product)}
                  className="flex-1 bg-[#C5A265] text-[#0C1A13] hover:bg-[#DFCA9B] h-12 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Configure Subscription</span>
                </button>
              )}
            </div>

            {/* Pincode Logistics Checker */}
            <div className="bg-white p-4 border border-[#DFCA9B]/50 space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold flex items-center">
                <Truck className="w-3.5 h-3.5 mr-1.5 text-[#C5A265]" />
                Cold-Chain Delivery Verification
              </label>
              <form onSubmit={handlePincodeCheck} className="flex space-x-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit India Pincode"
                  maxLength={6}
                  className="flex-1 px-3 py-1.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                />
                <button
                  type="submit"
                  className="bg-[#14281E] text-[#F3EBDD] text-xs px-4 py-1.5 uppercase tracking-wider font-medium hover:bg-[#2A4836] cursor-pointer"
                >
                  Check
                </button>
              </form>

              {pincodeResult && (
                <div className="text-xs pt-2">
                  {pincodeResult.serviceable ? (
                    <div className="text-emerald-800 bg-emerald-50 p-2 border border-emerald-200">
                      <p className="font-semibold flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-700" />
                        Serviceable via Cold Chain
                      </p>
                      <p className="text-[11px] text-[#5C6761] mt-0.5">
                        Estimated arrival: <strong>{pincodeResult.estimatedDays}</strong> via {pincodeResult.carrier}.
                      </p>
                    </div>
                  ) : (
                    <p className="text-amber-800 bg-amber-50 p-2 border border-amber-200 text-[11px]">
                      Please enter a valid 6-digit postal code.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div className="mt-20 border-t border-[#DFCA9B]/50 pt-10">
          <div className="flex border-b border-[#DFCA9B]/40 space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 text-xs uppercase tracking-widest transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'details'
                  ? 'border-b-2 border-[#14281E] text-[#14281E] font-bold'
                  : 'text-[#5C6761] hover:text-[#14281E]'
              }`}
            >
              Botanical Profile & Terroir
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`pb-3 text-xs uppercase tracking-widest transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'nutrition'
                  ? 'border-b-2 border-[#14281E] text-[#14281E] font-bold'
                  : 'text-[#5C6761] hover:text-[#14281E]'
              }`}
            >
              Clinical Lab & Nutrition
            </button>
            <button
              onClick={() => setActiveTab('rituals')}
              className={`pb-3 text-xs uppercase tracking-widest transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'rituals'
                  ? 'border-b-2 border-[#14281E] text-[#14281E] font-bold'
                  : 'text-[#5C6761] hover:text-[#14281E]'
              }`}
            >
              Serving Ritual & Mixology
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs uppercase tracking-widest transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-[#14281E] text-[#14281E] font-bold'
                  : 'text-[#5C6761] hover:text-[#14281E]'
              }`}
            >
              Patron Reviews ({reviews.length})
            </button>
          </div>

          <div className="py-8">
            {activeTab === 'details' && (
              <div className="space-y-6 max-w-4xl text-sm leading-relaxed text-[#5C6761]">
                <h3 className="font-serif-luxury text-2xl text-[#14281E]">The Purity of Phoenix Sylvestris</h3>
                <p>{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="bg-white p-4 border border-[#DFCA9B]/40">
                    <p className="text-xs uppercase tracking-wider text-[#14281E] font-bold">Terroir & Sourcing</p>
                    <p className="text-xs text-[#5C6761] mt-1">{product.origin}</p>
                  </div>
                  <div className="bg-white p-4 border border-[#DFCA9B]/40">
                    <p className="text-xs uppercase tracking-wider text-[#14281E] font-bold">Botanical Ingredients</p>
                    <p className="text-xs text-[#5C6761] mt-1">{product.ingredients.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="max-w-2xl bg-white p-6 border border-[#DFCA9B]/50">
                <h3 className="font-serif-luxury text-xl text-[#14281E] mb-2">Nutritional Analysis (Per 100ml)</h3>
                <p className="text-xs text-[#5C6761] mb-6">Tested & verified by FSSAI Certified Laboratories</p>

                <div className="divide-y divide-[#DFCA9B]/30 text-xs">
                  {Object.entries(product.nutritionalFacts).map(([key, value]) => (
                    <div key={key} className="py-2.5 flex justify-between">
                      <span className="capitalize text-[#14281E]">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-mono font-semibold text-[#14281E]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'rituals' && (
              <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-[#5C6761] leading-relaxed">
                <h3 className="font-serif-luxury text-2xl text-[#14281E]">The Cellar Serving Ritual</h3>
                <p>
                  To experience the full aromatic spectrum of raw wild Khajur tree neera, follow our sommelier-recommended cellar ritual:
                </p>
                <ol className="list-decimal pl-5 space-y-2 mt-3">
                  <li><strong>Maintain Chilled Temp:</strong> Chill the bottle between 2°C and 4°C for at least 3 hours prior to uncorking.</li>
                  <li><strong>Gentle Inversion:</strong> Gently invert the bottle once to redistribute naturally occurring micro-nutrients. Do not shake vigorously.</li>
                  <li><strong>Crystal Stemware:</strong> Pour into a chilled flute or white wine glass at a 45° angle to preserve the delicate natural effervescence.</li>
                  <li><strong>Pairings:</strong> Harmonizes extraordinarily well with coastal Malabar curries, fresh burrata, artisanal dark chocolate, or as a post-yoga recovery elixir.</li>
                </ol>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8 max-w-4xl">
                {/* Review Form */}
                <div className="bg-white p-6 border border-[#DFCA9B]/50 space-y-4">
                  <h4 className="font-serif-luxury text-lg text-[#14281E]">Write a Patron Tasting Note</h4>
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-[#5C6761] block mb-1">Your Name</label>
                        <input
                          type="text"
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder="e.g. Maharani Gayatri Devi"
                          className="w-full p-2 bg-[#FAF8F5] border border-[#DFCA9B] text-xs focus:outline-none focus:border-[#14281E]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#5C6761] block mb-1">Rating</label>
                        <select
                          value={reviewerRating}
                          onChange={(e) => setReviewerRating(Number(e.target.value))}
                          className="w-full p-2 bg-[#FAF8F5] border border-[#DFCA9B] text-xs focus:outline-none focus:border-[#14281E]"
                        >
                          <option value={5}>5 Stars — Sublime Masterpiece</option>
                          <option value={4}>4 Stars — Very Good</option>
                          <option value={3}>3 Stars — Average</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-[#5C6761] block mb-1">Tasting Impressions</label>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Describe aroma, mouthfeel, sweetness balance, and cold-chain arrival..."
                        rows={3}
                        className="w-full p-2 bg-[#FAF8F5] border border-[#DFCA9B] text-xs focus:outline-none focus:border-[#14281E]"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#14281E] text-[#F3EBDD] px-6 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-[#2A4836] cursor-pointer"
                    >
                      Submit Tasting Note
                    </button>
                  </form>
                </div>

                {/* Review List */}
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-white p-5 border border-[#DFCA9B]/30">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="text-xs font-serif-luxury font-bold text-[#14281E]">{rev.author}</p>
                          <div className="flex text-[#C5A265] mt-0.5">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        </div>
                        <span className="text-[10px] text-[#5C6761]">{rev.date}</span>
                      </div>
                      <p className="text-xs font-semibold text-[#14281E] mb-1">{rev.title}</p>
                      <p className="text-xs text-[#5C6761] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
