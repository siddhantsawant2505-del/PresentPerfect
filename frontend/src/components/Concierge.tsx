'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Compass, SlidersHorizontal } from 'lucide-react';
import { FALLBACK_GIFTS } from '@/lib/api';
import { useCart } from '@/context/CartContext';

interface ConciergeProps {
  onMatch: (criteria: { recipient: string; occasion: string; category: string }) => void;
}

export default function Concierge({ onMatch }: ConciergeProps) {
  const { addToCart } = useCart();
  const [recipient, setRecipient] = useState<'partner' | 'parents' | 'friend' | 'colleague'>('partner');
  const [occasion, setOccasion] = useState<string>('anniversary');
  const [category, setCategory] = useState<string>('luxury');
  const [matchedAdded, setMatchedAdded] = useState(false);

  // Derive dynamic recommended gift
  const recommendedGift =
    FALLBACK_GIFTS.find(
      (g) =>
        (category === 'all' || g.category.toLowerCase() === category.toLowerCase()) &&
        (occasion === 'all' || g.occasion.toLowerCase() === occasion.toLowerCase())
    ) ||
    FALLBACK_GIFTS.find((g) => g.category.toLowerCase() === category.toLowerCase()) ||
    FALLBACK_GIFTS[0];

  const handleApplyMatch = () => {
    onMatch({ recipient, occasion, category });
    const target = document.getElementById('catalogSection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddMatched = () => {
    addToCart(recommendedGift);
    setMatchedAdded(true);
    setTimeout(() => setMatchedAdded(false), 1400);
  };

  return (
    <section id="atelierMatcher" className="max-w-[1360px] mx-auto px-6 mb-24">
      <div className="bg-white border border-[#EBE4F2] rounded-3xl p-8 sm:p-10 shadow-[0_4px_24px_-4px_rgba(30,20,43,0.06)] relative overflow-hidden">
        
        {/* Subtle Luxury Ribbon Header Rule */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 pb-6 border-b border-[#F5F1FA]">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F2ECFA] text-[#6E39C4] px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-[0.14em] mb-2.5">
              <Compass className="w-3.5 h-3.5" />
              <span>The Atelier Concierge</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E142B]">
              Compose by Recipient & Occasion
            </h3>
            <p className="text-xs sm:text-sm text-[#5D506F] mt-1 max-w-xl">
              Tap the celebratory context below. Our matchmaking algorithm instantly curates the ideal keepsake from our verified ateliers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8C7F9D] hidden sm:inline">Active Studio Matching:</span>
            <span className="bg-[#1E142B] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E7C58E]" />
              <span>Instant Live Match</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
          
          {/* Left Column: Interactive Tactile Toggles (No generic selects) */}
          <div className="space-y-6">
            
            {/* Step 1: Who is it for? */}
            <div>
              <label className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8C7F9D] block mb-2">
                1. Intended Recipient
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'partner', label: 'Spouse & Partner' },
                  { id: 'parents', label: 'Parents & Family' },
                  { id: 'friend', label: 'Cherished Friend' },
                  { id: 'colleague', label: 'Mentor & Peer' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRecipient(item.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center border transition-colors press-tactile cursor-pointer ${
                      recipient === item.id
                        ? 'bg-[#1E142B] text-white border-[#1E142B] shadow-xs'
                        : 'bg-[#FAF8FD] text-[#5D506F] border-[#EBE4F2] hover:border-[#6E39C4]/40 hover:text-[#1E142B]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Occasion */}
            <div>
              <label className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8C7F9D] block mb-2">
                2. Celebratory Milestone
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'anniversary', label: 'Anniversary' },
                  { id: 'birthday', label: 'Birthday' },
                  { id: 'wedding', label: 'Wedding' },
                  { id: 'holidays', label: 'Holidays' },
                  { id: 'graduation', label: 'Graduation' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setOccasion(item.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center border transition-colors press-tactile cursor-pointer ${
                      occasion === item.id
                        ? 'bg-[#6E39C4] text-white border-[#6E39C4] shadow-xs'
                        : 'bg-[#FAF8FD] text-[#5D506F] border-[#EBE4F2] hover:border-[#6E39C4]/40 hover:text-[#1E142B]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Aesthetic Genre */}
            <div>
              <label className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8C7F9D] block mb-2">
                3. Preferred Aesthetic Mood
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'luxury', label: 'Haute Luxury & Heirlooms' },
                  { id: 'handmade', label: 'Artisanal Studio Crafts' },
                  { id: 'chocolate', label: 'Belgian Confectionery' },
                  { id: 'personalized', label: 'Engraved Keepsakes' },
                  { id: 'fashion', label: 'Mulberry Silk & Accents' },
                  { id: 'all', label: 'Any Masterpiece' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center border transition-colors press-tactile cursor-pointer ${
                      category === item.id
                        ? 'bg-[#1E142B] text-white border-[#1E142B] shadow-xs'
                        : 'bg-[#FAF8FD] text-[#5D506F] border-[#EBE4F2] hover:border-[#6E39C4]/40 hover:text-[#1E142B]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Action Link */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleApplyMatch}
                className="bg-[#1E142B] hover:bg-[#140C1E] text-white text-xs font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 press-tactile cursor-pointer"
              >
                <span>Filter Full Catalog by this Match</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E7C58E]" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Curated Recommendation Card */}
          <div className="bg-[#FAF8FD] border border-[#EBE4F2] rounded-2xl p-6 relative">
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6E39C4] mb-3 flex items-center justify-between">
              <span>Concierge Recommendation</span>
              <span className="text-[11px] text-[#257850] font-semibold">99.4% Match Score</span>
            </div>

            {/* Card Content with Image & Details */}
            <div className="flex gap-4 items-center mb-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-[#EBE4F2] shrink-0">
                <img
                  src={recommendedGift.image}
                  alt={recommendedGift.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C29352]">
                  {recommendedGift.tag}
                </span>
                <h4 className="font-serif text-base font-bold text-[#1E142B] truncate mt-0.5">
                  {recommendedGift.name}
                </h4>
                <div className="text-base font-bold text-[#1E142B] mt-1 tabular-nums">
                  ${Number(recommendedGift.price).toFixed(2)}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#5D506F] line-clamp-2 leading-relaxed mb-4">
              {recommendedGift.description}
            </p>

            <button
              onClick={handleAddMatched}
              className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors press-tactile cursor-pointer ${
                matchedAdded ? 'bg-[#257850] text-white' : 'bg-[#6E39C4] hover:bg-[#5A29A6] text-white'
              }`}
            >
              {matchedAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Added to Gift Box</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#E7C58E]" />
                  <span>Curate This Match Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
