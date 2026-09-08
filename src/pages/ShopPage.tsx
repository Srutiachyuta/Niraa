import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/SafeImage';
import {
  Sparkles,
  Filter,
  ArrowUpDown,
  Star,
  Eye,
  Heart,
  Calendar,
  ShieldCheck,
  Search,
  Check,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    formatPrice,
    addToCart,
    setQuickViewProduct,
    setSubscriptionModalProduct,
    setSelectedProductId,
    setActivePage,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const categories = ['All', 'Pure Neera', 'Botanical Infusion', 'Luxury Gift Sets'];

  // Filtering
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // default featured
  });

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="page-shop" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
            The Living Cellar
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-luxury text-[#14281E] font-medium mt-2">
            The NIRAA Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6761] mt-3 leading-relaxed">
            Every bottle is filled with fresh wild Khajur tree neera, harvested at dawn and kept in continuous cold suspension at 2°C–6°C. Shipped across India in custom insulated cryo-coolers.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="bg-[#F5F1E9] border border-[#DFCA9B]/50 p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#14281E] text-[#F3EBDD] font-semibold shadow-xs'
                    : 'bg-white text-[#5C6761] hover:text-[#14281E] border border-[#DFCA9B]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search and Sort controls */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            <div className="relative flex-1 md:w-48">
              <Search className="w-3.5 h-3.5 text-[#5C6761] absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter cellar..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#DFCA9B] text-xs text-[#1C221F] focus:outline-none focus:border-[#14281E]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#5C6761]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#DFCA9B] text-xs py-1.5 px-2 text-[#1C221F] focus:outline-none focus:border-[#14281E]"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white border border-[#DFCA9B]/40">
            <p className="font-serif-luxury text-xl text-[#14281E]">No beverages match your selection.</p>
            <p className="text-xs text-[#5C6761]">Try adjusting your search criteria or category filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchFilter('');
              }}
              className="text-xs uppercase tracking-wider text-[#C5A265] underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => {
              const defaultVariant = product.variants[0];
              const isFav = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white border border-[#DFCA9B]/40 group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Canvas with Hover Badges */}
                  <div className="relative bg-[#FAF8F5] p-8 aspect-4/5 flex items-center justify-center overflow-hidden">
                    <SafeImage
                      src={product.primaryImage}
                      alt={product.name}
                      onClick={() => handleProductClick(product.id)}
                      className="max-h-64 object-contain group-hover:scale-105 transition-transform duration-500 cursor-pointer drop-shadow-md"
                    />

                    {/* Category badge */}
                    <span className="absolute top-3 left-3 bg-[#14281E] text-[#DFCA9B] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1">
                      {product.category}
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-xs transition-colors cursor-pointer ${
                        isFav ? 'text-red-600' : 'text-[#5C6761] hover:text-[#14281E]'
                      }`}
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    {/* Quick View Button on Hover */}
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#0C1A13]/90 text-[#FAF8F5] hover:bg-[#14281E] text-xs px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5 uppercase tracking-wider cursor-pointer shadow-lg whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C5A265]" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Product Details Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Rating */}
                      <div className="flex items-center space-x-1.5 text-xs mb-2">
                        <div className="flex text-[#C5A265]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-[#14281E] font-semibold text-[11px]">{product.rating}</span>
                        <span className="text-[#5C6761] text-[11px]">({product.reviewsCount})</span>
                      </div>

                      <h3
                        onClick={() => handleProductClick(product.id)}
                        className="text-lg font-serif-luxury font-semibold text-[#14281E] hover:text-[#C5A265] transition-colors cursor-pointer leading-tight"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#5C6761] font-serif-luxury italic mt-1 line-clamp-1">
                        {product.tagline}
                      </p>

                      <div className="mt-3 flex items-baseline space-x-2">
                        <span className="text-lg font-serif-luxury font-bold text-[#14281E]">
                          {formatPrice(defaultVariant.price)}
                        </span>
                        {defaultVariant.compareAtPrice && (
                          <span className="text-xs text-[#5C6761] line-through">
                            {formatPrice(defaultVariant.compareAtPrice)}
                          </span>
                        )}
                        <span className="text-[11px] text-[#5C6761] ml-auto">{defaultVariant.size}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 pt-4 border-t border-[#DFCA9B]/30 flex space-x-2">
                      <button
                        onClick={() => addToCart(product, defaultVariant, 1)}
                        className="flex-1 bg-[#14281E] text-[#F3EBDD] hover:bg-[#2A4836] py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A265]" />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        onClick={() => setSubscriptionModalProduct(product)}
                        className="border border-[#14281E] text-[#14281E] hover:bg-[#14281E] hover:text-[#F3EBDD] p-2.5 transition-colors cursor-pointer"
                        title="Subscribe & Save 15%"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Cold Chain Guarantee Card */}
        <div className="mt-16 bg-[#14281E] text-[#FAF8F5] p-8 border border-[#2A4836] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#0C1A13] border border-[#C5A265]/40 rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#C5A265]" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-lg text-[#DFCA9B]">The NIRAA Cold Guarantee</h4>
              <p className="text-xs text-[#FAF8F5]/80 mt-0.5">
                Every shipment is monitored with temperature logging. If your bottles arrive above 6°C, we will immediately replace your order free of charge.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setActivePage('shipping');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs uppercase tracking-widest text-[#DFCA9B] hover:text-white underline whitespace-nowrap cursor-pointer"
          >
            Read Shipping Protocols →
          </button>
        </div>
      </div>
    </div>
  );
};
