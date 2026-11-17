"use client";

import React from "react";
import { useStore } from "@/context/AppContext";
import { Filter, RotateCcw, Star, Check } from "lucide-react";
import { formatPrice } from "@/utils/formatters";

interface FilterState {
  category: string;
  subcategory: string;
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
  sortBy: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  hideCategoryFilter?: boolean;
}

export default function ProductFilters({
  filters,
  setFilters,
  onReset,
  hideCategoryFilter = false,
}: ProductFiltersProps) {
  const { categories, products } = useStore();

  // Find selected category object to show subcategories
  const selectedCatObj = categories.find((c) => c.slug === filters.category);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-sm text-slate-900">Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* 1. Category Filter */}
      {!hideCategoryFilter && (
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
            Category
          </label>
          <div className="space-y-1">
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, category: "all", subcategory: "all" }))
              }
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                filters.category === "all"
                  ? "bg-blue-50 text-blue-700 font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>All Categories</span>
              <span className="text-[10px] text-slate-400">({products.length})</span>
            </button>

            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat.slug).length;
              const isSelected = filters.category === cat.slug;

              return (
                <button
                  key={cat.id}
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, category: cat.slug, subcategory: "all" }))
                  }
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] text-slate-400">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Subcategory Filter (if category selected) */}
      {selectedCatObj && selectedCatObj.subcategories.length > 0 && (
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
            Subcategory
          </label>
          <div className="space-y-1">
            <button
              onClick={() => setFilters((prev) => ({ ...prev, subcategory: "all" }))}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                filters.subcategory === "all"
                  ? "bg-blue-50 text-blue-700 font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              All {selectedCatObj.name}
            </button>
            {selectedCatObj.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setFilters((prev) => ({ ...prev, subcategory: sub }))}
                className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  filters.subcategory === sub
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Price Range Filter */}
      <div className="pt-4 border-t border-slate-100">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Max Price: {formatPrice(filters.priceRange[1])}
        </label>
        <input
          type="range"
          min="300"
          max="350000"
          step="500"
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [prev.priceRange[0], Number(e.target.value)],
            }))
          }
          className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
        />
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
          <span>₹300</span>
          <span>₹3,50,000</span>
        </div>
      </div>

      {/* 4. Minimum Customer Rating */}
      <div className="pt-4 border-t border-slate-100">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Customer Rating
        </label>
        <div className="space-y-1.5">
          {[4, 4.5, 3].map((stars) => (
            <button
              key={stars}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  minRating: prev.minRating === stars ? 0 : stars,
                }))
              }
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition ${
                filters.minRating === stars
                  ? "bg-amber-50 text-amber-900 font-bold border border-amber-200"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(stars)
                          ? "fill-amber-400 text-amber-400"
                          : i < stars
                          ? "fill-amber-400/50 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span>{stars}★ & above</span>
              </div>
              {filters.minRating === stars && <Check className="w-3.5 h-3.5 text-amber-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* 5. In Stock Only Toggle */}
      <div className="pt-4 border-t border-slate-100">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
            }
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
          />
          <span className="text-xs font-medium text-slate-700">In-Stock Items Only</span>
        </label>
      </div>
    </div>
  );
}
