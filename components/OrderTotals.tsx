import { COUPON } from "@/lib/coupons";
import { amountToFreeShipping } from "@/lib/shipping";
import { cn } from "@/lib/utils";

/** Subtotal / savings / shipping / total rows shared by the cart and checkout summaries. */
export default function OrderTotals({
  subtotal,
  savings,
  discount,
  shipping,
  total,
  className,
}: {
  subtotal: number;
  savings: number;
  discount: number;
  shipping: number;
  total: number;
  className?: string;
}) {
  const toFree = amountToFreeShipping(subtotal);

  return (
    <div className={className}>
      <dl className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-ink-dim">Subtotal</dt>
          <dd className="font-medium text-ink">₹{subtotal}</dd>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <dt className="text-ink-dim">Coupon ({COUPON.code})</dt>
            <dd className="font-medium text-mint-deep">-₹{discount}</dd>
          </div>
        )}
        <div className="flex items-center justify-between">
          <dt className="text-ink-dim">Shipping</dt>
          <dd className={cn("font-medium", shipping === 0 ? "text-mint-deep" : "text-ink")}>
            {shipping === 0 ? "Free" : `₹${shipping}`}
          </dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-ink/10 pt-4">
          <dt className="font-display text-base font-semibold text-ink">Total</dt>
          <dd className="font-display text-2xl font-bold text-ink">₹{total}</dd>
        </div>
      </dl>
      {toFree > 0 && (
        <p className="mt-4 rounded-2xl bg-coral/15 px-4 py-3 text-xs text-coral-deep">
          Add <span className="font-semibold">₹{toFree}</span> more to get free shipping.
        </p>
      )}
    </div>
  );
}
