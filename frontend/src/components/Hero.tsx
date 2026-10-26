'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { FALLBACK_GIFTS } from '@/lib/api';
import { Gift, ArrowRight, Sparkles, Star, Check } from 'lucide-react';

interface HeroProps {
  onSelectOccasion?: (occ: string) => void;
}

export default function Hero({ onSelectOccasion }: HeroProps) {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'luxury' | 'handmade' | 'chocolate' | 'personalized'>('luxury');
  const [btnText, setBtnText] = useState('Add to Gift Box');
  const [isAdded, setIsAdded] = useState(false);

  // Showcase item mapping
  const showcaseItems = {
    luxury: FALLBACK_GIFTS.find((g) => g.category === 'luxury') || FALLBACK_GIFTS[0],
    handmade: FALLBACK_GIFTS.find((g) => g.category === 'handmade') || FALLBACK_GIFTS[5],
    chocolate: FALLBACK_GIFTS.find((g) => g.category === 'chocolate') || FALLBACK_GIFTS[10],
    personalized: FALLBACK_GIFTS.find((g) => g.category === 'personalized') || FALLBACK_GIFTS[15],
  };

  const currentItem = showcaseItems[activeTab];

  const handleAddHeroItem = () => {
    addToCart(currentItem);
    setIsAdded(true);
    setBtnText('Added! ✓');
    setTimeout(() => {
      setIsAdded(false);
      setBtnText('Add to Gift Box');
    }, 1200);
  };

  return (
    <section className="relative max-w-[1320px] mx-auto px-6 pt-12 pb-20 overflow-visible">
      {/* Ambient Lighting Glows */}
      <div
        className="hero-glow-anim absolute -top-10 right-[10%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(121,74,207,0.16)_0%,rgba(200,155,88,0.08)_45%,transparent_70%)] blur-[60px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -left-12 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(234,227,242,0.8)_0%,transparent_65%)] blur-[50px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-16">
        {/* Left Editorial Content */}
        <div className="flex flex-col items-start">
          {/* Micro-Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#E8E1F0] px-4 py-1.5 rounded-full text-xs font-semibold text-[#794ACF] shadow-sm mb-6 hover:border-[#794ACF] transition-all">
            <span className="w-2 h-2 rounded-full bg-[#794ACF] relative animate-pulse-dot" />
            <span>✦ Curated From 40+ Ethical Ateliers</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] font-bold text-[#251838] leading-[1.12] tracking-tight mb-5">
            The Fine Art of Gifting,<br />
            <em className="font-normal italic text-[#794ACF] relative inline-block not-italic">
              Rendered Flawlessly.
              <span className="absolute bottom-1 left-0 w-full h-1.5 bg-[#C89B58]/35 rounded-full -z-10" />
            </em>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-[#5C4F6E] leading-relaxed max-w-xl mb-9">
            Bespoke keepsakes, artisan Belgian pralines, Italian leather, and hand-thrown ceramics. Delivered in our signature lavender silk box with your handwritten wax-sealed sentiment.
          </p>

          {/* Dual CTAs */}
          <div className="flex items-center gap-4 mb-10 flex-wrap">
            <a
              href="#catalogSection"
              className="bg-gradient-to-r from-[#794ACF] to-[#5E2EB0] hover:from-[#6332BE] hover:to-[#4E2799] text-white px-8 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2.5 shadow-[0_10px_25px_-5px_rgba(121,74,207,0.4)] hover:shadow-[0_16px_32px_-4px_rgba(121,74,207,0.5)] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Explore Curated Vault</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#conciergeSection"
              className="bg-white hover:bg-[#F0EBF7] text-[#251838] hover:text-[#794ACF] border border-[#E8E1F0] hover:border-[#794ACF] px-7 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C89B58]" />
              <span>Gift Match Concierge</span>
            </a>
          </div>

          {/* Quick Occasions Rail */}
          <div className="flex items-center gap-2.5 flex-wrap pt-5 border-t border-[#E8E1F0] w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A7D9B]">Celebrate:</span>
            {[
              { label: '🎂 Birthday', occ: 'birthday' },
              { label: '🥂 Anniversary', occ: 'anniversary' },
              { label: '💍 Wedding', occ: 'wedding' },
              { label: '🎄 Holidays', occ: 'holidays' },
              { label: '🎓 Graduation', occ: 'graduation' },
            ].map(({ label, occ }) => (
              <button
                key={occ}
                onClick={() => onSelectOccasion && onSelectOccasion(occ)}
                className="bg-white hover:bg-[#794ACF] text-[#251838] hover:text-white border border-[#E8E1F0] hover:border-[#794ACF] px-3.5 py-1.5 rounded-full text-xs font-medium transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Interactive Showcase Stage (Watermelon UI / 21st.dev style) */}
        <div className="relative flex justify-center">
          <div className="bg-white border border-[#E8E1F0] rounded-3xl p-6 shadow-[0_8px_24px_-4px_rgba(37,24,56,0.06),0_0_40px_-5px_rgba(121,74,207,0.2)] w-full max-w-[440px] relative transition-transform duration-300 hover:-translate-y-1">
            {/* Interactive Tab Switcher */}
            <div className="flex bg-[#F4F0F9] border border-[#E8E1F0] rounded-full p-1 mb-5 gap-1" role="tablist">
              {(['luxury', 'handmade', 'chocolate', 'personalized'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 px-2 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-white text-[#794ACF] shadow-sm'
                      : 'text-[#8A7D9B] hover:text-[#251838]'
                  }`}
                >
                  {tab === 'chocolate' ? 'Confection' : tab === 'personalized' ? 'Bespoke' : tab === 'handmade' ? 'Artisan' : tab}
                </button>
              ))}
            </div>

            {/* Featured Image Container */}
            <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-[#F0EBF7] mb-5 group">
              <img
                src={currentItem.image}
                alt={currentItem.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md border border-[#E8E1F0] text-[#251838] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                ✦ {currentItem.tag}
              </div>
              <div className="absolute bottom-3.5 right-3.5 bg-[#251838]/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 text-[#FFC107] fill-[#FFC107]" />
                <span>{currentItem.rating}</span>
              </div>
            </div>

            {/* Info and Pricing */}
            <div className="space-y-2">
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-serif text-lg font-bold text-[#251838] leading-snug">
                  {currentItem.name}
                </h3>
                <span className="text-xl font-bold text-[#794ACF]">
                  ${Number(currentItem.price).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-[#5C4F6E] line-clamp-2 leading-relaxed">
                {currentItem.description}
              </p>

              <div className="pt-2">
                <button
                  onClick={handleAddHeroItem}
                  className={`w-full py-3 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-[#2E7D58] text-white'
                      : 'bg-[#251838] hover:bg-[#794ACF] text-white shadow-sm hover:shadow-[0_4px_14px_rgba(121,74,207,0.35)]'
                  }`}
                >
                  {isAdded ? <Check className="w-4 h-4" /> : <span>+</span>}
                  <span>{btnText}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Floating Trust Tag */}
          <div className="animate-float-bounce absolute -bottom-6 -left-6 bg-white border border-[#E8E1F0] px-4 py-2.5 rounded-2xl shadow-[0_8px_24px_-4px_rgba(37,24,56,0.12)] flex items-center gap-3 z-10">
            <div className="w-8 h-8 rounded-lg bg-[#FDF8F0] text-[#C89B58] flex items-center justify-center text-base">
              🎀
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-[#251838]">Signature Presentation</div>
              <div className="text-[11px] text-[#8A7D9B]">Lavender silk & gold wax seal</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
