'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { ArrowRight, Trash2, ArrowLeft, ShieldCheck, Gift, CheckCircle2 } from 'lucide-react';

export default function CartPage() {
  const { cart, subtotal, updateQuantity, removeFromCart } = useCart();
  const courierShipping = cart.length > 0 ? 9.99 : 0;
  const grandTotal = subtotal + courierShipping;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FD]">
      <Navbar />

      <main className="flex-1 max-w-[1260px] mx-auto px-6 py-12 w-full">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#F2ECFA] text-[#6E39C4] px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2">
            <span>Atelier Consignment</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E142B] tracking-tight">
            Your Presentation Box
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
          {/* Cart Table Card */}
          <div className="bg-white border border-[#EBE4F2] rounded-3xl p-7 shadow-subtle">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-[#8C7F9D]">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8FD] border border-[#EBE4F2] mx-auto flex items-center justify-center text-2xl mb-3">
                  🎀
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1E142B] mb-1">
                  Your Presentation Box is Empty
                </h3>
                <p className="text-xs text-[#5D506F] mb-6 max-w-sm mx-auto leading-relaxed">
                  Explore our curated collection to compose an unforgettable celebration.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-[#1E142B] hover:bg-[#140C1E] text-white px-6 py-2.5 rounded-full text-xs font-semibold press-tactile shadow-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Atelier Vault</span>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[#F5F1FA]">
                {cart.map((item) => (
                  <div key={item.id} className="py-4.5 first:pt-0 last:pb-0 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover bg-[#FAF8FD] border border-[#EBE4F2] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7F9D]">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-[#1E142B] truncate mb-0.5">
                        {item.name}
                      </h4>
                      <p className="text-xs font-bold text-[#6E39C4] tabular-nums">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Pills */}
                    <div className="flex items-center bg-[#FAF8FD] border border-[#EBE4F2] rounded-full p-1 gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-full bg-white text-[#1E142B] font-bold text-xs flex items-center justify-center hover:bg-[#6E39C4] hover:text-white transition-colors cursor-pointer press-icon shadow-xs"
                      >
                        −
                      </button>
                      <span className="text-xs font-bold text-[#1E142B] min-w-4 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-full bg-white text-[#1E142B] font-bold text-xs flex items-center justify-center hover:bg-[#6E39C4] hover:text-white transition-colors cursor-pointer press-icon shadow-xs"
                      >
                        +
                      </button>
                    </div>

                    {/* Total item cost */}
                    <div className="text-right min-w-16">
                      <span className="text-sm font-bold text-[#1E142B] tabular-nums">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#8C7F9D] hover:text-[#B83A3A] transition-colors p-1 press-icon cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Breakdown Card */}
          <div className="bg-white border border-[#EBE4F2] rounded-3xl p-7 shadow-subtle flex flex-col gap-5">
            <h3 className="font-serif text-lg font-bold text-[#1E142B]">
              Order Summary
            </h3>

            {/* Packaging included benefit */}
            <div className="bg-[#FAF8FD] border border-[#EBE4F2] rounded-2xl p-4 flex items-start gap-3">
              <Gift className="w-5 h-5 text-[#6E39C4] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-[#1E142B]">Signature Presentation Box</h5>
                <p className="text-[11px] text-[#5D506F] mt-0.5 leading-relaxed">
                  Complimentary double-box packaging, French satin ribbon, and personalized calligraphy sentiment included.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#5D506F] pt-2 border-t border-[#F5F1FA]">
              <div className="flex justify-between items-center">
                <span>Treasures Subtotal</span>
                <span className="font-semibold text-[#1E142B] tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Maison Silk Presentation</span>
                <span className="font-semibold text-[#257850]">Complimentary ($0.00)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Handwritten Wax-Sealed Note</span>
                <span className="font-semibold text-[#257850]">Complimentary ($0.00)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Expedited Climate Courier</span>
                <span className="font-semibold text-[#1E142B] tabular-nums">${courierShipping.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-[#EBE4F2] flex justify-between items-center text-sm">
                <span className="font-bold text-[#1E142B]">Grand Total</span>
                <span className="text-2xl font-bold text-[#6E39C4] tabular-nums">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {cart.length > 0 ? (
              <Link
                href="/checkout"
                className="w-full bg-[#1E142B] hover:bg-[#140C1E] text-white py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-xs press-tactile cursor-pointer"
              >
                <span>Proceed to Calligraphy & Delivery</span>
                <ArrowRight className="w-4 h-4 text-[#E7C58E]" />
              </Link>
            ) : (
              <button
                disabled
                className="w-full bg-[#EBE4F2] text-[#8C7F9D] py-3.5 rounded-full text-xs font-semibold cursor-not-allowed text-center"
              >
                Box Is Currently Empty
              </button>
            )}

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C7F9D] pt-2 border-t border-[#F5F1FA]">
              <ShieldCheck className="w-4 h-4 text-[#257850]" />
              <span>Insured Transit & Guaranteed Delivery</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
