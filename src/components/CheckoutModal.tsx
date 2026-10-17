import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  CreditCard,
  Banknote,
  ShieldCheck,
  Truck,
  ArrowRight,
  AlertCircle,
  Lock,
  CheckCircle2
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    discountCode,
    shipping,
    tax,
    total,
    isCheckoutOpen,
    setIsCheckoutOpen,
    createOrder,
    showToast
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'cod'>('credit_card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Customer contact state
  const [fullName, setFullName] = useState('Camille Laurent');
  const [email, setEmail] = useState('camille.l@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-8971');
  const [address, setAddress] = useState('450 Park Avenue, Apt 14B');
  const [city, setCity] = useState('New York');
  const [state, setState] = useState('NY');
  const [postalCode, setPostalCode] = useState('10022');
  const [country, setCountry] = useState('United States');
  const [notes, setNotes] = useState('Please leave with building concierge.');

  // Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('882');

  if (!isCheckoutOpen) return null;

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) errors.fullName = 'Full name is required.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errors.email = 'Valid email is required.';
    if (!phone.trim()) errors.phone = 'Contact telephone is required for shipping updates.';
    if (!address.trim()) errors.address = 'Street address is required.';
    if (!city.trim()) errors.city = 'City is required.';
    if (!postalCode.trim()) errors.postalCode = 'Postal code is required.';

    if (paymentMethod === 'credit_card') {
      if (!cardNumber.trim()) errors.cardNumber = 'Card number is required.';
      if (!cardExpiry.trim()) errors.cardExpiry = 'Expiry is required.';
      if (!cardCvc.trim()) errors.cardCvc = 'CVC is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Please correct the highlighted fields before proceeding.', 'error');
      return;
    }

    // Verify stock
    const outOfStockItem = cart.find((item) => item.quantity > item.product.stock);
    if (outOfStockItem) {
      showToast(`Item "${outOfStockItem.product.name}" exceeds available stock.`, 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      createOrder({
        paymentMethod,
        customer: {
          fullName,
          email,
          phone,
          address,
          city,
          state,
          postalCode,
          country,
          notes: notes.trim() || undefined
        }
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => !isSubmitting && setIsCheckoutOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="relative w-full max-w-4xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200/90 flex items-center justify-between bg-[#F5F1EA]">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-editorial text-2xl font-semibold tracking-wider text-[#1C1917]">
                  NAOVA Checkout
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#78716C]">
                  Encrypted &amp; Verified Transaction
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(false)}
              disabled={isSubmitting}
              className="p-1.5 text-stone-500 hover:text-black rounded-full hover:bg-stone-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Form Column (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-stone-200">
              
              {/* Step 1: Customer Contact */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1C1917] mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1C1917] text-white text-xs flex items-center justify-center font-mono">1</span>
                  <span>Contact Information</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xs text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                    {formErrors.fullName && <p className="text-[11px] text-rose-600 mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xs text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                      {formErrors.email && <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">Phone Number (For Delivery SMS)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xs text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                      {formErrors.phone && <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Destination */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1C1917] mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1C1917] text-white text-xs flex items-center justify-center font-mono">2</span>
                  <span>Delivery Destination</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">Street Address &amp; Suite</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xs text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                    {formErrors.address && <p className="text-[11px] text-rose-600 mt-1">{formErrors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xs text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                      {formErrors.city && <p className="text-[11px] text-rose-600 mt-1">{formErrors.city}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">State / Province</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xs text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-xs font-medium text-stone-700 block mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xs text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                      {formErrors.postalCode && <p className="text-[11px] text-rose-600 mt-1">{formErrors.postalCode}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">Order Notes / Concierge Delivery Instructions</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Leave with doorman or ring doorbell #4"
                      className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xs text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method Selection */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1C1917] mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1C1917] text-white text-xs flex items-center justify-center font-mono">3</span>
                  <span>Select Payment Method</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* Credit Card Option */}
                  <label
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'credit_card'
                        ? 'border-[#1C1917] bg-white shadow-xs'
                        : 'border-stone-200 bg-[#F5F1EA] hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-stone-800" />
                        <span className="text-xs font-semibold text-stone-900">Card Payment</span>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === 'credit_card'}
                        onChange={() => setPaymentMethod('credit_card')}
                        className="accent-stone-900"
                      />
                    </div>
                    <span className="text-[11px] text-stone-500">
                      Visa, Mastercard, American Express
                    </span>
                  </label>

                  {/* Cash On Delivery Option */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'cod'
                        ? 'border-[#1C1917] bg-white shadow-xs'
                        : 'border-stone-200 bg-[#F5F1EA] hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#8A6A4E]" />
                        <span className="text-xs font-semibold text-stone-900">Cash on Delivery</span>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-stone-900"
                      />
                    </div>
                    <span className="text-[11px] text-stone-500">
                      Pay cash upon doorstep package receipt
                    </span>
                  </label>
                </div>

                {/* Conditional Card inputs */}
                {paymentMethod === 'credit_card' ? (
                  <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-3">
                    <div>
                      <label className="text-[11px] font-medium text-stone-700 block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• ••••"
                        className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-stone-700 block mb-1">Expiration</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-stone-700 block mb-1">CVC Code</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                    <p className="font-semibold">Cash on Delivery Terms:</p>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      Please have the exact amount of <strong className="text-stone-900 font-bold">${total.toFixed(2)}</strong> prepared for the courier upon arrival. Our driver will issue an official physical NAOVA receipt upon handover.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Order Review Column (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F5F1EA] flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1C1917] mb-4">
                  Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)})
                </h3>

                {/* Items preview list */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-6">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 pb-3 border-b border-stone-200">
                      <div className="w-12 h-14 rounded-md bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[10px] text-stone-500">
                          Qty: {item.quantity} {item.selectedSize ? `· Size ${item.selectedSize}` : ''}
                        </div>
                      </div>
                      <span className="text-xs font-semibold tabular-nums text-stone-900">
                        ${((item.product.salePrice ?? item.product.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mathematical breakdown */}
                <div className="space-y-2 text-xs text-stone-600 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-stone-900 tabular-nums">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800">
                      <span>Privilege Offer ({discountCode})</span>
                      <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping Charges</span>
                    <span className="font-medium text-stone-900 tabular-nums">
                      {shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Calculated Sales Tax</span>
                    <span className="font-medium text-stone-900 tabular-nums">${tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-stone-300 flex justify-between text-base font-bold text-stone-900">
                    <span>Order Total</span>
                    <span className="tabular-nums">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FBF9F5] rounded-lg border border-stone-200 text-[11px] text-stone-600 space-y-1 mb-6">
                  <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                    <ShieldCheck className="w-4 h-4 text-[#8A6A4E]" />
                    <span>NAOVA Guaranteed Protection</span>
                  </div>
                  <p>Includes luxury branded presentation box and 30-day effortless returns.</p>
                </div>
              </div>

              {/* Complete Order Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full py-4 bg-[#1C1917] text-[#FBF9F5] text-xs font-semibold tracking-widest uppercase rounded-xs hover:bg-[#2C2724] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Processing Secure Transaction...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>
                        {paymentMethod === 'cod' ? 'Confirm Cash on Delivery Order' : `Pay & Place Order · $${total.toFixed(2)}`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-stone-400 text-center mt-3">
                  By clicking complete, you agree to NAOVA's Terms of Service and Privacy Policy.
                </p>
              </div>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
