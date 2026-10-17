import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { ArrowUpRight } from 'lucide-react';

export const FeaturedCategories: React.FC = () => {
  const { navigateToCategory } = useStore();

  return (
    <section className="py-20 bg-[#FBF9F5] border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.24em] text-[#8C7A6B] font-semibold block mb-3">
            Curated Collections
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] mb-4">
            Find Your NAOVA Essentials
          </h2>
          <p className="text-base text-[#57534E] leading-relaxed">
            Discover the pieces and rituals that make every day feel exceptional.
          </p>
        </div>

        {/* 3 Large Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateToCategory(cat.id)}
              className="group relative rounded-2xl overflow-hidden bg-[#EDE7DC] border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-[460px]"
            >
              {/* Background Image Container */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/85 transition-colors duration-300" />
              </div>

              {/* Card Header Tag */}
              <div className="relative z-10 p-6 flex justify-between items-start">
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/80 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  {cat.itemCount}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#1C1917] transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Card Bottom Content */}
              <div className="relative z-10 mt-auto p-6 sm:p-8 flex flex-col text-white">
                <h3 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight mb-2.5 text-white drop-shadow-xs">
                  {cat.title}
                </h3>
                <p className="text-sm text-stone-200 font-light leading-relaxed mb-6 line-clamp-2">
                  {cat.subtitle}
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#EAE4DC] group-hover:text-white group-hover:underline underline-offset-4 transition-all">
                  <span>{cat.cta}</span>
                  <span aria-hidden="true">→</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
