import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
  metadataBase: new URL("https://clawberry.in"),
  title: {
    default: "Clawberry — Premium supplies for dogs & cats",
    template: "%s · Clawberry",
  },
  description:
    "Clawberry makes playful, premium pet supplies — treats, toys, beds and gear tested by real dogs and unreasonable cats. Free 48hr delivery across India.",
  keywords: ["pet supplies", "dog toys", "cat toys", "pet treats India", "Clawberry"],
  openGraph: {
    title: "Clawberry — Premium supplies for dogs & cats",
    description:
      "Playful, premium pet supplies tested by real dogs and unreasonable cats.",
    url: "https://clawberry.in",
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
          <SmoothScroll>
            <div className="grain" />
            <CustomCursor />
            <Nav />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}
