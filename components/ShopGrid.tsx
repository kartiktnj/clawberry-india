"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

const FILTERS: { key: Product["category"] | "all"; label: string }[] = [
  { key: "all", label: "Everything" },
  { key: "dog", label: "Dogs" },
  { key: "cat", label: "Cats" },
  { key: "both", label: "Both" },
];

export default function ShopGrid() {
  const [active, setActive] = useState<Product["category"] | "all">("all");

  const filtered =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            data-cursor={f.label}
            className={cn(
              "rounded-full border px-5 py-2.5 font-mono text-xs uppercase tracking-wide transition active:scale-95",
              active === f.key
                ? "border-coral bg-coral text-ink"
                : "border-ink/15 text-ink-dim hover:border-ink/40 hover:text-ink"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <motion.div
              key={product.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-[420px]"
            >
              <ProductCard product={product} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-ink-dim">
          Nothing here yet — check back for the next drop.
        </p>
      )}
    </div>
  );
}
