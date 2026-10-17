import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Package,
  X,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const {
    isOrderTrackingOpen,
    setIsOrderTrackingOpen,
    orders,
    activeOrder,
    trackOrderById
  } = useStore();

  const [inputOrderId, setInputOrderId] = useState<string>(
    activeOrder ? activeOrder.id : (orders[0]?.id || 'NOV-84920')
  );
  const [searchedOrder, setSearchedOrder] = useState<any>(
    activeOrder || orders[0] || null
  );
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOrderTrackingOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!inputOrderId.trim()) {
      setErrorMsg('Please enter an Order ID.');
      return;
    }

    const found = trackOrderById(inputOrderId);
    if (found) {
      setSearchedOrder(found);
    } else {
      setErrorMsg(`No order found matching "${inputOrderId}". Verify your confirmation email.`);
    }
  };

  const steps = [
    { title: 'Order Confirmed', description: 'Payment verified and sent to fulfillment', icon: CheckCircle2 },
    { title: 'Preparing in Atelier', description: 'Curated and boxed in signature packaging', icon: Package },
    { title: 'In Transit', description: 'Handed to express logistics courier', icon: Truck },
    { title: 'Delivered', description: 'Signed and completed handover', icon: MapPin }
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'confirmed': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  const currentStepIndex = searchedOrder ? getStepIndex(searchedOrder.status) : 1;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setIsOrderTrackingOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
          
          {/* Header */}
          <div className="p-6 bg-[#F5F1EA] border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-800">
                <Package className="w-5 h-5 text-[#8A6A4E]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1C1917] font-editorial">
                  Order Tracking Concierge
                </h2>
                <span className="text-xs text-stone-600">
                  Real-time status updates and delivery milestones
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOrderTrackingOpen(false)}
              className="p-1.5 text-stone-500 hover:text-black rounded-full hover:bg-stone-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Search Lookup Form */}
            <form onSubmit={handleTrack} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inputOrderId}
                  onChange={(e) => {
                    setInputOrderId(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter your Order ID (e.g. NOV-84920)..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-300 rounded-xs text-xs font-mono uppercase tracking-wider text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-stone-800 transition-colors"
              >
                Track Order
              </button>
            </form>

            {errorMsg && (
              <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>
            )}

            {searchedOrder && (
              <div className="space-y-6">
                
                {/* Status Hero Card */}
                <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8C7A6B] font-semibold block mb-1">
                      Tracking Identification
                    </span>
                    <h3 className="text-lg font-bold text-[#1C1917] font-mono">
                      {searchedOrder.id}
                    </h3>
                    <p className="text-xs text-stone-500">
                      Placed on {searchedOrder.date} · {searchedOrder.items.length} item(s)
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[10px] uppercase tracking-widest text-stone-500 block mb-1">
                      Estimated Handover
                    </span>
                    <span className="text-sm font-semibold text-emerald-800 block">
                      {searchedOrder.estimatedDelivery}
                    </span>
                    <span className="text-[11px] text-stone-400 font-medium capitalize">
                      Status: {searchedOrder.status}
                    </span>
                  </div>
                </div>

                {/* Stepper Timeline */}
                <div className="py-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 mb-6">
                    Milestone Progress
                  </h4>

                  <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-200">
                    {steps.map((step, idx) => {
                      const isComplete = idx + 1 <= currentStepIndex;
                      const isCurrent = idx + 1 === currentStepIndex;
                      const Icon = step.icon;

                      return (
                        <div key={step.title} className="relative flex items-start gap-4">
                          <div
                            className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-white ring-4 ring-[#FBF9F5] ${
                              isComplete
                                ? 'bg-emerald-700'
                                : 'bg-stone-300'
                            }`}
                          >
                            <Icon className="w-3 h-3" />
                          </div>

                          <div>
                            <h5 className={`text-xs font-semibold ${isComplete ? 'text-[#1C1917]' : 'text-stone-400'}`}>
                              {step.title} {isCurrent && <span className="text-emerald-700 font-normal">· In Progress</span>}
                            </h5>
                            <p className="text-[11px] text-stone-500 mt-0.5">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Destination & Recipient */}
                <div className="p-4 bg-[#F5F1EA] rounded-xl border border-stone-200 text-xs text-stone-700 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <span className="font-semibold text-stone-900 block mb-1">Delivery Address</span>
                    <p>{searchedOrder.customer.address}</p>
                    <p>{searchedOrder.customer.city}, {searchedOrder.customer.state} {searchedOrder.customer.postalCode}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block mb-1">Recipient</span>
                    <p>{searchedOrder.customer.fullName}</p>
                    <p>{searchedOrder.customer.phone}</p>
                  </div>
                </div>

              </div>
            )}

            {/* Quick Helper for Demo testing */}
            <div className="p-4 bg-stone-100/70 rounded-xl border border-stone-200 text-[11px] text-stone-600 flex items-center justify-between">
              <span>Have an inquiry about sizing or address adjustment?</span>
              <span className="font-semibold text-stone-900">support@naova.com</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
