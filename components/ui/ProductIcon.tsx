import { Bone, CircleDot, Cable, MousePointer2, BedDouble, Sparkles, LucideIcon } from "lucide-react";
import { Product } from "@/lib/products";

const ICON_MAP: Record<NonNullable<Product["icon"]>, LucideIcon> = {
  bone: Bone,
  ball: CircleDot,
  leash: Cable,
  mouse: MousePointer2,
  bed: BedDouble,
  yarn: Sparkles,
};

export default function ProductIcon({
  icon,
  className,
}: {
  icon: NonNullable<Product["icon"]>;
  className?: string;
}) {
  const Icon = ICON_MAP[icon];
  return <Icon className={className} strokeWidth={1.5} />;
}
