"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { CartItem, MAX_QTY, describeVariant, useCart } from "@/lib/cart";
import MagneticButton from "./ui/MagneticButton";
import OrderTotals from "./OrderTotals";
import CouponBox from "./CouponBox";

function QtyStepper({ item }: { item: CartItem }) {
  const { setQty } = useCart();
  const btn =
    "flex h-9 w-9 items-center justify-center rounded-full text-ink transition hover:bg-ink/5 active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ink";
  return (
    <div
      role="group"
      aria-label={`Quantity for ${item.name}`}
      className="inline-flex items-center rounded-full border border-ink/15"
    >
      <button
        type="button"
        className={btn}
        onClick={() => setQty(item.id, item.qty - 1)}
        aria-label={item.qty === 1 ? `Remove ${item.name}` : "Decrease quantity"}
      >
        <Minus size={14} />
      </button>
      <span className="min-w-8 text-center font-mono text-sm text-ink" aria-live="polite">
        {item.qty}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => setQty(item.id, item.qty + 1)}
        disabled={item.qty >= MAX_QTY}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

export default function CartView() {
  const { items, hydrated, subtotal, savings, discount, shipping, total, remove, clear } =
    useCart();

  if (!hydrated) {
    return <div className="min-h-[40vh]" aria-busy="true" />;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-ink/10 bg-void-softer px-8 py-16 text-center shadow-sm">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-coral/15 text-coral-deep">
          <ShoppingBag size={24} />
        </span>
        <h2 className="font-display text-2xl font-semibold text-ink">Your cart is empty</h2>
        <p className="max-w-sm text-ink-dim">
          Pick a few things your pet will destroy lovingly, and they&apos;ll show up here.
        </p>
        <MagneticButton href="/shop" variant="solid" cursorLabel="Shop">
          Browse the shop
        </MagneticButton>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
      <div>
        <ul className="flex flex-col gap-4">
          {items.map((item) => {
            const variant = describeVariant(item);
            return (
              <li
                key={item.id}
                className="flex gap-4 rounded-3xl border border-ink/10 bg-void-softer p-4 shadow-sm sm:gap-5 sm:p-5"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#f9ddba] sm:h-28 sm:w-28">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="112px"
                      draggable={false}
                      className="object-contain p-1.5"
                    />
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                        {item.name}
                      </h3>
                      {variant && (
                        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-ink-dimmer">
                          {variant}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-ink-dim">
                        ₹{item.unitPrice} each
                        {item.unitMrp && item.unitMrp > item.unitPrice && (
                          <del className="ml-2 text-ink-dimmer">₹{item.unitMrp}</del>
                        )}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-dim transition hover:bg-ink/5 hover:text-ink active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ink"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <QtyStepper item={item} />
                    <p className="font-display text-lg font-bold text-ink">
                      ₹{item.unitPrice * item.qty}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/shop"
            className="font-mono text-xs uppercase tracking-wide text-coral-deep underline underline-offset-4"
          >
            ← Keep shopping
          </Link>
          <button
            type="button"
            onClick={clear}
            className="font-mono text-xs uppercase tracking-wide text-ink-dim underline underline-offset-4 hover:text-ink"
          >
            Clear cart
          </button>
        </div>
      </div>

      <aside className="rounded-3xl border border-ink/10 bg-void-softer p-6 shadow-sm lg:sticky lg:top-28">
        <h2 className="font-display text-xl font-semibold text-ink">Order summary</h2>
        <OrderTotals
          subtotal={subtotal}
          savings={savings}
          discount={discount}
          shipping={shipping}
          total={total}
          className="mt-5"
        />
        <CouponBox />
        <Link
          href="/checkout"
          data-cursor="Checkout"
          className="mt-6 flex w-full items-center justify-center rounded-full bg-coral px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-coral-light active:scale-[0.98]"
        >
          Checkout
        </Link>
      </aside>
    </div>
  );
}
