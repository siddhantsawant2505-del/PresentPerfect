import { Gift, Order, User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// Fallback catalog in case Django API is starting up
export const FALLBACK_GIFTS: Gift[] = [
  { id: 1, name: "Designer Leather Handbag", description: "An Italian tanned luxury leather handbag radiating timeless elegance for statement moments.", image: "/images/luxury1.jpg", price: 150, category: "luxury", occasion: "anniversary", tag: "Haute Leather", rating: "4.9 (124)" },
  { id: 2, name: "High-End Watch", description: "A precision horological masterpiece with sapphire glass for sophisticated individuals.", image: "/images/luxury2.jpg", price: 250, category: "luxury", occasion: "birthday", tag: "Limited Run", rating: "5.0 (89)" },
  { id: 3, name: "Premium Luxurious Perfume Set", description: "Rare botanicals distilled into a signature bouquet of night-blooming jasmine and cedar.", image: "/images/luxury3.jpg", price: 120, category: "luxury", occasion: "holidays", tag: "Artisan Scent", rating: "4.8 (210)" },
  { id: 4, name: "Crystal Wine Decanter Set", description: "Hand-blown Bohemian crystal decanter paired with dual tasting goblets for elevated soirées.", image: "/images/luxury4.jpg", price: 180, category: "luxury", occasion: "wedding", tag: "Mouth-Blown", rating: "4.9 (78)" },
  { id: 5, name: "Luxury Spa Set", description: "Organic lavender blossom bath salts, whipped shea soufflé, and silk eye masque.", image: "/images/luxury5.jpg", price: 100, category: "luxury", occasion: "birthday", tag: "Pure Botanicals", rating: "4.9 (165)" },
  { id: 6, name: "Handcrafted Wooden Jewelry Box", description: "Sustainably harvested walnut with inlaid brass floral vines and velvet compartments.", image: "/images/handmade1.jpg", price: 50, category: "handmade", occasion: "birthday", tag: "Master Joinery", rating: "4.8 (95)" },
  { id: 7, name: "Embroidered Pillow Covers", description: "Hand-stitched botanical motifs on stone-washed natural Belgian linen.", image: "/images/handmade2.jpg", price: 30, category: "handmade", occasion: "anniversary", tag: "Hand-Dyed", rating: "4.7 (63)" },
  { id: 8, name: "Handwoven Baskets", description: "Woven by heirloom artisans using river grass, perfect for slow living aesthetic.", image: "/images/handmade3.jpg", price: 35, category: "handmade", occasion: "holidays", tag: "Natural Fiber", rating: "4.8 (112)" },
  { id: 9, name: "Macramé Wall Hanging", description: "Intricate bohemian fibre art knotted with 100% organic unbleached cotton cord.", image: "/images/handmade4.jpg", price: 60, category: "handmade", occasion: "wedding", tag: "Fiber Art", rating: "4.9 (54)" },
  { id: 10, name: "Handmade Pottery Mug Set", description: "Wood-fired ceramic cups glazed in reactive lavender mist with ergonomic thumb rests.", image: "/images/handmade5.jpg", price: 40, category: "handmade", occasion: "graduation", tag: "Studio Pottery", rating: "5.0 (140)" },
  { id: 11, name: "Gourmet Belgian Chocolate Box", description: "Single-origin Criollo cacao pralines with fleur de sel, lavender honey, and hazelnut.", image: "/images/chocolate1.jpg", price: 45, category: "chocolate", occasion: "birthday", tag: "Grand Cru", rating: "4.9 (320)" },
  { id: 12, name: "Chocolate-Covered Strawberries", description: "Hand-dipped coastal strawberries cloaked in 70% dark Belgian chocolate drizzle.", image: "/images/chocolate2.jpg", price: 25, category: "chocolate", occasion: "holidays", tag: "Fresh Confection", rating: "4.9 (280)" },
  { id: 13, name: "Hot Chocolate Gift Set", description: "Velvety spiced drinking chocolate flakes with pure vanilla marshmallows and gold whisk.", image: "/images/chocolate3.jpg", price: 35, category: "chocolate", occasion: "graduation", tag: "Winter Warmth", rating: "4.8 (190)" },
  { id: 14, name: "Artisanal Truffle Selection", description: "Rich, dusted dark ganache infused with Marc de Champagne and wild berry essence.", image: "/images/chocolate4.jpg", price: 40, category: "chocolate", occasion: "anniversary", tag: "Chocolatier Select", rating: "5.0 (215)" },
  { id: 15, name: "Luxury Chocolate Gift Basket", description: "An opulent collection of dark bark, almond dragées, and gold-leaf chocolate tablets.", image: "/images/chocolate5.jpg", price: 60, category: "chocolate", occasion: "wedding", tag: "Grand Assortment", rating: "4.9 (175)" },
  { id: 16, name: "Personalized Engraved Wooden Pen Set", description: "Rosewood barrel with precision rollerball cartridge, custom engraved with initials.", image: "/images/personalised1.jpg", price: 30, category: "personalized", occasion: "graduation", tag: "Laser Engraved", rating: "4.8 (145)" },
  { id: 17, name: "Customizable Leather Wallet", description: "Full-grain saddle leather with monogram foil stamp and RFID protection sleeves.", image: "/images/personalised2.jpg", price: 45, category: "personalized", occasion: "birthday", tag: "Bespoke Monogram", rating: "4.9 (230)" },
  { id: 18, name: "Personalized Engraved Wine Glasses", description: "Lead-free crystal glasses etched with significant dates or anniversary monograms.", image: "/images/personalised3.jpg", price: 50, category: "personalized", occasion: "wedding", tag: "Custom Etched", rating: "4.9 (160)" },
  { id: 19, name: "Custom Embroidered Tote Bag", description: "Heavyweight 16oz canvas tote customized with embroidered cursive names or coordinates.", image: "/images/personalised4.jpg", price: 40, category: "personalized", occasion: "anniversary", tag: "Cursive Monogram", rating: "4.7 (88)" },
  { id: 20, name: "Customized Wooden Photo Frame", description: "Beveled ash wood frame engraved with your chosen quotation or celebration date.", image: "/images/personalised5.jpg", price: 25, category: "personalized", occasion: "birthday", tag: "Heirloom Wood", rating: "4.9 (195)" },
  { id: 21, name: "Leather Strap Watch", description: "Minimalist brushed silver dial with supple top-grain Italian calfskin strap.", image: "/images/fashion1.jpg", price: 90, category: "fashion", occasion: "graduation", tag: "Refined Classic", rating: "4.8 (92)" },
  { id: 22, name: "Sleek Stainless Steel Necklace", description: "Sculptural interlocking pendant with mirror polish, resistant to tarnish and water.", image: "/images/fashion2.jpg", price: 60, category: "fashion", occasion: "wedding", tag: "Hypoallergenic", rating: "4.9 (110)" },
  { id: 23, name: "Elegant Rose Gold Earrings", description: "Delicate pavé-set drops shimmering with warm pink luster for romantic evenings.", image: "/images/fashion3.jpg", price: 80, category: "fashion", occasion: "holidays", tag: "18k Rose Vermeil", rating: "5.0 (135)" },
  { id: 24, name: "Vintage Pocket Watch", description: "Intricate skeleton mechanical pocket timepiece with antique bronze chain fob.", image: "/images/fashion4.jpg", price: 70, category: "fashion", occasion: "birthday", tag: "Antique Revival", rating: "4.7 (74)" },
  { id: 25, name: "Silk Scarf Set", description: "Hand-rolled mulberry silk twill printed with botanical watercolor illustrations.", image: "/images/fashion5.jpg", price: 55, category: "fashion", occasion: "anniversary", tag: "100% Mulberry Silk", rating: "4.9 (185)" }
];

export async function fetchGifts(category?: string, occasion?: string, search?: string): Promise<Gift[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (occasion && occasion !== 'all') params.append('occasion', occasion);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE_URL}/api/gifts/?${params.toString()}`, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) throw new Error('API response not ok');
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.warn('Using fallback gifts data:', err);
    let items = FALLBACK_GIFTS;
    if (category && category !== 'all') items = items.filter(i => i.category.toLowerCase() === category.toLowerCase());
    if (occasion && occasion !== 'all') items = items.filter(i => i.occasion.toLowerCase() === occasion.toLowerCase());
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }
    return items;
  }
}

export async function createOrder(orderPayload: Partial<Order>): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/api/orders/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload)
  });

  if (!res.ok) {
    throw new Error('Failed to create order on server');
  }

  const data = await res.json();
  return data.order;
}

export async function fetchOrders(): Promise<Order[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orders/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch orders');
    const data = await res.json();
    return data.orders || [];
  } catch (e) {
    return [];
  }
}

export async function apiLogin(credentials: { username: string; password: string }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return res.json();
}

export async function apiRegister(data: { username: string; email: string; password: string }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
