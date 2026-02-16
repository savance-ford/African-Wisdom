export type AfricaRegion = "North" | "West" | "East" | "Central" | "South";

export type Quote = {
  id: string;
  text: string;
  author: string;
  region: AfricaRegion;
  country?: string;
  source?: string;
};
