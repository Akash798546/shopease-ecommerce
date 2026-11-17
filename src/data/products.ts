import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  // ==========================================
  // 1. ELECTRONICS (8 products)
  // ==========================================
  {
    id: "elec-1",
    name: "Apple iPhone 15 Pro Max (256GB, Natural Titanium)",
    slug: "apple-iphone-15-pro-max",
    category: "electronics",
    categoryName: "Electronics",
    subcategory: "Smartphones",
    description: "Forged in titanium with the groundbreaking A17 Pro chip, custom Action button, and 5x Telephoto camera.",
    fullDescription: "The iPhone 15 Pro Max features a strong and light aerospace-grade titanium design with textured matte-glass back. It also features a Ceramic Shield front that's tougher than any smartphone glass. Powered by the industry-leading A17 Pro chip for next-level mobile gaming and graphics performance.",
    specifications: {
      "Display": "6.7-inch Super Retina XDR with ProMotion",
      "Chip": "A17 Pro chip with 6-core GPU",
      "Camera": "48MP Main | 12MP Ultra Wide | 12MP 5x Telephoto",
      "Storage": "256 GB NVMe",
      "Battery Life": "Up to 29 hours video playback",
      "Operating System": "iOS 17 (Upgradable)"
    },
    price: 139900,
    originalPrice: 159900,
    discountPercentage: 13,
    rating: 4.8,
    reviewCount: 342,
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    tags: ["smartphone", "apple", "ios", "flagship", "5g"]
  },
  {
    id: "elec-2",
    name: "Samsung Galaxy S24 Ultra (512GB, Titanium Gray)",
    slug: "samsung-galaxy-s24-ultra",
    category: "electronics",
    categoryName: "Electronics",
    subcategory: "Smartphones",
    description: "Galaxy AI is here. Epic camera with 200MP sensor, built-in S Pen, and Snapdragon 8 Gen 3 processor.",
    fullDescription: "Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 6.8-inch flat display. It's an absolute marvel of design. Search like never before, get real-time voice translation, and turn your photos into masterpieces with Galaxy AI.",
    specifications: {
      "Display": "6.8-inch Dynamic AMOLED 2X, 120Hz, 2600 nits",
      "Processor": "Snapdragon 8 Gen 3 for Galaxy",
      "Main Camera": "200MP + 50MP + 12MP + 10MP Quad Camera",
      "RAM / Storage": "12GB RAM / 512GB Storage",
      "Battery": "5000 mAh with 45W Fast Charging",
      "Stylus": "Embedded S Pen Included"
    },
    price: 129999,
    originalPrice: 144999,
    discountPercentage: 10,
    rating: 4.7,
    reviewCount: 218,
    stock: 9,
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    isTrending: true,
    tags: ["smartphone", "samsung", "galaxy", "ai", "android"]
  },
  {
    id: "elec-3",
    name: "Apple MacBook Pro 16\" (M3 Max, 36GB RAM, 1TB SSD)",
    slug: "apple-macbook-pro-16-m3-max",
    category: "electronics",
    categoryName: "Electronics",
    subcategory: "Laptops",
    description: "Mind-blowing performance for extreme workflows with Apple M3 Max and Liquid Retina XDR display.",
    fullDescription: "MacBook Pro blasts forward with M3 Max, an extraordinarily advanced chip that brings massive performance and capability for extreme workflows like rendering complex 3D content or developing transformer models with billions of parameters.",
    specifications: {
      "Display": "16.2-inch Liquid Retina XDR (3456 x 2234), 120Hz",
      "Processor": "Apple M3 Max (14-core CPU, 30-core GPU)",
      "Unified Memory": "36GB Unified RAM",
      "Storage": "1TB Superfast SSD",
      "Battery": "Up to 22 hours battery life",
      "Ports": "3x Thunderbolt 4, HDMI, SDXC, MagSafe 3"
    },
    price: 319900,
    originalPrice: 349900,
    discountPercentage: 9,
    rating: 4.9,
    reviewCount: 142,
    stock: 5,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    isBestSeller: true,
    tags: ["laptop", "macbook", "apple", "m3", "workstation"]
  },
  {
    id: "elec-4",
    name: "Dell XPS 15 9530 (Intel Core i9 13th Gen, RTX 4070, 32GB)",
    slug: "dell-xps-15-oled-laptop",
    category: "electronics",
    categoryName: "Electronics",
    subcategory: "Laptops",
    description: "3.5K OLED touch screen with aerospace-grade aluminum and carbon fiber palm rest.",
    fullDescription: "Immerse yourself in content with bright, color-rich panels with high resolution, and more viewing space to keep you productive. Built with machined aluminum in platinum silver with black carbon fiber composite palm rest.",
    specifications: {
      "Display": "15.6-inch 3.5K (3456 x 2160) OLED Touch",
      "CPU": "13th Gen Intel Core i9-13900H (14 cores)",
      "GPU": "NVIDIA GeForce RTX 4070 8GB GDDR6",
      "RAM / SSD": "32GB DDR5 4800MHz / 1TB PCIe NVMe SSD",
      "Weight": "1.92 kg"
    },
    price: 249990,
    originalPrice: 279990,
    discountPercentage: 11,
    rating: 4.6,
    reviewCount: 89,
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["laptop", "dell", "windows", "oled", "creative"]
  },
  {
    id: "elec-5",
    name: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
    slug: "sony-wh-1000xm5-headphones",
    category: "electronics",
    categoryName: "Electronics",
    subcategory: "Headphones",
    description: "Industry-leading noise cancellation with 8 microphones, Auto NC Optimizer, and LDAC high-res audio.",
    fullDescription: "With two processors and eight microphones, these headphones offer our greatest noise cancelling ever. Combined with a specially designed 30mm driver unit, you'll hear every nuance with ultra-clear sound quality and crystal-clear hands-free calls.",
    specifications: {
      "Type": "Over-Ear Wireless ANC Headphones",
      "Noise Cancelling": "Dual processors (V1 + QN1) with 8 microphones",
      "Battery Life": "Up to 30 hours (ANC on) / 40 hours (ANC off)",
      "Fast Charge": "3 minutes gives 3 hours playback",
      "Audio Codecs": "LDAC, AAC, SBC",
      "Weight": "250g lightweight design"
    },
    price: 26990,
    originalPrice: 34990,
    discountPercentage: 23,
    rating: 4.8,
    reviewCount: 520,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    tags: ["audio", "headphones", "sony", "anc", "bluetooth"]
  },
  {
    id: "elec-6",
    name: "Apple Watch Ultra 2 (GPS + Cellular, 49mm Titanium)",
    slug: "apple-watch-ultra-2",
    category: "electronics",
    categoryName: "Electronics",
    subcategory: "Smartwatches",
    description: "Rugged and capable smartwatch designed for endurance athletes, outdoor adventurers, and ocean explorers.",
    fullDescription: "The most rugged and capable Apple Watch pushes the limits again. Featuring the all-new S9 SiP. A magical new way to use your watch without touching the screen with double tap gesture. The brightest Apple display ever at 3000 nits.",
    specifications: {
      "Case": "49mm Aerospace Titanium Case with Sapphire Crystal",
      "Display": "Always-On Retina display, 3000 nits peak brightness",
      "Battery": "Up to 36 hours regular / 72 hours low power",
      "Water Resistance": "100m water resistant, recreational dive to 40m",
      "GPS": "Precision dual-frequency GPS (L1 and L5)"
    },
    price: 89900,
    originalPrice: 99900,
    discountPercentage: 10,
    rating: 4.9,
    reviewCount: 167,
    stock: 11,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    isTrending: true,
    tags: ["smartwatch", "apple", "fitness", "gps", "rugged"]
  },
  {
    id: "elec-7",
    name: "JBL Charge 5 Portable Waterproof Bluetooth Speaker",
    slug: "jbl-charge-5-speaker",
    category: "electronics",
    categoryName: "Electronics",
    subcategory: "Speakers",
    description: "Bold JBL Original Pro Sound with separate tweeter, dual passive radiators, and built-in powerbank.",
    fullDescription: "Take the party with you no matter what the weather. The JBL Charge 5 speaker delivers bold JBL Original Pro Sound, with an optimized long excursion driver, separate tweeter and dual pumping JBL bass radiators. Up to 20 hours of playtime.",
    specifications: {
      "Output Power": "40W RMS (30W Woofer + 10W Tweeter)",
      "Playtime": "Up to 20 hours rechargeable battery",
      "Water/Dust Resistance": "IP67 Waterproof & Dustproof",
      "Connectivity": "Bluetooth 5.1 with PartyBoost pairing",
      "Powerbank": "Built-in USB-A port to charge phones"
    },
    price: 13999,
    originalPrice: 17999,
    discountPercentage: 22,
    rating: 4.7,
    reviewCount: 410,
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["speaker", "jbl", "bluetooth", "waterproof", "audio"]
  },
  {
    id: "elec-8",
    name: "Bose QuietComfort 45 Bluetooth Wireless Headphones",
    slug: "bose-quietcomfort-45-headphones",
    category: "electronics",
    categoryName: "Electronics",
    subcategory: "Headphones",
    description: "Iconic quiet, comfort, and sound. TriPort acoustic architecture with high-fidelity audio.",
    fullDescription: "The first noise cancelling headphones are back, now with lightweight materials for premium comfort and proprietary acoustic technology for deep, clear audio. Adjustable EQ allows you to tune music to your liking.",
    specifications: {
      "Type": "Over-Ear Wireless ANC Headphones",
      "Modes": "Quiet Mode (ANC) & Aware Mode (Transparency)",
      "Battery": "24 hours on single charge",
      "Charging": "USB-C, 15 min quick charge for 3 hours",
      "Weight": "240g plush synthetic leather cushions"
    },
    price: 21990,
    originalPrice: 29900,
    discountPercentage: 26,
    rating: 4.6,
    reviewCount: 295,
    stock: 16,
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    ],
    isNewArrival: true,
    tags: ["bose", "audio", "anc", "music", "wireless"]
  },

  // ==========================================
  // 2. FASHION (8 products)
  // ==========================================
  {
    id: "fash-1",
    name: "Men's Italian Tailored Slim-Fit Wool Blazer",
    slug: "mens-tailored-slim-fit-blazer",
    category: "fashion",
    categoryName: "Fashion",
    subcategory: "Men's Clothing",
    description: "Crafted from fine virgin wool with notch lapels, dual back vents, and soft internal canvas.",
    fullDescription: "Elevate your professional and semi-formal wardrobe with this meticulously crafted Italian wool blazer. Features breathable stretch-infused virgin wool, genuine horn buttons, and an unstructured soft shoulder profile.",
    specifications: {
      "Material": "98% Virgin Wool, 2% Elastane",
      "Lining": "100% Cupro Bemberg silk feel",
      "Closure": "Two-button single-breasted",
      "Care": "Dry clean only",
      "Fit": "Tailored slim modern cut"
    },
    price: 8999,
    originalPrice: 14999,
    discountPercentage: 40,
    rating: 4.7,
    reviewCount: 124,
    stock: 19,
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    tags: ["suit", "blazer", "menswear", "formal", "wool"]
  },
  {
    id: "fash-2",
    name: "Women's Floral Tiered Silk Maxi Dress",
    slug: "womens-floral-tiered-silk-maxi-dress",
    category: "fashion",
    categoryName: "Fashion",
    subcategory: "Women's Clothing",
    description: "Flowing mulberry silk chiffon with hand-drawn botanical print, ruffled sleeves, and smocked waist.",
    fullDescription: "A showstopping maxi dress for summer soirees and garden weddings. Handcrafted in fluid mulberry silk with a flattering V-neckline and tiered ruffle skirt that floats effortlessly with movement.",
    specifications: {
      "Fabric": "100% Pure Mulberry Silk Chiffon",
      "Length": "Maxi (Ankle length)",
      "Neckline": "Wrap V-neck with modesty button",
      "Care": "Delicate hand wash or gentle dry clean",
      "Origin": "Ethically crafted in Jaipur"
    },
    price: 5499,
    originalPrice: 8999,
    discountPercentage: 39,
    rating: 4.8,
    reviewCount: 96,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
    ],
    isTrending: true,
    tags: ["dress", "silk", "floral", "womenswear", "summer"]
  },
  {
    id: "fash-3",
    name: "Nike Air Zoom Pegasus 40 Running Shoes",
    slug: "nike-air-zoom-pegasus-40",
    category: "fashion",
    categoryName: "Fashion",
    subcategory: "Shoes",
    description: "Responsive React foam midsole with dual Zoom Air units for a springy, energized stride.",
    fullDescription: "A springy ride for any run, the Peg's familiar, just-for-you feel returns to help you accomplish your goals. This milestone version has the same responsiveness you love, but with better comfort in sensitive areas of your foot.",
    specifications: {
      "Midsole": "Nike React Foam with Forefoot & Heel Zoom Air units",
      "Upper": "Engineered single-layer breathable mesh",
      "Drop": "10mm (Heel 33mm / Forefoot 23mm)",
      "Weight": "Approx. 288g (Men's US 9)",
      "Surface": "Road, Track, Treadmill"
    },
    price: 8495,
    originalPrice: 11495,
    discountPercentage: 26,
    rating: 4.8,
    reviewCount: 680,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    isBestSeller: true,
    tags: ["shoes", "nike", "running", "sneakers", "sports"]
  },
  {
    id: "fash-4",
    name: "Handcrafted Full-Grain Leather Weekender Duffle Bag",
    slug: "handcrafted-full-grain-leather-weekender-bag",
    category: "fashion",
    categoryName: "Fashion",
    subcategory: "Bags",
    description: "Rugged yet refined vintage brown leather bag with separate ventilated shoe compartment and brass hardware.",
    fullDescription: "Built for lifetime adventures. Handcrafted from vegetable-tanned full-grain cowhide leather that develops a rich, handsome patina over time. Features YKK heavy-duty zippers and a detachable padded shoulder strap.",
    specifications: {
      "Dimensions": "22\" L x 11\" W x 12\" H (Airline carry-on compliant)",
      "Capacity": "45 Liters",
      "Leather": "100% Full-grain vegetable-tanned leather",
      "Hardware": "Antiqued solid brass fittings",
      "Special Pocket": "Waterproof side shoe/laundry tunnel"
    },
    price: 7999,
    originalPrice: 12999,
    discountPercentage: 38,
    rating: 4.9,
    reviewCount: 145,
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
    ],
    isBestSeller: true,
    tags: ["bag", "duffle", "leather", "travel", "handcrafted"]
  },
  {
    id: "fash-5",
    name: "Ray-Ban Classic Polarized Aviator Sunglasses (Gold/Green)",
    slug: "ray-ban-aviator-polarized-sunglasses",
    category: "fashion",
    categoryName: "Fashion",
    subcategory: "Accessories",
    description: "Timeless teardrop frame with crystal G-15 polarized lenses providing 100% UV400 protection.",
    fullDescription: "Currently one of the most iconic sunglass models in the world, Ray-Ban Aviator Classic sunglasses were originally designed for U.S. aviators in 1937. Combines great aviator styling with exceptional quality, performance and comfort.",
    specifications: {
      "Frame Material": "Polished Metal (Gold-tone)",
      "Lens": "Crystal Green Polarized G-15",
      "UV Protection": "100% UVA/UVB Filter",
      "Bridge & Eye Size": "58-14-135 mm",
      "Case Included": "Original leather embossed case & cloth"
    },
    price: 9290,
    originalPrice: 11490,
    discountPercentage: 19,
    rating: 4.7,
    reviewCount: 310,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["sunglasses", "accessories", "rayban", "eyewear"]
  },
  {
    id: "fash-6",
    name: "Classic Heavyweight 100% Cotton Crewneck T-Shirt (Pack of 3)",
    slug: "classic-heavyweight-cotton-crewneck-3pack",
    category: "fashion",
    categoryName: "Fashion",
    subcategory: "Men's Clothing",
    description: "240 GSM pre-shrunk combed organic cotton tees with reinforced collar and ribbed cuffs.",
    fullDescription: "Your daily wardrobe staple perfected. Ultra-soft yet substantial 240 GSM organic cotton that holds its shape wash after wash without shrinkage. Contains Black, White, and Heather Grey essentials.",
    specifications: {
      "Fabric Weight": "240 GSM Heavyweight Jersey",
      "Composition": "100% Combed Organic Cotton",
      "Colors": "Midnight Black, Pure White, Heather Grey",
      "Collar": "Lay-flat 1-inch rib knit collar",
      "Fit": "Relaxed regular fit"
    },
    price: 1499,
    originalPrice: 2499,
    discountPercentage: 40,
    rating: 4.6,
    reviewCount: 420,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["tshirt", "menswear", "cotton", "basics"]
  },
  {
    id: "fash-7",
    name: "Women's Leather Crossbody Saddle Bag with Gold Chain",
    slug: "womens-leather-crossbody-saddle-bag",
    category: "fashion",
    categoryName: "Fashion",
    subcategory: "Bags",
    description: "Soft pebble leather handbag with magnetic snap flap, interior card slots, and adjustable strap.",
    fullDescription: "Compact yet surprisingly spacious, this saddle bag is designed to transition seamlessly from morning brunch to evening dinner. Crafted from supple pebbled Italian leather with polished gold-tone hardware.",
    specifications: {
      "Material": "Pebbled Italian Genuine Leather",
      "Lining": "Microfiber suede",
      "Dimensions": "8.5\" W x 6.5\" H x 3\" D",
      "Strap": "Adjustable crossbody strap (21\" drop)",
      "Closure": "Magnetic snap front flap"
    },
    price: 3999,
    originalPrice: 6999,
    discountPercentage: 43,
    rating: 4.7,
    reviewCount: 184,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["handbag", "crossbody", "accessories", "women"]
  },
  {
    id: "fash-8",
    name: "Classic Chelsea Leather Ankle Boots (Hand-Stitched)",
    slug: "classic-chelsea-leather-ankle-boots",
    category: "fashion",
    categoryName: "Fashion",
    subcategory: "Shoes",
    description: "Goodyear-welted full-grain leather boots with elasticated side gussets and anti-slip rubber lug sole.",
    fullDescription: "A modern British footwear essential. Hand-lasted in Portugal using water-resistant wax-finished pull-up leather that molds to your feet over time for a bespoke custom fit.",
    specifications: {
      "Upper": "Waxed Full-grain Bovine Leather",
      "Construction": "360-degree Goodyear Welted",
      "Sole": "Dainite style studded rubber outsole",
      "Insole": "Poron shock-absorbing memory foam footbed",
      "Color": "Rich Espresso Brown"
    },
    price: 6499,
    originalPrice: 9999,
    discountPercentage: 35,
    rating: 4.8,
    reviewCount: 156,
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
    ],
    isNewArrival: true,
    tags: ["boots", "chelsea", "shoes", "leather", "footwear"]
  },

  // ==========================================
  // 3. HOME & KITCHEN (8 products)
  // ==========================================
  {
    id: "home-1",
    name: "Instant Vortex Plus 6-in-1 Air Fryer with ClearCook Window",
    slug: "instant-vortex-plus-air-fryer-6-in-1",
    category: "home-kitchen",
    categoryName: "Home & Kitchen",
    subcategory: "Kitchen Appliances",
    description: "5.7L capacity with OdorErase air filter, see-through window, and 6 one-touch smart cooking programs.",
    fullDescription: "Cook with 95% less oil and view your food cooking without opening the basket. The revolutionary ClearCook window and internal light let you check progress without letting heat escape. Built-in OdorErase filters remove cooking smells.",
    specifications: {
      "Capacity": "5.7 Liters (Serves 4-6 people)",
      "Functions": "Air Fry, Roast, Broil, Bake, Reheat, Dehydrate",
      "Power": "1700 Watts high-speed EvenCrisp airflow",
      "Controls": "Digital Touchscreen with dial control",
      "Basket": "Dishwasher-safe non-stick PFOA-free"
    },
    price: 8999,
    originalPrice: 14999,
    discountPercentage: 40,
    rating: 4.8,
    reviewCount: 512,
    stock: 31,
    images: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    isBestSeller: true,
    tags: ["airfryer", "kitchen", "appliances", "cooking", "healthy"]
  },
  {
    id: "home-2",
    name: "Breville Barista Touch Espresso Coffee Machine",
    slug: "breville-barista-touch-espresso-machine",
    category: "home-kitchen",
    categoryName: "Home & Kitchen",
    subcategory: "Kitchen Appliances",
    description: "Automated touchscreen with integrated conical burr grinder and automatic microfoam milk texturing.",
    fullDescription: "Café quality coffee at home made easy. Intuitive touchscreen display simplifies how to make your favorite café coffee in 3 easy steps - Grind, Brew and Milk. Easily adjust coffee strength, milk texture and temperature.",
    specifications: {
      "Heating System": "ThermoJet 3-second instant heat-up",
      "Grinder": "Stainless steel conical burr grinder with 30 settings",
      "Water Tank": "2 Liter removable reservoir with water filter",
      "Pressure": "15 Bar Italian pump with 9 Bar low extraction",
      "Milk Frothing": "Auto microfoam steam wand (8 texture levels)"
    },
    price: 68900,
    originalPrice: 85000,
    discountPercentage: 19,
    rating: 4.9,
    reviewCount: 178,
    stock: 7,
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520970014086-2208d157c9e2?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    tags: ["coffee", "espresso", "barista", "breville", "appliances"]
  },
  {
    id: "home-3",
    name: "Ergonomic Mesh High-Back Executive Office Chair",
    slug: "ergonomic-mesh-high-back-office-chair",
    category: "home-kitchen",
    categoryName: "Home & Kitchen",
    subcategory: "Furniture",
    description: "Self-adjusting dynamic lumbar support, 4D armrests, and breathable Korean elastomeric mesh.",
    fullDescription: "Engineered for 10+ hour ergonomic comfort. Features adaptive lumbar cradle that moves with your spine, 135-degree synchro-tilt recline with multi-point locking, and heavy-duty BIFMA certified Class 4 gas lift.",
    specifications: {
      "Mesh Material": "Reinforced high-tensile breathable elastomeric mesh",
      "Adjustments": "4D armrests (height, depth, width, angle), headrest height/tilt",
      "Recline": "90° to 135° with tension resistance dial",
      "Max Weight Capacity": "150 kg",
      "Warranty": "3 Years manufacturer warranty"
    },
    price: 13999,
    originalPrice: 22999,
    discountPercentage: 39,
    rating: 4.7,
    reviewCount: 298,
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80"
    ],
    isTrending: true,
    tags: ["chair", "ergonomic", "furniture", "wfh", "office"]
  },
  {
    id: "home-4",
    name: "Nordic Minimalist Solid Oak Dining Table (6 Seater)",
    slug: "nordic-minimalist-solid-oak-dining-table",
    category: "home-kitchen",
    categoryName: "Home & Kitchen",
    subcategory: "Furniture",
    description: "Scandinavian design handcrafted from sustainably sourced FSC certified White Oak with natural matte oil finish.",
    fullDescription: "The centerpiece of your home gatherings. Clean geometric lines celebrate the natural warmth and unique grain patterns of solid European White Oak. Tapered splayed legs offer rock-solid stability.",
    specifications: {
      "Dimensions": "180 cm L x 90 cm W x 76 cm H",
      "Material": "100% Solid European White Oak",
      "Seating": "Comfortably seats 6 adults",
      "Finish": "Non-toxic organic hardwax oil finish",
      "Assembly": "Simple 15-minute bolt-on leg assembly"
    },
    price: 34999,
    originalPrice: 48999,
    discountPercentage: 29,
    rating: 4.8,
    reviewCount: 74,
    stock: 6,
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["dining", "table", "furniture", "wood", "oak"]
  },
  {
    id: "home-5",
    name: "Handmade Ceramic Bohemian Vase & Dried Floral Decor Set",
    slug: "handmade-ceramic-boho-vase-set",
    category: "home-kitchen",
    categoryName: "Home & Kitchen",
    subcategory: "Home Decor",
    description: "Set of 3 textured matte terracotta and off-white ceramic vases for pampas grass and modern shelf styling.",
    fullDescription: "Add architectural warmth and artisanal soul to any coffee table, mantle, or console. Hand-pinched and fired in small batches, featuring subtle organic curves and an unglazed stone-touch finish.",
    specifications: {
      "Quantity": "Set of 3 different heights (10\", 8\", 6\")",
      "Material": "Heavy high-fired ceramic stoneware",
      "Finish": "Matte chalk terracotta & eggshell white",
      "Waterproof": "Glazed interiors suitable for fresh or dried botanicals"
    },
    price: 2199,
    originalPrice: 3999,
    discountPercentage: 45,
    rating: 4.7,
    reviewCount: 165,
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["decor", "vase", "ceramic", "boho", "homedecor"]
  },
  {
    id: "home-6",
    name: "Smart LED Floor Lamp with WiFi & Alexa / Google Sync",
    slug: "smart-led-modern-floor-lamp",
    category: "home-kitchen",
    categoryName: "Home & Kitchen",
    subcategory: "Lighting",
    description: "16 million colors + 2700K-6500K tunable white, music sync mode, and touch dimmer pole.",
    fullDescription: "Transform the mood of your living space with fluid ambient lighting. Sleek ultra-thin corner profile casts vibrant indirect glow against walls. Controlled via smart app, physical capacitive touch bar, or voice commands.",
    specifications: {
      "Height": "145 cm sleek aerospace aluminum column",
      "Brightness": "2200 Lumens (Equivalent to 150W bulb)",
      "Colors": "RGBIC 16 Million Colors + Warm/Cool Whites",
      "Voice Compatibility": "Alexa, Google Home, SmartLife app",
      "Features": "Microphone music rhythm sync & sleep timer"
    },
    price: 4499,
    originalPrice: 7999,
    discountPercentage: 44,
    rating: 4.6,
    reviewCount: 220,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["lighting", "smartlamp", "led", "interior"]
  },
  {
    id: "home-7",
    name: "Airtight Glass Food Storage Containers (Set of 10)",
    slug: "airtight-glass-food-storage-containers-set-of-10",
    category: "home-kitchen",
    categoryName: "Home & Kitchen",
    subcategory: "Storage",
    description: "Thermal-shock resistant borosilicate glass with leak-proof snap locking bamboo & silicone lids.",
    fullDescription: "Ditch microplastics with these heavy-duty meal prep containers. Microwave safe, oven safe up to 400°C (without lid), freezer safe and dishwasher safe. Includes chalk labels and marker pen.",
    specifications: {
      "Pieces": "10 Containers with 10 Matching Airtight Lids",
      "Material": "High-borosilicate glass (BPA-free & non-toxic)",
      "Sizes Included": "2x 1000ml, 2x 800ml, 3x 500ml, 3x 350ml",
      "Sealing": "Removable food-grade silicone airtight ring"
    },
    price: 2899,
    originalPrice: 4599,
    discountPercentage: 37,
    rating: 4.8,
    reviewCount: 310,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["storage", "kitchen", "mealprep", "glass", "airtight"]
  },
  {
    id: "home-8",
    name: "Dyson V12 Detect Slim Cordless Vacuum Cleaner",
    slug: "dyson-v12-detect-slim-cordless-vacuum",
    category: "home-kitchen",
    categoryName: "Home & Kitchen",
    subcategory: "Kitchen Appliances",
    description: "Laser illumination reveals invisible microscopic dust. Piezo sensor counts and sizes dust particles.",
    fullDescription: "Dyson's most powerful, compact cordless vacuum. A precisely-angled laser beam reveals invisible particles on hard floors. LCD screen shows real-time proof of a deep clean. Up to 60 minutes of fade-free suction.",
    specifications: {
      "Suction Power": "150 Air Watts (Hyperdymium motor 125,000 RPM)",
      "Filtration": "Whole-machine advanced HEPA traps 99.99% of particles",
      "Weight": "2.2 kg ultra lightweight",
      "Run Time": "Up to 60 minutes with click-in battery",
      "Bin Volume": "0.35 Liters with no-touch hygienic ejection"
    },
    price: 49900,
    originalPrice: 58900,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 204,
    stock: 10,
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80"
    ],
    isNewArrival: true,
    tags: ["vacuum", "dyson", "cleaning", "home"]
  },

  // ==========================================
  // 4. BEAUTY & PERSONAL CARE (7 products)
  // ==========================================
  {
    id: "beau-1",
    name: "CeraVe Hydrating Facial Cleanser with Ceramides & Hyaluronic Acid",
    slug: "cerave-hydrating-facial-cleanser-473ml",
    category: "beauty-personal-care",
    categoryName: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Non-foaming lotion cleanser that gently hydrates and preserves the protective skin moisture barrier.",
    fullDescription: "Developed with dermatologists, CeraVe Hydrating Cleanser is a gentle face wash with ingredients like ceramides and hyaluronic acid that work to restore the skin's natural barrier to help skin lock in moisture.",
    specifications: {
      "Volume": "473 ml (16 fl oz)",
      "Key Actives": "3 Essential Ceramides (1, 3, 6-II), Hyaluronic Acid",
      "Skin Type": "Normal to Dry, Sensitive skin",
      "Features": "Fragrance-free, non-comedogenic, MVE delivery technology"
    },
    price: 1250,
    originalPrice: 1650,
    discountPercentage: 24,
    rating: 4.8,
    reviewCount: 890,
    stock: 75,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    isBestSeller: true,
    tags: ["skincare", "cerave", "cleanser", "hyaluronic", "dermatologist"]
  },
  {
    id: "beau-2",
    name: "Estée Lauder Advanced Night Repair Synchronized Multi-Recovery Complex",
    slug: "estee-lauder-advanced-night-repair-serum",
    category: "beauty-personal-care",
    categoryName: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "World-renowned anti-aging serum with Chronolux Power Signal Technology for overnight cellular renewal.",
    fullDescription: "Harness the restorative power of night. This deep- and fast-penetrating face serum reduces the appearance of multiple signs of aging caused by the environmental assaults of modern life. Skin looks smoother and less lined, younger, more radiant.",
    specifications: {
      "Volume": "50 ml bottle with precision dropper",
      "Benefits": "Anti-wrinkle, firming, 72-hour hydration, barrier strengthening",
      "Texture": "Lightweight, oil-free silky serum",
      "Dermatologist Tested": "Ophthalmologist and dermatologist tested"
    },
    price: 7990,
    originalPrice: 9900,
    discountPercentage: 19,
    rating: 4.9,
    reviewCount: 430,
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    tags: ["serum", "luxury", "skincare", "antiaging", "esteelauder"]
  },
  {
    id: "beau-3",
    name: "Dyson Supersonic Hair Dryer (Iron/Fuchsia)",
    slug: "dyson-supersonic-hair-dryer",
    category: "beauty-personal-care",
    categoryName: "Beauty & Personal Care",
    subcategory: "Haircare",
    description: "Engineered for different hair types with intelligent heat control to prevent extreme thermal damage.",
    fullDescription: "Fast drying with no extreme heat. Five magnetic styling attachments included, including the new Flyaway attachment that hides flyaways under longer hair for a smooth, salon-standard shiny finish.",
    specifications: {
      "Motor": "Dyson Digital Motor V9 (110,000 RPM)",
      "Heat Control": "Air temperature measured 40 times a second",
      "Attachments": "5 Magnetic Styling Nozzles (Flyaway, Diffuser, Comb, etc.)",
      "Power": "1600 Watts with 3 speed and 4 heat settings"
    },
    price: 34900,
    originalPrice: 39900,
    discountPercentage: 13,
    rating: 4.8,
    reviewCount: 388,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
    ],
    isTrending: true,
    tags: ["haircare", "dyson", "hairdryer", "luxury", "styling"]
  },
  {
    id: "beau-4",
    name: "Olaplex No. 7 Bonding Oil (30ml Reparative Hair Oil)",
    slug: "olaplex-no-7-bonding-oil",
    category: "beauty-personal-care",
    categoryName: "Beauty & Personal Care",
    subcategory: "Haircare",
    description: "Highly-concentrated, weightless styling oil that dramatically increases shine, softness, and color vibrancy.",
    fullDescription: "A highly concentrated, weightless, reparative styling oil that provides heat protection up to 450°F/232°C. Repairs damaged and compromised bonds inside the hair shaft to restore healthy texture and luster.",
    specifications: {
      "Volume": "30 ml",
      "Heat Protection": "Up to 450°F / 232°C",
      "Key Benefits": "Tames flyaways, adds 125% more shine, UV protection",
      "Formulation": "Vegan, sulfate-free, paraben-free, cruelty-free"
    },
    price: 2450,
    originalPrice: 2950,
    discountPercentage: 17,
    rating: 4.7,
    reviewCount: 520,
    stock: 38,
    images: [
      "https://images.unsplash.com/photo-1608248597359-5613531b4028?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["haircare", "olaplex", "oil", "styling"]
  },
  {
    id: "beau-5",
    name: "Huda Beauty Nude Obsessions Eyeshadow Palette",
    slug: "huda-beauty-nude-obsessions-palette",
    category: "beauty-personal-care",
    categoryName: "Beauty & Personal Care",
    subcategory: "Makeup",
    description: "9 ultra-pigmented shades featuring buttery mattes, reflective shimmers, and hypnotic metallic foils.",
    fullDescription: "Created to suit every skin tone and eye color, each palette contains an incredible range of shades: from buttery mattes, super-shimmery shadows, and complementary metallic shades, all with smooth and blendable textures.",
    specifications: {
      "Shades": "9 Versatile Warm, Medium & Deep Nude shades",
      "Finishes": "5 Smooth Mattes, 4 Duo-Chrome Metallic Shimmers",
      "Formulation": "Long-wearing, crease-resistant, intense payoff",
      "Compact": "Includes full-size vanity mirror"
    },
    price: 2650,
    originalPrice: 3300,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 312,
    stock: 29,
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["makeup", "eyeshadow", "hudabeauty", "cosmetics"]
  },
  {
    id: "beau-6",
    name: "Philips Series 7000 All-in-One Trimmer & Grooming Kit (16 Tools)",
    slug: "philips-series-7000-all-in-one-grooming-kit",
    category: "beauty-personal-care",
    categoryName: "Beauty & Personal Care",
    subcategory: "Grooming",
    description: "DualCut self-sharpening stainless steel blades with 16 attachments for face, hair, and body.",
    fullDescription: "Craft your personal look with this versatile trimmer, which includes 16 quality tools for styling your face, head and body. Its DualCut blades deliver maximum precision, while the no-slip rubber grip improves comfort and control.",
    specifications: {
      "Battery": "Lithium-ion with 120 minutes cordless runtime",
      "Blades": "Self-sharpening DualCut tempered stainless steel",
      "Attachments": "16 Premium guard guards, body groomer, precision foil shaver",
      "Cleaning": "100% Showerproof and fully washable under tap"
    },
    price: 3999,
    originalPrice: 5495,
    discountPercentage: 27,
    rating: 4.7,
    reviewCount: 460,
    stock: 42,
    images: [
      "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["grooming", "philips", "trimmer", "shaving", "mensgrooming"]
  },
  {
    id: "beau-7",
    name: "La Roche-Posay Anthelios Ultra-Light Fluid Sunscreen SPF 50+",
    slug: "la-roche-posay-anthelios-spf-50",
    category: "beauty-personal-care",
    categoryName: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Broad-spectrum invisible finish sunscreen with Netlock technology. Non-greasy and zero white cast.",
    fullDescription: "High broad-spectrum protection against UVA/UVB rays and ultra-long UVA rays. Formulated with thermal spring water and Mexoryl 400. Extremely resistant to water, sweat, and sand.",
    specifications: {
      "Volume": "50 ml shake-bottle",
      "SPF Rating": "SPF 50+ Broad Spectrum UV Protection",
      "Finish": "Matte, invisible dry-touch, non-comedogenic",
      "Safety": "Suitable for ultra-sensitive and reactive skin"
    },
    price: 1890,
    originalPrice: 2350,
    discountPercentage: 20,
    rating: 4.9,
    reviewCount: 620,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["sunscreen", "spf", "skincare", "larocheposay"]
  },

  // ==========================================
  // 5. SPORTS & FITNESS (7 products)
  // ==========================================
  {
    id: "sport-1",
    name: "Bowflex SelectTech 552 Adjustable Dumbbells (Pair 2-24kg)",
    slug: "bowflex-selecttech-552-adjustable-dumbbells",
    category: "sports-fitness",
    categoryName: "Sports & Fitness",
    subcategory: "Fitness Equipment",
    description: "Replaces 15 sets of weights. Turn of a dial automatically changes resistance from 2kg up to 24kg per dumbbell.",
    fullDescription: "Say goodbye to 15 sets of clunky dumbbells cluttering your home gym floor. With just the turn of a dial, you can automatically change your resistance from 2 kg all the way up to 24 kg per hand. Durable molding around metal plates creates a smooth lift-off and quiet workout.",
    specifications: {
      "Weight Range": "2 to 24 kg per dumbbell (5 to 52.5 lbs)",
      "Settings": "15 Distinct weight increments per dumbbell",
      "Dimensions": "43 cm L x 20 cm W x 23 cm H each",
      "Includes": "Heavy-duty storage cradles for both dumbbells"
    },
    price: 24999,
    originalPrice: 38999,
    discountPercentage: 36,
    rating: 4.8,
    reviewCount: 320,
    stock: 11,
    images: [
      "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    isBestSeller: true,
    tags: ["dumbbells", "fitness", "homegym", "weights", "workout"]
  },
  {
    id: "sport-2",
    name: "Manduka PRO Yoga & Pilates Mat (6mm High Density)",
    slug: "manduka-pro-yoga-mat-6mm",
    category: "sports-fitness",
    categoryName: "Sports & Fitness",
    subcategory: "Fitness Equipment",
    description: "The #1 yoga teacher recommended mat. Unmatched joint protection, closed-cell hygienic surface, and lifetime grip.",
    fullDescription: "An ultra-dense and spacious performance yoga mat that has unmatched comfort and cushioning. The Manduka PRO will never wear out, guaranteed. Closed-cell surface keeps moisture and sweat from seeping into the mat and breeding bacteria.",
    specifications: {
      "Thickness": "6 mm high-density closed cell PVC",
      "Dimensions": "180 cm x 66 cm (Extra wide & long)",
      "Weight": "3.4 kg heavy stability base",
      "Eco-Standard": "OEKO-TEX certified, emission-free manufacturing"
    },
    price: 8499,
    originalPrice: 11999,
    discountPercentage: 29,
    rating: 4.9,
    reviewCount: 245,
    stock: 26,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["yoga", "fitness", "manduka", "pilates", "gym"]
  },
  {
    id: "sport-3",
    name: "Under Armour Men's HeatGear Compression Long-Sleeve Shirt",
    slug: "under-armour-heatgear-compression-shirt",
    category: "sports-fitness",
    categoryName: "Sports & Fitness",
    subcategory: "Sportswear",
    description: "Super-light HeatGear fabric delivers superior muscular compression without weighing you down.",
    fullDescription: "HeatGear is our original performance baselayer—the one you put on first and take off last. So we made it extra comfortable by wicking sweat and stretching so you can move no matter what.",
    specifications: {
      "Fabric": "84% Polyester / 16% Elastane 4-way stretch",
      "Technology": "Anti-odor technology prevents growth of odor-causing microbes",
      "Ventilation": "Strategic mesh panels under arms and back of neck",
      "Fit": "Ultra-tight second-skin compression"
    },
    price: 2499,
    originalPrice: 3499,
    discountPercentage: 29,
    rating: 4.7,
    reviewCount: 195,
    stock: 36,
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["sportswear", "underarmour", "gym", "compression", "fitness"]
  },
  {
    id: "sport-4",
    name: "Lululemon Align High-Rise Pant 25\" Leggings",
    slug: "lululemon-align-high-rise-leggings",
    category: "sports-fitness",
    categoryName: "Sports & Fitness",
    subcategory: "Sportswear",
    description: "Buttery-soft Nulu fabric feels weightless like a second skin, with hidden waistband pocket.",
    fullDescription: "When feeling nothing is everything. The lululemon Align collection, powered by Nulu fabric, is so weightless and buttery soft, all you feel is your practice. Added Lycra fibre for stretch and shape retention.",
    specifications: {
      "Fabric": "81% Nylon, 19% Lycra Elastane Nulu material",
      "Inseam": "25 inches (7/8 length)",
      "Waist": "High-rise supportive waistband that lies flat",
      "Care": "Machine wash cold, tumble dry low"
    },
    price: 6900,
    originalPrice: 8900,
    discountPercentage: 22,
    rating: 4.9,
    reviewCount: 480,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
    ],
    isTrending: true,
    tags: ["leggings", "lululemon", "yoga", "sportswear", "athleisure"]
  },
  {
    id: "sport-5",
    name: "Hydro Flask 32 oz Wide Mouth Vacuum Insulated Stainless Steel Bottle",
    slug: "hydro-flask-32oz-wide-mouth-bottle",
    category: "sports-fitness",
    categoryName: "Sports & Fitness",
    subcategory: "Outdoor Accessories",
    description: "TempShield double-wall vacuum insulation keeps beverages cold up to 24 hours or piping hot up to 12 hours.",
    fullDescription: "Big enough for a whole day on the trail, our 32 oz Wide Mouth bottle is made with pro-grade 18/8 stainless steel and a wider opening for faster fill and ice cube insertion. Color Last powder coat is dishwasher safe.",
    specifications: {
      "Capacity": "946 ml (32 fluid ounces)",
      "Insulation": "TempShield Double-Wall Vacuum Insulation",
      "Steel": "Pro-Grade 18/8 pure food-grade stainless steel",
      "Cap": "Leakproof Flex Cap with flexible carry strap",
      "BPA Free": "100% BPA-Free and Phthalate-Free"
    },
    price: 3499,
    originalPrice: 4499,
    discountPercentage: 22,
    rating: 4.8,
    reviewCount: 380,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["waterbottle", "hydroflask", "outdoors", "hydration", "sports"]
  },
  {
    id: "sport-6",
    name: "Garmin Forerunner 265 Running GPS Smartwatch (AMOLED Display)",
    slug: "garmin-forerunner-265-gps-watch",
    category: "sports-fitness",
    categoryName: "Sports & Fitness",
    subcategory: "Outdoor Accessories",
    description: "Brilliant AMOLED touchscreen with training readiness score, multi-band GPS, and wrist-based running power.",
    fullDescription: "Train brilliantly with the Forerunner 265 GPS running smartwatch. Its colorful AMOLED touchscreen display stands out while the training readiness feature tells you when you're primed for a productive session.",
    specifications: {
      "Screen": "1.3\" Colorful AMOLED Touchscreen Display",
      "Battery": "Up to 13 days in smartwatch mode / 20 hours GPS",
      "Sensors": "Multi-band GNSS SatIQ, wrist heart rate & HRV status",
      "Running Dynamics": "Cadence, stride length, ground contact balance",
      "Music Storage": "Download playlists from Spotify directly to watch"
    },
    price: 46990,
    originalPrice: 52990,
    discountPercentage: 11,
    rating: 4.8,
    reviewCount: 135,
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["garmin", "smartwatch", "running", "gps", "fitness"]
  },
  {
    id: "sport-7",
    name: "Optimum Nutrition (ON) Gold Standard 100% Whey Protein (5 lbs)",
    slug: "optimum-nutrition-gold-standard-whey-protein",
    category: "sports-fitness",
    categoryName: "Sports & Fitness",
    subcategory: "Fitness Equipment",
    description: "24g whey protein per serving with 5.5g naturally occurring BCAAs for post-workout muscle recovery.",
    fullDescription: "The world's best-selling whey protein powder. Each serving provides 24 grams of all-whey protein composed of Whey Protein Isolates (WPI), Whey Protein Concentrate (WPC), and Whey Peptides.",
    specifications: {
      "Net Weight": "2.27 kg (5 lbs) / 74 Servings",
      "Protein Per Scoop": "24g Whey Protein Blend (Primary Source: WPI)",
      "BCAAs": "5.5g branched chain amino acids",
      "Flavor": "Double Rich Chocolate (Gluten Free)",
      "Authenticity": "Scratch code for manufacturer verification"
    },
    price: 6499,
    originalPrice: 7999,
    discountPercentage: 19,
    rating: 4.8,
    reviewCount: 920,
    stock: 65,
    images: [
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
    ],
    isBestSeller: true,
    tags: ["protein", "supplements", "gym", "nutrition", "fitness"]
  },

  // ==========================================
  // 6. BOOKS & STATIONERY (7 products)
  // ==========================================
  {
    id: "book-1",
    name: "Atomic Habits by James Clear (Hardcover Collector's Edition)",
    slug: "atomic-habits-james-clear-hardcover",
    category: "books-stationery",
    categoryName: "Books & Stationery",
    subcategory: "Educational Books",
    description: "An easy and proven way to build good habits and break bad ones. Over 15 million copies sold globally.",
    fullDescription: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    specifications: {
      "Author": "James Clear",
      "Publisher": "Penguin Random House",
      "Format": "Collector's Gold Foil Embossed Hardcover",
      "Pages": "320 pages",
      "Language": "English",
      "ISBN": "978-0735211292"
    },
    price: 699,
    originalPrice: 999,
    discountPercentage: 30,
    rating: 4.9,
    reviewCount: 1450,
    stock: 90,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    isBestSeller: true,
    tags: ["book", "productivity", "psychology", "bestseller", "habits"]
  },
  {
    id: "book-2",
    name: "The Psychology of Money by Morgan Housel",
    slug: "psychology-of-money-morgan-housel",
    category: "books-stationery",
    categoryName: "Books & Stationery",
    subcategory: "Educational Books",
    description: "Timeless lessons on wealth, greed, and happiness through 19 short insightful financial stories.",
    fullDescription: "Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people. Award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money.",
    specifications: {
      "Author": "Morgan Housel",
      "Publisher": "Harriman House",
      "Format": "Paperback with textured grain cover",
      "Pages": "256 pages",
      "Language": "English",
      "ISBN": "978-0857197689"
    },
    price: 399,
    originalPrice: 599,
    discountPercentage: 33,
    rating: 4.8,
    reviewCount: 980,
    stock: 80,
    images: [
      "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
    ],
    isBestSeller: true,
    tags: ["book", "finance", "investing", "psychology", "money"]
  },
  {
    id: "book-3",
    name: "Project Hail Mary by Andy Weir (Special Sci-Fi Edition)",
    slug: "project-hail-mary-andy-weir",
    category: "books-stationery",
    categoryName: "Books & Stationery",
    subcategory: "Fiction",
    description: "A lone astronaut must save the earth from extinction in this gripping interstellar thriller from the author of The Martian.",
    fullDescription: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself are doomed. Except right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment.",
    specifications: {
      "Author": "Andy Weir",
      "Publisher": "Ballantine Books",
      "Genre": "Hard Science Fiction / Thriller",
      "Format": "Hardcover with illustrated dust jacket",
      "Pages": "496 pages"
    },
    price: 749,
    originalPrice: 1099,
    discountPercentage: 32,
    rating: 4.9,
    reviewCount: 650,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
    ],
    isTrending: true,
    tags: ["fiction", "scifi", "novel", "bestseller", "andyweir"]
  },
  {
    id: "book-4",
    name: "Moleskine Classic Hardcover Dotted Notebook (Large 5x8.25\")",
    slug: "moleskine-classic-hardcover-dotted-notebook",
    category: "books-stationery",
    categoryName: "Books & Stationery",
    subcategory: "Notebooks",
    description: "Ivory-colored 70 GSM acid-free paper with rounded corners, ribbon bookmark, and expandable inner pocket.",
    fullDescription: "The legendary notebook used by thinkers and artists for over two centuries. Features bound durable cardboard cover, dotted grid layout ideal for bullet journaling, sketching, or executive note-taking, and secure elastic closure band.",
    specifications: {
      "Size": "Large (13 x 21 cm / 5 x 8.25 inches)",
      "Paper": "240 Dotted pages of 70 GSM FSC certified acid-free paper",
      "Binding": "Thread-bound lay-flat 180° opening",
      "Closure": "Matching color elastic closure band",
      "Color": "Classic Matte Sapphire Blue"
    },
    price: 1899,
    originalPrice: 2499,
    discountPercentage: 24,
    rating: 4.8,
    reviewCount: 390,
    stock: 55,
    images: [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["notebook", "stationery", "moleskine", "journal", "bulletjournal"]
  },
  {
    id: "book-5",
    name: "Lamy 2000 Makrolon Fountain Pen (14K Gold Nib, Fine)",
    slug: "lamy-2000-fountain-pen-makrolon",
    category: "books-stationery",
    categoryName: "Books & Stationery",
    subcategory: "Office Supplies",
    description: "Bauhaus design icon since 1966. Fiberglass-reinforced Makrolon barrel with platinum-coated 14K gold nib.",
    fullDescription: "Writing in its purest form. The Lamy 2000 has been writing design history since 1966. As a timeless classic, it is still one of the most modern writing instruments today. Equipped with an integrated piston-operated filling system and sprung stainless steel clip.",
    specifications: {
      "Nib": "Hand-polished 14K gold, platinum-plated (Fine width)",
      "Body": "Brushed Makrolon polycarbonate & matte stainless steel",
      "Filling Mechanism": "Built-in piston filler for bottled inks",
      "Weight": "25 grams perfectly balanced"
    },
    price: 17490,
    originalPrice: 21900,
    discountPercentage: 20,
    rating: 4.9,
    reviewCount: 110,
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    tags: ["pen", "fountainpen", "lamy", "luxury", "stationery"]
  },
  {
    id: "book-6",
    name: "Midori Solid Brass Mechanical Pencil (0.5mm) & Ruler Set",
    slug: "midori-brass-mechanical-pencil-set",
    category: "books-stationery",
    categoryName: "Books & Stationery",
    subcategory: "Office Supplies",
    description: "Minimalist Japanese solid raw brass drafting pencil that ages beautifully with a deep vintage golden patina.",
    fullDescription: "Made in a historic press factory in Tokyo, Japan. Machined out of solid untreated brass that reacts with air and touch oils to develop an individual vintage character. Includes matching 15cm solid brass drafting ruler.",
    specifications: {
      "Origin": "Tokyo, Japan by Traveler's Company (Midori)",
      "Lead Size": "0.5 mm standard drafting lead",
      "Material": "100% Solid raw brushed brass",
      "Mechanism": "Top click clutch lead advancement with hidden eraser"
    },
    price: 3290,
    originalPrice: 4200,
    discountPercentage: 22,
    rating: 4.7,
    reviewCount: 95,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["stationery", "pencil", "brass", "japanese", "office"]
  },
  {
    id: "book-7",
    name: "Deep Work by Cal Newport (Rules for Focused Success)",
    slug: "deep-work-cal-newport",
    category: "books-stationery",
    categoryName: "Books & Stationery",
    subcategory: "Educational Books",
    description: "Cultivate intense concentration and superhuman focus in a world overflowing with digital distractions.",
    fullDescription: "Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that allows you to quickly master complicated information and produce better results in less time. Wall Street Journal business bestseller.",
    specifications: {
      "Author": "Cal Newport (Associate Professor of CS at Georgetown)",
      "Publisher": "Grand Central Publishing",
      "Format": "Paperback with soft-touch matte lamination",
      "Pages": "304 pages"
    },
    price: 499,
    originalPrice: 799,
    discountPercentage: 38,
    rating: 4.8,
    reviewCount: 710,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["book", "productivity", "focus", "deepwork", "career"]
  },

  // ==========================================
  // 7. TOYS & KIDS (7 products)
  // ==========================================
  {
    id: "toy-1",
    name: "LEGO Star Wars Millennium Falcon Ultimate Collector Series 75192",
    slug: "lego-star-wars-millennium-falcon-75192",
    category: "toys-kids",
    categoryName: "Toys & Kids",
    subcategory: "Educational Toys",
    description: "7,541 pieces of pure detail. Deflector dish, quad laser cannons, 7 minifigures, and informative fact plaque.",
    fullDescription: "Welcome to the largest, most detailed LEGO Star Wars Millennium Falcon model we've ever created—in fact, with 7,541 pieces it's one of our biggest LEGO models, period! Features intricate exterior detailing, upper and lower quad laser cannons, and landing legs.",
    specifications: {
      "Pieces": "7,541 precision interlocking LEGO bricks",
      "Dimensions": "Over 21 cm high, 84 cm long and 60 cm wide",
      "Minifigures": "Han Solo, Chewbacca, Princess Leia, C-3PO, Older Han Solo, Rey, Finn",
      "Age Recommendation": "16+ (Ultimate Collector Series)"
    },
    price: 79999,
    originalPrice: 94999,
    discountPercentage: 16,
    rating: 4.9,
    reviewCount: 180,
    stock: 4,
    images: [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    tags: ["lego", "starwars", "collector", "toys", "building"]
  },
  {
    id: "toy-2",
    name: "Programmable Robotic STEM Coding Kit (Age 8-14)",
    slug: "programmable-robotic-stem-coding-kit",
    category: "toys-kids",
    categoryName: "Toys & Kids",
    subcategory: "Educational Toys",
    description: "Build 5 interactive robots. Learn Scratch & Python drag-and-drop logic with ultrasonic distance & line tracker sensors.",
    fullDescription: "Ignite your child's passion for robotics and AI. This all-in-one educational robotics kit comes with high-torque servo motors, colorful programmable LED eyes, sound sensors, and a step-by-step graphical coding app compatible with iOS, Android, and PC.",
    specifications: {
      "Parts": "350+ Snap-together mechanical parts & sensors",
      "Programming": "Block-based Scratch 3.0 & text-based Python",
      "Connectivity": "Bluetooth 5.0 wireless module",
      "Battery": "Rechargeable Lithium-ion battery pack with USB-C"
    },
    price: 4999,
    originalPrice: 7999,
    discountPercentage: 38,
    rating: 4.8,
    reviewCount: 215,
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80"
    ],
    isTrending: true,
    tags: ["stem", "robotics", "coding", "educational", "toys"]
  },
  {
    id: "toy-3",
    name: "Catan Board Game (The Settlers of Catan 5th Edition)",
    slug: "catan-board-game-settlers",
    category: "toys-kids",
    categoryName: "Toys & Kids",
    subcategory: "Games",
    description: "The multi-award winning social strategy board game of trading, building, and resource management.",
    fullDescription: "Picture yourself in the era of discoveries: after a long voyage of great deprivation, your ships have finally reached the coast of an uncharted island. Its name shall be Catan! Trade resources, build roads, settlements and cities, and roll the dice to outsmart your opponents.",
    specifications: {
      "Players": "3 to 4 Players (Expandable to 6)",
      "Playing Time": "60 to 90 minutes",
      "Age": "10 years to adult",
      "Components": "19 Hex terrain tiles, 96 resource cards, wooden settlements and roads"
    },
    price: 3199,
    originalPrice: 4499,
    discountPercentage: 29,
    rating: 4.9,
    reviewCount: 420,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80"
    ],
    isBestSeller: true,
    tags: ["boardgame", "catan", "family", "strategy", "games"]
  },
  {
    id: "toy-4",
    name: "Monopoly Deluxe Vintage Wooden Edition Board Game",
    slug: "monopoly-deluxe-wooden-vintage-edition",
    category: "toys-kids",
    categoryName: "Toys & Kids",
    subcategory: "Games",
    description: "Heirloom-quality solid wood cabinet with recessed felt game area, die-cast metal tokens, and wooden houses.",
    fullDescription: "Play the world's most famous board game in timeless luxury. Featuring a solid wood game cabinet with burled wood veneer, drawer storage with organizer tray, gold foil-stamped game board, and weighted die-cast vintage movers.",
    specifications: {
      "Cabinet": "Solid Hardwood with Mahogany finish & built-in banker tray",
      "Tokens": "10 Heavyweight die-cast antique brass tokens",
      "Money": "Custom foil-stamped Monopoly currency & deed cards",
      "Players": "2 to 8 Players"
    },
    price: 4499,
    originalPrice: 6999,
    discountPercentage: 36,
    rating: 4.7,
    reviewCount: 160,
    stock: 19,
    images: [
      "https://images.unsplash.com/photo-1563941402622-4e7a488bcc57?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["monopoly", "boardgame", "vintage", "family", "classics"]
  },
  {
    id: "toy-5",
    name: "Chicco Bravo 3-in-1 Trio Travel System (Stroller & KeyFit 30 Car Seat)",
    slug: "chicco-bravo-3-in-1-trio-travel-system",
    category: "toys-kids",
    categoryName: "Toys & Kids",
    subcategory: "Baby Products",
    description: "One-hand quick fold stroller with parent tray, UPF 50+ canopy, and premier infant car seat.",
    fullDescription: "A revolutionary 3-in-1 travel solution for growing families. Effortlessly transitions from lightweight infant car seat carrier to versatile full-size toddler stroller. Features multi-position recline, large storage basket, and auto-positioning wheels.",
    specifications: {
      "Includes": "Bravo Stroller + KeyFit 30 Infant Car Seat + Base",
      "Child Weight Capacity": "Car seat up to 13.6 kg; Stroller up to 22.7 kg",
      "Safety Rating": "#1 Rated Infant Car Seat in America with SuperCinch LATCH",
      "Fold": "One-hand smart self-standing fold"
    },
    price: 29999,
    originalPrice: 38999,
    discountPercentage: 23,
    rating: 4.9,
    reviewCount: 175,
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    tags: ["stroller", "baby", "chicco", "travelsystem", "kids"]
  },
  {
    id: "toy-6",
    name: "Philips Avent Natural Baby Bottle Essentials Gift Set (Anti-Colic)",
    slug: "philips-avent-natural-baby-bottle-set",
    category: "toys-kids",
    categoryName: "Toys & Kids",
    subcategory: "Baby Products",
    description: "Breast-shaped wide teat with flexible spiral design and anti-colic Airflex vent technology.",
    fullDescription: "The most natural way to bottle feed. The wide breast-shaped teat promotes a natural latch-on similar to the breast, making it easy for your baby to combine breast and bottle feeding. The unique petals inside the teat increase softness and flexibility without teat collapse.",
    specifications: {
      "Set Contents": "2x 125ml bottles, 2x 260ml bottles, bottle brush, newborn soother",
      "Material": "100% BPA-Free Polypropylene and silicone",
      "Vent System": "Twin anti-colic valve system vents air away from tummy",
      "Age": "0 to 12 months"
    },
    price: 2499,
    originalPrice: 3499,
    discountPercentage: 29,
    rating: 4.8,
    reviewCount: 380,
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["baby", "bottles", "philips", "anticolic", "feeding"]
  },
  {
    id: "toy-7",
    name: "Melissa & Doug Deluxe Wooden Building Blocks Set (100 Solid Pieces)",
    slug: "melissa-and-doug-wooden-building-blocks-100",
    category: "toys-kids",
    categoryName: "Toys & Kids",
    subcategory: "Educational Toys",
    description: "100 solid wood blocks in 4 colors and 9 distinct shapes for creative engineering and motor skill development.",
    fullDescription: "Classic creative play for early childhood development. This set of 100 durable wooden blocks will inspire hours of building, sorting, counting, and imaginative play. Colored with non-toxic, child-safe paints.",
    specifications: {
      "Pieces": "100 Precision-cut hardwood blocks",
      "Shapes": "Cubes, cylinders, arches, rectangular prisms, triangular roofs",
      "Safety": "Non-toxic paint, smooth rounded splinter-free edges",
      "Age": "2 to 8 years old"
    },
    price: 1999,
    originalPrice: 2999,
    discountPercentage: 33,
    rating: 4.8,
    reviewCount: 290,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["toys", "wooden", "blocks", "educational", "toddler"]
  }
];
