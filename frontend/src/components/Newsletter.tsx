'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ArrowRight, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    showToast('Welcome to the Atelier Patron Circle');
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="max-w-[1360px] mx-auto px-6 mb-28">
      <div className="bg-[#1E142B] border border-[#2D1F3F] rounded-3xl p-10 sm:p-14 text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-[0_16px_40px_-8px_rgba(30,20,43,0.18)]">
        <div className="max-w-xl text-center lg:text-left">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E7C58E] block mb-2">
            The Atelier Circle
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-2.5">
            Private Seasonal Lookbooks & Early Vault Access
          </h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            Reserved exclusively for discerning patrons. Receive private allocations from European studios, limited-edition chocolate pairings, and seasonal calligraphy privileges.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2.5 w-full max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            required
            className="flex-1 bg-white/6 border border-white/15 focus:border-[#C29352] focus:bg-white/10 rounded-full px-5 py-3 text-xs text-white placeholder:text-white/40 outline-none transition-[border-color,background-color]"
          />
          <button
            type="submit"
            className="bg-[#C29352] hover:bg-[#AA7E40] text-[#1E142B] px-6 py-3 rounded-full text-xs font-bold transition-colors press-tactile whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            {isSubscribed ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Invited</span>
              </>
            ) : (
              <>
                <span>Request Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
