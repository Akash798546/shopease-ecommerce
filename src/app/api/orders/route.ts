import { NextResponse } from "next/server";
import { dbAll, dbRun } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const role = searchParams.get("role");

    let query = "SELECT * FROM orders ORDER BY createdAt DESC";
    let params: any[] = [];

    // Customer only sees their orders, Admin sees all
    if (role !== "admin" && userId) {
      query = "SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC";
      params = [userId];
    }

    const rows = await dbAll<any>(query, params);

    const orders = rows.map((r) => ({
      id: r.id,
      orderNumber: r.orderNumber,
      userId: r.userId,
      customer: {
        fullName: r.customerName,
        email: r.customerEmail,
        mobile: r.customerMobile,
      },
      deliveryAddress: JSON.parse(r.deliveryAddress || "{}"),
      items: JSON.parse(r.items || "[]"),
      subtotal: r.subtotal,
      discount: r.discount,
      couponApplied: r.couponApplied ? JSON.parse(r.couponApplied) : undefined,
      deliveryFee: r.deliveryFee,
      total: r.total,
      paymentMethod: r.paymentMethod,
      paymentStatus: r.paymentStatus,
      paymentDetails: r.paymentDetails ? JSON.parse(r.paymentDetails) : undefined,
      orderStatus: r.orderStatus,
      estimatedDelivery: r.estimatedDelivery,
      createdAt: r.createdAt,
    }));

    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    console.error("Fetch Orders Error:", err);
    return NextResponse.json({ error: "Failed to fetch orders from database." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    const {
      id,
      orderNumber,
      userId,
      customer,
      deliveryAddress,
      items,
      subtotal,
      discount,
      couponApplied,
      deliveryFee,
      total,
      paymentMethod,
      paymentStatus,
      paymentDetails,
      orderStatus,
      estimatedDelivery,
      createdAt,
    } = orderData;

    // 1. Insert order into DB
    await dbRun(
      `INSERT INTO orders (
        id, orderNumber, userId, customerName, customerEmail, customerMobile,
        deliveryAddress, items, subtotal, discount, couponApplied, deliveryFee, total,
        paymentMethod, paymentStatus, paymentDetails, orderStatus, estimatedDelivery, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        orderNumber,
        userId || null,
        customer.fullName,
        customer.email,
        customer.mobile,
        JSON.stringify(deliveryAddress),
        JSON.stringify(items),
        subtotal,
        discount,
        couponApplied ? JSON.stringify(couponApplied) : null,
        deliveryFee,
        total,
        paymentMethod,
        paymentStatus,
        paymentDetails ? JSON.stringify(paymentDetails) : null,
        orderStatus || "Placed",
        estimatedDelivery || "Delivering in 3-5 business days",
        createdAt || new Date().toISOString(),
      ]
    );

    // 2. Decrement product stock in SQLite DB
    if (Array.isArray(items)) {
      for (const item of items) {
        if (item.product && item.product.id && item.quantity) {
          await dbRun(
            "UPDATE products SET stock = MAX(0, stock - ?) WHERE id = ?",
            [item.quantity, item.product.id]
          );
        }
      }
    }

    return NextResponse.json({ success: true, orderId: id, orderNumber });
  } catch (err: any) {
    console.error("Create Order Error:", err);
    return NextResponse.json({ error: "Failed to save order in database." }, { status: 500 });
  }
}
