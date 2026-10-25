/**
 * PresentPerfect — Boutique Interaction Engine
 * Handles hero spotlight switcher, live multi-tier filtering,
 * interactive concierge, cart drawer, and celebratory toasts.
 */

// Master Gift Catalog Data
const giftsCatalog = [
  // Luxury Gifts
  { id: 1, name: "Designer Leather Handbag", description: "An Italian tanned luxury leather handbag radiating timeless elegance for statement moments.", image: "/static/images/luxury1.jpg", price: 150, category: "luxury", occasion: "anniversary", tag: "Haute Leather", rating: "4.9 (124)" },
  { id: 2, name: "High-End Watch", description: "A precision horological masterpiece with sapphire glass for sophisticated individuals.", image: "/static/images/luxury2.jpg", price: 250, category: "luxury", occasion: "birthday", tag: "Limited Run", rating: "5.0 (89)" },
  { id: 3, name: "Premium Luxurious Perfume Set", description: "Rare botanicals distilled into a signature bouquet of night-blooming jasmine and cedar.", image: "/static/images/luxury3.jpg", price: 120, category: "luxury", occasion: "holidays", tag: "Artisan Scent", rating: "4.8 (210)" },
  { id: 4, name: "Crystal Wine Decanter Set", description: "Hand-blown Bohemian crystal decanter paired with dual tasting goblets for elevated soirées.", image: "/static/images/luxury4.jpg", price: 180, category: "luxury", occasion: "wedding", tag: "Mouth-Blown", rating: "4.9 (78)" },
  { id: 5, name: "Luxury Spa Set", description: "Organic lavender blossom bath salts, whipped shea soufflé, and silk eye masque.", image: "/static/images/luxury5.jpg", price: 100, category: "luxury", occasion: "birthday", tag: "Pure Botanicals", rating: "4.9 (165)" },
  
  // Handmade Gifts
  { id: 6, name: "Handcrafted Wooden Jewelry Box", description: "Sustainably harvested walnut with inlaid brass floral vines and velvet compartments.", image: "/static/images/handmade1.jpg", price: 50, category: "handmade", occasion: "birthday", tag: "Master Joinery", rating: "4.8 (95)" },
  { id: 7, name: "Embroidered Pillow Covers", description: "Hand-stitched botanical motifs on stone-washed natural Belgian linen.", image: "/static/images/handmade2.jpg", price: 30, category: "handmade", occasion: "anniversary", tag: "Hand-Dyed", rating: "4.7 (63)" },
  { id: 8, name: "Handwoven Baskets", description: "Woven by heirloom artisans using river grass, perfect for slow living aesthetic.", image: "/static/images/handmade3.jpg", price: 35, category: "handmade", occasion: "holidays", tag: "Natural Fiber", rating: "4.8 (112)" },
  { id: 9, name: "Macramé Wall Hanging", description: "Intricate bohemian fibre art knotted with 100% organic unbleached cotton cord.", image: "/static/images/handmade4.jpg", price: 60, category: "handmade", occasion: "wedding", tag: "Fiber Art", rating: "4.9 (54)" },
  { id: 10, name: "Handmade Pottery Mug Set", description: "Wood-fired ceramic cups glazed in reactive lavender mist with ergonomic thumb rests.", image: "/static/images/handmade5.jpg", price: 40, category: "handmade", occasion: "graduation", tag: "Studio Pottery", rating: "5.0 (140)" },
  
  // Chocolate Gifts
  { id: 11, name: "Gourmet Belgian Chocolate Box", description: "Single-origin Criollo cacao pralines with fleur de sel, lavender honey, and hazelnut.", image: "/static/images/chocolate1.jpg", price: 45, category: "chocolate", occasion: "birthday", tag: "Grand Cru", rating: "4.9 (320)" },
  { id: 12, name: "Chocolate-Covered Strawberries", description: "Hand-dipped coastal strawberries cloaked in 70% dark Belgian chocolate drizzle.", image: "/static/images/chocolate2.jpg", price: 25, category: "chocolate", occasion: "holidays", tag: "Fresh Confection", rating: "4.9 (280)" },
  { id: 13, name: "Hot Chocolate Gift Set", description: "Velvety spiced drinking chocolate flakes with pure vanilla marshmallows and gold whisk.", image: "/static/images/chocolate3.jpg", price: 35, category: "chocolate", occasion: "graduation", tag: "Winter Warmth", rating: "4.8 (190)" },
  { id: 14, name: "Artisanal Truffle Selection", description: "Rich, dusted dark ganache infused with Marc de Champagne and wild berry essence.", image: "/static/images/chocolate4.jpg", price: 40, category: "chocolate", occasion: "anniversary", tag: "Chocolatier Select", rating: "5.0 (215)" },
  { id: 15, name: "Luxury Chocolate Gift Basket", description: "An opulent collection of dark bark, almond dragées, and gold-leaf chocolate tablets.", image: "/static/images/chocolate5.jpg", price: 60, category: "chocolate", occasion: "wedding", tag: "Grand Assortment", rating: "4.9 (175)" },
  
  // Personalized Gifts
  { id: 16, name: "Personalized Engraved Wooden Pen Set", description: "Rosewood barrel with precision rollerball cartridge, custom engraved with initials.", image: "/static/images/personalised1.jpg", price: 30, category: "personalized", occasion: "graduation", tag: "Laser Engraved", rating: "4.8 (145)" },
  { id: 17, name: "Customizable Leather Wallet", description: "Full-grain saddle leather with monogram foil stamp and RFID protection sleeves.", image: "/static/images/personalised2.jpg", price: 45, category: "personalized", occasion: "birthday", tag: "Bespoke Monogram", rating: "4.9 (230)" },
  { id: 18, name: "Personalized Engraved Wine Glasses", description: "Lead-free crystal glasses etched with significant dates or anniversary monograms.", image: "/static/images/personalised3.jpg", price: 50, category: "personalized", occasion: "wedding", tag: "Custom Etched", rating: "4.9 (160)" },
  { id: 19, name: "Custom Embroidered Tote Bag", description: "Heavyweight 16oz canvas tote customized with embroidered cursive names or coordinates.", image: "/static/images/personalised4.jpg", price: 40, category: "personalized", occasion: "anniversary", tag: "Cursive Monogram", rating: "4.7 (88)" },
  { id: 20, name: "Customized Wooden Photo Frame", description: "Beveled ash wood frame engraved with your chosen quotation or celebration date.", image: "/static/images/personalised5.jpg", price: 25, category: "personalized", occasion: "birthday", tag: "Heirloom Wood", rating: "4.9 (195)" },
  
  // Fashion Accessories
  { id: 21, name: "Leather Strap Watch", description: "Minimalist brushed silver dial with supple top-grain Italian calfskin strap.", image: "/static/images/fashion1.jpg", price: 90, category: "fashion", occasion: "graduation", tag: "Refined Classic", rating: "4.8 (92)" },
  { id: 22, name: "Sleek Stainless Steel Necklace", description: "Sculptural interlocking pendant with mirror polish, resistant to tarnish and water.", image: "/static/images/fashion2.jpg", price: 60, category: "fashion", occasion: "wedding", tag: "Hypoallergenic", rating: "4.9 (110)" },
  { id: 23, name: "Elegant Rose Gold Earrings", description: "Delicate pavé-set drops shimmering with warm pink luster for romantic evenings.", image: "/static/images/fashion3.jpg", price: 80, category: "fashion", occasion: "holidays", tag: "18k Rose Vermeil", rating: "5.0 (135)" },
  { id: 24, name: "Vintage Pocket Watch", description: "Intricate skeleton mechanical pocket timepiece with antique bronze chain fob.", image: "/static/images/fashion4.jpg", price: 70, category: "fashion", occasion: "birthday", tag: "Antique Revival", rating: "4.7 (74)" },
  { id: 25, name: "Silk Scarf Set", description: "Hand-rolled mulberry silk twill printed with botanical watercolor illustrations.", image: "/static/images/fashion5.jpg", price: 55, category: "fashion", occasion: "anniversary", tag: "100% Mulberry Silk", rating: "4.9 (185)" }
];

