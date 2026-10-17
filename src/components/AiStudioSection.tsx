import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ASSETS, PRODUCTS } from '../data/products';
import {
  Sparkles,
  Scan,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Layers,
  Crosshair,
  RefreshCw
} from 'lucide-react';

export const AiStudioSection: React.FC = () => {
  const { addToCart, showToast, isAiActive, navigateToProduct } = useStore();

  const [selectedSkinGoal, setSelectedSkinGoal] = useState<'radiance' | 'barrier' | 'hydration'>('radiance');
  const [selectedStyleVibe, setSelectedStyleVibe] = useState<'tailored' | 'silk' | 'minimalist'>('tailored');
  const [isScanning, setIsScanning] = useState(false);

  // Configuration matrix
  const recommendations = {
    'radiance-tailored': {
      skincare: PRODUCTS[0], // AURA Serum
      fashion: PRODUCTS[1], // Wool Trench
      matchScore: '98.4%',
      insight: 'Active niacinamide & plant squalane elevate morning luminosity, echoing the clean lines of tailored virgin wool.'
    },
    'radiance-silk': {
      skincare: PRODUCTS[0],
      fashion: PRODUCTS[5], // Silk blouse
      matchScore: '97.8%',
      insight: 'Fluid mulberry silk crepe reflects natural skin radiance primed by botanical lipid infusion.'
    },
    'radiance-minimalist': {
      skincare: PRODUCTS[4], // Mist
      fashion: PRODUCTS[7], // Wide leg trouser
      matchScore: '96.2%',
      insight: 'Effortless wide-leg drape paired with midday rosewater rehydration creates a relaxed poise.'
    },
    'barrier-tailored': {
      skincare: PRODUCTS[2], // Barrier creme
      fashion: PRODUCTS[1],
      matchScore: '99.1%',
      insight: 'Cellular lipid protection shields against harsh elements beneath Italian structured outerwear.'
    },
    'barrier-silk': {
      skincare: PRODUCTS[2],
      fashion: PRODUCTS[5],
      matchScore: '96.9%',
      insight: 'Deep hyaluronic cushion base allows delicate silk collars to rest softly without friction.'
    },
    'barrier-minimalist': {
      skincare: PRODUCTS[2],
      fashion: PRODUCTS[3], // Leather tote
      matchScore: '95.5%',
      insight: 'Structured calfskin handbag and barrier cream provide an everyday armor of calm luxury.'
    },
    'hydration-tailored': {
      skincare: PRODUCTS[4],
      fashion: PRODUCTS[1],
      matchScore: '96.7%',
      insight: 'Ultra-fine botanical hydrosol keeps skin plumped beneath crisp lapels throughout long days.'
    },
    'hydration-silk': {
      skincare: PRODUCTS[0],
      fashion: PRODUCTS[5],
      matchScore: '98.6%',
      insight: 'Dual-action cold-pressed lipids harmonize with pure silk fibers for an all-day dewiness.'
    },
    'hydration-minimalist': {
      skincare: PRODUCTS[2],
      fashion: PRODUCTS[7],
      matchScore: '97.4%',
      insight: 'Breathable wool-linen drape complemented by concentrated moisture replenishment.'
    }
  };

  const key = `${selectedSkinGoal}-${selectedStyleVibe}` as keyof typeof recommendations;
  const match = recommendations[key] || recommendations['radiance-tailored'];

  const triggerRescan = (goal: 'radiance' | 'barrier' | 'hydration', style: 'tailored' | 'silk' | 'minimalist') => {
    setSelectedSkinGoal(goal);
    setSelectedStyleVibe(style);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 700);
  };

  const handleAddDuo = () => {
    addToCart(match.skincare, 1);
    addToCart(match.fashion, 1);
    showToast(`Curated AI Duo added to your shopping bag!`, 'success');
  };

  return (
    <section className="relative py-24 bg-[#1C1917] text-[#EDE7DC] border-b border-stone-800 overflow-hidden">
      {/* Background Cinematic Visual with AI Optical Scanline */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.cinematicAtelier}
          alt="NAOVA AI Studio Cinematic Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-25 filter brightness-75 animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1917] via-[#1C1917]/90 to-[#1C1917]/85" />
        
        {/* Active AI Scanline Beam */}
        {isAiActive && (
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent shadow-[0_0_15px_rgba(197,168,128,0.9)] animate-scanline pointer-events-none" />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#C5A880] mb-3">
            <Scan className="w-3.5 h-3.5" />
            <span>NAOVA AI Optical Studio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4 font-editorial">
            Intelligent Beauty. Algorithmic Elegance.
          </h2>

          <p className="text-base text-stone-300 font-light leading-relaxed">
            Experience our active neural curation system: select your skin barrier priority and personal wardrobe style to synthesize a harmonized ritual and garment pairing in real time.
          </p>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Diagnostics Controls (6 Cols) */}
          <div className="lg:col-span-6 bg-stone-900/80 backdrop-blur-xl border border-stone-700/80 rounded-2xl p-6 sm:p-8 space-y-8">
            
            {/* Step 1: Skin Profile */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#C5A880] text-black text-[10px] flex items-center justify-center font-bold">1</span>
                  <span>Target Skin Dermal State</span>
                </span>
                <span className="text-[11px] font-mono text-stone-400">Sensor: Optic Spectral</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'radiance', label: 'Morning Glow', sub: 'Radiance Renewal' },
                  { id: 'barrier', label: 'Lipid Shield', sub: 'Barrier Repair' },
                  { id: 'hydration', label: 'Deep Mist', sub: 'Cellular Moisture' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => triggerRescan(item.id as any, selectedStyleVibe)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedSkinGoal === item.id
                        ? 'border-[#C5A880] bg-[#C5A880]/15 text-white shadow-xs'
                        : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <span className="text-xs font-semibold block text-stone-200">{item.label}</span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Wardrobe Silhouette */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#C5A880] text-black text-[10px] flex items-center justify-center font-bold">2</span>
                  <span>Wardrobe Silhouette Preference</span>
                </span>
                <span className="text-[11px] font-mono text-stone-400">Fabric Tension Matrix</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'tailored', label: 'Architectural', sub: 'Virgin Wool Outerwear' },
                  { id: 'silk', label: 'Mulberry Silk', sub: 'Fluid Crepe Drape' },
                  { id: 'minimalist', label: 'Relaxed Trouser', sub: 'Organic Linen Weave' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => triggerRescan(selectedSkinGoal, item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedStyleVibe === item.id
                        ? 'border-[#C5A880] bg-[#C5A880]/15 text-white shadow-xs'
                        : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <span className="text-xs font-semibold block text-stone-200">{item.label}</span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Telemetry Status Strip */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 font-mono">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-[#C5A880]" />
                <span>AI MATCH SYNTHESIS:</span>
                <strong className="text-emerald-400 font-semibold">{match.matchScore} COMPATIBILITY</strong>
              </div>

              {isScanning && (
                <span className="text-xs text-[#C5A880] flex items-center gap-1.5 animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning...</span>
                </span>
              )}
            </div>

          </div>

          {/* Right Column: AI Synthesized Result Showcase (6 Cols) */}
          <div className="lg:col-span-6 bg-stone-900/90 backdrop-blur-xl border border-stone-700/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
                  Synthesized Duo Recommendation
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-300 text-[11px] font-mono font-semibold">
                  {match.matchScore} Synergy
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed mb-6 italic">
                “{match.insight}”
              </p>

              {/* Recommended Duo Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                
                {/* Skincare item */}
                <div 
                  onClick={() => navigateToProduct(match.skincare)}
                  className="p-3.5 bg-stone-950/80 border border-stone-800 rounded-xl hover:border-stone-600 transition-all cursor-pointer group"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-900 mb-2.5">
                    <img
                      src={match.skincare.images[0]}
                      alt={match.skincare.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-[#C5A880] block font-mono">
                    Ritual Anchor
                  </span>
                  <h4 className="text-xs font-semibold text-white truncate group-hover:text-[#EDE7DC]">
                    {match.skincare.name}
                  </h4>
                  <span className="text-xs text-stone-300 font-semibold tabular-nums mt-1 block">
                    ${match.skincare.salePrice ?? match.skincare.price}
                  </span>
                </div>

                {/* Fashion item */}
                <div 
                  onClick={() => navigateToProduct(match.fashion)}
                  className="p-3.5 bg-stone-950/80 border border-stone-800 rounded-xl hover:border-stone-600 transition-all cursor-pointer group"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-900 mb-2.5">
                    <img
                      src={match.fashion.images[0]}
                      alt={match.fashion.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-[#C5A880] block font-mono">
                    Wardrobe Match
                  </span>
                  <h4 className="text-xs font-semibold text-white truncate group-hover:text-[#EDE7DC]">
                    {match.fashion.name}
                  </h4>
                  <span className="text-xs text-stone-300 font-semibold tabular-nums mt-1 block">
                    ${match.fashion.salePrice ?? match.fashion.price}
                  </span>
                </div>

              </div>
            </div>

            {/* Combined CTA */}
            <div className="pt-4 border-t border-stone-800">
              <button
                onClick={handleAddDuo}
                className="w-full py-3.5 bg-[#EDE7DC] text-[#1C1917] text-xs font-semibold tracking-widest uppercase rounded-xs hover:bg-white active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Synthesized Duo to Bag · ${( (match.skincare.salePrice ?? match.skincare.price) + (match.fashion.salePrice ?? match.fashion.price) ).toFixed(2)}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400 mt-3 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Complimentary Express Priority Shipping Included</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
