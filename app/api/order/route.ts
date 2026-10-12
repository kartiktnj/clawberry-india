import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_EMAIL_TO || "clawberryindia@gmail.com";
const FROM_EMAIL = process.env.CONTACT_EMAIL_FROM || "Clawberry Website <onboarding@resend.dev>";

const str = (v: unknown, max: number) =>
  typeof v === "string" && v.trim().length > 0 && v.length <= max ? v.trim() : null;

/**
 * Records that a visitor tapped "Order on WhatsApp" by emailing us the order. This is an
 * "initiated" alert, not a confirmation - the customer may never press send in WhatsApp, so the
 * email says so and carries the order ref to look for in the chat.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ref = str(body?.ref, 20);
    const name = str(body?.name, 100);
    const email = str(body?.email, 200);
    const phone = str(body?.phone, 30);
    const message = str(body?.message, 4000);
    const total = typeof body?.total === "number" && body.total > 0 ? body.total : null;

    if (!ref || !name || !email || !phone || !message || !total || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid order." }, { status: 400 });
    }

    const text = [
      "ORDER INITIATED - NOT YET CONFIRMED",
      `The customer tapped "Order on WhatsApp". They may not have sent the message - look for ref ${ref} in your WhatsApp chat.`,
      "",
      "----- Message the customer was given -----",
      message,
    ].join("\n");

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set - order alert cannot be emailed. Logging instead.");
      console.log("Clawberry order initiated:", { ref, name, email, phone, total, message });
      return NextResponse.json({ ok: true });
    }

    // A timestamp keeps each alert in its own Gmail thread (see the contact route).
    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Order initiated ${ref} - ${name} - ₹${total} - ${timestamp}`,
      text,
    });

    if (error) {
      console.error("Resend failed to send order alert:", error);
      return NextResponse.json({ ok: false, error: "Failed to record order." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
