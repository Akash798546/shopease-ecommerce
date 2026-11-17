import { NextResponse } from "next/server";
import { dbGet, dbAll } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Query user from SQLite DB
    const userRow = await dbGet<any>(
      "SELECT id, fullName, email, mobile, password, role, createdAt FROM users WHERE email = ?",
      [cleanEmail]
    );

    if (!userRow) {
      return NextResponse.json(
        { error: "No account found with this email. Please sign up." },
        { status: 401 }
      );
    }

    if (userRow.password !== password) {
      return NextResponse.json(
        { error: "Incorrect password. Please verify your credentials." },
        { status: 401 }
      );
    }

    // Query saved addresses from SQLite DB
    const addresses = await dbAll<any>(
      "SELECT id, fullName, mobile, houseNo, street, city, state, pincode, addressType, isDefault FROM addresses WHERE userId = ?",
      [userRow.id]
    );

    const user = {
      id: userRow.id,
      fullName: userRow.fullName,
      email: userRow.email,
      mobile: userRow.mobile,
      role: userRow.role,
      addresses: addresses.map((a) => ({
        id: a.id,
        fullName: a.fullName,
        mobile: a.mobile,
        houseNo: a.houseNo,
        street: a.street,
        city: a.city,
        state: a.state,
        pincode: a.pincode,
        addressType: a.addressType,
        isDefault: a.isDefault === 1,
      })),
      joinedAt: userRow.createdAt,
    };

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    console.error("Login Error:", err);
    return NextResponse.json({ error: "Server database error." }, { status: 500 });
  }
}
