"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/AppContext";
import {
  ShoppingBag,
  Heart,
  ShoppingCart,
  User as UserIcon,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  Layers,
  Sparkles,
  Laptop,
  Shirt,
  Home,
  Activity,
  BookOpen,
  Smile,
  Phone,
} from "lucide-react";
import { formatPrice } from "@/utils/formatters";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  electronics: Laptop,
  fashion: Shirt,
  "home-kitchen": Home,
  "beauty-personal-care": Sparkles,
  "sports-fitness": Activity,
  "books-stationery": BookOpen,
  "toys-kids": Smile,
};

export default function Navbar() {
  const router = useRouter();
  const {
    cartCount,
    cartSubtotal,
    wishlistCount,
    user,
    logout,
    products,
    categories,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close popups on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter products for live search preview
  const filteredProducts = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 6)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* 1. Customer Top Announcement Bar (No Admin Controls Here!) */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-amber-400 text-slate-900 font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wide uppercase">
              Special Offer
            </span>
            <span>
              Use coupon <strong className="underline decoration-amber-300">SAVE10</strong> for 10% off | Free Delivery on orders over ₹999
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 shrink-0 text-blue-100 text-xs">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-amber-300" />
              <span>Support: 1800-000-EASE</span>
            </span>
            <span className="text-blue-300/50">|</span>
            <Link href="/account/orders" className="hover:text-white transition">
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">
                Shop<span className="text-blue-600">Ease</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold">
                Online Shopping
              </span>
            </div>
          </Link>

          {/* Search Bar with Autocomplete Suggestions */}
          <div ref={searchRef} className="relative flex-1 max-w-2xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Search across 50+ electronics, fashion, home, books..."
                className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-900 pl-11 pr-24 py-2.5 rounded-full border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors shadow-xs"
              >
                Search
              </button>
            </form>

            {/* Live Search Autocomplete Popup */}
            {showSearchDropdown && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Product suggestions for &ldquo;<strong>{searchQuery}</strong>&rdquo;</span>
                  <span>{filteredProducts.length} results</span>
                </div>
                {filteredProducts.length > 0 ? (
                  <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                    {filteredProducts.map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/products/${prod.id}`}
                        onClick={() => {
                          setShowSearchDropdown(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-blue-50/50 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              e.currentTarget.src =
                                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect fill='%23e2e8f0' width='100' height='100'/><text fill='%2364748b' x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10'>ShopEase</text></svg>";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate group-hover:text-blue-600">
                            {prod.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                              {prod.categoryName}
                            </span>
                            <span className="text-xs font-bold text-slate-900">
                              {formatPrice(prod.price)}
                            </span>
                            {prod.originalPrice > prod.price && (
                              <span className="text-xs text-slate-400 line-through">
                                {formatPrice(prod.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                    <div className="p-2.5 bg-slate-50 text-center">
                      <button
                        onClick={handleSearchSubmit}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        View all search results &rarr;
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-slate-500">
                    No products found matching &ldquo;{searchQuery}&rdquo;.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons (Wishlist, Cart, User) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-full text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Link */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-3 py-2 rounded-full text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-colors"
              title="View Shopping Cart"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-xs font-bold text-slate-800">
                {cartCount > 0 ? formatPrice(cartSubtotal) : "₹0"}
              </span>
            </Link>

            {/* User Profile Menu (Pure Customer View) */}
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-slate-200 hover:border-blue-400 hover:bg-slate-50 transition-colors text-slate-700"
                aria-label="User Account"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                  {user ? user.fullName.charAt(0) : <UserIcon className="w-4 h-4" />}
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-xs font-semibold leading-tight truncate max-w-[90px]">
                    {user ? user.fullName : "Sign In"}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-none">
                    {user ? "My Account" : "Welcome"}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70">
                        <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{user.fullName}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/account"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <UserIcon className="w-4 h-4 text-slate-400" />
                          My Profile & Addresses
                        </Link>
                        <Link
                          href="/account/orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Package className="w-4 h-4 text-slate-400" />
                          My Orders & Invoices
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Heart className="w-4 h-4 text-slate-400" />
                          My Wishlist ({wishlistCount})
                        </Link>
                      </div>

                      <div className="border-t border-slate-100 pt-1 mt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors font-medium"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3">
                      <p className="text-xs text-slate-500 mb-3 px-1 leading-relaxed">
                        Sign in to track orders, manage saved addresses, and complete checkout.
                      </p>
                      <Link
                        href="/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block w-full py-2 px-3 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                      >
                        Sign In
                      </Link>
                      <div className="mt-2 text-center">
                        <Link
                          href="/register"
                          onClick={() => setUserDropdownOpen(false)}
                          className="text-xs text-blue-600 font-semibold hover:underline block py-1"
                        >
                          New customer? Create account &rarr;
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 md:hidden transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 50+ products..."
              className="w-full bg-slate-100 text-slate-900 pl-10 pr-20 py-2 rounded-xl text-sm border border-slate-200 outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* 3. Horizontal Categories Secondary Bar */}
      <nav className="border-t border-slate-100 bg-slate-50/80 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 lg:space-x-2 overflow-x-auto py-2 no-scrollbar text-xs font-medium text-slate-600">
              <Link
                href="/products"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white hover:text-blue-600 hover:shadow-xs transition-all whitespace-nowrap font-bold text-slate-900"
              >
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                All Products
              </Link>

              {categories.map((cat) => {
                const IconComponent = CATEGORY_ICONS[cat.slug] || Layers;
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white hover:text-blue-600 hover:shadow-xs transition-all whitespace-nowrap"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-slate-400" />
                    {cat.name}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/products?filter=bestseller"
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 py-1"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                Trending Deals
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Slide-out Menu (Customer Pure) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 shadow-xl">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
            Categories
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold"
            >
              <Layers className="w-4 h-4" />
              All Catalog (50+)
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition"
              >
                <span className="truncate">{cat.name}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2">
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50"
            >
              <span>My Account</span>
              <UserIcon className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/account/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50"
            >
              <span>My Orders & Invoices</span>
              <Package className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
