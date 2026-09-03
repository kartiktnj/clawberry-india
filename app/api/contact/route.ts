import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_EMAIL_TO || "clawberryindia@gmail.com";
const FROM_EMAIL = process.env.CONTACT_EMAIL_FROM || "Clawberry Website <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error(
        "RESEND_API_KEY is not set - contact form submissions cannot be emailed. Falling back to a server log."
      );
      console.log("New Clawberry contact submission:", { name, email, message });
      return NextResponse.json({ ok: true });
    }

    // Gmail threads messages by subject + participants, so a fixed subject
    // line collapses every submission into one conversation - a timestamp
    // keeps each one distinct and landing as its own thread.
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
      subject: `New contact form message from ${name} - ${timestamp}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend failed to send contact email:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
