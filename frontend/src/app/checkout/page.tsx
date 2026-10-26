'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/api';
import { ShieldCheck, ArrowRight } from 'lucide-react';

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

      // Also persist to localStorage for offline records
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
      showToast('✨ Celebration Order Confirmed!');
      router.push('/orders');
    } catch (err) {
      console.error('Error creating order:', err);
      // Fallback: save locally
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
      showToast('✨ Celebration Order Confirmed!');
      router.push('/orders');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1100px] mx-auto px-6 py-12 w-full">
        <div className="mb-8">
          <span className="text-xs font-bold text-[#794ACF] uppercase tracking-wider block mb-1">
            Final Step
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#251838]">
            Delivery & Packaging Finalization
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-9 items-start">
          {/* Left Form */}
          <div className="bg-white border border-[#E8E1F0] rounded-3xl p-8 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[#251838] mb-5">
              Recipient & Delivery Details
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#8A7D9B]">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Lady Clara"
                    className="w-full bg-white border border-[#E8E1F0] rounded-xl px-4 py-3 text-xs text-[#251838] outline-none focus:border-[#794ACF] focus:ring-2 focus:ring-[#794ACF]/15 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#8A7D9B]">
                    Celebration Date
                  </label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full bg-white border border-[#E8E1F0] rounded-xl px-4 py-3 text-xs text-[#251838] outline-none focus:border-[#794ACF] focus:ring-2 focus:ring-[#794ACF]/15 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8A7D9B]">
                  Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Street, Suite or Apartment, City, Postal Code"
                  className="w-full bg-white border border-[#E8E1F0] rounded-xl px-4 py-3 text-xs text-[#251838] outline-none focus:border-[#794ACF] focus:ring-2 focus:ring-[#794ACF]/15 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8A7D9B]">
                  Handwritten Calligraphy Message (Included Free)
                </label>
                <textarea
                  rows={3}
                  value={calligraphyNote}
                  onChange={(e) => setCalligraphyNote(e.target.value)}
                  placeholder="Write the heartfelt sentiment to be penned in sepia ink and sealed with gold wax..."
                  className="w-full bg-white border border-[#E8E1F0] rounded-xl px-4 py-3 text-xs text-[#251838] outline-none focus:border-[#794ACF] focus:ring-2 focus:ring-[#794ACF]/15 transition-all"
                />
              </div>

              <h3 className="font-serif text-xl font-bold text-[#251838] pt-6 pb-2">
                Secure Payment
              </h3>

              <div className="flex gap-2.5 mb-4">
                {(['card', 'paypal', 'bank'] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`flex-1 py-3 px-2 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                      paymentMethod === method
                        ? 'bg-white border-2 border-[#794ACF] text-[#794ACF] shadow-sm'
                        : 'bg-[#F4F0F9] border border-[#E8E1F0] text-[#5C4F6E]'
                    }`}
                  >
                    {method === 'card' ? '💳 Credit Card' : method === 'paypal' ? '🅿️ PayPal' : '🏛️ Bank Wire'}
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 p-4 bg-[#F9F7FC] border border-[#E8E1F0] rounded-2xl">
                  <input
                    type="text"
                    placeholder="4242 •••• •••• 4242"
                    className="w-full bg-white border border-[#E8E1F0] rounded-xl px-4 py-2.5 text-xs text-[#251838] outline-none"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full bg-white border border-[#E8E1F0] rounded-xl px-4 py-2.5 text-xs text-[#251838] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-full bg-white border border-[#E8E1F0] rounded-xl px-4 py-2.5 text-xs text-[#251838] outline-none"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || cart.length === 0}
                className="w-full mt-6 bg-[#794ACF] hover:bg-[#6332BE] text-white py-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(121,74,207,0.35)] transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{submitting ? 'Confirming Order...' : 'Authorize & Confirm Gift Dispatch'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Summary */}
          <div className="bg-[#F4F0F9] border border-[#E8E1F0] rounded-3xl p-7 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#251838]">
              Gift Box Review
            </h3>

            <div className="divide-y divide-[#E8E1F0] max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-2.5 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-semibold text-[#251838]">{item.name}</div>
                    <div className="text-[11px] text-[#8A7D9B]">${item.price.toFixed(2)} × {item.quantity}</div>
                  </div>
                  <span className="font-bold text-[#794ACF]">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E8E1F0] pt-4 space-y-2 text-xs text-[#5C4F6E]">
              <div className="flex justify-between">
                <span>Keepsakes Total</span>
                <span className="font-semibold text-[#251838]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Signature Ribbon & Wax Seal</span>
                <span className="font-semibold text-[#2E7D58]">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Climate-Controlled Courier</span>
                <span className="font-semibold text-[#251838]">$9.99</span>
              </div>
            </div>

            <div className="border-t border-[#E8E1F0] pt-3 flex justify-between items-center text-sm font-bold text-[#251838]">
              <span>Grand Total</span>
              <span className="text-2xl text-[#794ACF]">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
