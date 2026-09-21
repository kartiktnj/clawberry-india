# Changelog

Day-by-day record of changes to the Clawberry website. Newest entries at the top.

## 2026-09-21

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
