import React from 'react';
import { useStore } from '../context/StoreContext';
import { ASSETS, PRODUCTS } from '../data/products';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentView, navigateToCategory, navigateToProduct, setIsAboutOpen } = useStore();

  const featuredSerum = PRODUCTS[0];

  return (
    <section className="relative overflow-hidden bg-[#FBF9F5] border-b border-[#EAE4DC] pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Soft atmospheric gradient accents */}
      <div 
        className="pointer-events-none absolute -top-40 right-0 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#EDE5D8]/50 via-[#E4D7C5]/30 to-transparent blur-3xl" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute top-1/2 -left-32 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#F1E8DC]/40 via-[#F7F2EC]/20 to-transparent blur-2xl" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center max-w-xl">
            
            {/* Small badge/kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#8C7A6B] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" aria-hidden="true" />
              <span>Discover The NAOVA Experience</span>
            </div>

            {/* Main Headline with editorial serif contrast */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight text-[#1C1917] leading-[1.12] mb-6">
              Your Beauty. <br />
              Your Style. <br />
              <span className="font-editorial italic font-normal text-[#8A6A4E] decoration-[#C5A880]/30 underline decoration-1 underline-offset-8">
                Your NAOVA.
              </span>
            </h1>

            {/* Supporting paragraph */}
            <p className="text-base sm:text-lg text-[#57534E] font-normal leading-relaxed mb-8 max-w-lg">
              Elevate your everyday ritual with thoughtfully curated skincare and contemporary fashion designed to help you look good, feel confident, and express your individuality.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={() => {
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-[#1C1917] text-[#FBF9F5] text-xs font-medium tracking-widest uppercase rounded-xs hover:bg-[#2F2925] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 shadow-md shadow-stone-900/10 group cursor-pointer"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setIsAboutOpen(true)}
                className="px-6 py-3.5 bg-transparent hover:bg-stone-100 text-[#292524] text-xs font-medium tracking-wider uppercase rounded-xs border border-stone-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Our Story</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
              </button>
            </div>

            {/* Clean Trust Indicators without pill enclosures */}
            <div className="pt-6 border-t border-stone-200/80 flex items-center gap-6 text-xs text-[#78716C]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Dermatologist Tested</span>
              </div>
              <span className="text-stone-300" aria-hidden="true">·</span>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                <span>Ethically Tailored</span>
              </div>
              <span className="text-stone-300" aria-hidden="true">·</span>
              <span>100% Cruelty Free</span>
            </div>
          </div>

          {/* Right Column: Editorial Photography Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Campaign Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl shadow-stone-900/10 bg-[#EDE7DC] border border-stone-200/70">
                <img
                  src={ASSETS.heroCampaign}
                  alt="NAOVA luxury beauty model in tailored beige blazer with skincare bottles on travertine stone"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                />

                {/* Editorial Scrim Overlay & Label */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

                {/* Editorial Tag badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold text-[#1C1917] shadow-xs">
                  Beauty Meets Style
                </div>

                {/* Quick Collection Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/95">
                  <div className="text-xs tracking-wider uppercase font-medium">
                    Spring / Summer Edit
                  </div>
                  <button
                    onClick={() => navigateToCategory('skincare')}
                    className="text-xs text-stone-200 hover:text-white underline underline-offset-4 flex items-center gap-1 font-light"
                  >
                    <span>View Rituals</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Small Floating Product Card for Added Dimension */}
              <div 
                onClick={() => navigateToProduct(featuredSerum)}
                className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:left-4 bg-[#FBF9F5] border border-stone-200/90 rounded-xl p-3 sm:p-4 shadow-xl shadow-stone-900/10 max-w-[240px] sm:max-w-[270px] cursor-pointer hover:border-stone-400 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200/60">
                    <img
                      src={ASSETS.skincareBottle}
                      alt={featuredSerum.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] font-medium block truncate">
                      Editor's Pick
                    </span>
                    <h4 className="text-xs font-semibold text-[#1C1917] truncate group-hover:text-[#8A6A4E] transition-colors">
                      {featuredSerum.name}
                    </h4>
                    <span className="text-xs font-medium text-stone-800">
                      ${featuredSerum.salePrice ?? featuredSerum.price}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
