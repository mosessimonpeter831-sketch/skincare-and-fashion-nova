import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import {
  Heart,
  ShoppingBag,
  Star,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    activeProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
    navigateToCategory,
    setActivePolicy
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    activeProduct?.sizes ? activeProduct.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    activeProduct?.colors ? activeProduct.colors[0].name : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'ritual' | 'reviews'>('details');

  if (!activeProduct) return null;

  const product = activeProduct;
  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const itemPrice = product.salePrice ?? product.price;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div className="bg-[#FBF9F5] min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#78716C] mb-8">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#1C1917] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => navigateToCategory(product.category)}
            className="hover:text-[#1C1917] transition-colors capitalize"
          >
            {product.categoryLabel}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1C1917] font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Contiguous Purchase Module Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Gallery (7 Cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Primary Main Image Frame */}
            <div className="relative aspect-[4/5] bg-[#F5F1EA] rounded-2xl overflow-hidden border border-stone-200/80 shadow-md">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {product.salePrice && (
                <span className="absolute top-4 left-4 bg-[#1C1917] text-[#EDE7DC] px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-xs">
                  Privilege Offer
                </span>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                  isFavorited
                    ? 'bg-white text-[#C49E9E] shadow-md'
                    : 'bg-white/80 text-stone-700 hover:bg-white shadow-xs'
                }`}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#1C1917] shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100 bg-[#F5F1EA]'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} preview ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Assurance Strip */}
            <div className="mt-6 p-5 bg-[#F5F1EA] rounded-xl border border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#57534E]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#8A6A4E] shrink-0" />
                <span>Complimentary Delivery &gt; $120</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#8A6A4E] shrink-0" />
                <span>30-Day Hassle-Free Returns</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#8A6A4E] shrink-0" />
                <span>Authentic NAOVA Craftsmanship</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (5 Cols, Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-[#FBF9F5] p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm">
              
              {/* Category & Ratings */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#8C7A6B] font-semibold">
                  {product.categoryLabel}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-stone-700">
                  <div className="flex items-center text-[#C5A880]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1C1917] mb-3 font-editorial">
                {product.name}
              </h1>

              {/* Price & Stock status */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-stone-200">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-bold text-[#1C1917] tabular-nums">
                      ${product.salePrice}
                    </span>
                    <span className="text-base text-stone-400 line-through tabular-nums">
                      ${product.price}
                    </span>
                    <span className="text-xs font-semibold uppercase text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-xs">
                      Save ${(product.price - product.salePrice).toFixed(0)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl sm:text-3xl font-bold text-[#1C1917] tabular-nums">
                    ${product.price}
                  </span>
                )}

                <div className="ml-auto text-xs font-medium">
                  {isOutOfStock ? (
                    <span className="text-stone-400">Currently Sold Out</span>
                  ) : product.stock <= 5 ? (
                    <span className="text-amber-800 font-semibold">Only {product.stock} left in stock</span>
                  ) : (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      In Stock &amp; Ready to Ship
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#57534E] leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-medium text-stone-800 mb-2.5">
                    <span>Selected Shade / Color</span>
                    <span className="text-stone-500">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border transition-all ${
                          selectedColor === c.name
                            ? 'ring-2 ring-stone-900 ring-offset-2 border-transparent shadow-xs'
                            : 'border-stone-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                        aria-label={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-medium text-stone-800 mb-2.5">
                    <span>Select Size</span>
                    <button
                      onClick={() => setActivePolicy('shipping')}
                      className="text-stone-500 hover:text-black underline text-[11px]"
                    >
                      Sizing Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-2 text-xs font-semibold rounded-xs border transition-all text-center ${
                          selectedSize === s
                            ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-xs'
                            : 'border-stone-300 text-stone-700 hover:border-stone-600 bg-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag */}
              <div className="flex items-center gap-3 pt-2 mb-6">
                <div className="flex items-center border border-stone-300 rounded-xs bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-3 text-stone-600 hover:bg-stone-100 disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-semibold tabular-nums text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="p-3 text-stone-600 hover:bg-stone-100 disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 py-3.5 px-6 text-xs font-semibold uppercase tracking-widest rounded-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer ${
                    isOutOfStock
                      ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      : isAdded
                      ? 'bg-emerald-800 text-white'
                      : 'bg-[#1C1917] text-[#FBF9F5] hover:bg-[#2F2925]'
                  }`}
                >
                  {isOutOfStock ? (
                    <span>Sold Out</span>
                  ) : isAdded ? (
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
              </div>

              {/* Cash On Delivery & Fast Shipping Notice */}
              <div className="p-4 bg-[#F5F1EA] rounded-xl border border-stone-200/80 text-xs text-[#57534E] space-y-2">
                <div className="flex items-center justify-between text-stone-800 font-medium">
                  <span>Available Checkout Options</span>
                  <span className="text-[#8A6A4E]">Cash on Delivery Available</span>
                </div>
                <p className="text-[11px] leading-relaxed text-stone-500">
                  Orders placed by 2:00 PM EST ship same day in our signature ivory luxury packaging.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Detailed Tabs: Specifications, Ritual/Care & Customer Reviews */}
        <div className="mt-16 pt-10 border-t border-stone-200">
          <div className="flex border-b border-stone-300 gap-8 mb-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-4 text-sm font-semibold tracking-wide uppercase transition-colors relative ${
                activeTab === 'details'
                  ? 'text-[#1C1917] border-b-2 border-[#1C1917]'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Details &amp; Ingredients
            </button>
            <button
              onClick={() => setActiveTab('ritual')}
              className={`pb-4 text-sm font-semibold tracking-wide uppercase transition-colors relative ${
                activeTab === 'ritual'
                  ? 'text-[#1C1917] border-b-2 border-[#1C1917]'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Ritual &amp; Garment Care
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-semibold tracking-wide uppercase transition-colors relative ${
                activeTab === 'reviews'
                  ? 'text-[#1C1917] border-b-2 border-[#1C1917]'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Client Reviews ({product.reviewsCount})
            </button>
          </div>

          <div className="bg-[#F5F1EA] p-8 rounded-2xl border border-stone-200/80">
            {activeTab === 'details' && (
              <div className="max-w-3xl">
                <h3 className="text-lg font-semibold text-[#1C1917] mb-4 font-editorial">
                  Artisanal Craftsmanship &amp; Formulation
                </h3>
                <ul className="space-y-3 text-sm text-[#57534E]">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A6A4E] shrink-0 mt-2" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'ritual' && (
              <div className="max-w-3xl">
                <h3 className="text-lg font-semibold text-[#1C1917] mb-4 font-editorial">
                  Recommended Ritual &amp; Maintenance
                </h3>
                <p className="text-sm text-[#57534E] leading-relaxed mb-4">
                  {product.ritualOrCare}
                </p>
                <div className="p-4 bg-[#FBF9F5] rounded-xl border border-stone-200/60 text-xs text-stone-600">
                  <span className="font-semibold text-stone-900 block mb-1">Authenticity &amp; Integrity</span>
                  All NAOVA items are rigorously tested in certified laboratories and tailored according to ethical Fair-Trade guidelines.
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl font-bold text-[#1C1917] font-editorial">{product.rating}</span>
                      <div className="flex items-center text-[#C5A880]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-stone-500">Based on {product.reviewsCount} verified purchase reviews</span>
                  </div>

                  <button
                    onClick={() => setActivePolicy('faq')}
                    className="px-4 py-2 border border-stone-400 text-xs font-semibold uppercase tracking-wider text-stone-800 rounded-xs hover:bg-stone-200"
                  >
                    Review Guidelines
                  </button>
                </div>

                {/* Sample product reviews */}
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-stone-200/80">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-[#1C1917]">Isabella M. · Verified Client</span>
                      <span className="text-stone-400">2 weeks ago</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#C5A880] mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#57534E] leading-relaxed">
                      Beyond exceeded expectations. The packaging arrived immaculate, and the product itself feels like an indulgence every time I use it.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-stone-200/80">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-[#1C1917]">Claire R. · Verified Client</span>
                      <span className="text-stone-400">1 month ago</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#C5A880] mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#57534E] leading-relaxed">
                      The attention to detail in the seams and formulation is what sets NAOVA apart. This is a brand with true conviction in quality.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-stone-200">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-[0.22em] text-[#8C7A6B] font-semibold block mb-2">
                Complete Your Look &amp; Ritual
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1C1917]">
                Related NAOVA Essentials
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
