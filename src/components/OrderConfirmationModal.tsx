import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, X, Printer, Package, ArrowRight, Truck, MapPin, Calendar } from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const {
    activeOrder,
    isOrderConfirmationOpen,
    setIsOrderConfirmationOpen,
    setIsOrderTrackingOpen,
    setCurrentView
  } = useStore();

  if (!isOrderConfirmationOpen || !activeOrder) return null;

  const order = activeOrder;

  const handlePrint = () => {
    window.print();
  };

  const handleTrack = () => {
    setIsOrderConfirmationOpen(false);
    setIsOrderTrackingOpen(true);
  };

  const handleContinueShopping = () => {
    setIsOrderConfirmationOpen(false);
    setCurrentView('shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setIsOrderConfirmationOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8 print:m-0 print:shadow-none print:border-none">
          
          {/* Header */}
          <div className="p-6 bg-[#F5F1EA] border-b border-stone-200/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1C1917] font-editorial">
                  Order Successfully Placed
                </h2>
                <span className="text-xs text-stone-600">
                  Confirmation #{order.id}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOrderConfirmationOpen(false)}
              className="p-1.5 text-stone-500 hover:text-black rounded-full hover:bg-stone-200/60 print:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Receipt Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Delivery Estimation Card */}
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 flex items-start gap-3">
              <Truck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase text-emerald-900 tracking-wider">
                  Estimated Delivery by {order.estimatedDelivery}
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  We have dispatched a confirmation email to <span className="font-semibold">{order.customer.email}</span>. Your atelier concierge will pack your pieces with archival care.
                </p>
              </div>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F5F1EA] rounded-xl border border-stone-200 text-xs">
              <div>
                <span className="font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                  Recipient
                </span>
                <p className="font-medium text-stone-900">{order.customer.fullName}</p>
                <p className="text-stone-600">{order.customer.phone}</p>
                <p className="text-stone-600">{order.customer.email}</p>
              </div>

              <div>
                <span className="font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                  Shipping Address
                </span>
                <p className="text-stone-900">{order.customer.address}</p>
                <p className="text-stone-600">
                  {order.customer.city}, {order.customer.state} {order.customer.postalCode}
                </p>
                <p className="text-stone-600">{order.customer.country}</p>
              </div>
            </div>

            {/* Payment & Date Metadata */}
            <div className="flex flex-wrap items-center justify-between text-xs text-stone-600 border-b border-stone-200 pb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-stone-400" />
                <span>Date: <strong>{order.date}</strong></span>
              </div>
              <div>
                <span>Payment Method: </span>
                <strong className="text-stone-900 uppercase tracking-wider">
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card'}
                </strong>
              </div>
            </div>

            {/* Itemized List */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-3">
                Ordered Items
              </h4>
              <div className="divide-y divide-stone-200">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 rounded-md bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold text-stone-900">{item.product.name}</h5>
                        <p className="text-[11px] text-stone-500">
                          Qty: {item.quantity} {item.selectedSize ? `· Size ${item.selectedSize}` : ''} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-stone-900 tabular-nums">
                      ${((item.product.salePrice ?? item.product.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Totals */}
            <div className="pt-4 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-stone-900">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Privilege Discount ({order.discountCode})</span>
                  <span className="tabular-nums">-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="tabular-nums font-medium text-stone-900">
                  {order.shipping === 0 ? 'Complimentary' : `$${order.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax</span>
                <span className="tabular-nums font-medium text-stone-900">${order.tax.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-stone-300 flex justify-between text-base font-bold text-stone-900">
                <span>Total Paid</span>
                <span className="tabular-nums">${order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 print:hidden">
              <button
                onClick={handleTrack}
                className="w-full sm:flex-1 py-3 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#2C2724] flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4" />
                <span>Track This Order</span>
              </button>

              <button
                onClick={handlePrint}
                className="w-full sm:w-auto px-4 py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2"
                title="Print or save PDF receipt"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={handleContinueShopping}
                className="w-full sm:w-auto px-4 py-3 bg-transparent border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5"
              >
                <span>Shop More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
