import { cn } from "@/lib/utils";

export default function ClawDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 40"
      className={cn("w-full h-8 text-ink/15", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M4 4 C 40 30, 60 30, 80 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M110 6 C 146 32, 166 32, 186 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M216 4 C 252 30, 272 30, 292 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M320 6 C 350 28, 366 28, 396 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
