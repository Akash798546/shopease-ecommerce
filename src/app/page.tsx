"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FlashDeals from "@/components/home/FlashDeals";
import PromoBanners from "@/components/home/PromoBanners";
import CustomerReviews from "@/components/home/CustomerReviews";
import ProductCard from "@/components/product/ProductCard";
import ToastContainer from "@/components/ui/ToastContainer";
import { useStore } from "@/context/AppContext";
import { ArrowRight, Sparkles, TrendingUp, Award, Layers } from "lucide-react";

export default function HomePage() {
  const { products } = useStore();

  const [activeTab, setActiveTab] = useState<"trending" | "bestseller" | "new">("trending");

  // Filter products for homepage sections
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNewArrival || p.discountPercentage >= 30).slice(0, 8);

  const displayedProducts =
    activeTab === "trending"
      ? trendingProducts
      : activeTab === "bestseller"
      ? bestSellers
      : newArrivals;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <ToastContainer />

      <main className="flex-1">
        {/* 1. Hero Promotional Banner */}
        <HeroBanner />

        {/* 2. Featured Categories Grid */}
        <CategoryShowcase />

        {/* 3. Limited Time Flash Deals Ticker */}
        <FlashDeals />

        {/* 4. Tabbed Highlights: Trending / Best Sellers / New Arrivals */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Handpicked Favorites
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Featured Product Highlights
              </h2>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-2xl self-start sm:self-auto">
              <button
                onClick={() => setActiveTab("trending")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "trending"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Trending Now</span>
              </button>

              <button
                onClick={() => setActiveTab("bestseller")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "bestseller"
                    ? "bg-white text-amber-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Best Sellers</span>
              </button>

              <button
                onClick={() => setActiveTab("new")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "new"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Arrivals</span>
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-2xl transition shadow-md shadow-blue-500/20 hover:scale-105"
            >
              <Layers className="w-4 h-4" />
              <span>Browse Full Catalog (50+ Products)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 5. Special Promotional Coupon Banners */}
        <PromoBanners />

        {/* 6. Customer Reviews & Ratings */}
        <CustomerReviews />
      </main>

      <Footer />
    </div>
  );
}
