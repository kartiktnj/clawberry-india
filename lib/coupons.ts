import { shippingFor } from "./shipping";

/** The one coupon we run for now. */
export const COUPON = {
  code: "CLAW5",
  percent: 5,
  /** Cart subtotal needed before the coupon works. */
  minSubtotal: 1499,
} as const;

export function normalizeCode(input: string) {
  return input.trim().toUpperCase().replace(/\s+/g, "");
}

export function isCouponCode(input: string) {
  return normalizeCode(input) === COUPON.code;
}

export function couponEligible(subtotal: number) {
  return subtotal >= COUPON.minSubtotal;
}

/** How much more the customer must add before the coupon unlocks (0 once eligible). */
export function amountToCoupon(subtotal: number) {
  return Math.max(0, COUPON.minSubtotal - subtotal);
}

/**
 * Subtotal, coupon, shipping and total in one place so the cart, checkout, WhatsApp message and
 * order email always agree. Shipping is judged on the subtotal before the coupon, so using the
 * coupon never pushes an order back under the free-shipping line.
 */
export function computeTotals(subtotal: number, couponApplied: boolean) {
  const discount =
    couponApplied && couponEligible(subtotal) ? Math.round((subtotal * COUPON.percent) / 100) : 0;
  const shipping = shippingFor(subtotal);
  return { subtotal, discount, shipping, total: subtotal - discount + shipping };
}
