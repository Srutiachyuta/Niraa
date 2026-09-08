import React, { useState } from 'react';
import { useStore, ActivePage } from '../context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck, Award, HeartHandshake, Leaf, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleLinkClick = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      showToast('Please provide a valid email address.', 'warning');
      return;
    }
    showToast('Welcome to the NIRAA Patron Circle. Your introductory invite code has been sent.');
    setNewsletterEmail('');
  };

  return (
    <footer id="footer-main" className="bg-[#0C1A13] text-[#F3EBDD] border-t border-[#2A4836]/50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges / Brand Guarantees Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-[#2A4836]/40 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#14281E] border border-[#C5A265]/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#C5A265]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">100% Raw Nectar</p>
              <p className="text-[11px] text-[#DFCA9B]/70">Zero added sugar or chemicals</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#14281E] border border-[#C5A265]/40 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-[#C5A265]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">Regenerative Sourcing</p>
              <p className="text-[11px] text-[#DFCA9B]/70">Fair-wage artisan cooperatives</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#14281E] border border-[#C5A265]/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#C5A265]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">2°C–6°C Cold Chain</p>
              <p className="text-[11px] text-[#DFCA9B]/70">Pharmaceutical temperature logs</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#14281E] border border-[#C5A265]/40 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-[#C5A265]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">Indian Heritage</p>
              <p className="text-[11px] text-[#DFCA9B]/70">Shipped from Khajur trees to the world</p>
            </div>
          </div>
        </div>

        {/* Main Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-14 border-b border-[#2A4836]/40">
          {/* Brand Manifesto & Emblem */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2 text-[#C5A265]">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C12.5 4 14 5.5 16 6C14.5 7 13.5 8.5 13 10C14.5 10 16 10.5 17 11.5C15.5 12 14 13 13.5 14C15 14.5 16 15.5 16.5 17C14.5 16.5 13.5 15.5 12.8 14.5L12 22L11.2 14.5C10.5 15.5 9.5 16.5 7.5 17C8 15.5 9 14.5 10.5 14C10 13 8.5 12 7 11.5C8 10.5 9.5 10 11 10C10.5 8.5 9.5 7 8 6C10 5.5 11.5 4 12 2Z" />
              </svg>
              <span className="text-2xl font-serif-luxury tracking-[0.25em] text-[#FAF8F5] font-semibold">
                NIRAA™
              </span>
            </div>
            <p className="text-xs font-serif-luxury tracking-widest text-[#C5A265] uppercase">
              Ancient Roots. A Brighter Tomorrow.
            </p>
            <p className="text-xs text-[#DFCA9B]/80 leading-relaxed max-w-sm">
              Harvested from pristine wild Khajur tree sanctuaries across Southern and Western India, NIRAA brings you nature’s purest cellular elixir — an unpasteurised, nutrient-dense living drink reimagined for a discerning global generation.
            </p>
            <div className="pt-2 flex items-center space-x-4 text-xs text-[#DFCA9B]">
              <span className="border-b border-[#C5A265]/40 pb-0.5">Bengaluru</span>
              <span>•</span>
              <span className="border-b border-[#C5A265]/40 pb-0.5">Mumbai</span>
              <span>•</span>
              <span className="border-b border-[#C5A265]/40 pb-0.5">Dubai</span>
              <span>•</span>
              <span className="border-b border-[#C5A265]/40 pb-0.5">London</span>
            </div>
          </div>

          {/* Column: Collection */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A265] font-semibold">Collection</h4>
            <ul className="space-y-2 text-xs text-[#DFCA9B]/80">
              <li>
                <button onClick={() => handleLinkClick('shop')} className="hover:text-white transition-colors cursor-pointer">
                  All Beverages
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop')} className="hover:text-white transition-colors cursor-pointer">
                  NIRAA Pure Neera
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Alphonso Mango Infusion
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Tender Lime & Lemongrass
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Honey & Saffron Tonic
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Imperial Gift Collection
                </button>
              </li>
            </ul>
          </div>

          {/* Column: The Brand */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A265] font-semibold">The House of NIRAA</h4>
            <ul className="space-y-2 text-xs text-[#DFCA9B]/80">
              <li>
                <button onClick={() => handleLinkClick('story')} className="hover:text-white transition-colors cursor-pointer">
                  Our Heritage & History
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('palm-to-bottle')} className="hover:text-white transition-colors cursor-pointer">
                  Khajur to Bottle Journey
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('sustainability')} className="hover:text-white transition-colors cursor-pointer">
                  Regenerative Sustainability
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('journal')} className="hover:text-white transition-colors cursor-pointer">
                  The NIRAA Journal
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Boutique Concierge & Trade
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Concierge & Newsletter */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A265] font-semibold">Patron Circle</h4>
            <p className="text-xs text-[#DFCA9B]/80 leading-relaxed">
              Receive private invitations to limited vintage cellar allocations, seasonal infusions, and Ayurvedic botanical research.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="relative">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-[#14281E] border border-[#C5A265]/40 px-3.5 py-2.5 text-xs text-[#FAF8F5] placeholder:text-[#DFCA9B]/40 focus:outline-none focus:border-[#C5A265]"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bg-[#C5A265] text-[#0C1A13] px-3 py-1 text-xs font-semibold hover:bg-[#DFCA9B] transition-colors cursor-pointer flex items-center"
              >
                Join
                <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            </form>
            <div className="pt-2 flex items-center space-x-4 text-xs text-[#DFCA9B]/70">
              <button onClick={() => handleLinkClick('tracking')} className="hover:text-white underline cursor-pointer">
                Track Cold Shipment
              </button>
              <span>•</span>
              <button onClick={() => handleLinkClick('account')} className="hover:text-white underline cursor-pointer">
                Client Portal
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Administrative Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#DFCA9B]/60 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <span>© {new Date().getFullYear()} NIRAA™ Luxury Beverages Private Limited. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <button onClick={() => handleLinkClick('shipping')} className="hover:text-[#FAF8F5] cursor-pointer">
              Shipping & Cold-Chain
            </button>
            <button onClick={() => handleLinkClick('privacy')} className="hover:text-[#FAF8F5] cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => handleLinkClick('terms')} className="hover:text-[#FAF8F5] cursor-pointer">
              Terms & Conditions
            </button>
            <button
              onClick={() => handleLinkClick('admin')}
              className="text-[#DFCA9B]/30 hover:text-[#C5A265] transition-colors cursor-pointer p-1"
              title="Authorized Personnel Access"
              aria-label="Cellar Operations Portal"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
