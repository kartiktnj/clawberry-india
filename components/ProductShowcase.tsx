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

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      isDown = true;
      moved = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = startScroll - dx;
    };
    const onPointerUp = (e: PointerEvent) => {
      isDown = false;
      track.releasePointerCapture(e.pointerId);
    };
    // Suppress the trailing click after a real drag so links/buttons under
    // the cursor don't fire on release.
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("click", onClickCapture, true);
    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("click", onClickCapture, true);
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
          "cursor-grab active:cursor-grabbing"
        )}
      >
        {products.map((product) => (
          <div
            key={product.slug}
            className="h-[420px] w-[280px] shrink-0 snap-start sm:w-[320px]"
          >
            <ProductCard product={product} className="h-full" />
          </div>
        ))}
        <div className="flex h-[420px] w-[280px] shrink-0 snap-start flex-col items-start justify-center gap-4 sm:w-[320px]">
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
