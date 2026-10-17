import React from 'react';
import { useStore } from '../context/StoreContext';
import { ASSETS, PRODUCTS } from '../data/products';
import { ArrowRight, Droplets, Sun, Sparkles } from 'lucide-react';

export const SkincareExperienceSection: React.FC = () => {
  const { navigateToCategory, navigateToProduct } = useStore();

  const skincareFeatures = [
    {
      title: 'Daily Care',
      subtitle: 'Gentle cleansing and soothing preparations to refresh your skin morning and evening without disrupting moisture balance.',
      ctaText: 'Explore Daily Care',
      icon: Sun,
      image: ASSETS.skincareBottle,
      featuredProduct: PRODUCTS[0]
    },
    {
      title: 'Hydration Essentials',
      subtitle: 'Moisture-binding hyaluronic acid matrices and lipid barrier protection formulated for smooth, nourished skin all year round.',
      ctaText: 'Explore Hydration',
      icon: Droplets,
      image: ASSETS.brandStory,
      featuredProduct: PRODUCTS[2]
    },
    {
      title: 'Your Beauty Routine',
      subtitle: 'The finishing touches of your ritual: radiance botanical elixirs, antioxidant sprays, and nourishing nighttime balms.',
      ctaText: 'Explore Routine',
      icon: Sparkles,
      image: ASSETS.heroCampaign,
      featuredProduct: PRODUCTS[4]
    }
  ];

  return (
    <section className="py-24 bg-[#FBF9F5] border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.24em] text-[#8C7A6B] font-semibold block mb-3">
              The Skincare Experience
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1C1917] mb-4">
              Make Time for Your Glow.
            </h2>
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
              Discover skincare essentials for a more intentional daily routine, from cleansing and moisturizing to the finishing touches of your beauty ritual.
            </p>
          </div>

          <button
            onClick={() => navigateToCategory('skincare')}
            className="self-start md:self-auto px-6 py-3.5 bg-[#1C1917] text-[#FBF9F5] text-xs font-medium tracking-widest uppercase rounded-xs hover:bg-[#2C2724] transition-all flex items-center gap-2"
          >
            <span>Shop Skincare</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skincareFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                onClick={() => navigateToProduct(feat.featuredProduct)}
                className="group bg-[#F5F1EA] border border-stone-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Visual Header */}
                <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1C1917] shadow-xs">
                    <Icon className="w-4 h-4 text-[#8A6A4E]" />
                  </div>

                  <span className="absolute bottom-3 left-4 text-xs font-mono uppercase text-white/90 tracking-widest">
                    Step 0{index + 1}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-editorial text-2xl font-medium text-[#1C1917] mb-2.5 group-hover:text-[#8A6A4E] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-[#57534E] font-normal leading-relaxed mb-6">
                      {feat.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                    <span>{feat.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
