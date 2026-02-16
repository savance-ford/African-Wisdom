// hooks/shareQuote.ts
import { Share } from "react-native";
import type { Quote } from "../constants/quoteTypes";

/**
 * Shares a quote using the native share sheet (SMS, social apps, email, etc.)
 */
export async function shareQuote(quote: Quote) {
  const message = `"${quote.text}"\n— ${quote.author}${quote.country ? ` (${quote.country})` : ""}\n\nAfrican Wisdom`;

  // iOS uses "message" mainly; Android supports message too.
  await Share.share({ message });
}
