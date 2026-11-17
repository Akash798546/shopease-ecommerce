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
import { DEMO_CUSTOMER, DEMO_ADMIN, INITIAL_DEMO_ORDERS } from "@/data/mockUsers";
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
  login: (email: string, password: string) => { success: boolean; message: string };
  loginAsDemo: (role: "customer" | "admin") => void;
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
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: "success" | "error" | "info" | "warning") => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // 1. Initial State from Storage or Defaults
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories] = useState<Category[]>(CATEGORIES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [user, setUser] = useState<User | null>(DEMO_CUSTOMER);
  const [orders, setOrders] = useState<Order[]>(INITIAL_DEMO_ORDERS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persisted state on mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem("shopease_products");
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedCart = localStorage.getItem("shopease_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("shopease_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem("shopease_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedUser = localStorage.getItem("shopease_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(DEMO_CUSTOMER);
      }
    } catch (e) {
      console.error("Failed to load state from localStorage:", e);
    }
    setIsHydrated(true);
  }, []);

  // Sync products to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("shopease_products", JSON.stringify(products));
    } catch (e) {
      console.error("Failed to sync products:", e);
    }
  }, [products, isHydrated]);

  // Sync cart to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("shopease_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to sync cart:", e);
    }
  }, [cart, isHydrated]);

  // Sync wishlist to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("shopease_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to sync wishlist:", e);
    }
  }, [wishlist, isHydrated]);

  // Sync orders to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("shopease_orders", JSON.stringify(orders));
    } catch (e) {
      console.error("Failed to sync orders:", e);
    }
  }, [orders, isHydrated]);

  // Sync user to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (user) {
        localStorage.setItem("shopease_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("shopease_user");
      }
    } catch (e) {
      console.error("Failed to sync user:", e);
    }
  }, [user, isHydrated]);

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
    setProducts((prev) => [product, ...prev]);
    showToast("Product Added", `"${product.name}" has been added to catalog.`, "success");
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast("Product Updated", `"${updated.name}" details updated.`, "success");
  };

  const deleteProduct = (id: string) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("Product Deleted", `"${prod?.name || "Item"}" removed from catalog.`, "info");
  };

  const updateStock = (productId: string, stock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, stock) } : p))
    );
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

  // Delivery: Free if subtotal > 999 or coupon is FREESHIP or cart is empty
  let deliveryFee = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 99;
  if (appliedCoupon?.type === "free_shipping") {
    deliveryFee = 0;
  }

  // Coupon Discount calculation
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

  // Authentication & User Profile
  const login = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === DEMO_ADMIN.email.toLowerCase() && pass === "admin123") {
      setUser(DEMO_ADMIN);
      showToast("Welcome Admin", "Signed in as ShopEase Administrator.", "success");
      return { success: true, message: "Logged in as Admin" };
    }

    if (
      (cleanEmail === DEMO_CUSTOMER.email.toLowerCase() && pass === "password123") ||
      cleanEmail.includes("@")
    ) {
      const loggedUser = {
        ...DEMO_CUSTOMER,
        email: cleanEmail,
        fullName: cleanEmail === DEMO_CUSTOMER.email ? "John Doe" : cleanEmail.split("@")[0],
      };
      setUser(loggedUser);
      showToast("Welcome back!", `Signed in as ${loggedUser.fullName}.`, "success");
      return { success: true, message: "Logged in successfully" };
    }

    showToast("Authentication Failed", "Please check your demo credentials.", "error");
    return { success: false, message: "Invalid email or password." };
  };

  const loginAsDemo = (role: "customer" | "admin") => {
    if (role === "admin") {
      setUser(DEMO_ADMIN);
      showToast("Admin Mode Activated", "You have administrative privileges.", "success");
    } else {
      setUser(DEMO_CUSTOMER);
      showToast("Customer Mode Activated", "Logged in as John Doe.", "success");
    }
  };

  const logout = () => {
    setUser(null);
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
    showToast("Address Saved", "Delivery address has been updated.", "success");
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

  // Orders Management
  const getOrderById = (orderId: string) =>
    orders.find((o) => o.id === orderId || o.orderNumber === orderId);

  const placeOrder = ({
    customer,
    deliveryAddress,
    paymentMethod,
    paymentDetails,
  }: {
    customer: { fullName: string; email: string; mobile: string };
    deliveryAddress: Address;
    paymentMethod: PaymentMethod;
    paymentDetails?: { upiId?: string; cardLast4?: string; transactionReference: string };
  }): Order => {
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

    // 1. Update product stock
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

    // 2. Add to orders
    setOrders((prev) => [newOrder, ...prev]);

    // 3. Clear cart & coupon
    setCart([]);
    setAppliedCoupon(null);

    showToast("Order Placed!", `Order #${orderNumber} confirmed.`, "success");

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId || ord.orderNumber === orderId ? { ...ord, orderStatus: status } : ord))
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
        loginAsDemo,
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
