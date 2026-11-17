"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Mail, Phone, MapPin, CheckCircle, ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes("@")) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* 1. Value Proposition Features Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Free Express Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">On all orders above ₹999 or with coupon</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">100% Genuine Products</h4>
              <p className="text-xs text-slate-400 mt-0.5">Directly sourced verified merchandise</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">7-Day Easy Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hassle-free replacement guarantee</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">24/7 Dedicated Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Expert customer assistance anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Shop<span className="text-blue-500">Ease</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              ShopEase is a next-generation demonstration e-commerce shopping platform built for effortless discovery, seamless checkout simulation, and instant order invoicing.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Prestige Tech Cloud, Whitefield, Bengaluru, KA 560066</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>+91 (080) 4123-4567 / 1800-000-EASE</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>support@shopease.com</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Shop Categories</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/category/electronics" className="hover:text-blue-400 transition">
                  Electronics & Laptops
                </Link>
              </li>
              <li>
                <Link href="/category/fashion" className="hover:text-blue-400 transition">
                  Fashion & Footwear
                </Link>
              </li>
              <li>
                <Link href="/category/home-kitchen" className="hover:text-blue-400 transition">
                  Home & Appliances
                </Link>
              </li>
              <li>
                <Link href="/category/beauty-personal-care" className="hover:text-blue-400 transition">
                  Beauty & Skincare
                </Link>
              </li>
              <li>
                <Link href="/category/sports-fitness" className="hover:text-blue-400 transition">
                  Sports & Fitness
                </Link>
              </li>
              <li>
                <Link href="/category/books-stationery" className="hover:text-blue-400 transition">
                  Books & Stationery
                </Link>
              </li>
              <li>
                <Link href="/category/toys-kids" className="hover:text-blue-400 transition">
                  Toys & Kids
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Customer Care</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/account/orders" className="hover:text-blue-400 transition">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-blue-400 transition">
                  My Account & Addresses
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-blue-400 transition">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-blue-400 transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-400 font-semibold transition">
                  Admin Dashboard Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Stay Updated</h5>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Subscribe for exclusive flash sales, seasonal discount drops, and product announcements.
            </p>
            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 p-3 rounded-xl flex items-center gap-2 text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thanks for subscribing! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl text-xs transition shadow-md"
                >
                  Subscribe Now
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar with Payment Icons & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} <strong>ShopEase</strong> Inc. Built for Demonstration Purposes. No real financial transactions occur.
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Accepted Demo Payments:</span>
            <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono text-[10px]">UPI</span>
            <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono text-[10px]">RuPay</span>
            <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono text-[10px]">VISA</span>
            <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono text-[10px]">MasterCard</span>
            <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono text-[10px]">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
