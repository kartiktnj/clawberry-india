"use client";

import { useEffect, useRef } from "react";
import { Bone, PawPrint, Sparkles } from "lucide-react";

const ICONS = [PawPrint, Bone, Sparkles, PawPrint, Bone];
const COLORS = ["text-grape", "text-coral", "text-mint", "text-grape-light", "text-coral-light"];

const LAYOUT = [
  { top: "9%", left: "7%" },
  { top: "16%", left: "84%" },
  { top: "6%", left: "44%" },
  { top: "26%", left: "16%" },
  { top: "33%", left: "72%" },
  { top: "12%", left: "62%" },
  { top: "40%", left: "6%" },
  { top: "22%", left: "93%" },
  { top: "3%", left: "26%" },
  { top: "30%", left: "38%" },
  { top: "18%", left: "52%" },
  { top: "45%", left: "24%" },
];

const PAWS = LAYOUT.map((pos, i) => ({
  ...pos,
  Icon: ICONS[i % ICONS.length],
  color: COLORS[i % COLORS.length],
  size: 20 + ((i * 7) % 24),
  duration: 4 + (i % 5) * 0.7,
  delay: (i % 6) * 0.35,
  rotate: (i % 2 === 0 ? 1 : -1) * (8 + (i % 4) * 6),
  depth: 8 + (i % 4) * 5,
}));

export default function PawField() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = PAWS[i].depth;
        el.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block" aria-hidden>
      {PAWS.map((item, i) => (
        <div
          key={i}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className="absolute transition-transform duration-500 ease-out"
          style={{ top: item.top, left: item.left }}
        >
          <item.Icon
            strokeWidth={1.5}
            className={`paw-float ${item.color}`}
            style={
              {
                width: item.size,
                height: item.size,
                opacity: 0.4,
                "--rot": `${item.rotate}deg`,
                "--dur": `${item.duration}s`,
                "--delay": `${item.delay}s`,
              } as React.CSSProperties
            }
          />
        </div>
      ))}
      <style>{`
        @keyframes paw-float {
          0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-14px) rotate(calc(var(--rot, 0deg) * -1)); }
        }
        .paw-float {
          animation: paw-float var(--dur, 5s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
      `}</style>
    </div>
  );
}
