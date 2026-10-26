'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Concierge from '@/components/Concierge';
import Catalog from '@/components/Catalog';
import Pillars from '@/components/Pillars';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { Gift } from '@/types';
import { fetchGifts } from '@/lib/api';

export default function Home() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeOccasion, setActiveOccasion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch gifts on filter change
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchGifts(activeCategory, activeOccasion, searchQuery)
      .then((data) => {
        if (isMounted) {
          setGifts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching gifts:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeCategory, activeOccasion, searchQuery]);

  const handleConciergeMatch = (criteria: { recipient: string; occasion: string; category: string }) => {
    setActiveOccasion(criteria.occasion);
    setActiveCategory(criteria.category);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={(q) => setSearchQuery(q)} />
      
      <main className="flex-1">
        <Hero onSelectOccasion={(occ) => setActiveOccasion(occ)} />
        
        <Concierge onMatch={handleConciergeMatch} />

        <Catalog
          gifts={gifts}
          activeCategory={activeCategory}
          activeOccasion={activeOccasion}
          onCategoryChange={(cat) => setActiveCategory(cat)}
          onOccasionChange={(occ) => setActiveOccasion(occ)}
        />

        <Pillars />

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
