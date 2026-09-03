import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
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

function WhatsAppGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.29-.15-1.71-.84-1.98-.94-.27-.1-.46-.15-.66.15-.19.29-.75.94-.92 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.5-.17 0-.36-.02-.56-.02-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.02c.15.19 2.06 3.14 5 4.4.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.71-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.19-.56-.34Z" />
      <path d="M12.02 2C6.5 2 2 6.5 2 12.02c0 1.88.51 3.65 1.4 5.17L2 22l4.94-1.3a10 10 0 0 0 5.08 1.38h.01c5.52 0 10-4.5 10-10.06C22 6.5 17.53 2 12.02 2Zm0 18.2h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.93.77.78-2.85-.2-.29a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24" />
    </svg>
  );
}

const DETAILS = [
  {
    icon: Mail,
    label: "clawberryindia@gmail.com",
    href: "mailto:clawberryindia@gmail.com",
    cursorLabel: "Open",
  },
  {
    icon: WhatsAppGlyph,
    label: "+91 9810270909",
    href: "https://wa.me/919810270909",
    cursorLabel: "Chat",
    external: true,
  },
  { icon: MapPin, label: "Delhi, India" },
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
        description="Order issues, product questions, or just want to send a photo of your pet - this is the place."
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
                    data-cursor={d.cursorLabel}
                    {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-void-softer px-5 py-4 transition-colors hover:border-mint/40"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint-deep">
                      <d.icon size={16} />
                    </span>
                    <span className="text-ink">{d.label}</span>
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3} className="mt-8">
              <p className="text-sm text-ink-dim">
                Support hours: Monday–Saturday, 10am–7pm IST. We reply to every message -
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
