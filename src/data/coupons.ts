import { Coupon } from "@/types";

export const COUPONS: Coupon[] = [
  {
    code: "SAVE10",
    description: "10% off on your entire cart",
    type: "percentage",
    value: 10,
    minOrderValue: 499,
  },
  {
    code: "WELCOME100",
    description: "Flat ₹100 instant discount on welcome order",
    type: "fixed",
    value: 100,
    minOrderValue: 500,
  },
  {
    code: "FREESHIP",
    description: "Free delivery on any order size",
    type: "free_shipping",
    value: 99,
    minOrderValue: 0,
  },
  {
    code: "FESTIVE20",
    description: "Special 20% festive discount on orders above ₹1,999",
    type: "percentage",
    value: 20,
    minOrderValue: 1999,
  },
];
