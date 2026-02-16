import React, { useMemo, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { router } from 'expo-router'
import { QUOTES } from '../../constants/quotes'
import type { AfricaRegion } from '../../constants/quoteTypes'

const REGIONS: (AfricaRegion | 'All')[] = [
  'All',
  'North',
  'West',
  'East',
  'Central',
  'South',
]

export default function Browse() {
  const [region, setRegion] = useState<AfricaRegion | 'All'>('All')

  const filtered = useMemo(() => {
    if (region === 'All') return QUOTES
    return QUOTES.filter((q) => q.region === region)
  }, [region])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Browse</Text>

      <View style={styles.chips}>
        {REGIONS.map((r) => {
          const active = r === region
          return (
            <Pressable
              key={r}
              onPress={() => setRegion(r)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {r}
              </Text>
            </Pressable>
          )
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/quote/${item.id}`)}
          >
            <Text style={styles.quote}>"{item.text}"</Text>
            <Text style={styles.meta}>
              {item.author} • {item.region}
            </Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#eee',
  },
  chipActive: { backgroundColor: '#111' },
  chipText: { fontWeight: '700' },
  chipTextActive: { color: 'white' },
  card: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  quote: { fontSize: 16, lineHeight: 22 },
  meta: { marginTop: 10, fontWeight: '700', opacity: 0.8 },
})
