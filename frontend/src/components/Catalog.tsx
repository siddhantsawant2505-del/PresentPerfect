'use client';

import React, { useState } from 'react';
import { Gift } from '@/types';
import { useCart } from '@/context/CartContext';
import { Check, Plus } from 'lucide-react';

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
    { id: 'luxury', label: '💎 Luxury' },
    { id: 'handmade', label: '🌿 Handmade' },
    { id: 'chocolate', label: '🍫 Chocolates' },
    { id: 'personalized', label: '✨ Personalized' },
    { id: 'fashion', label: '⌚ Fashion & Silk' },
  ];

  const occasions = [
    { id: 'all', label: 'All' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'holidays', label: 'Holidays' },
    { id: 'graduation', label: 'Graduation' },
  ];

  return (
    <section id="catalogSection" className="max-w-[1320px] mx-auto px-6 mb-24">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <span className="text-xs font-bold text-[#794ACF] uppercase tracking-wider mb-2">
          The Boutique Vault
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#251838] mb-3">
          Curated Gifts for Every Celebration
        </h2>
        <p className="text-sm sm:text-base text-[#5C4F6E] max-w-xl">
          Each item is individually verified for ethical craftsmanship, material purity, and timeless aesthetic delight.
        </p>
      </div>

      {/* Primary Category Filter Bar */}
      <div className="flex items-center justify-center gap-2.5 flex-wrap mb-6" role="tablist">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => onCategoryChange(c.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer ${
              activeCategory === c.id
                ? 'bg-[#251838] text-white shadow-md'
                : 'bg-white hover:bg-[#F0EBF7] text-[#5C4F6E] hover:text-[#794ACF] border border-[#E8E1F0]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Secondary Occasion Sub-filter */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
        <span className="text-xs font-bold text-[#8A7D9B] mr-2">Filter by Occasion:</span>
        {occasions.map((o) => (
          <button
            key={o.id}
            onClick={() => onOccasionChange(o.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeOccasion === o.id
                ? 'bg-[#F0EBF7] border border-[#794ACF] text-[#794ACF] font-bold'
                : 'border border-dashed border-[#E8E1F0] hover:border-[#794ACF] text-[#8A7D9B] hover:text-[#794ACF]'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {gifts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#E8E1F0] rounded-3xl p-8">
          <div className="text-4xl mb-3">🎁</div>
          <h3 className="font-serif text-xl font-bold text-[#251838] mb-2">No matching treasures found</h3>
          <p className="text-xs text-[#5C4F6E] max-w-sm mx-auto mb-6">
            Try adjusting your search criteria or resetting filters to explore our full boutique collection.
          </p>
          <button
            onClick={() => {
              onCategoryChange('all');
              onOccasionChange('all');
            }}
            className="bg-[#251838] hover:bg-[#794ACF] text-white px-6 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className="bg-white border border-[#E8E1F0] hover:border-[#D5C7E6] rounded-2xl p-4 shadow-sm hover:shadow-[0_20px_38px_-10px_rgba(121,74,207,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col group relative"
            >
              {/* Product Image */}
              <div className="relative w-full h-56 rounded-xl overflow-hidden bg-[#F4F0F9] mb-4">
                <img
                  src={gift.image}
                  alt={gift.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm border border-[#E8E1F0] text-[#251838] text-[10.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  {gift.tag}
                </span>
                <span className="absolute top-2.5 right-2.5 bg-[#251838]/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize">
                  {gift.occasion}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-grow">
                <h4 className="font-serif text-base font-bold text-[#251838] leading-tight mb-1.5 group-hover:text-[#794ACF] transition-colors">
                  {gift.name}
                </h4>
                <p className="text-xs text-[#5C4F6E] line-clamp-2 leading-relaxed mb-4 flex-grow">
                  {gift.description}
                </p>

                {/* Footer Row */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E8E1F0]">
                  <span className="text-lg font-bold text-[#251838]">
                    ${Number(gift.price).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAdd(gift)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      addedIds[gift.id]
                        ? 'bg-[#2E7D58] text-white'
                        : 'bg-[#F0EBF7] hover:bg-[#794ACF] text-[#794ACF] hover:text-white border border-[#794ACF]/20 hover:border-[#794ACF]'
                    }`}
                  >
                    {addedIds[gift.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
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
