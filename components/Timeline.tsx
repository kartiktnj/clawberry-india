import { timeline } from "@/lib/products";
import Reveal from "./ui/Reveal";

export default function Timeline() {
  return (
    <div className="relative mt-4">
      <div
        className="absolute left-[7px] top-2 bottom-2 w-px bg-ink/15 sm:left-[11px]"
        aria-hidden
      />
      <div className="flex flex-col gap-12">
        {timeline.map((item, i) => (
          <Reveal key={item.year} delay={i * 0.08} className="relative flex gap-6 pl-8 sm:gap-10 sm:pl-14">
            <span
              className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-coral sm:h-6 sm:w-6"
              aria-hidden
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            </span>
            <div>
              <span className="font-mono text-xs uppercase tracking-wide text-mint-deep">
                {item.year}
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-2 max-w-xl text-ink-dim">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
