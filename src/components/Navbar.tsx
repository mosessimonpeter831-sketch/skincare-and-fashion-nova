import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, ShoppingBag, Heart, Package, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    currentView,
    setCurrentView,
    navigateToCategory,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsOrderTrackingOpen,
    setIsAboutOpen,
    isAiActive,
    toggleAiActive
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'shop' | 'skincare' | 'fashion' | 'about') => {
    setMobileMenuOpen(false);
    if (view === 'about') {
      setIsAboutOpen(true);
    } else if (view === 'skincare' || view === 'fashion') {
      navigateToCategory(view);
    } else {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Bar Announcement / Promotion strip */}
      <div className="bg-[#1C1917] text-[#EDE7DC] px-4 py-2 text-xs font-medium text-center tracking-wide flex items-center justify-center gap-2">
        <span>Complimentary express delivery on orders over $120</span>
        <span className="opacity-40" aria-hidden="true">·</span>
        <span className="text-[#C5A880] font-semibold">Use code NAOVA15 for 15% off</span>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FBF9F5]/95 backdrop-blur-md shadow-xs border-b border-[#E7E2D8] py-3.5'
            : 'bg-[#FBF9F5]/80 backdrop-blur-xs border-b border-stone-200/40 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 lg:gap-8">
            
            {/* Zone 1: Brand Wordmark & Subtitle */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left group transition-opacity"
              >
                <div className="flex flex-col">
                  <span className="font-editorial text-2xl lg:text-3xl font-semibold tracking-wider text-[#1C1917] leading-none">
                    NAOVA
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#78716C] font-medium mt-1">
                    Skincare &amp; Fashion
                  </span>
                </div>
              </button>
            </div>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-[#44403C]">
              <button
                onClick={() => handleNavClick('home')}
                className={`transition-colors whitespace-nowrap hover:text-[#1C1917] ${
                  currentView === 'home' ? 'text-[#1C1917] font-semibold border-b border-[#1C1917] pb-0.5' : ''
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop')}
                className={`transition-colors whitespace-nowrap hover:text-[#1C1917] ${
                  currentView === 'shop' ? 'text-[#1C1917] font-semibold border-b border-[#1C1917] pb-0.5' : ''
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => handleNavClick('skincare')}
                className="transition-colors whitespace-nowrap hover:text-[#1C1917]"
              >
                Skincare
              </button>
              <button
                onClick={() => handleNavClick('fashion')}
                className="transition-colors whitespace-nowrap hover:text-[#1C1917]"
              >
                Fashion
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="transition-colors whitespace-nowrap hover:text-[#1C1917]"
              >
                About Us
              </button>
            </nav>

            {/* Zone 3: Actions & Shopping CTA */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#44403C] hover:text-[#1C1917] transition-colors rounded-full hover:bg-stone-200/50"
                aria-label="Search collection"
                title="Search collection"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Order Tracking / Account Icon */}
              <button
                onClick={() => setIsOrderTrackingOpen(true)}
                className="p-2 text-[#44403C] hover:text-[#1C1917] transition-colors rounded-full hover:bg-stone-200/50 hidden sm:flex items-center gap-1.5 text-xs font-medium"
                aria-label="Track your order"
                title="Track your order"
              >
                <Package className="w-5 h-5" />
                <span className="hidden xl:inline text-[#78716C]">Orders</span>
              </button>

              {/* AI Active Vision Toggle */}
              <button
                onClick={toggleAiActive}
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[11px] font-mono tracking-wider transition-all ${
                  isAiActive
                    ? 'bg-[#1C1917] text-[#EDE7DC] border-[#8A6A4E] shadow-xs'
                    : 'bg-stone-100 text-stone-500 border-stone-300 hover:text-stone-800'
                }`}
                title={isAiActive ? 'AI Vision active: Optical scanning enabled' : 'AI Vision paused'}
                aria-label="Toggle AI Active Vision"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isAiActive ? 'bg-[#C5A880] animate-pulse' : 'bg-stone-400'
                  }`}
                />
                <span className="font-semibold">{isAiActive ? 'AI ACTIVE' : 'AI STANDBY'}</span>
              </button>

              {/* Wishlist Icon with count */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="p-2 text-[#44403C] hover:text-[#1C1917] transition-colors rounded-full hover:bg-stone-200/50 relative hidden sm:block"
                aria-label="Saved items"
                title="Saved items"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C49E9E] text-white text-[10px] font-semibold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Icon with live count */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-[#1C1917] hover:text-black transition-colors rounded-full hover:bg-stone-200/50 relative"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#1C1917] text-[#FBF9F5] text-[11px] font-bold flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Shop Collection CTA Button */}
              <button
                onClick={() => handleNavClick('shop')}
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-[#1C1917] text-[#FBF9F5] text-xs font-medium tracking-wider uppercase rounded-xs hover:bg-[#2C2724] active:scale-[0.98] transition-all whitespace-nowrap shadow-xs"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#1C1917] rounded-md hover:bg-stone-200/60"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-[#FBF9F5] animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between p-5 border-b border-stone-200">
            <div className="flex flex-col">
              <span className="font-editorial text-2xl font-semibold tracking-wider text-[#1C1917]">
                NAOVA
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#78716C]">
                Skincare &amp; Fashion
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-stone-700 hover:text-black"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
            <div className="flex flex-col space-y-4 text-lg font-medium text-[#1C1917]">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left py-2 border-b border-stone-200/60"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop')}
                className="text-left py-2 border-b border-stone-200/60 flex items-center justify-between"
              >
                <span>Full Collection</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>
              <button
                onClick={() => handleNavClick('skincare')}
                className="text-left py-2 border-b border-stone-200/60 flex items-center justify-between"
              >
                <span>Skincare Essentials</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>
              <button
                onClick={() => handleNavClick('fashion')}
                className="text-left py-2 border-b border-stone-200/60 flex items-center justify-between"
              >
                <span>Fashion &amp; Apparel</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="text-left py-2 border-b border-stone-200/60"
              >
                About Our Story
              </button>
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsOrderTrackingOpen(true);
                }}
                className="w-full flex items-center justify-between px-4 py-3 bg-stone-100 rounded-lg text-sm text-[#1C1917] font-medium"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-stone-600" />
                  <span>Track Existing Order</span>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsWishlistOpen(true);
                }}
                className="w-full flex items-center justify-between px-4 py-3 bg-stone-100 rounded-lg text-sm text-[#1C1917] font-medium"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-[#C49E9E]" />
                  <span>Saved Wishlist ({wishlist.length})</span>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>
          </div>

          <div className="p-6 border-t border-stone-200 bg-[#F5F1EA]">
            <button
              onClick={() => handleNavClick('shop')}
              className="w-full py-3.5 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-widest rounded-xs flex items-center justify-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
