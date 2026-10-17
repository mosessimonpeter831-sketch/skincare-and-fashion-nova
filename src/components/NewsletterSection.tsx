import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { showToast, setActivePolicy } = useStore();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validateEmail = (val: string) => {
    return /\S+@\S+\.\S+/.test(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    if (!validateEmail(email.trim())) {
      setErrorMsg('Please enter a valid email address (e.g., name@domain.com).');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      try {
        const existing = JSON.parse(localStorage.getItem('naova_subscribers') || '[]');
        if (!existing.includes(email.trim())) {
          existing.push(email.trim());
          localStorage.setItem('naova_subscribers', JSON.stringify(existing));
        }
      } catch (err) {
        console.warn('Failed to store subscriber', err);
      }
      showToast('Thank you for subscribing! Your 15% privilege code NAOVA15 is active.', 'success');
    }, 700);
  };

  return (
    <section className="py-20 bg-[#F5F1EA] border-b border-[#EAE4DC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="w-12 h-12 rounded-full bg-[#EDE7DC] border border-stone-300/80 flex items-center justify-center mx-auto mb-6 text-[#8A6A4E]">
          <Mail className="w-5 h-5" />
        </div>

        <span className="text-xs uppercase tracking-[0.24em] text-[#8C7A6B] font-semibold block mb-2">
          The Private Client Newsletter
        </span>

        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] mb-3 font-editorial">
          Stay in the NAOVA Loop.
        </h2>

        <p className="text-base text-[#57534E] max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Be the first to discover new arrivals, beauty essentials, style inspiration, and exclusive offers.
        </p>

        {isSubscribed ? (
          <div className="p-6 bg-[#FBF9F5] border border-emerald-300 rounded-xl max-w-lg mx-auto shadow-xs text-left flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-[#1C1917] mb-1">
                You have been welcomed to the NAOVA Circle.
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed mb-2">
                We’ve sent your welcome guide to <span className="font-semibold text-stone-800">{email}</span>. Use offer code <span className="font-mono font-bold text-[#8A6A4E]">NAOVA15</span> at checkout for 15% off your first order.
              </p>
              <button
                onClick={() => {
                  setIsSubscribed(false);
                  setEmail('');
                }}
                className="text-[11px] text-stone-500 hover:text-stone-800 underline"
              >
                Subscribe another address
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto text-left">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter your email address..."
                  className="w-full px-4 py-3 bg-[#FBF9F5] border border-stone-300 rounded-xs text-sm text-[#1C1917] placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#1C1917] focus:border-[#1C1917] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#1C1917] text-[#FBF9F5] text-xs font-semibold tracking-widest uppercase rounded-xs hover:bg-[#2C2724] active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-xs disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Subscribing...</span>
                ) : (
                  <>
                    <span>Join the List</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 mt-2 font-medium">
                {errorMsg}
              </p>
            )}

            <p className="text-[11px] text-[#78716C] mt-4 text-center">
              By subscribing, you agree to receive editorial marketing emails. You can unsubscribe at any time. View our{' '}
              <button
                type="button"
                onClick={() => setActivePolicy('privacy')}
                className="underline hover:text-[#1C1917]"
              >
                Privacy Policy
              </button>.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
