# Changelog

Day-by-day record of changes to the Clawberry website. Newest entries at the top.

## 2026-10-14

### Launch prep (SEO & site settings)
- **Fixed** — Site icon (favicon): the old 504×504 icon wasn't a multiple of 48px, so Google could ignore it and show its generic house icon next to the site in search results. The icon is now generated at 192×192 (`app/icon.tsx`) plus a 180×180 Apple home-screen icon (`app/apple-icon.tsx`) from the same artwork (moved to `public/images/favicon-source.png`). Google still needs a little time to pick it up after the next deploy.
- **Added** — Social-sharing image: a 1200×630 card with the Clawberry wordmark on the brand cream and an orange base stripe, generated at build time (`app/opengraph-image.tsx`, `app/twitter-image.tsx`, shared in `lib/ogImage.tsx`). Every page now carries the `og:image` / `twitter:image` tags (large-image card), so links shared on WhatsApp, Instagram, X, Facebook and in Google previews show the logo instead of a blank or random picture.
- **Changed** — Removed the remaining "48hr / 48–72 hours / next-day" delivery claims: the homepage stat tile is now "₹1499+ · Free shipping across India" and the contact-page delivery FAQ now says "We deliver across India. Shipping is free on orders of ₹1499 and above, and ₹99 below that." Both read from the shipping settings in `lib/shipping.ts`.
- **Fixed** — The footer newsletter box now actually works: signing up emails the address to the team inbox (`/api/subscribe`, subject "Newsletter signup - …", so it can be filtered in Gmail) and the box shows sending / success / error states. Before, it only pretended to save the address. There is no mailing-list tool yet, so addresses are collected from that inbox.
- **Changed** — Removed the "10% off on first order" ticker line and the "First-order discount" footer promise, since no such offer existed. The ticker now promotes the real coupon ("Code CLAW5: 5% off on orders of ₹1499 and above").
- **Added** — `/privacy` page (what is collected, how it's used, who it passes through - Resend, Vercel, WhatsApp, delivery partners - what is saved on the device, retention and the visitor's choices), linked from the footer and the checkout form, and listed in the sitemap.
- **Changed** — The site address now lives in one place (`lib/site.ts`, `https://clawberryindia.com`) and feeds the page links/previews, the sitemap and the robots file, so a domain change is a one-line edit.
- **Fixed** — The site description shown on Google and in link previews no longer says "Free 48hr delivery across India" (which contradicted the ₹99 shipping fee); it now says delivery across India with free shipping on orders of ₹1499 and above, driven by the same shipping setting as the cart.
- **Added** — `/cart`, `/checkout` and `/api/` are now blocked in `robots.txt`, and the cart and checkout pages carry a "noindex" tag, since they are personal per-visitor pages that shouldn't appear in search results.

## 2026-10-13

### Shop & catalogue
- **Changed** — The in-cart quantity control on product cards is now a soft tonal style (light coral tint, thin coral outline, dark-orange − / +, navy count) instead of a solid coral pill, so it reads as a quiet "already in your cart" state.
- **Changed** — The "Add" button on product cards is now a soft peach-filled button with a navy label and bag icon (deepening on hover) instead of a solid saturated coral fill, so it is clear but no longer the loudest thing on the card.

## 2026-10-12

