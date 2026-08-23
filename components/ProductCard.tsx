"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/lib/products";
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
  /** Overrides the default "View" link in the price row — swap in an add-to-cart control once D2C ships. */
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
          "my-8 flex h-32 items-center justify-center rounded-2xl",
          colors.bg
        )}
        style={{ transform: "translateZ(30px)" }}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, 3, 0, -3, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ProductIcon icon={product.icon} className={cn("h-14 w-14", colors.text)} />
        </motion.div>
      </div>

      <div style={{ transform: "translateZ(20px)" }}>
        <h3 className="font-display text-xl font-semibold text-ink">{product.name}</h3>
        <p className="mt-1.5 text-sm text-ink-dim">{product.tagline}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-ink">₹{product.price}</span>
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
