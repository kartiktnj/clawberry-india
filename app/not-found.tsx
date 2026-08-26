import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center bg-void px-6 py-32 text-center sm:px-8">
      <SectionLabel>404</SectionLabel>
      <h1 className="mt-6 max-w-xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
        Looks like you took a wrong sniff.
      </h1>
      <p className="mt-4 max-w-sm text-ink-dim">This page seems to have run away.</p>
      <div className="mt-8">
        <MagneticButton href="/" variant="solid" cursorLabel="Home">
          Take me home
        </MagneticButton>
      </div>
    </section>
  );
}
