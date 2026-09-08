import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Sparkles, Send, Building, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Private Cellar Concierge',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please complete all required fields.', 'warning');
      return;
    }
    showToast('Your message has been received by our Private Concierge. We will reply within 4 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'Private Cellar Concierge',
      message: '',
    });
  };

  return (
    <div id="page-contact" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
            Private Concierge & Trade
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif-luxury text-[#14281E] font-medium mt-2">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-[#5C6761] mt-4 leading-relaxed font-light">
            Whether inquiring about private cellar allocations, bespoke wedding gifting, or five-star hospitality partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-[#DFCA9B]/50 shadow-sm">
            <h2 className="text-2xl font-serif-luxury text-[#14281E] mb-6">Concierge Inquiry</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maharani Gayatri Devi"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@residence.com"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1.5">
                    Telephone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98000 00000"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1.5">
                    Inquiry Nature
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                  >
                    <option value="Private Cellar Concierge">Private Cellar Concierge</option>
                    <option value="Luxury Hospitality & Fine Dining (HORECA)">
                      Luxury Hospitality & Fine Dining (HORECA)
                    </option>
                    <option value="Bespoke Wedding & Event Gifting">Bespoke Wedding & Event Gifting</option>
                    <option value="Press & Editorial Inquiries">Press & Editorial Inquiries</option>
                    <option value="Cold-Chain Logistics Inquiry">Cold-Chain Logistics Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#14281E] font-semibold block mb-1.5">
                  Your Message or Requirement *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details on guest count, delivery city, or cellar requirements..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#14281E] text-[#F3EBDD] py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#2A4836] transition-colors cursor-pointer flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5 text-[#C5A265]" />
                <span>Submit to NIRAA Concierge</span>
              </button>
            </form>
          </div>

          {/* Right Column: Global Boutiques & Contact details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#14281E] text-[#FAF8F5] p-8 border border-[#2A4836]">
              <div className="flex items-center space-x-2 text-[#C5A265] mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-widest font-semibold">Concierge Service</span>
              </div>
              <h3 className="text-2xl font-serif-luxury font-medium">Bespoke Hospitality & Corporate Curation</h3>
              <p className="text-xs text-[#FAF8F5]/80 mt-2 leading-relaxed">
                We curate custom temperature-controlled gift presentation cases for corporate luminaries, heritage weddings, and Michelin-star fine dining pairings across India and the United Arab Emirates.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#DFCA9B]/50 space-y-4 text-xs text-[#5C6761]">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#C5A265] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#14281E]">NIRAA Central Cellar & Laboratories</p>
                  <p>Plot 48, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#C5A265] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#14281E]">Direct Concierge Email</p>
                  <p>concierge@niraa.luxury</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#C5A265] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#14281E]">Private Client Hotline</p>
                  <p>+91 (080) 4920-NIRAA (Available Mon–Sat, 9AM–7PM IST)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
