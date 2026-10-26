'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Gift, CheckCircle2 } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useCart();

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-[#1E142B] text-white px-4.5 py-3 rounded-2xl shadow-[0_16px_36px_-6px_rgba(30,20,43,0.25)] text-xs font-medium flex items-center justify-between gap-3 pointer-events-auto border border-white/10 popover-enter"
          style={{ '--transform-origin': 'bottom right' } as React.CSSProperties}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-[#C29352]/20 text-[#E7C58E] flex items-center justify-center shrink-0">
              <Gift className="w-3.5 h-3.5" />
            </div>
            <span className="truncate text-[12.5px]">{toast.message}</span>
          </div>

          <span className="text-[10px] font-bold text-[#E7C58E] uppercase tracking-wider shrink-0">
            Saved
          </span>
        </div>
      ))}
    </div>
  );
}
