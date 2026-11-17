import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";
import { PRODUCTS } from "@/data/products";

// Ensure data directory exists
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "shopease.db");

// Singleton connection
let dbInstance: sqlite3.Database | null = null;

export function getDb(): sqlite3.Database {
  if (!dbInstance) {
    dbInstance = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Failed to connect to SQLite database:", err);
      }
    });
    initDb(dbInstance);
  }
  return dbInstance;
}

function initDb(db: sqlite3.Database) {
  db.serialize(() => {
    // 1. Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        fullName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        mobile TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'customer',
        createdAt TEXT NOT NULL
      )
    `);

    // 2. Addresses table
    db.run(`
      CREATE TABLE IF NOT EXISTS addresses (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        fullName TEXT NOT NULL,
        mobile TEXT NOT NULL,
        houseNo TEXT NOT NULL,
        street TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        pincode TEXT NOT NULL,
        addressType TEXT NOT NULL DEFAULT 'Home',
        isDefault INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // 3. Orders table
    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        orderNumber TEXT UNIQUE NOT NULL,
        userId TEXT,
        customerName TEXT NOT NULL,
        customerEmail TEXT NOT NULL,
        customerMobile TEXT NOT NULL,
        deliveryAddress TEXT NOT NULL,
        items TEXT NOT NULL,
        subtotal REAL NOT NULL,
        discount REAL NOT NULL DEFAULT 0,
        couponApplied TEXT,
        deliveryFee REAL NOT NULL DEFAULT 0,
        total REAL NOT NULL,
        paymentMethod TEXT NOT NULL,
        paymentStatus TEXT NOT NULL,
        paymentDetails TEXT,
        orderStatus TEXT NOT NULL DEFAULT 'Placed',
        estimatedDelivery TEXT NOT NULL,
        createdAt TEXT NOT NULL
      )
    `);

    // 4. Products table
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT NOT NULL,
        categoryName TEXT NOT NULL,
        subcategory TEXT NOT NULL,
        description TEXT NOT NULL,
        fullDescription TEXT NOT NULL,
        specifications TEXT NOT NULL,
        price REAL NOT NULL,
        originalPrice REAL NOT NULL,
        discountPercentage REAL NOT NULL,
        rating REAL NOT NULL DEFAULT 4.5,
        reviewCount INTEGER NOT NULL DEFAULT 0,
        stock INTEGER NOT NULL DEFAULT 10,
        images TEXT NOT NULL,
        isFeatured INTEGER NOT NULL DEFAULT 0,
        isTrending INTEGER NOT NULL DEFAULT 0,
        isBestSeller INTEGER NOT NULL DEFAULT 0,
        isNewArrival INTEGER NOT NULL DEFAULT 0,
        tags TEXT NOT NULL
      )
    `);

    // Seed Admin user if not exists
    db.get("SELECT id FROM users WHERE email = ?", ["admin@shopease.com"], (err, row) => {
      if (!row) {
        db.run(
          `INSERT INTO users (id, fullName, email, mobile, password, role, createdAt)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            "admin-1",
            "ShopEase Administrator",
            "admin@shopease.com",
            "+91 98111 22334",
            "admin123",
            "admin",
            new Date().toISOString(),
          ]
        );
      }
    });

    // Seed default customer if not exists
    db.get("SELECT id FROM users WHERE email = ?", ["customer@shopease.com"], (err, row) => {
      if (!row) {
        const custId = "cust-1";
        db.run(
          `INSERT INTO users (id, fullName, email, mobile, password, role, createdAt)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            custId,
            "John Doe",
            "customer@shopease.com",
            "+91 98765 43210",
            "password123",
            "customer",
            new Date().toISOString(),
          ]
        );

        db.run(
          `INSERT INTO addresses (id, userId, fullName, mobile, houseNo, street, city, state, pincode, addressType, isDefault)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
          [
            "addr-demo-1",
            custId,
            "John Doe",
            "+91 98765 43210",
            "Flat 402, Green Meadows",
            "12th Main Road, Indiranagar",
            "Bengaluru",
            "Karnataka",
            "560038",
            "Home",
          ]
        );
      }
    });

    // Seed initial products if table is empty
    db.get("SELECT COUNT(*) as count FROM products", (err, row: any) => {
      if (row && row.count === 0) {
        const stmt = db.prepare(`
          INSERT INTO products (
            id, name, slug, category, categoryName, subcategory, description, fullDescription,
            specifications, price, originalPrice, discountPercentage, rating, reviewCount,
            stock, images, isFeatured, isTrending, isBestSeller, isNewArrival, tags
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        for (const p of PRODUCTS) {
          stmt.run([
            p.id,
            p.name,
            p.slug,
            p.category,
            p.categoryName,
            p.subcategory,
            p.description,
            p.fullDescription,
            JSON.stringify(p.specifications),
            p.price,
            p.originalPrice,
            p.discountPercentage,
            p.rating,
            p.reviewCount,
            p.stock,
            JSON.stringify(p.images),
            p.isFeatured ? 1 : 0,
            p.isTrending ? 1 : 0,
            p.isBestSeller ? 1 : 0,
            p.isNewArrival ? 1 : 0,
            JSON.stringify(p.tags),
          ]);
        }
        stmt.finalize();
      }
    });
  });
}

// Database helper promises
export function dbAll<T = any>(query: string, params: any[] = []): Promise<T[]> {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows as T[]);
    });
  });
}

export function dbGet<T = any>(query: string, params: any[] = []): Promise<T | null> {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve((row as T) || null);
    });
  });
}

export function dbRun(query: string, params: any[] = []): Promise<{ lastID: number; changes: number }> {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}
