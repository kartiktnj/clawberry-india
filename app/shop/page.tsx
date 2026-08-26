import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ShopGrid from "@/components/ShopGrid";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse Clawberry's full range of dog and cat essentials - treats, toys, beds and gear built for pets with zero chill.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="The full lineup"
        title={
          <>
            Everything they&apos;ll <span className="text-gradient-berry">claim as theirs.</span>
          </>
        }
        description="Every product here has survived our panel of certified good boys and unreasonable cats. Filter by who it's for."
      />
      <section className="bg-void pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <p className="mb-10 font-mono text-xs uppercase tracking-[0.18em] text-ink-dimmer">
            Picked for paws. Approved by tail wags. Purr-tested, parent-approved.
          </p>
          <ShopGrid />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
