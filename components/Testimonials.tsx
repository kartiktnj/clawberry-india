import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";
import { Star } from "lucide-react";

export type Review = {
  quote: string;
  name: string;
  pet: string;
};

/**
 * Not wired up on any page yet - there's no real review to show pre-launch.
 * Pass real `reviews` once orders start shipping; this file intentionally
 * ships no placeholder data so it can't be mistaken for the real thing.
 */
export default function Testimonials({
  heading,
  reviews,
}: {
  heading: string;
  reviews: Review[];
}) {
  if (reviews.length === 0) return null;

  return (
    <section className="relative bg-void py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionLabel>Word on the street (and dog park)</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            {heading}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal
              key={r.name}
              delay={i * 0.1}
              className="flex flex-col justify-between rounded-3xl border border-ink/10 bg-void-softer p-8 shadow-sm"
            >
              <div>
                <div className="flex gap-1 text-coral-deep">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-5 font-display text-lg leading-snug text-ink">
                  “{r.quote}”
                </p>
              </div>
              <div className="mt-8">
                <p className="font-semibold text-ink">{r.name}</p>
                <p className="font-mono text-xs text-ink-dimmer">{r.pet}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
