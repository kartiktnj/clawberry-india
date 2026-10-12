/** First order number handed out; orders run 501, 502, 503, … */
export const FIRST_ORDER_NUMBER = 501;

/** Today's date in India as DDMMYY, e.g. 12 Oct 2026 -> "121026". */
export function istDateCode(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("day")}${get("month")}${get("year")}`;
}

export function formatOrderRef(orderNumber: number, date = new Date()) {
  return `${istDateCode(date)}-${orderNumber}`;
}

/**
 * Used only when the order counter can't be reached, so the customer can still order. The "T"
 * (temporary) marks it as out of sequence, e.g. "121026-T5XK2".
 */
export function fallbackOrderRef(date = new Date()) {
  return `${istDateCode(date)}-T${Date.now().toString(36).toUpperCase().slice(-4)}`;
}
