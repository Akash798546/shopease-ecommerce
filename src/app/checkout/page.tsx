"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastContainer from "@/components/ui/ToastContainer";
import { useStore } from "@/context/AppContext";
import { formatPrice } from "@/utils/formatters";
import { Address, PaymentMethod } from "@/types";
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  Zap,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Lock,
  Building,
  Home,
  ShoppingBag,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    discountAmount,
    orderTotal,
    appliedCoupon,
    user,
    placeOrder,
    showToast,
  } = useStore();

  // If cart is empty, redirect or display warning
  useEffect(() => {
    if (cart.length === 0) {
      // Allow user to see message rather than hard flash
    }
  }, [cart]);

  // Step 1: Customer Info
  const [customerInfo, setCustomerInfo] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });

  // Step 2: Address (Selected from saved or custom form)
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    user?.addresses?.find((a) => a.isDefault)?.id || user?.addresses?.[0]?.id || "new"
  );

  const [customAddress, setCustomAddress] = useState<Address>({
    id: "addr-custom",
    fullName: user?.fullName || "",
    mobile: user?.mobile || "",
    houseNo: user?.addresses?.[0]?.houseNo || "",
    street: user?.addresses?.[0]?.street || "",
    city: user?.addresses?.[0]?.city || "",
    state: user?.addresses?.[0]?.state || "",
    pincode: user?.addresses?.[0]?.pincode || "",
    addressType: "Home",
    isDefault: false,
  });

  useEffect(() => {
    if (user) {
      setCustomerInfo({
        fullName: user.fullName || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
      if (user.addresses && user.addresses.length > 0) {
        const def = user.addresses.find((a) => a.isDefault) || user.addresses[0];
        setSelectedAddressId(def.id);
        setCustomAddress({
          ...def,
          id: "addr-custom",
        });
      }
    }
  }, [user]);

  // Step 4: Simulated Payment Method Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("FreeDemo");
  const [upiId, setUpiId] = useState("customer@okaxis");
  const [cardDetails, setCardDetails] = useState({
    number: "4242 4242 4242 4242",
    name: user?.fullName || "Customer",
    expiry: "12/28",
    cvv: "123",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleFillDemoCard = () => {
    setCardDetails({
      number: "4242 4242 4242 4242",
      name: customerInfo.fullName || "Customer",
      expiry: "12/28",
      cvv: "123",
    });
    showToast("Test Card Populated", "Sample Visa demo card details inserted.", "info");
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!user) {
      setValidationError("Please sign in or register before completing your order.");
      return;
    }

    if (cart.length === 0) {
      setValidationError("Your cart is empty. Please add items before placing an order.");
      return;
    }

    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.mobile) {
      setValidationError("Please fill in all customer contact fields.");
      return;
    }

    // Resolve delivery address
    let finalAddress = customAddress;
    if (selectedAddressId !== "new" && user?.addresses) {
      const found = user.addresses.find((a) => a.id === selectedAddressId);
      if (found) finalAddress = found;
    }

    if (!finalAddress.houseNo || !finalAddress.street || !finalAddress.city || !finalAddress.pincode) {
      setValidationError("Please provide complete delivery address details.");
      return;
    }

    if (paymentMethod === "UPI" && !upiId.includes("@")) {
      setValidationError("Please enter a valid demo UPI ID (e.g. user@bank).");
      return;
    }

    setIsProcessing(true);

    try {
      const order = await placeOrder({
        customer: customerInfo,
        deliveryAddress: finalAddress,
        paymentMethod,
        paymentDetails: {
          upiId: paymentMethod === "UPI" ? upiId : undefined,
          cardLast4: paymentMethod === "Card" ? cardDetails.number.slice(-4) : undefined,
          transactionReference: `SIM-TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
        },
      });

      setIsProcessing(false);
      router.push(`/order-success/${order.id}`);
    } catch (err: any) {
      setIsProcessing(false);
      setValidationError("Failed to save order to database. Please try again.");
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
          <Link href="/cart" className="hover:text-blue-600">Cart</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Checkout</span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Checkout Simulation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete your order with simulated demo payment methods. Zero real financial charges.
          </p>
        </div>

        {!user ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <Lock className="w-8 h-8" />
            </div>

            <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Step 1: Customer Authentication
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-3 mb-2">
              Sign In or Register to Checkout
            </h2>
            <p className="text-xs text-slate-500 mb-8 leading-relaxed">
              Before completing your purchase, please sign in or register with dummy customer details (Name, Mobile, Email, Password, Address). All details are securely persisted in the local database.
            </p>

            <div className="space-y-3">
              <Link
                href="/login?redirect=/checkout"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <span>Log In with Existing Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/register?redirect=/checkout"
                className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <span>New Customer? Register with Dummy Details</span>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Customer details & addresses are saved in the local SQLite database</span>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs">
            <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-slate-900 mb-1">Your Cart is Empty</h2>
            <p className="text-xs text-slate-500 mb-6">
              Add products to your cart before proceeding to checkout.
            </p>
            <Link
              href="/products"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Columns: Multi-Step Checkout Form */}
            <div className="lg:col-span-8 space-y-6">
              {validationError && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-xs text-rose-700 font-semibold">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Step 1: Customer Information */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Customer Contact Details</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={customerInfo.fullName}
                      onChange={(e) =>
                        setCustomerInfo((p) => ({ ...p, fullName: e.target.value }))
                      }
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      value={customerInfo.mobile}
                      onChange={(e) =>
                        setCustomerInfo((p) => ({ ...p, mobile: e.target.value }))
                      }
                      required
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Address */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Delivery Address</h3>
                </div>

                {/* Saved addresses selector */}
                {user?.addresses && user.addresses.length > 0 && (
                  <div className="space-y-3 mb-6">
                    <span className="text-xs font-semibold text-slate-500 block">
                      Select a saved address:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {user.addresses.map((addr) => (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedAddressId(addr.id)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                            selectedAddressId === addr.id
                              ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-100"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-bold text-slate-900">{addr.fullName}</span>
                            <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                              {addr.addressType}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 truncate">
                            {addr.houseNo}, {addr.street}
                          </p>
                          <p className="text-xs text-slate-500">
                            {addr.city}, {addr.pincode}
                          </p>
                        </div>
                      ))}

                      {/* Custom address card option */}
                      <div
                        onClick={() => setSelectedAddressId("new")}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-center text-center ${
                          selectedAddressId === "new"
                            ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-100"
                            : "border-dashed border-slate-300 hover:border-slate-400"
                        }`}
                      >
                        <span className="text-xs font-bold text-blue-600">
                          + Enter Custom / New Address
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* If custom address selected */}
                {(selectedAddressId === "new" || !user?.addresses?.length) && (
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          House / Flat No.
                        </label>
                        <input
                          type="text"
                          value={customAddress.houseNo}
                          onChange={(e) =>
                            setCustomAddress((p) => ({ ...p, houseNo: e.target.value }))
                          }
                          required
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Street / Locality
                        </label>
                        <input
                          type="text"
                          value={customAddress.street}
                          onChange={(e) =>
                            setCustomAddress((p) => ({ ...p, street: e.target.value }))
                          }
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
                          value={customAddress.city}
                          onChange={(e) =>
                            setCustomAddress((p) => ({ ...p, city: e.target.value }))
                          }
                          required
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                        <input
                          type="text"
                          value={customAddress.state}
                          onChange={(e) =>
                            setCustomAddress((p) => ({ ...p, state: e.target.value }))
                          }
                          required
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">PIN Code</label>
                        <input
                          type="text"
                          value={customAddress.pincode}
                          onChange={(e) =>
                            setCustomAddress((p) => ({ ...p, pincode: e.target.value }))
                          }
                          required
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 4: Simulated Payment Method */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">Select Simulated Payment Method</h3>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                    Demo Mode Only
                  </span>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  {/* Option D: Free Test Payment */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("FreeDemo")}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === "FreeDemo"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <Zap className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs">Free Demo Pay</span>
                  </button>

                  {/* Option A: Dummy UPI */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("UPI")}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === "UPI"
                        ? "border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-blue-600" />
                    <span className="text-xs">Dummy UPI</span>
                  </button>

                  {/* Option B: Dummy Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Card")}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === "Card"
                        ? "border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="text-xs">Test Card</span>
                  </button>

                  {/* Option C: Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("COD")}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === "COD"
                        ? "border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <Truck className="w-5 h-5 text-blue-600" />
                    <span className="text-xs">Cash on Delivery</span>
                  </button>
                </div>

                {/* Sub-panels for selected payment */}
                {paymentMethod === "FreeDemo" && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-800 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-emerald-900">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <span>1-Click Test Order Simulation</span>
                    </div>
                    <p className="leading-relaxed">
                      Instant simulated authorization. No UPI ID or card details required. Simulates complete order placement, inventory reduction, and invoice generation.
                    </p>
                  </div>
                )}

                {paymentMethod === "UPI" && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <label className="block text-xs font-bold text-slate-800">
                      Enter Any Demo UPI ID / VPA:
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@oksbi or demo@upi"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <QrCode className="w-4 h-4 text-slate-400" />
                      <span>Instant mock approval upon submission. No real UPI ping.</span>
                    </div>
                  </div>
                )}

                {paymentMethod === "Card" && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Test Card Information</span>
                      <button
                        type="button"
                        onClick={handleFillDemoCard}
                        className="text-xs text-blue-600 font-semibold hover:underline"
                      >
                        Auto-fill Test Card
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Card Number (Simulated)
                      </label>
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) =>
                          setCardDetails((p) => ({ ...p, number: e.target.value }))
                        }
                        placeholder="4242 4242 4242 4242"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Expiry Date (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) =>
                            setCardDetails((p) => ({ ...p, expiry: e.target.value }))
                          }
                          placeholder="12/28"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          CVV (3 digits)
                        </label>
                        <input
                          type="password"
                          value={cardDetails.cvv}
                          onChange={(e) =>
                            setCardDetails((p) => ({ ...p, cvv: e.target.value }))
                          }
                          placeholder="123"
                          maxLength={4}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                        />
                      </div>
                    </div>

                    <p className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                      <strong>Important Notice:</strong> Strictly simulated for demonstration. Never enter real credit or debit card details.
                    </p>
                  </div>
                )}

                {paymentMethod === "COD" && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 space-y-1">
                    <p className="font-bold text-slate-900">Cash on Delivery (Demo Mode)</p>
                    <p className="text-slate-500">
                      Payment of {formatPrice(orderTotal)} will be simulated as collected at the time of delivery.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right 4 Columns: Order Summary & Place Order Button */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-100">
                  Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} items)
                </h3>

                {/* Items preview */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 text-xs">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 truncate">{item.product.name}</p>
                        <p className="text-[10px] text-slate-400">
                          Qty: {item.quantity} &bull; {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <span className="font-bold text-slate-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">{formatPrice(cartSubtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Coupon Discount ({appliedCoupon?.code})</span>
                      <span>- {formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="font-bold text-slate-900">
                      {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between font-black text-base text-slate-900">
                    <span>Total Amount</span>
                    <span className="text-blue-600 text-lg">{formatPrice(orderTotal)}</span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 disabled:opacity-50 mt-4"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing Demo Payment...</span>
                    </div>
                  ) : paymentMethod === "FreeDemo" ? (
                    <span>Pay ₹0 – Complete Demo Order</span>
                  ) : (
                    <span>Complete Demo Order ({formatPrice(orderTotal)})</span>
                  )}
                </button>

                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  By clicking complete, your demo order ID and downloadable tax invoice will be generated automatically.
                </p>
              </div>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
