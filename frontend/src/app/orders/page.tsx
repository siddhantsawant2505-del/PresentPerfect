'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchOrders } from '@/lib/api';
import { Sparkles, PackageCheck, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders()
      .then((apiOrders) => {
        const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        if (apiOrders && apiOrders.length > 0) {
          setOrders(apiOrders);
        } else {
          setOrders(localOrders);
        }
        setLoading(false);
      })
      .catch(() => {
        const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(localOrders);
        setLoading(false);
      });
  }, []);

  const handleClearHistory = () => {
    if (confirm('Clear local order archive?')) {
      localStorage.removeItem('orders');
      setOrders([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FD]">
      <Navbar />

      <main className="flex-1 max-w-[960px] mx-auto px-6 py-12 w-full">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#EBE4F2]">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F2ECFA] text-[#6E39C4] px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2">
              <span>Client Consignment Archive</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E142B] tracking-tight">
              Your Consignment Records
            </h1>
          </div>
          {orders.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="text-xs text-[#8C7F9D] hover:text-[#B83A3A] transition-colors press-tactile cursor-pointer"
            >
              Clear Local Archive
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20 text-xs text-[#8C7F9D]">
            Retrieving authenticated atelier archives...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-[#EBE4F2] rounded-3xl p-12 text-center shadow-subtle max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF8FD] border border-[#EBE4F2] mx-auto flex items-center justify-center text-2xl mb-3">
              📦
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E142B] mb-1.5">
              No Recorded Consignments
            </h3>
            <p className="text-xs text-[#5D506F] mb-6 leading-relaxed">
              When you compose and finalize an order, its wax-sealing progress and tracking updates will be archived here.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#1E142B] hover:bg-[#140C1E] text-white px-6 py-2.5 rounded-full text-xs font-semibold press-tactile shadow-xs"
            >
              <span>Explore Boutique Vault</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E7C58E]" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => {
              const items = order.cart || order.items || [];
              const total =
                order.total ||
                (order.total_amount ? `$${Number(order.total_amount).toFixed(2)}` : '$0.00');
              const statusText =
                order.status || 'Archived in Studio: Signature Lavender Silk Packaging';

              return (
                <div
                  key={idx}
                  className="bg-white border border-[#EBE4F2] hover:border-[#D7C9E3] rounded-3xl p-6 sm:p-7 shadow-subtle transition-[border-color,box-shadow]"
                >
                  {/* Top order summary */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-[#F5F1FA]">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8C7F9D] block mb-0.5">
                        Consignment #{1000 + idx}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[#1E142B]">
                        Recipient: {order.recipient || order.recipient_name || 'Bespoke Recipient'}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 bg-[#FAF8FD] border border-[#EBE4F2] rounded-full px-3 py-1 text-[11px] font-medium text-[#257850]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{statusText}</span>
                    </div>
                  </div>

                  {/* Consignment Items */}
                  <div className="py-4">
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8C7F9D] block mb-2.5">
                      Curated Keepsakes ({items.length})
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {items.map((item: any, iIdx: number) => (
                        <div
                          key={iIdx}
                          className="bg-[#FAF8FD] border border-[#EBE4F2] rounded-xl p-3 flex justify-between items-center text-xs"
                        >
                          <span className="font-semibold text-[#1E142B] truncate mr-2">
                            {item.name} (x{item.quantity || 1})
                          </span>
                          <span className="font-bold text-[#6E39C4] tabular-nums shrink-0">
                            ${((Number(item.price) || 0) * (Number(item.quantity) || 1)).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom details */}
                  <div className="pt-4 border-t border-[#F5F1FA] flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-[#5D506F] gap-2">
                    <span className="text-[11.5px]">
                      Packaging: <strong className="text-[#1E142B]">Maison Lavender Silk & Gold Wax Seal</strong>
                    </span>
                    <span className="text-base font-bold text-[#1E142B] tabular-nums">
                      Consignment Total: <span className="text-[#6E39C4]">{total}</span>
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
