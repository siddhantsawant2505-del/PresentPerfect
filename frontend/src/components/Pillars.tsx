import React from 'react';

export default function Pillars() {
  const pillars = [
    {
      icon: '🎀',
      title: 'Lavender Silk Packaging',
      description: 'Every keepsake arrives double-boxed with hand-creased tissue and satin ribbons ready to dazzle.',
    },
    {
      icon: '✍️',
      title: 'Handwritten Calligraphy',
      description: 'Your custom message penned in sepia ink on cotton parchment paper, sealed in real scented wax.',
    },
    {
      icon: '🚚',
      title: 'Guaranteed Delivery',
      description: 'Climate-controlled expedited transport so artisan chocolates and delicate glass arrive pristine.',
    },
    {
      icon: '💎',
      title: 'Ethical Craftsmanship',
      description: 'Partnering directly with master leathercrafters, chocolatiers, and studio ceramicists worldwide.',
    },
  ];

  return (
    <section className="max-w-[1320px] mx-auto px-6 mb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#E8E1F0] hover:border-[#794ACF] rounded-2xl p-7 shadow-sm hover:shadow-[0_8px_24px_-4px_rgba(37,24,56,0.08)] hover:-translate-y-1 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-[#F0EBF7] text-[#794ACF] flex items-center justify-center text-2xl mb-4.5">
              {p.icon}
            </div>
            <h4 className="text-sm font-bold text-[#251838] mb-2">{p.title}</h4>
            <p className="text-xs text-[#5C4F6E] leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
