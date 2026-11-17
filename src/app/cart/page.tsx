"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastContainer from "@/components/ui/ToastContainer";
import { useStore } from "@/context/AppContext";
import { formatPrice } from "@/utils/formatters";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Check,
  X,
  Truck,
  ShieldCheck,
  ChevronRight,
  Gift,
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    deliveryFee,
    discountAmount,
    orderTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    user,
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponCodeInput;
    if (!code) return;
    const res = applyCoupon(code);
    setCouponFeedback(res);
    if (res.success) {
      setCouponCodeInput("");
    }
  };

  const freeShippingThreshold = 999;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const fallbackSvg =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect fill='%23f1f5f9' width='100' height='100'/><text fill='%2364748b' x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10'>ShopEase</text></svg>";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <ToastContainer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Shopping Cart</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {cart.length > 0
                ? `You have ${cart.reduce((a, b) => a + b.quantity, 0)} item(s) in your basket.`
                : "Your cart is currently empty."}
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Empty Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Your Cart is Empty</h2>
            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
              Explore our wide selection of electronics, fashion, home essentials, books, and sports gear.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition shadow-md shadow-blue-500/20"
            >
              <span>Start Shopping Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Cart Content Layout (2 columns: List & Summary) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Delivery Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <Truck className="w-4 h-4 text-blue-600" />
                    {amountNeededForFreeShipping === 0 ? (
                      <span className="text-emerald-600 font-bold">
                        Congratulations! You have qualified for FREE Delivery!
                      </span>
                    ) : (
                      <span>
                        Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> more to get{" "}
                        <strong className="text-blue-600">FREE Delivery</strong>
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">
                    {Math.round(freeShippingProgress)}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      amountNeededForFreeShipping === 0 ? "bg-emerald-500" : "bg-blue-600"
                    }`}
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-3xl border border-slate-200/80 divide-y divide-slate-100 shadow-xs overflow-hidden">
                {cart.map((item) => (
                  <div key={item.product.id} className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-center">
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.product.id}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.images[0] || fallbackSvg}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = fallbackSvg;
                        }}
                      />
                    </Link>

                    {/* Product Information */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                            {item.product.categoryName}
                          </span>
                          <Link
                            href={`/products/${item.product.id}`}
                            className="block text-sm font-bold text-slate-900 truncate hover:text-blue-600 transition"
                          >
                            {item.product.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Pricing & Quantity Row */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-black text-slate-900">
                            {formatPrice(item.product.price)}
                          </span>
                          {item.product.originalPrice > item.product.price && (
                            <span className="text-xs text-slate-400 line-through">
                              {formatPrice(item.product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white disabled:opacity-30 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="hidden sm:block text-right">
                          <span className="text-xs text-slate-400 block">Total:</span>
                          <span className="text-sm font-bold text-slate-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="flex justify-between items-center pt-2">
                <Link
                  href="/products"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  &larr; Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary & Coupon (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Coupon Codes Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-sm text-slate-900">Apply Discount Coupon</h3>
                </div>

                {appliedCoupon ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>{appliedCoupon.code} Applied</span>
                      </div>
                      <p className="text-[11px] text-emerald-700 mt-0.5">
                        {appliedCoupon.description} (-{formatPrice(discountAmount)})
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="p-1 rounded-lg text-emerald-700 hover:bg-emerald-100"
                      title="Remove coupon"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                        placeholder="Enter coupon code"
                        className="flex-1 bg-slate-50 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 uppercase font-mono tracking-wider focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={() => handleApplyCoupon()}
                        className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
                      >
                        Apply
                      </button>
                    </div>

                    {couponFeedback && !couponFeedback.success && (
                      <p className="text-xs text-rose-600 mt-2 font-medium">
                        {couponFeedback.message}
                      </p>
                    )}

                    {/* Quick Demo Coupon Pills */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Available Demo Coupons (Click to apply):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => handleApplyCoupon("SAVE10")}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold border border-blue-200 transition"
                        >
                          SAVE10 (10% Off)
                        </button>
                        <button
                          onClick={() => handleApplyCoupon("WELCOME100")}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold border border-emerald-200 transition"
                        >
                          WELCOME100 (₹100 Off)
                        </button>
                        <button
                          onClick={() => handleApplyCoupon("FREESHIP")}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold border border-amber-200 transition"
                        >
                          FREESHIP (Free Delivery)
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-100">
                  Order Summary
                </h3>

                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">{formatPrice(cartSubtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 font-medium">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>- {formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span>Estimated Delivery</span>
                    <span className="font-bold text-slate-900">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 uppercase">FREE</span>
                      ) : (
                        formatPrice(deliveryFee)
                      )}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-base font-black text-slate-900">
                    <span>Final Total</span>
                    <span className="text-xl text-blue-600">{formatPrice(orderTotal)}</span>
                  </div>
                </div>

                {user ? (
                  <Link
                    href="/checkout"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 mt-4"
                  >
                    <span>Proceed to Simulated Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="space-y-2.5 mt-4">
                    <Link
                      href="/login?redirect=/checkout"
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
                    >
                      <span>Sign In to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="text-center">
                      <p className="text-[11px] text-slate-500">
                        New customer?{" "}
                        <Link
                          href="/register?redirect=/checkout"
                          className="text-blue-600 font-bold hover:underline"
                        >
                          Sign Up with Dummy Details
                        </Link>
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-3 text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secure 100% Simulated Checkout Demo</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
