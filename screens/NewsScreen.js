import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Linking, RefreshControl } from 'react-native';
import { colors, fonts, spacing } from '../constants/theme';

const NEWS_API_KEY = 'YOUR_NEWS_API_KEY';
const NEWS_URL = `https://newsapi.org/v2/everything?q=india%20election&language=en&sortBy=publishedAt&pageSize=20&apiKey=${NEWS_API_KEY}`;

export default function NewsScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(NEWS_URL);
      const data = await res.json();
      setArticles(data?.articles || []);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    const timer = setInterval(fetchNews, 60000);
    return () => clearInterval(timer);
  }, [fetchNews]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Election News</Text>
      <Text style={styles.sub}>{lastUpdated ? `Updated: ${lastUpdated.toLocaleTimeString()}` : 'Fetching latest updates...'}</Text>
      <FlatList
        data={articles}
        keyExtractor={(item, idx) => item.url || `${idx}`}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchNews} tintColor={colors.saffron} />}
        renderItem={({ item }) => (
          <Pressable accessibilityLabel={item.title || 'news article'} style={styles.card} onPress={() => item.url && Linking.openURL(item.url)}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardMeta}>{item.source?.name} • {item.publishedAt ? new Date(item.publishedAt).toLocaleString() : ''}</Text>
            <Text numberOfLines={3} style={styles.cardDesc}>{item.description || 'Tap to read full article.'}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy, padding: spacing.md },
  title: { color: colors.cream, fontFamily: fonts.display, fontSize: 26 },
  sub: { color: colors.textLight, fontFamily: fonts.body, marginBottom: spacing.md },
  card: { backgroundColor: colors.navyMid, borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm, borderColor: 'rgba(255,153,51,0.2)', borderWidth: 1 },
  cardTitle: { color: colors.cream, fontFamily: fonts.bodySemiBold, marginBottom: spacing.xs },
  cardMeta: { color: colors.saffronLight, fontFamily: fonts.body, fontSize: 12, marginBottom: spacing.xs },
  cardDesc: { color: colors.textLight, fontFamily: fonts.body, lineHeight: 20 },
});
