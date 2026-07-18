"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import SectionLabel from "./ui/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (reduced || isMobile) return;

    const ctx = gsap.context(() => {
      const scrollDistance = () => track.scrollWidth - section.clientWidth;

      const tween = gsap.to(track, {
        x: () => -scrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-void py-24 md:h-screen md:py-0">
      <div className="md:absolute md:inset-0 md:flex md:flex-col md:justify-center">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
          <div className="mb-10 flex flex-col gap-4 md:mb-8">
            <SectionLabel>Fan favourites</SectionLabel>
            <h2 className="max-w-xl font-display text-4xl font-bold leading-[1.02] text-ink sm:text-5xl">
              Stuff pets actually fight over.
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto pb-4 md:overflow-visible">
          <div
            ref={trackRef}
            className="flex w-max gap-5 px-6 sm:px-8 md:w-max"
          >
            {products.map((product) => (
              <div key={product.slug} className="h-[420px] w-[280px] shrink-0 sm:w-[320px]">
                <ProductCard product={product} className="h-full" />
              </div>
            ))}
            <div className="flex h-[420px] w-[280px] shrink-0 flex-col items-start justify-center gap-4 sm:w-[320px]">
              <p className="font-display text-2xl font-semibold text-ink">
                That&apos;s not even half of it.
              </p>
              <a
                href="/shop"
                data-cursor="Shop"
                className="font-mono text-xs uppercase tracking-wide text-coral underline underline-offset-4"
              >
                See the full shop →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
