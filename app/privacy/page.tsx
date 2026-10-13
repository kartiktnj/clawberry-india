import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import { WHATSAPP_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What personal information Clawberry collects when you shop, contact us or join the newsletter, and how we use and protect it.",
};

const EMAIL = "clawberryindia@gmail.com";

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "What we collect",
    body: (
      <>
        <p>We only collect what you choose to give us:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong className="text-ink">Contact form:</strong> your name, email address and the
            message you write.
          </li>
          <li>
            <strong className="text-ink">Orders:</strong> your name, mobile number, email address,
            delivery address (city, state, pincode), any order notes, and what is in your cart.
          </li>
          <li>
            <strong className="text-ink">Newsletter:</strong> your email address.
          </li>
        </ul>
        <p className="mt-3">
          There are no customer accounts, and you don&apos;t pay on this website - card or UPI
          details are never collected here.
        </p>
      </>
    ),
  },
  {
    title: "How we use it",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>To reply to your messages and questions.</li>
        <li>To confirm, pack, deliver and support your order, and to share payment details with you.</li>
        <li>To send you news about new drops, if you joined the newsletter. You can stop any time.</li>
        <li>To keep basic business records of orders.</li>
      </ul>
    ),
  },
  {
    title: "How orders reach us",
    body: (
      <p>
        When you tap &ldquo;Order on WhatsApp&rdquo; at checkout, your order and delivery details
        are put into a WhatsApp message for you to send to us, so WhatsApp (Meta) handles that
        message under its own privacy policy. At the same moment we also receive an email alert
        with the same order details, so we can follow up even if the message isn&apos;t sent.
      </p>
    ),
  },
  {
    title: "Who we share it with",
    body: (
      <>
        <p>We don&apos;t sell your personal information. It only passes through the services that run the site:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong className="text-ink">Resend</strong> - sends the website&apos;s emails to us
            (contact messages, order alerts, newsletter sign-ups).
          </li>
          <li>
            <strong className="text-ink">Vercel</strong> - hosts the website.
          </li>
          <li>
            <strong className="text-ink">WhatsApp (Meta)</strong> - when you choose to order on
            WhatsApp.
          </li>
          <li>
            <strong className="text-ink">Delivery partners</strong> - your name, phone number and
            address, only so your parcel can reach you.
          </li>
        </ul>
        <p className="mt-3">
          We also keep a simple running order number so each order gets a unique reference. It
          contains no personal information.
        </p>
      </>
    ),
  },
  {
    title: "What is saved on your device",
    body: (
      <p>
        To make shopping easier, your browser remembers your cart, whether you applied the coupon,
        and the delivery details you typed at checkout. This stays on your own device and is not sent
        anywhere until you place an order. After you confirm an order the cart and saved details are
        cleared, and the &ldquo;Clear form&rdquo; button on checkout wipes them whenever you like.
        You can also clear them any time from your browser&apos;s site settings. We don&apos;t use
        advertising or tracking cookies.
      </p>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        We keep messages and order records for as long as we need them to help you, deliver your
        order and keep our business records. Newsletter addresses are kept until you ask us to remove
        them.
      </p>
    ),
  },
  {
    title: "Your choices",
    body: (
      <p>
        You can ask us to show you the information we hold about you, correct it, or delete it, and
        you can leave the newsletter at any time. Just email us and we&apos;ll sort it out.
      </p>
    ),
  },
  {
    title: "Changes to this policy",
    body: (
      <p>
        If we change how we handle your information we&apos;ll update this page and the date above.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy policy"
        title={
          <>
            Your details, <span className="text-gradient-berry">handled with care.</span>
          </>
        }
        description="Last updated 14 October 2026."
      />

      <section className="bg-void pb-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="flex flex-col gap-10">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i, 3) * 0.05}>
                <h2 className="font-display text-2xl font-semibold text-ink">{s.title}</h2>
                <div className="mt-3 leading-relaxed text-ink-dim">{s.body}</div>
              </Reveal>
            ))}

            <Reveal>
              <div className="rounded-3xl border border-ink/10 bg-void-softer p-6 shadow-sm sm:p-8">
                <h2 className="font-display text-2xl font-semibold text-ink">Contact us</h2>
                <p className="mt-3 leading-relaxed text-ink-dim">
                  Questions about your information? Email{" "}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-coral-deep underline underline-offset-4"
                  >
                    {EMAIL}
                  </a>{" "}
                  or message us on WhatsApp at {WHATSAPP_DISPLAY}.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
