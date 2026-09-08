import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/SafeImage';
import {
  ShieldAlert,
  TrendingUp,
  Package,
  Users,
  Tag,
  Settings,
  Star,
  CheckCircle,
  XCircle,
  Plus,
  RefreshCw,
  Truck,
  Eye,
  Edit2,
  DollarSign,
  Thermometer,
  Lock,
  Unlock,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { Product, Coupon } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const {
    adminRole,
    setAdminRole,
    orders,
    updateOrderStatus,
    products,
    updateProduct,
    addProduct,
    subscriptions,
    coupons,
    addCoupon,
    deleteCoupon,
    siteSettings,
    updateSiteSettings,
    formatPrice,
    showToast,
    setActivePage,
  } = useStore();

  // Admin Security Access Gate (Restricted Access - Not for Everyone)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('niraa_admin_authorized') === 'true';
    } catch {
      return false;
    }
  });
  const [accessCode, setAccessCode] = useState('');
  const [authError, setAuthError] = useState('');

  const handleVerifyAccess = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = accessCode.trim().toUpperCase();
    if (clean === 'NIRAA2025' || clean === '1499' || clean === 'ADMIN' || clean === 'KHAJUR') {
      try {
        sessionStorage.setItem('niraa_admin_authorized', 'true');
      } catch (e) {
        // ignore storage error
      }
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Cellar Vault Unlocked. Welcome to NIRAA Executive Operations.');
    } else {
      setAuthError('Invalid Access Key. Please provide an authorized Master Passcode.');
    }
  };

  const handleLockVault = () => {
    try {
      sessionStorage.removeItem('niraa_admin_authorized');
    } catch (e) {
      // ignore
    }
    setIsAuthenticated(false);
    setAccessCode('');
    showToast('Cellar Vault successfully locked.');
  };

  const [activeTab, setActiveTab] = useState<'kpis' | 'orders' | 'products' | 'subscriptions' | 'coupons' | 'settings'>('kpis');

  // KPI Computations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const activeSubsCount = subscriptions.filter((s) => s.status === 'Active').length;
  const aov = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  // New Coupon form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(1499);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // New Product form modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'Signature Neera' | 'Heritage Infusions' | 'Reserve Vintages' | 'Tasting Flights'>('Signature Neera');
  const [newProdPrice, setNewProdPrice] = useState(1499);
  const [newProdStock, setNewProdStock] = useState(50);
  const [newProdTagline, setNewProdTagline] = useState('');

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(siteSettings);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountPercentage: newCouponDiscount,
      minPurchase: newCouponMin,
      description: newCouponDesc || `${newCouponDiscount}% Cellar Privilege`,
      isActive: true,
    });
    setNewCouponCode('');
    setNewCouponDesc('');
    showToast(`Privilege code ${newCouponCode.toUpperCase()} created.`);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;
    addProduct({
      name: newProdName,
      slug: newProdName.toLowerCase().replace(/ /g, '-'),
      category: newProdCategory,
      tagline: newProdTagline || 'Rare unpasteurized Khajur tree nectar',
      shortDescription: 'Freshly tapped at dawn and chilled instantly to 2°C.',
      longDescription: 'Pristine raw wild Khajur tree neera harvested under the stars in heritage sanctuaries.',
      price: Math.max(1499, newProdPrice),
      volume: '350ml',
      origin: 'Karnataka, India',
      harvestTime: '04:15 AM Dawn Harvest',
      shelfLife: '90 Days at 2°C–6°C',
      servingTemperature: '4°C–6°C Chilled in Crystal Glass',
      primaryImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      ],
      flavorProfile: {
        sweetness: 4,
        floral: 4,
        effervescence: 3,
        crispness: 5,
        earthiness: 3,
      },
      tastingNotes: ['Wild honey blossoms', 'Tender young Khajur nectar', 'Clean mineral finish'],
      nutritionalHighlights: [
        { nutrient: 'Natural Potassium', amount: '340mg' },
        { nutrient: 'Magnesium', amount: '32mg' },
        { nutrient: 'Glycemic Index', amount: '~35 (Low GI)' },
      ],
      ingredients: ['100% Pure Raw Wild Khajur Tree Sap (Phoenix Sylvestris)'],
      isSignature: false,
      isLimited: false,
      inStock: true,
      stockQuantity: newProdStock,
      rating: 5.0,
      reviewCount: 0,
      variants: [
        { id: `var-${Date.now()}-1`, size: 'Single Bottle (350ml)', price: Math.max(1499, newProdPrice), inStock: true },
        { id: `var-${Date.now()}-3`, size: 'Curated Cellar Crate (3 x 350ml)', price: Math.round(Math.max(1499, newProdPrice) * 3 * 0.85), inStock: true },
      ],
    });
    setShowProductModal(false);
    showToast(`Product ${newProdName} added to cellar catalog.`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
  };

  // IF NOT AUTHENTICATED: Show private security access gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C1A13] flex items-center justify-center px-4 py-16 text-[#FAF8F5]">
        <div className="max-w-md w-full border border-[#DFCA9B]/30 bg-[#14281E]/95 backdrop-blur-xl p-8 sm:p-10 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#0C1A13] border border-[#C5A265] mx-auto flex items-center justify-center text-[#C5A265] shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#C5A265] font-semibold">
              Restricted Operational Area
            </span>
            <h1 className="text-2xl font-serif-luxury font-bold text-[#FAF8F5] mt-1">
              NIRAA™ Cellar Backoffice
            </h1>
            <p className="text-xs text-[#DFCA9B]/70 mt-2 leading-relaxed">
              This private portal is strictly reserved for authorized cellar masters, cryo-logistics handlers, and brand management.
            </p>
          </div>

          <form onSubmit={handleVerifyAccess} className="space-y-4 pt-2 text-left">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#DFCA9B] font-medium mb-1.5">
                Master Security Access Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#C5A265] absolute left-3 top-3" />
                <input
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter authorized key"
                  className="w-full bg-[#0C1A13] border border-[#C5A265]/40 pl-9 pr-3 py-2.5 text-xs text-[#FAF8F5] placeholder:text-[#DFCA9B]/30 focus:outline-none focus:border-[#C5A265]"
                  autoFocus
                />
              </div>
              {authError && (
                <div className="flex items-center space-x-1.5 text-amber-400 text-[11px] mt-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#C5A265] text-[#0C1A13] hover:bg-[#DFCA9B] py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all cursor-pointer shadow-lg flex items-center justify-center space-x-2"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Unlock Admin Vault</span>
            </button>
          </form>

          {/* Quick Access Helper for testing/demonstration */}
          <div className="border-t border-[#DFCA9B]/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#DFCA9B]/60">
            <button
              type="button"
              onClick={() => {
                setAccessCode('NIRAA2025');
              }}
              className="hover:text-[#C5A265] underline cursor-pointer"
            >
              Use Default Key: NIRAA2025
            </button>

            <button
              type="button"
              onClick={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-1 text-[#FAF8F5] hover:text-[#C5A265] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Store</span>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-center space-x-3 text-[10px] text-[#8C9791]">
            <span className="flex items-center">
              <ShieldCheck className="w-3 h-3 mr-1 text-emerald-400" />
              256-Bit Encrypted
            </span>
            <span>•</span>
            <span>Session Monitored</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="page-admin-dashboard" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Bar with Role Switcher & Controls */}
        <div className="bg-[#14281E] text-[#FAF8F5] p-6 border border-[#2A4836] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-mono text-[#C5A265] uppercase tracking-widest font-bold">
                NIRAA Executive Operations Suite • Khajur Cellar Vault
              </span>
            </div>
            <h1 className="text-2xl font-serif-luxury font-bold text-[#FAF8F5] mt-1">
              Cellar Management & Logistics
            </h1>
          </div>

          {/* Controls: Role selector + Return to Store + Lock */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 bg-[#0C1A13] p-1.5 border border-[#C5A265]/40 text-xs">
              <span className="text-[#DFCA9B] px-2 font-medium">Access Role:</span>
              <select
                value={adminRole}
                onChange={(e) => setAdminRole(e.target.value as any)}
                className="bg-[#14281E] text-[#FAF8F5] border border-[#DFCA9B]/50 px-2 py-1 text-xs focus:outline-none cursor-pointer"
              >
                <option value="super_admin">Super Admin (Full Access)</option>
                <option value="order_manager">Order & Cryo Logistics Manager</option>
                <option value="content_manager">Content & Sommelier Editor</option>
              </select>
            </div>

            <button
              onClick={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#0C1A13] text-[#FAF8F5] hover:bg-[#2A4836] border border-[#DFCA9B]/40 px-3 py-2 text-xs transition-colors cursor-pointer flex items-center space-x-1.5"
              title="Return to Public Storefront"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C5A265]" />
              <span className="hidden sm:inline">Storefront</span>
            </button>

            <button
              onClick={handleLockVault}
              className="bg-red-950/60 text-red-200 hover:bg-red-900/80 border border-red-800/60 px-3 py-2 text-xs transition-colors cursor-pointer flex items-center space-x-1.5"
              title="Lock Admin Backoffice"
            >
              <Lock className="w-3.5 h-3.5 text-red-300" />
              <span>Lock Portal</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#DFCA9B]/40 space-x-6 overflow-x-auto text-xs uppercase tracking-widest font-semibold">
          <button
            onClick={() => setActiveTab('kpis')}
            className={`pb-3 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'kpis' ? 'border-b-2 border-[#14281E] text-[#14281E]' : 'text-[#5C6761]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Cellar Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'orders' ? 'border-b-2 border-[#14281E] text-[#14281E]' : 'text-[#5C6761]'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Orders & Cold Log ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'products' ? 'border-b-2 border-[#14281E] text-[#14281E]' : 'text-[#5C6761]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Catalog & Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`pb-3 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'subscriptions' ? 'border-b-2 border-[#14281E] text-[#14281E]' : 'text-[#5C6761]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Subscriptions ({subscriptions.length})</span>
          </button>

          {adminRole === 'super_admin' && (
            <>
              <button
                onClick={() => setActiveTab('coupons')}
                className={`pb-3 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'coupons' ? 'border-b-2 border-[#14281E] text-[#14281E]' : 'text-[#5C6761]'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>Privilege Coupons ({coupons.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`pb-3 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'settings' ? 'border-b-2 border-[#14281E] text-[#14281E]' : 'text-[#5C6761]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Storefront Config</span>
              </button>
            </>
          )}
        </div>

        {/* TAB 1: CELLAR ANALYTICS */}
        {activeTab === 'kpis' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-[#DFCA9B]/50 shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#5C6761] font-semibold">
                  Gross Cellar Revenue
                </span>
                <p className="text-3xl font-serif-luxury font-bold text-[#14281E] mt-2">
                  {formatPrice(totalRevenue)}
                </p>
                <p className="text-xs text-emerald-800 mt-1 font-semibold flex items-center">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  +24.8% from previous vintage
                </p>
              </div>

              <div className="bg-white p-6 border border-[#DFCA9B]/50 shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#5C6761] font-semibold">
                  Total Dispatched Orders
                </span>
                <p className="text-3xl font-serif-luxury font-bold text-[#14281E] mt-2">
                  {totalOrdersCount}
                </p>
                <p className="text-xs text-[#5C6761] mt-1 font-medium">99.4% Cryo-Temperature Compliance</p>
              </div>

              <div className="bg-white p-6 border border-[#DFCA9B]/50 shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#5C6761] font-semibold">
                  Active Recurring Subscribers
                </span>
                <p className="text-3xl font-serif-luxury font-bold text-[#14281E] mt-2">
                  {activeSubsCount}
                </p>
                <p className="text-xs text-[#C5A265] mt-1 font-semibold">
                  MRR: {formatPrice(activeSubsCount * 1450)}
                </p>
              </div>

              <div className="bg-white p-6 border border-[#DFCA9B]/50 shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#5C6761] font-semibold">
                  Average Order Value (AOV)
                </span>
                <p className="text-3xl font-serif-luxury font-bold text-[#14281E] mt-2">
                  {formatPrice(aov)}
                </p>
                <p className="text-xs text-[#5C6761] mt-1 font-medium">3.8 Bottles / Order Average</p>
              </div>
            </div>

            {/* Cold Chain Health Panel */}
            <div className="bg-[#14281E] text-[#FAF8F5] p-6 border border-[#2A4836] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif-luxury text-lg font-bold text-[#DFCA9B]">
                  Real-time Cold Chain Sensor Status
                </h3>
                <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded font-mono">
                  ALL SENSORS NORMAL
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-[#0C1A13] p-4 border border-[#2A4836]">
                  <p className="text-[#DFCA9B]/80 font-medium">Grove Cryo-Lock Unit 1 (Karnataka)</p>
                  <p className="text-xl font-mono text-[#FAF8F5] mt-1 font-bold">2.1°C</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">Continuous Monitoring Active</p>
                </div>
                <div className="bg-[#0C1A13] p-4 border border-[#2A4836]">
                  <p className="text-[#DFCA9B]/80 font-medium">Central Cellar Cold Vault (Bengaluru)</p>
                  <p className="text-xl font-mono text-[#FAF8F5] mt-1 font-bold">3.2°C</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">HEPA Ceramic Sieves Active</p>
                </div>
                <div className="bg-[#0C1A13] p-4 border border-[#2A4836]">
                  <p className="text-[#DFCA9B]/80 font-medium">Air Freight Active Thermal Containers</p>
                  <p className="text-xl font-mono text-[#FAF8F5] mt-1 font-bold">4.0°C</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">14 Shippers in Transit</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-[#DFCA9B]/50 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-[#DFCA9B]/40 flex justify-between items-center">
              <h3 className="font-serif-luxury text-xl font-bold text-[#14281E]">
                Patron Orders & Cryo Dispatch
              </h3>
              <span className="text-xs text-[#5C6761]">Total {orders.length} Records</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#1C221F]">
                <thead className="bg-[#FAF8F5] uppercase tracking-wider text-[10px] text-[#5C6761] border-b border-[#DFCA9B]/30">
                  <tr>
                    <th className="p-4">Order #</th>
                    <th className="p-4">Patron</th>
                    <th className="p-4">Bottles</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Logistics Status</th>
                    <th className="p-4">AWB / Courier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFCA9B]/20">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#14281E]">{ord.orderNumber}</td>
                      <td className="p-4">
                        <p className="font-semibold text-[#14281E]">{ord.customer.name}</p>
                        <p className="text-[11px] text-[#5C6761]">{ord.shippingAddress.city}</p>
                      </td>
                      <td className="p-4">
                        {ord.items.map((i) => `${i.quantity}x ${i.product.name.slice(0, 16)}...`).join(', ')}
                      </td>
                      <td className="p-4 font-bold text-[#14281E]">{formatPrice(ord.total)}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            ord.paymentStatus === 'Paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className="p-1 border border-[#DFCA9B] bg-white text-xs font-semibold rounded focus:outline-none"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Packed in Cryo-Box">Packed in Cryo-Box</option>
                          <option value="Dispatched via Air">Dispatched via Air</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 font-mono text-[11px] text-[#5C6761]">
                        <p className="font-semibold text-[#14281E]">{ord.carrier}</p>
                        <p>{ord.trackingNumber}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS & INVENTORY */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-luxury text-xl font-bold text-[#14281E]">
                Living Cellar Catalog
              </h3>
              <button
                onClick={() => setShowProductModal(true)}
                className="bg-[#14281E] text-[#F3EBDD] px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#2A4836] cursor-pointer flex items-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Vintage / Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div key={prod.id} className="bg-white p-6 border border-[#DFCA9B]/50 shadow-xs space-y-4">
                  <div className="flex items-start space-x-4">
                    <SafeImage
                      src={prod.primaryImage}
                      alt={prod.name}
                      className="w-16 h-20 object-contain bg-[#FAF8F5] p-1 border border-[#DFCA9B]/30"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] bg-[#FAF8F5] text-[#14281E] px-2 py-0.5 border border-[#DFCA9B]/40 font-semibold uppercase">
                        {prod.category}
                      </span>
                      <h4 className="font-serif-luxury font-bold text-base text-[#14281E] truncate mt-1">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-[#5C6761] mt-0.5">{prod.volume} • {prod.harvestTime}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#DFCA9B]/30 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#5C6761] block text-[10px] uppercase">Base Price</span>
                      <input
                        type="number"
                        value={prod.price}
                        onChange={(e) => updateProduct(prod.id, { price: Number(e.target.value) })}
                        className="w-20 p-1 border border-[#DFCA9B] font-semibold text-[#14281E]"
                      />
                    </div>

                    <div>
                      <span className="text-[#5C6761] block text-[10px] uppercase">Stock Available</span>
                      <input
                        type="number"
                        value={prod.stockQuantity}
                        onChange={(e) => updateProduct(prod.id, { stockQuantity: Number(e.target.value) })}
                        className="w-20 p-1 border border-[#DFCA9B] font-semibold text-[#14281E]"
                      />
                    </div>

                    <div>
                      <span className="text-[#5C6761] block text-[10px] uppercase">Active</span>
                      <button
                        onClick={() => updateProduct(prod.id, { inStock: !prod.inStock })}
                        className={`px-2 py-1 text-[10px] font-bold rounded cursor-pointer ${
                          prod.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {prod.inStock ? 'In Stock' : 'Sold Out'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SUBSCRIPTIONS */}
        {activeTab === 'subscriptions' && (
          <div className="bg-white border border-[#DFCA9B]/50 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-[#DFCA9B]/40">
              <h3 className="font-serif-luxury text-xl font-bold text-[#14281E]">
                Active Cellar Replenishment Memberships
              </h3>
            </div>
            <div className="divide-y divide-[#DFCA9B]/20">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-serif-luxury font-bold text-sm text-[#14281E]">
                        {sub.product.name}
                      </span>
                      <span className="bg-[#14281E] text-[#DFCA9B] px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                        {sub.status}
                      </span>
                    </div>
                    <p className="text-[#5C6761] mt-0.5">Cadence: {sub.frequency.replace(/_/g, ' ')} • Size: {sub.variant.size}</p>
                    <p className="text-[11px] text-[#C5A265] mt-1 font-semibold">
                      Next Scheduled Dawn Harvest Delivery: {sub.nextDeliveryDate}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm font-bold text-[#14281E]">
                      {formatPrice(sub.variant.price * 0.85)} / shipment
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PRIVILEGE COUPONS */}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 bg-white p-6 border border-[#DFCA9B]/50 shadow-xs">
              <h3 className="font-serif-luxury text-lg font-bold text-[#14281E] mb-4">
                Create Concierge Privilege Code
              </h3>
              <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#14281E] font-semibold mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    placeholder="e.g. CELLAR20"
                    className="w-full p-2 border border-[#DFCA9B] uppercase font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#14281E] font-semibold mb-1">Discount % *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      value={newCouponDiscount}
                      onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                      className="w-full p-2 border border-[#DFCA9B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#14281E] font-semibold mb-1">Min Spend (₹)</label>
                    <input
                      type="number"
                      value={newCouponMin}
                      onChange={(e) => setNewCouponMin(Number(e.target.value))}
                      className="w-full p-2 border border-[#DFCA9B]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#14281E] font-semibold mb-1">Description</label>
                  <input
                    type="text"
                    value={newCouponDesc}
                    onChange={(e) => setNewCouponDesc(e.target.value)}
                    placeholder="e.g. 15% Welcome for New Patrons"
                    className="w-full p-2 border border-[#DFCA9B]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#14281E] text-[#F3EBDD] py-2.5 uppercase tracking-wider font-semibold hover:bg-[#2A4836] cursor-pointer"
                >
                  Issue Privilege Code
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 bg-white border border-[#DFCA9B]/50 shadow-xs">
              <div className="p-6 border-b border-[#DFCA9B]/40">
                <h3 className="font-serif-luxury text-lg font-bold text-[#14281E]">Active Privilege Codes</h3>
              </div>
              <div className="divide-y divide-[#DFCA9B]/20">
                {coupons.map((c) => (
                  <div key={c.code} className="p-4 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-sm text-[#14281E]">{c.code}</span>
                      <span className="ml-2 bg-[#14281E] text-[#DFCA9B] px-2 py-0.5 rounded text-[10px] font-bold">
                        {c.discountPercentage}% OFF
                      </span>
                      <p className="text-[#5C6761] mt-0.5">{c.description}</p>
                      <p className="text-[10px] text-[#5C6761]">Min Order: {formatPrice(c.minPurchase)}</p>
                    </div>

                    <button
                      onClick={() => deleteCoupon(c.code)}
                      className="text-[#5C6761] hover:text-red-700 underline text-xs cursor-pointer"
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white p-8 border border-[#DFCA9B]/50 shadow-xs max-w-2xl space-y-6 text-xs">
            <h3 className="font-serif-luxury text-xl font-bold text-[#14281E] border-b border-[#DFCA9B]/30 pb-3">
              Storefront & Logistics Thresholds
            </h3>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-[#14281E] font-semibold mb-1">
                  Global Announcement Bar Notice
                </label>
                <input
                  type="text"
                  value={settingsForm.announcementText}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                  className="w-full p-2.5 border border-[#DFCA9B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#14281E] font-semibold mb-1">
                    Free Cold-Chain Shipping Threshold (₹)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.freeShippingThreshold}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })
                    }
                    className="w-full p-2.5 border border-[#DFCA9B]"
                  />
                </div>

                <div>
                  <label className="block text-[#14281E] font-semibold mb-1">
                    Standard Cold-Chain Air Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.standardShippingFee}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, standardShippingFee: Number(e.target.value) })
                    }
                    className="w-full p-2.5 border border-[#DFCA9B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#14281E] font-semibold mb-1">
                  Concierge Support Hotline
                </label>
                <input
                  type="text"
                  value={settingsForm.supportPhone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, supportPhone: e.target.value })}
                  className="w-full p-2.5 border border-[#DFCA9B]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#14281E] text-[#F3EBDD] px-6 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-[#2A4836] cursor-pointer"
              >
                Save Operational Changes
              </button>
            </form>
          </div>
        )}

        {/* Modal: Add Product */}
        {showProductModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/60" onClick={() => setShowProductModal(false)}></div>
            <div className="relative bg-white max-w-lg w-full p-6 border border-[#DFCA9B] z-10 space-y-4">
              <h3 className="font-serif-luxury text-xl font-bold text-[#14281E]">Add New Beverage Vintage</h3>
              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#14281E] font-semibold mb-1">Beverage Name *</label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. Royal Mysore Dawn Reserve"
                    className="w-full p-2 border border-[#DFCA9B]"
                  />
                </div>
                <div>
                  <label className="block text-[#14281E] font-semibold mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full p-2 border border-[#DFCA9B]"
                  >
                    <option value="Signature Neera">Signature Neera</option>
                    <option value="Heritage Infusions">Heritage Infusions</option>
                    <option value="Reserve Vintages">Reserve Vintages</option>
                    <option value="Tasting Flights">Tasting Flights</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#14281E] font-semibold mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(Number(e.target.value))}
                      className="w-full p-2 border border-[#DFCA9B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#14281E] font-semibold mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      required
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(Number(e.target.value))}
                      className="w-full p-2 border border-[#DFCA9B]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#14281E] font-semibold mb-1">Tagline</label>
                  <input
                    type="text"
                    value={newProdTagline}
                    onChange={(e) => setNewProdTagline(e.target.value)}
                    placeholder="e.g. Hand-harvested 40-foot wild crown nectar"
                    className="w-full p-2 border border-[#DFCA9B]"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-4 py-2 border border-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#14281E] text-white font-semibold"
                  >
                    Save Product
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
