'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Gift, ShoppingBag, Search, ChevronDown, User, Sparkles } from 'lucide-react';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const { cartCount, openDrawer } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <>
      {/* Top Announcement Bar */}
      <aside className="bg-gradient-to-r from-[#251838] via-[#361F54] to-[#251838] text-[#F8F6FB] text-xs font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-3">
        <span className="bg-[#C89B58]/20 border border-[#C89B58]/40 text-[#EAC78D] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          Complimentary
        </span>
        <span>Every order includes our signature lavender silk box & handwritten wax-sealed calligraphy card</span>
      </aside>

      {/* Sticky Boutique Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F6FB]/90 backdrop-blur-md shadow-[0_4px_20px_rgba(37,24,56,0.06)] border-b border-[#E8E1F0]'
            : 'bg-[#F8F6FB]/70 backdrop-blur-sm border-b border-[#E8E1F0]'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-6 py-3.5 flex items-center justify-between gap-5">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#794ACF] to-[#4E2799] flex items-center justify-center text-white shadow-[0_4px_14px_rgba(121,74,207,0.35)] relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <Gift className="w-5 h-5" />
              <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
            </div>
            <span className="font-serif text-2xl font-bold text-[#251838] tracking-tight">
              Present<em className="text-[#794ACF] font-semibold italic ml-0.5">Perfect</em>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-semibold text-[#794ACF] hover:text-[#6332BE] transition-colors"
            >
              Boutique
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-sm font-medium text-[#251838] hover:text-[#794ACF] py-2 transition-colors">
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 w-72 bg-white border border-[#E8E1F0] rounded-2xl shadow-[0_24px_48px_-12px_rgba(37,24,56,0.16)] p-3.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#8A7D9B] px-2.5 pb-2">
                  Curated Gift Collections
                </div>
                <div className="space-y-1">
                  <Link
                    href="/categories?category=luxury"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F4F0F9] text-[#251838] hover:text-[#794ACF] transition-colors"
                  >
                    <span className="text-lg">💎</span>
                    <div>
                      <div className="text-xs font-semibold">Luxury Gifts</div>
                      <div className="text-[11px] text-[#8A7D9B]">Watches, leather & decanters</div>
                    </div>
                  </Link>
                  <Link
                    href="/categories?category=handmade"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F4F0F9] text-[#251838] hover:text-[#794ACF] transition-colors"
                  >
                    <span className="text-lg">🌿</span>
                    <div>
                      <div className="text-xs font-semibold">Handmade Gifts</div>
                      <div className="text-[11px] text-[#8A7D9B]">Studio pottery & woodwork</div>
                    </div>
                  </Link>
                  <Link
                    href="/categories?category=chocolate"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F4F0F9] text-[#251838] hover:text-[#794ACF] transition-colors"
                  >
                    <span className="text-lg">🍫</span>
                    <div>
                      <div className="text-xs font-semibold">Belgian Chocolates</div>
                      <div className="text-[11px] text-[#8A7D9B]">Grand cru truffles & confections</div>
                    </div>
                  </Link>
                  <Link
                    href="/categories?category=personalized"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F4F0F9] text-[#251838] hover:text-[#794ACF] transition-colors"
                  >
                    <span className="text-lg">✨</span>
                    <div>
                      <div className="text-xs font-semibold">Personalized Keepsakes</div>
                      <div className="text-[11px] text-[#8A7D9B]">Laser engraved & monogrammed</div>
                    </div>
                  </Link>
                  <Link
                    href="/categories?category=fashion"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F4F0F9] text-[#251838] hover:text-[#794ACF] transition-colors"
                  >
                    <span className="text-lg">⌚</span>
                    <div>
                      <div className="text-xs font-semibold">Fashion Accessories</div>
                      <div className="text-[11px] text-[#8A7D9B]">Mulberry silk & rose vermeil</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/orders"
              className="text-sm font-medium text-[#251838] hover:text-[#794ACF] transition-colors"
            >
              My Orders
            </Link>
          </nav>

          {/* Search Input */}
          <div className="relative hidden sm:block w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search curated gifts or occasions..."
              className="w-full bg-white border border-[#E8E1F0] rounded-full py-2 pl-4 pr-10 text-xs text-[#251838] placeholder-[#8A7D9B] outline-none shadow-sm focus:border-[#794ACF] focus:ring-2 focus:ring-[#794ACF]/15 transition-all"
            />
            <Search className="w-3.5 h-3.5 text-[#8A7D9B] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Drawer Trigger */}
            <button
              onClick={openDrawer}
              className="flex items-center gap-2 bg-white border border-[#E8E1F0] hover:border-[#794ACF] hover:bg-[#F0EBF7] text-[#251838] hover:text-[#794ACF] px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer"
              aria-label="View Shopping Box"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Box</span>
              <span className="bg-[#794ACF] text-white text-[11px] font-bold px-2 py-0.5 rounded-full min-w-4 text-center">
                {cartCount}
              </span>
            </button>

            {/* Auth Button */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-[#5C4F6E] hover:text-[#C24141] px-3 py-2 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-[#251838] hover:bg-[#794ACF] text-white px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm hover:shadow-[0_4px_16px_rgba(121,74,207,0.3)] flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
