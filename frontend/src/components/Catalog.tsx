'use client';

import React, { useState } from 'react';
import { Gift } from '@/types';
import { useCart } from '@/context/CartContext';
import { Check, Plus, Sparkles, Filter } from 'lucide-react';

interface CatalogProps {
  gifts: Gift[];
  activeCategory: string;
  activeOccasion: string;
  onCategoryChange: (cat: string) => void;
  onOccasionChange: (occ: string) => void;
}

export default function Catalog({
  gifts,
  activeCategory,
  activeOccasion,
  onCategoryChange,
  onOccasionChange,
}: CatalogProps) {
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState<Record<number, boolean>>({});

  const handleAdd = (gift: Gift) => {
    addToCart(gift);
    setAddedIds((prev) => ({ ...prev, [gift.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [gift.id]: false }));
    }, 1200);
  };

  const categories = [
    { id: 'all', label: 'All Treasures' },
    { id: 'luxury', label: 'Haute Luxury' },
    { id: 'handmade', label: 'Artisanal Crafts' },
    { id: 'chocolate', label: 'Fine Chocolates' },
    { id: 'personalized', label: 'Engraved Keepsakes' },
    { id: 'fashion', label: 'Silk & Accessories' },
  ];

  const occasions = [
    { id: 'all', label: 'All Occasions' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'holidays', label: 'Holidays' },
    { id: 'graduation', label: 'Graduation' },
  ];

  return (
    <section id="catalogSection" className="max-w-[1360px] mx-auto px-6 mb-28">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#F2ECFA] text-[#6E39C4] px-3.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-[0.16em] mb-3">
          <span>The Atelier Vault</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1E142B] tracking-tight mb-3">
          Curated Treasures for Legacy Moments
        </h2>
        <p className="text-sm sm:text-[15px] text-[#5D506F] max-w-xl leading-relaxed">
          Every piece is verified for heirloom materiality, pure provenance, and bespoke presentation packaging.
        </p>
      </div>

      {/* Primary Category Switcher - Tactile Segmented Bar */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-6" role="tablist">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => onCategoryChange(c.id)}
            className={`px-4.5 py-2 rounded-full text-xs font-semibold border transition-colors press-tactile cursor-pointer ${
              activeCategory === c.id
                ? 'bg-[#1E142B] text-white border-[#1E142B] shadow-xs'
                : 'bg-white text-[#5D506F] border-[#EBE4F2] hover:border-[#6E39C4]/40 hover:text-[#1E142B]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Secondary Occasion Micro-Chips */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap mb-12">
        <span className="text-[11px] font-semibold text-[#8C7F9D] mr-2 flex items-center gap-1">
          <Filter className="w-3 h-3" />
          <span>Occasion:</span>
        </span>
        {occasions.map((o) => (
          <button
            key={o.id}
            onClick={() => onOccasionChange(o.id)}
            className={`px-3 py-1 rounded-full text-[11.5px] font-medium transition-colors press-tactile cursor-pointer ${
              activeOccasion === o.id
                ? 'bg-[#F2ECFA] border border-[#6E39C4]/40 text-[#6E39C4] font-semibold'
                : 'bg-transparent text-[#8C7F9D] hover:text-[#1E142B] border border-transparent hover:border-[#EBE4F2]'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* Products Grid - Editorial Presentation */}
      {gifts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#EBE4F2] rounded-3xl p-8 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF8FD] border border-[#EBE4F2] mx-auto flex items-center justify-center text-[#6E39C4] mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#1E142B] mb-1.5">No Matching Treasures</h3>
          <p className="text-xs text-[#5D506F] leading-relaxed mb-6">
            We couldn't find items matching both selections. Adjust your celebration filter or view all pieces.
          </p>
          <button
            onClick={() => {
              onCategoryChange('all');
              onOccasionChange('all');
            }}
            className="bg-[#1E142B] hover:bg-[#140C1E] text-white px-5 py-2 rounded-full text-xs font-semibold press-tactile cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className="bg-white border border-[#EBE4F2] hover:border-[#D7C9E3] rounded-2xl p-4 shadow-subtle hover:shadow-card transition-[border-color,box-shadow] duration-200 flex flex-col group relative"
            >
              {/* Product Portrait Frame */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#FAF8FD] mb-4">
                <img
                  src={gift.image}
                  alt={gift.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                />

                {/* Refined Woven-Style Origin Tag */}
                <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm border border-[#EBE4F2] text-[#1E142B] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                  {gift.tag}
                </div>

                <div className="absolute top-2.5 right-2.5 bg-[#1E142B]/85 backdrop-blur-xs text-white text-[9.5px] font-semibold px-2 py-0.5 rounded-md capitalize">
                  {gift.occasion}
                </div>
              </div>

              {/* Editorial Meta */}
              <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8C7F9D]">
                    {gift.category}
                  </span>
                  <span className="text-[11px] text-[#C29352] font-semibold tabular-nums">
                    ★ {gift.rating ? gift.rating.split(' ')[0] : '4.9'}
                  </span>
                </div>

                <h4 className="font-serif text-[15px] font-bold text-[#1E142B] leading-snug mb-1 group-hover:text-[#6E39C4] transition-colors">
                  {gift.name}
                </h4>

                <p className="text-xs text-[#5D506F] line-clamp-2 leading-relaxed mb-4 flex-grow">
                  {gift.description}
                </p>

                {/* Bottom Row: Price & Tactile Add Action */}
                <div className="flex items-center justify-between pt-3 border-t border-[#F5F1FA]">
                  <div className="flex flex-col">
                    <span className="text-[9.5px] uppercase tracking-wider text-[#8C7F9D] font-bold">
                      Price
                    </span>
                    <span className="text-base font-bold text-[#1E142B] tabular-nums">
                      ${Number(gift.price).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAdd(gift)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold press-tactile cursor-pointer ${
                      addedIds[gift.id]
                        ? 'bg-[#257850] text-white shadow-xs'
                        : 'bg-[#FAF8FD] hover:bg-[#F2ECFA] text-[#1E142B] hover:text-[#6E39C4] border border-[#EBE4F2] hover:border-[#6E39C4]/40'
                    }`}
                  >
                    {addedIds[gift.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Curated</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-[#6E39C4]" />
                        <span>Add to Box</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
