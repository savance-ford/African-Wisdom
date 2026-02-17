import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { QUOTES } from "../../constants/quotes";
import { shareQuote } from "../../hooks/shareQuote";
import { getBookmarkIds, toggleBookmark } from "../../hooks/storage";

export default function QuoteDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const quoteId = String(id);

  const quote = useMemo(
    () => QUOTES.find((q) => q.id === quoteId),
    [quoteId, QUOTES]
  );

  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const ids = await getBookmarkIds();
        if (mounted) setBookmarked(ids.includes(quoteId));
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [quoteId]);

  async function onToggle() {
    if (saving) return;
    setSaving(true);
    try {
      const ids = await toggleBookmark(quoteId);
      setBookmarked(ids.includes(quoteId));
    } catch {
      Alert.alert("Error", "Could not update bookmarks.");
    } finally {
      setSaving(false);
    }
  }

  if (!quote) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ fontWeight: "800", fontSize: 16 }}>
          Quote not found.
        </Text>

        <Pressable
          onPress={() => router.back()}
          style={[styles.btn, { marginTop: 14 }]}
        >
          <Text style={styles.btnText}>Go back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.quote}>"{quote.text}"</Text>

      <Text style={styles.meta}>
        {quote.author} • {quote.region}
      </Text>

      {!!quote.country && <Text style={styles.sub}>{quote.country}</Text>}
      {!!quote.source && <Text style={styles.sub}>Source: {quote.source}</Text>}

      <View style={styles.actionRow}>
        <Pressable
          onPress={onToggle}
          disabled={loading || saving}
          style={[
            styles.btn,
            styles.btnHalf,
            bookmarked && styles.btnActive,
            (loading || saving) && { opacity: 0.6 },
          ]}
        >
          <Text style={[styles.btnText, bookmarked && styles.btnTextActive]}>
            {bookmarked ? "Bookmarked ✓" : "Bookmark"}
          </Text>
        </Pressable>

        <Pressable
          disabled={loading || saving}
          onPress={() => shareQuote(quote)}
          style={[
            styles.btnSecondary,
            styles.btnHalf,
            (loading || saving) && { opacity: 0.6 },
          ]}
        >
          <Text style={styles.btnSecondaryText}>Share</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  quote: { fontSize: 20, lineHeight: 28, fontWeight: "800" },
  meta: { marginTop: 12, fontWeight: "700", opacity: 0.85 },
  sub: { marginTop: 8, opacity: 0.7 },

  actions: { marginTop: 18, gap: 12 },
  actionRow: { marginTop: 18, flexDirection: "row", gap: 12 },

  btn: {
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  btnActive: { backgroundColor: "#111" },
  btnText: { fontWeight: "900" },
  btnTextActive: { color: "white" },

  btnSecondary: {
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  btnSecondaryText: { fontWeight: "900" },
  btnHalf: {
    flex: 1,
  },
});
