export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  iconName: string;
  subcategories: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string; // Category slug
  categoryName: string;
  subcategory: string;
  description: string;
  fullDescription: string;
  specifications: Record<string, string>;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  mobile: string;
  houseNo: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  addressType: 'Home' | 'Work' | 'Other';
  isDefault?: boolean;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  mobile: string;
}

export interface Coupon {
  code: string;
  description: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number; // percentage (e.g. 10) or fixed amount in INR (e.g. 100)
  minOrderValue: number;
}

export type PaymentMethod = 'UPI' | 'Card' | 'COD' | 'FreeDemo';

export type OrderStatus = 'Placed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerInfo;
  deliveryAddress: Address;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponApplied?: {
    code: string;
    discountAmount: number;
  };
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Demo Payment Successful';
  paymentDetails?: {
    upiId?: string;
    cardLast4?: string;
    transactionReference: string;
  };
  orderStatus: OrderStatus;
  estimatedDelivery: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  joinedAt: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
