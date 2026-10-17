import React from 'react';
import { useStore } from '../context/StoreContext';
import { ASSETS } from '../data/products';
import { X, Sparkles, Feather, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export const AboutModal: React.FC = () => {
  const { isAboutOpen, setIsAboutOpen, setCurrentView } = useStore();

  if (!isAboutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setIsAboutOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="relative w-full max-w-3xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
          
          <button
            onClick={() => setIsAboutOpen(false)}
            className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-black rounded-full bg-white/80 backdrop-blur-md shadow-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Banner */}
          <div className="relative h-64 sm:h-80 overflow-hidden bg-stone-200">
            <img
              src={ASSETS.brandStory}
              alt="NAOVA Atelier Story"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#C5A880] font-semibold block mb-1">
                The Heritage &amp; Vision
              </span>
              <h2 className="text-2xl sm:text-4xl font-semibold font-editorial">
                Confidence Starts With You.
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            <div>
              <h3 className="font-editorial text-xl font-medium text-[#1C1917] mb-3">
                Beauty Meets Style
              </h3>
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed font-light mb-4">
                At NAOVA, beauty and personal style are expressions of who you are. We bring skincare and fashion together in one carefully curated destination, making it easier to build daily rituals, discover lasting wardrobe favorites, and express your unique individuality.
              </p>
              <p className="text-sm text-[#57534E] leading-relaxed font-light">
                Founded with a conviction that luxury should feel effortless and grounded, our cosmetic scientists work in tandem with European master tailors. Every drop of serum and every stitch of wool is engineered with uncompromising attention to longevity and tactile pleasure.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-200">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#F5F1EA] flex items-center justify-center text-[#8A6A4E]">
                  <Feather className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                  Clean &amp; Intentional
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Pure botanical extracts and bio-identical actives without fillers, harsh sulfates, or artificial fragrances.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#F5F1EA] flex items-center justify-center text-[#8A6A4E]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                  Enduring Wardrobe
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Grade 6A silks, virgin Italian wools, and organic linens designed to outlive ephemeral seasonal trends.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#F5F1EA] flex items-center justify-center text-[#8A6A4E]">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                  Mindful Luxury
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  FSC-certified recyclable packaging, Fair-Trade partner workshops, and 100% cruelty-free formulation.
                </p>
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-editorial text-sm italic text-stone-700">
                “Feel good in your skin. Feel confident in your style.”
              </p>
              <button
                onClick={() => {
                  setIsAboutOpen(false);
                  setCurrentView('shop');
                }}
                className="px-6 py-2.5 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#2C2724] transition-colors flex items-center gap-1.5"
              >
                <span>Explore The Shop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
