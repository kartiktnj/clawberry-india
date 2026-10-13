import Hero from "@/components/Hero";
import Marquee from "@/components/ui/Marquee";
import ProductShowcase from "@/components/ProductShowcase";
import WhySection from "@/components/WhySection";
import CtaBanner from "@/components/CtaBanner";
import { COUPON } from "@/lib/coupons";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";

const TICKER = [
  `Free Shipping above ₹${FREE_SHIPPING_THRESHOLD}`,
  `Code ${COUPON.code}: ${COUPON.percent}% off on orders of ₹${COUPON.minSubtotal} and above`,
  `Free Shipping above ₹${FREE_SHIPPING_THRESHOLD}`,
  "Made in India",
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
