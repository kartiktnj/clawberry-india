"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Lock, MessageCircle } from "lucide-react";
import { describeVariant, useCart } from "@/lib/cart";
import {
  OrderDetails,
  buildOrderMessage,
  whatsappOrderUrl,
} from "@/lib/whatsapp";
import { fallbackOrderRef } from "@/lib/orderRef";
import { cn } from "@/lib/utils";
import MagneticButton from "./ui/MagneticButton";
import OrderTotals from "./OrderTotals";
import CouponBox from "./CouponBox";

const DETAILS_KEY = "clawberry-checkout-v1";

const EMPTY: OrderDetails = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

type Errors = Partial<Record<keyof OrderDetails, string>>;

function validate(d: OrderDetails): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Enter your full name.";
  const phoneDigits = d.phone.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 13)
    e.phone = "Enter a 10-digit mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = "Enter a valid email address.";
  if (d.address.trim().length < 6) e.address = "Enter your full delivery address.";
  if (d.city.trim().length < 2) e.city = "Enter your city.";
  if (d.state.trim().length < 2) e.state = "Enter your state.";
  if (!/^\d{6}$/.test(d.pincode.trim())) e.pincode = "Enter a 6-digit pincode.";
  return e;
}

const FIELD_ORDER: (keyof OrderDetails)[] = [
  "name",
  "phone",
  "email",
  "address",
  "city",
  "state",
  "pincode",
];

const inputClass =
  "w-full rounded-2xl border bg-void-softer px-5 py-3.5 text-sm text-ink placeholder:text-ink-dimmer focus:outline-none";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-wide text-ink-dimmer">
        {label}
        {optional && <span className="normal-case tracking-normal"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-coral-deep">
          {error}
        </p>
      )}
    </div>
  );
}

