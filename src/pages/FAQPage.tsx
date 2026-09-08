import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronDown, ChevronUp, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { faqs, setActivePage } = useStore();
  const [openId, setOpenId] = useState<string>(faqs[0]?.id || 'faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'The Beverage', 'Logistics', 'Health'];

  const filteredFaqs =
    selectedCategory === 'All'
      ? faqs
      : faqs.filter((f) => f.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div id="page-faq" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
            Knowledge & Clarifications
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif-luxury text-[#14281E] font-medium mt-2">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6761] mt-3 leading-relaxed">
            Everything you need to know about fresh wild Khajur tree neera, our cold-chain technology, and cellar subscriptions.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#14281E] text-[#F3EBDD] font-semibold'
                  : 'bg-white text-[#5C6761] hover:text-[#14281E] border border-[#DFCA9B]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-[#DFCA9B]/50 transition-all overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenId(isOpen ? '' : faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between cursor-pointer hover:bg-[#FAF8F5]/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-[#C5A265] shrink-0"></span>
                    <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-[#14281E]">
                      {faq.question}
                    </h3>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#C5A265] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#5C6761] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#5C6761] leading-relaxed border-t border-[#DFCA9B]/20 pt-4 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-3 text-[10px] bg-[#FAF8F5] text-[#14281E] border border-[#DFCA9B]/40 px-2 py-0.5 uppercase tracking-wider font-mono">
                      Category: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need more help CTA */}
        <div className="mt-16 text-center bg-[#F5F1E9] p-8 border border-[#DFCA9B]/50">
          <p className="font-serif-luxury text-xl text-[#14281E]">Have an unanswered question?</p>
          <p className="text-xs text-[#5C6761] mt-1 max-w-sm mx-auto">
            Our sommelier and botanical concierges are available to assist you.
          </p>
          <button
            onClick={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 bg-[#14281E] text-[#F3EBDD] px-6 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-[#2A4836] cursor-pointer inline-flex items-center space-x-1.5"
          >
            <span>Contact Cellar Concierge</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A265]" />
          </button>
        </div>
      </div>
    </div>
  );
};
