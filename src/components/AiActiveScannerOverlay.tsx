import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Eye, EyeOff, Sparkles, Scan, Crosshair, ArrowRight, Play, Pause, Layers } from 'lucide-react';

interface AiActiveScannerOverlayProps {
  sceneTitle?: string;
  className?: string;
}

export const AiActiveScannerOverlay: React.FC<AiActiveScannerOverlayProps> = ({
  sceneTitle = 'Atelier Scene 01',
  className = ''
}) => {
  const {
    isAiActive,
    toggleAiActive,
    isCinematicPlaying,
    toggleCinematicPlaying,
    activeCinematicScene,
    setActiveCinematicScene,
    navigateToProduct,
    setQuickViewProduct
  } = useStore();

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMousePos({ x, y });
  };

  // Optical detection nodes positioned across the campaign image
  const nodes = [
    {
      id: 1,
      top: '24%',
      left: '58%',
      tag: 'AI OPTICAL ANALYSIS: DERMAL MATRIX',
      metric: 'Radiance Index: 96.4%',
      detail: 'Epidermal lipid hydration optimal. High cellular light bounce detected.',
      product: PRODUCTS[0],
      productName: 'AURA Botanical Renewal Serum'
    },
    {
      id: 2,
      top: '46%',
      left: '52%',
      tag: 'AI OPTICAL ANALYSIS: TEXTILE DRAPE',
      metric: 'Double-Faced Wool · Fluidity 9.8',
      detail: 'Structural warp tension engineered for elongated natural silhouette.',
      product: PRODUCTS[1],
      productName: 'Architectural Wool-Blend Trench'
    },
    {
      id: 3,
      top: '72%',
      left: '26%',
      tag: 'AI OPTICAL ANALYSIS: BOTANICAL EXTRACTION',
      metric: 'Lipid Emulsion Stability: 99.2%',
      detail: 'Cold-pressed bioactive plant squalane with zero artificial carriers.',
      product: PRODUCTS[2],
      productName: 'Cellular Hydration Barrier Crème'
    }
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`absolute inset-0 pointer-events-auto z-20 overflow-hidden ${className}`}
    >
      {/* Floating Top Cinematic Controls Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 z-30 pointer-events-auto">
        
        {/* Left: AI Active Status Indicator Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg">
          <div className="relative flex items-center justify-center">
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                isAiActive ? 'bg-[#C5A880] animate-pulse' : 'bg-stone-500'
              }`}
            />
            {isAiActive && (
              <span className="absolute w-4 h-4 rounded-full bg-[#C5A880]/30 animate-pulse-ring pointer-events-none" />
            )}
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
            {isAiActive ? 'AI Vision Active' : 'AI Vision Standby'}
          </span>
          <span className="text-white/30" aria-hidden="true">·</span>
          <span className="text-[10px] font-mono text-[#EDE7DC]/80 hidden sm:inline">
            {sceneTitle}
          </span>
        </div>

        {/* Right: Interactive Toggle Buttons */}
        <div className="flex items-center gap-2">
          
          {/* Scene Switcher buttons */}
          <div className="hidden md:flex items-center p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-medium text-white/80">
            <button
              onClick={() => setActiveCinematicScene(0)}
              className={`px-2.5 py-1 rounded-full transition-all ${
                activeCinematicScene === 0 ? 'bg-white/20 text-white font-semibold' : 'hover:text-white'
              }`}
            >
              Atelier
            </button>
            <button
              onClick={() => setActiveCinematicScene(1)}
              className={`px-2.5 py-1 rounded-full transition-all ${
                activeCinematicScene === 1 ? 'bg-white/20 text-white font-semibold' : 'hover:text-white'
              }`}
            >
              Campaign
            </button>
            <button
              onClick={() => setActiveCinematicScene(2)}
              className={`px-2.5 py-1 rounded-full transition-all ${
                activeCinematicScene === 2 ? 'bg-white/20 text-white font-semibold' : 'hover:text-white'
              }`}
            >
              Lookbook
            </button>
          </div>

          {/* Cinematic Motion Play/Pause */}
          <button
            onClick={toggleCinematicPlaying}
            className="p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 hover:text-white hover:bg-black/80 transition-all shadow-md"
            title={isCinematicPlaying ? 'Pause cinematic camera drift' : 'Play cinematic camera drift'}
            aria-label="Toggle cinematic camera motion"
          >
            {isCinematicPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* AI Active Toggle */}
          <button
            onClick={toggleAiActive}
            className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-[11px] font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-md ${
              isAiActive
                ? 'bg-[#C5A880]/90 text-[#1C1917] border-[#C5A880] font-semibold hover:bg-[#C5A880]'
                : 'bg-black/60 text-white/80 border-white/15 hover:text-white'
            }`}
          >
            {isAiActive ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AI Active [ON]</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline">AI Active [OFF]</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* AI Active Visual Layers */}
      {isAiActive && (
        <>
          {/* Sweeping Luminous Golden Scanline */}
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8D3B9] to-transparent shadow-[0_0_12px_rgba(232,211,185,0.9)] animate-scanline pointer-events-none" />

          {/* Subtle Optical Vignette and Crosshair HUD */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/40 pointer-events-none" />

          {/* Optical Corner Reticles */}
          <div className="absolute top-12 left-6 w-8 h-8 border-t border-l border-[#C5A880]/50 pointer-events-none" />
          <div className="absolute top-12 right-6 w-8 h-8 border-t border-r border-[#C5A880]/50 pointer-events-none" />
          <div className="absolute bottom-12 left-6 w-8 h-8 border-b border-l border-[#C5A880]/50 pointer-events-none" />
          <div className="absolute bottom-12 right-6 w-8 h-8 border-b border-r border-[#C5A880]/50 pointer-events-none" />

          {/* Live Dynamic Coordinate Readout */}
          <div className="absolute bottom-4 left-6 hidden sm:flex items-center gap-3 text-[10px] font-mono text-[#EDE7DC]/70 pointer-events-none">
            <span className="flex items-center gap-1 text-[#C5A880]">
              <Crosshair className="w-3 h-3" />
              <span>SENSOR: ACTIVE</span>
            </span>
            <span>·</span>
            <span>GRID: X-{mousePos.x}% Y-{mousePos.y}%</span>
            <span>·</span>
            <span>OPTICAL SPECTRUM: 580NM</span>
          </div>

          {/* Interactive Optical Diagnostic Nodes */}
          {nodes.map((node) => {
            const isHovered = activeNode === node.id;
            return (
              <div
                key={node.id}
                style={{ top: node.top, left: node.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
              >
                {/* Node Target Button */}
                <button
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  onClick={() => setQuickViewProduct(node.product)}
                  className="group relative flex items-center justify-center p-2 cursor-pointer focus:outline-none"
                  aria-label={`View analysis for ${node.productName}`}
                >
                  {/* Expanding pulse ring */}
                  <span className="absolute w-8 h-8 rounded-full border border-[#C5A880]/60 animate-pulse-ring" />
                  
                  {/* Central Node Core */}
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1C1917] border-2 border-[#C5A880] shadow-[0_0_8px_rgba(197,168,128,0.8)] group-hover:scale-125 transition-transform flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-white" />
                  </span>

                  {/* Node Label preview */}
                  <span className="absolute left-6 whitespace-nowrap bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/10 text-[9px] font-mono uppercase tracking-wider text-[#EDE7DC] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {node.metric}
                  </span>
                </button>

                {/* Expanded Card on Hover or Touch */}
                {isHovered && (
                  <div
                    onMouseEnter={() => setActiveNode(node.id)}
                    onMouseLeave={() => setActiveNode(null)}
                    className="absolute top-8 left-0 -translate-x-1/4 sm:translate-x-0 w-64 sm:w-72 p-3.5 bg-black/90 backdrop-blur-xl border border-[#C5A880]/60 rounded-xl text-white shadow-2xl z-40 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="flex items-center justify-between text-[9px] font-mono text-[#C5A880] uppercase tracking-wider mb-1">
                      <span>{node.tag}</span>
                      <Sparkles className="w-3 h-3" />
                    </div>

                    <h4 className="text-xs font-semibold text-white mb-1">
                      {node.metric}
                    </h4>

                    <p className="text-[11px] text-stone-300 font-light leading-relaxed mb-3">
                      {node.detail}
                    </p>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                      <span className="text-[10px] text-stone-400 truncate max-w-[150px]">
                        {node.productName}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewProduct(node.product);
                        }}
                        className="text-[10px] font-semibold uppercase tracking-wider text-[#C5A880] hover:text-white flex items-center gap-1"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

    </div>
  );
};
