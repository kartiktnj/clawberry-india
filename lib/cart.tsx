"use client";

import { computeTotals } from "./coupons";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  /** slug + size + colour - the same product in a different size/colour is its own line. */
  id: string;
  slug: string;
  name: string;
  image?: string;
  size?: string;
  colour?: string;
  unitPrice: number;
  unitMrp?: number;
  qty: number;
};

export const MAX_QTY = 20;
const STORAGE_KEY = "clawberry-cart-v1";
const COUPON_KEY = "clawberry-coupon-v1";

export function cartItemId(slug: string, size?: string, colour?: string) {
  return [slug, size ?? "", colour ?? ""].join("|");
}

type CartContextValue = {
  items: CartItem[];
  /** False until the saved cart has been read from the browser - avoids a flash of "empty cart". */
  hydrated: boolean;
  count: number;
  subtotal: number;
  /** Total discount versus MRP, 0 when nothing in the cart has an MRP. */
  savings: number;
  /** True once the coupon has been applied (it only takes effect while the cart qualifies). */
  couponApplied: boolean;
  /** Coupon amount actually being taken off right now (0 if not applied or cart too small). */
  discount: number;
  shipping: number;
  /** Amount to pay: subtotal - coupon + shipping. */
  total: number;
  applyCoupon: () => void;
  removeCoupon: () => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readSaved(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i): i is CartItem =>
        i && typeof i.id === "string" && typeof i.unitPrice === "number" && typeof i.qty === "number"
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setItems(readSaved());
      try {
        setCouponApplied(window.localStorage.getItem(COUPON_KEY) === "1");
      } catch {
        // ignore
      }
      setHydrated(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage blocked (private mode) - the cart still works for this visit.
    }
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(COUPON_KEY, couponApplied ? "1" : "0");
    } catch {
      // ignore
    }
  }, [couponApplied, hydrated]);

  const add = useCallback<CartContextValue["add"]>((item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i
        );
      }
      return [...prev, { ...item, qty: Math.min(MAX_QTY, qty) }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(MAX_QTY, qty) } : i))
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setCouponApplied(false);
  }, []);
  const applyCoupon = useCallback(() => setCouponApplied(true), []);
  const removeCoupon = useCallback(() => setCouponApplied(false), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.unitPrice * i.qty, 0);
    const savings = items.reduce(
      (n, i) => n + (i.unitMrp && i.unitMrp > i.unitPrice ? (i.unitMrp - i.unitPrice) * i.qty : 0),
      0
    );
    const { discount, shipping, total } = computeTotals(subtotal, couponApplied);
    return {
      items,
      hydrated,
      count,
      subtotal,
      savings,
      couponApplied,
      discount,
      shipping,
      total,
      add,
      setQty,
      remove,
      clear,
      applyCoupon,
      removeCoupon,
    };
  }, [items, hydrated, couponApplied, add, setQty, remove, clear, applyCoupon, removeCoupon]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

/** "Size M, Red" - the variant bits of a line, or an empty string for products without options. */
export function describeVariant(item: Pick<CartItem, "size" | "colour">) {
  return [item.size && `Size ${item.size}`, item.colour].filter(Boolean).join(", ");
}
