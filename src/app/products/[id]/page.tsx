"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import ToastContainer from "@/components/ui/ToastContainer";
import { useStore } from "@/context/AppContext";
import { formatPrice } from "@/utils/formatters";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  Share2,
  Info,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;

  const {
    products,
    getProductById,
    addToCart,
    toggleWishlist,
    isInWishlist,
    showToast,
  } = useStore();

  const product = getProductById(productId);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "desc" | "reviews">("specs");
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [reviewsList, setReviewsList] = useState([
    {
      id: "rev-1",
      name: "Siddharth N.",
      rating: 5,
      date: "3 days ago",
      comment: "Outstanding build quality and fast dispatch. Exactly as depicted in the photos!",
    },
    {
      id: "rev-2",
      name: "Meera K.",
      rating: 5,
      date: "1 week ago",
      comment: "Extremely pleased with the purchase. Great value for the discounted price.",
    },
  ]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Product Not Found</h2>
            <p className="text-xs text-slate-500 mb-6">
              The product you are looking for does not exist in the catalog or has been retired.
            </p>
            <Link
              href="/products"
              className="px-5 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-xl"
            >
              Browse All Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    setReviewsList((prev) => [
      {
        id: "rev-" + Date.now(),
        name: newReview.name,
        rating: newReview.rating,
        date: "Just now",
        comment: newReview.comment,
      },
      ...prev,
    ]);
    setNewReview({ name: "", rating: 5, comment: "" });
    showToast("Review Submitted", "Thank you for sharing your product feedback!", "success");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link Copied", "Product link copied to your clipboard.", "info");
    }
  };

  const fallbackSvg =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'><rect fill='%23f1f5f9' width='600' height='600'/><text fill='%2364748b' x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' font-weight='600'>ShopEase</text></svg>";

  const mainImage = product.images[selectedImageIndex] || product.images[0] || fallbackSvg;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <ToastContainer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/products" className="hover:text-blue-600">Catalog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href={`/category/${product.category}`} className="hover:text-blue-600">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800 truncate max-w-[240px] sm:max-w-none">
            {product.name}
          </span>
        </div>

        {/* 2-Column Product Hero Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = fallbackSvg;
                }}
              />

              {product.discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-sm">
                  {product.discountPercentage}% OFF
                </div>
              )}

              <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-sm transition"
                title="Share product link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                      selectedImageIndex === idx
                        ? "border-blue-600 ring-2 ring-blue-100"
                        : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = fallbackSvg;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Overview & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Category, Subcategory & Badges */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {product.categoryName} &bull; {product.subcategory}
                </span>
                {product.isBestSeller && (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Best Seller
                  </span>
                )}
                {product.isTrending && (
                  <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Trending
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating & Review Summary */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg text-amber-800 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-slate-500">
                  {product.reviewCount} Verified Customer Ratings
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                </span>
              </div>

              {/* Pricing Display */}
              <div className="bg-slate-50 p-4 rounded-2xl mb-6 flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-black text-slate-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice > product.price && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Save {formatPrice(product.originalPrice - product.price)} (
                    {product.discountPercentage}% OFF)
                  </span>
                )}
                <div className="w-full text-[11px] text-slate-400 mt-1">
                  Inclusive of all taxes &bull; Standard demo delivery ₹0 / ₹99
                </div>
              </div>

              {/* Short Description */}
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Stock Availability Indicator */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">Stock Availability</span>
                  <span className={product.stock <= 5 ? "font-bold text-amber-600" : "font-semibold text-slate-500"}>
                    {product.stock > 0 ? `${product.stock} units left in demo inventory` : "Sold Out"}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      product.stock <= 5 ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                    style={{
                      width: `${Math.min(100, Math.max(10, (product.stock / 50) * 100))}%`,
                    }}
                  />
                </div>
              </div>

              {/* Quantity Selector & Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-200 rounded-2xl bg-white p-1 shadow-xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-sm text-slate-900 font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      disabled={quantity >= product.stock}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Wishlist Toggle */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-2xl border transition-all flex items-center gap-2 text-xs font-semibold ${
                      inWishlist
                        ? "bg-rose-50 border-rose-200 text-rose-600"
                        : "border-slate-200 text-slate-700 hover:border-rose-300 hover:bg-rose-50/50"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
                    <span className="hidden sm:inline">
                      {inWishlist ? "Saved in Wishlist" : "Add to Wishlist"}
                    </span>
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add {quantity} to Cart &bull; {formatPrice(product.price * quantity)}</span>
                  </button>

                  <Link
                    href="/checkout"
                    onClick={() => addToCart(product, quantity)}
                    className="py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition text-center shadow-md hidden sm:block shrink-0"
                  >
                    Instant Checkout
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust Assurance Bar */}
            <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-100 text-center">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-blue-600 mb-1" />
                <span className="text-[11px] font-bold text-slate-800">Fast Shipping</span>
                <span className="text-[10px] text-slate-400">Within 3-5 days</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                <span className="text-[11px] font-bold text-slate-800">100% Genuine</span>
                <span className="text-[10px] text-slate-400">Direct from brand</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-amber-600 mb-1" />
                <span className="text-[11px] font-bold text-slate-800">7 Days Return</span>
                <span className="text-[10px] text-slate-400">Demo warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs (Specifications, Description, Reviews) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs mb-12">
          {/* Tab Headers */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-6">
            <button
              onClick={() => setActiveTab("specs")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "specs"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Key Specifications
            </button>
            <button
              onClick={() => setActiveTab("desc")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "desc"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Detailed Overview
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "reviews"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Customer Reviews ({reviewsList.length + product.reviewCount})
            </button>
          </div>

          {/* Specifications Tab */}
          {activeTab === "specs" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <span className="font-semibold text-slate-500 w-1/3">{key}</span>
                  <span className="font-bold text-slate-800 w-2/3 text-right">{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Overview Tab */}
          {activeTab === "desc" && (
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed max-w-3xl">
              <p>{product.fullDescription}</p>
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-900 text-xs">
                <span className="font-bold">Tags: </span>
                {product.tags.map((tag) => (
                  <span key={tag} className="inline-block bg-white px-2 py-0.5 rounded mr-1.5 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab & Write a Review */}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              {/* Existing Reviews List */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{rev.name}</span>
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold">
                          Verified Demo Buyer
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-400 mb-2">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Write a Review Form */}
              <div className="pt-6 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-3">Add Your Product Review</h4>
                <form onSubmit={handleAddReview} className="space-y-3 max-w-lg">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Aditi Rao"
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
                    <div className="flex gap-2">
                      {[5, 4, 3, 2, 1].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setNewReview((p) => ({ ...p, rating: num }))}
                          className={`px-3 py-1 text-xs rounded-lg font-bold border transition ${
                            newReview.rating === num
                              ? "bg-amber-400 text-slate-900 border-amber-400"
                              : "bg-white text-slate-600 border-slate-200"
                          }`}
                        >
                          {num} ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Feedback</label>
                    <textarea
                      rows={3}
                      value={newReview.comment}
                      onChange={(e) => setNewReview((p) => ({ ...p, comment: e.target.value }))}
                      placeholder="Write your impressions regarding quality, delivery, and performance..."
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  More in {product.categoryName}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                  Related Products You Might Like
                </h3>
              </div>
              <Link
                href={`/category/${product.category}`}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
