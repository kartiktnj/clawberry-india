"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  cursorLabel?: string;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  type = "button",
  cursorLabel = "Go",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wide transition-colors duration-300";
  const variants = {
    solid: "bg-coral text-ink hover:bg-coral-light",
    outline: "border border-ink/25 text-ink hover:border-ink/60",
    ghost: "text-ink hover:text-coral",
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(base, variants[variant], className)}
      data-cursor={cursorLabel}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
