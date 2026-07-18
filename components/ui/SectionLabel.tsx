import { cn } from "@/lib/utils";

export default function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
      {children}
    </div>
  );
}
