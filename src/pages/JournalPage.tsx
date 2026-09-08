import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BlogPost } from '../types';
import { Sparkles, Calendar, Clock, ArrowRight, X, User } from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { ASSETS } from '../data/assets';

export const JournalPage: React.FC = () => {
  const { blogPosts } = useStore();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div id="page-journal" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
            Botanical Notes & Cultural Discourse
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif-luxury text-[#14281E] font-medium mt-2">
            The NIRAA Journal
          </h1>
          <p className="text-sm sm:text-base text-[#5C6761] mt-4 leading-relaxed font-light">
            Essays on cellular hydration, Ayurvedic ethnobotany, cold-chain gastronomy, and India’s revived living culinary heritage.
          </p>
        </div>

        {/* Featured Post (Post 1) */}
        {blogPosts[0] && (
          <div
            onClick={() => setSelectedPost(blogPosts[0])}
            className="bg-white border border-[#DFCA9B]/60 p-6 sm:p-10 mb-16 shadow-sm hover:shadow-md transition-all cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 overflow-hidden">
              <SafeImage
                src={blogPosts[0].image || blogPosts[0].coverImage || ASSETS.khajurSunrise}
                fallbackSrc={ASSETS.khajurSunrise}
                alt={blogPosts[0].title}
                className="w-full h-80 object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center space-x-3 text-xs text-[#C5A265] font-semibold">
                <span>{blogPosts[0].category}</span>
                <span>•</span>
                <span className="flex items-center text-[#5C6761] font-normal">
                  <Clock className="w-3 h-3 mr-1" />
                  {blogPosts[0].readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#14281E] group-hover:text-[#C5A265] transition-colors leading-tight">
                {blogPosts[0].title}
              </h2>

              <p className="text-xs sm:text-sm text-[#5C6761] leading-relaxed line-clamp-3">
                {blogPosts[0].summary || blogPosts[0].excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-[#14281E] font-medium">{blogPosts[0].author}</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#14281E] flex items-center group-hover:text-[#C5A265]">
                  Read Essay <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white border border-[#DFCA9B]/40 p-6 flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group"
            >
              <div>
                <div className="aspect-16/10 overflow-hidden mb-5 bg-[#FAF8F5]">
                  <SafeImage
                    src={post.image || post.coverImage || ASSETS.khajurEstate}
                    fallbackSrc={ASSETS.khajurEstate}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-[#C5A265] font-semibold mb-2">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span className="text-[#5C6761] font-normal">{post.readTime}</span>
                </div>

                <h3 className="text-lg font-serif-luxury font-bold text-[#14281E] group-hover:text-[#C5A265] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-[#5C6761] mt-2 leading-relaxed line-clamp-3">
                  {post.summary || post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DFCA9B]/30 flex items-center justify-between text-xs text-[#5C6761]">
                <span>{post.date || post.publishedDate}</span>
                <span className="text-[#14281E] font-semibold flex items-center group-hover:text-[#C5A265]">
                  Read <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Read Article Full Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
              onClick={() => setSelectedPost(null)}
            ></div>

            <div className="relative bg-[#FAF8F5] max-w-3xl w-full shadow-2xl border border-[#DFCA9B]/70 z-10 p-6 sm:p-10 my-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute right-6 top-6 p-2 text-[#5C6761] hover:text-[#14281E] rounded-full cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-xs text-[#C5A265] font-semibold">
                  <span>{selectedPost.category}</span>
                  <span>•</span>
                  <span className="text-[#5C6761]">{selectedPost.date || selectedPost.publishedDate}</span>
                  <span>•</span>
                  <span className="text-[#5C6761]">{selectedPost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-[#14281E] leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="flex items-center space-x-2 text-xs text-[#5C6761] border-b border-[#DFCA9B]/40 pb-4">
                  <User className="w-3.5 h-3.5 text-[#C5A265]" />
                  <span>By {selectedPost.author}</span>
                </div>

                <SafeImage
                  src={selectedPost.image || selectedPost.coverImage || ASSETS.khajurSunrise}
                  fallbackSrc={ASSETS.khajurSunrise}
                  alt={selectedPost.title}
                  className="w-full h-72 object-cover border border-[#DFCA9B]/30 my-4"
                />

                <div className="text-sm leading-relaxed text-[#1C221F] space-y-4 font-light">
                  <p className="font-serif-luxury text-lg italic text-[#5C6761]">
                    "{selectedPost.summary || selectedPost.excerpt}"
                  </p>
                  {Array.isArray(selectedPost.content) ? (
                    selectedPost.content.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))
                  ) : (
                    <p>{selectedPost.content}</p>
                  )}
                  <p>
                    In clinical observations, raw wild Khajur tree sap exhibits a naturally regulated osmolarity that closely mimics human blood plasma. This facilitates immediate fluid absorption across cellular membranes without the sudden gastrointestinal distress often associated with hypertonic synthetic carbohydrate drinks.
                  </p>
                  <p>
                    As the world re-evaluates ancient food systems through the lens of modern molecular biology, neera emerges not as a relic of folklore, but as one of nature’s most sophisticated biochemical innovations.
                  </p>
                </div>

                <div className="pt-8 border-t border-[#DFCA9B]/40 flex justify-between items-center">
                  <span className="text-xs text-[#5C6761]">NIRAA Editorial Council</span>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="bg-[#14281E] text-[#F3EBDD] px-5 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#2A4836] cursor-pointer"
                  >
                    Close Essay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
