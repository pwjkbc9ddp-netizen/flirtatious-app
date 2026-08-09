export const STORAGE_KEY = "flirtatious-store-v1";

// Standalone localStorage-backed replacement for the sandboxed window.storage
// API this component was originally written against.
export const storage = {
  async get(key) {
    return { value: localStorage.getItem(key) };
  },
  async set(key, value) {
    localStorage.setItem(key, value);
  },
};

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export const DEFAULT_PRODUCTS = [
  { id: "p1", num: "001", name: "Chrome Vinyl Set", tag: "New Arrival", price: 48, desc: "Metallic finish, adjustable fit, comes gift-boxed.", img: "", borderGif: "" },
  { id: "p2", num: "002", name: "Iridescent Kit", tag: "Bestseller", price: 62, desc: "Shifts purple-to-blue in light. Our most-repurchased set.", img: "", borderGif: "" },
  { id: "p3", num: "003", name: "Midnight Glaze Duo", tag: "Limited", price: 54, desc: "Deep gloss black finish with silver hardware.", img: "", borderGif: "" },
  { id: "p4", num: "004", name: "Cyber Silk Wrap", tag: "Restocked", price: 39, desc: "Soft-touch silver wrap, one size fits most.", img: "", borderGif: "" },
  { id: "p5", num: "005", name: "Electric Blue Set", tag: "New Arrival", price: 58, desc: "High-shine electric blue, matching accessory included.", img: "", borderGif: "" },
  { id: "p6", num: "006", name: "Holo Shimmer Kit", tag: "Bestseller", price: 66, desc: "Holographic finish that catches every angle of light.", img: "", borderGif: "" },
];

export const DEFAULT_POSTS = [
  {
    id: "b1",
    title: "Welcome to the Shop",
    date: "2026-01-06",
    body: "This is where restock notes, styling ideas, and behind-the-scenes updates will live. Check back weekly.",
  },
  {
    id: "b2",
    title: "This Week's Restock",
    date: "2026-01-13",
    body: "The Holo Shimmer Kit is back in stock after selling out twice. Limited quantity, first come first served.",
  },
];

export const DEFAULT_SETTINGS = {
  brandName: "FLIRTATIOUS",
  tagline: "chrome. gloss. after dark. ✦ est. 2026",
  blurb: "a chrome-coated corner of the internet for after-dark essentials. metallic, glossy, a little bit dangerous — restocked weekly, always 18+.",
  aboutHeading: "About Flirtatious",
  aboutBody: "Flirtatious started as a small weekend project and turned into a weekly restock. Every set is chosen for how it catches light — chrome, iridescent, glazed — nothing flat, nothing boring.\n\nEverything ships discreet and unmarked. Questions before you order? Reach out any time.",
  bannerGif: "",
  sidebarGif: "",
  defaultBorderGif: "",
};
