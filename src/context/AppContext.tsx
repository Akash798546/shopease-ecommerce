"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  Product,
  Category,
  CartItem,
  Address,
  Coupon,
  Order,
  User,
  ToastMessage,
  PaymentMethod,
  OrderStatus,
} from "@/types";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { COUPONS } from "@/data/coupons";
import { generateOrderId } from "@/utils/formatters";

interface AppContextType {
  // Products & Categories
  products: Product[];
  categories: Category[];
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateStock: (productId: string, stock: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: { color?: string; size?: string }) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  discountAmount: number;
  orderTotal: number;

  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  moveWishlistToCart: (productId: string) => void;
  wishlistCount: number;

  // User & Auth
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  registerUser: (data: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    address?: {
      houseNo: string;
      street: string;
      city: string;
      state: string;
      pincode: string;
      addressType?: "Home" | "Work";
    };
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUserProfile: (profile: Partial<User>) => void;
  saveAddress: (address: Omit<Address, "id">, addressId?: string) => void;
  deleteAddress: (id: string) => void;

  // Orders
  orders: Order[];
  getOrderById: (orderId: string) => Order | undefined;
  placeOrder: (data: {
    customer: { fullName: string; email: string; mobile: string };
    deliveryAddress: Address;
    paymentMethod: PaymentMethod;
    paymentDetails?: { upiId?: string; cardLast4?: string; transactionReference: string };
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: "success" | "error" | "info" | "warning") => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories] = useState<Category[]>(CATEGORIES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persisted session on mount & fetch orders from SQLite DB
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("shopease_session_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        // Fetch user's orders from SQLite DB
        fetch(`/api/orders?userId=${parsed.id}&role=${parsed.role}`)
          .then((r) => r.json())
          .then((data) => {
            if (data.orders) setOrders(data.orders);
          })
          .catch(() => {});
      }

      const savedCart = localStorage.getItem("shopease_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("shopease_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedProducts = localStorage.getItem("shopease_products");
      if (savedProducts) setProducts(JSON.parse(savedProducts));
    } catch (e) {
      console.error("Hydration Error:", e);
    }
    setIsHydrated(true);
  }, []);

