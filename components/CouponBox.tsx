"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { BadgePercent, Check, ChevronRight, X } from "lucide-react";
import { COUPON, amountToCoupon, couponEligible, isCouponCode } from "@/lib/coupons";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

/** True at the md breakpoint and up - where the drawer becomes a side panel instead of a sheet. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function CouponDrawer({
  open,
  onClose,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  /** Where focus goes when the drawer closes (the row that opened it). */
  returnFocusRef: React.RefObject<HTMLElement | null>;
}) {
  const { subtotal, couponApplied, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();

  const eligible = couponEligible(subtotal);
  const toUnlock = amountToCoupon(subtotal);

  // Lock page scroll while open, close on Escape, keep Tab inside the drawer, and hand focus
  // back to whatever opened it.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => panelRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnFocusRef.current?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  // Start fresh each time it opens.
  useEffect(() => {
    if (open) {
      setCode("");
      setError(null);
    }
  }, [open]);

  const applyAndClose = useCallback(() => {
    applyCoupon();
    setError(null);
    setCode("");
    // Let the "Applied" state register before the drawer slides away.
    window.setTimeout(onClose, 450);
  }, [applyCoupon, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Enter a coupon code.");
      return;
    }
    if (!isCouponCode(code)) {
      setError("That coupon code isn't valid.");
      return;
    }
    if (!eligible) {
      setError(`Add ₹${toUnlock} more to use ${COUPON.code}.`);
      return;
    }
    applyAndClose();
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) onClose();
  };

  // document.body only exists in the browser, so nothing is portalled during server rendering.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  if (!mounted) return null;

  const offscreen = isDesktop ? { x: "100%" } : { y: "100%" };
  const onscreen = isDesktop ? { x: 0 } : { y: 0 };

  return createPortal(
    <AnimatePresence>
      {open && (
        // data-lenis-prevent: the page's smooth-scroll library must not hijack wheel/touch here.
        <div className="fixed inset-0 z-[95]" data-lenis-prevent>
          <motion.div
            className="absolute inset-0 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="coupon-drawer-title"
            tabIndex={-1}
            initial={reduceMotion ? { opacity: 0 } : offscreen}
            animate={reduceMotion ? { opacity: 1 } : onscreen}
            exit={reduceMotion ? { opacity: 0 } : offscreen}
            transition={
              reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 40 }
            }
            drag={isDesktop || reduceMotion ? false : "y"}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={onDragEnd}
            className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col overflow-hidden rounded-t-[28px] border border-ink/10 bg-void shadow-2xl focus:outline-none md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[440px] md:rounded-l-[28px] md:rounded-tr-none"
          >
            {/* Drag handle (mobile): the only part that starts a drag, so the form stays usable. */}
            <div
              className="flex shrink-0 cursor-grab touch-none justify-center bg-void-soft pb-1 pt-3 md:hidden"
              onPointerDown={(e) => dragControls.start(e)}
              aria-hidden
            >
              <span className="h-1.5 w-10 rounded-full bg-ink/25" />
            </div>

            <div className="relative shrink-0 border-b border-ink/10 bg-void-soft px-6 pb-6 pt-5 md:pt-8">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close coupons"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-void-softer text-ink transition active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:top-6"
              >
                <X size={18} />
              </button>
              <h2
                id="coupon-drawer-title"
                className="pr-12 font-display text-3xl font-bold text-ink"
              >
                Save more
              </h2>
              <p className="mt-1 text-ink-dim">with coupons and offers</p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-6">
              <form onSubmit={submit} noValidate>
                <label htmlFor="coupon-code" className="sr-only">
                  Coupon code
                </label>
                <div
                  className={cn(
                    "flex items-center rounded-2xl border bg-void-softer px-4",
                    error
                      ? "border-coral-deep"
                      : "border-ink/12 focus-within:border-grape focus-within:ring-2 focus-within:ring-grape/25"
                  )}
                >
                  <input
                    id="coupon-code"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setError(null);
                    }}
                    placeholder="Enter coupon code"
                    autoCapitalize="characters"
                    autoComplete="off"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? "coupon-error" : undefined}
                    className="min-w-0 flex-1 bg-transparent py-4 text-base uppercase text-ink placeholder:normal-case placeholder:text-ink-dimmer outline-none focus-visible:outline-none!"
                  />
                  <button
                    type="submit"
                    disabled={!code.trim()}
                    className="py-4 pl-3 font-display text-sm font-semibold uppercase tracking-wide text-coral-deep transition disabled:text-ink-dimmer"
                  >
                    Apply
                  </button>
                </div>
                {error && (
                  <p id="coupon-error" role="alert" className="mt-2 text-sm text-coral-deep">
                    {error}
                  </p>
                )}
              </form>

              <h3 className="mt-8 font-display text-base font-semibold text-ink">Coupons</h3>

              <div
                className={cn(
                  "mt-3 rounded-2xl border border-dashed p-4 transition",
                  couponApplied && eligible
                    ? "border-mint-deep/50 bg-mint/10"
                    : eligible
                      ? "border-coral/60 bg-void-softer"
                      : "border-ink/20 bg-void-softer/60"
                )}
                aria-disabled={!eligible}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                      eligible ? "bg-coral/15 text-coral-deep" : "bg-ink/10 text-ink-dimmer"
                    )}
                  >
                    <BadgePercent size={20} />
                  </span>
                  <div className={cn("min-w-0 flex-1", !eligible && "opacity-60")}>
                    <p className="font-mono text-sm font-semibold tracking-wide text-ink">
                      {COUPON.code}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-dim">
                      {COUPON.percent}% off on orders of ₹{COUPON.minSubtotal} and above · applies
                      once per order
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  {!eligible ? (
                    <p className="text-sm text-ink-dim">
                      Add <span className="font-semibold text-ink">₹{toUnlock}</span> more to
                      unlock this coupon.
                    </p>
                  ) : couponApplied ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-mint-deep">
                        <Check size={15} strokeWidth={2.5} /> Applied
                      </span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="flex items-center gap-1 font-mono text-xs uppercase tracking-wide text-ink-dim underline underline-offset-4 hover:text-ink"
                      >
                        <X size={12} /> Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={applyAndClose}
                      className="rounded-full bg-coral px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-coral-light active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      Apply {COUPON.code}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/** "Coupons" row in the order summary - tapping it opens the coupon drawer. */
export default function CouponBox() {
  const { subtotal, couponApplied, discount } = useCart();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);

  const eligible = couponEligible(subtotal);
  const active = couponApplied && eligible;

  const subtitle = active
    ? `${COUPON.code} applied · you save ₹${discount}`
    : eligible
      ? "1 coupon available"
      : `Add ₹${amountToCoupon(subtotal)} more to unlock 1 coupon`;

  return (
    <div className="mt-6 border-t border-ink/10 pt-6">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={cn(
          "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
          active
            ? "border-mint-deep/40 bg-mint/10"
            : "border-ink/12 bg-void hover:border-ink/30"
        )}
      >
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            active
              ? "bg-mint-deep text-cream"
              : eligible
                ? "bg-coral/15 text-coral-deep"
                : "bg-ink/10 text-ink-dimmer"
          )}
        >
          {active ? <Check size={18} strokeWidth={2.5} /> : <BadgePercent size={18} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-base font-semibold text-ink">Coupons</span>
          <span className="block text-sm text-ink-dim">{subtitle}</span>
        </span>
        <ChevronRight size={18} className="shrink-0 text-ink-dim" aria-hidden />
      </button>

      <CouponDrawer open={open} onClose={close} returnFocusRef={triggerRef} />
    </div>
  );
}
