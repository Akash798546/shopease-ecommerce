import { NextResponse } from "next/server";
import { dbGet, dbRun } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, mobile, password, address } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists in DB
    const existing = await dbGet("SELECT id FROM users WHERE email = ?", [cleanEmail]);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please log in." },
        { status: 409 }
      );
    }

    const userId = "cust-" + Date.now();
    const createdAt = new Date().toISOString();

    // 1. Insert user into DB
    await dbRun(
      `INSERT INTO users (id, fullName, email, mobile, password, role, createdAt)
       VALUES (?, ?, ?, ?, ?, 'customer', ?)`,
      [userId, fullName.trim(), cleanEmail, mobile?.trim() || "", password, createdAt]
    );

    // 2. Insert address into DB if provided
    let savedAddresses = [];
    if (address && address.houseNo && address.city) {
      const addressId = "addr-" + Date.now();
      await dbRun(
        `INSERT INTO addresses (id, userId, fullName, mobile, houseNo, street, city, state, pincode, addressType, isDefault)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [
          addressId,
          userId,
          fullName.trim(),
          mobile?.trim() || "",
          address.houseNo,
          address.street || "",
          address.city,
          address.state || "",
          address.pincode || "",
          address.addressType || "Home",
        ]
      );

      savedAddresses.push({
        id: addressId,
        fullName: fullName.trim(),
        mobile: mobile?.trim() || "",
        houseNo: address.houseNo,
        street: address.street || "",
        city: address.city,
        state: address.state || "",
        pincode: address.pincode || "",
        addressType: address.addressType || "Home",
        isDefault: true,
      });
    }

    const user = {
      id: userId,
      fullName: fullName.trim(),
      email: cleanEmail,
      mobile: mobile?.trim() || "",
      role: "customer" as const,
      addresses: savedAddresses,
      joinedAt: createdAt,
    };

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    console.error("Register Error:", err);
    return NextResponse.json({ error: "Failed to create account in database." }, { status: 500 });
  }
}
