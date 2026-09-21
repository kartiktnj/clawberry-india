export type Size = "XS" | "S" | "M" | "L" | "XL";
export type SizeOption = { label: Size; price: number; mrp?: number };
export type ColorOption = { name: string; hex: string; extra?: number; image?: string };
export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price?: number; //selling/discounted price
  mrp?: number; // maximum retail price
  category: "dog" | "cat" | "both";
  sizes?: SizeOption[];
  colors?: ColorOption[];
  tag: string;
  /** Show in the homepage "Fan favourites" carousel. Every product still appears on /shop. */
  featured?: boolean;
  icon?: "bone" | "ball" | "leash" | "mouse" | "bed" | "yarn";
  image?: string;
  color: "grape" | "coral" | "mint";
};

export const products: Product[] = [
  {
    slug: "bandana-pearl",
    featured: true,
    name: "Embroidered Bandana - Pearl",
    tagline: "Hand-embroidered charm for their best looks.",
    sizes: [
      { label: "S", price: 499, mrp: 599 },
      { label: "L", price: 549, mrp: 649 },
    ],
    category: "both",
    tag: "New drop",
    image: "/images/SKUs/bandana-pearl.png",
    color: "grape",
  },
  {
    slug: "bandana-marigold",
    featured: true,
    name: "Embroidered Bandana - Marigold",
    tagline: "Festival-ready flair, tied in seconds.",
    price: 100,
    sizes: [
      { label: "S", price: 449, mrp: 549 },
      { label: "L", price: 499, mrp: 599 },
    ],
    category: "both",
    tag: "Editor's pick",
    image: "/images/SKUs/bandana-marigold.png",
    color: "mint",
  },
  {
    slug: "everyday-explorer-collar",
    featured: true,
    name: "Everyday Explorer Collar",
    tagline: "Adventure-ready. Comfortable for all-day wear.",
    price: 149,
    sizes: [
      { label: "M", price: 149, mrp: 199 },
      { label: "L", price: 199, mrp: 249 },
    ],
    colors: [
      { name: "Red", hex: "#d81f26" },
      { name: "Black", hex: "#141414" },
      { name: "Yellow", hex: "#f2c81b" },
      { name: "Blue", hex: "#1a3fd1" },
    ],
    category: "dog",
    tag: "Bestseller",
    image: "/images/SKUs/Collars.png",
    color: "coral",
  },
  {
    slug: "adventure-walk-set",
    featured: true,
    name: "Adventure Walk Set",
    tagline: "Matching harness, leash and collar. Zero mismatched vibes.",
    price: 399,
    mrp: 499, 
    colors: [
      { name: "Red", hex: "#d81f26" },
      { name: "Orange", hex: "#ff7700" },
      { name: "Green", hex: "#1fd11c" },
    ],
    category: "dog",
    tag: "New drop",
    image: "/images/SKUs/harness-set.png",
    color: "grape",
  },
  {
    slug: "tactical-harness",
    featured: true,
    name: "Tactical Harness",
    tagline: "Built tough for dogs who mean business.",
    price: 1399,
    mrp: 1999, 
    colors: [
      { name: "Black", hex: "#141414" },
      { name: "Olive", hex: "#808000" },
      { name: "Khaki", hex: "#f0e68c" },
    ],
    category: "dog",
    tag: "New drop",
    image: "/images/SKUs/tactical-harness.png",
    color: "mint",
  },
  {
    slug: "tactical-collar",
    featured: true,
    name: "Tactical Collar",
    tagline: "Built tough for dogs who mean business.",
     sizes: [
      { label: "M", price: 549, mrp: 749 },
      { label: "L", price: 599, mrp: 799 },
    ],
    colors: [
      { name: "Black", hex: "#141414" },
      { name: "Olive", hex: "#808000" },
      { name: "Khaki", hex: "#f0e68c" },
    ],
    category: "dog",
    tag: "New drop",
    image: "/images/SKUs/tactical_collar.png",
    color: "mint",
  },
  {
    slug: "heart-rope-toy",
    featured: true,
    name: "Heart Rope Toy",
    tagline: "Chew-tough rope, tied into pure love.",
    price: 129,
    mrp: 149,
    category: "dog",
    tag: "Staff pick",
    image: "/images/SKUs/heart-rope-toy.png",
    color: "coral",
  },
  {
    slug: "two-knot-rope-toy",
    name: "Two-Knot Rope Toy",
    tagline: "Classic tug-and-chew, knotted at both ends.",
    price: 79,
    mrp: 99,
    category: "dog",
    tag: "New drop",
    image: "/images/SKUs/2knot_toy.png",
    color: "grape",
  },
  {
    slug: "carrot-rope-toy",
    name: "Carrot Rope Toy",
    tagline: "Braided into a carrot. Zero veg, all the fun.",
    price: 79,
    mrp: 99,
    category: "dog",
    tag: "New drop",
    image: "/images/SKUs/carrot_toy.png",
    color: "coral",
  },
  {
    slug: "knotted-dummy-toy",
    name: "Knotted Dummy Toy",
    tagline: "Braided rope with a loop handle for tug and fetch.",
    price: 79,
    mrp: 99,
    category: "dog",
    tag: "New drop",
    image: "/images/SKUs/Dummy_knotted_toy.png",
    color: "mint",
  },
  {
    slug: "handle-ball-toy",
    name: "Handle Ball Toy",
    tagline: "A chunky rope ball with a handle. Made for fetch.",
    price: 79,
    mrp: 99,
    category: "dog",
    tag: "New drop",
    image: "/images/SKUs/handle_ball_toy.png",
    color: "grape",
  },
  {
    slug: "tuffy-rope-toy",
    name: "Tuffy Rope Toy",
    tagline: "Thick, knotted and built for serious tug-of-war.",
    price: 79,
    mrp: 99,
    category: "dog",
    tag: "New drop",
    image: "/images/SKUs/tuffy_toy.png",
    color: "coral",
  },
  {
    slug: "set-of-5",
    name: "Set of 5 Toys",
    featured: true,
    tagline: "A bundle of 5 fun and durable toys for endless play.",
    price: 299,
    mrp: 595,
    category: "dog",
    tag: "Bestseller",
    image: "/images/SKUs/toys_set_of_5.png",
    color: "coral",
  },
];

