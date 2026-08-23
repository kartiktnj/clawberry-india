import Hero from "@/components/Hero";
import Marquee from "@/components/ui/Marquee";
import ProductShowcase from "@/components/ProductShowcase";
import WhySection from "@/components/WhySection";
import CtaBanner from "@/components/CtaBanner";

const TICKER = [
  "Free 48hr delivery",
  "Vet-approved formulas",
  "30-day returns",
  "New drops monthly",
];

export default function Home() {
  return (
    <>
      <Hero />
      <div className="border-y border-white/10 bg-grape py-3 font-display text-sm font-semibold uppercase tracking-wide text-cream">
        <Marquee items={TICKER} speed={24} />
      </div>
      <ProductShowcase />
      <WhySection />
      <CtaBanner />
    </>
  );
}
