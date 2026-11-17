"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check, Tag, ArrowRight, Gift } from "lucide-react";

export default function PromoBanners() {
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner 1: Coupon SAVE10 */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-lg">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-xs">
              <Gift className="w-3.5 h-3.5 text-amber-300" />
              <span>Instant Cart Savings</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-2">
              Save 10% Extra on Every Order
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mb-6 leading-relaxed max-w-sm">
              Use promo code at checkout on orders above ₹499. Valid across all 7 shopping categories.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-3 py-1.5">
              <Tag className="w-4 h-4 text-amber-300 mr-2" />
              <span className="font-mono font-bold text-sm tracking-wider mr-3">SAVE10</span>
              <button
                onClick={() => handleCopy("SAVE10")}
                className="text-xs bg-white text-blue-900 font-bold px-2.5 py-1 rounded-lg hover:bg-amber-300 transition-colors flex items-center gap-1 shadow-xs"
              >
                {copiedCoupon === "SAVE10" ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy
                  </>
                )}
              </button>
            </div>

            <Link
              href="/products"
              className="text-xs font-bold underline decoration-white/40 hover:decoration-white ml-auto"
            >
              Shop Now &rarr;
            </Link>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        </div>

        {/* Banner 2: Free Delivery Offer */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-lg">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-xs">
              <Tag className="w-3.5 h-3.5 text-teal-200" />
              <span>Zero Shipping Charges</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-2">
              Free Express Doorstep Shipping
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 mb-6 leading-relaxed max-w-sm">
              Automatically applied on cart orders exceeding ₹999 or by applying demo coupon <strong>FREESHIP</strong>.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-3 py-1.5">
              <span className="font-mono font-bold text-sm tracking-wider mr-3">FREESHIP</span>
              <button
                onClick={() => handleCopy("FREESHIP")}
                className="text-xs bg-white text-teal-900 font-bold px-2.5 py-1 rounded-lg hover:bg-teal-200 transition-colors flex items-center gap-1 shadow-xs"
              >
                {copiedCoupon === "FREESHIP" ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy
                  </>
                )}
              </button>
            </div>

            <Link
              href="/products"
              className="text-xs font-bold flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl transition ml-auto"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
