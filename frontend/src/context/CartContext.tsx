'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Gift } from '@/types';

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (gift: Gift | CartItem, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  toasts: { id: string; message: string }[];
  showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('presentPerfectCart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e);
    }
  }, []);

  // Sync back to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('presentPerfectCart', JSON.stringify(newCart));
      localStorage.setItem('cart', JSON.stringify(newCart)); // Legacy key compatibility
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  };

  const showToast = (message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const addToCart = (item: Gift | CartItem, qty: number = 1) => {
    const existing = cart.find((i) => i.id === item.id);
    let updated: CartItem[];

    if (existing) {
      updated = cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
      );
    } else {
      updated = [
        ...cart,
        {
          id: item.id,
          name: item.name,
          price: Number(item.price),
          image: item.image,
          quantity: qty,
        },
      ];
    }

    saveCart(updated);
    showToast(`✨ "${item.name}" placed into your gift box`);
  };

  const removeFromCart = (id: number) => {
    const updated = cart.filter((i) => i.id !== id);
    saveCart(updated);
  };

  const updateQuantity = (id: number, delta: number) => {
    const updated = cart
      .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
      .filter((i) => i.quantity > 0);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toasts,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
