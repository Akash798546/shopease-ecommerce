"use client";

import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Bengaluru, Karnataka",
    rating: 5,
    date: "November 12, 2026",
    product: "Apple iPhone 15 Pro Max & Sony Headphones",
    comment:
      "ShopEase provided an exceptionally smooth checkout experience! The simulated UPI payment verified instantly and the downloadable PDF tax invoice was remarkably detailed and professional.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    date: "November 08, 2026",
    product: "Instant Vortex Air Fryer & Breville Espresso",
    comment:
      "The product specifications and high-resolution photo gallery made it easy to choose kitchen gear. Love the coupon code SAVE10 which worked without any issues!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 3,
    name: "Ananya Iyer",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    date: "November 04, 2026",
    product: "Italian Tailored Blazer & Leather Duffle",
    comment:
      "Impressed by the sleek responsive design on mobile and the wishlist to cart transition. The admin panel demo also gives great insight into how orders are fulfilled.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
          Trusted by Shoppers
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Customer Experiences & Feedback
        </h2>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-800">4.9 out of 5</span>
          <span className="text-xs text-slate-400">based on 15,400+ reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between relative"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-slate-200" />
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6 italic">
                &ldquo;{item.comment}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                  <span title="Verified Customer">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">{item.location}</p>
                <p className="text-[10px] text-blue-600 font-medium truncate mt-0.5">
                  Purchased: {item.product}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
