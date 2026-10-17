import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    discountCode,
    shipping,
    tax,
    total,
    freeShippingThreshold,
    amountUntilFreeShipping,
    applyDiscountCode,
    removeDiscountCode,
    setIsCheckoutOpen,
    navigateToProduct
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const res = applyDiscountCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1C1917]" />
              <h2 className="text-base font-semibold text-[#1C1917] tracking-tight">
                Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-500 hover:text-black rounded-full hover:bg-stone-200/60 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#F5F1EA] border-b border-stone-200/60">
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-1.5 text-stone-700">
                <Truck className="w-3.5 h-3.5 text-[#8A6A4E]" />
                {amountUntilFreeShipping === 0 ? (
                  <span className="font-medium text-emerald-800">You unlocked complimentary express delivery!</span>
                ) : (
                  <span>Add <strong className="text-stone-900">${amountUntilFreeShipping.toFixed(2)}</strong> more for free express shipping</span>
                )}
              </div>
              <span className="font-mono text-[11px] font-semibold text-stone-600">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-300/70 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1C1917] transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-[#1C1917] mb-1 font-editorial">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#78716C] mb-6 max-w-xs mx-auto">
                  Explore our curated skincare rituals and contemporary fashion pieces to begin your order.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cart.map((item, index) => {
                const itemPrice = item.product.salePrice ?? item.product.price;
                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                    className="flex gap-4 pb-5 border-b border-stone-200/60 last:border-0"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateToProduct(item.product);
                      }}
                      className="w-20 h-24 rounded-lg bg-stone-100 overflow-hidden shrink-0 cursor-pointer border border-stone-200/60"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Info & Quantity */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] font-medium block">
                              {item.product.categoryLabel}
                            </span>
                            <h4
                              onClick={() => {
                                setIsCartOpen(false);
                                navigateToProduct(item.product);
                              }}
                              className="text-xs font-semibold text-[#1C1917] hover:text-[#8A6A4E] transition-colors cursor-pointer line-clamp-1"
                            >
                              {item.product.name}
                            </h4>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                            aria-label="Remove product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Variants display */}
                        {(item.selectedSize || item.selectedColor) && (
                          <div className="text-[11px] text-[#78716C] mt-1 space-x-2">
                            {item.selectedSize && <span>Size: <strong className="text-stone-800">{item.selectedSize}</strong></span>}
                            {item.selectedColor && <span>Color: <strong className="text-stone-800">{item.selectedColor}</strong></span>}
                          </div>
                        )}
                      </div>

                      {/* Stepper & Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-stone-300 rounded-xs bg-white">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                            className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-medium tabular-nums text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                            disabled={item.quantity >= item.product.stock}
                            className="p-1 hover:bg-stone-100 text-stone-600 transition-colors disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-semibold text-[#1C1917] tabular-nums">
                            ${(itemPrice * item.quantity).toFixed(2)}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-stone-400 block tabular-nums">
                              ${itemPrice} each
                            </span>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer with Calculations */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F5F1EA] border-t border-stone-200">
              
              {/* Promo input */}
              <div className="mb-4">
                {discountCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{discountCode}</strong> applied</span>
                    </div>
                    <button
                      onClick={removeDiscountCode}
                      className="text-stone-500 hover:text-stone-800 underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. NAOVA15)"
                      className="flex-1 px-3 py-1.5 bg-[#FBF9F5] border border-stone-300 rounded-xs text-xs focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-stone-800"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>
                )}
              </div>

              {/* Math breakdown */}
              <div className="space-y-1.5 text-xs text-[#57534E] mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1C1917] tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Privilege Discount ({discountCode})</span>
                    <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-[#1C1917] tabular-nums">
                    {shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-medium text-[#1C1917] tabular-nums">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-stone-300 flex justify-between text-sm font-semibold text-[#1C1917]">
                  <span>Total</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#1C1917] text-[#FBF9F5] text-xs font-semibold tracking-widest uppercase rounded-xs hover:bg-[#2C2724] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-stone-500">
                <span>Credit Card</span>
                <span aria-hidden="true">·</span>
                <span>Cash on Delivery (COD)</span>
                <span aria-hidden="true">·</span>
                <span>Encrypted Security</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
