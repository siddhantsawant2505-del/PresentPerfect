import React from 'react';
import Link from 'next/link';
import { Gift } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E8E1F0] pt-16 pb-8">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#794ACF] to-[#4E2799] flex items-center justify-center text-white">
                <Gift className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold text-[#251838]">
                Present<em className="text-[#794ACF] font-semibold italic ml-0.5">Perfect</em>
              </span>
            </Link>
            <p className="text-xs text-[#5C4F6E] leading-relaxed max-w-xs">
              Reimagining modern gifting as an intimate, emotional ritual. Handcrafted with reverence for life’s grandest milestones.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#251838] mb-4">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-[#5C4F6E]">
              <li><Link href="/categories?category=luxury" className="hover:text-[#794ACF] transition-colors">Haute Luxury</Link></li>
              <li><Link href="/categories?category=handmade" className="hover:text-[#794ACF] transition-colors">Studio Pottery & Wood</Link></li>
              <li><Link href="/categories?category=chocolate" className="hover:text-[#794ACF] transition-colors">Grand Cru Chocolates</Link></li>
              <li><Link href="/categories?category=personalized" className="hover:text-[#794ACF] transition-colors">Custom Monograms</Link></li>
              <li><Link href="/categories?category=fashion" className="hover:text-[#794ACF] transition-colors">Mulberry Silk Accents</Link></li>
            </ul>
          </div>

          {/* Celebrations */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#251838] mb-4">
              Celebrations
            </h5>
            <ul className="space-y-2.5 text-xs text-[#5C4F6E]">
              <li><Link href="/categories?occasion=anniversary" className="hover:text-[#794ACF] transition-colors">Anniversaries</Link></li>
              <li><Link href="/categories?occasion=birthday" className="hover:text-[#794ACF] transition-colors">Birthdays</Link></li>
              <li><Link href="/categories?occasion=wedding" className="hover:text-[#794ACF] transition-colors">Weddings</Link></li>
              <li><Link href="/categories?occasion=holidays" className="hover:text-[#794ACF] transition-colors">Winter Holidays</Link></li>
              <li><Link href="/categories?occasion=graduation" className="hover:text-[#794ACF] transition-colors">Graduations</Link></li>
            </ul>
          </div>

          {/* Boutique Services */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#251838] mb-4">
              Boutique Services
            </h5>
            <ul className="space-y-2.5 text-xs text-[#5C4F6E]">
              <li><Link href="/orders" className="hover:text-[#794ACF] transition-colors">Track Order</Link></li>
              <li><Link href="/cart" className="hover:text-[#794ACF] transition-colors">Gift Box Summary</Link></li>
              <li><Link href="/login" className="hover:text-[#794ACF] transition-colors">Client Account</Link></li>
              <li><Link href="/register" className="hover:text-[#794ACF] transition-colors">Join Atelier Circle</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E8E1F0] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7D9B] gap-3">
          <div>© 2026 PresentPerfect Ateliers Inc. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Lavender & Amethyst Silk Edition</span>
            <span>•</span>
            <span>Next.js + Django REST Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
