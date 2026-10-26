'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const { showToast } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast('✨ Welcome to the Concierge Circle');
    setEmail('');
  };

  return (
    <section className="max-w-[1320px] mx-auto px-6 mb-24">
      <div className="bg-gradient-to-br from-[#251838] to-[#3D2261] rounded-3xl p-10 sm:p-14 text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-[0_24px_48px_-12px_rgba(37,24,56,0.16)] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(200,155,88,0.25)_0%,transparent_70%)] blur-2xl pointer-events-none" />

        <div className="max-w-xl text-center lg:text-left">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2.5">
            Join the Concierge Circle
          </h3>
          <p className="text-xs sm:text-sm text-[#D3CCE0] leading-relaxed">
            Receive seasonal gifting lookbooks, private atelier access, and complimentary holiday gift engraving privileges.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md relative z-10">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            required
            className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-xs text-white placeholder-[#B5A8C7] outline-none backdrop-blur-md focus:border-[#C89B58] focus:bg-white/15 transition-all"
          />
          <button
            type="submit"
            className="bg-[#C89B58] hover:bg-[#EAC78D] text-[#251838] px-6 py-3.5 rounded-full text-xs font-bold transition-all hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
          >
            Request Invite
          </button>
        </form>
      </div>
    </section>
  );
}
