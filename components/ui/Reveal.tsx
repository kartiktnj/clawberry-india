"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "span";
  delay?: number;
  y?: number;
  duration?: number;
};

export default function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  y = 40,
  duration = 0.9,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, y, duration, shouldReduceMotion]);

  // Reduced motion: skip the hidden-until-scrolled-into-view starting state
  // entirely, since nothing will ever un-hide it without the GSAP tween.
  const hiddenUntilRevealed = shouldReduceMotion ? undefined : "invisible";

  if (as === "span") {
    return (
      <span ref={ref as React.RefObject<HTMLSpanElement>} className={cn(hiddenUntilRevealed, className)}>
        {children}
      </span>
    );
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={cn(hiddenUntilRevealed, className)}>
      {children}
    </div>
  );
}