// Active State
let currentCategory = 'all';
let currentOccasion = 'all';

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog(giftsCatalog);
  initHeroShowcase();
  initCart();
  initSearch();
  initConcierge();
  initKeyboardShortcuts();
});

// Render Catalog Grid
function renderCatalog(items) {
  const container = document.getElementById("boutiqueGrid");
  if (!container) return;

  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <div style="font-size: 40px; margin-bottom: 12px;">🎁</div>
        <h3 style="font-size: 22px; color: var(--color-primary); margin-bottom: 8px;">No matching treasures found</h3>
        <p style="color: var(--color-text-secondary); max-width: 400px; margin: 0 auto 20px;">Try adjusting your search criteria or resetting filters to explore our full boutique collection.</p>
        <button onclick="resetFilters()" class="btn-secondary-luxury" style="padding: 10px 22px;">Reset Filters</button>
      </div>
    `;
    return;
  }

  items.forEach(gift => {
    const card = document.createElement("div");
    card.className = "boutique-card";
    card.setAttribute("data-category", gift.category);
    card.setAttribute("data-occasion", gift.occasion);
    
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${gift.image}" alt="${gift.name}" loading="lazy" onerror="this.src='/static/images/luxury1.jpg'">
        <span class="card-tag">${gift.tag}</span>
        <span class="card-occasion-tag">${gift.occasion}</span>
      </div>
      <div class="card-body-content">
        <h4 class="card-title">${gift.name}</h4>
        <p class="card-desc">${gift.description}</p>
        <div class="card-footer-row">
          <div class="card-price">$${gift.price.toFixed(2)}</div>
          <button class="card-add-btn" onclick="handleAddToCart(${gift.id}, this)">
            <span>Add to Box</span>
            <span>+</span>
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Update item count indicator if present
  const countBadge = document.getElementById("catalogCount");
  if (countBadge) {
    countBadge.textContent = `${items.length} Curated Gifts`;
  }
}

// Filter by Category
function setCategoryFilter(category, btnElement) {
  currentCategory = category;
  
  // Update button active state
  document.querySelectorAll(".category-filter-btn").forEach(btn => btn.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");

  applyCombinedFilters();
}

// Filter by Occasion
function setOccasionFilter(occasion, btnElement) {
  currentOccasion = occasion;

  // Update button active state
  document.querySelectorAll(".occasion-subfilter-btn").forEach(btn => btn.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");

  applyCombinedFilters();
}

// Apply Combined Filters
function applyCombinedFilters() {
  let filtered = giftsCatalog;

  if (currentCategory !== 'all') {
    filtered = filtered.filter(item => item.category === currentCategory);
  }

  if (currentOccasion !== 'all') {
    filtered = filtered.filter(item => item.occasion === currentOccasion);
  }

  renderCatalog(filtered);
}

// Reset All Filters
function resetFilters() {
  currentCategory = 'all';
  currentOccasion = 'all';
  
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";

  document.querySelectorAll(".category-filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === 'all');
  });

  document.querySelectorAll(".occasion-subfilter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.occasion === 'all');
  });

  renderCatalog(giftsCatalog);
}

// Live Search with Debounce
function initSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      applyCombinedFilters();
      return;
    }

    const matched = giftsCatalog.filter(gift => 
      gift.name.toLowerCase().includes(query) ||
      gift.description.toLowerCase().includes(query) ||
      gift.category.toLowerCase().includes(query) ||
      gift.occasion.toLowerCase().includes(query)
    );

    renderCatalog(matched);
  });
}

// Hero Interactive Spotlight Switcher (Watermelon UI / 21st.dev style)
function initHeroShowcase() {
  const showcaseTabs = document.querySelectorAll(".showcase-tab-btn");
  if (!showcaseTabs.length) return;

  const showcaseMap = {
    luxury: giftsCatalog.find(g => g.category === 'luxury'),
    handmade: giftsCatalog.find(g => g.category === 'handmade'),
    chocolate: giftsCatalog.find(g => g.category === 'chocolate'),
    personalized: giftsCatalog.find(g => g.category === 'personalized')
  };

  showcaseTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      showcaseTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.dataset.showcase;
      const targetGift = showcaseMap[category];
      if (!targetGift) return;

      const img = document.getElementById("showcaseImg");
      const title = document.getElementById("showcaseTitle");
      const price = document.getElementById("showcasePrice");
      const desc = document.getElementById("showcaseDesc");
      const tag = document.getElementById("showcaseTag");
      const addBtn = document.getElementById("showcaseAddBtn");

      if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = targetGift.image;
          img.style.opacity = '1';
        }, 150);
      }

      if (title) title.textContent = targetGift.name;
      if (price) price.textContent = `$${targetGift.price.toFixed(2)}`;
      if (desc) desc.textContent = targetGift.description;
      if (tag) tag.textContent = `✦ ${targetGift.tag}`;
      if (addBtn) {
        addBtn.onclick = () => handleAddToCart(targetGift.id, addBtn);
      }
    });
  });
}

// Interactive Concierge ("The Perfect Match")
function initConcierge() {
  const conciergeBtn = document.getElementById("conciergeSubmitBtn");
  if (!conciergeBtn) return;

  conciergeBtn.addEventListener("click", () => {
    const recipient = document.getElementById("conciergeRecipient")?.value;
    const occasion = document.getElementById("conciergeOccasion")?.value;
    const category = document.getElementById("conciergeCategory")?.value;

    let results = giftsCatalog;

    if (occasion && occasion !== 'all') {
      results = results.filter(g => g.occasion === occasion);
    }

    if (category && category !== 'all') {
      results = results.filter(g => g.category === category);
    }

    renderCatalog(results);

    // Smooth scroll down to catalog section
    const catalogSection = document.getElementById("catalogSection");
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
    }

    showToast(`✨ Curated ${results.length} gifts for your celebration!`);
  });
}

// Cart System (Synced with localStorage)
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("presentPerfectCart") || "[]");
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("presentPerfectCart", JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
}

function updateCartBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  
  document.querySelectorAll(".cart-count-badge").forEach(badge => {
    badge.textContent = totalCount;
  });
}

function handleAddToCart(giftId, triggerElement) {
  const gift = giftsCatalog.find(g => g.id === giftId);
  if (!gift) return;

  const cart = getCart();
  const existing = cart.find(i => i.id === giftId);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({
      id: gift.id,
      name: gift.name,
      price: gift.price,
      image: gift.image,
      quantity: 1
    });
  }

  saveCart(cart);

  // Micro-feedback on trigger button
  if (triggerElement) {
    const originalText = triggerElement.innerHTML;
    triggerElement.innerHTML = `<span>Added!</span> <span>✓</span>`;
    triggerElement.classList.add("added");
    setTimeout(() => {
      triggerElement.innerHTML = originalText;
      triggerElement.classList.remove("added");
    }, 1200);
  }

  showToast(`✨ "${gift.name}" placed into your gift box`);
}

// Cart Drawer
function initCart() {
  updateCartBadge();
  renderCartDrawer();

  const cartTriggers = document.querySelectorAll(".cart-toggle-trigger");
  const overlay = document.getElementById("cartDrawerOverlay");
  const closeBtn = document.getElementById("cartCloseBtn");

  cartTriggers.forEach(t => {
    t.addEventListener("click", (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeCartDrawer);
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeCartDrawer();
    });
  }
}

function openCartDrawer() {
  const overlay = document.getElementById("cartDrawerOverlay");
  if (overlay) {
    renderCartDrawer();
    overlay.classList.add("open");
  }
}

function closeCartDrawer() {
  const overlay = document.getElementById("cartDrawerOverlay");
  if (overlay) overlay.classList.remove("open");
}

function renderCartDrawer() {
  const container = document.getElementById("cartDrawerItems");
  const totalElement = document.getElementById("cartDrawerTotal");
  if (!container) return;

  const cart = getCart();
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--color-text-muted);">
        <div style="font-size: 32px; margin-bottom: 8px;">🎀</div>
        <p style="font-weight: 500;">Your gift box is currently empty</p>
        <span style="font-size: 13px;">Add curated artisan treasures to celebrate someone special.</span>
      </div>
    `;
    if (totalElement) totalElement.textContent = "$0.00";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * (item.quantity || 1);
    const row = document.createElement("div");
    row.className = "cart-item-row";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
      <div class="cart-item-info">
        <h5>${item.name}</h5>
        <p>$${item.price.toFixed(2)} × ${item.quantity || 1}</p>
      </div>
      <button onclick="removeCartItem(${index})" style="background:none; border:none; color: var(--color-text-muted); cursor:pointer; font-size:16px;">×</button>
    `;
    container.appendChild(row);
  });

  if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
}

function removeCartItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

// Toast Notifications
function showToast(message) {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "boutique-toast";
  toast.innerHTML = `
    <span class="toast-icon">🎁</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Keyboard shortcuts (e.g. '/' or 'Ctrl+K' focuses search)
function initKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      const searchInput = document.getElementById("searchInput");
      if (searchInput) searchInput.focus();
    }
  });
}
