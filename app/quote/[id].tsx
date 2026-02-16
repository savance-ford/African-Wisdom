import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { QUOTES } from '../../constants/quotes'
import { shareQuote } from '../../hooks/shareQuote'
import { getBookmarkIds, toggleBookmark } from '../../hooks/storage'

export default function QuoteDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const quoteId = String(id)

  const quote = useMemo(() => QUOTES.find((q) => q.id === quoteId), [quoteId])
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    ;(async () => {
      const ids = await getBookmarkIds()
      setBookmarked(ids.includes(quoteId))
    })()
  }, [quoteId])

  if (!quote) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Quote not found.</Text>
      </SafeAreaView>
    )
  }

  async function onToggle() {
    try {
      const ids = await toggleBookmark(quoteId)
      setBookmarked(ids.includes(quoteId))
    } catch {
      Alert.alert('Error', 'Could not update bookmarks.')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.quote}>"{quote.text}"</Text>
      <Text style={styles.meta}>
        {quote.author} • {quote.region}
      </Text>
      {!!quote.country && <Text style={styles.sub}>{quote.country}</Text>}
      {!!quote.source && <Text style={styles.sub}>Source: {quote.source}</Text>}

      <Pressable
        onPress={onToggle}
        style={[styles.btn, bookmarked && styles.btnActive]}
      >
        <Text style={[styles.btnText, bookmarked && styles.btnTextActive]}>
          {bookmarked ? 'Bookmarked ✓' : 'Bookmark'}
        </Text>
      </Pressable>
      <Pressable onPress={() => shareQuote(quote)} style={styles.btnSecondary}>
        <Text style={styles.btnSecondaryText}>Share</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  quote: { fontSize: 20, lineHeight: 28, fontWeight: '800' },
  meta: { marginTop: 12, fontWeight: '700', opacity: 0.85 },
  sub: { marginTop: 8, opacity: 0.7 },
  btn: {
    marginTop: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  btnActive: { backgroundColor: '#111' },
  btnText: { fontWeight: '900' },
  btnTextActive: { color: 'white' },
  btnSecondary: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  btnSecondaryText: { fontWeight: '900' },
})
