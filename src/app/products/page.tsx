"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import ToastContainer from "@/components/ui/ToastContainer";
import { useStore } from "@/context/AppContext";
import { SlidersHorizontal, X, Search, Sparkles } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") || "all";
  const urlSearch = searchParams.get("search") || "";
  const urlFilter = searchParams.get("filter") || "";

  const { products, categories } = useStore();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(urlSearch);

  const [filters, setFilters] = useState({
    category: urlCategory,
    subcategory: "all",
    priceRange: [0, 350000] as [number, number],
    minRating: 0,
    inStockOnly: false,
    sortBy: urlFilter === "trending" ? "trending" : urlFilter === "bestseller" ? "bestseller" : "featured",
  });

  const handleResetFilters = () => {
    setFilters({
      category: "all",
      subcategory: "all",
      priceRange: [0, 350000],
      minRating: 0,
      inStockOnly: false,
      sortBy: "featured",
    });
    setSearchTerm("");
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search Filter
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.categoryName.toLowerCase().includes(q);
          const matchSub = p.subcategory.toLowerCase().includes(q);
          const matchTag = p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchCat && !matchSub && !matchTag) return false;
        }

        // Category Filter
        if (filters.category !== "all" && p.category !== filters.category) {
          return false;
        }

        // Subcategory Filter
        if (filters.subcategory !== "all" && p.subcategory !== filters.subcategory) {
          return false;
        }

        // Price Filter
        if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
          return false;
        }

        // Rating Filter
        if (filters.minRating > 0 && p.rating < filters.minRating) {
          return false;
        }

        // Stock Filter
        if (filters.inStockOnly && p.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.price - b.price;
        if (filters.sortBy === "price-desc") return b.price - a.price;
        if (filters.sortBy === "rating") return b.rating - a.rating;
        if (filters.sortBy === "bestseller") return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        if (filters.sortBy === "trending") return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
        if (filters.sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // featured default order
      });
  }, [products, searchTerm, filters]);

  // Active Category Name
  const activeCategoryObj = categories.find((c) => c.slug === filters.category);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <ToastContainer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Page Title & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Catalog</span>
              <span>/</span>
              <span className="font-semibold text-blue-600">
                {activeCategoryObj ? activeCategoryObj.name : "All Products"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeCategoryObj ? activeCategoryObj.name : "Browse All Products"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {filteredProducts.length} of {products.length} curated products
            </p>
          </div>

          {/* Quick Filter Search & Mobile Filter Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter current results..."
                className="w-full bg-white text-slate-900 pl-9 pr-8 py-2 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-blue-500 shadow-xs"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Sort Controls Bar & Active Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 mb-6 shadow-xs">
          {/* Active Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Active:</span>

            {filters.category !== "all" && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-medium">
                Category: {activeCategoryObj?.name}
                <button onClick={() => setFilters((p) => ({ ...p, category: "all", subcategory: "all" }))}>
                  <X className="w-3 h-3 hover:text-blue-900" />
                </button>
              </span>
            )}

            {filters.subcategory !== "all" && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-medium">
                {filters.subcategory}
                <button onClick={() => setFilters((p) => ({ ...p, subcategory: "all" }))}>
                  <X className="w-3 h-3 hover:text-blue-900" />
                </button>
              </span>
            )}

            {filters.minRating > 0 && (
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg font-medium">
                {filters.minRating}★ & above
                <button onClick={() => setFilters((p) => ({ ...p, minRating: 0 }))}>
                  <X className="w-3 h-3 hover:text-amber-900" />
                </button>
              </span>
            )}

            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg font-medium">
                In Stock Only
                <button onClick={() => setFilters((p) => ({ ...p, inStockOnly: false }))}>
                  <X className="w-3 h-3 hover:text-emerald-900" />
                </button>
              </span>
            )}

            {searchTerm && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                &ldquo;{searchTerm}&rdquo;
                <button onClick={() => setSearchTerm("")}>
                  <X className="w-3 h-3 hover:text-slate-900" />
                </button>
              </span>
            )}

            {(filters.category !== "all" ||
              filters.subcategory !== "all" ||
              filters.minRating > 0 ||
              filters.inStockOnly ||
              searchTerm) && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-600 font-semibold hover:underline ml-1"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <label htmlFor="sort-select" className="text-xs text-slate-500 font-medium">Sort by:</label>
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={(e) => setFilters((p) => ({ ...p, sortBy: e.target.value }))}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="bestseller">Best Sellers</option>
              <option value="trending">Trending Deals</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Left Sidebar: Filters */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                onReset={handleResetFilters}
              />
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>

        {/* Mobile Slide-in Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end lg:hidden">
            <div className="bg-white w-full max-w-xs h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <h3 className="font-bold text-base text-slate-900">Filters</h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <ProductFilters
                  filters={filters}
                  setFilters={setFilters}
                  onReset={handleResetFilters}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md"
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

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-medium">Loading catalog...</p>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
