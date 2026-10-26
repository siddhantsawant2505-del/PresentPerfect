'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ConciergeProps {
  onMatch: (criteria: { recipient: string; occasion: string; category: string }) => void;
}

export default function Concierge({ onMatch }: ConciergeProps) {
  const [recipient, setRecipient] = useState('partner');
  const [occasion, setOccasion] = useState('all');
  const [category, setCategory] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onMatch({ recipient, occasion, category });
    const target = document.getElementById('catalogSection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="conciergeSection" className="max-w-[1320px] mx-auto px-6 mb-20">
      <div className="bg-gradient-to-br from-white to-[#F9F7FC] border border-[#E8E1F0] rounded-3xl p-8 sm:p-10 shadow-[0_8px_24px_-4px_rgba(37,24,56,0.06)] relative overflow-hidden">
        {/* Top Accent Strip */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#794ACF] via-[#9D74DE] to-[#C89B58]" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-7">
          <div>
            <span className="text-xs font-bold text-[#794ACF] uppercase tracking-wider block mb-1.5">
              Personalized Gifting Concierge
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#251838]">
              Find the Perfect Gift in 3 Clicks
            </h3>
            <p className="text-sm text-[#5C4F6E] mt-1 max-w-xl">
              Tell our boutique concierge about your recipient and we’ll match the ideal celebratory keepsake.
            </p>
          </div>
          <div className="text-xs font-bold text-[#794ACF] bg-[#F0EBF7] px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Curation</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Recipient */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8A7D9B]">
              1. Who is it for?
            </label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="bg-white border border-[#E8E1F0] rounded-xl px-4 py-3 text-xs font-semibold text-[#251838] outline-none focus:border-[#794ACF] focus:ring-2 focus:ring-[#794ACF]/15 transition-all cursor-pointer"
            >
              <option value="partner">Partner & Spouse</option>
              <option value="parents">Parents & Family</option>
              <option value="friend">Cherished Friend</option>
              <option value="colleague">Colleague or Mentor</option>
            </select>
          </div>

          {/* Occasion */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8A7D9B]">
              2. What Occasion?
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="bg-white border border-[#E8E1F0] rounded-xl px-4 py-3 text-xs font-semibold text-[#251838] outline-none focus:border-[#794ACF] focus:ring-2 focus:ring-[#794ACF]/15 transition-all cursor-pointer"
            >
              <option value="all">Any Celebration</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="wedding">Wedding</option>
              <option value="holidays">Holidays</option>
              <option value="graduation">Graduation</option>
            </select>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8A7D9B]">
              3. Gift Aesthetic
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white border border-[#E8E1F0] rounded-xl px-4 py-3 text-xs font-semibold text-[#251838] outline-none focus:border-[#794ACF] focus:ring-2 focus:ring-[#794ACF]/15 transition-all cursor-pointer"
            >
              <option value="all">All Styles</option>
              <option value="luxury">Haute Luxury & Heirlooms</option>
              <option value="handmade">Handmade & Artisanal Crafts</option>
              <option value="chocolate">Belgian Gourmet Chocolates</option>
              <option value="personalized">Bespoke Engraved Keepsakes</option>
              <option value="fashion">Silk & Fine Accessories</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#794ACF] hover:bg-[#6332BE] text-white rounded-xl px-6 py-3 text-xs font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_6px_18px_rgba(121,74,207,0.35)] transition-all cursor-pointer"
          >
            <span>Match Gifts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </section>
  );
}
