import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import ToastContainer from '@/components/ToastContainer';

export const metadata: Metadata = {
  title: 'PresentPerfect — The Fine Art of Gifting',
  description: 'Editorial luxury gifting boutique featuring handcrafted treasures, Belgian chocolates, Italian leather, and bespoke keepsakes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#F8F6FB] text-[#5C4F6E]">
        <CartProvider>
          {children}
          <CartDrawer />
          <ToastContainer />
        </CartProvider>
      </body>
    </html>
  );
}
