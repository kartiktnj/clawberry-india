export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  category: "dog" | "cat" | "both";
  tag: string;
  icon: "bone" | "ball" | "bowl" | "leash" | "mouse" | "bed" | "yarn" | "treat";
  color: "grape" | "coral" | "mint";
};

export const products: Product[] = [
  {
    slug: "power-chew-bone",
    name: "Power Chew Bone",
    tagline: "Beef-flavoured. Built for the boredest of jaws.",
    price: 549,
    category: "dog",
    tag: "Bestseller",
    icon: "bone",
    color: "coral",
  },
  {
    slug: "cloud-nine-bed",
    name: "Cloud Nine Bed",
    tagline: "Memory foam so good, they'll ghost the couch.",
    price: 2299,
    category: "both",
    tag: "New drop",
    icon: "bed",
    color: "grape",
  },
  {
    slug: "featherfling-wand",
    name: "Featherfling Wand",
    tagline: "Turns 3pm boredom into a full cardio session.",
    price: 399,
    category: "cat",
    tag: "Staff pick",
    icon: "yarn",
    color: "mint",
  },
  {
    slug: "trail-blazer-leash",
    name: "Trail Blazer Leash",
    tagline: "Reflective, shock-absorbing, zero-tangle.",
    price: 899,
    category: "dog",
    tag: "Editor's pick",
    icon: "leash",
    color: "grape",
  },
  {
    slug: "stealth-mouse-toy",
    name: "Stealth Mouse Trio",
    tagline: "Silent squeak tech. Loud personality.",
    price: 349,
    category: "cat",
    tag: "Under ₹350",
    icon: "mouse",
    color: "coral",
  },
  {
    slug: "orbit-fetch-ball",
    name: "Orbit Fetch Ball",
    tagline: "Bounces weird on purpose. Chases itself, almost.",
    price: 449,
    category: "dog",
    tag: "Bestseller",
    icon: "ball",
    color: "mint",
  },
  {
    slug: "gravity-bowl",
    name: "Gravity Slow-Feed Bowl",
    tagline: "Anti-gulp ridges for dogs who inhale dinner.",
    price: 699,
    category: "dog",
    tag: "Vet approved",
    icon: "bowl",
    color: "grape",
  },
  {
    slug: "berry-bites",
    name: "Berry Bites Training Treats",
    tagline: "Freeze-dried, single-ingredient, absurdly good boy energy.",
    price: 299,
    category: "both",
    tag: "New drop",
    icon: "treat",
    color: "coral",
  },
];

export const stats = [
  { value: "48hr", label: "Pan-India delivery" },
  { value: "100%", label: "Vet-checked formulas" },
];

export const timeline = [
  {
    year: "2023",
    title: "Two humans, one very spoiled beagle",
    body: "Clawberry started as a spreadsheet of every treat our beagle Momo rejected, and every one she'd sell her squeaky toys for.",
  },
  {
    year: "2024",
    title: "First 500 boxes, packed on a kitchen floor",
    body: "We shipped our first Power Chew Bones out of a one-bedroom flat, hand-writing thank-you notes until our wrists gave out.",
  },
  {
    year: "2026",
    title: "Building the pet aisle we always wanted",
    body: "Now we're designing the next generation of Clawberry essentials - playful, premium, and built around how pets actually behave.",
  },
];

export const values = [
  {
    title: "Tested on real chaos",
    body: "Every product survives our panel of certified good boys and unreasonable cats before it ships.",
  },
  {
    title: "Ingredients you can pronounce",
    body: "No mystery meals. We list every ingredient, every source, in plain language.",
  },
  {
    title: "Made to be used, not admired",
    body: "Durable stitching, chew-safe materials, and colours that survive mud season.",
  },
  {
    title: "Packed with zero guilt",
    body: "Recyclable packaging and carbon-light shipping, because the planet has pets too.",
  },
];

export const faqs = [
  {
    q: "Where do you deliver?",
    a: "Anywhere in India, in 48–72 hours. Metro cities usually see next-day delivery.",
  },
  {
    q: "Do you offer a subscription for treats?",
    a: "Yes - Clawberry Refill lets you set a schedule for treats and food, with 10% off every recurring order.",
  },
  {
    q: "What if my pet doesn't love it?",
    a: "30-day no-questions returns. If your pet turns their nose up, so do we.",
  },
  {
    q: "Are your chews safe for aggressive chewers?",
    a: "Our Power Chew line is stress-tested for strong jaws, but we always recommend supervised chew time.",
  },
];
