"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-ink/10 bg-void-soft/85 px-5 py-2 shadow-lg shadow-ink/10 backdrop-blur-xl sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          data-cursor="Home"
          aria-label="Clawberry home"
        >
          <Image
            src="/images/logo-icon.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
            priority
          />
          <Image
            src="/images/wordmark.png"
            alt=""
            width={4096}
            height={1147}
            className="h-5 w-auto sm:h-6"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor={link.label}
              className={cn(
                "relative rounded-full px-4 py-2 font-mono text-[13px] uppercase tracking-wide transition active:scale-95",
                pathname === link.href
                  ? "text-ink bg-cream"
                  : "text-ink-dim hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/shop"
            data-cursor="Shop"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-coral-light active:scale-95"
          >
            Shop now
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition active:scale-90 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 mt-3 rounded-3xl border border-ink/10 bg-void-soft/95 p-6 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 font-display text-2xl font-semibold transition active:bg-ink/5",
                      pathname === link.href ? "text-coral-deep" : "text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link
              href="/shop"
              className="mt-4 flex items-center justify-center rounded-full bg-coral px-5 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-ink transition active:scale-95"
            >
              Shop now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
