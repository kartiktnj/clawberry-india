import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about an order, a product, or a very good boy? Reach the Clawberry team here.",
};

const DETAILS = [
  { icon: Mail, label: "hello@clawberry.in", href: "mailto:hello@clawberry.in" },
  { icon: Phone, label: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: MapPin, label: "Bengaluru, India", href: "#" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Questions? We&apos;re
            <br />
            <span className="text-gradient-berry">all ears</span> (and paws).
          </>
        }
        description="Order issues, product questions, or just want to send a photo of your pet — this is the place."
      />

      <section className="bg-void pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <SectionLabel>Direct lines</SectionLabel>
            </Reveal>
            <div className="mt-6 flex flex-col gap-4">
              {DETAILS.map((d, i) => (
                <Reveal key={d.label} delay={i * 0.06}>
                  <a
                    href={d.href}
                    data-cursor="Open"
                    className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-void-softer px-5 py-4 transition-colors hover:border-mint/40"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint">
                      <d.icon size={16} />
                    </span>
                    <span className="text-ink">{d.label}</span>
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3} className="mt-8">
              <p className="text-sm text-ink-dim">
                Support hours: Monday–Saturday, 10am–7pm IST. We reply to every message —
                promise.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="rounded-3xl border border-ink/10 bg-void-softer p-6 sm:p-10 shadow-sm">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="bg-void-soft py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <Reveal>
            <SectionLabel>FAQs</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Quick answers.
            </h2>
          </Reveal>
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </>
  );
}
