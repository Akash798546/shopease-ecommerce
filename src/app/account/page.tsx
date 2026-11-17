"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastContainer from "@/components/ui/ToastContainer";
import { useStore } from "@/context/AppContext";
import { Address } from "@/types";
import {
  User,
  MapPin,
  Package,
  Heart,
  Plus,
  Trash2,
  CheckCircle2,
  Edit2,
  ChevronRight,
  ShieldCheck,
  Building,
  Home,
} from "lucide-react";

export default function AccountPage() {
  const { user, updateUserProfile, saveAddress, deleteAddress, orders, wishlistCount } = useStore();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.fullName || "");
  const [profilePhone, setProfilePhone] = useState(user?.mobile || "");

  // Address modal/form state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState<Omit<Address, "id">>({
    fullName: user?.fullName || "",
    mobile: user?.mobile || "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "Home",
    isDefault: false,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ fullName: profileName, mobile: profilePhone });
    setIsEditingProfile(false);
  };

  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      fullName: user?.fullName || "",
      mobile: user?.mobile || "",
      houseNo: "",
      street: "",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
      addressType: "Home",
      isDefault: false,
    });
    setShowAddressModal(true);
  };

  const handleOpenEditAddress = (addr: Address) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      fullName: addr.fullName,
      mobile: addr.mobile,
      houseNo: addr.houseNo,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      addressType: addr.addressType,
      isDefault: !!addr.isDefault,
    });
    setShowAddressModal(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    saveAddress(addressForm, editingAddressId || undefined);
    setShowAddressModal(false);
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
          <span className="font-semibold text-slate-900">My Account</span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Account Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your personal profile, delivery addresses, and preferences.
          </p>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link
            href="/account/orders"
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Total Orders</span>
              <span className="text-2xl font-black text-slate-900">{orders.length}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </Link>

          <Link
            href="/wishlist"
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-rose-300 hover:shadow-md transition flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Wishlist Items</span>
              <span className="text-2xl font-black text-slate-900">{wishlistCount}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
          </Link>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Saved Addresses</span>
              <span className="text-2xl font-black text-slate-900">{user?.addresses.length || 0}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Personal Profile (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-sm text-slate-900">Personal Information</h3>
                </div>
                {!isEditingProfile && (
                  <button
                    onClick={() => {
                      setProfileName(user?.fullName || "");
                      setProfilePhone(user?.mobile || "");
                      setIsEditingProfile(true);
                    }}
                    className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Full Name</span>
                    <span className="font-bold text-slate-900 text-sm">{user?.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Email Address</span>
                    <span className="font-medium text-slate-800">{user?.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Mobile Number</span>
                    <span className="font-medium text-slate-800">{user?.mobile}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Account Role</span>
                    <span className="inline-flex items-center gap-1 font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md capitalize">
                      {user?.role === "admin" && <ShieldCheck className="w-3.5 h-3.5" />}
                      {user?.role || "Customer"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Links Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-slate-900 mb-3">Quick Navigation</h3>
              <Link
                href="/account/orders"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
              >
                <span>View Order History & Download Invoices</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
              >
                <span>Manage Wishlist</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: Saved Delivery Addresses (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">Saved Delivery Addresses</h3>
                <p className="text-xs text-slate-500">
                  Manage addresses for fast 1-click checkout.
                </p>
              </div>
              <button
                onClick={handleOpenAddAddress}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
              >
                <Plus className="w-4 h-4" /> Add Address
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user?.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`bg-white rounded-2xl p-5 border transition relative flex flex-col justify-between ${
                    addr.isDefault
                      ? "border-blue-500 ring-2 ring-blue-100 shadow-sm"
                      : "border-slate-200/80 shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {addr.addressType === "Work" ? (
                          <Building className="w-3 h-3 text-slate-500" />
                        ) : (
                          <Home className="w-3 h-3 text-slate-500" />
                        )}
                        {addr.addressType}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Default
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 mb-1">{addr.fullName}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {addr.houseNo}, {addr.street}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">Mobile: {addr.mobile}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleOpenEditAddress(addr)}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    {user.addresses.length > 1 && (
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Address Add/Edit Modal */}
        {showAddressModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {editingAddressId ? "Edit Delivery Address" : "Add New Delivery Address"}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Please enter full street and pin code details.
              </p>

              <form onSubmit={handleSaveAddress} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={addressForm.fullName}
                      onChange={(e) =>
                        setAddressForm((p) => ({ ...p, fullName: e.target.value }))
                      }
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={addressForm.mobile}
                      onChange={(e) =>
                        setAddressForm((p) => ({ ...p, mobile: e.target.value }))
                      }
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      House / Flat No.
                    </label>
                    <input
                      type="text"
                      value={addressForm.houseNo}
                      onChange={(e) =>
                        setAddressForm((p) => ({ ...p, houseNo: e.target.value }))
                      }
                      placeholder="Flat 304, Tower A"
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street / Area
                    </label>
                    <input
                      type="text"
                      value={addressForm.street}
                      onChange={(e) =>
                        setAddressForm((p) => ({ ...p, street: e.target.value }))
                      }
                      placeholder="100 Feet Road"
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={addressForm.city}
                      onChange={(e) =>
                        setAddressForm((p) => ({ ...p, city: e.target.value }))
                      }
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                    <input
                      type="text"
                      value={addressForm.state}
                      onChange={(e) =>
                        setAddressForm((p) => ({ ...p, state: e.target.value }))
                      }
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={addressForm.pincode}
                      onChange={(e) =>
                        setAddressForm((p) => ({ ...p, pincode: e.target.value }))
                      }
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="text-xs font-semibold text-slate-700">Type:</label>
                  {(["Home", "Work", "Other"] as const).map((type) => (
                    <label key={type} className="flex items-center gap-1.5 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="addressType"
                        checked={addressForm.addressType === type}
                        onChange={() =>
                          setAddressForm((p) => ({ ...p, addressType: type }))
                        }
                        className="text-blue-600"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addressForm.isDefault}
                      onChange={(e) =>
                        setAddressForm((p) => ({ ...p, isDefault: e.target.checked }))
                      }
                      className="rounded text-blue-600"
                    />
                    <span className="text-xs text-slate-700">Set as default delivery address</span>
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddressModal(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
