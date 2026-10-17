import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Plus, Minus, Star, Check } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateToProduct
  } = useStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const activeColor = selectedColor || (product.colors ? product.colors[0].name : undefined);
  const activeSize = selectedSize || (product.sizes ? product.sizes[0] : undefined);
  const itemPrice = product.salePrice ?? product.price;

  const handleAdd = () => {
    addToCart(product, quantity, activeSize, activeColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-3xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
          
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-black rounded-full bg-white/80 backdrop-blur-md shadow-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Gallery Column */}
            <div className="p-6 bg-[#F5F1EA] flex flex-col justify-between">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-stone-200 mb-4 border border-stone-300/60">
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-14 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-[#1C1917]' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Preview ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#8C7A6B] font-semibold">
                    {product.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-stone-600">
                    <Star className="w-3.5 h-3.5 text-[#C5A880] fill-current" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-stone-400">({product.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-[#1C1917] mb-2 font-editorial">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-3 mb-4">
                  {product.salePrice ? (
                    <>
                      <span className="text-xl font-bold text-[#1C1917] tabular-nums">
                        ${product.salePrice}
                      </span>
                      <span className="text-sm text-stone-400 line-through tabular-nums">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-[#1C1917] tabular-nums">
                      ${product.price}
                    </span>
                  )}
                  <span className="text-xs text-emerald-700 font-medium">
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6 font-light">
                  {product.description}
                </p>

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-stone-700 block mb-2">
                      Color: <span className="font-normal text-stone-500">{activeColor}</span>
                    </span>
                    <div className="flex gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-6 h-6 rounded-full border transition-all ${
                            activeColor === c.name ? 'ring-2 ring-stone-900 ring-offset-2' : 'border-stone-300'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <span className="text-xs font-semibold text-stone-700 block mb-2">
                      Select Size:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-xs border transition-colors ${
                            activeSize === s
                              ? 'bg-[#1C1917] text-white border-[#1C1917]'
                              : 'border-stone-300 text-stone-700 hover:border-stone-500'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Stepper & Action buttons */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center border border-stone-300 rounded-xs bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-stone-600 hover:bg-stone-100"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-semibold tabular-nums">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 text-stone-600 hover:bg-stone-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    disabled={isAdded || product.stock <= 0}
                    className={`flex-1 py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-all ${
                      isAdded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#1C1917] text-white hover:bg-stone-800'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag · ${(itemPrice * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-xs border transition-colors ${
                      isFavorited
                        ? 'border-rose-300 text-rose-600 bg-rose-50'
                        : 'border-stone-300 text-stone-700 hover:bg-stone-100'
                    }`}
                    title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setQuickViewProduct(null);
                    navigateToProduct(product);
                  }}
                  className="w-full text-center text-xs text-stone-600 hover:text-black underline underline-offset-4"
                >
                  View complete product specifications &amp; rituals →
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
