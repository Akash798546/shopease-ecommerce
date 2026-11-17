"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastContainer from "@/components/ui/ToastContainer";
import { useStore } from "@/context/AppContext";
import { formatPrice, formatDate, formatDateTime, generateInvoiceNumber } from "@/utils/formatters";
import { downloadInvoicePdf } from "@/utils/invoiceGenerator";
import { Order } from "@/types";
import {
  Package,
  Download,
  Printer,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  Eye,
  X,
  CreditCard,
  Building,
} from "lucide-react";

export default function OrdersPage() {
  const { orders, showToast } = useStore();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleDownloadInvoice = (order: Order) => {
    try {
      downloadInvoicePdf(order);
      showToast("Invoice Downloaded", `Invoice for #${order.orderNumber} saved as PDF.`, "success");
    } catch (e) {
      console.error(e);
      showToast("Download Error", "Unable to generate PDF. Please try printing.", "error");
    }
  };

  const handlePrintOrder = (order: Order) => {
    setSelectedOrder(order);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Processing":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Cancelled":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <ToastContainer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/account" className="hover:text-blue-600">Account</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Orders & Invoices</span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Order History & Tax Invoices
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your demo packages, view itemized receipts, and download PDF tax invoices.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-md mx-auto shadow-xs">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No Orders Yet</h2>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              When you complete a checkout order, it will appear here along with a downloadable invoice.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition shadow-md shadow-blue-500/20"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const invoiceNo = generateInvoiceNumber(order.orderNumber);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden"
                >
                  {/* Order Card Header */}
                  <div className="p-4 sm:p-6 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">
                          Order Number
                        </span>
                        <span className="font-mono font-bold text-slate-900 text-sm">
                          {order.orderNumber}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">
                          Order Placed
                        </span>
                        <span className="font-medium text-slate-800">
                          {formatDateTime(order.createdAt)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">
                          Total Amount
                        </span>
                        <span className="font-bold text-slate-900 text-sm">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">
                          Payment Method
                        </span>
                        <span className="font-medium text-slate-800">
                          {order.paymentMethod} (Demo)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  {/* Order Items & Actions */}
                  <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Items Thumbnails & Titles */}
                    <div className="space-y-3 flex-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
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
                            <p className="text-[11px] text-slate-500">
                              Qty: {item.quantity} &bull; {formatPrice(item.product.price)} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>

                      <button
                        onClick={() => handleDownloadInvoice(order)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Invoice PDF</span>
                      </button>

                      <button
                        onClick={() => handlePrintOrder(order)}
                        className="p-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl transition"
                        title="Print Invoice"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Order Details Modal / In-browser Printable Invoice */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-6 right-6 p-1 text-slate-400 hover:text-slate-700 no-print"
              >
                <X className="w-5 h-5" />
              </button>

              <div id="printable-invoice">
                {/* Header */}
                <div className="border-b border-slate-200 pb-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-blue-600">ShopEase</h3>
                      <p className="text-xs text-slate-500">Official Demonstration Invoice</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-400 uppercase block">Invoice</span>
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {generateInvoiceNumber(selectedOrder.orderNumber)}
                      </span>
                      <p className="text-[11px] text-slate-500">{formatDate(selectedOrder.createdAt)}</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 text-amber-800 text-[11px] p-2 rounded-lg mt-3 text-center font-medium border border-amber-200">
                    DEMO TRANSACTION — NO ACTUAL FINANCIAL CHARGE OCCURRED
                  </div>
                </div>

                {/* Customer & Shipping info */}
                <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Billed To:</span>
                    <p className="text-slate-700">{selectedOrder.customer.fullName}</p>
                    <p className="text-slate-500">{selectedOrder.customer.email}</p>
                    <p className="text-slate-500">{selectedOrder.customer.mobile}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Delivering To:</span>
                    <p className="text-slate-700">
                      {selectedOrder.deliveryAddress.houseNo}, {selectedOrder.deliveryAddress.street}
                    </p>
                    <p className="text-slate-500">
                      {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state} -{" "}
                      {selectedOrder.deliveryAddress.pincode}
                    </p>
                  </div>
                </div>

                {/* Products Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden mb-6 text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Item</th>
                        <th className="p-2.5 text-center">Qty</th>
                        <th className="p-2.5 text-right">Unit Price</th>
                        <th className="p-2.5 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-2.5 font-medium text-slate-900">{item.product.name}</td>
                          <td className="p-2.5 text-center">{item.quantity}</td>
                          <td className="p-2.5 text-right font-mono">
                            {formatPrice(item.product.price)}
                          </td>
                          <td className="p-2.5 text-right font-mono font-bold text-slate-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary calculation */}
                <div className="space-y-1.5 text-xs text-slate-600 max-w-xs ml-auto mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono">{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount:</span>
                      <span className="font-mono">- {formatPrice(selectedOrder.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span className="font-mono">
                      {selectedOrder.deliveryFee === 0 ? "FREE" : formatPrice(selectedOrder.deliveryFee)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                    <span>Grand Total:</span>
                    <span className="text-blue-600 font-mono">
                      {formatPrice(selectedOrder.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons in Modal */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 no-print">
                <button
                  onClick={() => handleDownloadInvoice(selectedOrder)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
