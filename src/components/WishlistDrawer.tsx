import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    navigateToProduct
  } = useStore();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C49E9E] fill-current" />
              <h2 className="text-base font-semibold text-[#1C1917] tracking-tight">
                Saved Wishlist ({savedProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-stone-500 hover:text-black rounded-full hover:bg-stone-200/60"
              aria-label="Close wishlist drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
                  <Heart className="w-8 h-8 text-stone-300" />
                </div>
                <h3 className="text-base font-semibold text-[#1C1917] mb-1 font-editorial">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#78716C] mb-6 max-w-xs mx-auto">
                  Click the heart icon on any product to save items you admire for future rituals.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white border border-stone-200/80 rounded-xl"
                >
                  <div
                    onClick={() => {
                      setIsWishlistOpen(false);
                      navigateToProduct(product);
                    }}
                    className="w-20 h-24 rounded-lg bg-stone-100 overflow-hidden shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] font-medium block">
                          {product.categoryLabel}
                        </span>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          setIsWishlistOpen(false);
                          navigateToProduct(product);
                        }}
                        className="text-xs font-semibold text-[#1C1917] hover:text-[#8A6A4E] transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h4>

                      <div className="mt-1">
                        <span className="text-xs font-semibold text-[#1C1917] tabular-nums">
                          ${product.salePrice ?? product.price}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product, 1);
                      }}
                      className="mt-2 w-full py-2 bg-[#1C1917] text-white text-[11px] font-medium uppercase tracking-wider rounded-xs hover:bg-stone-800 flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 bg-[#F5F1EA] border-t border-stone-200">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-full py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-medium uppercase tracking-wider rounded-xs transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
