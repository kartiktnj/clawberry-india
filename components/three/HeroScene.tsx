"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BerryField = dynamic(() => import("./BerryField"), { ssr: false });

function shouldShowScene() {
  if (typeof window === "undefined") return false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const smallScreen = window.innerWidth < 640;
  return !reduced && !smallScreen;
}

export default function HeroScene() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(shouldShowScene()));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <BerryField />
    </div>
  );
}
