"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, ShieldCheck, Zap, Truck } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    tag: "SUMMER SALE IS LIVE",
    title: "Next-Gen Electronics & Flagship Devices",
    description: "Upgrade your lifestyle with iPhone 15 Pro, M3 MacBooks, Sony ANC audio & smart home gadgets with up to 40% demo savings.",
    ctaText: "Shop Electronics",
    ctaLink: "/category/electronics",
    secondaryCtaText: "View All Deals",
    secondaryCtaLink: "/products?filter=trending",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80",
    theme: "from-blue-950/90 via-slate-900/80 to-transparent",
  },
  {
    id: 2,
    tag: "FRESH ARRIVALS 2026",
    title: "Curated Designer Fashion & Footwear",
    description: "From tailored virgin wool blazers and silk dresses to iconic Nike Pegasus runners and full-grain leather bags.",
    ctaText: "Explore Fashion",
    ctaLink: "/category/fashion",
    secondaryCtaText: "Shop Women's Wear",
    secondaryCtaLink: "/category/fashion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    theme: "from-purple-950/90 via-slate-900/80 to-transparent",
  },
  {
    id: 3,
    tag: "MODERN LIVING",
    title: "Elevate Your Home, Kitchen & Decor",
    description: "Transform your living space with smart kitchen appliances, ergonomic workspaces, ambient lighting, and artisanal ceramics.",
    ctaText: "Shop Home & Kitchen",
    ctaLink: "/category/home-kitchen",
    secondaryCtaText: "Kitchen Essentials",
    secondaryCtaLink: "/category/home-kitchen",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    theme: "from-emerald-950/90 via-slate-900/80 to-transparent",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl shadow-2xl mx-4 sm:mx-6 lg:mx-8 my-6">
      {/* Background Image Container */}
      <div className="relative min-h-[460px] sm:min-h-[520px] flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 transform scale-100"
          onError={(e) => {
            e.currentTarget.src =
              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'><rect fill='%230f172a' width='1200' height='600'/></svg>";
          }}
        />

        {/* Gradient Overlay for Text Readability */}
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.theme}`} />

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-12 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wider uppercase mb-4 backdrop-blur-xs w-fit animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{slide.tag}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-4 text-white drop-shadow-md">
            {slide.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 mb-8 max-w-xl leading-relaxed">
            {slide.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={slide.ctaLink}
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={slide.secondaryCtaLink}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              {slide.secondaryCtaText}
            </Link>
          </div>
        </div>

        {/* Slider Navigation Buttons */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all hover:scale-110 hidden sm:flex items-center justify-center border border-white/10"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all hover:scale-110 hidden sm:flex items-center justify-center border border-white/10"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "w-8 bg-blue-500" : "w-2 bg-white/40 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Highlights Bar */}
      <div className="bg-slate-900/90 border-t border-white/10 px-6 py-3.5 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-slate-300 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-blue-400" />
          <span>Free Express Shipping &gt; ₹999</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Genuine Brand Warranty</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Simulated 1-Click Payments</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Instant Downloadable PDF Invoices</span>
        </div>
      </div>
    </div>
  );
}
