import React from 'react';
import { useStore } from '../context/StoreContext';
import { ASSETS } from '../data/products';
import { ArrowRight, Feather, HeartHandshake, Sparkles } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  const { setIsAboutOpen } = useStore();

  return (
    <section className="py-24 bg-[#F5F1EA] border-b border-[#EAE4DC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Lifestyle Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-[#EDE7DC]">
              <img
                src={ASSETS.brandStory}
                alt="NAOVA conscious beauty cream and cashmere knit"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 text-white">
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/80 block mb-1">
                  The NAOVA Philosophy
                </span>
                <span className="font-editorial text-lg italic text-white/95">
                  Mindful self-care &amp; enduring wardrobe essentials
                </span>
              </div>
            </div>

            {/* Small decorative accent card */}
            <div className="hidden sm:block absolute -top-6 -right-6 bg-[#FBF9F5] p-5 rounded-xl border border-stone-200/90 shadow-lg max-w-[210px]">
              <span className="text-2xl font-editorial font-normal text-[#8A6A4E] block mb-1">
                100%
              </span>
              <span className="text-xs text-[#57534E] leading-snug block">
                Ethical formulation and mindful Italian fabric sourcing.
              </span>
            </div>
          </div>

          {/* Right Column: Story Copy & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <span className="text-xs uppercase tracking-[0.24em] text-[#8C7A6B] font-semibold block mb-4">
              Our Vision &amp; Heritage
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold tracking-tight text-[#1C1917] leading-tight mb-6">
              Confidence Starts With You.
            </h2>

            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-6 font-normal">
              At NAOVA, beauty and personal style are expressions of who you are. We bring skincare and fashion together in one carefully curated destination, making it easier to build routines, discover new favorites, and express your unique style.
            </p>

            {/* Secondary statement */}
            <div className="p-5 bg-[#FBF9F5] rounded-xl border border-stone-200/70 mb-8">
              <p className="font-editorial text-xl italic text-[#1C1917] leading-snug">
                “Feel good in your skin. Feel confident in your style.”
              </p>
            </div>

            {/* Story Pillars */}
            <div className="grid grid-cols-2 gap-4 mb-8 text-xs text-[#57534E]">
              <div className="flex items-start gap-2.5">
                <Feather className="w-4 h-4 text-[#8A6A4E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#1C1917] mb-0.5">Intentional Formulas</h4>
                  <p>Gentle on skin barriers, clinically conscious.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <HeartHandshake className="w-4 h-4 text-[#8A6A4E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#1C1917] mb-0.5">Enduring Garments</h4>
                  <p>Cut from premium silks, wools, and organic linens.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => setIsAboutOpen(true)}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#1C1917] text-[#FBF9F5] text-xs font-medium tracking-widest uppercase rounded-xs hover:bg-[#2C2724] transition-all group"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
