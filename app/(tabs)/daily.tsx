import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { QUOTES } from "../../constants/quotes";
import type { Quote } from "../../constants/quoteTypes";
import { getOrCreateDailyQuote } from "../../hooks/dailyQuote";

export default function Daily() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    (async () => {
      const q = await getOrCreateDailyQuote(QUOTES);
      setQuote(q);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Daily Inspiration</Text>

      <View style={styles.content}>
        {!quote ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator />
          </View>
        ) : (
          <Pressable
            onPress={() => router.push(`/quote/${quote.id}`)}
            style={({ pressed }) => [
              styles.card,
              pressed && { opacity: 0.92, transform: [{ scale: 0.99 }] },
            ]}
          >
            <Text style={styles.quote}>"{quote.text}"</Text>
            <Text style={styles.meta}>
              — {quote.author} • {quote.region}
            </Text>
          </Pressable>
        )}

        <Text style={styles.sub}>Come back tomorrow for a new quote.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#F5F1E8",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 12,
    color: "#2E2A26",
    letterSpacing: -0.2,
  },

  // This fixes the empty look by controlling vertical layout
  content: {
    paddingTop: 32,
    flex: 1,
    justifyContent: "flex-start",
    gap: 14,
  },

  loaderWrap: {
    paddingVertical: 18,
  },

  card: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EFE7DA",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  quote: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "700",
    color: "#2E2A26",
    padding: 20,
  },
  meta: {
    marginTop: 14,
    fontWeight: "800",
    color: "#6B6259",
  },
  sub: {
    color: "#6B6259",
    opacity: 0.95,
    fontSize: 14,
  },
});
