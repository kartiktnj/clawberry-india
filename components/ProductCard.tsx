"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Product, pricingFor } from "@/lib/products";
import ProductIcon from "./ui/ProductIcon";
import { MAX_QTY, cartItemId, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const COLOR_CLASSES: Record<Product["color"], { bg: string; text: string; ring: string }> = {
  grape: { bg: "bg-grape/15", text: "text-grape", ring: "hover:border-grape/50" },
  coral: { bg: "bg-coral/15", text: "text-coral-deep", ring: "hover:border-coral/50" },
  mint: { bg: "bg-mint/15", text: "text-mint-deep", ring: "hover:border-mint/50" },
};

export default function ProductCard({
  product,
  className,
  action,
}: {
  product: Product;
  className?: string;
  /** Overrides the default add-to-cart button in the price row. */
  action?: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  // Deterministic per-product offset so a grid of cards doesn't bounce in unison.
  const seed = product.slug.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const floatDelay = (seed % 12) / 10;
  const floatDuration = 3.2 + (seed % 9) / 10;

  const colors = COLOR_CLASSES[product.color];

  // Default to the size that matches the base price so the card shows the same price as before selection.
  const [size, setSize] = useState(
    () => product.sizes?.find((s) => s.price === product.price) ?? product.sizes?.[0]
  );
  const [swatch, setSwatch] = useState(() => product.colors?.[0]);
  const { price, mrp, discountPct } = pricingFor(product, size, swatch);
  const image = swatch?.image ?? product.image;

  const { items, add, setQty } = useCart();
  // The cart line for exactly what's selected on the card (same size + colour).
  const lineId = cartItemId(product.slug, size?.label, swatch?.name);
  const inCartQty = items.find((i) => i.id === lineId)?.qty ?? 0;

  // Add <-> stepper swaps the focused button out of the DOM, so hand focus to its replacement.
  const addRef = useRef<HTMLButtonElement>(null);
  const plusRef = useRef<HTMLButtonElement>(null);
  const focusNext = useRef<"add" | "plus" | null>(null);
  const hasLine = inCartQty > 0;
  useEffect(() => {
    if (focusNext.current === "plus") plusRef.current?.focus();
    if (focusNext.current === "add") addRef.current?.focus();
    focusNext.current = null;
  }, [hasLine]);

  const handleAdd = () => {
    focusNext.current = "plus";
    add({
      id: lineId,
      slug: product.slug,
      name: product.name,
      image,
      size: size?.label,
      colour: swatch?.name,
      unitPrice: price,
      unitMrp: mrp,
    });
  };

  const decrease = () => {
    if (inCartQty <= 1) focusNext.current = "add";
    setQty(lineId, inCartQty - 1);
  };

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-ink/10 bg-void-softer p-6 shadow-sm transition duration-200 hover:shadow-md",
        colors.ring,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wide",
            colors.bg,
            colors.text
          )}
        >
          {product.tag}
        </span>
      </div>

      <div
        className={cn(
          "relative my-8 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl",
          image ? "bg-[#f9ddba]" : colors.bg
        )}
      >
        {image ? (
          <Image
            src={image}
            alt={swatch ? `${product.name} - ${swatch.name}` : product.name}
            fill
            draggable={false}
            sizes="(max-width: 640px) 280px, 320px"
            className="object-contain p-3"
          />
        ) : (
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, 3, 0, -3, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }
            }
          >
            {product.icon && <ProductIcon icon={product.icon} className={cn("h-14 w-14", colors.text)} />}
          </motion.div>
        )}
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-ink">{product.name}</h3>
        <p className="mt-1.5 text-sm text-ink-dim">{product.tagline}</p>

        {(product.colors || product.sizes) && (
          <div className="mt-4 space-y-3">
            {product.colors && swatch && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-dimmer">
                  Colour <span className="text-ink">· {swatch.name}</span>
                </p>
                <div role="radiogroup" aria-label={`${product.name} colour`} className="mt-1.5 flex flex-wrap gap-1">
                  {product.colors.map((c) => {
                    const selected = c.name === swatch.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        aria-label={c.name}
                        title={c.name}
                        onClick={() => setSwatch(c)}
                        className="group/swatch flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ink"
                      >
                        <span
                          style={{ backgroundColor: c.hex }}
                          className={cn(
                            "block h-6 w-6 rounded-full border border-ink/20 transition duration-150 group-active/swatch:scale-90",
                            selected && "ring-2 ring-ink ring-offset-2 ring-offset-void-softer"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.sizes && size && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-dimmer">
                  Size <span className="text-ink">· {size.label}</span>
                </p>
                <div role="radiogroup" aria-label={`${product.name} size`} className="mt-1.5 flex flex-wrap gap-2">
                  {product.sizes.map((s) => {
                    const selected = s.label === size.label;
                    return (
                      <button
                        key={s.label}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setSize(s)}
                        className={cn(
                          "h-9 min-w-11 rounded-full border px-3 font-mono text-xs uppercase transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ink",
                          selected
                            ? "border-coral bg-coral text-ink"
                            : "border-ink/15 text-ink-dim hover:border-ink/40 hover:text-ink"
                        )}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <span aria-live="polite" className="relative inline-flex overflow-hidden py-0.5">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={`${price}-${mrp ?? ""}`}
                initial={reduceMotion ? false : { y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { y: -14, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-baseline gap-x-2 gap-y-1"
              >
                <span className="font-display text-lg font-bold text-ink">
                  <span className="sr-only">Price </span>₹{price}
                </span>
                {mrp && (
                  <>
                    <del className="text-sm text-ink-dim decoration-ink-dim/70">
                      <span className="sr-only">MRP </span>₹{mrp}
                    </del>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide",
                        colors.bg,
                        colors.text
                      )}
                    >
                      {discountPct}% off
                    </span>
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </span>
          {action ??
            (inCartQty > 0 ? (
              <div
                role="group"
                aria-label={`${product.name} quantity in cart`}
                className="inline-flex h-10 shrink-0 items-center rounded-full border border-coral/50 bg-coral/10 text-ink"
              >
                <button
                  type="button"
                  onClick={decrease}
                  aria-label={
                    inCartQty === 1 ? `Remove ${product.name} from cart` : "Decrease quantity"
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full text-coral-deep transition hover:bg-coral/15 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <Minus size={16} strokeWidth={2.5} />
                </button>
                <span
                  aria-live="polite"
                  className="min-w-6 text-center font-display text-sm font-bold tabular-nums"
                >
                  {inCartQty}
                </span>
                <button
                  ref={plusRef}
                  type="button"
                  onClick={() => setQty(lineId, inCartQty + 1)}
                  disabled={inCartQty >= MAX_QTY}
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-coral-deep transition hover:bg-coral/15 active:scale-90 disabled:opacity-40 disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <Plus size={16} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <button
                ref={addRef}
                type="button"
                onClick={handleAdd}
                disabled={price <= 0}
                data-cursor="Add"
                aria-label={`Add ${product.name} to cart`}
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-coral/40 px-4 font-display text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-coral/55 active:scale-95 active:bg-coral/65 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <ShoppingBag size={15} />
                Add
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
