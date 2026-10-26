'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchOrders } from '@/lib/api';
import { Order } from '@/types';
import { Sparkles, PackageCheck, ArrowRight } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check both server API and localStorage
    fetchOrders().then((apiOrders) => {
      const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      if (apiOrders && apiOrders.length > 0) {
        setOrders(apiOrders);
      } else {
        setOrders(localOrders);
      }
      setLoading(false);
    }).catch(() => {
      const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(localOrders);
      setLoading(false);
    });
  }, []);

  const handleClearHistory = () => {
    if (confirm('Clear local order history?')) {
      localStorage.removeItem('orders');
      setOrders([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[900px] mx-auto px-6 py-12 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#794ACF] uppercase tracking-wider block mb-1">
              Client Records
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#251838]">
              Your Celebration Orders
            </h1>
          </div>
          {orders.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="text-xs text-[#8A7D9B] hover:text-[#C24141] transition-colors cursor-pointer"
            >
              Clear Records
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#8A7D9B] text-xs">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-[#E8E1F0] rounded-3xl p-12 text-center shadow-sm">
            <div className="text-4xl mb-3">📜</div>
            <h3 className="font-serif text-xl font-bold text-[#251838] mb-1.5">
              No recent gifting orders
            </h3>
            <p className="text-xs text-[#5C4F6E] max-w-sm mx-auto mb-6">
              When you dispatch a curated gift box, your courier tracking and calligraphy proofs appear here.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#251838] hover:bg-[#794ACF] text-white px-6 py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => {
              const orderId = order.id ? `PP-${84920 + order.id}` : `PP-${84920 + idx}`;
              const items = order.cart || order.items || [];
              const date = order.date || (order.timestamp ? new Date(order.timestamp).toLocaleDateString() : 'Recent Order');
              const total = order.total || (order.total_amount ? `$${Number(order.total_amount).toFixed(2)}` : '$0.00');

              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E8E1F0] rounded-3xl p-7 shadow-sm space-y-4 relative"
                >
                  <div className="flex justify-between items-start border-b border-[#E8E1F0] pb-4">
                    <div>
                      <span className="text-xs font-bold text-[#794ACF]">{orderId}</span>
                      <h3 className="font-serif text-lg font-bold text-[#251838] mt-0.5">
                        Celebration Gift Box {order.recipient_name || order.recipient ? `for ${order.recipient_name || order.recipient}` : ''}
                      </h3>
                      <span className="text-xs text-[#8A7D9B]">{date}</span>
                    </div>

                    <span className="bg-[#F0EBF7] text-[#794ACF] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{order.status || 'Courier Dispatched'}</span>
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A7D9B] block">
                      Enclosed Treasures
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {items.map((item: any, iIdx: number) => (
                        <div
                          key={iIdx}
                          className="bg-[#F9F7FC] border border-[#E8E1F0] rounded-xl p-3 flex justify-between items-center text-xs"
                        >
                          <span className="font-semibold text-[#251838]">
                            {item.name} (x{item.quantity || 1})
                          </span>
                          <span className="font-bold text-[#794ACF]">
                            ${((Number(item.price) || 0) * (Number(item.quantity) || 1)).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom details */}
                  <div className="pt-3 border-t border-[#E8E1F0] flex justify-between items-center text-xs text-[#5C4F6E]">
                    <span>Packaging: <strong>Signature Lavender Box & Silk Ribbon</strong></span>
                    <span className="text-base font-bold text-[#251838]">
                      Total: <span className="text-[#794ACF]">{total}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
