"use client";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  speed?: number;
  reverse?: boolean;
};

export default function Marquee({ items, className, speed = 28, reverse = false }: MarqueeProps) {
  const loop = [...items, ...items];

  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div
        className="flex shrink-0 items-center gap-8 pr-8"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span>{item}</span>
            <span className="text-coral" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
      <div
        className="flex shrink-0 items-center gap-8 pr-8"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
        aria-hidden
      >
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span>{item}</span>
            <span className="text-coral" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
