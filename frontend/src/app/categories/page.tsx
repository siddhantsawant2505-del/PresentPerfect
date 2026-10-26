'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Catalog from '@/components/Catalog';
import { Gift } from '@/types';
import { fetchGifts } from '@/lib/api';

function CategoriesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialOccasion = searchParams.get('occasion') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeOccasion, setActiveOccasion] = useState(initialOccasion);
  const [gifts, setGifts] = useState<Gift[]>([]);

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all');
    setActiveOccasion(searchParams.get('occasion') || 'all');
  }, [searchParams]);

  useEffect(() => {
    fetchGifts(activeCategory, activeOccasion).then((data) => setGifts(data));
  }, [activeCategory, activeOccasion]);

  return (
    <div className="pt-10">
      <Catalog
        gifts={gifts}
        activeCategory={activeCategory}
        activeOccasion={activeOccasion}
        onCategoryChange={(cat) => setActiveCategory(cat)}
        onOccasionChange={(occ) => setActiveOccasion(occ)}
      />
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="text-center py-20 text-xs text-[#8A7D9B]">Loading curated category...</div>}>
          <CategoriesContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
