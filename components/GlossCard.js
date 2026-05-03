import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../constants/theme';

export default function GlossCard({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.term}>{item.term}</Text>
      <Text style={styles.definition}>{item.definition}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.navyMid, padding: spacing.md, borderRadius: 12, marginBottom: spacing.sm, borderWidth: 1, borderColor: 'rgba(255,153,51,0.15)' },
  term: { color: colors.saffronLight, fontFamily: fonts.bodySemiBold, marginBottom: spacing.xs, fontSize: 15 },
  definition: { color: colors.creamDark, fontFamily: fonts.body, lineHeight: 22 },
});
