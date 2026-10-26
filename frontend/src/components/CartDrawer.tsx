'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { X, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const { cart, subtotal, isDrawerOpen, closeDrawer, removeFromCart } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 bg-[#251838]/45 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-[ -10px_0_30px_rgba(37,24,56,0.15)] flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E8E1F0] flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-[#251838]">
            Your Curated Gift Box
          </h3>
          <button
            onClick={closeDrawer}
            className="w-8 h-8 rounded-full bg-[#F4F0F9] border border-[#E8E1F0] flex items-center justify-center text-[#5C4F6E] hover:text-[#251838] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-[#8A7D9B]">
              <div className="text-4xl mb-2">🎀</div>
              <p className="font-semibold text-sm text-[#251838] mb-1">
                Your gift box is currently empty
              </p>
              <p className="text-xs">
                Add curated artisan treasures to celebrate someone special.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 pb-3.5 border-b border-[#E8E1F0]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover bg-[#F4F0F9] border border-[#E8E1F0]"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-semibold text-[#251838] truncate mb-0.5">
                    {item.name}
                  </h5>
                  <p className="text-xs font-bold text-[#794ACF]">
                    ${Number(item.price).toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-base text-[#8A7D9B] hover:text-[#C24141] transition-colors p-1 cursor-pointer"
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#E8E1F0] bg-[#F4F0F9]">
          <div className="flex items-center justify-between mb-4 text-sm font-bold text-[#251838]">
            <span>Items Subtotal</span>
            <span className="text-xl text-[#794ACF]">${subtotal.toFixed(2)}</span>
          </div>

          <Link
            href="/cart"
            onClick={closeDrawer}
            className="w-full bg-[#794ACF] hover:bg-[#6332BE] text-white py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(121,74,207,0.35)] transition-all cursor-pointer"
          >
            <span>Proceed to Packaging & Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
