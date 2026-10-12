import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Your cart",
  description: "Review the Clawberry toys and accessories in your cart.",
};

export default function CartPage() {
  return (
    <>
      <PageHero
        eyebrow="Your cart"
        title={
          <>
            Almost <span className="text-gradient-berry">theirs.</span>
          </>
        }
      />
      <section className="bg-void pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <CartView />
        </div>
      </section>
    </>
  );
}
