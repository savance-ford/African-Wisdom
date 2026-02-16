import type { Quote } from "../constants/quoteTypes";
import { getDailyData, setDailyData } from "./storage";

type DailyRecord = { dateKey: string; quoteId: string };

function dateKey(d = new Date()) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function getOrCreateDailyQuote(quotes: Quote[]): Promise<Quote> {
  const today = dateKey();
  const saved = await getDailyData<DailyRecord>();

  if (saved?.dateKey === today) {
    const match = quotes.find((q) => q.id === saved.quoteId);
    if (match) return match;
  }

  const chosen = quotes[Math.floor(Math.random() * quotes.length)];
  await setDailyData<DailyRecord>({ dateKey: today, quoteId: chosen.id });
  return chosen;
}
