'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function ToastContainer() {
  const { toasts } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-[#251838] text-white px-5 py-3.5 rounded-xl shadow-[0_24px_48px_-12px_rgba(37,24,56,0.25)] text-xs font-medium flex items-center gap-3 pointer-events-auto animate-in slide-in-from-bottom duration-200 border border-white/10"
        >
          <span className="text-[#EAC78D] text-base">🎁</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
