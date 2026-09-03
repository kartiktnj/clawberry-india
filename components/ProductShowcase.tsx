"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import SectionLabel from "./ui/SectionLabel";
import { cn } from "@/lib/utils";

export default function ProductShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Scroll-snap rests the first card's start edge at the track's own
    // inline padding (not 0), so the "start" tolerance has to clear that.
    const updateEdges = () => {
      const startSlack = parseFloat(getComputedStyle(track).paddingLeft) + 8;
      setCanScrollLeft(track.scrollLeft > startSlack);
      setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
    };

    updateEdges();
    track.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      track.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  // Lets desktop mouse users (no trackpad/touch) drag the track horizontally,
  // matching the affordance touch and trackpad users already get for free.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Matches the pl-5/scroll-pl-5 lead-in, so a snapped card's true resting
    // scrollLeft can be computed from its own offsetLeft.
    const SNAP_INSET = 20;
    // How far ahead (in ms of travel at release velocity) to project the
    // landing spot - this is what turns a flick into "glide to the next
    // card" instead of snapping straight back to the one you started on.
    const FLICK_PROJECTION_MS = 130;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;
    let pendingDx = 0;
    let rafId: number | null = null;
    let lastSample = { scrollLeft: 0, time: 0 };
    let velocity = 0; // px of scrollLeft per ms

    // Batches the scrollLeft write to once per frame instead of once per
    // pointermove (which can fire far faster than the screen refreshes) -
    // that mismatch is what reads as "jagged" rather than a smooth drag.
    const applyScroll = () => {
      const next = startScroll - pendingDx;
      track.scrollLeft = next;
      rafId = null;

      const now = performance.now();
      const dt = now - lastSample.time;
      if (dt > 0) velocity = (next - lastSample.scrollLeft) / dt;
      lastSample = { scrollLeft: next, time: now };
    };

    const nearestSnapLeft = (target: number) => {
      const children = Array.from(track.children) as HTMLElement[];
      let closest = 0;
      let minDist = Infinity;
      for (const child of children) {
        const left = Math.max(0, child.offsetLeft - SNAP_INSET);
        const dist = Math.abs(left - target);
        if (dist < minDist) {
          minDist = dist;
          closest = left;
        }
      }
      return closest;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      isDown = true;
      moved = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      lastSample = { scrollLeft: track.scrollLeft, time: performance.now() };
      velocity = 0;
      // A stale/invalid pointer id throws here in rare edge cases - that
      // must never skip suspending snap and selection below.
      try {
        track.setPointerCapture(e.pointerId);
      } catch {
        // no-op
      }
      // Snap fights a live drag if left active, and native text/image
      // selection turns the gesture into a selection instead of a scroll -
      // both are suspended for the duration of the drag only.
      track.style.scrollSnapType = "none";
      track.classList.add("select-none", "cursor-grabbing");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      pendingDx = dx;
      if (rafId === null) rafId = requestAnimationFrame(applyScroll);
    };
    const endDrag = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      try {
        track.releasePointerCapture(e.pointerId);
      } catch {
        // no-op
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
        applyScroll(); // flush the last pending frame so velocity/target reflect it
      }

      // Project the release velocity forward, then glide to whichever card
      // is nearest that projected point - a soft flick lands on the next
      // card instead of snapping straight back to the one you grabbed.
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const projected = track.scrollLeft + velocity * FLICK_PROJECTION_MS;
      const target = nearestSnapLeft(Math.max(0, projected));
      track.style.scrollSnapType = "";
      track.classList.remove("select-none", "cursor-grabbing");
      track.scrollTo({ left: target, behavior: reduced ? "auto" : "smooth" });
    };
    // Suppress the trailing click after a real drag so links/buttons under
    // the cursor don't fire on release.
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    // Stops the browser's native image drag-ghost from hijacking the
    // gesture when the pointer moves over a product photo mid-drag.
    const onDragStart = (e: DragEvent) => e.preventDefault();

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("click", onClickCapture, true);
    track.addEventListener("dragstart", onDragStart);
    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
      track.removeEventListener("click", onClickCapture, true);
      track.removeEventListener("dragstart", onDragStart);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * Math.round(track.clientWidth * 0.85),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-void py-24">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4">
            <SectionLabel>Fan favourites</SectionLabel>
            <h2 className="max-w-xl font-display text-4xl font-bold leading-[1.02] text-ink sm:text-5xl">
              Stuff pets actually fight over.
            </h2>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll to previous products"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition active:scale-90 disabled:opacity-30 disabled:active:scale-100 enabled:hover:border-coral enabled:hover:text-coral-deep"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              disabled={!canScrollRight}
              aria-label="Scroll to more products"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition active:scale-90 disabled:opacity-30 disabled:active:scale-100 enabled:hover:border-coral enabled:hover:text-coral-deep"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className={cn(
          // scroll-pl matches pl so the snap algorithm treats the leading
          // padding as part of the "resting" position - without it, Chrome
          // snaps the first card's edge flush to the container, erasing the
          // padding the moment the track settles.
          "no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pl-5 scroll-pl-5 pr-6 pb-4 sm:pr-8",
          "cursor-grab"
        )}
      >
        {products.map((product) => (
          <div
            key={product.slug}
            className="w-[280px] shrink-0 snap-start sm:w-[320px]"
          >
            <ProductCard product={product} className="h-full" />
          </div>
        ))}
        <div className="flex w-[280px] shrink-0 snap-start flex-col items-start justify-center gap-4 sm:w-[320px]">
          <p className="font-display text-2xl font-semibold text-ink">
            That&apos;s not even half of it.
          </p>
          <a
            href="/shop"
            data-cursor="Shop"
            className="font-mono text-xs uppercase tracking-wide text-coral-deep underline underline-offset-4"
          >
            See the full shop →
          </a>
        </div>
      </div>
    </section>
  );
}
