import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ASSETS, PRODUCTS } from '../data/products';
import { AiActiveScannerOverlay } from './AiActiveScannerOverlay';
import { ArrowRight, Sparkles, ShieldCheck, Maximize2, Minimize2, Clapperboard, Compass } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    setCurrentView,
    navigateToCategory,
    navigateToProduct,
    setIsAboutOpen,
    isAiActive,
    isCinematicPlaying,
    activeCinematicScene,
    setActiveCinematicScene
  } = useStore();

  const [isCinematicFullscreen, setIsCinematicFullscreen] = useState(false);

  const scenes = [
    {
      title: 'Scene 01: The Madison Atelier',
      subtitle: 'Natural architectural illumination & cosmetic glass vessels',
      image: ASSETS.cinematicAtelier,
      tag: 'Atelier Architecture'
    },
    {
      title: 'Scene 02: Travertine Campaign',
      subtitle: 'Minimalist linen tailoring alongside botanical elixirs',
      image: ASSETS.heroCampaign,
      tag: 'Campaign Oasis'
    },
    {
      title: 'Scene 03: Sartorial Lookbook',
      subtitle: 'Double-faced virgin wool & pure mulberry silk draping',
      image: ASSETS.fashionEditorial,
      tag: 'Fashion Lookbook'
    }
  ];

  const currentScene = scenes[activeCinematicScene] || scenes[0];
  const featuredSerum = PRODUCTS[0];

  return (
    <section className="relative overflow-hidden bg-[#FBF9F5] border-b border-[#EAE4DC] pt-6 pb-16 lg:pt-10 lg:pb-24">
      {/* Soft atmospheric ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#EDE5D8]/60 via-[#E4D7C5]/30 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#F1E8DC]/50 via-[#F7F2EC]/20 to-transparent blur-2xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Subtle Cinematic Top Status Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 py-2 px-4 rounded-xl bg-[#F5F1EA]/80 border border-stone-200/70 text-xs">
          <div className="flex items-center gap-2.5">
            <Clapperboard className="w-4 h-4 text-[#8A6A4E]" />
            <span className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
              Cinematic Atelier Experience
            </span>
            <span className="text-stone-300" aria-hidden="true">·</span>
            <span className="text-stone-500 font-light hidden sm:inline">
              35mm Anamorphic Vision with Real-Time AI Optical Surface Analysis
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-600">
              <span className={`w-2 h-2 rounded-full ${isAiActive ? 'bg-[#8A6A4E] animate-pulse' : 'bg-stone-400'}`} />
              <span className="uppercase">{isAiActive ? 'AI Scan: Active' : 'AI Scan: Idle'}</span>
            </div>

            <button
              onClick={() => setIsCinematicFullscreen(!isCinematicFullscreen)}
              className="p-1 text-stone-600 hover:text-stone-900 transition-colors"
              title={isCinematicFullscreen ? 'Exit cinema mode' : 'Expand full cinema theater'}
            >
              {isCinematicFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dynamic Grid: If cinema theater mode expanded, shows full-width banner */}
        <div className={`grid grid-cols-1 ${isCinematicFullscreen ? 'gap-8' : 'lg:grid-cols-12 gap-12 lg:gap-8'} items-center`}>
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className={`${isCinematicFullscreen ? 'max-w-3xl mx-auto text-center' : 'lg:col-span-6'} flex flex-col justify-center`}>
            
            {/* Small badge/kicker */}
            <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#8C7A6B] mb-4 ${isCinematicFullscreen ? 'justify-center' : ''}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" aria-hidden="true" />
              <span>Discover The NAOVA Experience</span>
            </div>

            {/* Main Headline with editorial serif contrast */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-[#1C1917] leading-[1.12] mb-6">
              Your Beauty. <br />
              Your Style. <br />
              <span className="font-editorial italic font-normal text-[#8A6A4E] decoration-[#C5A880]/40 underline decoration-1 underline-offset-8">
                Your NAOVA.
              </span>
            </h1>

            {/* Supporting paragraph */}
            <p className="text-base sm:text-lg text-[#57534E] font-normal leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Elevate your everyday ritual with thoughtfully curated skincare and contemporary fashion designed to help you look good, feel confident, and express your individuality.
            </p>

            {/* Action buttons */}
            <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 ${isCinematicFullscreen ? 'justify-center' : ''}`}>
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

            {/* Clean Trust Indicators */}
            <div className={`pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-6 text-xs text-[#78716C] ${isCinematicFullscreen ? 'justify-center' : ''}`}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Dermatologist Tested</span>
              </div>
              <span className="text-stone-300" aria-hidden="true">·</span>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                <span>AI Optical Texture Analysis</span>
              </div>
              <span className="text-stone-300" aria-hidden="true">·</span>
              <span>Ethical Virgin Fabrics</span>
            </div>
          </div>

          {/* Right Column: Cinematic Video-Still Showcase with AI Active Overlay */}
          <div className={`${isCinematicFullscreen ? 'w-full' : 'lg:col-span-6'} relative`}>
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Cinematic Visual Frame */}
              <div className="relative aspect-[16/10] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-stone-900/15 bg-[#1C1917] border border-stone-300/80">
                
                {/* Background Image with slow cinematic Ken Burns zoom */}
                <img
                  key={currentScene.image}
                  src={currentScene.image}
                  alt={currentScene.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-center transition-all duration-1000 ${
                    isCinematicPlaying ? 'animate-kenburns' : ''
                  }`}
                />

                {/* Film grain layer */}
                <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />

                {/* Cinematic Ambient Dark Vignette Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                {/* AI Active Optical Scanner Layer */}
                <AiActiveScannerOverlay sceneTitle={currentScene.tag} />

                {/* Bottom Cinematic Scene Caption */}
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white z-20 pointer-events-none">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#C5A880] block">
                      {currentScene.title}
                    </span>
                    <p className="text-xs text-stone-200 font-light truncate max-w-sm">
                      {currentScene.subtitle}
                    </p>
                  </div>
                  
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-sm bg-black/60 backdrop-blur-md border border-white/10 uppercase tracking-widest text-stone-300 hidden sm:inline">
                    24 FPS · UHD
                  </span>
                </div>
              </div>

              {/* Floating Product Card */}
              {!isCinematicFullscreen && (
                <div 
                  onClick={() => navigateToProduct(featuredSerum)}
                  className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:left-4 bg-[#FBF9F5]/95 backdrop-blur-md border border-stone-300/90 rounded-xl p-3.5 sm:p-4 shadow-xl max-w-[250px] sm:max-w-[280px] cursor-pointer hover:border-stone-500 transition-all group z-30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200/80">
                      <img
                        src={ASSETS.skincareBottle}
                        alt={featuredSerum.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] text-[#8C7A6B] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A6A4E] animate-pulse" />
                        <span>AI Match · 98%</span>
                      </div>
                      <h4 className="text-xs font-semibold text-[#1C1917] truncate group-hover:text-[#8A6A4E] transition-colors">
                        {featuredSerum.name}
                      </h4>
                      <span className="text-xs font-semibold text-stone-900">
                        ${featuredSerum.salePrice ?? featuredSerum.price}
                      </span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
