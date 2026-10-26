'use client';

import React from 'react';
import { Package, Feather, ShieldCheck, Gem } from 'lucide-react';

export default function Pillars() {
  const pillars = [
    {
      icon: Package,
      badge: 'Packaging',
      title: 'Lavender Silk Presentation',
      description: 'Double-boxed in heavyweight linen-embossed cardstock with hand-creased tissue and double-faced French satin ribbon.',
    },
    {
      icon: Feather,
      badge: 'Calligraphy',
      title: 'Hand-Penned Sentiment',
      description: 'Your words transcribed by studio calligraphers in sepia ink on deckle-edged cotton paper, finished with a warm gold wax seal.',
    },
    {
      icon: ShieldCheck,
      badge: 'Transport',
      title: 'Climate-Guaranteed Courier',
      description: 'Temperature-insulated expedited transit ensuring artisanal chocolates, fine crystal, and studio ceramics arrive in pristine form.',
    },
    {
      icon: Gem,
      badge: 'Provenance',
      title: 'Ethical Master Ateliers',
      description: 'Commissioned exclusively from accredited family workshops, generational glassblowers, and independent chocolatiers.',
    },
  ];

  return (
    <section className="max-w-[1360px] mx-auto px-6 mb-28">
      <div className="border-t border-b border-[#EBE4F2] py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="flex flex-col items-start group">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8FD] border border-[#EBE4F2] group-hover:border-[#6E39C4]/40 flex items-center justify-center text-[#6E39C4] mb-4 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8C7F9D] mb-1">
                  {p.badge}
                </span>
                <h4 className="font-serif text-base font-bold text-[#1E142B] mb-2 leading-snug">
                  {p.title}
                </h4>
                <p className="text-xs text-[#5D506F] leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
