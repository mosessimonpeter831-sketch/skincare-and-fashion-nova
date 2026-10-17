import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToProduct } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryTag, setCategoryTag] = useState<'all' | 'skincare' | 'fashion' | 'lifestyle'>('all');

  if (!isSearchOpen) return null;

  const results = PRODUCTS.filter((p) => {
    const matchesCategory = categoryTag === 'all' || p.category === categoryTag;
    const matchesSearch =
      searchTerm.trim() === '' ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-12">
        <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
          
          {/* Search Header Input */}
          <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center gap-3">
            <Search className="w-5 h-5 text-stone-500 shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search serums, coats, silks, bags, or rituals..."
              className="w-full bg-transparent text-base sm:text-lg text-[#1C1917] placeholder:text-stone-400 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-stone-500 hover:text-black rounded-full hover:bg-stone-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Tabs */}
          <div className="px-6 py-3 bg-[#F5F1EA] border-b border-stone-200 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-stone-500 font-medium whitespace-nowrap">Filter:</span>
            <button
              onClick={() => setCategoryTag('all')}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                categoryTag === 'all' ? 'bg-[#1C1917] text-white font-medium' : 'text-stone-600 hover:text-black'
              }`}
            >
              All Items ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setCategoryTag('skincare')}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                categoryTag === 'skincare' ? 'bg-[#1C1917] text-white font-medium' : 'text-stone-600 hover:text-black'
              }`}
            >
              Skincare
            </button>
            <button
              onClick={() => setCategoryTag('fashion')}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                categoryTag === 'fashion' ? 'bg-[#1C1917] text-white font-medium' : 'text-stone-600 hover:text-black'
              }`}
            >
              Fashion
            </button>
            <button
              onClick={() => setCategoryTag('lifestyle')}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                categoryTag === 'lifestyle' ? 'bg-[#1C1917] text-white font-medium' : 'text-stone-600 hover:text-black'
              }`}
            >
              Lifestyle
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[50vh] overflow-y-auto p-4 sm:p-6 space-y-3">
            {results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm text-stone-600 mb-1">No matching products found</p>
                <p className="text-xs text-stone-400">Try searching for "serum", "wool", "silk", or "cream"</p>
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateToProduct(product);
                  }}
                  className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-[#F5F1EA] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-16 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] font-medium block">
                        {product.categoryLabel}
                      </span>
                      <h4 className="text-sm font-semibold text-[#1C1917] group-hover:text-[#8A6A4E] transition-colors">
                        {product.name}
                      </h4>
                      <span className="text-xs text-stone-600 font-medium tabular-nums">
                        ${product.salePrice ?? product.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-stone-400 group-hover:text-[#1C1917] transition-colors">
                    <span className="hidden sm:inline">View details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
