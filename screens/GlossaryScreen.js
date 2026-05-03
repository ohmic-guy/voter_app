import React, { useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import { glossaryTerms } from '../data/glossary';
import GlossCard from '../components/GlossCard';
import { colors, fonts, spacing } from '../constants/theme';

export default function GlossaryScreen() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => glossaryTerms.filter((item) => `${item.term} ${item.definition}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <View style={styles.container}>
      <TextInput accessibilityLabel="Search glossary" style={styles.input} value={query} onChangeText={setQuery} placeholder="Search election terms..." placeholderTextColor={colors.textLight} />
      <FlatList data={filtered} keyExtractor={(item) => item.term} contentContainerStyle={styles.list} renderItem={({ item }) => <GlossCard item={item} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy, padding: spacing.md },
  input: { backgroundColor: colors.navyMid, borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, color: colors.cream, fontFamily: fonts.body, marginBottom: spacing.md },
  list: { paddingBottom: spacing.xl },
});
