# ShopEase – Modern Full-Stack E-Commerce Platform

A production-ready, fully responsive demonstration e-commerce shopping platform built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **jsPDF**. 

**ShopEase** provides an end-to-end commercial shopping experience featuring product discovery, search with autocomplete, category and multi-faceted attribute filtering, shopping cart with dynamic calculations and coupon codes, wishlist persistence, user profile and saved address management, simulated checkout with dummy payment gateways (UPI, Credit/Debit Card, COD, and Free 1-click test payment), and client-side **Tax Invoice PDF generation**.

---

## 🚀 Live Demo Quick Reference

- **Project Location**: `C:\Users\Lenovo\.gemini\antigravity\scratch\shopease-ecommerce`
- **Recommended Active Workspace**: Open this directory in your IDE or terminal.
- **Port**: Default `3000` (or `-p 3005`)

### Demo Credentials
| Role | Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **Demo Customer** | `customer@shopease.com` | `password123` | Browsing, Cart, Wishlist, Order Placement, Saved Addresses, Invoice Downloads |
| **Demo Admin** | `admin@shopease.com` | `admin123` | KPI Metrics, Add/Edit/Delete Products, Inventory Adjustments, Order Fulfillment |

*(One-click quick login buttons are also provided on the Login page and in the top announcement bar).*

### Demo Promotional Coupons
| Code | Type | Benefit | Condition |
| :--- | :--- | :--- | :--- |
| **`SAVE10`** | Percentage | **10% OFF** entire cart | Minimum order ₹499 |
| **`WELCOME100`** | Fixed Discount | **₹100 Flat OFF** | Minimum order ₹500 |
| **`FREESHIP`** | Free Shipping | **₹0 Delivery Charges** | No minimum order (normally ₹99 on orders under ₹999) |
| **`FESTIVE20`** | Percentage | **20% Festive OFF** | Minimum order ₹1,999 |

---

## 📂 Project Directory Structure

