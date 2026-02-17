import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { QUOTES } from "../../constants/quotes";
import type { AfricaRegion } from "../../constants/quoteTypes";

const REGIONS: (AfricaRegion | "All")[] = [
  "All",
  "North",
  "West",
  "East",
  "Central",
  "South",
];

export default function Browse() {
  const [region, setRegion] = useState<AfricaRegion | "All">("All");

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: QUOTES.length };
    for (const r of REGIONS) if (r !== "All") map[r] = 0;
    for (const q of QUOTES) map[q.region] = (map[q.region] ?? 0) + 1;
    return map;
  }, []);

  const filtered = useMemo(() => {
    if (region === "All") return QUOTES;
    return QUOTES.filter((q) => q.region === region);
  }, [region, QUOTES]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Browse</Text>

      <View style={styles.chips}>
        {REGIONS.map((r) => {
          const active = r === region;
          return (
            <Pressable
              key={r}
              onPress={() => setRegion(r)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {r} ({counts[r] ?? 0})
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        removeClippedSubviews
        initialNumToRender={10}
        windowSize={7}
        ListEmptyComponent={
          <Text style={{ opacity: 0.6, paddingTop: 10 }}>No quotes found.</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] },
            ]}
            onPress={() =>
              router.push({ pathname: "/quote/[id]", params: { id: item.id } })
            }
          >
            <Text style={styles.quote}>"{item.text}"</Text>
            <Text style={styles.meta}>
              {item.author} • {item.region}
            </Text>
          </Pressable>
        )}
      />
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
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
    color: "#2E2A26",
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },

  chip: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#EFE7DA",
    borderWidth: 1,
    borderColor: "#E7DFD2",
  },
  chipActive: {
    backgroundColor: "#2E2A26",
    borderColor: "#2E2A26",
  },

  chipText: {
    fontWeight: "700",
    color: "#2E2A26",
  },

  chipTextActive: {
    color: "#FFFFFF",
  },

  card: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E7DFD2",
  },

  quote: {
    fontSize: 16,
    lineHeight: 22,
    color: "#2E2A26",
  },

  meta: {
    marginTop: 10,
    fontWeight: "700",
    color: "#6B6259",
  },
});
