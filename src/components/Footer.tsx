import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, navigateToCategory, setIsAboutOpen, setActivePolicy } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1917] text-[#EDE7DC] pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          
          {/* Column 1: Brand Wordmark & Ethos (4 cols) */}
          <div className="lg:col-span-4">
            <div className="flex flex-col mb-4">
              <span className="font-editorial text-3xl font-semibold tracking-wider text-white">
                NAOVA
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#C5A880] font-medium mt-1">
                Skincare &amp; Fashion
              </span>
            </div>
            
            <p className="font-editorial text-lg italic text-[#EDE7DC]/90 mb-6 max-w-sm">
              “Beauty in your ritual. Confidence in your style.”
            </p>

            <p className="text-xs text-stone-400 leading-relaxed mb-6 max-w-sm font-light">
              Elevating daily care through intentional, conscious skincare and timeless tailored apparel designed for effortless self-expression.
            </p>

            <div className="flex items-center gap-4 text-xs text-stone-300">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <span className="text-stone-700" aria-hidden="true">·</span>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                TikTok
              </a>
              <span className="text-stone-700" aria-hidden="true">·</span>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Pinterest
              </a>
              <span className="text-stone-700" aria-hidden="true">·</span>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] mb-5">
              Explore Collections
            </h4>
            <ul className="space-y-3 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('shop');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateToCategory('skincare');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Skincare Essentials
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateToCategory('fashion');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Fashion &amp; Outerwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateToCategory('lifestyle');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Beauty &amp; Lifestyle Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsAboutOpen(true);
                  }}
                  className="hover:text-white transition-colors"
                >
                  About NAOVA
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Care & Policies (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] mb-5">
              Client Care &amp; Trust
            </h4>
            <ul className="space-y-3 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => setActivePolicy('shipping')}
                  className="hover:text-white transition-colors"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicy('returns')}
                  className="hover:text-white transition-colors"
                >
                  Returns &amp; Refunds
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicy('privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicy('terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicy('faq')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Concierge (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] mb-5">
              Atelier Concierge
            </h4>
            <div className="space-y-3 text-xs text-stone-400 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>Madison Ave Atelier, New York, NY 10022</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-stone-500 shrink-0" />
                <span>concierge@naova.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                <span>+1 (800) 842-6268</span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-stone-800">
              <span className="text-[11px] text-stone-400 block mb-2 font-medium">
                Payment Options
              </span>
              <div className="flex flex-wrap items-center gap-2 text-[10px] text-stone-400">
                <span className="px-2 py-1 rounded-xs bg-stone-900 border border-stone-800">Visa</span>
                <span className="px-2 py-1 rounded-xs bg-stone-900 border border-stone-800">Mastercard</span>
                <span className="px-2 py-1 rounded-xs bg-stone-900 border border-stone-800">Amex</span>
                <span className="px-2 py-1 rounded-xs bg-stone-900 border border-stone-800">Apple Pay</span>
                <span className="px-2 py-1 rounded-xs bg-stone-900 border border-stone-800 text-[#C5A880]">Cash on Delivery</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} NAOVA Skincare &amp; Fashion Inc. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
