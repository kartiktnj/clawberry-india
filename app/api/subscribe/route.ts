import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_EMAIL_TO || "clawberryindia@gmail.com";
const FROM_EMAIL = process.env.CONTACT_EMAIL_FROM || "Clawberry Website <onboarding@resend.dev>";

/**
 * Newsletter sign-ups. There is no mailing-list service yet, so each sign-up is emailed to the
 * team inbox (subject starts "Newsletter signup" - filter on it) and collected from there.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set - newsletter sign-up cannot be emailed. Logging instead.");
      console.log("New Clawberry newsletter signup:", { email });
      return NextResponse.json({ ok: true });
    }

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
      subject: `Newsletter signup - ${email} - ${timestamp}`,
      text: `New newsletter sign-up from the website footer:\n\n${email}`,
    });

    if (error) {
      console.error("Resend failed to send newsletter signup:", error);
      return NextResponse.json({ ok: false, error: "Failed to subscribe." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