export default function CheckoutView() {
  const { items, hydrated, subtotal, savings, discount, shipping, total, couponApplied, clear } =
    useCart();
  const [details, setDetails] = useState<OrderDetails>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  // Set once they tap "Order on WhatsApp" - drives the "did you send it?" prompt.
  const [pending, setPending] = useState<{ url: string; ref: string } | null>(null);
  // Set once they confirm they sent it - drives the thank-you screen.
  const [placedRef, setPlacedRef] = useState<string | null>(null);
  const [preparing, setPreparing] = useState(false);
  const orderRef = useRef<string | null>(null);
  const notifiedMessage = useRef<string | null>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const loaded = useRef(false);

  // Restore what the visitor typed last time so a second order is one tap away.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(DETAILS_KEY);
        if (raw) setDetails({ ...EMPTY, ...JSON.parse(raw), notes: "" });
      } catch {
        // ignore unreadable saved details
      }
      loaded.current = true;
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(DETAILS_KEY, JSON.stringify(details));
    } catch {
      // storage blocked - fine
    }
  }, [details]);

  const update = (key: keyof OrderDetails, value: string) => {
    setDetails((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    setPending(null);
  };

  const orderOnWhatsApp = async () => {
    if (preparing) return;
    const found = validate(details);
    setErrors(found);
    const firstBad = FIELD_ORDER.find((k) => found[k]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`#${firstBad}`)?.focus();
      return;
    }
    // One ref per checkout, so tapping again to retry still points at the same order. The number
    // comes from the server so orders run in sequence (DDMMYY-501, -502, …); if that fails the
    // customer can still order with a temporary ref.
    if (!orderRef.current) {
      setPreparing(true);
      try {
        const res = await fetch("/api/order-ref", { method: "POST" });
        const data = res.ok ? await res.json() : null;
        orderRef.current = typeof data?.ref === "string" ? data.ref : fallbackOrderRef();
      } catch {
        orderRef.current = fallbackOrderRef();
      }
      setPreparing(false);
    }
    const ref = orderRef.current ?? fallbackOrderRef();
    const message = buildOrderMessage(items, details, subtotal, ref, couponApplied);
    const url = whatsappOrderUrl(message);
    setPending({ url, ref });
    window.open(url, "_blank", "noopener,noreferrer");

    // Alert us that an order was started. Fire-and-forget: it must never block or fail the
    // customer's order, and the same message is only reported once.
    if (notifiedMessage.current !== message) {
      notifiedMessage.current = message;
      fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          ref,
          name: details.name,
          email: details.email,
          phone: details.phone,
          total,
          message,
        }),
      }).catch(() => {
        notifiedMessage.current = null; // let a retry report it again
      });
    }
  };

  const confirmSent = () => {
    if (!pending) return;
    setPlacedRef(pending.ref);
    setPending(null);
    setDetails(EMPTY); // order is done - don't leave their address sitting in the form (or storage)
    orderRef.current = null;
    notifiedMessage.current = null;
    clear();
  };

  // Bring the prompt into view - on phones WhatsApp opens over the page, so this is what they
  // see when they come back.
  useEffect(() => {
    if (pending) promptRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [pending]);

  if (placedRef) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-mint/30 bg-mint/10 px-8 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint text-ink">
          <CheckCircle2 size={26} />
        </span>
        <h2 className="font-display text-3xl font-semibold text-ink">Thank you!</h2>
        <p className="max-w-md text-ink-dim">
          Your order <span className="font-mono text-ink">{placedRef}</span> is with us on WhatsApp.
          We&apos;ll reply there to confirm it and share the payment details. If you haven&apos;t
          pressed send yet, do it now so we get it.
        </p>
        <MagneticButton href="/shop" variant="solid" cursorLabel="Shop">
          Keep shopping
        </MagneticButton>
      </div>
    );
  }

  if (!hydrated) return <div className="min-h-[40vh]" aria-busy="true" />;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-ink/10 bg-void-softer px-8 py-16 text-center shadow-sm">
        <h2 className="font-display text-2xl font-semibold text-ink">Nothing to check out yet</h2>
        <p className="max-w-sm text-ink-dim">Add something to your cart first.</p>
        <MagneticButton href="/shop" variant="solid" cursorLabel="Shop">
          Browse the shop
        </MagneticButton>
      </div>
    );
  }

  const field = (key: keyof OrderDetails) => ({
    id: key,
    name: key,
    value: details[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      update(key, e.target.value),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    className: cn(
      inputClass,
      errors[key] ? "border-coral-deep" : "border-ink/12 focus:border-mint"
    ),
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      <form
        ref={formRef}
        noValidate
        onSubmit={(e) => e.preventDefault()}
        className="rounded-3xl border border-ink/10 bg-void-softer p-6 shadow-sm sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-xl font-semibold text-ink">Your details</h2>
          <button
            type="button"
            onClick={() => {
              setDetails(EMPTY);
              setErrors({});
              setPending(null);
            }}
            className="font-mono text-xs uppercase tracking-wide text-ink-dim underline underline-offset-4 hover:text-ink"
          >
            Clear form
          </button>
        </div>
        <p className="mt-1 text-sm text-ink-dim">
          We&apos;ll use these to deliver your order and get in touch about it. They&apos;re saved
          on this device only, so next time is quicker.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Full name" error={errors.name}>
            <input type="text" autoComplete="name" placeholder="Your name" {...field("name")} />
          </Field>
          <Field id="phone" label="Mobile number" error={errors.phone}>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="98XXXXXXXX"
              {...field("phone")}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field id="email" label="Email" error={errors.email}>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...field("email")}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field id="address" label="Delivery address" error={errors.address}>
              <textarea
                rows={3}
                autoComplete="street-address"
                placeholder="House / flat no., street, area"
                {...field("address")}
                className={cn(field("address").className, "resize-none")}
              />
            </Field>
          </div>
          <Field id="city" label="City" error={errors.city}>
            <input type="text" autoComplete="address-level2" {...field("city")} />
          </Field>
          <Field id="state" label="State" error={errors.state}>
            <input type="text" autoComplete="address-level1" {...field("state")} />
          </Field>
          <Field id="pincode" label="Pincode" error={errors.pincode}>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              autoComplete="postal-code"
              {...field("pincode")}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field id="notes" label="Order notes" optional>
              <textarea
                rows={2}
                placeholder="Anything we should know? Gift note, preferred colour if sold out…"
                {...field("notes")}
                className={cn(field("notes").className, "resize-none")}
              />
            </Field>
          </div>
        </div>
      </form>

      <aside className="rounded-3xl border border-ink/10 bg-void-softer p-6 shadow-sm lg:sticky lg:top-28">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-ink">Order summary</h2>
          <Link
            href="/cart"
            className="font-mono text-xs uppercase tracking-wide text-coral-deep underline underline-offset-4"
          >
            Edit cart
          </Link>
        </div>

        <ul className="mt-5 flex flex-col gap-4">
          {items.map((item) => {
            const variant = describeVariant(item);
            return (
              <li key={item.id} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f9ddba]">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="56px"
                      draggable={false}
                      className="object-contain p-1"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-dimmer">
                    {variant ? `${variant} · ` : ""}Qty {item.qty}
                  </p>
                </div>
                <p className="text-sm font-medium text-ink">₹{item.unitPrice * item.qty}</p>
              </li>
            );
          })}
        </ul>

        <OrderTotals
          subtotal={subtotal}
          savings={savings}
          discount={discount}
          shipping={shipping}
          total={total}
          className="mt-6 border-t border-ink/10 pt-6"
        />
        <CouponBox />

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-ink/10 px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-ink-dimmer"
          >
            <Lock size={15} />
            Place order
          </button>
          <p className="text-center text-xs text-ink-dim">
           Due to the festive rush online orders are temporarily suspended. Please order directly on WhatsApp.
          </p>

          <button
            type="button"
            onClick={orderOnWhatsApp}
            disabled={preparing}
            data-cursor="WhatsApp"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 disabled:opacity-60 font-display text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-coral-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <MessageCircle size={16} />
            {preparing ? "Preparing your order…" : "Order on WhatsApp"}
          </button>

          {Object.keys(errors).some((k) => errors[k as keyof OrderDetails]) && (
            <p role="alert" className="text-center text-xs text-coral-deep">
              Please fix the highlighted fields to continue.
            </p>
          )}

          {pending && (
            <div
              ref={promptRef}
              role="status"
              className="rounded-2xl border border-ink/10 bg-void p-4 text-center"
            >
              <p className="font-display text-sm font-semibold text-ink">
                Did you send your order on WhatsApp?
              </p>
              <p className="mt-1 text-xs text-ink-dim">
                Press send in the chat so we receive it. Order ref{" "}
                <span className="font-mono text-ink">{pending.ref}</span>.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={confirmSent}
                  className="rounded-full bg-mint-deep px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wide text-cream transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Yes, I&apos;ve sent it
                </button>
                <button
                  type="button"
                  onClick={() => setPending(null)}
                  className="rounded-full border border-ink/15 px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wide text-ink transition hover:border-ink/40 active:scale-[0.98]"
                >
                  Not yet
                </button>
              </div>
              <p className="mt-3 text-xs text-ink-dim">
                WhatsApp didn&apos;t open?{" "}
                <a
                  href={pending.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-coral-deep underline underline-offset-2"
                >
                  Open WhatsApp
                </a>
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
