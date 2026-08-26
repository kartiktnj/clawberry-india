"use client";

import { useEffect, useRef, useState } from "react";
import { PawPrint } from "lucide-react";

type Print = { id: number; x: number; y: number; rot: number };

// Keep streaks and idle wandering inside the open space above the headline -
// never down where the copy/buttons sit.
const SAFE_BOUNDS = { xMin: 4, xMax: 90, yMin: 6, yMax: 62 }; // percent of hero box

const STEP_GAP = 46; // min px between live cursor-tracked spawns
const OFFSET = 9; // perpendicular gait offset, px - sells "two feet" instead of a dotted line
const MAX_PRINTS = 22;

const STREAK_STEPS = 8;
const STREAK_STAGGER = 110; // ms between prints within one streak
const STREAK_STEP_DIST = 42; // px per streak step
const IDLE_INTERVAL = 4200; // ms between idle streaks
const RESUME_IDLE_AFTER = 2800; // ms of no cursor movement before idle streaks resume

let uid = 0;

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prints, setPrints] = useState<Print[]>([]);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const side = useRef<1 | -1>(1);

  const addPrint = (x: number, y: number, rot: number) => {
    const id = uid++;
    setPrints((p) => {
      const next = [...p, { id, x, y, rot }];
      return next.length > MAX_PRINTS ? next.slice(next.length - MAX_PRINTS) : next;
    });
  };

  // Shared gait: offsets a print to alternating sides of a direction of
  // travel, used identically by streaks and live cursor tracking.
  const stepGait = (x: number, y: number, angle: number) => {
    const perp = angle + Math.PI / 2;
    side.current = side.current === 1 ? -1 : 1;
    addPrint(
      x + Math.cos(perp) * OFFSET * side.current,
      y + Math.sin(perp) * OFFSET * side.current,
      (angle * 180) / Math.PI
    );
  };

  useEffect(() => {
    // Idle streaks run on every device - only the live cursor-follow logic
    // needs a real pointer, so that part alone is gated on `fine` below.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    const streakTimers: ReturnType<typeof setTimeout>[] = [];
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;

    const clearStreakTimers = () => {
      streakTimers.forEach(clearTimeout);
      streakTimers.length = 0;
    };

    // A short burst of footprints from a random spot in a random direction -
    // the same shape as the load-in intro, replayed on an interval while
    // idle. Any real cursor movement cancels it instantly (see liveHandler).
    const playStreak = () => {
      const rect = el.getBoundingClientRect();
      const xMin = (SAFE_BOUNDS.xMin / 100) * rect.width;
      const xMax = (SAFE_BOUNDS.xMax / 100) * rect.width;
      const yMin = (SAFE_BOUNDS.yMin / 100) * rect.height;
      const yMax = (SAFE_BOUNDS.yMax / 100) * rect.height;

      let x = xMin + Math.random() * (xMax - xMin);
      let y = yMin + Math.random() * (yMax - yMin);
      let heading = Math.random() * Math.PI * 2;

      for (let i = 0; i < STREAK_STEPS; i++) {
        const timer = setTimeout(() => {
          if (cancelled) return;
          heading += (Math.random() - 0.5) * 0.5;
          let nx = x + Math.cos(heading) * STREAK_STEP_DIST;
          let ny = y + Math.sin(heading) * STREAK_STEP_DIST;
          if (nx < xMin || nx > xMax) {
            heading = Math.PI - heading;
            nx = x + Math.cos(heading) * STREAK_STEP_DIST;
          }
          if (ny < yMin || ny > yMax) {
            heading = -heading;
            ny = y + Math.sin(heading) * STREAK_STEP_DIST;
          }
          x = nx;
          y = ny;
          stepGait(x, y, heading);

          if (i === STREAK_STEPS - 1) {
            const next = setTimeout(playStreak, IDLE_INTERVAL);
            streakTimers.push(next);
          }
        }, i * STREAK_STAGGER);
        streakTimers.push(timer);
      }
    };

    playStreak(); // first streak fires immediately on load

    // No real pointer (touch/mobile) - idle streaks just keep looping on
    // their own interval forever, nothing to hand off to.
    if (!fine) {
      return () => {
        cancelled = true;
        clearStreakTimers();
      };
    }

    const liveHandler = (e: MouseEvent) => {
      // Any real cursor movement stops idle streaks right away and, after a
      // stretch of no further movement, hands back to a fresh streak cycle.
      clearStreakTimers();
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        lastPoint.current = null; // next streak starts fresh, no connecting line
        playStreak();
      }, RESUME_IDLE_AFTER);

      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;

      const prev = lastPoint.current;
      if (!prev) {
        lastPoint.current = { x, y };
        return;
      }
      const dx = x - prev.x;
      const dy = y - prev.y;
      if (Math.hypot(dx, dy) < STEP_GAP) return;
      stepGait(x, y, Math.atan2(dy, dx));
      lastPoint.current = { x, y };
    };

    window.addEventListener("mousemove", liveHandler);

    return () => {
      cancelled = true;
      clearStreakTimers();
      if (resumeTimer) clearTimeout(resumeTimer);
      window.removeEventListener("mousemove", liveHandler);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {prints.map((p) => (
        <PawPrint
          key={p.id}
          strokeWidth={1.5}
          className="print-fade absolute text-grape"
          style={
            {
              left: p.x,
              top: p.y,
              width: 18,
              height: 18,
              "--r": `${p.rot}deg`,
            } as React.CSSProperties
          }
          onAnimationEnd={() => setPrints((cur) => cur.filter((c) => c.id !== p.id))}
        />
      ))}
      <style>{`
        @keyframes print-fade {
          0%   { opacity: 0;    transform: translate(-50%, -50%) rotate(var(--r, 0deg)) scale(0.6); }
          18%  { opacity: 0.55; transform: translate(-50%, -50%) rotate(var(--r, 0deg)) scale(1); }
          100% { opacity: 0;    transform: translate(-50%, -50%) rotate(var(--r, 0deg)) scale(0.92) translateY(-8px); }
        }
        .print-fade {
          animation: print-fade 1.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
