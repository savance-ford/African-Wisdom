import { router, useFocusEffect } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { QUOTES } from '../../constants/quotes'
import { getBookmarkIds } from '../../hooks/storage'

export default function Bookmarks() {
  const [ids, setIds] = useState<string[]>([])

  // Refresh whenever you return to this tab
  useFocusEffect(() => {
    ;(async () => {
      const saved = await getBookmarkIds()
      setIds(saved)
    })()
  })

  const bookmarkedQuotes = useMemo(() => {
    const set = new Set(ids)
    return QUOTES.filter((q) => set.has(q.id))
  }, [ids])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bookmarks</Text>

      {bookmarkedQuotes.length === 0 ? (
        <Text style={styles.empty}>
          No bookmarks yet. Open a quote and tap Bookmark.
        </Text>
      ) : (
        <FlatList
          data={bookmarkedQuotes}
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
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  empty: { opacity: 0.7 },
  card: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  quote: { fontSize: 16, lineHeight: 22 },
  meta: { marginTop: 10, fontWeight: '700', opacity: 0.8 },
})
