import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../constants/theme';

export default function PhaseCard({ phase, expanded, onToggle }) {
  return (
    <Pressable accessibilityLabel={`Toggle ${phase.title}`} onPress={onToggle} style={[styles.card, { borderLeftColor: phase.accent }]}>
      <Text style={styles.phaseLabel}>{phase.phaseLabel}</Text>
      <Text style={styles.title}>{`${phase.icon} ${phase.title}`}</Text>
      <Text style={styles.short}>{phase.short}</Text>
      {expanded ? (
        <View style={styles.expandArea}>
          <Text style={styles.detail}>{phase.detail}</Text>
          {phase.steps.map((step, index) => (
            <View key={`${phase.id}-step-${index}`} style={styles.stepRow}>
              <View style={styles.stepBadge}><Text style={styles.stepBadgeText}>{index + 1}</Text></View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
          <Text style={styles.legal}>{phase.legal}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.navyMid, borderLeftWidth: 4, borderRadius: 12, padding: spacing.md, marginBottom: spacing.md },
  phaseLabel: { color: colors.saffron, textTransform: 'uppercase', fontFamily: fonts.bodySemiBold, fontSize: 12, marginBottom: spacing.xs },
  title: { color: colors.cream, fontFamily: fonts.display, fontSize: 20, marginBottom: spacing.sm },
  short: { color: colors.textLight, fontFamily: fonts.body, lineHeight: 22 },
  expandArea: { marginTop: spacing.md, borderTopColor: 'rgba(168,184,200,0.2)', borderTopWidth: 1, paddingTop: spacing.md },
  detail: { color: colors.creamDark, fontFamily: fonts.body, marginBottom: spacing.md, lineHeight: 22 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.sm },
  stepBadge: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.saffron, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm, marginTop: 1 },
  stepBadgeText: { color: colors.navy, fontFamily: fonts.bodySemiBold, fontSize: 12 },
  stepText: { color: colors.cream, fontFamily: fonts.body, flex: 1, lineHeight: 20 },
  legal: { color: colors.textLight, fontFamily: fonts.body, fontStyle: 'italic', marginTop: spacing.sm, lineHeight: 20 },
});
