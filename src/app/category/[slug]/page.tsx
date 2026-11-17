"use client";

import React, { useState, useMemo, use } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import ToastContainer from "@/components/ui/ToastContainer";
import { useStore } from "@/context/AppContext";
import { SlidersHorizontal, ChevronRight, Sparkles } from "lucide-react";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const { categories, products } = useStore();

  const currentCategory = categories.find((c) => c.slug === slug);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: slug,
    subcategory: "all",
    priceRange: [0, 350000] as [number, number],
    minRating: 0,
    inStockOnly: false,
    sortBy: "featured",
  });

  const handleResetFilters = () => {
    setFilters({
      category: slug,
      subcategory: "all",
      priceRange: [0, 350000],
      minRating: 0,
      inStockOnly: false,
      sortBy: "featured",
    });
  };

  // Filter products strictly for this category
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (p.category !== slug) return false;
        if (filters.subcategory !== "all" && p.subcategory !== filters.subcategory) return false;
        if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
        if (filters.minRating > 0 && p.rating < filters.minRating) return false;
        if (filters.inStockOnly && p.stock <= 0) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.price - b.price;
        if (filters.sortBy === "price-desc") return b.price - a.price;
        if (filters.sortBy === "rating") return b.rating - a.rating;
        if (filters.sortBy === "bestseller") return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        if (filters.sortBy === "trending") return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
        if (filters.sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0;
      });
  }, [products, slug, filters]);

  if (!currentCategory) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Category Not Found</h2>
            <p className="text-xs text-slate-500 mb-6">
              The category you are looking for does not exist or has been moved.
            </p>
            <Link
              href="/products"
              className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl"
            >
              Browse All Categories
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <ToastContainer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-blue-600">Categories</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">{currentCategory.name}</span>
        </div>

        {/* Hero Category Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white mb-8 min-h-[220px] sm:min-h-[260px] flex items-center shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentCategory.image}
            alt={currentCategory.name}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />

          <div className="relative z-10 p-6 sm:p-10 max-w-xl">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/20 px-2.5 py-0.5 rounded-full mb-3 backdrop-blur-xs">
              <Sparkles className="w-3 h-3" />
              Category Collection
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
              {currentCategory.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {currentCategory.description}
            </p>

            {/* Subcategory Pills */}
            <div className="flex flex-wrap gap-2">
              {currentCategory.subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      subcategory: prev.subcategory === sub ? "all" : sub,
                    }))
                  }
                  className={`text-xs px-3 py-1 rounded-full font-medium transition backdrop-blur-xs ${
                    filters.subcategory === sub
                      ? "bg-white text-slate-900 font-bold"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 mb-6 shadow-xs">
          <div className="text-xs font-semibold text-slate-700">
            Showing {filteredProducts.length} items in <strong>{currentCategory.name}</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span>Filters</span>
            </button>

            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((p) => ({ ...p, sortBy: e.target.value }))}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="bestseller">Best Sellers</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>

        {/* Main Grid with Sidebar Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                onReset={handleResetFilters}
                hideCategoryFilter={true}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <ProductGrid
              products={filteredProducts}
              emptyMessage={`No items found matching selected filters in ${currentCategory.name}.`}
            />
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end lg:hidden">
            <div className="bg-white w-full max-w-xs h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 mb-4 pb-3 border-b border-slate-100">
                  {currentCategory.name} Filters
                </h3>
                <ProductFilters
                  filters={filters}
                  setFilters={setFilters}
                  onReset={handleResetFilters}
                  hideCategoryFilter={true}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  Apply Filters ({filteredProducts.length} Results)
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
