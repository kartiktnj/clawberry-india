import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    quote:
      "My golden retriever destroyed every 'indestructible' toy we tried — until the Power Chew Bone. Still standing after four months.",
    name: "Aditi R.",
    pet: "Parent to Bruno, Golden Retriever",
  },
  {
    quote:
      "The Cloud Nine Bed is the first bed my cat hasn't tried to shred within a week. That's basically a five-star review from her.",
    name: "Karan M.",
    pet: "Parent to Miso, Indian shorthair",
  },
  {
    quote:
      "Delivery was fast, packaging was adorable, and the treats disappeared before I could take a photo for Instagram.",
    name: "Sneha P.",
    pet: "Parent to Ladoo, Indie dog",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-void py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionLabel>Word on the street (and dog park)</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            12,000+ pet parents can&apos;t be wrong.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal
              key={r.name}
              delay={i * 0.1}
              className="flex flex-col justify-between rounded-3xl border border-ink/10 bg-void-softer p-8 shadow-sm"
            >
              <div>
                <div className="flex gap-1 text-coral">
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
