import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Order } from "@/types";
import { formatPrice, formatDate, generateInvoiceNumber } from "./formatters";

export function generatePdfInvoice(order: Order): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const invoiceNumber = generateInvoiceNumber(order.orderNumber);
  const invoiceDate = formatDate(order.createdAt);

  // 1. Header Banner
  doc.setFillColor(37, 99, 235); // Royal Blue #2563eb
  doc.rect(0, 0, 210, 36, "F");

  // ShopEase Logo & Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("ShopEase", 14, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(224, 231, 255);
  doc.text("Premium E-Commerce Platform", 14, 25);
  doc.text("www.shopease-demo.com | support@shopease.com", 14, 30);

  // TAX INVOICE title right-aligned
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("TAX INVOICE", 196, 18, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(224, 231, 255);
  doc.text(`Invoice No: ${invoiceNumber}`, 196, 25, { align: "right" });
  doc.text(`Date: ${invoiceDate}`, 196, 30, { align: "right" });

  // 2. Demo Disclaimer Watermark Bar
  doc.setFillColor(254, 243, 199); // Amber 100
  doc.setDrawColor(245, 158, 11); // Amber 500
  doc.rect(14, 42, 182, 9, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(180, 83, 9); // Amber 700
  doc.text(
    "DEMO TRANSACTION — NO ACTUAL FINANCIAL CHARGE OCCURRED (TEST SIMULATION)",
    105,
    48,
    { align: "center" }
  );

  // 3. Two-column Customer & Order Details
  // Left: Bill To
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59); // Slate 800
  doc.text("Billed & Shipped To:", 14, 60);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105); // Slate 600
  doc.text(`${order.customer.fullName}`, 14, 66);
  doc.text(`${order.deliveryAddress.houseNo}, ${order.deliveryAddress.street}`, 14, 71);
  doc.text(`${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pincode}`, 14, 76);
  doc.text(`Phone: ${order.customer.mobile}`, 14, 81);
  doc.text(`Email: ${order.customer.email}`, 14, 86);

  // Right: Order Metadata
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text("Order Information:", 120, 60);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Order ID: ${order.orderNumber}`, 120, 66);
  doc.text(`Order Date: ${invoiceDate}`, 120, 71);
  doc.text(`Payment Method: ${order.paymentMethod}`, 120, 76);
  doc.text(`Payment Status: ${order.paymentStatus}`, 120, 81);
  doc.text(`Shipment Status: ${order.orderStatus}`, 120, 86);

  // 4. Products Table
  const tableData = order.items.map((item, index) => [
    (index + 1).toString(),
    item.product.name,
    item.product.categoryName,
    item.quantity.toString(),
    formatPrice(item.product.price),
    formatPrice(item.product.price * item.quantity),
  ]);

  autoTable(doc, {
    startY: 94,
    head: [["#", "Item Description", "Category", "Qty", "Unit Price", "Amount"]],
    body: tableData,
    theme: "striped",
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [51, 65, 85],
    },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 80 },
      2: { cellWidth: 32 },
      3: { cellWidth: 15, halign: "center" },
      4: { cellWidth: 25, halign: "right" },
      5: { cellWidth: 20, halign: "right" },
    },
    margin: { left: 14, right: 14 },
  });

  // 5. Summary / Totals Section
  // @ts-expect-error autoTable adds lastAutoTable to jsPDF instance
  const finalY = doc.lastAutoTable.finalY + 8;

  const summaryStartX = 120;
  const summaryValX = 196;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);

  doc.text("Subtotal:", summaryStartX, finalY);
  doc.text(formatPrice(order.subtotal), summaryValX, finalY, { align: "right" });

  let currentY = finalY + 6;

  if (order.discount > 0) {
    doc.setTextColor(22, 101, 52); // Emerald 800
    doc.text(`Discount (${order.couponApplied?.code || "Coupon"}):`, summaryStartX, currentY);
    doc.text(`- ${formatPrice(order.discount)}`, summaryValX, currentY, { align: "right" });
    currentY += 6;
  }

  doc.setTextColor(71, 85, 105);
  doc.text("Delivery Charges:", summaryStartX, currentY);
  doc.text(
    order.deliveryFee === 0 ? "FREE" : formatPrice(order.deliveryFee),
    summaryValX,
    currentY,
    { align: "right" }
  );

  currentY += 8;

  // Divider Line
  doc.setDrawColor(203, 213, 225);
  doc.line(summaryStartX, currentY - 2, summaryValX, currentY - 2);

  // Grand Total in Bold
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text("Grand Total:", summaryStartX, currentY + 4);
  doc.text(formatPrice(order.total), summaryValX, currentY + 4, { align: "right" });

  // 6. Footer Notes
  const footerY = 265;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, footerY, 196, footerY);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Thank you for shopping with ShopEase! This is a computer-generated demonstration invoice.",
    105,
    footerY + 6,
    { align: "center" }
  );
  doc.text(
    "For customer support inquiries, contact help@shopease.com or call 1800-000-EASE.",
    105,
    footerY + 11,
    { align: "center" }
  );

  return doc;
}

export function downloadInvoicePdf(order: Order): void {
  const doc = generatePdfInvoice(order);
  doc.save(`ShopEase-Invoice-${order.orderNumber}.pdf`);
}
