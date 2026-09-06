/**
 * SOURCE OF TRUTH
 * Every product fact below was pulled from the official ByErim product feed
 * (byerim.com/products/hair-oil.js) and product page FAQ. Nothing invented.
 * Where a line is interpretation rather than fact, it is marked.
 */

export const PRODUCT_URL = "https://www.byerim.com/products/hair-oil";

/** Official product image, served untouched from the brand's own Shopify CDN. */
export const BOTTLE_CDN =
  "https://cdn.shopify.com/s/files/1/0275/7050/3725/files/Hairoil.png?v=1764259491";

export const BADGES = [
  "Vegan & Cruelty Free",
  "Silicone Free",
  "Paraben Free",
  "All Hair Types",
];

export interface Oil {
  n: string;
  name: string;
  role: string;
  /** weight class = creative interpretation of the verified "varied molecular weights" claim */
  weight: string;
}

export const OILS: Oil[] = [
  {
    n: "01",
    name: "Amla",
    role: "Rich in vitamin C and antioxidants — trusted in Ayurveda for the scalp.",
    weight: "light",
  },
  {
    n: "02",
    name: "Argan",
    role: "Vitamin E and antioxidants, working for follicle and scalp health.",
    weight: "light",
  },
  {
    n: "03",
    name: "Coconut",
    role: "Essential fatty acids that nourish the scalp and strengthen the cuticle.",
    weight: "medium",
  },
  {
    n: "04",
    name: "Castor",
    role: "Rich in protein — supports strength, helps reduce breakage.",
    weight: "deep",
  },
  {
    n: "05",
    name: "Sweet Almond",
    role: "The smallest molecule — seals the cuticle, locks every other oil in.",
    weight: "light",
  },
  {
    n: "06",
    name: "Lavender",
    role: "An essential oil, long used to soothe the scalp.",
    weight: "aromatic",
  },
  {
    n: "07",
    name: "Rosemary",
    role: "An essential oil, traditionally tied to hair and scalp care.",
    weight: "aromatic",
  },
  {
    n: "08",
    name: "Bergamot",
    role: "The natural aromatic — the note the ritual is remembered by.",
    weight: "aromatic",
  },
];

export const RITUAL_STEPS = [
  {
    n: "01",
    title: "Warm",
    line: "A small amount, pooled and warmed between the palms.",
  },
  {
    n: "02",
    title: "Massage",
    line: "Pressed into the scalp. Raked gently through the lengths.",
  },
  {
    n: "03",
    title: "Wait",
    line: "Thirty minutes, at least. Or the whole night.",
  },
  {
    n: "04",
    title: "Rinse",
    line: "Out with a single shampoo. Nothing heavy left behind.",
  },
];

export const LEDGER = [
  { fact: "Nourishes the scalp", tag: "purpose" },
  { fact: "Supports the appearance of healthy, strong hair", tag: "purpose" },
  { fact: "Varied molecular weights — cuticle to inner cortex", tag: "mechanism" },
  { fact: "For hair, and for beard", tag: "use" },
  { fact: "Dermatologically approved · clinically tested", tag: "safety" },
  { fact: "Paediatrician approved — patch test first", tag: "safety" },
  { fact: "100% natural · Ayurvedic · made in the UK", tag: "origin" },
];

export const FAQS = [
  {
    q: "How long until I see results?",
    a: "With consistent use — one to three evenings a week — around a month. Everyone\u2019s biology and goals are different.",
  },
  {
    q: "How do I wash it out?",
    a: "With one shampoo. That\u2019s all the formula asks for.",
  },
  {
    q: "How long does a bottle last?",
    a: "The 50ml lasts about three months. The 100ml, about six.",
  },
  {
    q: "What\u2019s the expiry?",
    a: "Two years from the date of manufacture — printed on the base of the bottle.",
  },
  {
    q: "Is it suitable for sensitive skin?",
    a: "Dermatologically approved, paediatrician approved, and certified kind to skin. Patch test 48 hours before first use; the formula may contain naturally occurring Linalool and Limonene (under 1%).",
  },
];

export const SIZES = [
  {
    size: "50 ml",
    mood: "the evening ritual",
    lasts: "lasts about three months",
  },
  {
    size: "100 ml",
    mood: "the committed ritual",
    lasts: "lasts about six months",
  },
];

export const PRESS = ["Vogue", "Harper\u2019s Bazaar", "Cosmopolitan"];
