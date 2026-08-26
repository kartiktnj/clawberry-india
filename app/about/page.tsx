import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import CtaBanner from "@/components/CtaBanner";
import { whyClawberry, founders, brandPromises } from "@/lib/products";

export const metadata: Metadata = {
  title: "About",
  description:
    "Clawberry started with three school friends, eleven foster dogs, and one question: why should pet parents pay a premium just to give their pets something better?",
};

const FOUNDER_COLORS: Record<string, string> = {
  grape: "bg-grape/15 text-grape",
  coral: "bg-coral/15 text-coral-deep",
  mint: "bg-mint/15 text-mint-deep",
};
const FOUNDER_COLOR_KEYS = ["grape", "coral", "mint"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            Built by three humans who were 
            {/* <br /> */}
            <span className="text-gradient-berry"> out-numbered</span> by 11 dogs,
            and still thought starting a pet brand was a good idea.
          </>
        }
        // description="And family deserves good things - without the premium price tag."
      />

      <section className="bg-void-soft py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <SectionLabel>How it started</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
                It all started with 11 dogs.
              </h2>
            </Reveal>

            <div className="mt-8 flex flex-col gap-5 text-ink-dim">
              <Reveal delay={0.15}>
                <p>
                  Not a business plan. Not a market opportunity. Not a boardroom
                  presentation. Just three school friends, a lot of love, and 11 dogs we
                  fostered together.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  We&apos;re Devansh, Sandeep and Kartik - three friends who&apos;d known each
                  other since school and shared something that always brought us
                  together: a love for animals. Somewhere between the feeding schedules,
                  vet visits, zoomies, chewed-up things and late-night cuddles, we noticed
                  something. Being a good pet parent could get unnecessarily expensive.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p>
                  We saw pet parents having to choose between products that were
                  affordable and products that were actually good. We saw products that
                  looked great but didn&apos;t always feel thoughtfully made for pets.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <blockquote className="border-l-2 border-coral py-1 pl-6 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                  Why should pet parents have to pay a premium just to give their pets
                  something better?
                </blockquote>
              </Reveal>
              <Reveal delay={0.35}>
                <p>
                  So we decided to build it ourselves. That&apos;s how Clawberry was born - a
                  brand built by pet parents who know pets aren&apos;t &ldquo;just pets.&rdquo;
                  They&apos;re family. They deserve comfort, joy and products made with
                  thought, without quality always coming with an outrageous price tag.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p>
                  Good products. Fair prices. Happier pets. Because the best care
                  shouldn&apos;t be a luxury.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-void py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <SectionLabel>Who&apos;s behind it</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Three school friends. One big dream.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {founders.map((f, i) => {
              const colorKey = FOUNDER_COLOR_KEYS[i % FOUNDER_COLOR_KEYS.length];
              return (
                <Reveal
                  key={f.name}
                  delay={0.2 + i * 0.08}
                  className="rounded-3xl border border-ink/10 bg-void-softer p-8 shadow-sm"
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full font-display text-lg font-bold ${FOUNDER_COLORS[colorKey]}`}
                    aria-hidden
                  >
                    {f.name.charAt(0)}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                    {f.name}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-dimmer">
                    {f.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-dim">{f.body}</p>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-12 max-w-2xl text-ink-dim">
              We&apos;ve been friends since school. Years later, 11 foster dogs gave us
              the story that brought us here. Clawberry wasn&apos;t created because we
              wanted to enter the pet industry - it was created because animals had
              already become such a big part of our lives.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-void-soft py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] border border-ink/10 bg-void-softer p-10 sm:p-14">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-grape/25 blur-3xl"
                aria-hidden
              />
              <Image
                src="/images/logo.png"
                alt="Clawberry mascot - pixel-art dog and cat peeking over the logo"
                width={480}
                height={384}
                className="relative w-full max-w-sm rounded-2xl border border-ink/10"
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
                Our pixel-art dog and cat aren&apos;t just a logo - they&apos;re modelled on the two
                opinions that shape every product decision at Clawberry. If the &ldquo;dog&rdquo; would
                destroy it in ten minutes and the &ldquo;cat&rdquo; would ignore it completely, it doesn&apos;t
                ship.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-void py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <SectionLabel>Why Clawberry</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Good pet products shouldn&apos;t be a luxury.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {whyClawberry.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.08}
                className="rounded-3xl border border-ink/10 bg-void-softer p-8 shadow-sm"
              >
                <h3 className="font-display text-xl font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-ink-dim">{v.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-3">
              {brandPromises.map((promise) => (
                <span
                  key={promise}
                  className="whitespace-nowrap rounded-full border border-ink/15 bg-void-soft px-5 py-2 font-mono text-xs uppercase tracking-wide text-ink-dim"
                >
                  {promise}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-void-soft py-24 text-center sm:py-32">
        <div className="mx-auto max-w-2xl px-6 sm:px-8">
          <Reveal>
            <p className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              For every nap. Every zoomie. Every purr. Every wag. And every moment that
              makes them family.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-coral-deep">
              Clawberry - Made for the ones who own our hearts.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
