'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { FALLBACK_GIFTS } from '@/lib/api';
import { Gift, ArrowRight, Sparkles, Check, Bookmark, Heart } from 'lucide-react';

interface HeroProps {
  onSelectOccasion?: (occ: string) => void;
}

export default function Hero({ onSelectOccasion }: HeroProps) {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<'luxury' | 'handmade' | 'chocolate' | 'personalized'>('luxury');
  const [ribbonColor, setRibbonColor] = useState<'amethyst' | 'gold' | 'blush'>('amethyst');
  const [boxStyle, setBoxStyle] = useState<'lavender' | 'walnut'>('lavender');
  const [isAdded, setIsAdded] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);

  const showcaseMap = {
    luxury: FALLBACK_GIFTS.find((g) => g.category === 'luxury') || FALLBACK_GIFTS[0],
    handmade: FALLBACK_GIFTS.find((g) => g.category === 'handmade') || FALLBACK_GIFTS[5],
    chocolate: FALLBACK_GIFTS.find((g) => g.category === 'chocolate') || FALLBACK_GIFTS[10],
    personalized: FALLBACK_GIFTS.find((g) => g.category === 'personalized') || FALLBACK_GIFTS[15],
  };

  const currentItem = showcaseMap[activeCategory];

  const handleCategorySwitch = (cat: 'luxury' | 'handmade' | 'chocolate' | 'personalized') => {
    if (cat === activeCategory) return;
    setIsMorphing(true);
    setActiveCategory(cat);
    setTimeout(() => setIsMorphing(false), 160);
  };

  const handleAddHeroItem = () => {
    addToCart(currentItem);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const ribbons = [
    { id: 'amethyst', name: 'Amethyst Silk', bg: 'bg-[#6E39C4]', border: 'border-[#6E39C4]' },
    { id: 'gold', name: 'Imperial Champagne', bg: 'bg-[#C29352]', border: 'border-[#C29352]' },
    { id: 'blush', name: 'Petal Rose Silk', bg: 'bg-[#D9A3B5]', border: 'border-[#D9A3B5]' },
  ];

  return (
    <section className="relative max-w-[1360px] mx-auto px-6 pt-10 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-14 lg:gap-16">
        
        {/* Left Column: Editorial Curation */}
        <div className="flex flex-col items-start">
          {/* Atelier Hallmark Pill */}
          <div className="inline-flex items-center gap-2.5 bg-white border border-[#EBE4F2] px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-[#6E39C4] shadow-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6E39C4]" />
            <span className="tracking-wide">Bespoke Gifting Atelier · Handcrafted Across 40+ European Studios</span>
          </div>

          {/* Headline with Natural Editorial Hierarchy */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#1E142B] leading-[1.1] tracking-tight mb-5">
            The Art of Giving,
            <span className="block font-normal italic text-[#6E39C4] mt-1">
              Curated for Legacy.
            </span>
          </h1>

          {/* Editorial Subtext */}
          <p className="text-[15px] sm:text-base text-[#5D506F] leading-relaxed max-w-xl mb-8">
            Hand-thrown studio ceramics, heritage Italian leathercraft, single-origin Belgian confections, and bespoke engraved keepsakes. Every creation rests in our signature lavender presentation box with your handwritten wax-sealed sentiment.
          </p>

          {/* Tactile Primary Action Row */}
          <div className="flex items-center gap-3.5 mb-10 flex-wrap">
            <a
              href="#catalogSection"
              className="bg-[#1E142B] hover:bg-[#140C1E] text-white px-7 py-3 rounded-full text-xs font-semibold flex items-center gap-2.5 shadow-[0_4px_16px_rgba(30,20,43,0.18)] press-tactile cursor-pointer"
            >
              <span>Explore Boutique Vault</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E7C58E]" />
            </a>

            <a
              href="#atelierMatcher"
              className="bg-white hover:bg-[#F7F3FC] text-[#1E142B] hover:text-[#6E39C4] border border-[#EBE4F2] hover:border-[#6E39C4]/40 px-6 py-3 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xs press-tactile cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C29352]" />
              <span>Interactive Concierge</span>
            </a>
          </div>

          {/* Occasion Filter Strips - Tactile Pill Rail */}
          <div className="pt-6 border-t border-[#EBE4F2] w-full">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8C7F9D]">
                Select Celebration
              </span>
              <span className="text-[11px] text-[#8C7F9D]">Tap to filter catalog instantly</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { label: 'Anniversary', occ: 'anniversary' },
                { label: 'Birthday Milestone', occ: 'birthday' },
                { label: 'Grand Wedding', occ: 'wedding' },
                { label: 'Winter Holidays', occ: 'holidays' },
                { label: 'Graduation', occ: 'graduation' },
              ].map(({ label, occ }) => (
                <button
                  key={occ}
                  onClick={() => onSelectOccasion && onSelectOccasion(occ)}
                  className="bg-white hover:bg-[#F2ECFA] hover:text-[#6E39C4] text-[#5D506F] border border-[#EBE4F2] hover:border-[#6E39C4]/40 px-3.5 py-1.5 rounded-full text-xs font-medium press-tactile cursor-pointer"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tactile Live Presentation Box Stage */}
        <div className="relative">
          <div className="bg-white border border-[#EBE4F2] rounded-3xl p-6 sm:p-7 shadow-[0_8px_32px_-4px_rgba(30,20,43,0.08)] relative">
            
            {/* Box Header & Category Tabs (Segmented Control) */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#F5F1FA]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8C7F9D] block mb-0.5">
                  Live Atelier Showcase
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1E142B]">
                  Bespoke Box Composer
                </h3>
              </div>
              <span className="bg-[#FAF8FD] border border-[#EBE4F2] text-[#6E39C4] text-[10.5px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {currentItem.tag}
              </span>
            </div>

            {/* Segmented Category Buttons */}
            <div className="grid grid-cols-4 gap-1.5 bg-[#FAF8FD] p-1 rounded-xl border border-[#EBE4F2] mb-5">
              {(['luxury', 'handmade', 'chocolate', 'personalized'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleCategorySwitch(tab)}
                  className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors press-tactile cursor-pointer ${
                    activeCategory === tab
                      ? 'bg-white text-[#1E142B] shadow-xs font-bold border border-[#EBE4F2]'
                      : 'text-[#8C7F9D] hover:text-[#1E142B]'
                  }`}
                >
                  {tab === 'personalized' ? 'Custom' : tab}
                </button>
              ))}
            </div>

            {/* Interactive Showcase Preview Image with Blur-Morph Bridge */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F1FA] border border-[#EBE4F2] mb-5 group">
              <img
                src={currentItem.image}
                alt={currentItem.name}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 ${
                  isMorphing ? 'morph-blur-active' : ''
                }`}
              />

              {/* Physical Ribbon Overlay Accent */}
              <div
                className={`absolute top-0 right-7 w-5 h-full ${
                  ribbonColor === 'amethyst'
                    ? 'bg-[#6E39C4]/85'
                    : ribbonColor === 'gold'
                    ? 'bg-[#C29352]/85'
                    : 'bg-[#D9A3B5]/85'
                } backdrop-blur-xs shadow-sm transition-colors duration-200 pointer-events-none`}
              >
                <div className="absolute bottom-0 inset-x-0 h-3 bg-white" style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }} />
              </div>

              {/* Wax Seal Floating Emblem */}
              <div className="absolute bottom-3.5 left-3.5 bg-white/95 backdrop-blur-md border border-[#EBE4F2] rounded-full px-3 py-1 flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#C29352]" />
                <span className="text-[10.5px] font-semibold text-[#1E142B]">
                  Hand-sealed in gold wax
                </span>
              </div>
            </div>

            {/* Product Meta Row */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h4 className="font-serif text-base font-bold text-[#1E142B] leading-tight">
                  {currentItem.name}
                </h4>
                <p className="text-xs text-[#5D506F] mt-1 line-clamp-2 leading-relaxed">
                  {currentItem.description}
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xl font-bold text-[#1E142B] tabular-nums">
                  ${Number(currentItem.price).toFixed(2)}
                </div>
                <div className="text-[10.5px] text-[#257850] font-semibold">
                  In Stock · Ready to Ship
                </div>
              </div>
            </div>

            {/* Interactive Packaging Customizer Controls */}
            <div className="pt-4 border-t border-[#F5F1FA] grid grid-cols-2 gap-4 mb-5">
              {/* Ribbon Palette */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8C7F9D] block mb-1.5">
                  Silk Ribbon Hue
                </label>
                <div className="flex items-center gap-2">
                  {ribbons.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRibbonColor(r.id as any)}
                      className={`w-6 h-6 rounded-full ${r.bg} transition-transform press-icon cursor-pointer flex items-center justify-center ${
                        ribbonColor === r.id ? 'ring-2 ring-offset-2 ring-[#1E142B] scale-110' : 'opacity-70 hover:opacity-100'
                      }`}
                      title={r.name}
                    >
                      {ribbonColor === r.id && <Check className="w-3 h-3 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Box Finish Switcher */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8C7F9D] block mb-1.5">
                  Presentation Finish
                </label>
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    onClick={() => setBoxStyle('lavender')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors press-tactile cursor-pointer ${
                      boxStyle === 'lavender'
                        ? 'bg-[#F2ECFA] text-[#6E39C4] font-bold border border-[#6E39C4]/30'
                        : 'text-[#8C7F9D] hover:text-[#1E142B]'
                    }`}
                  >
                    Lavender Silk
                  </button>
                  <button
                    onClick={() => setBoxStyle('walnut')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors press-tactile cursor-pointer ${
                      boxStyle === 'walnut'
                        ? 'bg-[#FBF6EE] text-[#C29352] font-bold border border-[#C29352]/30'
                        : 'text-[#8C7F9D] hover:text-[#1E142B]'
                    }`}
                  >
                    Walnut Atelier
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Add to Gift Box Button with Emil Tactile Physics */}
            <button
              onClick={handleAddHeroItem}
              className={`w-full py-3.5 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs press-tactile cursor-pointer ${
                isAdded
                  ? 'bg-[#257850] text-white'
                  : 'bg-[#1E142B] hover:bg-[#140C1E] text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Curated into Your Box</span>
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4 text-[#E7C58E]" />
                  <span>Curate This Set · ${Number(currentItem.price).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
