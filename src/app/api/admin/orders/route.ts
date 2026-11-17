import { NextResponse } from "next/server";
import { dbRun } from "@/lib/db";

export async function PATCH(req: Request) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({ error: "orderId and status are required." }, { status: 400 });
    }

    await dbRun(
      "UPDATE orders SET orderStatus = ? WHERE id = ? OR orderNumber = ?",
      [status, orderId, orderId]
    );

    return NextResponse.json({ success: true, orderId, status });
  } catch (err: any) {
    console.error("Update Order Status Error:", err);
    return NextResponse.json({ error: "Failed to update order status in database." }, { status: 500 });
  }
}
