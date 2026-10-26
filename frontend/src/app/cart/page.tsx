'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { ArrowRight, Trash2, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cart, subtotal, updateQuantity, removeFromCart } = useCart();
  const courierShipping = cart.length > 0 ? 9.99 : 0;
  const grandTotal = subtotal + courierShipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1200px] mx-auto px-6 py-12 w-full">
        <div className="mb-8">
          <span className="text-xs font-bold text-[#794ACF] uppercase tracking-wider block mb-1">
            Your Celebration Bag
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#251838]">
            Curated Gift Box Summary
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-9 items-start">
          {/* Cart Table Card */}
          <div className="bg-white border border-[#E8E1F0] rounded-3xl p-7 shadow-sm">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-[#8A7D9B]">
                <div className="text-4xl mb-3">🎀</div>
                <h3 className="font-serif text-xl font-bold text-[#251838] mb-1">
                  Your gift box is currently empty
                </h3>
                <p className="text-xs text-[#5C4F6E] mb-6">
                  Explore our curated collection to begin creating a memorable celebration.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-[#251838] hover:bg-[#794ACF] text-white px-6 py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Boutique</span>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[#E8E1F0]">
                {cart.map((item) => (
                  <div key={item.id} className="py-4.5 first:pt-0 last:pb-0 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover bg-[#F4F0F9] border border-[#E8E1F0]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-bold text-[#251838] truncate mb-0.5">
                        {item.name}
                      </h4>
                      <p className="text-xs font-bold text-[#794ACF]">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Pills */}
                    <div className="flex items-center bg-[#F4F0F9] border border-[#E8E1F0] rounded-full p-1 gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-full bg-white text-[#251838] font-bold text-xs flex items-center justify-center hover:bg-[#794ACF] hover:text-white transition-colors cursor-pointer shadow-xs"
                      >
                        −
                      </button>
                      <span className="text-xs font-bold text-[#251838] min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-full bg-white text-[#251838] font-bold text-xs flex items-center justify-center hover:bg-[#794ACF] hover:text-white transition-colors cursor-pointer shadow-xs"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-16">
                      <span className="font-bold text-sm text-[#251838]">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#8A7D9B] hover:text-[#C24141] transition-colors p-1 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Card */}
          <div className="bg-white border border-[#E8E1F0] rounded-3xl p-7 shadow-sm sticky top-28 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#251838]">
              Celebration Order
            </h3>

            <div className="space-y-2.5 text-xs text-[#5C4F6E] pt-2">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#251838]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Lavender Silk Box Packaging</span>
                <span className="font-semibold text-[#2E7D58]">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Handwritten Wax Calligraphy</span>
                <span className="font-semibold text-[#2E7D58]">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Climate-Safe Courier</span>
                <span className="font-semibold text-[#251838]">${courierShipping.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-[#E8E1F0] pt-4 flex justify-between items-center text-sm font-bold text-[#251838]">
              <span>Estimated Total</span>
              <span className="text-2xl text-[#794ACF]">${grandTotal.toFixed(2)}</span>
            </div>

            <Link
              href={cart.length > 0 ? '/checkout' : '#'}
              className={`w-full py-3.5 px-6 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                cart.length > 0
                  ? 'bg-[#794ACF] hover:bg-[#6332BE] text-white shadow-[0_4px_14px_rgba(121,74,207,0.35)]'
                  : 'bg-gray-200 text-gray-400 pointer-events-none'
              }`}
            >
              <span>Proceed to Courier & Packaging</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8A7D9B] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#2E7D58]" />
              <span>Guaranteed Safe 256-Bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
