import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Truck, RotateCcw, ShieldCheck, FileText, HelpCircle } from 'lucide-react';

export const PolicyModal: React.FC = () => {
  const { activePolicy, setActivePolicy } = useStore();

  if (!activePolicy) return null;

  const getPolicyContent = () => {
    switch (activePolicy) {
      case 'shipping':
        return {
          title: 'Shipping Information & Delivery Terms',
          subtitle: 'Global logistics and domestic courier timelines',
          icon: Truck,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-[#57534E] leading-relaxed">
              <p>
                At NAOVA, every parcel is packaged in our signature archival ivory boxes with custom protective sleeves to ensure your skincare and garments arrive in pristine condition.
              </p>
              <h4 className="font-semibold text-stone-900 text-sm mt-3">Domestic Delivery Tiers</h4>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Complimentary Express Shipping:</strong> Orders totaling $120.00 or more qualify for free standard express delivery (2–4 business days).</li>
                <li><strong>Standard Domestic Courier ($15.00):</strong> For orders under $120.00, delivered via priority FedEx or UPS within 3–5 business days.</li>
                <li><strong>Same-Day Dispatch:</strong> Orders placed before 2:00 PM EST Monday through Friday ship the same afternoon.</li>
              </ul>
              <h4 className="font-semibold text-stone-900 text-sm mt-3">Cash on Delivery (COD)</h4>
              <p>
                We proudly support Cash on Delivery across eligible delivery zones. Please ensure the exact cash amount is prepared for the courier upon parcel arrival.
              </p>
            </div>
          )
        };
      case 'returns':
        return {
          title: 'Returns & Refund Policy',
          subtitle: '30-day effortless return guarantee',
          icon: RotateCcw,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-[#57534E] leading-relaxed">
              <p>
                We want you to feel complete confidence in your NAOVA selection. We accept returns of unworn, unaltered fashion apparel and unopened skincare within <strong>30 days of delivery</strong>.
              </p>
              <h4 className="font-semibold text-stone-900 text-sm mt-3">Return Requirements</h4>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Fashion Apparel:</strong> Garments must have all original NAOVA tags attached and show no signs of perfume, makeup, or wear.</li>
                <li><strong>Skincare &amp; Beauty:</strong> Products must remain sealed in their original box with tamper-evident seals intact.</li>
                <li><strong>Complimentary Return Shipping:</strong> We provide a prepaid domestic return label upon contacting our concierge at <span className="font-mono text-stone-800">returns@naova.com</span>.</li>
              </ul>
              <p>
                Refunds are credited to your original payment method within 3–5 business days following atelier inspection.
              </p>
            </div>
          )
        };
      case 'privacy':
        return {
          title: 'Privacy Policy & Data Protection',
          subtitle: 'Our commitment to confidential client protection',
          icon: ShieldCheck,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-[#57534E] leading-relaxed">
              <p>
                Your privacy is paramount. NAOVA collects only the necessary information required to process transactions, deliver your orders safely, and provide personalized client service.
              </p>
              <h4 className="font-semibold text-stone-900 text-sm mt-3">Key Commitments</h4>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Zero Data Selling:</strong> We never sell, rent, or trade your personal information or contact details to third-party data brokers.</li>
                <li><strong>256-Bit SSL Encryption:</strong> All checkout information and credit card transactions are transmitted through bank-grade encrypted channels.</li>
                <li><strong>Newsletter Preferences:</strong> You can unsubscribe from our client newsletters at any time via a single-click link at the foot of any email.</li>
              </ul>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'Terms & Conditions of Service',
          subtitle: 'Commerce agreements and verified brand claims',
          icon: FileText,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-[#57534E] leading-relaxed">
              <p>
                Welcome to NAOVA. By accessing or shopping with us, you agree to our standard terms of service. All prices are listed in US Dollars ($) and are subject to verification prior to order dispatch.
              </p>
              <h4 className="font-semibold text-stone-900 text-sm mt-3">Product Authenticity &amp; Integrity</h4>
              <p>
                All skincare items and garments are manufactured under strict ethical controls. We do not invent medical claims or guarantee clinical results; all descriptions reflect verified ingredient properties and artisan tailoring specifications.
              </p>
              <h4 className="font-semibold text-stone-900 text-sm mt-3">Order Acceptance</h4>
              <p>
                Receipt of an electronic order confirmation does not constitute our final acceptance of an order; NAOVA reserves the right to cancel or limit quantities where inventory error or payment irregularities occur.
              </p>
            </div>
          )
        };
      case 'faq':
        return {
          title: 'Frequently Asked Questions',
          subtitle: 'Ritual guides, sizing, and common inquiries',
          icon: HelpCircle,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-[#57534E] leading-relaxed">
              <div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">How do I integrate the Botanical Serum into my routine?</h4>
                <p>Apply 3–4 drops onto freshly cleansed skin every morning and evening before heavier moisturizers. Gently press into the face and neck using upward strokes.</p>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">What sizes are offered in the fashion collection?</h4>
                <p>Our outerwear and silk pieces are crafted in standard European and US sizing from XS through XL. Each product page features exact garment measurements in inches and centimeters.</p>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">Are NAOVA beauty products cruelty-free?</h4>
                <p>Yes, 100%. NAOVA never tests on animals at any stage of product development, and we only partner with suppliers who maintain Leaping Bunny cruelty-free standards.</p>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">How can I track my package?</h4>
                <p>Click "Orders" in the top navigation bar or footer and enter your Order ID (such as NOV-84920) to view real-time courier milestone updates.</p>
              </div>
            </div>
          )
        };
      default:
        return null;
    }
  };

  const details = getPolicyContent();
  if (!details) return null;

  const Icon = details.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setActivePolicy(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
          
          {/* Header */}
          <div className="p-6 bg-[#F5F1EA] border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-800">
                <Icon className="w-5 h-5 text-[#8A6A4E]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1C1917] font-editorial">
                  {details.title}
                </h2>
                <span className="text-xs text-stone-600">
                  {details.subtitle}
                </span>
              </div>
            </div>

            <button
              onClick={() => setActivePolicy(null)}
              className="p-1.5 text-stone-500 hover:text-black rounded-full hover:bg-stone-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {details.content}

            <div className="mt-8 pt-6 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setActivePolicy(null)}
                className="px-6 py-2.5 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#2C2724]"
              >
                Close Window
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
