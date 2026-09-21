"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Product, pricingFor } from "@/lib/products";
import ProductIcon from "./ui/ProductIcon";
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
  /** Overrides the default "View" link in the price row - swap in an add-to-cart control once D2C ships. */
  action?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 18 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const reduceMotion = useReducedMotion();
  // Deterministic per-product offset so a grid of cards doesn't bounce in unison.
  const seed = product.slug.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const floatDelay = (seed % 12) / 10;
  const floatDuration = 3.2 + (seed % 9) / 10;

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const colors = COLOR_CLASSES[product.color];

  // Default to the size that matches the base price so the card shows the same price as before selection.
  const [size, setSize] = useState(
    () => product.sizes?.find((s) => s.price === product.price) ?? product.sizes?.[0]
  );
  const [swatch, setSwatch] = useState(() => product.colors?.[0]);
  const { price, mrp, discountPct } = pricingFor(product, size, swatch);
  const image = swatch?.image ?? product.image;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-ink/10 bg-void-softer p-6 shadow-sm transition-colors duration-150",
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
        <span className="font-mono text-xs text-ink-dimmer capitalize">{product.category}</span>
      </div>

      <div
        className={cn(
          "relative my-8 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl",
          image ? "bg-[#f9ddba]" : colors.bg
        )}
        style={{ transform: "translateZ(30px)" }}
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

      <div style={{ transform: "translateZ(20px)" }}>
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
          {action ?? (
            <Link
              href={`/shop`}
              data-cursor="View"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition active:scale-90 group-hover:border-coral group-hover:text-coral-deep"
              aria-label={`View ${product.name}`}
            >
              <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
