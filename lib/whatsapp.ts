import { WHATSAPP_NUMBER } from "./contact";
import { CartItem, describeVariant } from "./cart";
import { COUPON, computeTotals } from "./coupons";

export type OrderDetails = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
};

/** The pre-filled message the customer sends us: items, delivery details and the amount to pay. */
export function buildOrderMessage(
  items: CartItem[],
  details: OrderDetails,
  subtotal: number,
  ref: string,
  couponApplied = false
) {
  const { discount, shipping, total } = computeTotals(subtotal, couponApplied);
  const lines = items.map((item, i) => {
    const variant = describeVariant(item);
    const label = variant ? `${item.name} (${variant})` : item.name;
    return `${i + 1}. ${label} x ${item.qty} = ₹${item.unitPrice * item.qty}`;
  });

  const parts = [
    "Hi Clawberry! I'd like to place an order from your website.",
    "",
    `*Order ref:* ${ref}`,
    "",
    "*Items*",
    ...lines,
    "",
    `Subtotal: ₹${subtotal}`,
    ...(discount > 0 ? [`Coupon ${COUPON.code} (${COUPON.percent}% off): -₹${discount}`] : []),
    `Shipping: ${shipping === 0 ? "Free" : `₹${shipping}`}`,
    `*Total to pay: ₹${total}*`,
    "",
    "*Delivery details*",
    `Name: ${details.name.trim()}`,
    `Phone: ${details.phone.trim()}`,
    `Email: ${details.email.trim()}`,
    `Address: ${details.address.trim()}`,
    `City: ${details.city.trim()}`,
    `State: ${details.state.trim()}`,
    `Pincode: ${details.pincode.trim()}`,
  ];
  if (details.notes.trim()) parts.push(`Notes: ${details.notes.trim()}`);
  parts.push("", "Please confirm my order and share the payment details. Thank you!");

  return parts.join("\n");
}

export function whatsappOrderUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
