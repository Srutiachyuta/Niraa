import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/SafeImage';
import {
  User,
  ShoppingBag,
  Calendar,
  MapPin,
  Heart,
  LogOut,
  Sparkles,
  Truck,
  Plus,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import { ShippingAddress } from '../types';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    loginUser,
    registerUser,
    logoutUser,
    orders,
    subscriptions,
    pauseSubscription,
    cancelSubscription,
    wishlist,
    products,
    addToCart,
    formatPrice,
    setActivePage,
    setTrackingOrderId,
    saveAddress,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'subscriptions' | 'addresses' | 'wishlist'>('orders');

  // Auth form states
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');

  // Add address modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState<ShippingAddress>({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '',
    phone: '',
    country: 'India',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    loginUser(loginEmail);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail) return;
    registerUser(regName, regEmail, regPhone);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.addressLine1 || !newAddr.postalCode) {
      showToast('Please fill out all address details.', 'warning');
      return;
    }
    saveAddress(newAddr);
    setShowAddressModal(false);
    setNewAddr({
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '',
      phone: '',
      country: 'India',
    });
  };

  // IF LOGGED OUT: PRESENT LUXURY PATRON LOGIN / REGISTRATION
  if (!currentUser) {
    return (
      <div id="page-account-auth" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#DFCA9B]/60 p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#14281E] text-[#C5A265] rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A265] font-semibold">
                House of NIRAA™
              </span>
              <h1 className="text-2xl font-serif-luxury font-bold text-[#14281E] mt-1">
                {authMode === 'login' ? 'Patron Cellar Portal' : 'Register for Cellar Allocation'}
              </h1>
              <p className="text-xs text-[#5C6761] mt-1">
                {authMode === 'login'
                  ? 'Access your orders, track cold shipments, and manage subscriptions.'
                  : 'Receive member-only pricing and seasonal harvest reserve crates.'}
              </p>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1">
                    Patron Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. gayatri.devi@patron.niraa.luxury"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                  />
                  <p className="text-[10px] text-[#5C6761] mt-1">
                    Tip: Enter any email to sign in or use demo accounts.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#14281E] text-[#F3EBDD] py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#2A4836] transition-colors cursor-pointer"
                >
                  Enter Cellar Portal
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="text-xs text-[#5C6761] hover:text-[#14281E] underline cursor-pointer"
                  >
                    New patron? Create an account
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Maharani Gayatri"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@residence.com"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1">
                    Telephone Number
                  </label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#14281E] text-[#F3EBDD] py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#2A4836] transition-colors cursor-pointer"
                >
                  Create Patron Account
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-xs text-[#5C6761] hover:text-[#14281E] underline cursor-pointer"
                  >
                    Already registered? Sign in
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN PATRON DASHBOARD
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div id="page-account" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Patron Banner Card */}
        <div className="bg-[#14281E] text-[#FAF8F5] p-6 sm:p-8 border border-[#2A4836] mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-[#0C1A13] border-2 border-[#C5A265] flex items-center justify-center text-xl font-serif-luxury text-[#DFCA9B]">
              {currentUser.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-serif-luxury font-bold text-[#FAF8F5]">{currentUser.name}</h1>
                <span className="bg-[#C5A265] text-[#0C1A13] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {currentUser.segment} Patron
                </span>
              </div>
              <p className="text-xs text-[#DFCA9B]/80 mt-0.5">{currentUser.email} • {currentUser.phone}</p>
              <p className="text-[11px] text-[#FAF8F5]/60 mt-1 font-mono">
                Total Cellar Spend: {formatPrice(currentUser.totalSpend)}
              </p>
            </div>
          </div>

          <button
            onClick={logoutUser}
            className="flex items-center space-x-1.5 text-xs text-[#DFCA9B] hover:text-white border border-[#DFCA9B]/40 px-4 py-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#DFCA9B]/40 space-x-8 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs uppercase tracking-widest transition-colors cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-b-2 border-[#14281E] text-[#14281E] font-bold'
                : 'text-[#5C6761] hover:text-[#14281E]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`pb-3 text-xs uppercase tracking-widest transition-colors cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'subscriptions'
                ? 'border-b-2 border-[#14281E] text-[#14281E] font-bold'
                : 'text-[#5C6761] hover:text-[#14281E]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Never Run Out Subscriptions ({subscriptions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 text-xs uppercase tracking-widest transition-colors cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'border-b-2 border-[#14281E] text-[#14281E] font-bold'
                : 'text-[#5C6761] hover:text-[#14281E]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 text-xs uppercase tracking-widest transition-colors cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'border-b-2 border-[#14281E] text-[#14281E] font-bold'
                : 'text-[#5C6761] hover:text-[#14281E]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Private Wishlist ({wishlist.length})</span>
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white p-12 text-center border border-[#DFCA9B]/50">
                <p className="font-serif-luxury text-lg text-[#14281E]">No orders placed yet.</p>
                <button
                  onClick={() => setActivePage('shop')}
                  className="mt-3 text-xs text-[#C5A265] uppercase tracking-wider font-semibold underline cursor-pointer"
                >
                  Explore Cellar Catalog
                </button>
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-white border border-[#DFCA9B]/50 p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#DFCA9B]/30 pb-4 gap-2">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="font-mono font-bold text-sm text-[#14281E]">{ord.orderNumber}</span>
                        <span className="text-xs bg-[#14281E] text-[#DFCA9B] px-2.5 py-0.5 rounded font-semibold uppercase">
                          {ord.orderStatus}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5C6761] mt-0.5">
                        Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#14281E]">{formatPrice(ord.total)}</span>
                        <span className="text-[11px] text-emerald-800 block font-semibold">{ord.paymentStatus}</span>
                      </div>

                      <button
                        onClick={() => {
                          setTrackingOrderId(ord.id);
                          setActivePage('tracking');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-[#FAF8F5] border border-[#14281E] text-[#14281E] hover:bg-[#14281E] hover:text-[#F3EBDD] px-3.5 py-1.5 text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition-colors"
                      >
                        <Truck className="w-3.5 h-3.5 text-[#C5A265]" />
                        <span>Track Delivery</span>
                      </button>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="divide-y divide-[#DFCA9B]/20">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.product.primaryImage}
                            alt={item.product.name}
                            className="w-10 h-10 object-contain bg-[#FAF8F5] p-1 border border-[#DFCA9B]/30"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-semibold text-[#14281E]">{item.product.name}</p>
                            <p className="text-[11px] text-[#5C6761]">{item.variant.size} • Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-[#14281E]">
                          {formatPrice(item.variant.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#FAF8F5] p-3 text-[11px] text-[#5C6761] flex items-center justify-between">
                    <span>Carrier: <strong>{ord.carrier}</strong> ({ord.trackingNumber})</span>
                    <span>Destination: {ord.shippingAddress.city}, {ord.shippingAddress.state}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: SUBSCRIPTIONS */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            {subscriptions.length === 0 ? (
              <div className="bg-white p-12 text-center border border-[#DFCA9B]/50">
                <p className="font-serif-luxury text-lg text-[#14281E]">No active cellar subscriptions.</p>
                <p className="text-xs text-[#5C6761] mt-1">Never run out of pure wild Khajur tree neera with 15% off recurring crates.</p>
                <button
                  onClick={() => setActivePage('shop')}
                  className="mt-4 bg-[#14281E] text-[#F3EBDD] px-6 py-2.5 text-xs uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Explore Recurring Subscriptions
                </button>
              </div>
            ) : (
              subscriptions.map((sub) => (
                <div key={sub.id} className="bg-white border border-[#DFCA9B]/50 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={sub.product.primaryImage}
                      alt={sub.product.name}
                      className="w-16 h-20 object-contain bg-[#FAF8F5] p-1 border border-[#DFCA9B]/30 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-serif-luxury font-bold text-[#14281E]">
                          {sub.product.name}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                            sub.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#5C6761]">{sub.variant.size} • Cadence: {sub.frequency.replace(/_/g, ' ')}</p>
                      <p className="text-xs font-semibold text-[#C5A265] mt-1">
                        Locked 15% Member Discount • Next Harvest Delivery: {sub.nextDeliveryDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                    <button
                      onClick={() => pauseSubscription(sub.id)}
                      className="border border-[#DFCA9B] text-[#14281E] hover:bg-[#FAF8F5] px-4 py-2 text-xs font-medium cursor-pointer"
                    >
                      {sub.status === 'Active' ? 'Pause Schedule' : 'Resume Schedule'}
                    </button>
                    <button
                      onClick={() => cancelSubscription(sub.id)}
                      className="text-xs text-[#5C6761] hover:text-red-700 underline cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-luxury text-xl text-[#14281E]">Saved Delivery Locations</h3>
              <button
                onClick={() => setShowAddressModal(true)}
                className="bg-[#14281E] text-[#F3EBDD] px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#2A4836] cursor-pointer flex items-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Residence</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(currentUser.addresses || []).map((addr, idx) => (
                <div key={idx} className="bg-white p-6 border border-[#DFCA9B]/50 shadow-xs space-y-2 relative">
                  {idx === 0 && (
                    <span className="absolute top-4 right-4 bg-[#C5A265]/20 text-[#14281E] text-[10px] font-bold px-2 py-0.5 uppercase rounded">
                      Primary
                    </span>
                  )}
                  <p className="font-serif-luxury font-bold text-sm text-[#14281E]">{addr.fullName}</p>
                  <p className="text-xs text-[#5C6761]">{addr.addressLine1}</p>
                  {addr.addressLine2 && <p className="text-xs text-[#5C6761]">{addr.addressLine2}</p>}
                  <p className="text-xs text-[#5C6761]">{addr.city}, {addr.state} - {addr.postalCode}</p>
                  <p className="text-xs text-[#14281E] font-medium pt-1">Tel: {addr.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="bg-white p-12 text-center border border-[#DFCA9B]/50">
                <p className="font-serif-luxury text-lg text-[#14281E]">Your private wishlist is empty.</p>
                <button
                  onClick={() => setActivePage('shop')}
                  className="mt-3 text-xs text-[#C5A265] uppercase tracking-wider font-semibold underline cursor-pointer"
                >
                  Browse Signature Beverages
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {wishlistProducts.map((p) => (
                  <div key={p.id} className="bg-white p-6 border border-[#DFCA9B]/50 shadow-xs flex flex-col justify-between">
                    <div className="text-center">
                      <SafeImage
                        src={p.primaryImage}
                        alt={p.name}
                        className="h-40 object-contain mx-auto mb-3"
                      />
                      <h4 className="font-serif-luxury font-bold text-base text-[#14281E]">{p.name}</h4>
                      <p className="text-xs text-[#C5A265] font-semibold mt-1">{formatPrice(p.price)}</p>
                    </div>
                    <button
                      onClick={() => addToCart(p, p.variants[0], 1)}
                      className="mt-4 w-full bg-[#14281E] text-[#F3EBDD] py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#2A4836] cursor-pointer"
                    >
                      + Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Address Modal */}
        {showAddressModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/60" onClick={() => setShowAddressModal(false)}></div>
            <div className="relative bg-white max-w-md w-full p-6 border border-[#DFCA9B] z-10 space-y-4">
              <h3 className="font-serif-luxury text-lg font-bold text-[#14281E]">Add Residence Address</h3>
              <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#14281E] font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newAddr.fullName}
                    onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                    className="w-full p-2 border border-[#DFCA9B]"
                  />
                </div>
                <div>
                  <label className="block text-[#14281E] font-semibold mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={newAddr.addressLine1}
                    onChange={(e) => setNewAddr({ ...newAddr, addressLine1: e.target.value })}
                    className="w-full p-2 border border-[#DFCA9B]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#14281E] font-semibold mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="w-full p-2 border border-[#DFCA9B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#14281E] font-semibold mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={newAddr.postalCode}
                      onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                      className="w-full p-2 border border-[#DFCA9B]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#14281E] font-semibold mb-1">Telephone</label>
                  <input
                    type="tel"
                    required
                    value={newAddr.phone}
                    onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                    className="w-full p-2 border border-[#DFCA9B]"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddressModal(false)}
                    className="px-4 py-2 border border-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#14281E] text-white font-semibold"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