/** Products flagged `featured`, in catalogue order - what the homepage carousel shows. */
export const featuredProducts = products.filter((p) => p.featured);

/**
 * Price for a given selection. Size sets the base; colour can add a surcharge (applied to the
 * MRP too, so the discount stays the same). `mrp` is only returned when it's higher than `price`.
 */
export function pricingFor(product: Product, size?: SizeOption, color?: ColorOption) {
  const extra = color?.extra ?? 0;
  const price = (size?.price ?? product.price ?? 0) + extra;
  const listPrice = size ? size.mrp : product.mrp;
  const mrp = listPrice !== undefined && listPrice + extra > price ? listPrice + extra : undefined;
  const discountPct = mrp ? Math.round((1 - price / mrp) * 100) : undefined;
  return { price, mrp, discountPct };
}

export const stats = [
  { value: "48hr", label: "Pan-India delivery" },
  { value: "100%", label: "Made In India" },
];

export const values = [
  {
    title: "Tested on real chaos",
    body: "Every product survives our panel of certified good boys and unreasonable cats before it ships.",
  },
  {
    title: "Materials you can pronounce",
    body: "No mystery materials. We spell out what every product is made of, in plain language.",
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
    q: "What does Clawberry sell?",
    a: "Pet toys and accessories - collars, harnesses, bandanas and rope toys, made for pets who use everything to the point of destruction.",
  },
  {
    q: "What if my pet doesn't love it?",
    a: "30-day no-questions returns. If your pet turns their nose up, so do we.",
  },
  {
    q: "Are your toys safe for strong chewers?",
    a: "Our rope toys are made for tug and chew, but we always recommend supervised play and retiring any toy that starts to fray.",
  },
];
