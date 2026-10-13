import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import { SITE_URL } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Clawberry India",
    template: "%s · Clawberry",
  },
  description:
    `Made by pet parents, made for every pet. Clawberry makes thoughtful pet toys and accessories tested by real dogs and unreasonable cats. Delivery across India, free shipping on orders of ₹${FREE_SHIPPING_THRESHOLD} and above.`,
  keywords: ["pet collars", "dog toys", "cat toys", "pet toys India", "Clawberry"],
  openGraph: {
    title: "Clawberry",
    description:
      "Made by pet parents, made for every pet - thoughtful pet supplies tested by real dogs and unreasonable cats.",
    url: SITE_URL,
    siteName: "Clawberry",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased" id="top">
        <MotionConfig reducedMotion="user">
          <CartProvider>
            <SmoothScroll>
              <div className="grain" />
              <CustomCursor />
              <Nav />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
          </CartProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
