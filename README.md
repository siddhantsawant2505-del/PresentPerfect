# PresentPerfect — Modern Client-Server Architecture

An editorial, high-touch luxury gifting boutique featuring a modern decoupled architecture:
- **Client (Frontend)**: Next.js 16 (React 19, TypeScript, Tailwind CSS, Lucide Icons) with App Router.
- **Server (Backend)**: Python Django 5.1 with Django REST Framework (DRF) and CORS.
- **Design System**: Lavender & Amethyst Silk, adhering strictly to [`DESIGN.md`](./DESIGN.md).

---

## Architecture Overview

```
PresentPerfect/
├── frontend/                          # Client-side Next.js Application
│   ├── src/
│   │   ├── app/                       # Next.js App Router Pages
│   │   │   ├── page.tsx               # Boutique Landing Page
│   │   │   ├── cart/page.tsx          # Gift Box Summary
│   │   │   ├── checkout/page.tsx      # Courier, Packaging & Payment
│   │   │   ├── orders/page.tsx        # Client Celebration Records
│   │   │   ├── login/page.tsx         # Client Sign In
│   │   │   ├── register/page.tsx      # Client Registration
│   │   │   ├── categories/page.tsx    # Category Exploration
│   │   │   ├── layout.tsx             # Root Layout (CartProvider & Toasts)
│   │   │   └── globals.css            # Lavender Silk Tokens & Tailwind CSS
│   │   ├── components/                # Reusable UI Components
│   │   │   ├── Navbar.tsx             # Sticky Glassmorphic Header
│   │   │   ├── Hero.tsx               # 21st.dev / Watermelon UI Split Hero
│   │   │   ├── Concierge.tsx          # 3-Click "Perfect Match" Finder
│   │   │   ├── Catalog.tsx            # Multi-Tier Filter & Boutique Grid
│   │   │   ├── CartDrawer.tsx         # Slide-Out Gift Box Drawer
│   │   │   ├── ToastContainer.tsx     # Celebratory Floating Alerts
│   │   │   ├── Pillars.tsx            # 4 Value Pillars
│   │   │   ├── Newsletter.tsx         # Concierge Circle Invite
│   │   │   └── Footer.tsx             # Editorial Luxury Footer
│   │   ├── context/
│   │   │   └── CartContext.tsx        # Global Cart & Toast State
│   │   ├── lib/
│   │   │   └── api.ts                 # REST API Client & Fallbacks
│   │   └── types/
│   │       └── index.ts               # TypeScript Interfaces
│   └── public/images/                 # Curated High-Res Gift Images
│
├── Qpage/                             # Server-side Django Application
│   ├── models.py                      # Item, Order, CartUser Models
│   ├── serializers.py                 # DRF Serializers
│   ├── api_views.py                   # REST API Endpoints
│   ├── views.py                       # Template Views (Fallback)
│   └── urls.py                        # API & Web Routes
│
├── PresentPerfect/                    # Django Core Configuration
│   ├── settings.py                    # CORS & DRF Settings
│   └── urls.py                        # Root URL routing
│
├── DESIGN.md                          # Single Source of Truth for Design System
└── db.sqlite3                         # SQLite Database (seeded with 25 gifts)
```

---

## REST API Specification

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/gifts/` | Returns list of curated gifts. Supports `?category=...`, `?occasion=...`, and `?search=...`. |
| `GET` | `/api/gifts/<id>/` | Returns single gift details by ID. |
| `POST` | `/api/auth/login/` | Client authentication. |
| `POST` | `/api/auth/register/` | Client registration. |
| `GET` | `/api/auth/me/` | Retrieves authenticated user status. |
| `POST` | `/api/auth/logout/` | Logs out current session. |
| `GET` | `/api/orders/` | Fetches celebration orders. |
| `POST` | `/api/orders/` | Creates a new order with cart items, recipient info, and delivery date. |

---

## Running Locally

### 1. Start the Django Server (Port 8000)
```bash
python manage.py runserver
```

### 2. Start the Next.js Client (Port 3000)
```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience the boutique.
