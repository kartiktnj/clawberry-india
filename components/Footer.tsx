"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

function InstagramGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function YoutubeGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-void-soft">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h3 className="font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
              Give their tail
              <br />
              something to <span className="text-gradient-berry">wag</span> about.
            </h3>
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-full border border-white/15 bg-void px-5 py-3.5 text-sm text-ink placeholder:text-ink-dimmer focus:border-mint focus:outline-none"
              />
              <MagneticButton type="submit" variant="solid" cursorLabel="Join">
                {submitted ? "You're in ✦" : "Get 10% off"}
              </MagneticButton>
            </form>
            <p className="mt-3 font-mono text-xs text-ink-dimmer">
              First-order discount + early access to new drops. No spam, just paws.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-ink-dimmer">
                Explore
              </p>
              <ul className="mt-4 space-y-3 font-display text-base">
                <li><Link href="/" className="text-ink-dim hover:text-ink">Home</Link></li>
                <li><Link href="/shop" className="text-ink-dim hover:text-ink">Shop</Link></li>
                <li><Link href="/about" className="text-ink-dim hover:text-ink">About</Link></li>
                <li><Link href="/contact" className="text-ink-dim hover:text-ink">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-ink-dimmer">
                Support
              </p>
              <ul className="mt-4 space-y-3 font-display text-base">
                <li><Link href="/contact" className="text-ink-dim hover:text-ink">FAQs</Link></li>
                <li><Link href="/contact" className="text-ink-dim hover:text-ink">Shipping</Link></li>
                <li><Link href="/contact" className="text-ink-dim hover:text-ink">Returns</Link></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-xs uppercase tracking-wide text-ink-dimmer">
                Follow
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#" className="flex items-center gap-2 text-ink-dim hover:text-ink">
                    <InstagramGlyph /> Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-ink-dim hover:text-ink">
                    <FacebookGlyph /> Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-ink-dim hover:text-ink">
                    <YoutubeGlyph /> YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/logo-icon.png"
              alt="Clawberry"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="font-display text-sm font-semibold text-ink-dim">
              © {new Date().getFullYear()} Clawberry. Made for tails &amp; whiskers.
            </span>
          </div>
          <a
            href="#top"
            data-cursor="Top"
            className="flex items-center gap-1 font-mono text-xs uppercase tracking-wide text-ink-dimmer hover:text-mint"
          >
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
