'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { X, ArrowRight, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { cart, subtotal, isDrawerOpen, closeDrawer, addToCart, removeFromCart } = useCart();

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop with subtle blur crossfade */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 bg-[#1E142B]/40 backdrop-blur-xs transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* Drawer Stage with Emil Vaul/Ionic Spring Curve */}
      <div
        className="relative w-full max-w-md bg-white h-full shadow-[ -12px_0_40px_rgba(30,20,43,0.12)] flex flex-col z-10 drawer-enter border-l border-[#EBE4F2]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawerTitle"
      >
        {/* Top Tactile Drag Pill Indicator */}
        <div className="pt-2 flex justify-center sm:hidden">
          <div className="w-10 h-1 rounded-full bg-[#EBE4F2]" />
        </div>

        {/* Drawer Header */}
        <div className="px-6 py-4.5 border-b border-[#F5F1FA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FAF8FD] border border-[#EBE4F2] flex items-center justify-center text-[#6E39C4]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 id="drawerTitle" className="font-serif text-base font-bold text-[#1E142B]">
                Your Presentation Box
              </h3>
              <p className="text-[11px] text-[#8C7F9D]">
                {cart.length} unique {cart.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={closeDrawer}
            className="w-8 h-8 rounded-full bg-[#FAF8FD] hover:bg-[#F2ECFA] border border-[#EBE4F2] flex items-center justify-center text-[#5D506F] hover:text-[#1E142B] transition-colors press-icon cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body - Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 divide-y divide-[#F5F1FA]">
          {cart.length === 0 ? (
            <div className="text-center py-20 text-[#8C7F9D]">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8FD] border border-[#EBE4F2] mx-auto flex items-center justify-center text-2xl mb-3">
                🎀
              </div>
              <p className="font-serif font-bold text-base text-[#1E142B] mb-1">
                Your Presentation Box is Empty
              </p>
              <p className="text-xs text-[#5D506F] max-w-xs mx-auto leading-relaxed">
                Explore our curated vault and add bespoke keepsakes to delight someone special.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3.5">
                {/* Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FAF8FD] border border-[#EBE4F2] shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#8C7F9D]">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-semibold text-[#1E142B] truncate leading-tight">
                    {item.name}
                  </h4>
                  <div className="text-xs font-bold text-[#6E39C4] mt-0.5 tabular-nums">
                    ${Number(item.price).toFixed(2)}
                  </div>
                </div>

                {/* Tactile Quantity Stepper */}
                <div className="flex items-center gap-2 bg-[#FAF8FD] border border-[#EBE4F2] rounded-full px-2 py-1">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-5 h-5 rounded-full hover:bg-white flex items-center justify-center text-[#8C7F9D] hover:text-[#B83A3A] transition-colors press-icon cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    {item.quantity === 1 ? <Trash2 className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  </button>
                  <span className="text-xs font-bold text-[#1E142B] w-4 text-center tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-5 h-5 rounded-full hover:bg-white flex items-center justify-center text-[#8C7F9D] hover:text-[#6E39C4] transition-colors press-icon cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#EBE4F2] bg-[#FAF8FD]">
            {/* Packaging summary pill */}
            <div className="bg-white border border-[#EBE4F2] rounded-xl p-3 mb-4 flex items-center justify-between text-xs">
              <span className="text-[#5D506F]">Maison Packaging:</span>
              <span className="font-semibold text-[#257850]">Complimentary ($0.00)</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C7F9D]">
                Box Subtotal
              </span>
              <span className="text-xl font-bold text-[#1E142B] tabular-nums">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <Link
              href="/cart"
              onClick={closeDrawer}
              className="w-full bg-[#1E142B] hover:bg-[#140C1E] text-white py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-xs press-tactile cursor-pointer"
            >
              <span>Review Calligraphy & Delivery</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E7C58E]" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
