import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';

export const ShopCatalogView: React.FC = () => {
  const {
    activeCategoryFilter,
    setActiveCategoryFilter,
    setCurrentView
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(350);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter & sort logic
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory =
      activeCategoryFilter === 'all' || p.category === activeCategoryFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = !inStockOnly || p.stock > 0;
    const effectivePrice = p.salePrice ?? p.price;
    const matchesPrice = effectivePrice <= maxPrice;

    return matchesCategory && matchesSearch && matchesStock && matchesPrice;
  }).sort((a, b) => {
    const priceA = a.salePrice ?? a.price;
    const priceB = b.salePrice ?? b.price;
    if (selectedSort === 'price-asc') return priceA - priceB;
    if (selectedSort === 'price-desc') return priceB - priceA;
    if (selectedSort === 'rating') return b.rating - a.rating;
    if (selectedSort === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
    return 0; // featured default order
  });

  const resetFilters = () => {
    setActiveCategoryFilter('all');
    setSearchQuery('');
    setInStockOnly(false);
    setMaxPrice(350);
    setSelectedSort('featured');
  };

  return (
    <div className="bg-[#FBF9F5] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Catalog Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.24em] text-[#8C7A6B] font-semibold block mb-2">
            The Complete Atelier
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1C1917] mb-3 font-editorial">
            NAOVA Collection
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Intentional skincare rituals, contemporary tailored fashion, and timeless accessories created to inspire everyday elegance.
          </p>
        </div>

        {/* Toolbar: Search, Filters, Sort, and Mobile Toggle */}
        <div className="bg-[#F5F1EA] p-4 sm:p-5 rounded-2xl border border-stone-200/90 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, product name..."
              className="w-full pl-9 pr-4 py-2 bg-[#FBF9F5] border border-stone-300 rounded-xs text-xs text-[#1C1917] placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 bg-[#EBE5DB] rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'all' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setActiveCategoryFilter('skincare')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'skincare' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Skincare
            </button>
            <button
              onClick={() => setActiveCategoryFilter('fashion')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'fashion' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Fashion
            </button>
            <button
              onClick={() => setActiveCategoryFilter('lifestyle')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'lifestyle' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Lifestyle
            </button>
          </div>

          {/* Right Controls: Sort & Mobile filter trigger */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 whitespace-nowrap hidden sm:inline">Sort by:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as any)}
                className="px-3 py-2 bg-[#FBF9F5] border border-stone-300 rounded-xs text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-xs font-medium text-stone-800 rounded-xs flex items-center gap-1.5 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>

        </div>

        {/* Collapsible Filter Bar (When toggled) */}
        {showMobileFilters && (
          <div className="bg-[#F5F1EA] p-5 rounded-xl border border-stone-200/90 mb-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Category selector on mobile */}
              <div>
                <span className="text-xs font-semibold uppercase text-stone-800 block mb-2">Category</span>
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'skincare', 'fashion', 'lifestyle'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategoryFilter(cat)}
                      className={`px-3 py-1 text-xs rounded-xs capitalize border ${
                        activeCategoryFilter === cat
                          ? 'bg-[#1C1917] text-white border-[#1C1917]'
                          : 'bg-white border-stone-300 text-stone-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <div className="flex justify-between text-xs font-semibold uppercase text-stone-800 mb-2">
                  <span>Max Price</span>
                  <span className="font-mono text-stone-600">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="350"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-stone-900 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                  <span>$40</span>
                  <span>$350</span>
                </div>
              </div>

              {/* In stock toggle & reset */}
              <div className="flex flex-col justify-between">
                <label className="flex items-center gap-2 text-xs font-medium text-stone-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-stone-900 rounded-xs"
                  />
                  <span>Show in-stock items only</span>
                </label>

                <button
                  onClick={resetFilters}
                  className="mt-3 text-xs text-[#8A6A4E] hover:underline text-left font-medium"
                >
                  Reset all filters
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#78716C] mb-6">
          <span>
            Showing <strong className="text-[#1C1917]">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'item' : 'items'}
          </span>
          {(searchQuery || activeCategoryFilter !== 'all' || inStockOnly || maxPrice < 350) && (
            <button
              onClick={resetFilters}
              className="text-stone-500 hover:text-stone-900 underline"
            >
              Clear active filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F5F1EA] rounded-2xl border border-stone-200">
            <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center mx-auto mb-4 text-stone-400">
              <Sparkles className="w-8 h-8 text-[#8A6A4E]" />
            </div>
            <h3 className="text-xl font-semibold text-[#1C1917] mb-2 font-editorial">
              No products match your criteria
            </h3>
            <p className="text-xs text-[#57534E] mb-6 max-w-sm mx-auto">
              We couldn't find items matching your search or filter configuration. Try broadening your criteria.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
