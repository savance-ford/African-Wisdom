import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { QUOTES } from '../../constants/quotes'
import type { Quote } from '../../constants/quoteTypes'
import { getOrCreateDailyQuote } from '../../hooks/dailyQuote'

export default function Daily() {
  const [quote, setQuote] = useState<Quote | null>(null)

  useEffect(() => {
    ;(async () => {
      const q = await getOrCreateDailyQuote(QUOTES)
      setQuote(q)
    })()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Daily Wisdom</Text>

      {!quote ? (
        <ActivityIndicator />
      ) : (
        <Pressable
          style={styles.card}
          onPress={() => router.push(`/quote/${quote.id}`)}
        >
          <Text style={styles.quote}>"{quote.text}"</Text>
          <Text style={styles.meta}>
            {quote.author} • {quote.region}
          </Text>
        </Pressable>
      )}

      <Text style={styles.sub}>Come back tomorrow for a new quote.</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  card: { padding: 14, borderRadius: 12, backgroundColor: 'white' },
  quote: { fontSize: 16, lineHeight: 22 },
  meta: { marginTop: 10, fontWeight: '700', opacity: 0.8 },
  sub: { marginTop: 12, opacity: 0.7 },
})
