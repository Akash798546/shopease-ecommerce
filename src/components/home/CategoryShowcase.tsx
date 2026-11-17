"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/AppContext";
import { ArrowUpRight } from "lucide-react";

export default function CategoryShowcase() {
  const { categories, products } = useStore();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Curated Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Explore by Category
          </h2>
        </div>
        <Link
          href="/products"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group self-start sm:self-auto"
        >
          <span>View All Categories</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat, idx) => {
          const categoryProductCount = products.filter((p) => p.category === cat.slug).length;

          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={`group relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 ${
                idx === 0 ? "col-span-2 row-span-1 md:row-span-2 aspect-[16/9] md:aspect-auto" : "aspect-square"
              }`}
            >
              {/* Background Category Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect fill='%23cbd5e1' width='400' height='400'/></svg>";
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent group-hover:from-blue-950/90 transition-colors duration-300" />

              {/* Category Card Content */}
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white">
                <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider mb-1">
                  {categoryProductCount} Products Available
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-1 text-white group-hover:text-blue-200 transition-colors flex items-center justify-between">
                  <span>{cat.name}</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1 hidden sm:block">
                  {cat.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