### Cart & checkout (interim, until the full D2C backend is live)
- **Added** — Cart: the product card's arrow button is now an "Add" button (turns to "Added ✓" for a moment). It adds the product with the size and colour currently selected, at the price shown; the same product in a different size/colour is a separate line, and adding it again increases the quantity. The cart is remembered in the browser between visits.
- **Changed** — On the Shop page, a product card's "Add" button turns into a − / quantity / + control once that item is in the cart. It tracks the selected size and colour (a different size shows "Add" again), tapping − at 1 removes the item and brings "Add" back, and + stops at 20. Keyboard focus moves to the replacement button so it isn't lost.
- **Fixed** — The cart no longer looks empty when the site is opened in a background tab (saved items are now loaded with a timer instead of waiting for an animation frame).
- **Changed** — Adding to cart is only on the Shop page; the homepage carousel keeps the arrow button, which leads to the Shop.
- **Added** — Cart icon with item-count badge in the nav, and a `/cart` page with quantity steppers, remove/clear, and an order summary (subtotal, savings vs MRP, total).
- **Added** — `/checkout` page with delivery details (name, mobile, email, address, city, state, pincode, optional notes), validation, and an order summary. "Place order" is shown disabled as a placeholder for when online ordering goes live.
- **Added** — "Order on WhatsApp" button: opens a chat with Clawberry's WhatsApp with a ready-to-send message containing an order ref, every item (with size/colour and quantity), the total to pay and the delivery details.
- **Added** — "Did you send your order on WhatsApp?" prompt after tapping Order on WhatsApp. "Yes, I've sent it" clears the cart and shows a thank-you screen with the order ref; "Not yet" keeps the cart. The prompt also has an "Open WhatsApp" fallback link.
- **Added** — Order alert email: tapping Order on WhatsApp also emails the order (ref, items, total, customer details) to the same inbox as the contact form (`/api/order`, via Resend). It is marked "initiated - not yet confirmed", since the customer may never press send; the subject carries the order ref, customer name, total and a timestamp so each alert is its own thread. It is sent once per distinct order and never blocks the customer.
- **Added** — Shipping is now calculated: ₹99, free for orders of ₹1499 and above (`lib/shipping.ts`). The cart and checkout summaries show the shipping line and a "Add ₹X more to get free shipping" nudge, and the WhatsApp message and order alert email carry the subtotal, shipping and the total to pay.
- **Changed** — Removed "Free delivery on your first order" from the closing banner (homepage and Shop), which contradicted the ₹99 shipping fee; it now reads "30-day returns and a tail-wag guarantee."
- **Changed** — Homepage ticker now says "Free Shipping above ₹1499" (was 999), driven by the same constant.
- **Changed** — Checkout details (saved on the device so repeat orders are quicker) are now wiped once the customer confirms they sent the order, and there is a "Clear form" button on the form; the form also says the details are saved on this device only.
- **Added** — Coupons: a "Coupons" row on the cart and checkout summaries (shows "1 coupon available", or "CLAW5 applied · you save ₹X") that opens a drawer - a bottom sheet with drag-to-dismiss on phones, a side panel on desktop - titled "Save more", with a code field and the one available coupon, `CLAW5` (5% off on orders of ₹1499 and above). The coupon card is greyed out with "Add ₹X more to unlock" until the subtotal reaches ₹1499, then it can be applied by tapping it or typing the code (the drawer then closes on its own); the drawer closes with Esc, the backdrop or the X, locks page scroll while open and returns focus to the row; the discount shows as its own line in the totals, in the WhatsApp message and in the order alert email. Rule lives in `lib/coupons.ts`. Shipping is still judged on the subtotal before the coupon.
- **Fixed** — Coupon drawer styling: the pale header band used to stop halfway through the code field and the panel used off-theme whites. It now uses the site's own surfaces (cream panel, tan header, off-white field and coupon card) with clean separation between them.
- **Fixed** — Coupon drawer: the code field no longer shows a second outline box inside its own border when focused (the site's global focus outline was drawing on the inner input; the whole field now highlights instead), and the custom cursor no longer disappears under the open drawer.
- **Changed** — Order references are now `DDMMYY-NNN` (order date in India time, then a running number starting at 501), e.g. `121026-501`, `121026-502`. The number comes from a server counter (`/api/order-ref`): a local file in development, Upstash Redis in production (setup in the README). If the counter is unreachable the customer still orders with a temporary ref like `121026-T5XK2`. The ref is reserved when they tap Order on WhatsApp and reused on retries.
- **Changed** — WhatsApp number now lives in one place (`lib/contact.ts`) and is used by both the Contact page and the order message.

### Shop & catalogue
- **Changed** — Product cards no longer tilt/move on hover; they now only get a soft border and shadow highlight.
- **Fixed** — On phones, tapping a product card left it stuck at a tilted angle (the tilt was only reset on mouse-leave, which touch never fires). Removing the tilt fixes it.
- **Changed** — Removed the Everything / Dogs / Cats / Both filter buttons from the Shop page; it now simply lists every product. The intro line no longer mentions filtering.

### Homepage
- **Changed** — Hero mascot GIF is 15% larger (width 26vw → 30vw, max 420px → 483px).

## 2026-09-21

### Homepage
- **Changed** — Replaced the homepage hero mascot with the updated WebP artwork.

### Footer
- **Changed** — Linked the official Instagram account and removed the placeholder Facebook and YouTube links.

### About page
- **Fixed** — The "Meet the faces behind every box" mascot illustration was off-centre and boxed inside a second bordered frame on a cool, out-of-theme card. It now uses the same look as the product cards (off-white card, warm tan tile, art centred on it) with soft paw/sparkle accents and a gentle "zzZ", and its alt text now describes what the image actually shows.

### Site-wide copy
- **Changed** — Removed all references to treats, food and ingredients, since Clawberry only sells pet toys and accessories: the homepage value card is now "Materials you can pronounce", the site and Shop descriptions read "pet toys and accessories", and the contact success message says "your pet deserves a cuddle".
- **Changed** — Contact-page FAQs: the "subscription for treats / Clawberry Refill" question is replaced with "What does Clawberry sell?", and the "Power Chew line" answer is rewritten around the rope toys.
- **Changed** — Removed the unused food icons ("bowl", "treat") from the product icon set.

### Homepage & Shop (product cards)
- **Added** — Five new rope-toy products in the catalogue and the homepage carousel: Two-Knot Rope Toy, Carrot Rope Toy, Knotted Dummy Toy, Handle Ball Toy and Tuffy Rope Toy.
- **Added** — `featured` flag on products: the homepage Fan Favourites carousel now shows only products with `featured: true` (previously it showed the whole catalogue). The Shop page still lists everything. Currently flagged: the two bandanas, collar, Adventure Walk Set, Tactical Harness and Heart Rope Toy.
- **Fixed** — The collar photo path now matches its real filename (`Collars.png`); the old lowercase path worked on Windows but would have shown a broken image once deployed on Linux/Vercel.
- **Added** — Product cards now show colour swatches and size chips (on the homepage Fan Favourites carousel and the Shop grid), and the price updates live as you pick a size or colour. Products declare options via `sizes` / `colors` in `lib/products.ts`; cards without options look as before.
- **Changed** — Everyday Explorer Collar now has 5 colours (Red, Maroon, Black, Yellow, Blue) and sizes S/M/L; Adventure Walk Set and Tactical Harness have sizes S/M/L. Prices for the new sizes are placeholders pending real pricing.
- **Added** — Product cards can now show a struck-through MRP next to the selling price with a "% off" chip; it follows the selected size and only appears when an `mrp` is set in `lib/products.ts`. MRPs currently in the data are placeholders.
- **Fixed** — Size and colour buttons on the homepage carousel didn't respond to clicks (the drag-to-scroll handler was swallowing them); it now only takes over once the mouse actually drags.
- **Fixed** — Releasing the mouse outside the homepage product carousel no longer leaves it stuck in a dragging state; the drag cleanup now runs even if pointer capture never started.
- **Changed** — The single `size` field on `Product` is replaced by a `sizes` list with a price per size, plus an optional per-colour surcharge (`extra`).

## 2026-09-03

### Homepage
- **Fixed** — Fan Favourites no longer hijacks page scroll. Replaced the scroll-jacked/pinned horizontal showcase with a native swipeable carousel (arrow buttons, correct edge spacing, smooth momentum-based glide when dragged with a mouse).
- **Changed** — New animated hero mascot (dog-and-cat high-five GIF) replacing the static logo badge; shown flush, no border/tilt, larger size.
- **Added** — Large, softly faded "Clawberry" wordmark watermark across the bottom of the hero (cropped to its top half).
- **Fixed** — Nav bar background is now always visible (previously only appeared on scroll) and no longer shifts position when scrolling.

### About page
- **Changed** — Replaced the placeholder brand story with the real one: founders Devansh, Sandeep and Kartik, the 11 foster dogs origin story, real founder bios, and real "Why Clawberry" values.
- **Fixed** — Background color alternation between sections, and padding/alignment inconsistencies down the page.

### Shop & catalogue
- **Changed** — Replaced all 8 placeholder products with 6 real photographed SKUs: Everyday Explorer Collar, Adventure Walk Set, Tactical Harness, Heart Rope Toy, Embroidered Bandana (Pearl), Embroidered Bandana (Marigold).
- **Added** — Product photos now render in square (1:1) tiles with a warm tan background matching the photography.
- **Changed** — All 6 new products priced at ₹100 as a placeholder, pending real pricing.
- **Fixed** — Product cards now size themselves to fit content automatically instead of a fixed height, so the taller photo tiles never get cropped.

### Contact
- **Changed** — Phone number now shows a WhatsApp icon and opens a WhatsApp chat in a new tab instead of dialing.
- **Fixed** — Contact form now actually emails submissions via Resend (previously only logged server-side and went nowhere), with reply-to set to the customer's address.
- **Fixed** — Each submission now gets a timestamped subject line, so messages arrive as separate email threads instead of piling into one Gmail conversation.
