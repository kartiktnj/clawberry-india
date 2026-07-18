# Clawberry — website

A premium, motion-first marketing site for **Clawberry**, a pet supplies startup.
Built with Next.js (App Router), Tailwind CSS v4, GSAP + ScrollTrigger, Lenis smooth
scroll, Framer Motion, and a light React Three Fiber scene in the hero.

## Design direction

- **Aesthetic**: dark, premium "void" background with a berry-purple / coral / mint
  accent palette pulled from the Clawberry logo, playful copy, bold display type
  (Bricolage Grotesque) paired with Inter for body text and JetBrains Mono for labels.
- **Signature motifs**: a floating low-poly "berry field" in the hero (React Three
  Fiber), a claw-scratch SVG divider, a magnetic custom cursor with contextual labels,
  and a buckssauce-style pinned horizontal product showcase.
- **Motion**: GSAP scroll-triggered reveals throughout, Framer Motion for UI
  interactions (menus, tilts, accordions), Lenis for smooth-scroll, and a cinematic
  fade/slide on every route change.
- All animation respects `prefers-reduced-motion`, and the custom cursor / 3D scene
  are automatically disabled on touch devices and small screens for performance.

## Getting started

Requires Node 18.18+ (Node 20/22 recommended).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** the display fonts (Bricolage Grotesque, Inter, JetBrains Mono) are loaded
> via `next/font/google` and are fetched **once at build/dev start** — you need an
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
  layout.tsx          Root layout — fonts, nav, footer, cursor, smooth scroll
  template.tsx         Cinematic per-route transition
  page.tsx              Home
  shop/page.tsx         Shop (filterable product grid)
  about/page.tsx        Brand story, timeline, values
  contact/page.tsx      Contact form + FAQ
  api/contact/route.ts  Form submission endpoint (stubbed — wire to email/CRM)
  robots.ts / sitemap.ts  SEO metadata routes
  icon.png              Favicon (generated from the Clawberry logo)

components/
  Hero.tsx, ProductShowcase.tsx, WhySection.tsx, Testimonials.tsx, CtaBanner.tsx
  Nav.tsx, Footer.tsx, SmoothScroll.tsx, CustomCursor.tsx
  three/          React Three Fiber hero scene (lazy-loaded, client-only)
  ui/             Reveal, MagneticButton, Marquee, SectionLabel, ClawDivider, ProductIcon

lib/
  products.ts     All placeholder copy: products, stats, timeline, values, FAQs
  utils.ts        `cn()` class-merge helper
```

## Editing content

Everything in the **Shop**, **Why Clawberry**, **About timeline/values**, and **FAQ**
sections is driven by plain data in `lib/products.ts` — edit that file to swap in real
products, pricing, and copy without touching component code.

The **logo** lives at `public/images/logo.png` (full lockup) and
`public/images/logo-icon.png` (mascot only, used in the nav/footer). Replace these
files with your final logo exports whenever you have them — same filenames, and the
rest of the site updates automatically.

## Hooking up the contact form

`app/api/contact/route.ts` currently just logs submissions server-side. Wire it up to
a real provider (Resend, Postmark, SendGrid, a Slack webhook, a Google Sheet, etc.) —
the `TODO` comment marks exactly where.

## Deploying

This is a standard Next.js app — deploy to Vercel by pushing to a Git repo and
importing it at [vercel.com/new](https://vercel.com/new), or run `npm run build &&
npm run start` on any Node host.

## Performance & accessibility notes

- Images use `next/image`; the 3D scene and custom cursor are lazy-loaded and skipped
  entirely on touch devices, small screens, or `prefers-reduced-motion`.
- All interactive elements keep visible focus states even with the custom cursor
  active (see `:focus-visible` rules in `app/globals.css`).
- Metadata, Open Graph tags, `robots.txt` and `sitemap.xml` are already wired up —
  update `metadataBase` in `app/layout.tsx` once you have a real domain.
