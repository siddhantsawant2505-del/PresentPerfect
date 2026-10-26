import React from 'react';
import Link from 'next/link';
import { Gift } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#EBE4F2] pt-16 pb-12">
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group press-tactile inline-flex">
              <div className="w-8 h-8 rounded-xl bg-[#1E142B] flex items-center justify-center text-[#E7C58E] border border-[#C29352]/30">
                <Gift className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#1E142B]">
                Present<span className="text-[#6E39C4] font-normal italic ml-0.5">Perfect</span>
              </span>
            </Link>
            <p className="text-xs text-[#5D506F] leading-relaxed max-w-sm mb-4">
              Reimagining modern gifting as an intimate, emotional ritual. Handcrafted keepsakes, Belgian confections, and bespoke calligraphy for life’s grandest milestones.
            </p>
            <div className="text-[11px] text-[#8C7F9D]">
              European Concierge Desk · Paris · London · Milan
            </div>
          </div>

          {/* Collections */}
          <div>
            <h5 className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1E142B] mb-4">
              Signature Vaults
            </h5>
            <ul className="space-y-2.5 text-xs text-[#5D506F]">
              <li><Link href="/categories?category=luxury" className="hover:text-[#6E39C4] transition-colors">Haute Luxury & Heirlooms</Link></li>
              <li><Link href="/categories?category=handmade" className="hover:text-[#6E39C4] transition-colors">Artisanal Studio Ceramics</Link></li>
              <li><Link href="/categories?category=chocolate" className="hover:text-[#6E39C4] transition-colors">Grand Cru Chocolates</Link></li>
              <li><Link href="/categories?category=personalized" className="hover:text-[#6E39C4] transition-colors">Monogrammed Keepsakes</Link></li>
              <li><Link href="/categories?category=fashion" className="hover:text-[#6E39C4] transition-colors">Mulberry Silk Accents</Link></li>
            </ul>
          </div>

          {/* Celebrations */}
          <div>
            <h5 className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1E142B] mb-4">
              Celebrations
            </h5>
            <ul className="space-y-2.5 text-xs text-[#5D506F]">
              <li><Link href="/categories?occasion=anniversary" className="hover:text-[#6E39C4] transition-colors">Romantic Anniversaries</Link></li>
              <li><Link href="/categories?occasion=birthday" className="hover:text-[#6E39C4] transition-colors">Milestone Birthdays</Link></li>
              <li><Link href="/categories?occasion=wedding" className="hover:text-[#6E39C4] transition-colors">Grand Nuptials</Link></li>
              <li><Link href="/categories?occasion=holidays" className="hover:text-[#6E39C4] transition-colors">Winter Holidays</Link></li>
              <li><Link href="/categories?occasion=graduation" className="hover:text-[#6E39C4] transition-colors">Academic Honors</Link></li>
            </ul>
          </div>

          {/* Maison Services */}
          <div>
            <h5 className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1E142B] mb-4">
              Maison Services
            </h5>
            <ul className="space-y-2.5 text-xs text-[#5D506F]">
              <li><Link href="/orders" className="hover:text-[#6E39C4] transition-colors">Track Consignment</Link></li>
              <li><Link href="/cart" className="hover:text-[#6E39C4] transition-colors">Review Presentation Box</Link></li>
              <li><Link href="/login" className="hover:text-[#6E39C4] transition-colors">Patron Account Sign In</Link></li>
              <li><Link href="/register" className="hover:text-[#6E39C4] transition-colors">Register for Concierge</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#F5F1FA] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7F9D] gap-3">
          <div>© 2026 PresentPerfect Ateliers Inc. All rights reserved.</div>
          <div className="flex items-center gap-5 text-[11px]">
            <span>Amethyst Silk & Champagne Gold Edition</span>
            <span>·</span>
            <span>Ethical Provenance Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
