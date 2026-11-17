"use client";

import React, { useState } from "react";
import Link from "next/link";
import ToastContainer from "@/components/ui/ToastContainer";
import { useStore } from "@/context/AppContext";
import { formatPrice, formatDateTime } from "@/utils/formatters";
import { Product, OrderStatus } from "@/types";
import {
  ShieldCheck,
  TrendingUp,
  Package,
  Users,
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  X,
  Layers,
  ArrowUpRight,
  Lock,
} from "lucide-react";

export default function AdminDashboardPage() {
  const {
    user,
    isAdmin,
    login,
    logout,
    products,
    categories,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    updateOrderStatus,
    showToast,
  } = useStore();

  const [adminEmail, setAdminEmail] = useState("admin@shopease.com");
  const [adminPassword, setAdminPassword] = useState("admin123");
  const [authError, setAuthError] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(adminEmail, adminPassword);
    if (!res.success) {
      setAuthError(res.message);
    } else {
      setAuthError("");
    }
  };

  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "categories">("overview");

  // Product management search & modals
  const [productSearch, setProductSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add Product Form State
  const [newProductForm, setNewProductForm] = useState<Omit<Product, "id">>({
    name: "",
    slug: "",
    category: "electronics",
    categoryName: "Electronics",
    subcategory: "Smartphones",
    description: "",
    fullDescription: "",
    specifications: { Warranty: "1 Year Standard", Origin: "Imported" },
    price: 9999,
    originalPrice: 12999,
    discountPercentage: 23,
    rating: 4.8,
    reviewCount: 1,
    stock: 25,
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"],
    tags: ["new", "electronics"],
  });

  // Orders status filter
  const [orderFilterStatus, setOrderFilterStatus] = useState<string>("all");

  // Calculate high-level KPIs
  const totalSales = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalStockUnits = products.reduce((sum, p) => sum + p.stock, 0);

  // If user is not logged in as admin, display clean authorization shield
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
        <ToastContainer />

        {/* Minimal Admin Header */}
        <header className="border-b border-slate-800 bg-slate-950/50 py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">
                ShopEase <span className="text-amber-400">Admin Portal</span>
              </span>
            </div>

            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1"
            >
              <span>Back to Customer Store</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-800/90 rounded-3xl border border-slate-700 p-8 shadow-2xl">
            <div className="w-14 h-14 bg-amber-400/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-400/20">
              <Lock className="w-7 h-7" />
            </div>

            <div className="text-center mb-6">
              <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Restricted Access
              </span>
              <h1 className="text-xl font-bold text-white mt-2 mb-1">
                Admin Authentication
              </h1>
              <p className="text-xs text-slate-400">
                Log in to manage catalog products, stock inventory, and customer orders.
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium text-center">
                {authError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg shadow-amber-400/10 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Log In to Admin Portal</span>
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-700/60">
              <div className="bg-slate-900/80 rounded-xl p-3 text-[11px] font-mono border border-slate-800 text-slate-400 space-y-1">
                <p className="font-sans font-bold text-slate-300">Default Demo Credentials:</p>
                <p><span className="text-slate-500">Email:</span> admin@shopease.com</p>
                <p><span className="text-slate-500">Password:</span> admin123</p>
              </div>

              <button
                type="button"
                onClick={async () => {
                  setAdminEmail("admin@shopease.com");
                  setAdminPassword("admin123");
                  await login("admin@shopease.com", "admin123");
                }}
                className="w-full mt-3 py-2 text-xs font-semibold text-amber-300 hover:text-amber-200 transition"
              >
                &rarr; Quick Fill &amp; Auto-Login as Admin
              </button>
            </div>
          </div>
        </main>

        <footer className="py-4 text-center text-xs text-slate-600 border-t border-slate-800/80">
          ShopEase Admin Console &bull; Separate Management Environment
        </footer>
      </div>
    );
  }

  // Handle saving new product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.price) return;

    const catObj = categories.find((c) => c.slug === newProductForm.category);

    addProduct({
      ...newProductForm,
      categoryName: catObj?.name || "General",
      slug: newProductForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      discountPercentage: Math.max(
        0,
        Math.round(((newProductForm.originalPrice - newProductForm.price) / newProductForm.originalPrice) * 100)
      ),
    });

    setIsAddModalOpen(false);
  };

  // Handle editing product
  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct);
    setEditingProduct(null);
  };

  const filteredAdminProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter((o) => {
    if (orderFilterStatus === "all") return true;
    return o.orderStatus === orderFilterStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Dedicated Admin Top Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white">
                ShopEase <span className="text-amber-400">Admin Portal</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">
                Store Manager Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-200 font-medium">Logged in as Administrator</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition flex items-center gap-1.5 border border-slate-700 font-semibold"
            >
              <span>View Customer Store</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={logout}
              className="px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition font-bold"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <ToastContainer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>ShopEase Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Administrator Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Real-time demo inventory, live catalog management, and order fulfillment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Total Demo Sales</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-slate-900">{formatPrice(totalSales)}</span>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
              From {totalOrders} placed orders
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Total Orders</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-slate-900">{totalOrders}</span>
            <span className="text-[11px] text-blue-600 font-semibold block mt-1">
              Active test orders in system
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Products in Catalog</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-slate-900">{totalProducts}</span>
            <span className="text-[11px] text-purple-600 font-semibold block mt-1">
              Across 7 categories
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Stock Units</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-slate-900">{totalStockUnits}</span>
            <span className="text-[11px] text-amber-700 font-semibold block mt-1">
              Available demo inventory
            </span>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
              activeTab === "overview"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Overview & Recent Activity
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
              activeTab === "products"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>Product Management</span>
            <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {products.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
              activeTab === "orders"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>Customer Orders</span>
            <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {orders.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
              activeTab === "categories"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Categories Overview ({categories.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900">Recent Customer Orders</h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  View All &rarr;
                </button>
              </div>

              <div className="divide-y divide-slate-100 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold">
                    <tr>
                      <th className="p-3">Order Number</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/60 transition">
                        <td className="p-3 font-mono font-bold text-blue-600">
                          {ord.orderNumber}
                        </td>
                        <td className="p-3 font-medium text-slate-800">
                          {ord.customer.fullName}
                        </td>
                        <td className="p-3 text-slate-500">
                          {formatDateTime(ord.createdAt)}
                        </td>
                        <td className="p-3 text-slate-600">
                          {ord.items.length} item(s)
                        </td>
                        <td className="p-3 font-bold text-slate-900">
                          {formatPrice(ord.total)}
                        </td>
                        <td className="p-3 text-slate-600">
                          {ord.paymentMethod} (Demo)
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                            {ord.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 mb-4 pb-3 border-b border-slate-100">
                Low Inventory Warning Items (&le; 10 units)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products
                  .filter((p) => p.stock <= 10)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between text-xs"
                    >
                      <div className="truncate mr-2">
                        <span className="font-bold text-slate-900 block truncate">{p.name}</span>
                        <span className="text-[10px] text-slate-500">{p.categoryName}</span>
                      </div>
                      <span className="px-2 py-1 rounded-lg bg-amber-200 text-amber-900 font-bold shrink-0">
                        {p.stock} left
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeTab === "products" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Filter products by title or category..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="text-xs text-slate-500">
                Showing {filteredAdminProducts.length} of {products.length} catalog items
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Orig. Price</th>
                    <th className="p-3">Stock Units</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAdminProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/60 transition">
                      <td className="p-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <Link
                            href={`/products/${prod.id}`}
                            className="font-bold text-slate-900 truncate block hover:text-blue-600"
                          >
                            {prod.name}
                          </Link>
                          <span className="text-[10px] text-slate-400">{prod.subcategory}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                          {prod.categoryName}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-slate-900 font-mono">
                        {formatPrice(prod.price)}
                      </td>
                      <td className="p-3 text-slate-400 line-through font-mono">
                        {formatPrice(prod.originalPrice)}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={prod.stock}
                            onChange={(e) => updateStock(prod.id, Number(e.target.value))}
                            className="w-16 p-1 border border-slate-200 rounded-lg text-center font-bold text-slate-800"
                          />
                          <span
                            className={`w-2 h-2 rounded-full ${
                              prod.stock > 5 ? "bg-emerald-500" : "bg-rose-500 animate-ping"
                            }`}
                          />
                        </div>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER ORDERS MANAGEMENT */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Filter Status:</span>
                {(["all", "Placed", "Processing", "Shipped", "Delivered", "Cancelled"] as const).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilterStatus(st)}
                      className={`text-xs px-3 py-1 rounded-xl font-bold transition capitalize ${
                        orderFilterStatus === st
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>

              <span className="text-xs text-slate-400">
                {filteredOrders.length} order(s) matching
              </span>
            </div>

            <div className="divide-y divide-slate-100 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Order Number</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Address</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Grand Total</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/60 transition">
                      <td className="p-3 font-mono font-bold text-blue-600">
                        {ord.orderNumber}
                      </td>
                      <td className="p-3 text-slate-500">
                        {formatDateTime(ord.createdAt)}
                      </td>
                      <td className="p-3 font-medium text-slate-900">
                        {ord.customer.fullName}
                      </td>
                      <td className="p-3 text-slate-600 max-w-xs truncate">
                        {ord.deliveryAddress.city}, {ord.deliveryAddress.state}
                      </td>
                      <td className="p-3 text-slate-600">
                        {ord.items.length} item(s)
                      </td>
                      <td className="p-3 font-bold text-slate-900 font-mono">
                        {formatPrice(ord.total)}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          {ord.orderStatus}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(ord.id, e.target.value as OrderStatus)
                          }
                          className="bg-slate-50 border border-slate-200 text-slate-800 text-[11px] font-semibold rounded-lg px-2 py-1"
                        >
                          <option value="Placed">Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CATEGORIES OVERVIEW */}
        {activeTab === "categories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const catProducts = products.filter((p) => p.category === cat.slug);

              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-base text-slate-900">{cat.name}</h4>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {catProducts.length} Products
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">{cat.description}</p>

                    <div className="flex flex-wrap gap-1">
                      {cat.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <Link
                      href={`/category/${cat.slug}`}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center justify-between"
                    >
                      <span>View Category Page</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add Product Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-lg text-slate-900">Add New Product to Catalog</h3>
                <button onClick={() => setIsAddModalOpen(false)}>
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    value={newProductForm.name}
                    onChange={(e) =>
                      setNewProductForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="e.g. Sony WH-1000XM6 Headphones"
                    required
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newProductForm.category}
                      onChange={(e) =>
                        setNewProductForm((p) => ({ ...p, category: e.target.value }))
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subcategory
                    </label>
                    <input
                      type="text"
                      value={newProductForm.subcategory}
                      onChange={(e) =>
                        setNewProductForm((p) => ({ ...p, subcategory: e.target.value }))
                      }
                      placeholder="e.g. Audio"
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Selling Price (₹)
                    </label>
                    <input
                      type="number"
                      value={newProductForm.price}
                      onChange={(e) =>
                        setNewProductForm((p) => ({ ...p, price: Number(e.target.value) }))
                      }
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Original Price (₹)
                    </label>
                    <input
                      type="number"
                      value={newProductForm.originalPrice}
                      onChange={(e) =>
                        setNewProductForm((p) => ({
                          ...p,
                          originalPrice: Number(e.target.value),
                        }))
                      }
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Initial Stock
                    </label>
                    <input
                      type="number"
                      value={newProductForm.stock}
                      onChange={(e) =>
                        setNewProductForm((p) => ({ ...p, stock: Number(e.target.value) }))
                      }
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={newProductForm.images[0]}
                    onChange={(e) =>
                      setNewProductForm((p) => ({ ...p, images: [e.target.value] }))
                    }
                    placeholder="https://images.unsplash.com/..."
                    required
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={newProductForm.description}
                    onChange={(e) =>
                      setNewProductForm((p) => ({ ...p, description: e.target.value }))
                    }
                    required
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-lg text-slate-900">Edit Product Details</h3>
                <button onClick={() => setEditingProduct(null)}>
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleUpdateProduct} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct((p) => p && { ...p, name: e.target.value })
                    }
                    required
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Selling Price (₹)
                    </label>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct((p) => p && { ...p, price: Number(e.target.value) })
                      }
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Original Price (₹)
                    </label>
                    <input
                      type="number"
                      value={editingProduct.originalPrice}
                      onChange={(e) =>
                        setEditingProduct((p) => p && { ...p, originalPrice: Number(e.target.value) })
                      }
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Stock Count
                    </label>
                    <input
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) =>
                        setEditingProduct((p) => p && { ...p, stock: Number(e.target.value) })
                      }
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct((p) => p && { ...p, description: e.target.value })
                    }
                    required
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 text-slate-500 py-6 text-center text-xs">
        <p>ShopEase Internal Store Management Portal &bull; SQLite Database Connected</p>
      </footer>
    </div>
  );
}
