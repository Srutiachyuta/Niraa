import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from './SafeImage';
import { X, Trash2, Plus, Minus, ArrowRight, Sparkles, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    siteSettings,
    setActivePage,
    products,
    addToCart,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = siteSettings.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCartClick = () => {
    setIsCartOpen(false);
    setActivePage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Recommend a product not yet in cart
  const recommendedProduct = products.find(
    (p) => !cart.some((item) => item.product.id === p.id)
  ) || products[0];

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Dim backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div
        id="cart-drawer-panel"
        className="relative w-full max-w-md bg-[#FAF8F5] text-[#1C221F] shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-[#DFCA9B]/50"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#DFCA9B]/40 flex items-center justify-between bg-[#F5F1E9]">
          <div className="flex items-center space-x-2">
            <span className="font-serif-luxury text-lg tracking-wider text-[#14281E] font-medium">Your Cellar Cart</span>
            <span className="bg-[#14281E] text-[#DFCA9B] text-[11px] font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 hover:bg-[#FAF8F5] rounded-full text-[#5C6761] hover:text-[#14281E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#14281E] text-[#F3EBDD] px-5 py-3 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-[#DFCA9B] flex items-center">
              <Sparkles className="w-3 h-3 mr-1 text-[#C5A265]" />
              {remainingForFreeShipping > 0
                ? `Add ${formatPrice(remainingForFreeShipping)} more for Complimentary Cold-Chain Express`
                : '✓ Unlocked Complimentary Cold-Chain Express Shipping'}
            </span>
          </div>
          <div className="w-full bg-[#2A4836] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#C5A265] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Body Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#DFCA9B]/30">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F1E9] border border-[#DFCA9B]/40 flex items-center justify-center mx-auto text-[#C5A265]">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C12.5 4 14 5.5 16 6C14.5 7 13.5 8.5 13 10C14.5 10 16 10.5 17 11.5C15.5 12 14 13 13.5 14C15 14.5 16 15.5 16.5 17C14.5 16.5 13.5 15.5 12.8 14.5L12 22L11.2 14.5C10.5 15.5 9.5 16.5 7.5 17C8 15.5 9 14.5 10.5 14C10 13 8.5 12 7 11.5C8 10.5 9.5 10 11 10C10.5 8.5 9.5 7 8 6C10 5.5 11.5 4 12 2Z" />
                </svg>
              </div>
              <p className="font-serif-luxury text-xl text-[#14281E]">Your cellar cart is empty</p>
              <p className="text-xs text-[#5C6761] max-w-xs mx-auto">
                Explore our signature wild Khajur tree neera and wellness infusions fresh from dawn harvest.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActivePage('shop');
                }}
                className="inline-block bg-[#14281E] text-[#F3EBDD] text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-[#2A4836] transition-colors cursor-pointer"
              >
                Shop Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.variant.id} className="pt-4 first:pt-0 flex space-x-3.5 items-start">
                <SafeImage
                  src={item.product.primaryImage}
                  alt={item.product.name}
                  className="w-16 h-20 object-contain bg-white border border-[#DFCA9B]/40 p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif-luxury text-sm font-semibold text-[#14281E] leading-snug">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#5C6761]">{item.variant.size}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.variant.id)}
                      className="text-[#5C6761] hover:text-red-700 p-1 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#DFCA9B] bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.variant.id, item.quantity - 1)}
                        className="px-2 py-1 text-xs hover:bg-[#FAF8F5] text-[#14281E] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 py-1 text-xs font-semibold text-[#14281E]">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.variant.id, item.quantity + 1)}
                        className="px-2 py-1 text-xs hover:bg-[#FAF8F5] text-[#14281E] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Line total */}
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#14281E]">
                        {formatPrice(item.variant.price * item.quantity)}
                      </p>
                      {item.variant.compareAtPrice && (
                        <p className="text-[10px] text-[#5C6761] line-through">
                          {formatPrice(item.variant.compareAtPrice * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Quick Add Recommendation when cart has items */}
          {cart.length > 0 && recommendedProduct && (
            <div className="pt-4">
              <p className="text-xs uppercase tracking-wider text-[#5C6761] font-medium mb-2 flex items-center">
                <Sparkles className="w-3 h-3 mr-1 text-[#C5A265]" />
                Cellar Recommendation
              </p>
              <div className="bg-[#F5F1E9] p-3 border border-[#DFCA9B]/50 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <SafeImage
                    src={recommendedProduct.primaryImage}
                    alt={recommendedProduct.name}
                    className="w-10 h-10 object-contain bg-white p-0.5 border border-[#DFCA9B]/30"
                  />
                  <div>
                    <p className="text-xs font-serif-luxury font-semibold text-[#14281E] line-clamp-1">
                      {recommendedProduct.name}
                    </p>
                    <p className="text-[11px] text-[#C5A265] font-medium">{formatPrice(recommendedProduct.price)}</p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(recommendedProduct, recommendedProduct.variants[0], 1)}
                  className="bg-[#14281E] text-[#F3EBDD] text-[11px] uppercase tracking-wider px-3 py-1.5 hover:bg-[#2A4836] cursor-pointer"
                >
                  + Add
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#DFCA9B]/40 bg-[#F5F1E9] space-y-3">
            {/* Promo Code Form */}
            {!appliedCoupon ? (
              <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#5C6761] absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError('');
                    }}
                    placeholder="Coupon code (e.g. WELCOME10)"
                    className="w-full pl-8 pr-2 py-1.5 bg-white border border-[#DFCA9B] text-xs uppercase placeholder:normal-case placeholder:text-[#5C6761]/60 focus:outline-none focus:border-[#14281E]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#14281E] text-[#F3EBDD] text-xs px-3.5 py-1.5 font-medium hover:bg-[#2A4836] cursor-pointer"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between bg-[#14281E] text-[#DFCA9B] px-3 py-1.5 text-xs rounded-sm">
                <div className="flex items-center space-x-1.5">
                  <Tag className="w-3 h-3 text-[#C5A265]" />
                  <span className="font-mono font-bold tracking-wider">{appliedCoupon.code}</span>
                  <span className="text-[11px] text-[#FAF8F5]">(-{formatPrice(discountAmount)})</span>
                </div>
                <button onClick={removeCoupon} className="text-xs text-[#DFCA9B] hover:text-white underline cursor-pointer">
                  Remove
                </button>
              </div>
            )}
            {couponError && <p className="text-[11px] text-red-700">{couponError}</p>}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#5C6761] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#14281E] font-medium">{formatPrice(cartSubtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-800">
                  <span>Privilege Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="flex items-center">
                  Cold-Chain Insulated Packing
                  <ShieldCheck className="w-3 h-3 ml-1 text-[#C5A265]" />
                </span>
                <span className="text-[#14281E] font-medium">
                  {shippingFee === 0 ? <span className="text-emerald-800 font-semibold">FREE</span> : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#14281E] pt-2 border-t border-[#DFCA9B]/40">
                <span>Total Estimated</span>
                <span className="text-[#14281E] text-base">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                id="btn-drawer-checkout"
                onClick={handleCheckoutClick}
                className="w-full bg-[#14281E] text-[#F3EBDD] py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#2A4836] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#C5A265]" />
              </button>

              <button
                id="btn-drawer-view-cart"
                onClick={handleViewCartClick}
                className="w-full text-center text-xs text-[#14281E] hover:text-[#C5A265] underline py-1 cursor-pointer"
              >
                View Full Cellar Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
