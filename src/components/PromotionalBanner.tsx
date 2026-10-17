import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Tag, Check, Copy, ArrowRight, Sparkles } from 'lucide-react';

export const PromotionalBanner: React.FC = () => {
  const { setCurrentView, applyDiscountCode } = useStore();
  const [copied, setCopied] = useState(false);

  const promoCode = 'NAOVA15';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    applyDiscountCode(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#2B241E] via-[#1C1917] to-[#2B241E] text-[#EDE7DC] py-16 sm:py-20 border-y border-stone-800">
      {/* Background ambient lighting */}
      <div 
        className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#C5A880]/10 blur-3xl"
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-[#C49E9E]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#C5A880] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Seasonal Privilege</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-3 font-editorial">
              A Little Something for Your Next Favorite.
            </h2>
            
            <p className="text-base text-stone-300 font-light leading-relaxed">
              Discover the latest additions to the NAOVA collection. Enjoy 15% off your entire ritual with complimentary priority delivery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            {/* Promo code copy badge */}
            <div className="flex items-center gap-2 px-4 py-3 bg-stone-900/90 border border-stone-700/80 rounded-lg">
              <Tag className="w-4 h-4 text-[#C5A880]" />
              <span className="font-mono text-sm tracking-wider font-semibold text-white">
                {promoCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="ml-2 text-xs text-stone-300 hover:text-white flex items-center gap-1 transition-colors pl-2 border-l border-stone-700"
                title="Copy and apply discount"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Applied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Shop New Arrivals CTA */}
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-3.5 bg-[#EDE7DC] text-[#1C1917] text-xs font-semibold tracking-widest uppercase rounded-xs hover:bg-white active:scale-95 transition-all flex items-center gap-2 shadow-md whitespace-nowrap"
            >
              <span>Shop New Arrivals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
