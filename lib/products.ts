export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  category: "dog" | "cat" | "both";
  tag: string;
  icon?: "bone" | "ball" | "bowl" | "leash" | "mouse" | "bed" | "yarn" | "treat";
  image?: string;
  color: "grape" | "coral" | "mint";
};

export const products: Product[] = [
  {
    slug: "bandana-pearl",
    name: "Embroidered Bandana - Pearl",
    tagline: "Hand-embroidered charm for their best looks.",
    price: 100,
    category: "both",
    tag: "New drop",
    image: "/images/SKUs/bandana-pearl.png",
    color: "grape",
  },
  {
    slug: "bandana-marigold",
    name: "Embroidered Bandana - Marigold",
    tagline: "Festival-ready flair, tied in seconds.",
    price: 100,
    category: "both",
    tag: "Editor's pick",
    image: "/images/SKUs/bandana-marigold.png",
    color: "mint",
  },
  {
    slug: "everyday-explorer-collar",
    name: "Everyday Explorer Collar",
    tagline: "Adventure-ready. Comfortable for all-day wear.",
    price: 100,
    category: "dog",
    tag: "Bestseller",
    image: "/images/SKUs/collars.png",
    color: "coral",
  },
  {
    slug: "adventure-walk-set",
    name: "Adventure Walk Set",
    tagline: "Matching harness, leash and collar. Zero mismatched vibes.",
    price: 100,
    category: "dog",
    tag: "New drop",
    image: "/images/SKUs/harness-set.png",
    color: "grape",
  },
  {
    slug: "tactical-harness",
    name: "Tactical Harness",
    tagline: "Built tough for dogs who mean business.",
    price: 100,
    category: "dog",
    tag: "New drop",
    image: "/images/SKUs/tactical-harness.png",
    color: "mint",
  },
  {
    slug: "heart-rope-toy",
    name: "Heart Rope Toy",
    tagline: "Chew-tough rope, tied into pure love.",
    price: 100,
    category: "dog",
    tag: "Staff pick",
    image: "/images/SKUs/heart-rope-toy.png",
    color: "coral",
  },
];

export const stats = [
  { value: "48hr", label: "Pan-India delivery" },
  { value: "100%", label: "Vet-checked formulas" },
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

export const whyClawberry = [
  {
    title: "Made with pets in mind",
    body: "Comfort, usefulness and the little things that make a difference.",
  },
  {
    title: "Quality you can feel good about",
    body: "Products we would be happy bringing home to our own pets.",
  },
  {
    title: "Fair prices, always",
    body: "Because better shouldn't automatically mean expensive.",
  },
  {
    title: "Built by pet parents",
    body: "We get the responsibility. We also get the obsession.",
  },
];

export const brandPromises = ["Thoughtfully made", "Fairly priced", "Made with love"];

export const founders = [
  {
    name: "Devansh Bhardwaj",
    role: "Co-Founder",
    body: "The ideas, the ambition and a serious love for animals.",
  },
  {
    name: "Sandeep Malhotra",
    role: "Co-Founder",
    body: "Always looking for a better way to build, improve and grow the Clawberry world.",
  },
  {
    name: "Kartik Taneja",
    role: "Co-Founder",
    body: "Helping turn three friends' big dream into something every pet parent can experience.",
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
