import React from 'react';
import { useStore } from '../context/StoreContext';
import { TESTIMONIALS, TRUST_PILLARS } from '../data/testimonials';
import { Star, ShieldCheck, Truck, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

export const TestimonialsAndTrust: React.FC = () => {
  const { setIsOrderTrackingOpen, setActivePolicy } = useStore();

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return ShieldCheck;
      case 'Truck': return Truck;
      case 'Sparkles': return Sparkles;
      default: return RefreshCw;
    }
  };

  return (
    <section className="py-24 bg-[#FBF9F5] border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.24em] text-[#8C7A6B] font-semibold block mb-3">
            Client Reflections
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] mb-3">
            The NAOVA Experience
          </h2>
          <p className="text-base text-[#57534E]">
            Authentic impressions from our community of skincare and fashion enthusiasts.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#F5F1EA] border border-stone-200/80 rounded-2xl p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating Stars & Verified Flag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#C5A880]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {t.verified && (
                    <div className="flex items-center gap-1 text-[11px] text-[#78716C]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Buyer</span>
                    </div>
                  )}
                </div>

                {/* Title & Review Text */}
                <h3 className="text-base font-semibold text-[#1C1917] mb-2 font-editorial italic">
                  "{t.title}"
                </h3>
                <p className="text-sm text-[#57534E] leading-relaxed mb-6 font-light">
                  {t.text}
                </p>
              </div>

              {/* Author & Product metadata without pill enclosures */}
              <div className="pt-4 border-t border-stone-200/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-[#1C1917]">
                      {t.author}
                    </h4>
                    <span className="text-[11px] text-[#78716C] block">
                      Purchased {t.productPurchased}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {t.date}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Compact Trust Pillars Strip */}
        <div className="bg-[#EDE7DC]/70 border border-stone-200/90 rounded-2xl p-8 lg:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_PILLARS.map((pillar) => {
              const Icon = getIcon(pillar.iconName);
              return (
                <div key={pillar.title} className="flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-white/80 border border-stone-200/60 flex items-center justify-center text-[#8A6A4E] mb-4 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#1C1917] mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#57534E] leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-300/60 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600">
            <span className="text-[#78716C]">
              Need assistance with an existing order or size recommendation?
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsOrderTrackingOpen(true)}
                className="font-medium text-[#1C1917] underline hover:text-[#8A6A4E]"
              >
                Track Your Shipment
              </button>
              <span className="text-stone-300" aria-hidden="true">·</span>
              <button
                onClick={() => setActivePolicy('shipping')}
                className="font-medium text-[#1C1917] underline hover:text-[#8A6A4E]"
              >
                Delivery Guidelines
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
