import Hero from "@/components/Hero";
import Marquee from "@/components/ui/Marquee";
import ProductShowcase from "@/components/ProductShowcase";
import WhySection from "@/components/WhySection";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";

const TICKER = [
  "Free 48hr delivery",
  "Vet-approved formulas",
  "30-day returns",
  "12,000+ happy tails",
  "New drops monthly",
];

export default function Home() {
  return (
    <>
      <Hero />
      <div className="border-y border-white/10 bg-cream py-3 font-display text-sm font-semibold uppercase tracking-wide text-void">
        <Marquee items={TICKER} speed={24} />
      </div>
      <ProductShowcase />
      <WhySection />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
