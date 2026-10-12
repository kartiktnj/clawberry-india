import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CheckoutView from "@/components/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Share your delivery details and send your Clawberry order on WhatsApp.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title={
          <>
            Where should we <span className="text-gradient-berry">send it?</span>
          </>
        }
      />
      <section className="bg-void pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <CheckoutView />
        </div>
      </section>
    </>
  );
}
