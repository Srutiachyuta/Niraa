import React, { useState } from 'react';
import { useStore, ActivePage } from '../context/StoreContext';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  ShieldAlert,
  ChevronDown,
  Sparkles,
  Truck,
  RotateCcw,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    setIsCartOpen,
    wishlist,
    currency,
    setCurrency,
    currentUser,
    adminUser,
    siteSettings,
    products,
    setSelectedProductId,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredSearchProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      {siteSettings.showAnnouncementBar && (
        <div
          id="announcement-bar"
          className="bg-[#0C1A13] text-[#F3EBDD] text-xs py-2 px-4 border-b border-[#2A4836]/40 tracking-wider font-light flex items-center justify-between"
        >
          <div className="hidden md:flex items-center space-x-4 text-[11px] text-[#DFCA9B]">
            <span className="flex items-center">
              <Sparkles className="w-3 h-3 mr-1 text-[#C5A265]" />
              Raw Wild Khajur Tree Neera • 0.0% Alcohol
            </span>
            <span className="text-[#2A4836]">•</span>
            <span className="flex items-center">
              <Truck className="w-3 h-3 mr-1 text-[#C5A265]" />
              Insulated 2°C–6°C Cold Chain
            </span>
          </div>

          <div className="mx-auto text-center font-serif-luxury tracking-wide text-xs md:text-[13px] text-[#FAF8F5]">
            {siteSettings.announcementBar}
          </div>

          <div className="hidden md:flex items-center space-x-3 text-[11px]">
            <button
              onClick={() => handleNavClick('tracking')}
              className="text-[#DFCA9B] hover:text-white transition-colors cursor-pointer"
            >
              Track Order
            </button>
            <span className="text-[#2A4836]">|</span>
            <button
              onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
              className="flex items-center space-x-1 text-[#DFCA9B] hover:text-white font-medium cursor-pointer"
              title="Toggle Currency"
            >
              <span>{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Luxury Header */}
      <header
        id="main-header"
        className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#DFCA9B]/30 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Nav (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-7 text-[13px] tracking-widest font-medium uppercase text-[#1C221F]">
              <button
                id="nav-home"
                onClick={() => handleNavClick('home')}
                className={`transition-colors hover:text-[#C5A265] cursor-pointer pb-1 ${
                  activePage === 'home' ? 'text-[#14281E] border-b border-[#C5A265] font-semibold' : ''
                }`}
              >
                Home
              </button>
              <button
                id="nav-shop"
                onClick={() => handleNavClick('shop')}
                className={`transition-colors hover:text-[#C5A265] cursor-pointer pb-1 ${
                  activePage === 'shop' || activePage === 'product'
                    ? 'text-[#14281E] border-b border-[#C5A265] font-semibold'
                    : ''
                }`}
              >
                Shop Collection
              </button>
              <button
                id="nav-palm-to-bottle"
                onClick={() => handleNavClick('palm-to-bottle')}
                className={`transition-colors hover:text-[#C5A265] cursor-pointer pb-1 ${
                  activePage === 'palm-to-bottle' ? 'text-[#14281E] border-b border-[#C5A265] font-semibold' : ''
                }`}
              >
                Khajur to Bottle
              </button>
              <button
                id="nav-story"
                onClick={() => handleNavClick('story')}
                className={`transition-colors hover:text-[#C5A265] cursor-pointer pb-1 ${
                  activePage === 'story' ? 'text-[#14281E] border-b border-[#C5A265] font-semibold' : ''
                }`}
              >
                Our Heritage
              </button>
              <button
                id="nav-sustainability"
                onClick={() => handleNavClick('sustainability')}
                className={`transition-colors hover:text-[#C5A265] cursor-pointer pb-1 ${
                  activePage === 'sustainability' ? 'text-[#14281E] border-b border-[#C5A265] font-semibold' : ''
                }`}
              >
                Sustainability
              </button>
              <button
                id="nav-journal"
                onClick={() => handleNavClick('journal')}
                className={`transition-colors hover:text-[#C5A265] cursor-pointer pb-1 ${
                  activePage === 'journal' ? 'text-[#14281E] border-b border-[#C5A265] font-semibold' : ''
                }`}
              >
                Journal
              </button>
            </nav>

            {/* Mobile Hamburger */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#14281E] hover:text-[#C5A265] cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Crest & Logo Center */}
            <div
              id="brand-logo-container"
              onClick={() => handleNavClick('home')}
              className="flex flex-col items-center justify-center cursor-pointer group py-1"
            >
              <div className="flex items-center space-x-1.5 text-[#C5A265] mb-0.5 group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  {/* Stylized Palm Tree Emblem */}
                  <path d="M12 2C12.5 4 14 5.5 16 6C14.5 7 13.5 8.5 13 10C14.5 10 16 10.5 17 11.5C15.5 12 14 13 13.5 14C15 14.5 16 15.5 16.5 17C14.5 16.5 13.5 15.5 12.8 14.5L12 22L11.2 14.5C10.5 15.5 9.5 16.5 7.5 17C8 15.5 9 14.5 10.5 14C10 13 8.5 12 7 11.5C8 10.5 9.5 10 11 10C10.5 8.5 9.5 7 8 6C10 5.5 11.5 4 12 2Z" />
                </svg>
              </div>
              <span
                id="brand-title"
                className="text-2xl sm:text-3xl font-serif-luxury tracking-[0.22em] text-[#14281E] font-medium leading-none"
              >
                NIRAA<span className="text-[10px] tracking-normal font-sans align-top text-[#C5A265] ml-0.5">™</span>
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#C5A265] font-medium mt-1">
                Ancient Roots • Brighter Tomorrow
              </span>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5 text-[#14281E]">
              {/* Search Toggle */}
              <button
                id="btn-search-toggle"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:text-[#C5A265] transition-colors cursor-pointer"
                aria-label="Search collection"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button
                id="btn-wishlist-toggle"
                onClick={() => handleNavClick('account')}
                className="p-2 hover:text-[#C5A265] transition-colors relative cursor-pointer hidden sm:block"
                aria-label="View wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-[#C5A265] text-[#0C1A13] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* User Account / Profile */}
              <div className="relative">
                <button
                  id="btn-user-menu"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-2 hover:text-[#C5A265] transition-colors flex items-center space-x-1 cursor-pointer"
                  aria-label="User account"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-3 h-3 text-[#5C6761] hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-[#FAF8F5] border border-[#DFCA9B]/50 shadow-xl rounded-md py-2 z-50 animate-in fade-in slide-in-from-top-2 text-[#1C221F]"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    {currentUser ? (
                      <>
                        <div className="px-4 py-2 border-b border-[#DFCA9B]/30">
                          <p className="text-xs text-[#5C6761]">Welcome,</p>
                          <p className="text-sm font-semibold truncate text-[#14281E]">{currentUser.name}</p>
                          <span className="inline-block bg-[#14281E] text-[#DFCA9B] text-[9px] uppercase px-1.5 py-0.5 rounded mt-1 font-semibold tracking-wider">
                            {currentUser.segment} Patron
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            handleNavClick('account');
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs hover:bg-[#F3EBDD] transition-colors flex items-center"
                        >
                          <User className="w-3.5 h-3.5 mr-2 text-[#C5A265]" />
                          My Cellar Account
                        </button>
                        <button
                          onClick={() => {
                            handleNavClick('tracking');
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs hover:bg-[#F3EBDD] transition-colors flex items-center"
                        >
                          <Truck className="w-3.5 h-3.5 mr-2 text-[#C5A265]" />
                          Track Cold Deliveries
                        </button>
                      </>
                    ) : (
                      <div className="px-4 py-3">
                        <p className="text-xs text-[#5C6761] mb-2">Access your luxury cellar orders & subscriptions</p>
                        <button
                          onClick={() => {
                            handleNavClick('account');
                            setUserMenuOpen(false);
                          }}
                          className="w-full bg-[#14281E] text-[#F3EBDD] text-xs py-2 rounded font-medium hover:bg-[#2A4836] transition-colors cursor-pointer"
                        >
                          Sign In / Register
                        </button>
                      </div>
                    )}

                    {/* Patron Quick Links */}
                    <div className="px-4 py-2 border-t border-[#DFCA9B]/30 text-[11px] text-[#8C9791]">
                      <span>NIRAA Heritage Reserves • Bangalore</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Shopping Bag / Cart Drawer Button */}
              <button
                id="btn-cart-drawer-toggle"
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:text-[#C5A265] transition-colors relative cursor-pointer"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5 text-[#14281E]" />
                {cartCount > 0 && (
                  <span
                    id="cart-badge-count"
                    className="absolute top-1 right-0.5 bg-[#14281E] text-[#DFCA9B] border border-[#C5A265] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse"
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Admin direct pill (Desktop) */}
              <button
                id="btn-admin-pill"
                onClick={() => handleNavClick('admin')}
                className="hidden xl:flex items-center space-x-1 border border-[#C5A265]/40 text-[#14281E] hover:bg-[#14281E] hover:text-[#F3EBDD] text-[11px] uppercase tracking-wider px-2.5 py-1 rounded transition-colors cursor-pointer"
              >
                <ShieldAlert className="w-3 h-3 text-[#C5A265]" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Live Search Drawer */}
        {searchOpen && (
          <div
            id="search-bar-dropdown"
            className="border-t border-[#DFCA9B]/40 bg-[#FAF8F5] px-4 py-4 shadow-lg animate-in slide-in-from-top duration-200"
          >
            <div className="max-w-3xl mx-auto">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-[#C5A265] absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pure neera, mango infusion, gift collections, wellness..."
                  className="w-full pl-11 pr-10 py-2.5 bg-white border border-[#DFCA9B] rounded-none focus:outline-none focus:border-[#14281E] text-sm text-[#1C221F] placeholder:text-[#5C6761]/60"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-[#5C6761] hover:text-[#14281E]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search Suggestions */}
              {searchQuery && (
                <div className="mt-3 bg-white border border-[#DFCA9B]/40 divide-y divide-[#DFCA9B]/20 max-h-80 overflow-y-auto">
                  {filteredSearchProducts.length > 0 ? (
                    filteredSearchProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedProductId(p.id);
                          setActivePage('product');
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="p-3 flex items-center space-x-4 hover:bg-[#FAF8F5] cursor-pointer transition-colors"
                      >
                        <img
                          src={p.primaryImage}
                          alt={p.name}
                          className="w-12 h-12 object-contain bg-[#FAF8F5] p-1 border border-[#DFCA9B]/30"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-serif-luxury font-medium text-[#14281E] truncate">{p.name}</p>
                          <p className="text-xs text-[#5C6761] truncate">{p.tagline}</p>
                          <p className="text-xs font-semibold text-[#C5A265] mt-0.5">₹{p.price}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-[#5C6761]">
                      No beverages matching "{searchQuery}". Try searching "Neera", "Mango", or "Gift".
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Slide-Over Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="relative ml-auto w-full max-w-xs bg-[#FAF8F5] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#DFCA9B]/40">
                <span className="text-xl font-serif-luxury tracking-widest text-[#14281E]">NIRAA™</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#14281E] hover:text-[#C5A265]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 flex flex-col space-y-4 text-sm font-medium tracking-wider uppercase text-[#1C221F]">
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-left py-2 border-b border-[#DFCA9B]/20 hover:text-[#C5A265]"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('shop')}
                  className="text-left py-2 border-b border-[#DFCA9B]/20 hover:text-[#C5A265]"
                >
                  Shop Collection
                </button>
                <button
                  onClick={() => handleNavClick('palm-to-bottle')}
                  className="text-left py-2 border-b border-[#DFCA9B]/20 hover:text-[#C5A265]"
                >
                  Khajur to Bottle
                </button>
                <button
                  onClick={() => handleNavClick('story')}
                  className="text-left py-2 border-b border-[#DFCA9B]/20 hover:text-[#C5A265]"
                >
                  Our Heritage
                </button>
                <button
                  onClick={() => handleNavClick('sustainability')}
                  className="text-left py-2 border-b border-[#DFCA9B]/20 hover:text-[#C5A265]"
                >
                  Sustainability
                </button>
                <button
                  onClick={() => handleNavClick('journal')}
                  className="text-left py-2 border-b border-[#DFCA9B]/20 hover:text-[#C5A265]"
                >
                  Journal / Blog
                </button>
                <button
                  onClick={() => handleNavClick('tracking')}
                  className="text-left py-2 border-b border-[#DFCA9B]/20 hover:text-[#C5A265] flex items-center text-[#C5A265]"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Track Order
                </button>
                <button
                  onClick={() => handleNavClick('faq')}
                  className="text-left py-2 border-b border-[#DFCA9B]/20 hover:text-[#C5A265]"
                >
                  FAQ
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="text-left py-2 border-b border-[#DFCA9B]/20 hover:text-[#C5A265]"
                >
                  Concierge & Contact
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#DFCA9B]/40">
              <div className="flex items-center justify-between text-xs text-[#5C6761] mb-3">
                <span>Currency</span>
                <button
                  onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
                  className="font-bold text-[#14281E]"
                >
                  {currency === 'INR' ? '₹ INR (India)' : '$ USD (Global)'}
                </button>
              </div>
              <p className="text-[11px] text-[#5C6761] text-center">
                Cold-Chain Certified • 100% Raw Wild Khajur Nectar
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
