"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/context/AppContext";
import ProductCard from "../product/ProductCard";
import { Flame, Clock, ArrowRight } from "lucide-react";

export default function FlashDeals() {
  const { products } = useStore();

  // Simulated countdown timer: ends at midnight or 8 hours from load
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 8, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter products with high discount (> 20%)
  const dealProducts = products
    .filter((p) => p.discountPercentage >= 25)
    .slice(0, 4);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 border border-rose-200/60 rounded-3xl p-6 sm:p-8 shadow-xs">
        {/* Header with Live Ticker */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
              <Flame className="w-4 h-4 fill-white" />
              <span>Limited Time Flash Deals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Save Up to 45% Today Only
            </h2>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-rose-100 self-start md:self-auto">
            <Clock className="w-5 h-5 text-rose-500 animate-pulse" />
            <div className="flex items-center gap-1 text-slate-800">
              <span className="text-xs font-semibold text-slate-400 mr-1">Ends in:</span>
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <span className="font-bold text-slate-400">:</span>
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <span className="font-bold text-slate-400">:</span>
              <div className="w-8 h-8 rounded-lg bg-rose-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* Product Deals Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <Link
            href="/products?filter=trending"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow-sm hover:scale-105"
          >
            <span>View All Deals & Discounts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
