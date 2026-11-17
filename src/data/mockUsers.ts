import { User, Order } from "@/types";
import { PRODUCTS } from "./products";

export const DEMO_CUSTOMER: User = {
  id: "user-cust-1",
  fullName: "John Doe",
  email: "customer@shopease.com",
  mobile: "+91 98765 43210",
  role: "customer",
  joinedAt: "2025-01-15T10:00:00Z",
  addresses: [
    {
      id: "addr-1",
      fullName: "John Doe",
      mobile: "+91 98765 43210",
      houseNo: "Flat 402, Green Meadows",
      street: "12th Main Road, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      addressType: "Home",
      isDefault: true,
    },
    {
      id: "addr-2",
      fullName: "John Doe (Office)",
      mobile: "+91 98765 43210",
      houseNo: "Block B, 4th Floor, Tech Hub",
      street: "Outer Ring Road, Bellandur",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560103",
      addressType: "Work",
      isDefault: false,
    },
  ],
};

export const DEMO_ADMIN: User = {
  id: "user-admin-1",
  fullName: "ShopEase Admin",
  email: "admin@shopease.com",
  mobile: "+91 98111 22334",
  role: "admin",
  joinedAt: "2024-06-01T08:00:00Z",
  addresses: [
    {
      id: "addr-admin",
      fullName: "ShopEase HQ",
      mobile: "+91 98111 22334",
      houseNo: "Suite 500, Prestige Tech Cloud",
      street: "Whitefield Main Rd",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560066",
      addressType: "Work",
      isDefault: true,
    },
  ],
};

export const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: "ord-seed-1",
    orderNumber: "SE-2026-84912",
    createdAt: "2026-11-10T14:32:00.000Z",
    customer: {
      fullName: "John Doe",
      email: "customer@shopease.com",
      mobile: "+91 98765 43210",
    },
    deliveryAddress: DEMO_CUSTOMER.addresses[0],
    items: [
      {
        product: PRODUCTS[4], // Sony WH-1000XM5
        quantity: 1,
      },
      {
        product: PRODUCTS[20], // Atomic Habits
        quantity: 1,
      },
    ],
    subtotal: 27689,
    discount: 2769,
    couponApplied: {
      code: "SAVE10",
      discountAmount: 2769,
    },
    deliveryFee: 0,
    total: 24920,
    paymentMethod: "UPI",
    paymentStatus: "Demo Payment Successful",
    paymentDetails: {
      upiId: "john.doe@okaxis",
      transactionReference: "UPI-DEMO-98214389",
    },
    orderStatus: "Delivered",
    estimatedDelivery: "Delivered on Nov 13, 2026",
  },
  {
    id: "ord-seed-2",
    orderNumber: "SE-2026-91045",
    createdAt: "2026-11-15T09:15:00.000Z",
    customer: {
      fullName: "John Doe",
      email: "customer@shopease.com",
      mobile: "+91 98765 43210",
    },
    deliveryAddress: DEMO_CUSTOMER.addresses[0],
    items: [
      {
        product: PRODUCTS[10], // Nike Pegasus 40
        quantity: 1,
      },
      {
        product: PRODUCTS[16], // Instant Vortex Air Fryer
        quantity: 1,
      },
    ],
    subtotal: 17494,
    discount: 100,
    couponApplied: {
      code: "WELCOME100",
      discountAmount: 100,
    },
    deliveryFee: 0,
    total: 17394,
    paymentMethod: "Card",
    paymentStatus: "Demo Payment Successful",
    paymentDetails: {
      cardLast4: "4242",
      transactionReference: "CARD-DEMO-66381290",
    },
    orderStatus: "Shipped",
    estimatedDelivery: "Expected by Nov 19, 2026",
  },
];
