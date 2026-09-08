import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from './SafeImage';
import { X, Star, ShieldCheck, Heart, Sparkles, ArrowRight, Minus, Plus } from 'lucide-react';
import { ProductVariant } from '../types';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    formatPrice,
    setSelectedProductId,
    setActivePage,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const currentVariant = selectedVariant || quickViewProduct.variants[0];

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentVariant, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFullPage = () => {
    setSelectedProductId(quickViewProduct.id);
    setActivePage('product');
    setQuickViewProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="quickview-modal-backdrop" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      ></div>

      <div
        id="quickview-modal-content"
        className="relative bg-[#FAF8F5] max-w-3xl w-full shadow-2xl border border-[#DFCA9B]/60 z-10 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute right-4 top-4 p-2 text-[#5C6761] hover:text-[#14281E] hover:bg-[#F5F1E9] rounded-full z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Area */}
          <div className="bg-[#F5F1E9] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#DFCA9B]/40 relative">
            <SafeImage
              src={quickViewProduct.primaryImage}
              alt={quickViewProduct.name}
              className="max-h-72 object-contain drop-shadow-xl"
            />
            <span className="absolute top-4 left-4 bg-[#14281E] text-[#DFCA9B] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
              {quickViewProduct.category}
            </span>
          </div>

          {/* Product Details Area */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Rating */}
              <div className="flex items-center space-x-2 text-xs mb-1 text-[#C5A265]">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[#14281E] font-semibold">{quickViewProduct.rating}</span>
                <span className="text-[#5C6761]">({quickViewProduct.reviewsCount} reviews)</span>
              </div>

              <h2 className="text-xl font-serif-luxury font-bold text-[#14281E] leading-tight">
                {quickViewProduct.name}
              </h2>
              <p className="text-xs text-[#5C6761] font-serif-luxury italic mt-0.5">{quickViewProduct.tagline}</p>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mt-3">
                <span className="text-2xl font-serif-luxury font-bold text-[#14281E]">
                  {formatPrice(currentVariant.price * quantity)}
                </span>
                {currentVariant.compareAtPrice && (
                  <span className="text-sm text-[#5C6761] line-through">
                    {formatPrice(currentVariant.compareAtPrice * quantity)}
                  </span>
                )}
                <span className="text-[11px] text-[#2A4836] font-semibold uppercase tracking-wider">
                  Raw & Cold Chilled
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#5C6761] leading-relaxed mt-3 line-clamp-3">
                {quickViewProduct.shortDescription}
              </p>

              {/* Size Selector */}
              <div className="mt-4">
                <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-2">
                  Format / Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
                        currentVariant.id === v.id
                          ? 'border-[#14281E] bg-[#14281E] text-[#F3EBDD]'
                          : 'border-[#DFCA9B] bg-white text-[#14281E] hover:border-[#14281E]'
                      }`}
                    >
                      {v.size} — {formatPrice(v.price)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-4 flex items-center space-x-4">
                <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold">Quantity:</label>
                <div className="flex items-center border border-[#DFCA9B] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-xs hover:bg-[#FAF8F5] cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-xs hover:bg-[#FAF8F5] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 pt-4 border-t border-[#DFCA9B]/40 space-y-2.5">
              <div className="flex space-x-2">
                <button
                  id="quickview-btn-add-to-cart"
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#14281E] text-[#F3EBDD] py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#2A4836] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A265]" />
                  <span>Add to Cellar Cart</span>
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 border transition-colors cursor-pointer ${
                    isInWishlist(quickViewProduct.id)
                      ? 'border-red-600 text-red-600 bg-red-50'
                      : 'border-[#DFCA9B] text-[#14281E] hover:border-[#14281E]'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(quickViewProduct.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                id="quickview-btn-view-full"
                onClick={handleViewFullPage}
                className="w-full text-center text-xs text-[#14281E] hover:text-[#C5A265] py-1 underline cursor-pointer flex items-center justify-center"
              >
                <span>View Full Botanical Profile & Lab Certification</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
