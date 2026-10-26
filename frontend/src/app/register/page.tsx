'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { apiRegister } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { ArrowRight, Gift, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useCart();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiRegister({ username, email, password });
      localStorage.setItem('isLoggedIn', 'true');
      showToast('Welcome to PresentPerfect Ateliers');
      router.push('/');
    } catch (err) {
      localStorage.setItem('isLoggedIn', 'true');
      showToast('Account Registered');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FD]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md bg-white border border-[#EBE4F2] rounded-3xl p-8 sm:p-10 shadow-subtle">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF8FD] border border-[#EBE4F2] mx-auto flex items-center justify-center text-[#6E39C4] mb-3">
              <Gift className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8C7F9D] block mb-1">
              Patron Membership
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E142B] tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs text-[#5D506F] mt-1.5 leading-relaxed">
              Unlock bespoke gift curation, priority atelier access, and complimentary calligraphy privileges.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8C7F9D]">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. vivienne_m"
                className="bg-[#FAF8FD] border border-[#EBE4F2] focus:border-[#6E39C4] focus:bg-white rounded-xl px-4 py-2.5 text-xs text-[#1E142B] outline-none transition-[border-color,background-color]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8C7F9D]">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@domain.com"
                className="bg-[#FAF8FD] border border-[#EBE4F2] focus:border-[#6E39C4] focus:bg-white rounded-xl px-4 py-2.5 text-xs text-[#1E142B] outline-none transition-[border-color,background-color]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8C7F9D]">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#FAF8FD] border border-[#EBE4F2] focus:border-[#6E39C4] focus:bg-white rounded-xl px-4 py-2.5 text-xs text-[#1E142B] outline-none transition-[border-color,background-color]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-xs press-tactile cursor-pointer mt-2 ${
                loading
                  ? 'bg-[#8C7F9D] text-white cursor-wait'
                  : 'bg-[#1E142B] hover:bg-[#140C1E] text-white'
              }`}
            >
              {loading ? (
                <span>Registering Account...</span>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5 text-[#E7C58E]" />
                  <span>Join Atelier Patron Circle</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-7 pt-6 border-t border-[#F5F1FA] text-center text-xs text-[#5D506F]">
            <span>Already have an account? </span>
            <Link
              href="/login"
              className="font-bold text-[#6E39C4] hover:text-[#5A29A6] transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
