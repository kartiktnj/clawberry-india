export const SHIPPING_FEE = 99;
/** Orders at or above this subtotal ship free. */
export const FREE_SHIPPING_THRESHOLD = 1499;

export function shippingFor(subtotal: number) {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

/** How much more the customer needs to add to unlock free shipping (0 once unlocked). */
export function amountToFreeShipping(subtotal: number) {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
}
