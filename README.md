# Clawberry - website

A playful, motion-aware marketing site for **Clawberry**, a pet supplies startup.
Built with Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, and GSAP +
ScrollTrigger, with Lenis for smooth scrolling.

## Design direction

- **Aesthetic**: a warm cream background with a navy / coral / sky-blue pixel-art
  palette pulled from the Clawberry logo, bold display type (Bricolage Grotesque)
  paired with Inter for body text and JetBrains Mono for labels.
- **Signature motifs**: an ambient field of floating paw-print/bone/sparkle icons in
  the hero (`PawField`), a paw-print cursor trail that streaks in on load and idles
  on an interval until the user moves the mouse (`CursorTrail`), a claw-scratch SVG
  divider, and a magnetic custom cursor with contextual labels on desktop.
- **Motion system**: a choreographed page-load stagger on the hero, hover/pressed
  states on every interactive control, one GSAP ScrollTrigger reveal per section
  (`ui/Reveal.tsx`), Framer Motion for menus/tabs/accordions/route transitions, and
  Lenis for smooth-scroll. Everything routes through `MotionConfig
  reducedMotion="user"` in `app/layout.tsx`, so `prefers-reduced-motion` cleanly
  disables all non-essential motion in one place.
- The custom cursor is disabled automatically on touch devices; the cursor trail's
  live-tracking (but not its ambient streaks) is skipped there too, since there's no
  real pointer to follow.

## Getting started

Requires Node 20.9+ (Next.js 16's minimum).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** the display fonts (Bricolage Grotesque, Inter, JetBrains Mono) are loaded
> via `next/font/google` and are fetched **once at build/dev start** - you need an
> internet connection the first time you run `npm run dev` or `npm run build`. After
> that they're cached locally by Next.js.

## Scripts

| Command         | Description                          |
|-----------------|---------------------------------------|
| `npm run dev`   | Start the local dev server            |
| `npm run build` | Production build                      |
| `npm run start` | Serve the production build            |
| `npm run lint`  | Run ESLint                            |

## Project structure

```
app/
  layout.tsx          Root layout - fonts, nav, footer, cursor, smooth scroll
  template.tsx         Per-route fade/slide transition
  page.tsx              Home
  shop/page.tsx         Shop (filterable product grid)
  about/page.tsx        Brand story, timeline, values
  contact/page.tsx      Contact form + FAQ
  api/contact/route.ts  Form submission endpoint (stubbed - wire to email/CRM)
  robots.ts / sitemap.ts  SEO metadata routes
  icon.png              Favicon (generated from the Clawberry logo)

components/
  Hero.tsx, ProductShowcase.tsx, WhySection.tsx, CtaBanner.tsx
  Nav.tsx, Footer.tsx, SmoothScroll.tsx, CustomCursor.tsx
  PawField.tsx        Ambient floating paw/bone/sparkle background (hero)
  CursorTrail.tsx     Paw-print cursor trail + idle streak loop (hero)
  Timeline.tsx, FaqAccordion.tsx, ContactForm.tsx, ShopGrid.tsx, ProductCard.tsx
  Testimonials.tsx    Reviews section - not wired up yet, see "Editing content" below
  ui/             Reveal, MagneticButton, Marquee, SectionLabel, ClawDivider, ProductIcon

lib/
  products.ts     Products, stats, brand values/promises, founders, and FAQ copy
  utils.ts        `cn()` class-merge helper
```

## Editing content

Everything in the **Shop**, **Why Clawberry**, **About timeline/values**, and **FAQ**
sections is driven by plain data in `lib/products.ts` - edit that file to swap in real
products, pricing, and copy without touching component code. It intentionally ships
no fabricated stats or testimonials - only real, current numbers.

**Testimonials** (`components/Testimonials.tsx`) aren't rendered on any page yet,
since there are no real reviews pre-launch. It's a plain component that takes
`heading` and a `reviews: { quote, name, pet }[]` array as props and renders nothing
if the array is empty - once you have real reviews, import it, pass the data, and
drop it into a page.

The **logo assets** live in `public/images/`:
- `logo-icon.png` - circular mascot icon, used in the nav.
- `wordmark.png` - the "Clawberry" text lockup, used next to the icon in the nav.
- `logo.png` - full badge lockup, used on the About page.
- `hero-mascot.gif` - the animated dog/cat scene shown next to the headline on the
  homepage hero (desktop only).

Replace any of these with new exports using the same filenames and the site updates
automatically.

## Hooking up the contact form

`app/api/contact/route.ts` currently just logs submissions server-side. Wire it up to
a real provider (Resend, Postmark, SendGrid, a Slack webhook, a Google Sheet, etc.) -
the `TODO` comment marks exactly where.

## Deploying

This is a standard Next.js app - deploy to Vercel by pushing to a Git repo and
importing it at [vercel.com/new](https://vercel.com/new), or run `npm run build &&
npm run start` on any Node host.

## Performance & accessibility notes

- Images use `next/image` (the animated hero GIF is marked `unoptimized` so its
  animation survives Next's image pipeline).
- The custom cursor, cursor trail's live tracking, and all GSAP/Framer motion are
  automatically skipped or reduced on touch devices and under
  `prefers-reduced-motion`.
- All interactive elements keep visible focus states even with the custom cursor
  active (see `:focus-visible` rules in `app/globals.css`).
- Metadata, Open Graph tags, `robots.txt` and `sitemap.xml` are already wired up -
  update `metadataBase` in `app/layout.tsx` once you have a real domain.
