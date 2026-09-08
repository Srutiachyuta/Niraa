import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/SafeImage';
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Tag,
  ArrowLeft,
  Truck,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
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
    setSelectedProductId,
    products,
    addToCart,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

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

  const recommendedProducts = products.filter(
    (p) => !cart.some((item) => item.product.id === p.id)
  ).slice(0, 3);

  return (
    <div id="page-cart" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DFCA9B]/50 pb-6 mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
              Cellar Vault
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif-luxury text-[#14281E] font-medium mt-1">
              Your Living Cellar Cart
            </h1>
          </div>
          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hidden sm:flex items-center space-x-1.5 text-xs text-[#5C6761] hover:text-[#14281E] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white border border-[#DFCA9B]/50 p-16 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#DFCA9B]/60 flex items-center justify-center mx-auto text-[#C5A265]">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-serif-luxury text-[#14281E]">Your cellar cart is empty</h2>
            <p className="text-xs sm:text-sm text-[#5C6761] max-w-sm mx-auto leading-relaxed">
              Experience the untamed sweetness and vital living enzymes of freshly tapped wild Khajur tree neera.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setActivePage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#14281E] text-[#F3EBDD] px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#2A4836] transition-colors cursor-pointer"
              >
                Explore Cellar Collection
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Cart Items Table */}
            <div className="lg:col-span-8 space-y-6">
              {/* Shipping Progress */}
              <div className="bg-[#14281E] text-[#F3EBDD] p-4 border border-[#2A4836]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#DFCA9B] font-medium flex items-center">
                    <Truck className="w-3.5 h-3.5 mr-1.5 text-[#C5A265]" />
                    {remainingForFreeShipping > 0
                      ? `Add ${formatPrice(remainingForFreeShipping)} more to qualify for Complimentary Cryo Air Shipping`
                      : '✓ Unlocked Complimentary Cold-Chain Express Air Delivery'}
                  </span>
                  <span className="font-mono text-[#DFCA9B]">{progressPercent}%</span>
                </div>
                <div className="w-full bg-[#2A4836] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C5A265] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white border border-[#DFCA9B]/50 divide-y divide-[#DFCA9B]/30">
                {cart.map((item) => (
                  <div key={item.variant.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <SafeImage
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        onClick={() => {
                          setSelectedProductId(item.product.id);
                          setActivePage('product');
                        }}
                        className="w-20 h-24 object-contain bg-[#FAF8F5] p-2 border border-[#DFCA9B]/30 shrink-0 cursor-pointer"
                      />
                      <div>
                        <span className="text-[10px] bg-[#14281E] text-[#DFCA9B] px-2 py-0.5 uppercase tracking-wider font-semibold">
                          {item.product.category}
                        </span>
                        <h3
                          onClick={() => {
                            setSelectedProductId(item.product.id);
                            setActivePage('product');
                          }}
                          className="font-serif-luxury text-lg font-bold text-[#14281E] hover:text-[#C5A265] cursor-pointer mt-1"
                        >
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-[#5C6761]">{item.variant.size}</p>
                        <p className="text-xs font-semibold text-[#14281E] mt-1">
                          {formatPrice(item.variant.price)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#DFCA9B] bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.variant.id, item.quantity - 1)}
                          className="px-3 py-1.5 text-xs hover:bg-[#FAF8F5] cursor-pointer text-[#14281E]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 py-1.5 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.variant.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-xs hover:bg-[#FAF8F5] cursor-pointer text-[#14281E]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right min-w-[80px]">
                        <p className="font-serif-luxury text-base font-bold text-[#14281E]">
                          {formatPrice(item.variant.price * item.quantity)}
                        </p>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.variant.id)}
                        className="text-[#5C6761] hover:text-red-700 transition-colors p-1"
                        title="Remove bottle"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs">
                <button
                  onClick={clearCart}
                  className="text-[#5C6761] hover:text-red-700 underline cursor-pointer"
                >
                  Clear Entire Cellar Cart
                </button>
                <span className="text-[#5C6761]">
                  Bottles kept refrigerated at 2°C–6°C prior to air dispatch
                </span>
              </div>
            </div>

            {/* Right Column: Order Summary & Checkout */}
            <div className="lg:col-span-4 bg-[#F5F1E9] p-6 sm:p-8 border border-[#DFCA9B]/60 space-y-6">
              <h2 className="font-serif-luxury text-xl text-[#14281E] border-b border-[#DFCA9B]/40 pb-3">
                Order Summary
              </h2>

              {/* Promo code form */}
              <div>
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block">
                      Concierge Privilege Code
                    </label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-[#5C6761] absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value);
                            setCouponError('');
                          }}
                          placeholder="e.g. WELCOME10"
                          className="w-full pl-8 pr-2 py-2 bg-white border border-[#DFCA9B] text-xs uppercase focus:outline-none focus:border-[#14281E]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-[#14281E] text-[#F3EBDD] px-4 py-2 text-xs font-semibold hover:bg-[#2A4836] cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-red-700">{couponError}</p>}
                  </form>
                ) : (
                  <div className="bg-[#14281E] text-[#DFCA9B] p-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold tracking-wider">{appliedCoupon.code}</span>
                      <p className="text-[10px] text-[#FAF8F5]/80">{appliedCoupon.description}</p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs underline text-[#DFCA9B] hover:text-white cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs text-[#5C6761] border-t border-[#DFCA9B]/40 pt-4">
                <div className="flex justify-between">
                  <span>Cellar Subtotal</span>
                  <span className="text-[#14281E] font-medium">{formatPrice(cartSubtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Privilege Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center">
                    Insulated Cold-Chain Logistics
                    <ShieldCheck className="w-3.5 h-3.5 ml-1 text-[#C5A265]" />
                  </span>
                  <span className="text-[#14281E] font-medium">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-800 font-semibold">FREE</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-serif-luxury font-bold text-[#14281E] pt-3 border-t border-[#DFCA9B]/40">
                  <span>Grand Total</span>
                  <span className="text-xl text-[#14281E]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                id="btn-cart-page-checkout"
                onClick={() => {
                  setActivePage('checkout');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-[#14281E] text-[#F3EBDD] py-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#2A4836] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
              >
                <span>Proceed to Luxury Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#C5A265]" />
              </button>

              <div className="text-center text-[11px] text-[#5C6761] space-y-1">
                <p>✓ 256-Bit Encrypted Razorpay & Stripe Security</p>
                <p>✓ 2°C–6°C Insulated Thermal Guarantee</p>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Pairings row */}
        {cart.length > 0 && recommendedProducts.length > 0 && (
          <div className="mt-20 border-t border-[#DFCA9B]/40 pt-12">
            <h3 className="font-serif-luxury text-2xl text-[#14281E] mb-6">
              Complete Your Cellar Flight
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recommendedProducts.map((p) => (
                <div key={p.id} className="bg-white p-5 border border-[#DFCA9B]/40 flex items-center space-x-4">
                  <SafeImage
                    src={p.primaryImage}
                    alt={p.name}
                    className="w-16 h-20 object-contain bg-[#FAF8F5] p-1 border border-[#DFCA9B]/30 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-luxury text-sm font-bold text-[#14281E] truncate">{p.name}</h4>
                    <p className="text-xs text-[#C5A265] font-semibold mt-0.5">{formatPrice(p.price)}</p>
                    <button
                      onClick={() => addToCart(p, p.variants[0], 1)}
                      className="mt-2 text-[11px] uppercase tracking-wider font-semibold text-[#14281E] hover:text-[#C5A265] cursor-pointer"
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
