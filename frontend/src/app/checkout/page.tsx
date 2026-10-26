'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/api';
import { ShieldCheck, ArrowRight, Feather, Lock, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart, showToast } = useCart();

  const [recipientName, setRecipientName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [calligraphyNote, setCalligraphyNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank'>('card');
  const [submitting, setSubmitting] = useState(false);

  const grandTotal = subtotal + (cart.length > 0 ? 9.99 : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your gift box is empty.');
      return;
    }

    setSubmitting(true);

    try {
      await createOrder({
        recipient_name: recipientName,
        delivery_date: deliveryDate,
        delivery_address: deliveryAddress,
        calligraphy_note: calligraphyNote,
        cart: cart,
        total_amount: grandTotal,
        payment_method: paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Bank Wire',
      });

      const existing = JSON.parse(localStorage.getItem('orders') || '[]');
      existing.push({
        recipient: recipientName,
        items: cart,
        total: `$${grandTotal.toFixed(2)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Preparing Signature Lavender Packaging',
      });
      localStorage.setItem('orders', JSON.stringify(existing));

      clearCart();
      showToast('Consignment Confirmed');
      router.push('/orders');
    } catch (err) {
      console.error('Error creating order:', err);
      const existing = JSON.parse(localStorage.getItem('orders') || '[]');
      existing.push({
        recipient: recipientName,
        items: cart,
        total: `$${grandTotal.toFixed(2)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Preparing Signature Lavender Packaging',
      });
      localStorage.setItem('orders', JSON.stringify(existing));
      clearCart();
      showToast('Consignment Confirmed (Local Archive)');
      router.push('/orders');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FD]">
      <Navbar />

      <main className="flex-1 max-w-[1260px] mx-auto px-6 py-12 w-full">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#F2ECFA] text-[#6E39C4] px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2">
            <span>Bespoke Dispatch Desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E142B] tracking-tight">
            Finalize Your Consignment
          </h1>
          <p className="text-xs sm:text-sm text-[#5D506F] mt-1">
            Specify recipient coordinates and pen your sentiment for our master calligrapher.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
          {/* Main Checkout Fields */}
          <div className="space-y-6">
            
            {/* 1. Recipient Coordinates */}
            <div className="bg-white border border-[#EBE4F2] rounded-3xl p-7 shadow-subtle">
              <h3 className="font-serif text-lg font-bold text-[#1E142B] mb-5">
                1. Recipient & Courier Transit
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8C7F9D]">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Lady Vivienne Montgomery"
                    className="bg-[#FAF8FD] border border-[#EBE4F2] focus:border-[#6E39C4] focus:bg-white rounded-xl px-4 py-2.5 text-xs text-[#1E142B] outline-none transition-[border-color,background-color]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8C7F9D]">
                    Celebration Arrival Date
                  </label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="bg-[#FAF8FD] border border-[#EBE4F2] focus:border-[#6E39C4] focus:bg-white rounded-xl px-4 py-2 text-xs text-[#1E142B] outline-none transition-[border-color,background-color]"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8C7F9D]">
                    Full Delivery Address & Residence
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Suite, Building Name, Street Address, City, Postal Code"
                    className="bg-[#FAF8FD] border border-[#EBE4F2] focus:border-[#6E39C4] focus:bg-white rounded-xl px-4 py-2.5 text-xs text-[#1E142B] outline-none resize-none transition-[border-color,background-color]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Calligrapher's Parchment Note */}
            <div className="bg-white border border-[#EBE4F2] rounded-3xl p-7 shadow-subtle">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Feather className="w-4 h-4 text-[#C29352]" />
                  <h3 className="font-serif text-lg font-bold text-[#1E142B]">
                    2. Calligraphy Card Sentiment
                  </h3>
                </div>
                <span className="text-[10.5px] font-bold text-[#257850] uppercase tracking-wider">
                  Complimentary
                </span>
              </div>
              <p className="text-xs text-[#5D506F] mb-3 leading-relaxed">
                Our in-house calligrapher transcribes your words in sepia archival ink on 300gsm French cotton rag paper, sealed with gold wax.
              </p>
              <textarea
                rows={3}
                value={calligraphyNote}
                onChange={(e) => setCalligraphyNote(e.target.value)}
                placeholder="Pen your message here... e.g. 'Dearest Camille, celebrating your grace and timeless joy. Forever yours, Julian.'"
                className="w-full bg-[#FBF6EE]/70 border border-[#C29352]/30 focus:border-[#C29352] rounded-xl p-4 text-xs font-serif text-[#1E142B] italic outline-none resize-none leading-relaxed"
              />
            </div>

            {/* 3. Secure Payment Method */}
            <div className="bg-white border border-[#EBE4F2] rounded-3xl p-7 shadow-subtle">
              <h3 className="font-serif text-lg font-bold text-[#1E142B] mb-4">
                3. Payment Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'Credit Card / Apple Pay' },
                  { id: 'paypal', label: 'PayPal Checkout' },
                  { id: 'bank', label: 'Direct Bank Wire' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPaymentMethod(item.id as any)}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-colors press-tactile cursor-pointer text-left ${
                      paymentMethod === item.id
                        ? 'bg-[#1E142B] text-white border-[#1E142B] shadow-xs'
                        : 'bg-[#FAF8FD] text-[#5D506F] border-[#EBE4F2] hover:border-[#6E39C4]/40 hover:text-[#1E142B]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Preview */}
          <div className="bg-white border border-[#EBE4F2] rounded-3xl p-7 shadow-subtle flex flex-col gap-5 sticky top-24">
            <h3 className="font-serif text-lg font-bold text-[#1E142B]">
              Consignment Items ({cart.length})
            </h3>

            {/* Item list */}
            <div className="space-y-3 max-h-56 overflow-y-auto divide-y divide-[#F5F1FA]">
              {cart.map((item) => (
                <div key={item.id} className="pt-2.5 first:pt-0 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-3">
                    <span className="font-semibold text-[#1E142B] block truncate">{item.name}</span>
                    <span className="text-[11px] text-[#8C7F9D] tabular-nums">
                      ${Number(item.price).toFixed(2)} × {item.quantity}
                    </span>
                  </div>
                  <span className="font-bold text-[#1E142B] tabular-nums">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 text-xs text-[#5D506F] pt-4 border-t border-[#F5F1FA]">
              <div className="flex justify-between">
                <span>Treasures Subtotal</span>
                <span className="font-semibold text-[#1E142B] tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Maison Silk Packaging</span>
                <span className="font-semibold text-[#257850]">Complimentary ($0.00)</span>
              </div>
              <div className="flex justify-between">
                <span>Handwritten Wax-Sealed Note</span>
                <span className="font-semibold text-[#257850]">Complimentary ($0.00)</span>
              </div>
              <div className="flex justify-between">
                <span>Climate Courier</span>
                <span className="font-semibold text-[#1E142B] tabular-nums">
                  ${(cart.length > 0 ? 9.99 : 0).toFixed(2)}
                </span>
              </div>
              <div className="pt-3 border-t border-[#EBE4F2] flex justify-between items-center text-sm">
                <span className="font-bold text-[#1E142B]">Grand Total</span>
                <span className="text-2xl font-bold text-[#6E39C4] tabular-nums">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || cart.length === 0}
              className={`w-full py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-xs press-tactile cursor-pointer ${
                submitting
                  ? 'bg-[#8C7F9D] text-white cursor-wait'
                  : 'bg-[#1E142B] hover:bg-[#140C1E] text-white'
              }`}
            >
              {submitting ? (
                <span>Dispatching Consignment...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#E7C58E]" />
                  <span>Confirm & Authorize ${grandTotal.toFixed(2)}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C7F9D] pt-2 border-t border-[#F5F1FA]">
              <ShieldCheck className="w-4 h-4 text-[#257850]" />
              <span>256-bit Encrypted Maison Vault</span>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
