import { values, stats } from "@/lib/products";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";
import ClawDivider from "./ui/ClawDivider";

export default function WhySection() {
  return (
    <section className="relative bg-void-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionLabel>Why Clawberry</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            We test everything on pets who have zero chill.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className="bg-void-soft p-8">
              <h3 className="font-display text-lg font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{v.body}</p>
            </Reveal>
          ))}
        </div>

        <ClawDivider className="my-16" />

        <div className="grid max-w-md grid-cols-2 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center sm:text-left">
              <p className="font-display text-3xl font-bold text-ink sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-wide text-ink-dimmer">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
