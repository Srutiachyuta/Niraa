import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  CheckCircle,
  Truck,
  CreditCard,
  QrCode,
  Building,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { ShippingAddress, Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    formatPrice,
    appliedCoupon,
    currentUser,
    createOrder,
    setActivePage,
    setTrackingOrderId,
    showToast,
    deliveryMethod,
    setDeliveryMethod,
    airlineDeliveryCharge,
  } = useStore();

  // Address State
  const defaultAddr = currentUser?.addresses?.[0] || {
    fullName: currentUser?.name || 'Maharani Gayatri',
    addressLine1: 'Villa 14, Khajur Enclave, Indiranagar',
    addressLine2: 'Near Defense Colony',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
    phone: currentUser?.phone || '+91 98765 43210',
    country: 'India',
  };

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(defaultAddr);
  const [email, setEmail] = useState(currentUser?.email || 'patron@niraa.luxury');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-20 text-center text-[#14281E]">
        <h2 className="text-2xl font-serif-luxury">Your cellar cart is empty</h2>
        <button
          onClick={() => setActivePage('shop')}
          className="mt-4 text-xs underline text-[#C5A265] uppercase tracking-wider font-semibold"
        >
          Return to Cellar Collection
        </button>
      </div>
    );
  }

  // Handle Order Placement
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.fullName || !shippingAddress.addressLine1 || !shippingAddress.postalCode) {
      showToast('Please complete all required address fields.', 'warning');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        customer: {
          id: currentUser?.id || 'guest-1',
          name: shippingAddress.fullName,
          email,
          phone: shippingAddress.phone,
        },
        items: cart,
        subtotal: cartSubtotal,
        discount: discountAmount,
        shippingFee,
        total: cartTotal,
        paymentMethod: paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Cards' : 'Net Banking',
        paymentStatus: 'Paid',
        orderStatus: 'Confirmed',
        deliveryMethod,
        carrier: deliveryMethod === 'air_express' ? 'Blue Dart Cold-Chain Air' : 'Delhivery Refrigerated Courier',
        shippingAddress,
        couponCode: appliedCoupon?.code,
      });

      setIsProcessing(false);
      setCompletedOrder(order);
      setTrackingOrderId(order.id);
      showToast(`Order ${order.orderNumber} successfully confirmed!`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  // SUCCESS CONFIRMATION SCREEN
  if (completedOrder) {
    return (
      <div id="page-checkout-success" className="bg-[#FAF8F5] min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#DFCA9B]/60 p-8 sm:p-12 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-[#14281E] text-[#C5A265] rounded-full flex items-center justify-center mx-auto border-2 border-[#C5A265]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
              Payment Authorized • Cellar Reservation Secured
            </span>

            <h1 className="text-3xl sm:text-4xl font-serif-luxury text-[#14281E] font-medium">
              Thank You for Your Patronage
            </h1>

            <p className="text-xs sm:text-sm text-[#5C6761] max-w-md mx-auto leading-relaxed">
              Order <strong>{completedOrder.orderNumber}</strong> has been logged into our dawn harvest schedule. Your unpasteurized bottles will be placed into temperature-controlled cryo-boxes at 2°C–6°C.
            </p>

            <div className="bg-[#F5F1E9] p-6 border border-[#DFCA9B]/50 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-[#5C6761]">Tracking Number:</span>
                <span className="font-mono font-bold text-[#14281E]">{completedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C6761]">Courier Assigned:</span>
                <span className="font-semibold text-[#14281E]">{completedOrder.carrier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C6761]">Delivery City:</span>
                <span className="font-semibold text-[#14281E]">{completedOrder.shippingAddress.city}</span>
              </div>
              <div className="flex justify-between border-t border-[#DFCA9B]/40 pt-2 font-bold text-[#14281E]">
                <span>Total Amount Paid:</span>
                <span>{formatPrice(completedOrder.total)}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setActivePage('tracking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-[#14281E] text-[#F3EBDD] hover:bg-[#2A4836] px-8 py-3.5 text-xs uppercase tracking-widest font-semibold cursor-pointer flex items-center justify-center space-x-2"
              >
                <Truck className="w-4 h-4 text-[#C5A265]" />
                <span>Track Live Cold Shipment</span>
              </button>

              <button
                onClick={() => {
                  setActivePage('account');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto border border-[#14281E] text-[#14281E] hover:bg-[#FAF8F5] px-8 py-3.5 text-xs uppercase tracking-widest font-medium cursor-pointer"
              >
                View in Account Vault
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="page-checkout" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top return */}
        <div className="mb-8">
          <button
            onClick={() => setActivePage('cart')}
            className="flex items-center space-x-1.5 text-xs text-[#5C6761] hover:text-[#14281E] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Cellar Cart</span>
          </button>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Checkout Stages */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Patron Details & Shipping */}
            <div className="bg-white p-6 sm:p-8 border border-[#DFCA9B]/50 shadow-xs space-y-5">
              <div className="flex items-center space-x-2 border-b border-[#DFCA9B]/40 pb-3">
                <span className="w-6 h-6 rounded-full bg-[#14281E] text-[#DFCA9B] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-xl font-serif-luxury font-bold text-[#14281E]">
                  Patron Delivery Coordinates
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1">
                    Email for Cold Tracking *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1">
                  Street Address / Residence *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.addressLine1}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                  placeholder="Apartment, Suite, Villa number"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1">
                  Landmark / Estate Gate (Optional)
                </label>
                <input
                  type="text"
                  value={shippingAddress.addressLine2 || ''}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1">
                    Postal Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1">
                  Mobile Telephone (For Cold Courier Verification) *
                </label>
                <input
                  type="tel"
                  required
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                />
              </div>
            </div>

            {/* Step 2: Shipping Tier */}
            <div className="bg-white p-6 sm:p-8 border border-[#DFCA9B]/50 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 border-b border-[#DFCA9B]/40 pb-3">
                <span className="w-6 h-6 rounded-full bg-[#14281E] text-[#DFCA9B] text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-xl font-serif-luxury font-bold text-[#14281E]">
                  Cold-Chain Transit Protocol
                </h2>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => setDeliveryMethod('air_express')}
                  className={`p-4 border cursor-pointer transition-all flex items-center justify-between ${
                    deliveryMethod === 'air_express'
                      ? 'border-[#14281E] bg-[#FAF8F5] ring-1 ring-[#14281E]'
                      : 'border-[#DFCA9B] bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-[#C5A265]" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs font-bold text-[#14281E]">Blue Dart Airline Cold-Chain Air Express (Flight Parcel)</p>
                        <span className="text-[10px] bg-[#14281E] text-[#DFCA9B] px-1.5 py-0.5 font-semibold">Priority Flight</span>
                      </div>
                      <p className="text-[11px] text-[#5C6761]">
                        Guaranteed 24-Hour arrival in insulated cryo-coolers with 2°C phase packs via domestic airline cargo
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-[#14281E]">
                      +{formatPrice(airlineDeliveryCharge)}
                    </span>
                    <p className="text-[10px] text-[#5C6761]">Airline Delivery Charge</p>
                  </div>
                </div>

                <div
                  onClick={() => setDeliveryMethod('cold_van')}
                  className={`p-4 border cursor-pointer transition-all flex items-center justify-between ${
                    deliveryMethod === 'cold_van'
                      ? 'border-[#14281E] bg-[#FAF8F5] ring-1 ring-[#14281E]'
                      : 'border-[#DFCA9B] bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-[#5C6761]" />
                    <div>
                      <p className="text-xs font-bold text-[#14281E]">Delhivery Refrigerated Metro Ground Courier</p>
                      <p className="text-[11px] text-[#5C6761]">24–48 Hours temperature-monitored ground transport</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-800 shrink-0">
                    {cartSubtotal > 2999 ? 'Complimentary' : formatPrice(150)}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Gateway (100% Prepaid Cold-Chain - No COD) */}
            <div className="bg-white p-6 sm:p-8 border border-[#DFCA9B]/50 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 border-b border-[#DFCA9B]/40 pb-3">
                <span className="w-6 h-6 rounded-full bg-[#14281E] text-[#DFCA9B] text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="text-xl font-serif-luxury font-bold text-[#14281E]">
                  Secure Digital Payment
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 text-center border cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#14281E] bg-[#14281E] text-[#F3EBDD]'
                      : 'border-[#DFCA9B] bg-white text-[#14281E]'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-[#C5A265]" />
                  <p className="text-xs font-semibold">Instant UPI</p>
                  <p className="text-[10px] opacity-80">GPay / PhonePe / QR</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 text-center border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#14281E] bg-[#14281E] text-[#F3EBDD]'
                      : 'border-[#DFCA9B] bg-white text-[#14281E]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#C5A265]" />
                  <p className="text-xs font-semibold">Prestige Cards</p>
                  <p className="text-[10px] opacity-80">Visa / Amex / MC</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-4 text-center border cursor-pointer transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#14281E] bg-[#14281E] text-[#F3EBDD]'
                      : 'border-[#DFCA9B] bg-white text-[#14281E]'
                  }`}
                >
                  <Building className="w-5 h-5 mx-auto mb-1 text-[#C5A265]" />
                  <p className="text-xs font-semibold">NetBanking</p>
                  <p className="text-[10px] opacity-80">HDFC / ICICI / SBI</p>
                </button>
              </div>

              {/* No COD Notice & Security Guarantee */}
              <div className="bg-[#FAF8F5] p-3.5 border border-[#DFCA9B]/50 space-y-1.5 text-xs text-[#5C6761]">
                <div className="flex items-center space-x-2 font-semibold text-[#14281E]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A265] shrink-0" />
                  <span>100% Pre-Paid Guarantee (No Cash on Delivery)</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Due to the delicate unpasteurized living nature of fresh wild Khajur tree neera and mandatory 2°C–6°C cold-chain preservation, Cash on Delivery is strictly unavailable to prevent transport spoilage. All orders carry our unconditional replacement or refund freshness guarantee.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Order Recap */}
          <div className="lg:col-span-5 bg-[#F5F1E9] p-6 sm:p-8 border border-[#DFCA9B]/60 space-y-6 sticky top-28">
            <h3 className="font-serif-luxury text-xl text-[#14281E] border-b border-[#DFCA9B]/40 pb-3">
              Cellar Allocation Summary
            </h3>

            {/* Cart line items recap */}
            <div className="divide-y divide-[#DFCA9B]/30 max-h-60 overflow-y-auto space-y-2">
              {cart.map((item) => (
                <div key={item.variant.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#14281E]">{item.quantity}x</span>
                    <div>
                      <p className="font-semibold text-[#14281E]">{item.product.name}</p>
                      <p className="text-[10px] text-[#5C6761]">{item.variant.size}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#14281E]">
                    {formatPrice(item.variant.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-[#5C6761] border-t border-[#DFCA9B]/40 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#14281E] font-medium">{formatPrice(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Privilege Discount ({appliedCoupon?.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>
                  {deliveryMethod === 'air_express'
                    ? 'Airline Air Cargo Delivery Charge'
                    : 'Ground Refrigerated Cold-Chain Packaging'}
                </span>
                <span className="text-[#14281E] font-medium">
                  {shippingFee === 0 ? <span className="text-emerald-800 font-semibold">FREE</span> : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif-luxury font-bold text-[#14281E] pt-2 border-t border-[#DFCA9B]/40">
                <span>Amount to Authorize</span>
                <span className="text-xl text-[#14281E]">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              id="btn-complete-checkout"
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#14281E] text-[#F3EBDD] py-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#2A4836] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Securing Cellar Reservation...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#C5A265]" />
                  <span>Authorize & Place Order</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A265]" />
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-[#5C6761]">
              By clicking Authorize, you confirm that bottles will be refrigerated at 2°C–6°C upon receipt.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
