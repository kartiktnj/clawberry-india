import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-void py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 50%, rgba(106,75,240,0.35), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
        <Reveal>
          <h2 className="font-display text-5xl font-bold leading-[0.98] text-ink sm:text-7xl">
            Ready to make
            <br />
            their <span className="text-gradient-berry">whole week?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="max-w-md text-ink-dim">
            Free delivery on your first order, 30-day returns, and a tail-wag guarantee.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <MagneticButton href="/shop" variant="solid" cursorLabel="Shop">
            Start shopping
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