  // Sync session user
  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (user) {
        localStorage.setItem("shopease_session_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("shopease_session_user");
      }
    } catch (e) {}
  }, [user, isHydrated]);

  // Sync cart
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("shopease_cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart, isHydrated]);

  // Sync wishlist
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("shopease_wishlist", JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist, isHydrated]);

  // Toast Helpers
  const showToast = (
    title: string,
    message?: string,
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Products lookup
  const getProductById = (id: string) => products.find((p) => p.id === id);
  const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

  // Admin Product Actions
  const addProduct = (newProduct: Omit<Product, "id">) => {
    const id = "prod-" + Date.now();
    const product: Product = { ...newProduct, id };
    const updated = [product, ...products];
    setProducts(updated);
    try {
      localStorage.setItem("shopease_products", JSON.stringify(updated));
    } catch (e) {}
    showToast("Product Added", `"${product.name}" added to catalog.`, "success");
  };

  const updateProduct = (updated: Product) => {
    const prods = products.map((p) => (p.id === updated.id ? updated : p));
    setProducts(prods);
    try {
      localStorage.setItem("shopease_products", JSON.stringify(prods));
    } catch (e) {}
    showToast("Product Updated", `"${updated.name}" details updated.`, "success");
  };

  const deleteProduct = (id: string) => {
    const prod = products.find((p) => p.id === id);
    const prods = products.filter((p) => p.id !== id);
    setProducts(prods);
    try {
      localStorage.setItem("shopease_products", JSON.stringify(prods));
    } catch (e) {}
    showToast("Product Deleted", `"${prod?.name || "Item"}" removed from catalog.`, "info");
  };

  const updateStock = (productId: string, stock: number) => {
    const prods = products.map((p) =>
      p.id === productId ? { ...p, stock: Math.max(0, stock) } : p
    );
    setProducts(prods);
    try {
      localStorage.setItem("shopease_products", JSON.stringify(prods));
    } catch (e) {}
    showToast("Stock Updated", `Inventory adjusted to ${stock} units.`, "info");
  };

  // Cart Actions
  const addToCart = (
    product: Product,
    quantity: number = 1,
    options?: { color?: string; size?: string }
  ) => {
    if (product.stock < 1) {
      showToast("Out of Stock", "This item is currently unavailable.", "error");
      return;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const currentQty = prevCart[existingIndex].quantity;
        const newQty = Math.min(product.stock, currentQty + quantity);
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          selectedColor: options?.color || updated[existingIndex].selectedColor,
          selectedSize: options?.size || updated[existingIndex].selectedSize,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity: Math.min(product.stock, quantity),
            selectedColor: options?.color,
            selectedSize: options?.size,
          },
        ];
      }
    });

    showToast("Added to Cart", `"${product.name}" added to your cart.`, "success");
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    showToast("Removed from Cart", `"${item?.product.name || "Item"}" removed.`, "info");
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const validQty = Math.min(item.product.stock, quantity);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let deliveryFee = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 99;
  if (appliedCoupon?.type === "free_shipping") {
    deliveryFee = 0;
  }

  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal > 0) {
    if (appliedCoupon.type === "percentage") {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === "fixed") {
      discountAmount = Math.min(cartSubtotal, appliedCoupon.value);
    } else if (appliedCoupon.type === "free_shipping") {
      discountAmount = 99;
    }
  }

  const orderTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  // Coupon Actions
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = COUPONS.find((c) => c.code === cleanCode);

    if (!found) {
      showToast("Invalid Coupon", "Coupon code does not exist.", "error");
      return { success: false, message: "Invalid coupon code. Try SAVE10, WELCOME100, or FREESHIP." };
    }

    if (cartSubtotal < found.minOrderValue) {
      showToast(
        "Order Value Too Low",
        `This coupon requires a minimum cart value of ₹${found.minOrderValue}.`,
        "warning"
      );
      return {
        success: false,
        message: `Requires minimum order of ₹${found.minOrderValue}.`,
      };
    }

    setAppliedCoupon(found);
    showToast("Coupon Applied!", `${found.code} applied successfully: ${found.description}`, "success");
    return { success: true, message: `Applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon Removed", "Discount code has been removed.", "info");
  };

  // Wishlist Actions
  const isInWishlist = (productId: string) => wishlist.some((p) => p.id === productId);

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast("Removed from Wishlist", `"${product.name}" removed from wishlist.`, "info");
    } else {
      setWishlist((prev) => [product, ...prev]);
      showToast("Saved to Wishlist", `"${product.name}" saved to your wishlist.`, "success");
    }
  };

  const removeFromWishlist = (productId: string) => {
    const prod = wishlist.find((p) => p.id === productId);
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
    showToast("Removed from Wishlist", `"${prod?.name || "Item"}" removed.`, "info");
  };

  const moveWishlistToCart = (productId: string) => {
    const product = wishlist.find((p) => p.id === productId);
    if (product) {
      addToCart(product, 1);
      removeFromWishlist(productId);
    }
  };

  const wishlistCount = wishlist.length;

  // Authentication & Registration with SQLite DB Backend
  const registerUser = async (data: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    address?: {
      houseNo: string;
      street: string;
      city: string;
      state: string;
      pincode: string;
      addressType?: "Home" | "Work";
    };
  }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        showToast("Registration Failed", json.error || "Unable to register.", "error");
        return { success: false, message: json.error || "Failed to register" };
      }

      setUser(json.user);
      showToast("Account Created!", `Welcome to ShopEase, ${json.user.fullName}!`, "success");
      return { success: true, message: "Registered successfully" };
    } catch (e: any) {
      showToast("Error", "Network or database error during registration.", "error");
      return { success: false, message: e.message || "Failed" };
    }
  };

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      const json = await res.json();
      if (!res.ok) {
        showToast("Login Failed", json.error || "Invalid credentials.", "error");
        return { success: false, message: json.error || "Invalid email or password" };
      }

      setUser(json.user);

      // Fetch user's orders from DB
      fetch(`/api/orders?userId=${json.user.id}&role=${json.user.role}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.orders) setOrders(d.orders);
        })
        .catch(() => {});

      showToast("Welcome back!", `Signed in as ${json.user.fullName}.`, "success");
      return { success: true, message: "Logged in successfully" };
    } catch (e: any) {
      showToast("Error", "Database error during login.", "error");
      return { success: false, message: e.message || "Login failed" };
    }
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem("shopease_session_user");
    showToast("Signed Out", "You have been logged out safely.", "info");
  };

  const updateUserProfile = (profile: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...profile };
    setUser(updated);
    showToast("Profile Updated", "Your information has been saved.", "success");
  };

  const saveAddress = (addrData: Omit<Address, "id">, addressId?: string) => {
    if (!user) return;
    let newAddresses: Address[] = [...user.addresses];

    if (addressId) {
      newAddresses = newAddresses.map((a) =>
        a.id === addressId ? { ...addrData, id: addressId } : a
      );
    } else {
      const newId = "addr-" + Date.now();
      const newAddr: Address = { ...addrData, id: newId };
      if (addrData.isDefault || newAddresses.length === 0) {
        newAddresses = newAddresses.map((a) => ({ ...a, isDefault: false }));
        newAddr.isDefault = true;
      }
      newAddresses.push(newAddr);
    }

    const updatedUser = { ...user, addresses: newAddresses };
    setUser(updatedUser);
    showToast("Address Saved", "Delivery address updated.", "success");
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const filtered = user.addresses.filter((a) => a.id !== id);
    if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
      filtered[0].isDefault = true;
    }
    const updatedUser = { ...user, addresses: filtered };
    setUser(updatedUser);
    showToast("Address Removed", "Delivery address deleted.", "info");
  };

  // Orders Management with SQLite Database persistence
  const getOrderById = (orderId: string) =>
    orders.find((o) => o.id === orderId || o.orderNumber === orderId);

  const placeOrder = async ({
    customer,
    deliveryAddress,
    paymentMethod,
    paymentDetails,
  }: {
    customer: { fullName: string; email: string; mobile: string };
    deliveryAddress: Address;
    paymentMethod: PaymentMethod;
    paymentDetails?: { upiId?: string; cardLast4?: string; transactionReference: string };
  }): Promise<Order> => {
    const orderNumber = generateOrderId();
    const orderId = "ord-" + Date.now();

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      createdAt: new Date().toISOString(),
      customer,
      deliveryAddress,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      couponApplied: appliedCoupon
        ? {
            code: appliedCoupon.code,
            discountAmount,
          }
        : undefined,
      deliveryFee,
      total: orderTotal,
      paymentMethod,
      paymentStatus: "Demo Payment Successful",
      paymentDetails: paymentDetails || {
        transactionReference: `DEMO-TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      },
      orderStatus: "Placed",
      estimatedDelivery: "Delivering in 3-5 business days",
    };

    // 1. Save in SQLite DB via backend API
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newOrder,
          userId: user?.id,
        }),
      });
    } catch (e) {
      console.error("Order DB Save Error:", e);
    }

    // 2. Decrement local product stock
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItem = cart.find((item) => item.product.id === prod.id);
        if (cartItem) {
          const newStock = Math.max(0, prod.stock - cartItem.quantity);
          return { ...prod, stock: newStock };
        }
        return prod;
      })
    );

    // 3. Update orders state & clear cart
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);

    showToast("Order Placed!", `Order #${orderNumber} saved to database.`, "success");

    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    // 1. Update in SQLite DB
    try {
      await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });
    } catch (e) {
      console.error("Failed to update status in DB:", e);
    }

    // 2. Update state
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId || ord.orderNumber === orderId ? { ...ord, orderStatus: status } : ord
      )
    );
    showToast("Order Updated", `Order status changed to ${status}.`, "success");
  };

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        getProductById,
        getProductBySlug,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        deliveryFee,
        discountAmount,
        orderTotal,

        appliedCoupon,
        applyCoupon,
        removeCoupon,

        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        moveWishlistToCart,
        wishlistCount,

        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        registerUser,
        logout,
        updateUserProfile,
        saveAddress,
        deleteAddress,

        orders,
        getOrderById,
        placeOrder,
        updateOrderStatus,

        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useStore must be used within an AppProvider");
  }
  return context;
}
