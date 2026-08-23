import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";

export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-void pb-16 pt-40 sm:pt-48">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 15% 0%, rgba(44,90,160,0.2), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionLabel>{eyebrow}</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[0.98] text-ink sm:text-7xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-lg text-ink-dim">{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
