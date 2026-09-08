import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Calendar, Sparkles, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { SubscriptionFrequency, ProductVariant } from '../types';

export const SubscriptionModal: React.FC = () => {
  const {
    subscriptionModalProduct,
    setSubscriptionModalProduct,
    createSubscription,
    formatPrice,
    currentUser,
    setActivePage,
  } = useStore();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [frequency, setFrequency] = useState<SubscriptionFrequency>('every_2_weeks');
  const [quantity, setQuantity] = useState(1);

  if (!subscriptionModalProduct) return null;

  const currentVariant = selectedVariant || subscriptionModalProduct.variants[0];
  const regularPrice = currentVariant.price * quantity;
  const discountedPrice = Math.round(regularPrice * 0.85);

  const handleSubscribe = () => {
    if (!currentUser || !currentUser.addresses || currentUser.addresses.length === 0) {
      setSubscriptionModalProduct(null);
      setActivePage('account');
      return;
    }

    createSubscription(
      subscriptionModalProduct,
      currentVariant,
      frequency,
      quantity,
      currentUser.addresses[0]
    );
    setSubscriptionModalProduct(null);
    setActivePage('account');
  };

  return (
    <div id="subscription-modal-backdrop" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setSubscriptionModalProduct(null)}
      ></div>

      <div
        id="subscription-modal-content"
        className="relative bg-[#FAF8F5] max-w-lg w-full shadow-2xl border border-[#DFCA9B]/70 z-10 p-6 sm:p-8 animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={() => setSubscriptionModalProduct(null)}
          className="absolute right-4 top-4 p-2 text-[#5C6761] hover:text-[#14281E] rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#14281E] text-[#C5A265] rounded-full flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A265] font-semibold">
            NIRAA Cellar Reserve
          </span>
          <h2 className="text-2xl font-serif-luxury font-bold text-[#14281E] mt-1">
            Never Run Out of NIRAA
          </h2>
          <p className="text-xs text-[#5C6761] mt-1 max-w-sm mx-auto">
            Freshly tapped raw wild Khajur tree neera delivered on your cadence in temperature-controlled cryo-boxes.
          </p>
        </div>

        {/* Selected Product Summary */}
        <div className="bg-[#F5F1E9] p-4 border border-[#DFCA9B]/50 flex items-center space-x-3 mb-5">
          <img
            src={subscriptionModalProduct.primaryImage}
            alt={subscriptionModalProduct.name}
            className="w-14 h-14 object-contain bg-white p-1 border border-[#DFCA9B]/30 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-serif-luxury font-bold text-[#14281E] truncate">
              {subscriptionModalProduct.name}
            </h4>
            <p className="text-xs text-[#5C6761]">{currentVariant.size}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs font-bold text-[#14281E]">{formatPrice(discountedPrice)}</span>
              <span className="text-[11px] text-[#5C6761] line-through">{formatPrice(regularPrice)}</span>
              <span className="text-[10px] bg-[#14281E] text-[#DFCA9B] px-1.5 py-0.2 rounded font-semibold">
                SAVE 15%
              </span>
            </div>
          </div>
        </div>

        {/* Cadence Selection */}
        <div className="space-y-3 mb-6">
          <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block">
            Select Delivery Cadence:
          </label>

          <div
            onClick={() => setFrequency('every_2_weeks')}
            className={`p-3.5 border cursor-pointer transition-all flex items-center justify-between ${
              frequency === 'every_2_weeks'
                ? 'border-[#14281E] bg-[#FAF8F5] shadow-xs ring-1 ring-[#14281E]'
                : 'border-[#DFCA9B] bg-white hover:border-[#C5A265]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  frequency === 'every_2_weeks' ? 'border-[#14281E] bg-[#14281E]' : 'border-[#5C6761]'
                }`}
              >
                {frequency === 'every_2_weeks' && <div className="w-1.5 h-1.5 bg-[#FAF8F5] rounded-full"></div>}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#14281E]">Every 2 Weeks</p>
                <p className="text-[11px] text-[#5C6761]">Ideal for daily hydration & athletic recovery</p>
              </div>
            </div>
            <span className="text-[10px] bg-[#C5A265]/20 text-[#14281E] px-2 py-0.5 rounded font-semibold uppercase">
              Most Popular
            </span>
          </div>

          <div
            onClick={() => setFrequency('every_month')}
            className={`p-3.5 border cursor-pointer transition-all flex items-center justify-between ${
              frequency === 'every_month'
                ? 'border-[#14281E] bg-[#FAF8F5] shadow-xs ring-1 ring-[#14281E]'
                : 'border-[#DFCA9B] bg-white hover:border-[#C5A265]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  frequency === 'every_month' ? 'border-[#14281E] bg-[#14281E]' : 'border-[#5C6761]'
                }`}
              >
                {frequency === 'every_month' && <div className="w-1.5 h-1.5 bg-[#FAF8F5] rounded-full"></div>}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#14281E]">Every Month</p>
                <p className="text-[11px] text-[#5C6761]">Monthly cellar crate replenishment</p>
              </div>
            </div>
            <span className="text-[11px] text-emerald-800 font-semibold">15% Off</span>
          </div>

          <div
            onClick={() => setFrequency('every_2_months')}
            className={`p-3.5 border cursor-pointer transition-all flex items-center justify-between ${
              frequency === 'every_2_months'
                ? 'border-[#14281E] bg-[#FAF8F5] shadow-xs ring-1 ring-[#14281E]'
                : 'border-[#DFCA9B] bg-white hover:border-[#C5A265]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  frequency === 'every_2_months' ? 'border-[#14281E] bg-[#14281E]' : 'border-[#5C6761]'
                }`}
              >
                {frequency === 'every_2_months' && <div className="w-1.5 h-1.5 bg-[#FAF8F5] rounded-full"></div>}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#14281E]">Every 2 Months</p>
                <p className="text-[11px] text-[#5C6761]">Bi-monthly reserve delivery</p>
              </div>
            </div>
            <span className="text-[11px] text-emerald-800 font-semibold">15% Off</span>
          </div>
        </div>

        {/* Subscriber Guarantees */}
        <div className="space-y-1.5 mb-6 text-[11px] text-[#5C6761] border-t border-[#DFCA9B]/40 pt-4">
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-[#C5A265]" />
            <span>Pause, swap flavors, or cancel in 1-click anytime</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-[#C5A265]" />
            <span>Guaranteed cold-chain insulated air express dispatch</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-[#C5A265]" />
            <span>Locked 15% discount on all automated renewal orders</span>
          </div>
        </div>

        <button
          id="btn-confirm-subscription"
          onClick={handleSubscribe}
          className="w-full bg-[#14281E] text-[#F3EBDD] py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#2A4836] transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md"
        >
          <Sparkles className="w-4 h-4 text-[#C5A265]" />
          <span>Activate Recurring Cellar Subscription</span>
          <ArrowRight className="w-4 h-4 text-[#C5A265]" />
        </button>
      </div>
    </div>
  );
};
