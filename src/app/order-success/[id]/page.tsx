"use client";

import React, { useEffect, use } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastContainer from "@/components/ui/ToastContainer";
import { useStore } from "@/context/AppContext";
import { formatPrice, formatDate, generateInvoiceNumber } from "@/utils/formatters";
import { downloadInvoicePdf } from "@/utils/invoiceGenerator";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Download,
  Printer,
  ShoppingBag,
  ArrowRight,
  Package,
  Calendar,
  CreditCard,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

export default function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const orderId = unwrappedParams.id;

  const { getOrderById, showToast } = useStore();
  const order = getOrderById(orderId);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback if confetti canvas fails
    }
  }, []);

  const handleDownloadInvoice = () => {
    if (!order) return;
    try {
      downloadInvoicePdf(order);
      showToast("Invoice Downloaded", `Invoice for #${order.orderNumber} saved as PDF.`, "success");
    } catch (e) {
      console.error(e);
      showToast("Download Error", "Unable to generate PDF invoice. Try printing.", "error");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Order Not Found</h2>
            <p className="text-xs text-slate-500 mb-6">
              The requested order details could not be found or session has reset.
            </p>
            <Link
              href="/products"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Browse Catalog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const invoiceNumber = generateInvoiceNumber(order.orderNumber);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <ToastContainer />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Celebration Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-lg mb-8">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-sm ring-8 ring-emerald-50">
            <CheckCircle2 className="w-10 h-10 animate-in zoom-in-50 duration-300" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{order.paymentStatus}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Thank you, {order.customer.fullName}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
            Your simulated order has been placed successfully. A digital confirmation and downloadable PDF invoice have been generated.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto flex items-center justify-between text-xs mb-8">
            <div className="text-left">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Order ID</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{order.orderNumber}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Estimated Delivery</span>
              <span className="font-semibold text-emerald-600">{order.estimatedDelivery}</span>
            </div>
          </div>

          {/* Action Buttons: Download PDF, Print, View History */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleDownloadInvoice}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Invoice PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>

            <Link
              href="/account/orders"
              className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-md"
            >
              <Package className="w-4 h-4" />
              <span>View in Order History</span>
            </Link>
          </div>
        </div>

        {/* Detailed Order Breakdown Card (Printable) */}
        <div id="printable-invoice" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Order Summary & Receipt</h2>
              <p className="text-xs text-slate-500">Invoice Number: {invoiceNumber}</p>
            </div>
            <span className="text-xs text-slate-400">{formatDate(order.createdAt)}</span>
          </div>

          {/* Customer & Address Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <span className="font-bold text-slate-800 block mb-1">Delivered To:</span>
              <p className="text-slate-700 font-medium">{order.deliveryAddress.fullName}</p>
              <p className="text-slate-600">
                {order.deliveryAddress.houseNo}, {order.deliveryAddress.street}
              </p>
              <p className="text-slate-600">
                {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
              </p>
              <p className="text-slate-500 mt-1">Phone: {order.customer.mobile}</p>
            </div>

            <div>
              <span className="font-bold text-slate-800 block mb-1">Payment Method:</span>
              <p className="text-slate-700 font-medium">{order.paymentMethod} (Simulated)</p>
              <p className="text-slate-500">
                Transaction Ref: {order.paymentDetails?.transactionReference}
              </p>
              <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Payment Status: Demo Payment Successful
              </span>
            </div>
          </div>

          {/* Products List */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Purchased Items ({order.items.length})
            </span>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center gap-4 bg-white">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Qty: {item.quantity} &bull; Unit: {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="space-y-2 text-xs text-slate-600 max-w-xs ml-auto pt-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-bold text-slate-900">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount ({order.couponApplied?.code || "Coupon"}):</span>
                <span>- {formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="font-bold text-slate-900">
                {order.deliveryFee === 0 ? "FREE" : formatPrice(order.deliveryFee)}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
              <span>Grand Total:</span>
              <span className="text-blue-600 font-bold text-base">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping on ShopEase &rarr;</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
