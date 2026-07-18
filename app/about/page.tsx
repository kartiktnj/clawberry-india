import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Timeline from "@/components/Timeline";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import CtaBanner from "@/components/CtaBanner";
import { values } from "@/lib/products";

export const metadata: Metadata = {
  title: "About",
  description:
    "Clawberry started with one very spoiled beagle. Here's how a kitchen-floor packing operation became a pet-parent favourite.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            Built by two humans who
            <br />
            got <span className="text-gradient-berry">out-negotiated</span> by a beagle.
          </>
        }
        description="Clawberry exists because our own dog rejected every 'premium' treat on the market — and we got curious about why."
      />

      <section className="bg-void pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-void-softer p-10 sm:p-14">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-grape/25 blur-3xl"
                aria-hidden
              />
              <Image
                src="/images/logo.png"
                alt="Clawberry mascot — pixel-art dog and cat peeking over the logo"
                width={480}
                height={384}
                className="relative w-full max-w-sm rounded-2xl border border-white/10"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <SectionLabel>The mascots</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                Meet the faces behind every box.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-ink-dim">
                Our pixel-art dog and cat aren&apos;t just a logo — they&apos;re modelled on the two
                opinions that shape every product decision at Clawberry. If the &ldquo;dog&rdquo; would
                destroy it in ten minutes and the &ldquo;cat&rdquo; would ignore it completely, it doesn&apos;t
                ship.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-4 text-ink-dim">
                It&apos;s a small detail, but it keeps us honest: we design for real pet behaviour,
                not for how a product photographs.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-void-soft py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <Reveal>
            <SectionLabel>How we got here</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
              From a spreadsheet to 12,000+ homes.
            </h2>
          </Reveal>
          <Timeline />
        </div>
      </section>

      <section className="bg-void py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <SectionLabel>What we stand for</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Four rules we don&apos;t bend on.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.08}
                className="rounded-3xl border border-white/10 bg-void-softer p-8"
              >
                <h3 className="font-display text-xl font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-ink-dim">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
