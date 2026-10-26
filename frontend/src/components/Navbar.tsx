'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Gift, ShoppingBag, Search, ChevronDown, User, LogOut, Check } from 'lucide-react';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const { cartCount, openDrawer } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (onSearch) onSearch(q);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    window.location.reload();
  };

  const categoryLinks = [
    { name: 'Haute Luxury & Keepsakes', slug: 'luxury', desc: 'Handcrafted watches, Italian leather, crystal' },
    { name: 'Artisanal & Studio Craft', slug: 'handmade', desc: 'Master joinery walnut boxes & Belgian linen' },
    { name: 'Grand Cru Chocolates', slug: 'chocolate', desc: 'Single-origin Belgian pralines & truffles' },
    { name: 'Bespoke Personalized Gifts', slug: 'personalized', desc: 'Engraved pens, etched crystal & monograms' },
    { name: 'Mulberry Silk & Adornments', slug: 'fashion', desc: 'Fine silk twill, rose vermeil & classic timepieces' },
  ];

  return (
    <>
      {/* Top Quiet Editorial Announcement */}
      <aside className="bg-[#1E142B] text-[#FAF8FD] text-[11px] font-medium py-2 px-6 text-center tracking-wide flex items-center justify-center gap-3 border-b border-[#2C1F3F]">
        <span className="bg-[#C29352]/20 text-[#E7C58E] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          Maison Standard
        </span>
        <span className="text-white/85">
          Complimentary lavender silk presentation box, hand-creased tissue & wax-sealed calligraphy sentiment with every order
        </span>
      </aside>

      {/* Sticky Boutique Header */}
      <header
        className={`sticky top-0 z-40 transition-[background-color,border-color,box-shadow] duration-200 ${
          isScrolled
            ? 'bg-[#FAF8FD]/92 backdrop-blur-md border-b border-[#EBE4F2] shadow-[0_2px_12px_rgba(30,20,43,0.04)]'
            : 'bg-[#FAF8FD]/80 backdrop-blur-sm border-b border-[#EBE4F2]/60'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 h-18 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group press-tactile">
            <div className="w-9 h-9 rounded-xl bg-[#1E142B] flex items-center justify-center text-[#E7C58E] shadow-[0_2px_8px_rgba(30,20,43,0.15)] border border-[#C29352]/30 transition-transform duration-150 group-hover:scale-105">
              <Gift className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold tracking-[-0.02em] text-[#1E142B] leading-none">
                Present<span className="text-[#6E39C4] font-normal italic ml-0.5">Perfect</span>
              </span>
              <span className="text-[9.5px] uppercase tracking-[0.2em] font-bold text-[#8C7F9D] mt-0.5">
                Artisan Gifting Atelier
              </span>
            </div>
          </Link>

          {/* Navigation Links with Origin-Aware Popover */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#5D506F]">
            <Link
              href="/"
              className="text-[#6E39C4] font-semibold hover:text-[#5A29A6] transition-colors py-1 press-tactile"
            >
              Collection
            </Link>

            {/* Categories Origin-Aware Popover */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCategoriesOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer press-tactile ${
                  categoriesOpen ? 'text-[#6E39C4] font-semibold' : 'text-[#1E142B] hover:text-[#6E39C4]'
                }`}
                aria-expanded={categoriesOpen}
              >
                <span>Curated Ateliers</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    categoriesOpen ? 'rotate-180 text-[#6E39C4]' : 'text-[#8C7F9D]'
                  }`}
                />
              </button>

              {categoriesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-80 bg-white border border-[#EBE4F2] rounded-2xl shadow-[0_16px_36px_-6px_rgba(30,20,43,0.12)] p-2.5 z-50 popover-enter"
                  style={{ '--transform-origin': 'top left' } as React.CSSProperties}
                >
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8C7F9D] px-3 py-1.5 border-b border-[#F5F1FA]">
                    Signature Vaults
                  </div>
                  <div className="pt-1.5 space-y-0.5">
                    {categoryLinks.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/categories?category=${cat.slug}`}
                        onClick={() => setCategoriesOpen(false)}
                        className="group flex flex-col px-3 py-2 rounded-xl hover:bg-[#F7F3FC] transition-colors press-tactile"
                      >
                        <span className="text-[12.5px] font-semibold text-[#1E142B] group-hover:text-[#6E39C4] transition-colors">
                          {cat.name}
                        </span>
                        <span className="text-[11px] text-[#8C7F9D] line-clamp-1 mt-0.5">
                          {cat.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#F5F1FA] px-3 pb-1">
                    <Link
                      href="/categories"
                      onClick={() => setCategoriesOpen(false)}
                      className="text-[11.5px] font-semibold text-[#6E39C4] hover:text-[#5A29A6] flex items-center justify-between"
                    >
                      <span>View Complete Atelier Directory</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#atelierMatcher"
              className="hover:text-[#6E39C4] transition-colors py-1 press-tactile"
            >
              Concierge Matcher
            </a>
            <Link
              href="/orders"
              className="hover:text-[#6E39C4] transition-colors py-1 press-tactile"
            >
              Order Status
            </Link>
          </nav>

          {/* Right Action Tray: Search, Auth, Cart */}
          <div className="flex items-center gap-3">
            {/* Search Input Bar */}
            <div className="relative hidden lg:block w-52 xl:w-60">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search bespoke gifts..."
                className="w-full bg-white border border-[#EBE4F2] focus:border-[#6E39C4] rounded-full pl-9 pr-3.5 py-1.5 text-xs text-[#1E142B] placeholder:text-[#8C7F9D] outline-none transition-[border-color,box-shadow] focus:ring-2 focus:ring-[#6E39C4]/15"
              />
              <Search className="w-3.5 h-3.5 text-[#8C7F9D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Auth Button */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2 bg-white border border-[#EBE4F2] rounded-full pl-3 pr-2 py-1 shadow-xs">
                <span className="text-xs font-semibold text-[#1E142B]">Atelier Patron</span>
                <button
                  onClick={handleLogout}
                  className="w-6 h-6 rounded-full hover:bg-[#F2ECFA] text-[#8C7F9D] hover:text-[#B83A3A] flex items-center justify-center transition-colors press-icon cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E142B] hover:text-[#6E39C4] bg-white border border-[#EBE4F2] hover:border-[#6E39C4]/40 px-3.5 py-2 rounded-full shadow-xs press-tactile"
              >
                <User className="w-3.5 h-3.5 text-[#8C7F9D]" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Cart Drawer Trigger Button with Emil Tactile Press */}
            <button
              onClick={openDrawer}
              className="relative bg-[#1E142B] hover:bg-[#140C1E] text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shadow-[0_2px_8px_rgba(30,20,43,0.12)] press-tactile cursor-pointer"
              aria-label="Open Cart Drawer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#E7C58E]" />
              <span className="hidden sm:inline">Gift Box</span>
              <span className="bg-[#6E39C4] text-white text-[10.5px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
