import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

export const TheNaovaEdit: React.FC = () => {
  const { setCurrentView, navigateToCategory } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'skincare' | 'fashion' | 'lifestyle'>('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  return (
    <section className="py-20 bg-[#FBF9F5] border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-[#8C7A6B] font-semibold block mb-2">
              Featured Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] mb-2">
              The NAOVA Edit
            </h2>
            <p className="text-base text-[#57534E]">
              Your next favorites, thoughtfully selected.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EFEAE1] rounded-lg self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveTab('skincare')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'skincare'
                  ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Skincare
            </button>
            <button
              onClick={() => setActiveTab('fashion')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'fashion'
                  ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Fashion
            </button>
            <button
              onClick={() => setActiveTab('lifestyle')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'lifestyle'
                  ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Lifestyle
            </button>
          </div>
        </div>

        {/* 4-column desktop / 2-column mobile grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to view all products */}
        <div className="text-center pt-4">
          <button
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-transparent border border-[#1C1917] text-[#1C1917] text-xs font-medium tracking-widest uppercase rounded-xs hover:bg-[#1C1917] hover:text-white transition-all group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
