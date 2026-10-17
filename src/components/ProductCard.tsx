import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateToProduct,
    setQuickViewProduct
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors ? product.colors[0].name : undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [isAdding, setIsAdding] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const hasSale = product.salePrice && product.salePrice < product.price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;

    setIsAdding(true);
    addToCart(product, 1, selectedSize, selectedColor);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleCardClick = () => {
    navigateToProduct(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-[#FBF9F5] border border-stone-200/80 rounded-xl overflow-hidden hover:border-stone-400/80 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] bg-[#F5F1EA] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {hasSale && (
            <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#1C1917] text-[#EDE7DC] px-2.5 py-1 rounded-xs shadow-xs">
              Sale
            </span>
          )}
          {product.isNewArrival && (
            <span className="text-[10px] font-semibold tracking-wider uppercase bg-white/90 backdrop-blur-md text-[#1C1917] px-2.5 py-1 rounded-xs shadow-xs">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isFavorited
              ? 'bg-white text-[#C49E9E] shadow-sm'
              : 'bg-white/80 text-stone-600 hover:text-stone-900 hover:bg-white shadow-xs'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button (Desktop Hover) */}
        <div className="absolute inset-x-3 bottom-3 hidden lg:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 bg-white/95 backdrop-blur-md text-[#1C1917] text-xs font-medium tracking-wider uppercase rounded-xs hover:bg-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-stone-500" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Stock Metadata without pill boxes */}
          <div className="flex items-center justify-between text-[11px] text-[#78716C] mb-1.5">
            <span className="uppercase tracking-wider font-medium">{product.categoryLabel}</span>
            <span>
              {isOutOfStock ? (
                <span className="text-stone-400">Sold Out</span>
              ) : product.stock <= 5 ? (
                <span className="text-amber-700 font-medium">Only {product.stock} left</span>
              ) : (
                <span className="text-emerald-700">In Stock</span>
              )}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-[#1C1917] group-hover:text-[#8A6A4E] transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>

          {/* Color swatches preview if applicable */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3" onClick={(e) => e.stopPropagation()}>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor === c.name ? 'ring-1 ring-stone-900 ring-offset-1 border-transparent' : 'border-stone-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
              <span className="text-[10px] text-stone-500 ml-1 truncate max-w-[80px]">
                {selectedColor}
              </span>
            </div>
          )}

          {/* Size options preview if applicable */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-1 mb-3" onClick={(e) => e.stopPropagation()}>
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-1.5 py-0.5 text-[10px] font-medium rounded-xs border transition-colors ${
                    selectedSize === s
                      ? 'bg-[#1C1917] text-white border-[#1C1917]'
                      : 'border-stone-200 text-stone-600 hover:border-stone-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price & Add to Bag */}
        <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between gap-2 mt-2">
          <div className="flex items-baseline gap-2">
            {hasSale ? (
              <>
                <span className="text-sm font-semibold text-[#1C1917] tabular-nums">
                  ${product.salePrice}
                </span>
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold text-[#1C1917] tabular-nums">
                ${product.price}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-all flex items-center gap-1.5 whitespace-nowrap ${
              isOutOfStock
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : isAdding
                ? 'bg-emerald-800 text-white'
                : 'bg-[#1C1917] text-white hover:bg-stone-800 active:scale-95'
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
