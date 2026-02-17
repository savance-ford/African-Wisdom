// constants/quoteTypes.ts
export type AfricaRegion = "North" | "West" | "East" | "Central" | "South";

export type Quote = {
  id: string; // e.g. "west-001"
  region: AfricaRegion; // required
  country?: string; // optional but recommended
  origin?: string; // e.g. "Akan", "Yoruba", "Berber" (optional)
  author: string; // e.g. "Yoruba Proverb"
  text: string; // the proverb
  nativeText?: string; // native text
  tags?: string[]; // optional: ["community", "patience"]
  source?: string; // optional: book/site you used (for your internal tracking)
};
