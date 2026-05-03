import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { timelineIntro, phases } from '../data/phases';
import PhaseCard from '../components/PhaseCard';
import { colors, fonts, spacing } from '../constants/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TimelineScreen() {
  const [expandedId, setExpandedId] = useState(null);
  const togglePhase = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <LinearGradient colors={[colors.navy, colors.navyLight]} style={styles.hero}>
        <Text style={styles.heroTitle}>{timelineIntro.title}</Text>
        <Text style={styles.heroSubtitle}>{timelineIntro.subtitle}</Text>
        <View style={styles.badge}><Text style={styles.badgeText}>{timelineIntro.badge}</Text></View>
      </LinearGradient>
      {phases.map((phase) => <PhaseCard key={phase.id} phase={phase} expanded={expandedId===phase.id} onToggle={() => togglePhase(phase.id)} />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy },
  content: { padding: spacing.md },
  hero: { borderRadius: 14, padding: spacing.lg, marginBottom: spacing.lg },
  heroTitle: { color: colors.cream, fontFamily: fonts.display, fontSize: 28, marginBottom: spacing.sm },
  heroSubtitle: { color: colors.textLight, fontFamily: fonts.body, lineHeight: 22, marginBottom: spacing.md },
  badge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,153,51,0.2)', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 16 },
  badgeText: { color: colors.saffronLight, fontFamily: fonts.bodyMedium, fontSize: 12 },
});
