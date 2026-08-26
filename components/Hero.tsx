"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import PawField from "./PawField";
import CursorTrail from "./CursorTrail";
import MagneticButton from "./ui/MagneticButton";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const scope = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Nothing in this JSX starts hidden - skipping the tweens entirely
    // just leaves every element in its natural, already-visible state.
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(
          words,
          { yPercent: 120, rotate: 4 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.1,
            stagger: 0.08,
            ease: "power4.out",
            delay: 0.25,
          }
        );
      }
      gsap.fromTo(
        ".hero-fade",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 1, delay: 0.9, stagger: 0.12, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-mascot",
        { autoAlpha: 0, scale: 0.85, rotate: -6 },
        { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.2, delay: 0.5, ease: "back.out(1.4)" }
      );
    }, scope);
    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const words = ["Spoil", "your", "pet.", "Not", "your", "wallet."];

  return (
    <section
      ref={scope}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-void pb-16 pt-32 sm:pt-36"
    >
      <PawField />
      <CursorTrail />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 sm:px-8">
        <div className="flex items-start justify-between gap-6">
          <h1
            ref={headlineRef}
            className="max-w-4xl font-display text-[13vw] font-bold leading-[0.92] tracking-tight text-ink sm:text-[8.5vw] lg:text-[6.4vw]"
          >
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 pr-[0.18em] align-top">
                <span
                  className={`word inline-block ${
                    i === 2 || i === 5 ? "text-gradient-berry" : ""
                  }`}
                >
                  {w}
                </span>
              </span>
            ))}
          </h1>

          <div className="hero-mascot hidden shrink-0 lg:block">
            <Image
              src="/images/hero-mascot.gif"
              alt="Clawberry mascot - pixel-art dog and cat high-fiving"
              width={717}
              height={435}
              unoptimized
              className="w-[26vw] max-w-[420px]"
            />
          </div>
        </div>

        <div className="hero-fade flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-base text-ink-dim sm:text-lg">
            Clawberry is treats, toys and gear built around one obsession: pets who use
            everything to the point of destruction - and love it.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href="/shop" variant="solid" cursorLabel="Shop">
              Shop the drop
            </MagneticButton>
            <MagneticButton href="/about" variant="outline" cursorLabel="Story">
              Our story
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-dimmer sm:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown size={14} className="animate-drift" />
      </div>
    </section>
  );
}
