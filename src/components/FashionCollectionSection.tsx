import React from 'react';
import { useStore } from '../context/StoreContext';
import { ASSETS, PRODUCTS } from '../data/products';
import { ArrowRight, Sparkles, MoveRight } from 'lucide-react';

export const FashionCollectionSection: React.FC = () => {
  const { navigateToCategory, navigateToProduct } = useStore();

  const fashionPicks = [
    { label: 'New Arrivals', filter: 'fashion', product: PRODUCTS[1], count: 'Autumn/Winter' },
    { label: 'Everyday Essentials', filter: 'fashion', product: PRODUCTS[5], count: 'Pure Silk Crepe' },
    { label: 'Statement Pieces', filter: 'fashion', product: PRODUCTS[7], count: 'Pleated Trousers' },
    { label: 'Featured Looks', filter: 'lifestyle', product: PRODUCTS[3], count: 'Handcrafted Leather' }
  ];

  return (
    <section className="py-24 bg-[#1C1917] text-[#EDE7DC] border-b border-stone-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Lockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <span className="text-xs uppercase tracking-[0.26em] text-[#C5A880] font-semibold block mb-3">
              The Fashion Edit
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              Style That Speaks Without Words.
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed mb-6 font-light">
              Explore modern fashion designed to complement your individuality, your lifestyle, and the way you want to show up in the world.
            </p>
            <div>
              <button
                onClick={() => navigateToCategory('fashion')}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#EDE7DC] text-[#1C1917] text-xs font-semibold tracking-widest uppercase rounded-xs hover:bg-white transition-all group"
              >
                <span>Explore Fashion</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Hero Lookbook Showcase */}
          <div 
            onClick={() => navigateToProduct(PRODUCTS[1])}
            className="lg:col-span-7 group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl min-h-[500px] cursor-pointer flex flex-col justify-between p-8"
          >
            <img
              src={ASSETS.fashionEditorial}
              alt="NAOVA model in tailored wool trench coat"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                Editorial Signature
              </span>
              <span className="text-xs font-mono text-stone-300 tracking-wider">
                Look 01
              </span>
            </div>

            <div className="relative z-10 max-w-md">
              <span className="text-xs uppercase tracking-wider text-[#C5A880] font-medium block mb-1">
                Outerwear Capsule
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-white mb-2">
                The Architectural Wool Trench
              </h3>
              <p className="text-sm text-stone-300 font-light mb-4 line-clamp-2">
                Italian virgin wool tailored with defined proportions and fluid movement.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white group-hover:underline underline-offset-4">
                <span>View Garment</span>
                <MoveRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Right Column: 4 Editorial Curated Chapters */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {fashionPicks.map((pick, i) => (
              <div
                key={pick.label}
                onClick={() => navigateToProduct(pick.product)}
                className="group p-5 rounded-xl bg-stone-900/60 border border-stone-800/80 hover:border-stone-700 hover:bg-stone-900 transition-all duration-200 cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-stone-800 border border-stone-700">
                    <img
                      src={pick.product.images[0]}
                      alt={pick.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium block">
                      {pick.count}
                    </span>
                    <h4 className="text-base font-medium text-white group-hover:text-[#EDE7DC] transition-colors">
                      {pick.label}
                    </h4>
                    <span className="text-xs text-stone-400">
                      {pick.product.name}
                    </span>
                  </div>
                </div>

                <div className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 group-hover:text-white group-hover:bg-[#C5A880] group-hover:text-[#1C1917] transition-all shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
