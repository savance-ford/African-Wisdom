import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  BOOKMARKS: "AFRICAN_WISDOM_BOOKMARKS",
  DAILY: "AFRICAN_WISDOM_DAILY",
};

export async function getBookmarkIds(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(KEYS.BOOKMARKS);
  return raw ? JSON.parse(raw) : [];
}

export async function setBookmarkIds(ids: string[]) {
  await AsyncStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(ids));
}

export async function toggleBookmark(id: string): Promise<string[]> {
  const current = await getBookmarkIds();
  const next = current.includes(id)
    ? current.filter((x) => x !== id)
    : [...current, id];
  await setBookmarkIds(next);
  return next;
}

export async function getDailyData<T>(): Promise<T | null> {
  const raw = await AsyncStorage.getItem(KEYS.DAILY);
  return raw ? JSON.parse(raw) : null;
}

export async function setDailyData<T>(value: T) {
  await AsyncStorage.setItem(KEYS.DAILY, JSON.stringify(value));
}