```text
shopease-ecommerce/
├── public/                       # Static public assets
├── src/
│   ├── app/                      # Next.js App Router Pages
│   │   ├── layout.tsx            # Root layout with AppProvider & global styles
│   │   ├── page.tsx              # Modern Homepage with Hero, Deals, & Highlights
│   │   ├── globals.css           # Tailwind CSS directives & custom print styles
│   │   ├── products/
│   │   │   ├── page.tsx          # Full Catalog with search, filters & sort
│   │   │   └── [id]/page.tsx     # Product Details with gallery, specs & reviews
│   │   ├── category/
│   │   │   └── [slug]/page.tsx   # Dedicated Category pages with banner & subcategories
│   │   ├── cart/
│   │   │   └── page.tsx          # Shopping Cart with coupons & free delivery bar
│   │   ├── wishlist/
│   │   │   └── page.tsx          # Wishlist management with 1-click move to cart
│   │   ├── checkout/
│   │   │   └── page.tsx          # Multi-step checkout & simulated payment methods
│   │   ├── order-success/
│   │   │   └── [id]/page.tsx     # Order confirmation, celebration & invoice download
│   │   ├── account/
│   │   │   ├── page.tsx          # User profile & saved address manager
│   │   │   └── orders/page.tsx   # Order history, status tracker & invoice history
│   │   ├── admin/
│   │   │   └── page.tsx          # Admin dashboard, inventory & order management
│   │   ├── login/
│   │   │   └── page.tsx          # Authentication with 1-click demo accounts
│   │   └── register/
│   │       └── page.tsx          # Customer registration form
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # Responsive navbar with live search suggestions
│   │   │   └── Footer.tsx        # Footer with newsletter, links & payment badges
│   │   ├── home/
│   │   │   ├── HeroBanner.tsx    # Controlled carousel with promotional slides
│   │   │   ├── CategoryShowcase.tsx # Visual category showcase
│   │   │   ├── FlashDeals.tsx    # Live countdown timer & top deals
│   │   │   ├── PromoBanners.tsx  # Dual interactive coupon cards
│   │   │   └── CustomerReviews.tsx # Verified testimonials & ratings
│   │   ├── product/
│   │   │   ├── ProductCard.tsx   # Product card with image fallback & badges
│   │   │   ├── ProductGrid.tsx   # Responsive grid with empty states
│   │   │   └── ProductFilters.tsx # Category, price slider, rating & stock filters
│   │   └── ui/
│   │       └── ToastContainer.tsx # Global interactive toast notifications
│   ├── context/
│   │   └── AppContext.tsx        # Centralized reactive store with LocalStorage sync
│   ├── data/
│   │   ├── categories.ts         # 7 Main categories with subcategories
│   │   ├── products.ts           # 51 Detailed seed products across all categories
│   │   ├── coupons.ts            # Validated promo discount coupons
│   │   └── mockUsers.ts          # Seed demo customer, demo admin, & demo orders
│   ├── types/
│   │   └── index.ts              # Strict TypeScript interfaces & data contracts
│   └── utils/
│       ├── formatters.ts         # Currency (₹ INR), date, & ID generators
│       └── invoiceGenerator.ts   # Client-side jsPDF tax invoice creator
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) & `jspdf-autotable`
- **Celebration Effects**: `canvas-confetti`
- **State & Storage**: React Context + Automatic Browser `localStorage` persistence

---

## 📦 Product Categories & Catalog

ShopEase comes pre-seeded with **51 rich, realistic products** distributed across the 7 required categories:

1. **Electronics**: Apple iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, Apple MacBook Pro 16" M3 Max, Dell XPS 15 OLED, Sony WH-1000XM5 ANC Headphones, Apple Watch Ultra 2, JBL Charge 5 Waterproof Speaker, Bose QuietComfort 45.
2. **Fashion**: Men's Italian Tailored Wool Blazer, Women's Floral Tiered Silk Maxi Dress, Nike Air Zoom Pegasus 40, Handcrafted Full-Grain Leather Weekender Duffle, Ray-Ban Classic Polarized Aviators, Heavyweight Organic Cotton Crewnecks, Women's Leather Crossbody Saddle Bag, Hand-Stitched Chelsea Boots.
3. **Home & Kitchen**: Instant Vortex Plus 6-in-1 Air Fryer, Breville Barista Touch Espresso Machine, Ergonomic Mesh Executive Office Chair, Nordic Solid Oak Dining Table, Handmade Boho Ceramic Vase Set, Smart LED Corner Floor Lamp, Airtight Borosilicate Glass Containers, Dyson V12 Detect Slim Cordless Vacuum.
4. **Beauty & Personal Care**: CeraVe Hydrating Facial Cleanser, Estée Lauder Advanced Night Repair Serum, Dyson Supersonic Hair Dryer, Olaplex No. 7 Bonding Oil, Huda Beauty Nude Obsessions Eyeshadow Palette, Philips Series 7000 Grooming Kit, La Roche-Posay Anthelios SPF 50+.
5. **Sports & Fitness**: Bowflex SelectTech 552 Adjustable Dumbbells, Manduka PRO Yoga Mat, Under Armour HeatGear Compression Shirt, Lululemon Align High-Rise Leggings, Hydro Flask 32oz Wide Mouth Bottle, Garmin Forerunner 265 GPS Watch, Optimum Nutrition Gold Standard 100% Whey.
6. **Books & Stationery**: Atomic Habits by James Clear (Hardcover), The Psychology of Money by Morgan Housel, Project Hail Mary by Andy Weir, Moleskine Classic Dotted Hardcover Notebook, Lamy 2000 Makrolon 14K Gold Fountain Pen, Midori Solid Brass Mechanical Pencil Set, Deep Work by Cal Newport.
7. **Toys & Kids**: LEGO Star Wars Millennium Falcon UCS 75192, Programmable Robotic STEM Coding Kit, Catan Board Game 5th Edition, Monopoly Deluxe Vintage Wooden Edition, Chicco Bravo 3-in-1 Trio Travel System, Philips Avent Natural Anti-Colic Bottle Set, Melissa & Doug Deluxe Wooden Building Blocks.

Each product includes multiple high-resolution images, full technical specifications, verified rating breakdowns, discounted pricing, stock availability, and automatic SVG image fallbacks.

---

## ⚙️ Installation & Local Setup

### Prerequisites
- Node.js version 18.x or 20+ (tested on Node v24.16.0)
- npm version 9+ (tested on npm 11.13.0)

### Step 1: Open the Project Directory
```powershell
cd C:\Users\Lenovo\.gemini\antigravity\scratch\shopease-ecommerce
```

### Step 2: Install Dependencies (Already installed)
```powershell
npm install
```

### Step 3: Run the Development Server
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: Or Build & Run Production Server
```powershell
npm run build
npm start
```

---

## 🎨 Customizing Brand Name, Logo, Colors & Images

### 1. Brand Name & Colors
- **Brand Name**: Change occurrences of `ShopEase` in:
  - `src/components/layout/Navbar.tsx` (logo typography)
  - `src/components/layout/Footer.tsx` (footer branding)
  - `src/utils/invoiceGenerator.ts` (invoice header)
  - `src/app/layout.tsx` (meta title)
- **Primary Colors**: The platform uses Tailwind CSS color tokens (`blue-600`, `slate-900`, `amber-400`, `rose-500`). Modify theme variables in `src/app/globals.css`:
  ```css
  :root {
    --primary: #2563eb;
    --primary-hover: #1d4ed8;
    --accent: #f97316;
  }
  ```

### 2. Updating Product Images
- Edit `src/data/products.ts`. Replace any URL in the `images: [...]` array with your desired image URL (e.g. your CDN, S3, or Unsplash links).
- If hosting images locally, place them in `public/images/products/` and reference them as `/images/products/my-item.jpg`.

---

## 🧾 Invoice Generation Details

Every completed order automatically generates a professional downloadable PDF invoice containing:
- **Header**: ShopEase logo, corporate address, tax invoice number, order ID, order timestamp.
- **Billed To / Shipped To**: Customer full name, complete physical address, phone, email.
- **Itemized Table**: Serial number, product title, category, quantity, unit price, line-item total.
- **Totals**: Subtotal, coupon discount deduction, delivery fees, and grand total.
- **Simulated Payment Stamp**: Payment method, transaction reference, and watermark note:
  > *"DEMO TRANSACTION — NO ACTUAL FINANCIAL CHARGE OCCURRED (TEST SIMULATION)"*
- **Action Buttons**:
  - **Download Invoice PDF** (generates and downloads `.pdf` file in browser using `jsPDF`)
  - **Print Invoice** (applies print media stylesheets via `window.print()`)

---

## 🔒 Security & Demo Integrity

- **No Real Payment Gateways**: The application strictly simulates all transactions. No Razorpay, Stripe, or PayPal API keys are required.
- **Safe Authentication**: Demonstrative authentication prevents plain-text password leakage.
- **Zero Database Server Setup**: State automatically seeds on initial launch and synchronizes with `localStorage`, giving full persistence across browser refreshes while remaining completely zero-setup.
